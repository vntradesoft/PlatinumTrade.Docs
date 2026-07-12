---
id: volume-spike
title: Volume Spike
sidebar_label: Volume Spike
sidebar_position: 3
description: API documentation for the Volume Spike indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Volume Spike

Xác định hiện tượng gia tăng khối lượng giao dịch đột ngột so với chu kỳ trung bình.

---

## Syntax

```csharp
IIndicatorVolumeSpike CreateIndicatorVolumeSpike(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? spikeThreshold = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Average volume lookback period. |
| `spikeThreshold` | `double?` | Volume ratio spike multiplier threshold (e.g. 2.0). |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorVolumeSpike` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Provides methods to query volume and spike conditions: `FindVolume()`, `FindAvgVolume()`, `FindVolumeRatio()`, and `IsSpike()`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorVolumeSpike _vspike;

public override async Task OnInitAsync()
{
    _vspike = Context.Timeseries.CreateIndicatorVolumeSpike(period: 20, spikeThreshold: 2.0, indicatorAlias: "VSpike");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("VSpike") <= 0) return;
    if (_vspike.IsSpike())
    {
        Logger.Info($"Volume Spike! Ratio={_vspike.FindVolumeRatio(0).Value:F2}");
    }
}
}
```
