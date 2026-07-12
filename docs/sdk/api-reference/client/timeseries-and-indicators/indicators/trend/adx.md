---
id: adx
title: Average Directional Index (ADX)
sidebar_label: Average Directional Index
sidebar_position: 10
description: API documentation for the Average Directional Index (ADX) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Average Directional Index (ADX)

Đo lường sức mạnh của xu hướng thị trường hiện tại.

---

## Syntax

```csharp
IIndicatorADX CreateIndicatorADX(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | ADX calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorADX` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Includes helper methods: `GetAdx()`, `GetPlusDI()`, `GetMinusDI()`, and `IsTrending()`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorADX _adx;

public override async Task OnInitAsync()
{
    _adx = Context.Timeseries.CreateIndicatorADX(period: 14, indicatorAlias: "ADX");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("ADX") <= 0) return;
    if (_adx.IsTrending())
    {
        Logger.Info($"Strong Trend. ADX={_adx.GetAdx(0).Value:F2}");
    }
}
}
```
