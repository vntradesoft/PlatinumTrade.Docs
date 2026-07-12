---
title: 
---

# 


## Average Directional Index (ADX)

Äo lÆ°á»ng sá»©c máº¡nh cá»§a xu hÆ°á»›ng thá»‹ trÆ°á»ng hiá»‡n táº¡i.

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | ADX calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorADX` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | ADX Wilder calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorADXW` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

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

ÄÆ°á»ng trung bĂ¬nh Ä‘á»™ng tá»± Ä‘á»™ng Ä‘iá»u chá»‰nh Ä‘á»™ nháº¡y dá»±a trĂªn má»©c Ä‘á»™ biáº¿n Ä‘á»™ng cá»§a thá»‹ trÆ°á»ng.

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Efficiency Ratio lookback period. |
| `fast` | `int?` | Fast EMA period. |
| `slow` | `int?` | Slow EMA period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorAMA` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

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

Dáº£i bÄƒng biáº¿n Ä‘á»™ng xung quanh má»™t Ä‘Æ°á»ng trung bĂ¬nh Ä‘á»™ng.

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Moving average period. |
| `multiplier` | `double?` | Upper/lower band standard deviation multiplier. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorBollingerBands` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

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

Cung cáº¥p pháº£n á»©ng nhanh hÆ¡n vá»›i Ä‘á»™ trá»… tháº¥p hÆ¡n so vá»›i EMA thĂ´ng thÆ°á»ng.

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Lookback period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorDEMA` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

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

ÄÆ°á»ng bao bao gá»“m dáº£i biĂªn trĂªn vĂ  biĂªn dÆ°á»›i dá»‹ch chuyá»ƒn theo tá»‰ lá»‡ lá»‡ch so vá»›i Ä‘Æ°á»ng trung bĂ¬nh.

---

**Syntax**

```csharp
IIndicatorEnvelopes CreateIndicatorEnvelopes(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? deviation = null, MaMethod? method = null, AppliedPrice? appliedPrice = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Moving average period. |
| `deviation` | `double?` | Envelope band deviation multiplier. |
| `method` | `MaMethod?` | Moving average smoothing method. |
| `appliedPrice` | `AppliedPrice?` | Price component to apply calculation on. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorEnvelopes` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Provides `GetUpper()`, `GetLower()`, `IsPriceAboveUpper()`, and `IsPriceBelowLower()` to detect breakout signals.

---

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


## Ichimoku Kinko Hyo

Há»‡ thá»‘ng chá»‰ bĂ¡o xu hÆ°á»›ng toĂ n diá»‡n cung cáº¥p khĂ¡ng cá»±/há»— trá»£ vĂ  Ä‘iá»ƒm Ä‘áº£o chiá»u.

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `tenkanPeriod` | `int?` | Tenkan-sen (conversion line) period. |
| `kijunPeriod` | `int?` | Kijun-sen (base line) period. |
| `senkouBPeriod` | `int?` | Senkou Span B period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorIchimoku` which inherits from `IIndicator`.

---

## Remarks

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

**Syntax**

```csharp
IIndicatorMA CreateIndicatorMA(string? symbol = null, Timeframe? timeframe = null, int? period = null, MaMethod? method = null, AppliedPrice? appliedPrice = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Calculation lookback period. |
| `method` | `MaMethod?` | Moving average smoothing method (SMA, EMA, SMMA, LWMA). |
| `appliedPrice` | `AppliedPrice?` | Price component to apply calculation on. |
| `indicatorAlias` | `string?` | Unique alias for this indicator instance. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual line styles configuration delegate. |

---

**Return Value**

Returns `IIndicatorMA` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

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

XĂ¡c Ä‘á»‹nh Ä‘iá»ƒm Ä‘áº£o chiá»u xu hÆ°á»›ng vĂ  thiáº¿t láº­p trailing stop.

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `step` | `double?` | Increment step factor. |
| `maximum` | `double?` | Maximum step factor. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorSAR` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

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

Chá»‰ bĂ¡o theo xu hÆ°á»›ng dá»±a trĂªn Ä‘á»™ biáº¿n Ä‘á»™ng ATR vĂ  giĂ¡ trung vá»‹.

---

**Syntax**

```csharp
IIndicatorSuperTrend CreateIndicatorSuperTrend(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? multiplier = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | ATR calculation lookback period. |
| `multiplier` | `double?` | ATR multiplier threshold factor. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorSuperTrend` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Contains specialized methods such as `IsBullish()`, `IsBearish()`, `HasBullishReversal()`, `HasBearishReversal()`, and `GetDistanceFromSuperTrend()`.

---

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


## Triple Exponential Moving Average (TEMA)

ÄÆ°á»ng trung bĂ¬nh Ä‘á»™ng bĂ¡m xu hÆ°á»›ng vá»›i Ä‘á»™ trá»… tháº¥p hÆ¡n cáº£ DEMA.

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Lookback period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorTEMA` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

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

