---
id: ao
title: Awesome Oscillator (AO)
sidebar_label: Awesome Oscillator
sidebar_position: 2
description: API documentation for the Awesome Oscillator (AO) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Awesome Oscillator (AO)

Đo lường lực lái thị trường (momentum) của 5 nến gần nhất so với 34 nến trước đó.

---

## Syntax

```csharp
IIndicatorAO CreateIndicatorAO(string? symbol = null, Timeframe? timeframe = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
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

Returns `IIndicatorAO` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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
    private IIndicatorAO _ao;

public override async Task OnInitAsync()
{
    _ao = Context.Timeseries.CreateIndicatorAO(indicatorAlias: "AO");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("AO") <= 0) return;
    bool isBullish = !_ao.GetUp(0).IsEmpty;
    Logger.Info($"AO is Bullish: {isBullish}");
}
}
```
