---
title: Trend
---

# Trend
## Average Directional Index (ADX)

Measures the strength of the current market trend.

---

**Syntax**

```csharp
IIndicatorADX CreateIndicatorADX(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | ADX calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorADX`](../../interfaces.md#iindicatoradx) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
Includes helper methods: `GetAdx()`, `GetPlusDI()`, `GetMinusDI()`, and `IsTrending()`.

---

**Example**

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

## Average Directional Index Wilder (ADXW)
Wilder's smoothing version of the Average Directional Index (ADXW).
Average Directional Index Wilder (ADXW)

---

**Syntax**

```csharp
IIndicatorADXW CreateIndicatorADXW(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | ADX Wilder calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorADXW`](../../interfaces.md#iindicatoradxw) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
Includes crossover and direction helper methods: `IsBullish()`, `IsBearish()`, `IsBullishCrossover()`, and `IsBearishCrossover()`.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorADXW _adxw;

public override async Task OnInitAsync()
{
    _adxw = Context.Timeseries.CreateIndicatorADXW(period: 14, indicatorAlias: "ADXW");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("ADXW") <= 0) return;
    if (_adxw.IsBullishCrossover())
    {
        Logger.Info("Bullish crossover on DI lines!");
    }
}
}
```

## Adaptive Moving Average (AMA)

An adaptive moving average that dynamically adjusts its sensitivity based on market volatility.

---

**Syntax**

```csharp
IIndicatorAMA CreateIndicatorAMA(string? symbol = null, Timeframe? timeframe = null, int? period = null, int? fast = null, int? slow = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Efficiency Ratio lookback period. |
| `fast` | `int?` | Fast EMA period. |
| `slow` | `int?` | Slow EMA period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorAMA`](../../interfaces.md#iindicatorama) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
AMA automatically speeds up in volatile markets and slows down in rangebound markets.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorAMA _ama;

public override async Task OnInitAsync()
{
    _ama = Context.Timeseries.CreateIndicatorAMA(period: 10, fast: 2, slow: 30, indicatorAlias: "AMA10");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("AMA10") <= 0) return;
    decimal value = _ama.GetAt(0).Value;
    Logger.Info($"Current AMA: {value:F2}");
}
}
```

## Bollinger Bands

Volatility bands placed above and below a moving average.

---

**Syntax**

```csharp
IIndicatorBollingerBands CreateIndicatorBollingerBands(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? multiplier = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Moving average period. |
| `multiplier` | `double?` | Upper/lower band standard deviation multiplier. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorBollingerBands`](../../interfaces.md#iindicatorbollingerbands) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
Provides band access methods `GetUpper()`, `GetLower()`, `GetMiddle()`, `GetWidth()` and squeeze/expansion detection: `IsSqueeze()` and `IsExpansion()`.

---

**Example**

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

## Double Exponential Moving Average (DEMA)

Provides a faster response with less lag than a standard EMA.

---

**Syntax**

```csharp
IIndicatorDEMA CreateIndicatorDEMA(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Lookback period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorDEMA`](../../interfaces.md#iindicatordema) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
DEMA offers less lag than traditional EMAs by combining a single and double EMA.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorDEMA _dema;

public override async Task OnInitAsync()
{
    _dema = Context.Timeseries.CreateIndicatorDEMA(period: 14, indicatorAlias: "DEMA14");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("DEMA14") <= 0) return;
    decimal value = _dema.GetAt(0).Value;
    Logger.Info($"Current DEMA: {value:F2}");
}
}
```

## Envelopes
Upper and lower bands that shift at a percentage deviation from a moving average. ---

**Syntax**

```csharp
IIndicatorEnvelopes Envelopes(string? symbol, Timeframe? timeframe, int? period, double? deviation, MaMethod? method, AppliedPrice? appliedPrice, string? indicatorAlias, Action<IndicatorProperty>? propertyOptions);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Moving average period. |
| `deviation` | `double?` | Envelope band deviation multiplier. |
| `method` | [`MaMethod?`](../../enums.md#mamethod) | Moving average smoothing method. |
| `appliedPrice` | [`AppliedPrice?`](../../enums.md#appliedprice) | Price component to apply calculation on. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Return Value**

Returns [`IIndicatorEnvelopes`](../../interfaces.md#iindicatorenvelopes) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

**Remarks**

Provides `GetUpper()`, `GetLower()`, `IsPriceAboveUpper()`, and `IsPriceBelowLower()` to detect breakout signals.

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;
public class MyStrategy : StrategyBase
{
    private IIndicatorEnvelopes _envelopes;
public override async Task OnInitAsync()
{
    _envelopes = Context.Timeseries.CreateIndicatorEnvelopes(period: 14, deviation: 0.1, method: MaMethod.SMA, indicatorAlias: "Envelopes");
}
public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("Envelopes") <= 0) return;
    decimal close = Context.Timeseries.GetLastClosedCandle().Close;
    if (_envelopes.IsPriceAboveUpper((double)close))
    {
        Logger.Info("Price breakout above upper envelope band!");
    }
}
}
```

---

## Ichimoku Kinko Hyo

A comprehensive trend indicator system that provides support/resistance and reversal points.

---

**Syntax**

```csharp
IIndicatorIchimoku CreateIndicatorIchimoku(string? symbol = null, Timeframe? timeframe = null, int? tenkanPeriod = null, int? kijunPeriod = null, int? senkouBPeriod = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `tenkanPeriod` | `int?` | Tenkan-sen (conversion line) period. |
| `kijunPeriod` | `int?` | Kijun-sen (base line) period. |
| `senkouBPeriod` | `int?` | Senkou Span B period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorIchimoku`](../../interfaces.md#iindicatorichimoku) which inherits from [`IIndicator`](../../interfaces.md#iindicator).

---

**Remarks**
Specialized method: `(IndicatorValue Tenkan, IndicatorValue Kijun, IndicatorValue SenkouA, IndicatorValue SenkouB, IndicatorValue Chikou) GetIchimoku(int index = 0)` returns all five line values.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorIchimoku _ichimoku;

public override async Task OnInitAsync()
{
    _ichimoku = Context.Timeseries.CreateIndicatorIchimoku(tenkanPeriod: 9, kijunPeriod: 26, senkouBPeriod: 52, indicatorAlias: "Ichi");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("Ichi") <= 0) return;
    var lines = _ichimoku.GetIchimoku(0);
    Logger.Info($"Tenkan: {lines.Tenkan.Value:F2}, Kijun: {lines.Kijun.Value:F2}");
}
}
```

## Moving Average (MA)

Moving Average (MA)

---

A standard moving average indicator to identify trend direction.

```csharp
IIndicatorMA CreateIndicatorMA(string? symbol = null, Timeframe? timeframe = null, int? period = null, MaMethod? method = null, AppliedPrice? appliedPrice = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Calculation lookback period. |
| `method` | [`MaMethod?`](../../enums.md#mamethod) | Moving average smoothing method (SMA, EMA, SMMA, LWMA). |
| `appliedPrice` | [`AppliedPrice?`](../../enums.md#appliedprice) | Price component to apply calculation on. |
| `indicatorAlias` | `string?` | Unique alias for this indicator instance. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual line styles configuration delegate. |

---

**Return Value**

Returns [`IIndicatorMA`](../../interfaces.md#iindicatorma) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
Contains specialized helper methods `GetTrend` for trend direction detection and `DetectCrossover` for fast/slow crossovers.

---

**Example**

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

## Parabolic SAR

Identifies trend reversal points and provides trailing stops.

---

**Syntax**

```csharp
IIndicatorSAR CreateIndicatorSAR(string? symbol = null, Timeframe? timeframe = null, double? step = null, double? maximum = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `step` | `double?` | Increment step factor. |
| `maximum` | `double?` | Maximum step factor. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorSAR`](../../interfaces.md#iindicatorsar) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
Provides specialized helper methods `IsBullish()` and `IsBearish()` to easily detect the trend state.

---

**Example**

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

## SuperTrend
A trend-following indicator based on Average True Range (ATR) volatility and median price. ---

**Syntax**

```csharp
IIndicatorSuperTrend SuperTrend(string? symbol, Timeframe? timeframe, int? period, double? multiplier, string? indicatorAlias, Action<IndicatorProperty>? propertyOptions);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | ATR calculation lookback period. |
| `multiplier` | `double?` | ATR multiplier threshold factor. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Return Value**

Returns [`IIndicatorSuperTrend`](../../interfaces.md#iindicatorsupertrend) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

**Remarks**

Contains specialized methods such as `IsBullish()`, `IsBearish()`, `HasBullishReversal()`, `HasBearishReversal()`, and `GetDistanceFromSuperTrend()`.

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;
public class MyStrategy : StrategyBase
{
    private IIndicatorSuperTrend _st;
public override async Task OnInitAsync()
{
    _st = Context.Timeseries.CreateIndicatorSuperTrend(period: 10, multiplier: 3.0, indicatorAlias: "SuperTrend");
}
public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("SuperTrend") <= 0) return;
    if (_st.HasBullishReversal())
    {
        Logger.Info("SuperTrend flipped to Bullish!");
    }
}
}
```

---

## Triple Exponential Moving Average (TEMA)

A trend-following moving average with even less lag than DEMA.

---

**Syntax**

```csharp
IIndicatorTEMA CreateIndicatorTEMA(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Lookback period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorTEMA`](../../interfaces.md#iindicatortema) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
TEMA uses three EMAs to further reduce lag compared to DEMA and standard EMA.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorTEMA _tema;

public override async Task OnInitAsync()
{
    _tema = Context.Timeseries.CreateIndicatorTEMA(period: 20, indicatorAlias: "TEMA20");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("TEMA20") <= 0) return;
    decimal value = _tema.GetAt(0).Value;
    Logger.Info($"Current TEMA: {value:F2}");
}
}
```

