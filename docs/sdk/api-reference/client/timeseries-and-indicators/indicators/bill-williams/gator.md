---
id: gator
title: Gator Oscillator
sidebar_label: Gator Oscillator
sidebar_position: 4
description: API documentation for the Gator Oscillator indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Gator Oscillator

Thể hiện mức độ hội tụ/phân kỳ của dải Alligator để xác định độ mở miệng.

---

## Syntax

```csharp
IIndicatorGator CreateIndicatorGator(string? symbol = null, Timeframe? timeframe = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
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

Returns `IIndicatorGator` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Provides `GetUp()` (absolute distance between Jaw and Teeth) and `GetDown()` (negative distance between Teeth and Lips).

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorGator _gator;

public override async Task OnInitAsync()
{
    _gator = Context.Timeseries.CreateIndicatorGator(indicatorAlias: "GatorOsc");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("GatorOsc") <= 0) return;
    decimal up = _gator.GetUp(0).Value;
    decimal down = _gator.GetDown(0).Value;
    Logger.Info($"Gator Up: {up:F4}, Gator Down: {down:F4}");
}
}
```
