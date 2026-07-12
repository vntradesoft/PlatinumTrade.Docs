---
id: sar
title: Parabolic SAR
sidebar_label: Parabolic SAR
sidebar_position: 5
description: API documentation for the Parabolic SAR indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Parabolic SAR

Xác định điểm đảo chiều xu hướng và thiết lập trailing stop.

---

## Syntax

```csharp
IIndicatorSAR CreateIndicatorSAR(string? symbol = null, Timeframe? timeframe = null, double? step = null, double? maximum = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `step` | `double?` | Increment step factor. |
| `maximum` | `double?` | Maximum step factor. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorSAR` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Provides specialized helper methods `IsBullish()` and `IsBearish()` to easily detect the trend state.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorSAR _sar;

public override async Task OnInitAsync()
{
    _sar = Context.Timeseries.CreateIndicatorSAR(step: 0.02, maximum: 0.2, indicatorAlias: "SAR");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("SAR") <= 0) return;
    if (_sar.IsBullish())
    {
        Logger.Info("SAR Trend is Bullish");
    }
}
}
```
