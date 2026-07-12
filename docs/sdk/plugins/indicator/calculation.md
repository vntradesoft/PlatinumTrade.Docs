---
sidebar_position: 3
id: sdk-indicator-calculation
title: Calculation Flow
description: Handling incremental indicator calculation
status: published
visibility: public
---

# Calculation Flow

The core logic of any indicator is implemented by overriding the `OnCalculate` method. This method is called continuously by the engine whenever new market data arrives. 

Because `OnCalculate` sits on the hot path of the platform, **performance and memory management are critical**.

## Incremental Calculation

You must **never** recalculate the entire price history on every tick. Instead, indicators are strictly incremental. The engine provides two key parameters to help you identify what needs to be calculated:
- `ratesTotal`: The total number of candles currently available.
- `prevCalculated`: The number of candles you successfully processed in the previous call.

```csharp
public override int OnCalculate(
    in int ratesTotal,
    in int prevCalculated,
    in DateTime[] datetime,
    in double[] opens,
    in double[] highs,
    in double[] lows,
    in double[] closes,
    in double[] volumes,
    in double spreads)
{
    // If we don't have enough data to calculate our period, abort early
    if (_period <= 0 || ratesTotal <= _period)
        return 0;

    // Calculate our starting index
    // We subtract 1 because the last candle (prevCalculated - 1) might still be open and updating
    int start = Math.Max(prevCalculated - 1, _period);

    // Loop forward through the uncalculated segment
    for (int i = start; i < ratesTotal; i++)
    {
        // ... calculation logic ...
    }

    // Tell the engine we successfully calculated up to this point
    return ratesTotal;
}
```

## Extracting Source Values

Indicators can be applied to different price points (Close, Open, High, Low). You should use the `GetSourceValue` helper provided by `CalcIndBase` to abstract away this complexity. It automatically fetches the correct double value based on the user's `IndicatorConfig.AppliedPrice` setting.

```csharp
for (int i = start; i < ratesTotal; i++)
{
    // Retrieve the price for the current index
    IndicatorValue currentPrice = GetSourceValue(
        bufferIndex: 0, 
        barIndex: i, 
        time: datetime[i], 
        opens, highs, lows, closes);
        
    // Retrieve the price for the N-periods ago index
    IndicatorValue historicalPrice = GetSourceValue(
        bufferIndex: 0, 
        barIndex: i - _period, 
        time: datetime[i - _period], 
        opens, highs, lows, closes);

    // If the data is missing or empty, explicitly mark the buffer as empty
    if (currentPrice.IsEmpty || historicalPrice.IsEmpty)
    {
        _rocBuffer.MarkEmpty(i, datetime[i]);
        continue;
    }

    // Perform your math logic
    double roc = historicalPrice.Value != 0
        ? ((currentPrice.Value - historicalPrice.Value) / historicalPrice.Value) * 100
        : 0;

    // Store the result
    _rocBuffer.ForceAdd(i, datetime[i], roc);
}
```

## Public Accessor API

For other components (like Strategy Bots) to consume your custom indicator, you should implement public accessor methods. These methods typically return the most recent calculated value.

```csharp
// Helper to safely fetch the value
public IndicatorValue FindROC(int index = 0)
{
    return _rocBuffer!.FindAtOrBeforeCurrent(index);
}

// Semantic helper methods for Strategy consumption
public bool IsBullish()
{
    var v = FindROC();
    return !v.IsEmpty && v.Value > 0;
}

public bool IsBearish()
{
    var v = FindROC();
    return !v.IsEmpty && v.Value < 0;
}
```

## Best Practices

> [!WARNING]
> **Never use static or shared mutable state** in an indicator class. Every indicator instance must be completely isolated, as users can attach multiple copies of the same indicator with different periods to the same chart.

> [!CAUTION]
> **Avoid allocations in `OnCalculate`**. Do not instantiate `new List<T>()` or `new object()` inside the loop. This method is called thousands of times per second during fast market conditions. Rely on the pre-allocated primitive arrays.

> [!TIP]
> **Use `MarkEmpty`**. If an indicator cannot calculate a value for a specific candle (e.g., a moving average on the very first candle), explicitly call `_buffer.MarkEmpty(...)`. Do NOT assign `0`, as `0` will be rendered visibly on the chart and corrupt the scale.
