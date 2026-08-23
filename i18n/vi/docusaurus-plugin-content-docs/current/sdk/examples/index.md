---
id: sdk-examples
title: Ví dụ Mẫu
sidebar_label: Ví dụ Mẫu
sidebar_position: 7
description: Các đoạn mã mẫu và liên kết đến dự án hoàn chỉnh sử dụng Platinum Trade SDK.
---

# Ví dụ Mẫu

Các đoạn mã mẫu chạy được ngay và dự án mẫu hoàn chỉnh cho Platinum Trade SDK.

## Ví dụ Chiến lược (Strategy Example)

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
        // Chỉ xử lý tín hiệu khi nến vừa đóng
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

📦 **Dự án hoàn chỉnh**: [Pt.Example.Stgy.UpTrend trên GitHub](https://github.com/vntradesoft/PlatinumTrade.Sdk/tree/main/examples)

## Ví dụ Chỉ báo (Indicator Example)

```csharp
public class MyIndicator : CalcIndBase
{
    public override void OnCalculate(int index, CandleData candle)
    {
        Buffers[0][index] = (candle.High + candle.Low) / 2;
    }
}
```

📦 **Dự án hoàn chỉnh**: [Pt.Examples.Indicator trên GitHub](https://github.com/vntradesoft/PlatinumTrade.Sdk/tree/main/examples)

## Tài nguyên Khác

- [Hướng dẫn Strategy Plugin](../plugins/strategy/overview.md) — Hướng dẫn toàn diện phát triển chiến lược
- [Hướng dẫn Indicator Plugin](../plugins/indicator/overview.md) — Hướng dẫn xây dựng chỉ báo
- [Tra cứu API Reference](../api-reference/index.md) — Tài liệu tra cứu phương thức
