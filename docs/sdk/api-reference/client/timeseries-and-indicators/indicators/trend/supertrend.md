---
id: supertrend
title: SuperTrend
sidebar_label: SuperTrend
sidebar_position: 7
description: API documentation for the SuperTrend indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# SuperTrend

Chỉ báo theo xu hướng dựa trên độ biến động ATR và giá trung vị.

---

## Syntax

```csharp
IIndicatorSuperTrend CreateIndicatorSuperTrend(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? multiplier = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | ATR calculation lookback period. |
| `multiplier` | `double?` | ATR multiplier threshold factor. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorSuperTrend` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Contains specialized methods such as `IsBullish()`, `IsBearish()`, `HasBullishReversal()`, `HasBearishReversal()`, and `GetDistanceFromSuperTrend()`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorSuperTrend _st;

public override async Task OnInitAsync()
{
    _st = Context.Timeseries.CreateIndicatorSuperTrend(period: 10, multiplier: 3.0, indicatorAlias: "SuperTrend");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("SuperTrend") <= 0) return;
    if (_st.HasBullishReversal())
    {
        Logger.Info("SuperTrend flipped to Bullish!");
    }
}
}
```
