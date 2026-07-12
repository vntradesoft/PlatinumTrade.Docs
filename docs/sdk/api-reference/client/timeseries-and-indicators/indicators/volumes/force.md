---
id: force
title: Force Index
sidebar_label: Force Index
sidebar_position: 4
description: API documentation for the Force Index indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Force Index

Liên kết thay đổi giá với khối lượng để đo lường động năng đẩy đằng sau xu hướng.

---

## Syntax

```csharp
IIndicatorForce CreateIndicatorForce(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Force Index smoothing period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorForce` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Combines price change direction and volume size to illustrate buying or selling force.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorForce _force;

public override async Task OnInitAsync()
{
    _force = Context.Timeseries.CreateIndicatorForce(period: 13, indicatorAlias: "Force");
}
}
```
