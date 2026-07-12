---
id: bollinger-band-width
title: Bollinger Band Width (BBW)
sidebar_label: Bollinger Band Width
sidebar_position: 15
description: API documentation for the Bollinger Band Width (BBW) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Bollinger Band Width (BBW)

Đo lường độ rộng phần trăm giữa dải Bollinger trên và dưới để đánh giá động năng biến động.

---

## Syntax

```csharp
IIndicatorBollingerBandWidth CreateIndicatorBollingerBandWidth(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? multiplier = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
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

Returns `IIndicatorBollingerBandWidth` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Includes volatility methods: `GetWidth()`, `IsSqueeze()`, and `IsExpansion()`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorBollingerBandWidth _width;

public override async Task OnInitAsync()
{
    _width = Context.Timeseries.CreateIndicatorBollingerBandWidth(period: 20, multiplier: 2.0, indicatorAlias: "BBW");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("BBW") <= 0) return;
    if (_width.IsSqueeze())
    {
        Logger.Info("Low volatility squeeze detected!");
    }
}
}
```
