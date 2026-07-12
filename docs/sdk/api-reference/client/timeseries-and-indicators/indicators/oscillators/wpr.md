---
id: wpr
title: Williams' Percent Range (WPR)
sidebar_label: Williams' Percent Range
sidebar_position: 9
description: API documentation for the Williams' Percent Range (WPR) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Williams' Percent Range (WPR)

Chỉ báo động lượng đo lường vùng quá mua/quá bán, thường dao động từ 0 đến -100.

---

## Syntax

```csharp
IIndicatorWPR CreateIndicatorWPR(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | WPR period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorWPR` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Specialized helper methods: `IsOverbought(double threshold = -20, int index = 0)` and `IsOversold(double threshold = -80, int index = 0)`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorWPR _wpr;

public override async Task OnInitAsync()
{
    _wpr = Context.Timeseries.CreateIndicatorWPR(period: 14, indicatorAlias: "WPR");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("WPR") <= 0) return;
    if (_wpr.IsOversold())
    {
        Logger.Info("Williams %R is Oversold (< -80)!");
    }
}
}
```
