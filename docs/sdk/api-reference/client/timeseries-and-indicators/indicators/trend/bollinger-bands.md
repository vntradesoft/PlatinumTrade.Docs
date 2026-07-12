---
id: bollinger-bands
title: Bollinger Bands
sidebar_label: Bollinger Bands
sidebar_position: 9
description: API documentation for the Bollinger Bands indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Bollinger Bands

Dải băng biến động xung quanh một đường trung bình động.

---

## Syntax

```csharp
IIndicatorBollingerBands CreateIndicatorBollingerBands(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? multiplier = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Moving average period. |
| `multiplier` | `double?` | Upper/lower band standard deviation multiplier. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorBollingerBands` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Provides band access methods `GetUpper()`, `GetLower()`, `GetMiddle()`, `GetWidth()` and squeeze/expansion detection: `IsSqueeze()` and `IsExpansion()`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorBollingerBands _bb;

public override async Task OnInitAsync()
{
    _bb = Context.Timeseries.CreateIndicatorBollingerBands(period: 20, multiplier: 2.0, indicatorAlias: "BB");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("BB") <= 0) return;
    if (_bb.IsSqueeze())
    {
        Logger.Info("Volatility Squeeze detected!");
    }
}
}
```
