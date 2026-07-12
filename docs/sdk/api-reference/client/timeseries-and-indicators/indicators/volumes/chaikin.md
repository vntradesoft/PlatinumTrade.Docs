---
id: chaikin
title: Chaikin Oscillator
sidebar_label: Chaikin Oscillator
sidebar_position: 6
description: API documentation for the Chaikin Oscillator indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Chaikin Oscillator

Áp dụng nguyên lý MACD cho đường tích lũy phân phối (A/D).

---

## Syntax

```csharp
IIndicatorChaikin CreateIndicatorChaikin(string? symbol = null, Timeframe? timeframe = null, int? fast = null, int? slow = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `fast` | `int?` | Fast MA period (default 3). |
| `slow` | `int?` | Slow MA period (default 10). |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorChaikin` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Applies MACD logic to the Accumulation/Distribution line to identify momentum shifts.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorChaikin _chaikin;

public override async Task OnInitAsync()
{
    _chaikin = Context.Timeseries.CreateIndicatorChaikin(fast: 3, slow: 10, indicatorAlias: "Chaikin");
}
}
```
