---
id: stddev
title: Standard Deviation (StdDev)
sidebar_label: Standard Deviation
sidebar_position: 12
description: API documentation for the Standard Deviation (StdDev) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Standard Deviation (StdDev)

Đo lường mức độ biến động của thị trường thông qua độ lệch chuẩn thống kê.

---

## Syntax

```csharp
IIndicatorStdDev CreateIndicatorStdDev(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Deviation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorStdDev` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

StdDev measures market volatility. High values suggest high volatility and potential trend changes.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorStdDev _stdDev;

public override async Task OnInitAsync()
{
    _stdDev = Context.Timeseries.CreateIndicatorStdDev(period: 20, indicatorAlias: "StdDev");
}
}
```
