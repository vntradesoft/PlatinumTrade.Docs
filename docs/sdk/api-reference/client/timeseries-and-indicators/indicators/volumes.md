---
title: 
---

# 


## Accumulation/Distribution (AD)

Äo lÆ°á»ng lÆ°á»£ng cung vĂ  cáº§u báº±ng cĂ¡ch so sĂ¡nh giĂ¡ Ä‘Ă³ng cá»­a vá»›i pháº¡m vi giĂ¡ trong chu ká»³.

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorAD` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

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

Ăp dá»¥ng nguyĂªn lĂ½ MACD cho Ä‘Æ°á»ng tĂ­ch lÅ©y phĂ¢n phá»‘i (A/D).

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `fast` | `int?` | Fast MA period (default 3). |
| `slow` | `int?` | Slow MA period (default 10). |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorChaikin` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

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

LiĂªn káº¿t thay Ä‘á»•i giĂ¡ vá»›i khá»‘i lÆ°á»£ng Ä‘á»ƒ Ä‘o lÆ°á»ng Ä‘á»™ng nÄƒng Ä‘áº©y Ä‘áº±ng sau xu hÆ°á»›ng.

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Force Index smoothing period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorForce` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

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

Theo dĂµi dĂ²ng khá»‘i lÆ°á»£ng tĂ­ch lÅ©y Ä‘á»ƒ dá»± Ä‘oĂ¡n xu hÆ°á»›ng giĂ¡ dá»‹ch chuyá»ƒn tÆ°Æ¡ng lai.

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorOBV` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

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

XĂ¡c Ä‘á»‹nh hiá»‡n tÆ°á»£ng gia tÄƒng khá»‘i lÆ°á»£ng giao dá»‹ch Ä‘á»™t ngá»™t so vá»›i chu ká»³ trung bĂ¬nh.

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Average volume lookback period. |
| `spikeThreshold` | `double?` | Volume ratio spike multiplier threshold (e.g. 2.0). |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorVolumeSpike` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

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

Má»©c giĂ¡ trung bĂ¬nh cá»§a tĂ i sáº£n Ä‘Æ°á»£c giao dá»‹ch trong phiĂªn giao dá»‹ch dá»±a trĂªn cáº£ giĂ¡ vĂ  lÆ°á»£ng.

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `resetDaily` | `bool?` | Reset the cumulative volume/price products daily at 00:00 UTC. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorVWAP` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

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

