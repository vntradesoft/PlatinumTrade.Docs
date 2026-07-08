---
id: sdk-indicator-using-indicators
title: Using Indicators
description: Leveraging built-in or other custom indicators inside your indicator without recalculating
status: published
visibility: public
---

# Using Indicators Inside Indicators

Often, you want to build a custom indicator that relies on the output of another indicator (e.g., creating a smoothed RSI by passing an RSI through an SMA, or calculating MACD using two EMAs).

The SDK allows you to instantiate and consume other indicators **without recalculating them manually**. The engine will automatically manage their lifecycle, calculate their values incrementally, and provide you with the output.

## Creating Child Indicators

To use another indicator inside your custom indicator, you instantiate it during your `OnInit()` method using the injected `_factory`.

### 1. Define the child configuration
Create an `IndicatorConfig` that defines the parameters of the child indicator.

### 2. Create and store the instance
Use `_factory.CreateIndicator()` and store the returned instance in a class-level variable.

```csharp
using Pt.Okx.Sdk.Indicators.Base;
using Pt.Okx.Sdk.Indicators.Enums;
using Pt.Okx.Sdk.Indicators.Models;
using Pt.Okx.Sdk.Indicators.Services;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class CalcIndSmoothedRSI : CalcIndBase
{
    private IIndicator? _childRsi;
    private IIndicator? _childSma;
    private IIndicatorBuffer? _mainBuffer;

    private int _rsiPeriod;
    private int _smaPeriod;

    public CalcIndSmoothedRSI(IIndicatorFactory factory, IIndicatorManager manager, IndicatorConfig config)
        : base(factory, manager, config)
    {
    }

    protected override IndicatorProperty CreateDefaultProperty()
    {
        _rsiPeriod = GetParameter<int>("RsiPeriod");
        _smaPeriod = GetParameter<int>("SmaPeriod");

        return new IndicatorProperty("Smoothed RSI", IndicatorWindow.Separate, 1, 1);
    }

    public override bool OnInit()
    {
        if (!base.OnInit()) return false;
        
        SetBuffer(0, IndicatorBufferType.Data);
        _mainBuffer = GetBuffer(0);

        // 1. Create the base RSI
        var rsiConfig = new IndicatorConfig
        {
            Symbol = Config.Symbol,
            TimeFrame = Config.TimeFrame,
            IndicatorType = IndicatorType.RSI
        };
        rsiConfig.SetParam("Period", null, _rsiPeriod);
        
        _childRsi = _factory.CreateIndicator(_manager, rsiConfig);

        // 2. Create the SMA and pipe the RSI output into it
        var smaConfig = new IndicatorConfig
        {
            Symbol = Config.Symbol,
            TimeFrame = Config.TimeFrame,
            IndicatorType = IndicatorType.MA
        };
        smaConfig.SetParam("Period", null, _smaPeriod);
        smaConfig.SetParam("Method", null, MaMethod.SMA);
        
        // IMPORTANT: Pipe the RSI output as the source for the SMA
        smaConfig.Sources.Add(new IndicatorSource
        {
            IndicatorId = _childRsi.GetIndicatorId(),
            BufferIndex = 0 // RSI's main output buffer
        });

        _childSma = _factory.CreateIndicator(_manager, smaConfig);

        return true;
    }

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
        // We only need to calculate if we have enough data
        int requiredPeriod = _rsiPeriod + _smaPeriod;
        if (ratesTotal <= requiredPeriod) return 0;

        int start = Math.Max(prevCalculated - 1, requiredPeriod);

        for (int i = start; i < ratesTotal; i++)
        {
            // Because the engine automatically calculates child indicators first,
            // we can safely query the SMA's value directly.
            
            // Get the SMA's calculated value for the current index (i)
            // Note: Since we are querying from a parent indicator context during the loop, 
            // you might want to fetch it dynamically using TryAt if you are iterating forward.
            // However, typically the engine calculates all dependencies *before* the parent.
            
            var smoothedRsiValue = _childSma!.GetAt(ratesTotal - 1 - i);
            
            if (smoothedRsiValue.IsEmpty)
            {
                _mainBuffer!.MarkEmpty(i, datetime[i]);
            }
            else
            {
                _mainBuffer!.ForceAdd(i, datetime[i], smoothedRsiValue.Value);
            }
        }

        return ratesTotal;
    }
}
```

## How Dependency Calculation Works

When you create a child indicator via `_factory.CreateIndicator(_manager, config)`, two important things happen:
1. **Registration:** The child indicator is registered with the `IIndicatorManager`.
2. **Dependency Sorting:** The platform's calculation engine automatically builds a dependency graph. It guarantees that **child indicators are calculated BEFORE the parent indicator** on every tick.

Therefore, inside your `OnCalculate` loop, you do not need to call `OnCalculate` on `_childRsi` or `_childSma`. Their internal buffers will already be filled with the latest values for the current tick, ready for you to consume via `GetAt()` or buffer lookups.

## Piping Inputs (`Config.Sources`)

As shown in the example above, if you want an indicator (like SMA) to calculate its values based on another indicator (like RSI) rather than raw price data, you inject the child's ID into the `Sources` array:

```csharp
smaConfig.Sources.Add(new IndicatorSource
{
    IndicatorId = _childRsi.GetIndicatorId(),
    BufferIndex = 0 // The buffer number of the RSI you want to read from
});
```
This avoids manually iterating over the RSI buffer and calculating the SMA math yourself. The SMA will natively use the RSI's output array as its input `closes` array during its own `OnCalculate` pass.
