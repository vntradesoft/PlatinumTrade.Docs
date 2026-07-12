---
id: vwap
title: Volume Weighted Average Price (VWAP)
sidebar_label: Volume Weighted Average Price
sidebar_position: 5
description: API documentation for the Volume Weighted Average Price (VWAP) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Volume Weighted Average Price (VWAP)

Mức giá trung bình của tài sản được giao dịch trong phiên giao dịch dựa trên cả giá và lượng.

---

## Syntax

```csharp
IIndicatorVWAP CreateIndicatorVWAP(string? symbol = null, Timeframe? timeframe = null, bool? resetDaily = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `resetDaily` | `bool?` | Reset the cumulative volume/price products daily at 00:00 UTC. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorVWAP` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Includes helper methods: `FindVWAP()`, `FindCumulativeVolume()`, `IsPriceAboveVWAP()`, `IsPriceBelowVWAP()`, and `GetDistanceFromVWAP()`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorVWAP _vwap;

public override async Task OnInitAsync()
{
    _vwap = Context.Timeseries.CreateIndicatorVWAP(resetDaily: true, indicatorAlias: "VWAP");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("VWAP") <= 0) return;
    decimal vwapVal = _vwap.FindVWAP(0).Value;
    Logger.Info($"Current VWAP Price level: {vwapVal:F2}");
}
}
```
