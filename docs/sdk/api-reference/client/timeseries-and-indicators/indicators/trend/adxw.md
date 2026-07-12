---
id: adxw
title: Average Directional Index Wilder (ADXW)
sidebar_label: Average Directional Index Wilder
sidebar_position: 11
description: API documentation for the Average Directional Index Wilder (ADXW) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Average Directional Index Wilder (ADXW)

Average Directional Index Wilder (ADXW)

---

## Syntax

```csharp
IIndicatorADXW CreateIndicatorADXW(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | ADX Wilder calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorADXW` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Includes crossover and direction helper methods: `IsBullish()`, `IsBearish()`, `IsBullishCrossover()`, and `IsBearishCrossover()`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorADXW _adxw;

public override async Task OnInitAsync()
{
    _adxw = Context.Timeseries.CreateIndicatorADXW(period: 14, indicatorAlias: "ADXW");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("ADXW") <= 0) return;
    if (_adxw.IsBullishCrossover())
    {
        Logger.Info("Bullish crossover on DI lines!");
    }
}
}
```
