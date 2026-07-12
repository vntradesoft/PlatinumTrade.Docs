---
id: stochastic
title: Stochastic Oscillator
sidebar_label: Stochastic Oscillator
sidebar_position: 2
description: API documentation for the Stochastic Oscillator indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Stochastic Oscillator

So sánh giá đóng cửa với một phạm vi giá trong một khoảng thời gian.

---

## Syntax

```csharp
IIndicatorStochastic CreateIndicatorStochastic(string? symbol = null, Timeframe? timeframe = null, int? kPeriod = null, int? dPeriod = null, int? kSlow = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `kPeriod` | `int?` | %K line lookback period. |
| `dPeriod` | `int?` | %D line smoothing period. |
| `kSlow` | `int?` | Slowing factor for %K line. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorStochastic` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Specialized helper methods: `GetK()`, `GetD()`, `IsOverbought()`, and `IsOversold()`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorStochastic _stoch;

public override async Task OnInitAsync()
{
    _stoch = Context.Timeseries.CreateIndicatorStochastic(kPeriod: 14, dPeriod: 3, kSlow: 3, indicatorAlias: "Stoch");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("Stoch") <= 0) return;
    decimal k = _stoch.GetK(0).Value;
    decimal d = _stoch.GetD(0).Value;
    if (k > d && _stoch.IsOversold(20))
    {
        Logger.Info("Stochastic crossover detected in oversold zone!");
    }
}
}
```
