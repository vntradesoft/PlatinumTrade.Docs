---
id: ac
title: Accelerator Oscillator (AC)
sidebar_label: Accelerator Oscillator
sidebar_position: 1
description: API documentation for the Accelerator Oscillator (AC) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Accelerator Oscillator (AC)

Đo lường sự gia tốc hoặc giảm tốc của lực lái thị trường hiện hành.

---

## Syntax

```csharp
IIndicatorAC CreateIndicatorAC(string? symbol = null, Timeframe? timeframe = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
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

Returns `IIndicatorAC` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Provides `GetUp()` and `GetDown()` to read the colored histogram values.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorAC _ac;

public override async Task OnInitAsync()
{
    _ac = Context.Timeseries.CreateIndicatorAC(indicatorAlias: "AC");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("AC") <= 0) return;
    bool isBullish = !_ac.GetUp(0).IsEmpty;
    Logger.Info($"AC is Bullish: {isBullish}");
}
}
```
