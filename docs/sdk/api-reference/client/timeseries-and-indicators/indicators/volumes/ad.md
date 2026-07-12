---
id: ad
title: Accumulation/Distribution (AD)
sidebar_label: Accumulation/Distribution
sidebar_position: 1
description: API documentation for the Accumulation/Distribution (AD) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Accumulation/Distribution (AD)

Đo lường lượng cung và cầu bằng cách so sánh giá đóng cửa với phạm vi giá trong chu kỳ.

---

## Syntax

```csharp
IIndicatorAD CreateIndicatorAD(string? symbol = null, Timeframe? timeframe = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorAD` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Accumulates volume-weighted price movements based on closing price location within range.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorAD _ad;

public override async Task OnInitAsync()
{
    _ad = Context.Timeseries.CreateIndicatorAD(indicatorAlias: "AD");
}
}
```
