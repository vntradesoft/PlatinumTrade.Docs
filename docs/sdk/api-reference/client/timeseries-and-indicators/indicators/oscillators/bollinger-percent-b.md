---
id: bollinger-percent-b
title: Bollinger Bands %B (%B)
sidebar_label: Bollinger Bands %B
sidebar_position: 14
description: API documentation for the Bollinger Bands %B (%B) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Bollinger Bands %B (%B)

Định lượng vị trí tương quan của giá so với hai dải biên Bollinger.

---

## Syntax

```csharp
IIndicatorBollingerPercentB CreateIndicatorBollingerPercentB(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? multiplier = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | MA period. |
| `multiplier` | `double?` | Standard deviation multiplier. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorBollingerPercentB` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Includes helper methods: `GetPercentB()`, `IsOverbought()`, and `IsOversold()`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorBollingerPercentB _pctB;

public override async Task OnInitAsync()
{
    _pctB = Context.Timeseries.CreateIndicatorBollingerPercentB(period: 20, multiplier: 2.0, indicatorAlias: "PercentB");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("PercentB") <= 0) return;
    if (_pctB.IsOverbought())
    {
        Logger.Info("Price is above the upper Bollinger Band!");
    }
}
}
```
