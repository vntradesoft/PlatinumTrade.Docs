---
id: trix
title: Triple Exponential Average (TRIX)
sidebar_label: Triple Exponential Average
sidebar_position: 11
description: API documentation for the Triple Exponential Average (TRIX) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Triple Exponential Average (TRIX)

Chỉ báo dao động đo lường tỷ lệ thay đổi của trung bình động lũy thừa được làm mượt ba lần.

---

## Syntax

```csharp
IIndicatorTRIX CreateIndicatorTRIX(string sourceId, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `sourceId` | `string` | The ID of the source indicator (usually a moving average). |
| `period` | `int?` | TRIX period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorTRIX` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

TRIX shows the rate of change of a triple-exponentially smoothed moving average.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorTRIX _trix;

public override async Task OnInitAsync()
{
    _trix = Context.Timeseries.CreateIndicatorTRIX("EMA10", period: 9, indicatorAlias: "TRIX");
}
}
```
