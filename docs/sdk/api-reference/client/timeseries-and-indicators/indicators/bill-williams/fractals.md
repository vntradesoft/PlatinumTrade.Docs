---
id: fractals
title: Fractals
sidebar_label: Fractals
sidebar_position: 5
description: API documentation for the Fractals indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Fractals

Xác định đỉnh và đáy cục bộ của biến động giá.

---

## Syntax

```csharp
IIndicatorFractals CreateIndicatorFractals(string? symbol = null, Timeframe? timeframe = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
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

Returns `IIndicatorFractals` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Provides `GetUp()` and `GetDown()`. If no fractal has formed on the candle, `IsEmpty` is returned as `true`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorFractals _fractals;

public override async Task OnInitAsync()
{
    _fractals = Context.Timeseries.CreateIndicatorFractals(indicatorAlias: "Fractals");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("Fractals") <= 0) return;
    var upVal = _fractals.GetUp(2); // Check shift 2 for confirmation
    if (!upVal.IsEmpty)
    {
        Logger.Info($"Confirmed Up Fractal at Price: {upVal.Value}");
    }
}
}
```
