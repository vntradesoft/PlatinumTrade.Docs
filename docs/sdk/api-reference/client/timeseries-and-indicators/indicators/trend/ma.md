---
id: ma
title: Moving Average (MA)
sidebar_label: Moving Average
sidebar_position: 1
description: API documentation for the Moving Average (MA) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Moving Average (MA)

Moving Average (MA)

---

## Syntax

```csharp
IIndicatorMA CreateIndicatorMA(string? symbol = null, Timeframe? timeframe = null, int? period = null, MaMethod? method = null, AppliedPrice? appliedPrice = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Calculation lookback period. |
| `method` | `MaMethod?` | Moving average smoothing method (SMA, EMA, SMMA, LWMA). |
| `appliedPrice` | `AppliedPrice?` | Price component to apply calculation on. |
| `indicatorAlias` | `string?` | Unique alias for this indicator instance. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual line styles configuration delegate. |

---

## Return Value

Returns `IIndicatorMA` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Contains specialized helper methods `GetTrend` for trend direction detection and `DetectCrossover` for fast/slow crossovers.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorMA _fastMa;
private IIndicatorMA _slowMa;

public override async Task OnInitAsync()
{
    _fastMa = Context.Timeseries.CreateIndicatorMA(period: 9, method: MaMethod.EMA, indicatorAlias: "EMA9");
    _slowMa = Context.Timeseries.CreateIndicatorMA(period: 21, method: MaMethod.EMA, indicatorAlias: "EMA21");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("EMA9") <= 0 || Context.Timeseries.BarsCalculated("EMA21") <= 0) return;
    
    var crossover = _fastMa.DetectCrossover(_fastMa, _slowMa);
    if (crossover == MACrossoverType.Bullish)
    {
        Logger.Info("Golden Cross detected!");
    }
}
}
```
