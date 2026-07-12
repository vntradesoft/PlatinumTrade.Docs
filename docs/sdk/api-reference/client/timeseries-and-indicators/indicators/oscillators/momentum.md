---
id: momentum
title: Momentum
sidebar_label: Momentum
sidebar_position: 6
description: API documentation for the Momentum indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Momentum

Đo lường tỷ lệ tốc độ biến động giá của một tài sản giao dịch.

---

## Syntax

```csharp
IIndicatorMomentum CreateIndicatorMomentum(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Momentum period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorMomentum` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Includes a specialized helper method `FindMomentum(int index = 0)` to retrieve momentum values.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorMomentum _mom;

public override async Task OnInitAsync()
{
    _mom = Context.Timeseries.CreateIndicatorMomentum(period: 10, indicatorAlias: "MOM");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("MOM") <= 0) return;
    decimal value = _mom.FindMomentum(0).Value;
    Logger.Info($"Current Momentum: {value:F2}");
}
}
```
