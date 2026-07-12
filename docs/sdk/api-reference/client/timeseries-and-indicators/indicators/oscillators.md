---
title: Oscillators
---

# Oscillators
## Average True Range (ATR)

Äo lÆ°á»ng má»©c Ä‘á»™ biáº¿n Ä‘á»™ng tuyá»‡t Ä‘á»‘i cá»§a thá»‹ trÆ°á»ng.

---

**Syntax**

```csharp
IIndicatorATR CreateIndicatorATR(string? symbol = null, Timeframe? timeframe = null, int? period = null, MaMethod? method = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | ATR calculation period. |
| `method` | `MaMethod?` | Smoothing moving average method (usually SMA/EMA). |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorATR` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

ATR measures market volatility without considering direction.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorATR _atr;

public override async Task OnInitAsync()
{
    _atr = Context.Timeseries.CreateIndicatorATR(period: 14, indicatorAlias: "ATR");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("ATR") <= 0) return;
    decimal value = _atr.GetAt(0).Value;
    Logger.Info($"Current ATR Volatility: {value:F4}");
}
}
```


## Bollinger Band Width (BBW)

Äo lÆ°á»ng Ä‘á»™ rá»™ng pháº§n trÄƒm giá»¯a dáº£i Bollinger trĂªn vĂ  dÆ°á»›i Ä‘á»ƒ Ä‘Ă¡nh giĂ¡ Ä‘á»™ng nÄƒng biáº¿n Ä‘á»™ng.

---

**Syntax**

```csharp
IIndicatorBollingerBandWidth CreateIndicatorBollingerBandWidth(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? multiplier = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | MA period. |
| `multiplier` | `double?` | Standard deviation multiplier. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorBollingerBandWidth` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Includes volatility methods: `GetWidth()`, `IsSqueeze()`, and `IsExpansion()`.

---

**Example**

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


## Bollinger Bands %B (%B)

Äá»‹nh lÆ°á»£ng vá»‹ trĂ­ tÆ°Æ¡ng quan cá»§a giĂ¡ so vá»›i hai dáº£i biĂªn Bollinger.

---

**Syntax**

```csharp
IIndicatorBollingerPercentB CreateIndicatorBollingerPercentB(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? multiplier = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | MA period. |
| `multiplier` | `double?` | Standard deviation multiplier. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorBollingerPercentB` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Includes helper methods: `GetPercentB()`, `IsOverbought()`, and `IsOversold()`.

---

**Example**

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


## Commodity Channel Index (CCI)

Äo lÆ°á»ng má»©c Ä‘á»™ sai lá»‡ch cá»§a giĂ¡ so vá»›i giĂ¡ trung bĂ¬nh thá»‘ng kĂª Ä‘á»ƒ phĂ¡t hiá»‡n vĂ¹ng cá»±c Ä‘oan.

---

**Syntax**

```csharp
IIndicatorCCI CreateIndicatorCCI(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorCCI` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Includes helper methods: `IsOverbought(double threshold = 100, int index = 0)` and `IsOversold(double threshold = -100, int index = 0)`.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorCCI _cci;

public override async Task OnInitAsync()
{
    _cci = Context.Timeseries.CreateIndicatorCCI(period: 20, indicatorAlias: "CCI");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("CCI") <= 0) return;
    if (_cci.IsOverbought())
    {
        Logger.Info("CCI is Overbought (> 100)!");
    }
}
}
```


## DeMarker (DeM)

So sĂ¡nh Ä‘á»‰nh/Ä‘Ă¡y cá»§a chu ká»³ hiá»‡n táº¡i vá»›i chu ká»³ trÆ°á»›c Ä‘á»ƒ Ä‘Ă¡nh giĂ¡ nhu cáº§u thá»‹ trÆ°á»ng.

---

**Syntax**

```csharp
IIndicatorDeMarker CreateIndicatorDeMarker(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | DeMarker calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorDeMarker` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Specialized helper methods: `IsOverbought(double threshold = 0.7, int index = 0)` and `IsOversold(double threshold = 0.3, int index = 0)`.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorDeMarker _dem;

public override async Task OnInitAsync()
{
    _dem = Context.Timeseries.CreateIndicatorDeMarker(period: 14, indicatorAlias: "DeMarker");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("DeMarker") <= 0) return;
    if (_dem.IsOverbought())
    {
        Logger.Info("DeMarker is Overbought (> 0.7)!");
    }
}
}
```


## Moving Average Convergence Divergence (MACD)

Chá»‰ bĂ¡o Ä‘á»™ng lÆ°á»£ng theo xu hÆ°á»›ng thá»ƒ hiá»‡n má»‘i liĂªn há»‡ giá»¯a hai Ä‘Æ°á»ng trung bĂ¬nh Ä‘á»™ng.

---

**Syntax**

```csharp
IIndicatorMACD CreateIndicatorMACD(string? symbol = null, Timeframe? timeframe = null, int? fastPeriod = null, int? slowPeriod = null, int? signalPeriod = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `fastPeriod` | `int?` | Fast EMA period. |
| `slowPeriod` | `int?` | Slow EMA period. |
| `signalPeriod` | `int?` | Signal line smoothing period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorMACD` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Specialized helper methods: `GetMacd()`, `GetSignal()`, and `GetHistogram()`.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorMACD _macd;

public override async Task OnInitAsync()
{
    _macd = Context.Timeseries.CreateIndicatorMACD(fastPeriod: 12, slowPeriod: 26, signalPeriod: 9, indicatorAlias: "MACD");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("MACD") <= 0) return;
    decimal macdLine = _macd.GetMacd(0).Value;
    decimal sigLine = _macd.GetSignal(0).Value;
    Logger.Info($"MACD: {macdLine:F4}, Signal: {sigLine:F4}");
}
}
```


## Money Flow Index (MFI)

Äo lÆ°á»ng dĂ²ng tiá»n thĂ´ng qua tĂ­ch há»£p cáº£ dá»¯ liá»‡u giĂ¡ vĂ  khá»‘i lÆ°á»£ng.

---

**Syntax**

```csharp
IIndicatorMFI CreateIndicatorMFI(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
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

Returns `IIndicatorMFI` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Includes helper methods: `IsOverbought(double threshold = 80, int index = 0)` and `IsOversold(double threshold = 20, int index = 0)`.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorMFI _mfi;

public override async Task OnInitAsync()
{
    _mfi = Context.Timeseries.CreateIndicatorMFI(period: 14, indicatorAlias: "MFI");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("MFI") <= 0) return;
    if (_mfi.IsOversold())
    {
        Logger.Info("MFI is Oversold (< 20)!");
    }
}
}
```


## Momentum

Äo lÆ°á»ng tá»· lá»‡ tá»‘c Ä‘á»™ biáº¿n Ä‘á»™ng giĂ¡ cá»§a má»™t tĂ i sáº£n giao dá»‹ch.

---

**Syntax**

```csharp
IIndicatorMomentum CreateIndicatorMomentum(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Momentum period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorMomentum` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Includes a specialized helper method `FindMomentum(int index = 0)` to retrieve momentum values.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorMomentum _mom;

public override async Task OnInitAsync()
{
    _mom = Context.Timeseries.CreateIndicatorMomentum(period: 10, indicatorAlias: "MOM");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("MOM") <= 0) return;
    decimal value = _mom.FindMomentum(0).Value;
    Logger.Info($"Current Momentum: {value:F2}");
}
}
```


## Oscillator of Moving Average (OsMA)

Äo lÆ°á»ng khoáº£ng cĂ¡ch sai lá»‡ch giá»¯a Ä‘Æ°á»ng MACD vĂ  Ä‘Æ°á»ng tĂ­n hiá»‡u MACD.

---

**Syntax**

```csharp
IIndicatorOsMA CreateIndicatorOsMA(string sourceId1, string sourceId2, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `sourceId1` | `string` | The ID of the first source indicator (usually MACD line). |
| `sourceId2` | `string` | The ID of the second source indicator (usually MACD Signal line). |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorOsMA` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Calculates the difference between the main line and the signal line of a source indicator (like MACD).

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorOsMA _osma;

public override async Task OnInitAsync()
{
    // Make sure MACD is initialized first with "MACD" alias
    _osma = Context.Timeseries.CreateIndicatorOsMA("MACD", "MACD_Signal", indicatorAlias: "OsMA");
}
}
```


## Relative Strength Index (RSI)

Chá»‰ bĂ¡o dao Ä‘á»™ng Ä‘á»™ng lÆ°á»£ng Ä‘o lÆ°á»ng tá»‘c Ä‘á»™ vĂ  thay Ä‘á»•i cá»§a biáº¿n Ä‘á»™ng giĂ¡.

---

**Syntax**

```csharp
IIndicatorRSI CreateIndicatorRSI(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | RSI calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorRSI` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Specialized helper methods: `IsOverbought(double threshold = 70, int index = 0)` and `IsOversold(double threshold = 30, int index = 0)`.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorRSI _rsi;

public override async Task OnInitAsync()
{
    _rsi = Context.Timeseries.CreateIndicatorRSI(period: 14, indicatorAlias: "RSI14");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("RSI14") <= 0) return;
    if (_rsi.IsOversold())
    {
        Logger.Info("RSI is Oversold (< 30)!");
    }
}
}
```


## Relative Vigor Index (RVI)

Äo lÆ°á»ng nÄƒng lÆ°á»£ng tÆ°Æ¡ng Ä‘á»‘i cá»§a xu hÆ°á»›ng giĂ¡ hiá»‡n hĂ nh.

---

**Syntax**

```csharp
IIndicatorRVI CreateIndicatorRVI(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | RVI period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorRVI` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

RVI is based on the idea that prices tend to close higher than they open in uptrends, and lower in downtrends.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorRVI _rvi;

public override async Task OnInitAsync()
{
    _rvi = Context.Timeseries.CreateIndicatorRVI(period: 10, indicatorAlias: "RVI");
}
}
```


## Standard Deviation (StdDev)

Äo lÆ°á»ng má»©c Ä‘á»™ biáº¿n Ä‘á»™ng cá»§a thá»‹ trÆ°á»ng thĂ´ng qua Ä‘á»™ lá»‡ch chuáº©n thá»‘ng kĂª.

---

**Syntax**

```csharp
IIndicatorStdDev CreateIndicatorStdDev(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Deviation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorStdDev` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

StdDev measures market volatility. High values suggest high volatility and potential trend changes.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorStdDev _stdDev;

public override async Task OnInitAsync()
{
    _stdDev = Context.Timeseries.CreateIndicatorStdDev(period: 20, indicatorAlias: "StdDev");
}
}
```


## Stochastic Oscillator

So sĂ¡nh giĂ¡ Ä‘Ă³ng cá»­a vá»›i má»™t pháº¡m vi giĂ¡ trong má»™t khoáº£ng thá»i gian.

---

**Syntax**

```csharp
IIndicatorStochastic CreateIndicatorStochastic(string? symbol = null, Timeframe? timeframe = null, int? kPeriod = null, int? dPeriod = null, int? kSlow = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `kPeriod` | `int?` | %K line lookback period. |
| `dPeriod` | `int?` | %D line smoothing period. |
| `kSlow` | `int?` | Slowing factor for %K line. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorStochastic` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Specialized helper methods: `GetK()`, `GetD()`, `IsOverbought()`, and `IsOversold()`.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorStochastic _stoch;

public override async Task OnInitAsync()
{
    _stoch = Context.Timeseries.CreateIndicatorStochastic(kPeriod: 14, dPeriod: 3, kSlow: 3, indicatorAlias: "Stoch");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("Stoch") <= 0) return;
    decimal k = _stoch.GetK(0).Value;
    decimal d = _stoch.GetD(0).Value;
    if (k > d && _stoch.IsOversold(20))
    {
        Logger.Info("Stochastic crossover detected in oversold zone!");
    }
}
}
```


## Triple Exponential Average (TRIX)

Chá»‰ bĂ¡o dao Ä‘á»™ng Ä‘o lÆ°á»ng tá»· lá»‡ thay Ä‘á»•i cá»§a trung bĂ¬nh Ä‘á»™ng lÅ©y thá»«a Ä‘Æ°á»£c lĂ m mÆ°á»£t ba láº§n.

---

**Syntax**

```csharp
IIndicatorTRIX CreateIndicatorTRIX(string sourceId, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `sourceId` | `string` | The ID of the source indicator (usually a moving average). |
| `period` | `int?` | TRIX period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorTRIX` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

TRIX shows the rate of change of a triple-exponentially smoothed moving average.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorTRIX _trix;

public override async Task OnInitAsync()
{
    _trix = Context.Timeseries.CreateIndicatorTRIX("EMA10", period: 9, indicatorAlias: "TRIX");
}
}
```


## Williams' Percent Range (WPR)

Chá»‰ bĂ¡o Ä‘á»™ng lÆ°á»£ng Ä‘o lÆ°á»ng vĂ¹ng quĂ¡ mua/quĂ¡ bĂ¡n, thÆ°á»ng dao Ä‘á»™ng tá»« 0 Ä‘áº¿n -100.

---

**Syntax**

```csharp
IIndicatorWPR CreateIndicatorWPR(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | WPR period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

**Return Value**

Returns `IIndicatorWPR` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Specialized helper methods: `IsOverbought(double threshold = -20, int index = 0)` and `IsOversold(double threshold = -80, int index = 0)`.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorWPR _wpr;

public override async Task OnInitAsync()
{
    _wpr = Context.Timeseries.CreateIndicatorWPR(period: 14, indicatorAlias: "WPR");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("WPR") <= 0) return;
    if (_wpr.IsOversold())
    {
        Logger.Info("Williams %R is Oversold (< -80)!");
    }
}
}
```


