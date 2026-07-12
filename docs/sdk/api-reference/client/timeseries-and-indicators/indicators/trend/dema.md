---
id: dema
title: Double Exponential Moving Average (DEMA)
sidebar_label: Double Exponential Moving Average
sidebar_position: 2
description: API documentation for the Double Exponential Moving Average (DEMA) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Double Exponential Moving Average (DEMA)

Cung cấp phản ứng nhanh hơn với độ trễ thấp hơn so với EMA thông thường.

---

## Syntax

```csharp
IIndicatorDEMA CreateIndicatorDEMA(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Lookback period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorDEMA` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

DEMA offers less lag than traditional EMAs by combining a single and double EMA.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorDEMA _dema;

public override async Task OnInitAsync()
{
    _dema = Context.Timeseries.CreateIndicatorDEMA(period: 14, indicatorAlias: "DEMA14");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("DEMA14") <= 0) return;
    decimal value = _dema.GetAt(0).Value;
    Logger.Info($"Current DEMA: {value:F2}");
}
}
```
