---
title: Oscillators
---

# Oscillators
## Average True Range (ATR)

Measures the absolute volatility of the market.

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
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | ATR calculation period. |
| `method` | [`MaMethod?`](../../enums.md#mamethod) | Smoothing moving average method (usually SMA/EMA). |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorATR`](../../interfaces.md#iindicatoratr) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
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

Measures the percentage width between upper and lower Bollinger Bands to evaluate volatility.

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
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | MA period. |
| `multiplier` | `double?` | Standard deviation multiplier. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorBollingerBandWidth`](../../interfaces.md#iindicatorbollingerbandwidth) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
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

Quantifies a security's price relative to the upper and lower Bollinger Bands.

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
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | MA period. |
| `multiplier` | `double?` | Standard deviation multiplier. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorBollingerPercentB`](../../interfaces.md#iindicatorbollingerpercentb) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
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

Measures the deviation of the asset price from its statistical average.

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
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorCCI`](../../interfaces.md#iindicatorcci) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
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

Compares the most recent maximum and minimum prices to the previous period's equivalent prices to measure demand.

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
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | DeMarker calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorDeMarker`](../../interfaces.md#iindicatordemarker) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
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

A trend-following momentum indicator that shows the relationship between two moving averages of a security's price.

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
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `fastPeriod` | `int?` | Fast EMA period. |
| `slowPeriod` | `int?` | Slow EMA period. |
| `signalPeriod` | `int?` | Signal line smoothing period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorMACD`](../../interfaces.md#iindicatormacd) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
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

Measures the buying and selling pressure through integrating price and volume data.

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
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Lookback period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorMFI`](../../interfaces.md#iindicatormfi) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
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
Measures the rate of change of an asset's price. ---

**Syntax**

```csharp
IIndicatorMomentum Momentum(string? symbol, Timeframe? timeframe, int? period, string? indicatorAlias, Action<IndicatorProperty>? propertyOptions);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Momentum period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

**Return Value**

Returns [`IIndicatorMomentum`](../../interfaces.md#iindicatormomentum) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

**Remarks**

Includes a specialized helper method `FindMomentum(int index = 0)` to retrieve momentum values.

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

---

## Oscillator of Moving Average (OsMA)

Measures the difference between the MACD line and its signal line.

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
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorOsMA`](../../interfaces.md#iindicatorosma) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
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

A momentum oscillator that measures the speed and change of price movements.

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
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | RSI calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorRSI`](../../interfaces.md#iindicatorrsi) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
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

Measures the relative energy of the current price trend.

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
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | RVI period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorRVI`](../../interfaces.md#iindicatorrvi) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
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

Measures market volatility using statistical standard deviation.

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
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Deviation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorStdDev`](../../interfaces.md#iindicatorstddev) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
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

Compares a particular closing price of a security to a range of its prices over a certain period of time.

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
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `kPeriod` | `int?` | %K line lookback period. |
| `dPeriod` | `int?` | %D line smoothing period. |
| `kSlow` | `int?` | Slowing factor for %K line. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorStochastic`](../../interfaces.md#iindicatorstochastic) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
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

A momentum oscillator that measures the rate of change of a triple exponentially smoothed moving average.

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
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorTRIX`](../../interfaces.md#iindicatortrix) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
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

A momentum indicator that measures overbought and oversold levels, typically fluctuating between 0 and -100.

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
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | WPR period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorWPR`](../../interfaces.md#iindicatorwpr) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
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

