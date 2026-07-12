---
id: ichimoku
title: Ichimoku Kinko Hyo
sidebar_label: Ichimoku Kinko Hyo
sidebar_position: 8
description: API documentation for the Ichimoku Kinko Hyo indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Ichimoku Kinko Hyo

Hệ thống chỉ báo xu hướng toàn diện cung cấp kháng cự/hỗ trợ và điểm đảo chiều.

---

## Syntax

```csharp
IIndicatorIchimoku CreateIndicatorIchimoku(string? symbol = null, Timeframe? timeframe = null, int? tenkanPeriod = null, int? kijunPeriod = null, int? senkouBPeriod = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `tenkanPeriod` | `int?` | Tenkan-sen (conversion line) period. |
| `kijunPeriod` | `int?` | Kijun-sen (base line) period. |
| `senkouBPeriod` | `int?` | Senkou Span B period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorIchimoku` which inherits from `IIndicator`.

---

## Remarks

Specialized method: `(IndicatorValue Tenkan, IndicatorValue Kijun, IndicatorValue SenkouA, IndicatorValue SenkouB, IndicatorValue Chikou) GetIchimoku(int index = 0)` returns all five line values.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorIchimoku _ichimoku;

public override async Task OnInitAsync()
{
    _ichimoku = Context.Timeseries.CreateIndicatorIchimoku(tenkanPeriod: 9, kijunPeriod: 26, senkouBPeriod: 52, indicatorAlias: "Ichi");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("Ichi") <= 0) return;
    var lines = _ichimoku.GetIchimoku(0);
    Logger.Info($"Tenkan: {lines.Tenkan.Value:F2}, Kijun: {lines.Kijun.Value:F2}");
}
}
```
