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
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;
using Pt.Okx.Sdk.Indicators.Enums;
using Pt.Okx.Sdk.Strategy;
using Pt.Okx.Sdk.Strategy.Events;

public class MyStrategy : StrategyBase
{
    private IIndicatorMA _ma = null!;

    public override Task<bool> OnInitAsync(IStrategyStateStore state, CancellationToken cancellationToken)
    {
        _ma = Context.Timeseries.CreateIndicatorMA(period: 20, method: MaMethod.Ema, appliedPrice: AppliedPrice.Close);
        return Task.FromResult(true);
    }

    public override Task<bool> OnStopAsync(CancellationToken cancellationToken) => Task.FromResult(true);

    public override async Task OnTickAsync(TickPhase tickPhase, CancellationToken ct)
    {
        // Execute signals only on bar close
        if (tickPhase != TickPhase.BarClose) return;

        double maValue = _ma.GetValue(1);
        decimal currentPrice = Context.Timeseries.CurrentTickPrice;

        if (!double.IsNaN(maValue) && currentPrice > (decimal)maValue)
        {
            var posRes = await Context.Trade.GetPositionsAsync(ct: ct);
            if (posRes.Success && posRes.Data.Length == 0)
            {
                await Context.Trade.PlaceOrderAsync("BTC-USDT-SWAP", OrderSide.Buy, OrderType.Market, 1.0m, ct: ct);
            }
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
