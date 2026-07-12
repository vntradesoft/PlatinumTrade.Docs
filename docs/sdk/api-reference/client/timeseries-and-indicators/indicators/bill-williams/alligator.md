---
id: alligator
title: Alligator
sidebar_label: Alligator
sidebar_position: 3
description: API documentation for the Alligator indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Alligator

Mô hình bám sát xu hướng kết hợp ba đường trung bình động dịch chuyển thời gian.

---

## Syntax

```csharp
IIndicatorAlligator CreateIndicatorAlligator(string? symbol = null, Timeframe? timeframe = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
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

Returns `IIndicatorAlligator` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Provides specialized line getter methods `GetJaw()` (Blue line), `GetTeeth()` (Red line), and `GetLips()` (Green line).

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorAlligator _alligator;

public override async Task OnInitAsync()
{
    _alligator = Context.Timeseries.CreateIndicatorAlligator(indicatorAlias: "Gator");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("Gator") <= 0) return;
    decimal jaw = _alligator.GetJaw(0).Value;
    decimal teeth = _alligator.GetTeeth(0).Value;
    decimal lips = _alligator.GetLips(0).Value;
    Logger.Info($"Jaw: {jaw:F2}, Teeth: {teeth:F2}, Lips: {lips:F2}");
}
}
```
