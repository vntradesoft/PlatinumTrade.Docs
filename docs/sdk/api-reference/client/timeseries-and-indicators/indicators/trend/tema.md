---
id: tema
title: Triple Exponential Moving Average (TEMA)
sidebar_label: Triple Exponential Moving Average
sidebar_position: 3
description: API documentation for the Triple Exponential Moving Average (TEMA) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Triple Exponential Moving Average (TEMA)

Đường trung bình động bám xu hướng với độ trễ thấp hơn cả DEMA.

---

## Syntax

```csharp
IIndicatorTEMA CreateIndicatorTEMA(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
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

Returns `IIndicatorTEMA` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

TEMA uses three EMAs to further reduce lag compared to DEMA and standard EMA.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorTEMA _tema;

public override async Task OnInitAsync()
{
    _tema = Context.Timeseries.CreateIndicatorTEMA(period: 20, indicatorAlias: "TEMA20");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("TEMA20") <= 0) return;
    decimal value = _tema.GetAt(0).Value;
    Logger.Info($"Current TEMA: {value:F2}");
}
}
```
