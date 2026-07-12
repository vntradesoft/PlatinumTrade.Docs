---
id: atr
title: Average True Range (ATR)
sidebar_label: Average True Range
sidebar_position: 13
description: API documentation for the Average True Range (ATR) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Average True Range (ATR)

Đo lường mức độ biến động tuyệt đối của thị trường.

---

## Syntax

```csharp
IIndicatorATR CreateIndicatorATR(string? symbol = null, Timeframe? timeframe = null, int? period = null, MaMethod? method = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | ATR calculation period. |
| `method` | `MaMethod?` | Smoothing moving average method (usually SMA/EMA). |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorATR` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

ATR measures market volatility without considering direction.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorATR _atr;

public override async Task OnInitAsync()
{
    _atr = Context.Timeseries.CreateIndicatorATR(period: 14, indicatorAlias: "ATR");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("ATR") <= 0) return;
    decimal value = _atr.GetAt(0).Value;
    Logger.Info($"Current ATR Volatility: {value:F4}");
}
}
```
