---
id: sdk-examples
title: Examples
sidebar_label: Examples
sidebar_position: 7
description: Code samples and links to complete example projects for the Platinum Trade SDK.
---

# Examples

Ready-to-run code samples and complete example projects for the Platinum Trade SDK.

## Strategy Examples

```csharp
public class MyStrategy : StrategyBase
{
    private IIndicatorMA _ma;

    public override async Task OnInitAsync()
    {
        _ma = Context.Timeseries.CreateIndicatorMA(period: 20, method: MaMethod.EMA);
    }

    public override async Task OnKlineAsync(CandleData candle)
    {
        var value = _ma.GetAt();
        if (!value.IsEmpty && candle.Close > value.Value)
        {
            await Context.Trade.PlaceOrderAsync("BTC-USDT-SWAP", OrderSide.Buy, OrderType.Market, 1);
        }
    }
}
```

📦 **Full project**: [Pt.Example.Stgy.UpTrend on GitHub](https://github.com/vntradesoft/PlatinumTrade.Sdk/tree/main/examples)

## Indicator Examples

```csharp
public class MyIndicator : CalcIndBase
{
    public override void OnCalculate(int index, CandleData candle)
    {
        Buffers[0][index] = (candle.High + candle.Low) / 2;
    }
}
```

📦 **Full project**: [Pt.Examples.Indicator on GitHub](https://github.com/vntradesoft/PlatinumTrade.Sdk/tree/main/examples)

## More Resources

- [Strategy Plugin Guide](../plugins/strategy/overview.md) — Complete guide to building strategies
- [Indicator Plugin Guide](../plugins/indicator/overview.md) — Complete guide to building indicators
- [API Reference](../api-reference/index.md) — Method-level documentation
