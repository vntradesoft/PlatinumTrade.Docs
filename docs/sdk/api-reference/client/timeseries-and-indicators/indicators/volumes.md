---
title: Volumes
---

# Volumes
## Accumulation/Distribution (AD)

Measures the accumulation and distribution of volume by comparing the closing price to the trading range.

---

**Syntax**

```csharp
IIndicatorAD CreateIndicatorAD(string? symbol = null, Timeframe? timeframe = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorAD`](../../interfaces.md#iindicatorad) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
Accumulates volume-weighted price movements based on closing price location within range.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorAD _ad;

public override async Task OnInitAsync()
{
    _ad = Context.Timeseries.CreateIndicatorAD(indicatorAlias: "AD");
}
}
```

## Chaikin Oscillator

Applies the MACD principle to the Accumulation/Distribution (A/D) line.

---

**Syntax**

```csharp
IIndicatorChaikin CreateIndicatorChaikin(string? symbol = null, Timeframe? timeframe = null, int? fast = null, int? slow = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `fast` | `int?` | Fast MA period (default 3). |
| `slow` | `int?` | Slow MA period (default 10). |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorChaikin`](../../interfaces.md#iindicatorchaikin) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
Applies MACD logic to the Accumulation/Distribution line to identify momentum shifts.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorChaikin _chaikin;

public override async Task OnInitAsync()
{
    _chaikin = Context.Timeseries.CreateIndicatorChaikin(fast: 3, slow: 10, indicatorAlias: "Chaikin");
}
}
```

## Force Index

Links price change with volume to measure the power driving a trend.

---

**Syntax**

```csharp
IIndicatorForce CreateIndicatorForce(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Force Index smoothing period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorForce`](../../interfaces.md#iindicatorforce) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
Combines price change direction and volume size to illustrate buying or selling force.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorForce _force;

public override async Task OnInitAsync()
{
    _force = Context.Timeseries.CreateIndicatorForce(period: 13, indicatorAlias: "Force");
}
}
```

## On-Balance Volume (OBV)

Tracks cumulative volume flow to predict future price changes.

---

**Syntax**

```csharp
IIndicatorOBV CreateIndicatorOBV(string? symbol = null, Timeframe? timeframe = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorOBV`](../../interfaces.md#iindicatorobv) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
OBV adds volume on up days and subtracts volume on down days to measure cumulative volume flow.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorOBV _obv;

public override async Task OnInitAsync()
{
    _obv = Context.Timeseries.CreateIndicatorOBV(indicatorAlias: "OBV");
}
}
```

## Volume Spike

Identifies sudden spikes in trading volume compared to its average.

---

**Syntax**

```csharp
IIndicatorVolumeSpike CreateIndicatorVolumeSpike(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? spikeThreshold = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Average volume lookback period. |
| `spikeThreshold` | `double?` | Volume ratio spike multiplier threshold (e.g. 2.0). |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorVolumeSpike`](../../interfaces.md#iindicatorvolumespike) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
Provides methods to query volume and spike conditions: `FindVolume()`, `FindAvgVolume()`, `FindVolumeRatio()`, and `IsSpike()`.

---

**Example**

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

## Volume Weighted Average Price (VWAP)

The average price of an asset traded over a session based on both volume and price.

---

**Syntax**

```csharp
IIndicatorVWAP CreateIndicatorVWAP(string? symbol = null, Timeframe? timeframe = null, bool? resetDaily = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `resetDaily` | `bool?` | Reset the cumulative volume/price products daily at 00:00 UTC. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorVWAP`](../../interfaces.md#iindicatorvwap) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
Includes helper methods: `FindVWAP()`, `FindCumulativeVolume()`, `IsPriceAboveVWAP()`, `IsPriceBelowVWAP()`, and `GetDistanceFromVWAP()`.

---

**Example**

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


