---
id: rvi
title: Relative Vigor Index (RVI)
sidebar_label: Relative Vigor Index
sidebar_position: 8
description: API documentation for the Relative Vigor Index (RVI) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Relative Vigor Index (RVI)

Đo lường năng lượng tương đối của xu hướng giá hiện hành.

---

## Syntax

```csharp
IIndicatorRVI CreateIndicatorRVI(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | RVI period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorRVI` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

RVI is based on the idea that prices tend to close higher than they open in uptrends, and lower in downtrends.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorRVI _rvi;

public override async Task OnInitAsync()
{
    _rvi = Context.Timeseries.CreateIndicatorRVI(period: 10, indicatorAlias: "RVI");
}
}
```
