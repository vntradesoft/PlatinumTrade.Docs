---
id: index
title: Timeseries & Indicators Access
sidebar_position: 1
description: Introduction to ITimeSeriesClient and accessing market data series.
status: stable
visibility: public
---

# Access to Timeseries and Indicator Data

These are functions for working with timeseries and indicators. A timeseries differs from a regular data array by its reverse ordering â€” elements of timeseries are indexed from the end of the array to its beginning (from the most recent data to the oldest ones). 

In the Platinum Trade SDK, the `ITimeSeriesClient` interface provides local technical indicators and in-memory caching for strategies and charts.

---

## Indexing Direction (Shift)

The indexing direction of a timeseries always goes from the newest data to the oldest data. The index `0` denotes the current bar, i.e., the bar that corresponds to the unfinished time interval in this timeframe.

```text
  Oldest Candle                                        Current/Forming Candle
  [ Index N ]  ...  [ Index 3 ]  [ Index 2 ]  [ Index 1 ]  [ Index 0 ]
  <------------------------------------------------------------ (Shift direction)
```

- **Index `0`**: The current forming candle (unfinished).
- **Index `1`**: The last fully closed candle.
- **Index `2`**: The second-to-last closed candle, and so on.

---

## General Functions Reference

| Function | Description |
|---|---|
| [Bars](./timeseries.md#bars) | Returns the number of bars for a specified symbol and timeframe. |
| [BarsCalculated](./timeseries.md#barscalculated) | Returns the number of calculated bars for a specified indicator. |
| [CopyBuffer](./timeseries.md#copybuffer) | Copies indicator buffer values by index or time range. |
| [CopySeries](./timeseries.md#copyseries) | Copies an array of OHLCV candle data. |
| [CopyTimes](./timeseries.md#copytimes) | Copies open timestamps of candles. |
| [CopyOpens](./timeseries.md#copyopens) | Copies open prices of candles. |
| [CopyHighs](./timeseries.md#copyhighs) | Copies high prices of candles. |
| [CopyLows](./timeseries.md#copylows) | Copies low prices of candles. |
| [CopyCloses](./timeseries.md#copycloses) | Copies close prices of candles. |
| [CopyVolumes](./timeseries.md#copyvolumes) | Copies volume values of candles. |
| [CopyPrices](./timeseries.md#copyprices) | Copies prices by AppliedPrice type. |
| [Candle Access](./timeseries.md#candle-access) | Directly queries specific candles (current, closed, open, etc.). |
| [Creating Indicators](./timeseries.md#creating-indicators) | Factory methods to create built-in indicators (MA, RSI, Stochastic, etc.). |

---

## Built-in Technical Indicator Groups

Select a group below to view the available built-in technical indicators, their formulas, interfaces, and examples.

| Indicator Group | Description | Link |
|---|---|---|
| **Trend Indicators** | Standard trend-following lines such as Moving Averages, Parabolic SAR, and Bollinger Bands. | [View Trend Indicators](./indicators/trend.md) |
| **Oscillators and Volatility** | Indicators measuring momentum and market volatility, e.g., RSI, Stochastic, MACD, and ATR. | [View Oscillators](./indicators/oscillators.md) |
| **Bill Williams Indicators** | The complete suite of Bill Williams indicators (Alligator, Fractals, AO, AC, Gator). | [View Bill Williams](./indicators/bill-williams.md) |
| **Volume Indicators** | Volume-based technical indicators (OBV, A/D, VWAP, Chaikin, Volume Spike). | [View Volume Indicators](./indicators/volumes.md) |

﻿---
id: index
title: Built-in Technical Indicators
sidebar_position: 1
description: Overview of built-in technical indicators, common access methods, and indicator buffers.
status: stable
visibility: public

## Common Access Methods (`IIndicatorMethodCommon`)

All indicator instances in the SDK implement the `IIndicatorMethodCommon` interface, which provides a standard way to retrieve calculated values without needing to access specific properties of each indicator type.

```csharp
public interface IIndicatorMethodCommon
{
    // Gets the indicator value at the specified index from the default buffer.
    IndicatorValue GetAt(int index = 0);
    
    // Gets the indicator value at the specified index from a specific buffer.
    IndicatorValue GetAt(int index, int bufferIndex);
    
    // Gets a sequence of indicator values from the default buffer.
    IEnumerable<IndicatorValue> GetRange(int count = 1);
    
    // Gets a sequence of indicator values from a specific buffer.
    IEnumerable<IndicatorValue> GetRange(int count, int bufferIndex);
}
```

## Indicator Categories

### Bill Williams

| Indicator | Description |
|---|---|
| [Accelerator Oscillator (AC)](./bill-williams.md#accelerator-oscillator-ac) | Measures the acceleration and deceleration of the current driving force. |
| [Alligator](./bill-williams.md#alligator) | A trend-following model combining three time-shifted moving averages. |
| [Awesome Oscillator (AO)](./bill-williams.md#awesome-oscillator-ao) | Measures the market momentum of the last 5 periods compared to the previous 34 periods. |
| [Gator Oscillator](./bill-williams.md#gator-oscillator) | Represents the convergence and divergence of the Alligator bands. |
| [Fractals](./bill-williams.md#fractals) | Identifies local tops and bottoms in price movements. |
| [Market Facilitation Index (BWMFI)](./bill-williams.md#market-facilitation-index-bwmfi) | Evaluates the price change of an asset per unit of trading volume. |

### Oscillators

| Indicator | Description |
|---|---|
| [Average True Range (ATR)](./oscillators.md#average-true-range-atr) | Measures the absolute volatility of the market. |
| [Bears Power](./oscillators.md#bears-power) | Estimates the balance of power of sellers relative to buyers. |
| [Bollinger Band Width (BBW)](./oscillators.md#bollinger-band-width-bbw) | Measures the percentage width between upper and lower Bollinger Bands to evaluate volatility. |
| [Bollinger Bands %B](./oscillators.md#bollinger-bands-b) | Quantifies a security's price relative to the upper and lower Bollinger Bands. |
| [Bulls Power](./oscillators.md#bulls-power) | Estimates the balance of power of buyers relative to sellers. |
| [Commodity Channel Index (CCI)](./oscillators.md#commodity-channel-index-cci) | Measures the deviation of the asset price from its statistical average. |
| [DeMarker (DeM)](./oscillators.md#demarker-dem) | Compares the most recent maximum and minimum prices to the previous period's equivalent prices to measure demand. |
| [MACD](./oscillators.md#macd) | A trend-following momentum indicator that shows the relationship between two moving averages of a security's price. |
| [Money Flow Index (MFI)](./oscillators.md#money-flow-index-mfi) | Measures the buying and selling pressure through integrating price and volume data. |
| [Momentum](./oscillators.md#momentum) | Measures the rate of change of an asset's price. |
| [OsMA](./oscillators.md#osma) | Measures the difference between the MACD line and its signal line. |
| [Relative Strength Index (RSI)](./oscillators.md#relative-strength-index-rsi) | A momentum oscillator that measures the speed and change of price movements. |
| [Relative Vigor Index (RVI)](./oscillators.md#relative-vigor-index-rvi) | Measures the relative energy of the current price trend. |
| [Standard Deviation (StdDev)](./oscillators.md#standard-deviation-stddev) | Measures market volatility using statistical standard deviation. |
| [Stochastic Oscillator](./oscillators.md#stochastic-oscillator) | Compares a particular closing price of a security to a range of its prices over a certain period of time. |
| [TRIX](./oscillators.md#trix) | A momentum oscillator that measures the rate of change of a triple exponentially smoothed moving average. |
| [Williams %R (WPR)](./oscillators.md#williams-r-wpr) | A momentum indicator that measures overbought and oversold levels, typically fluctuating between 0 and -100. |

### Trend

| Indicator | Description |
|---|---|
| [Average Directional Index (ADX)](./trend.md#average-directional-index-adx) | Measures the strength of the current market trend. |
| [ADX Wilder (ADXW)](./trend.md#adx-wilder-adxw) | Wilder's smoothing version of the Average Directional Index (ADXW). |
| [Adaptive Moving Average (AMA)](./trend.md#adaptive-moving-average-ama) | An adaptive moving average that dynamically adjusts its sensitivity based on market volatility. |
| [Bollinger Bands](./trend.md#bollinger-bands) | Volatility bands placed above and below a moving average. |
| [Double Exponential Moving Average (DEMA)](./trend.md#double-exponential-moving-average-dema) | Provides a faster response with less lag than a standard EMA. |
| [Envelopes](./trend.md#envelopes) | Upper and lower bands that shift at a percentage deviation from a moving average. |
| [Ichimoku Kinko Hyo](./trend.md#ichimoku-kinko-hyo) | A comprehensive trend indicator system that provides support/resistance and reversal points. |
| [Moving Average (MA)](./trend.md#moving-average-ma) | A standard moving average indicator to identify trend direction. |
| [Parabolic SAR](./trend.md#parabolic-sar) | Identifies trend reversal points and provides trailing stops. |
| [SuperTrend](./trend.md#supertrend) | A trend-following indicator based on Average True Range (ATR) volatility and median price. |
| [Triple Exponential Moving Average (TEMA)](./trend.md#triple-exponential-moving-average-tema) | A trend-following moving average with even less lag than DEMA. |

### Volumes

| Indicator | Description |
|---|---|
| [Accumulation/Distribution (A/D)](./volumes.md#accumulationdistribution-ad) | Measures the accumulation and distribution of volume by comparing the closing price to the trading range. |
| [Chaikin Oscillator](./volumes.md#chaikin-oscillator) | Applies the MACD principle to the Accumulation/Distribution (A/D) line. |
| [Force Index](./volumes.md#force-index) | Links price change with volume to measure the power driving a trend. |
| [On Balance Volume (OBV)](./volumes.md#on-balance-volume-obv) | Tracks cumulative volume flow to predict future price changes. |
| [Volume Spike](./volumes.md#volume-spike) | Identifies sudden spikes in trading volume compared to its average. |
| [Volume Weighted Average Price (VWAP)](./volumes.md#volume-weighted-average-price-vwap) | The average price of an asset traded over a session based on both volume and price. |



﻿---
title: Bill Williams

**Syntax**

```csharp
IIndicatorAC CreateIndicatorAC(string? symbol = null, Timeframe? timeframe = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorAC` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorAC _ac;

public override async Task OnInitAsync()
{
    _ac = Context.Timeseries.CreateIndicatorAC(indicatorAlias: "AC");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("AC") <= 0) return;
    bool isBullish = !_ac.GetUp(0).IsEmpty;
    Logger.Info($"AC is Bullish: {isBullish}");
}
}
```

## Alligator
A trend-following model combining three time-shifted moving averages. ---

**Syntax**

```csharp
IIndicatorAlligator Alligator(string? symbol, Timeframe? timeframe, string? indicatorAlias, Action<IndicatorProperty>? propertyOptions);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Return Value**

Returns `IIndicatorAlligator` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

**Remarks**

Provides specialized line getter methods `GetJaw()` (Blue line), `GetTeeth()` (Red line), and `GetLips()` (Green line).

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;
public class MyStrategy : StrategyBase
{
    private IIndicatorAlligator _alligator;
public override async Task OnInitAsync()
{
    _alligator = Context.Timeseries.CreateIndicatorAlligator(indicatorAlias: "Gator");
}
public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("Gator") <= 0) return;
    decimal jaw = _alligator.GetJaw(0).Value;
    decimal teeth = _alligator.GetTeeth(0).Value;
    decimal lips = _alligator.GetLips(0).Value;
    Logger.Info($"Jaw: {jaw:F2}, Teeth: {teeth:F2}, Lips: {lips:F2}");
}
}
```

**Syntax**

```csharp
IIndicatorAO CreateIndicatorAO(string? symbol = null, Timeframe? timeframe = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorAO` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorAO _ao;

public override async Task OnInitAsync()
{
    _ao = Context.Timeseries.CreateIndicatorAO(indicatorAlias: "AO");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("AO") <= 0) return;
    bool isBullish = !_ao.GetUp(0).IsEmpty;
    Logger.Info($"AO is Bullish: {isBullish}");
}
}
```

## Market Facilitation Index (BWMFI)

Evaluates the price change of an asset per unit of trading volume.

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `multiplier` | `double?` | Index multiplier scale factor. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Remarks**
Provides methods to check Williams' bar types: `GetGreen()`, `GetBrown()`, `GetBlue()`, and `GetPink()`.

## Gator Oscillator

Represents the convergence and divergence of the Alligator bands.

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Remarks**
Provides `GetUp()` (absolute distance between Jaw and Teeth) and `GetDown()` (negative distance between Teeth and Lips).

﻿---
title: Oscillators

**Syntax**

```csharp
IIndicatorATR CreateIndicatorATR(string? symbol = null, Timeframe? timeframe = null, int? period = null, MaMethod? method = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorATR` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | MA period. |
| `multiplier` | `double?` | Standard deviation multiplier. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Remarks**
Includes volatility methods: `GetWidth()`, `IsSqueeze()`, and `IsExpansion()`.

**Syntax**

```csharp
IIndicatorBollingerPercentB CreateIndicatorBollingerPercentB(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? multiplier = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorBollingerPercentB` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Remarks**
Includes helper methods: `IsOverbought(double threshold = 100, int index = 0)` and `IsOversold(double threshold = -100, int index = 0)`.

**Syntax**

```csharp
IIndicatorDeMarker CreateIndicatorDeMarker(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorDeMarker` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

**Remarks**
Specialized helper methods: `GetMacd()`, `GetSignal()`, and `GetHistogram()`.

**Syntax**

```csharp
IIndicatorMFI CreateIndicatorMFI(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorMFI` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Momentum period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Return Value**

Returns `IIndicatorMomentum` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

**Syntax**

```csharp
IIndicatorOsMA CreateIndicatorOsMA(string sourceId1, string sourceId2, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorOsMA` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | RSI calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Remarks**
Specialized helper methods: `IsOverbought(double threshold = 70, int index = 0)` and `IsOversold(double threshold = 30, int index = 0)`.

**Syntax**

```csharp
IIndicatorRVI CreateIndicatorRVI(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorRVI` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Deviation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Remarks**
StdDev measures market volatility. High values suggest high volatility and potential trend changes.

**Syntax**

```csharp
IIndicatorStochastic CreateIndicatorStochastic(string? symbol = null, Timeframe? timeframe = null, int? kPeriod = null, int? dPeriod = null, int? kSlow = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorStochastic` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `sourceId` | `string` | The ID of the source indicator (usually a moving average). |
| `period` | `int?` | TRIX period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Remarks**
TRIX shows the rate of change of a triple-exponentially smoothed moving average.

**Syntax**

```csharp
IIndicatorWPR CreateIndicatorWPR(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorWPR` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

﻿---
title: Trend

**Syntax**

```csharp
IIndicatorADX CreateIndicatorADX(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorADX` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | ADX Wilder calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Remarks**
Includes crossover and direction helper methods: `IsBullish()`, `IsBearish()`, `IsBullishCrossover()`, and `IsBearishCrossover()`.

**Syntax**

```csharp
IIndicatorAMA CreateIndicatorAMA(string? symbol = null, Timeframe? timeframe = null, int? period = null, int? fast = null, int? slow = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorAMA` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Moving average period. |
| `multiplier` | `double?` | Upper/lower band standard deviation multiplier. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Remarks**
Provides band access methods `GetUpper()`, `GetLower()`, `GetMiddle()`, `GetWidth()` and squeeze/expansion detection: `IsSqueeze()` and `IsExpansion()`.

**Syntax**

```csharp
IIndicatorDEMA CreateIndicatorDEMA(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorDEMA` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Moving average period. |
| `deviation` | `double?` | Envelope band deviation multiplier. |
| `method` | `MaMethod?` | Moving average smoothing method. |
| `appliedPrice` | `AppliedPrice?` | Price component to apply calculation on. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Return Value**

Returns `IIndicatorEnvelopes` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

**Syntax**

```csharp
IIndicatorIchimoku CreateIndicatorIchimoku(string? symbol = null, Timeframe? timeframe = null, int? tenkanPeriod = null, int? kijunPeriod = null, int? senkouBPeriod = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorIchimoku` which inherits from `IIndicator`.

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

**Remarks**
Contains specialized helper methods `GetTrend` for trend direction detection and `DetectCrossover` for fast/slow crossovers.

**Syntax**

```csharp
IIndicatorSAR CreateIndicatorSAR(string? symbol = null, Timeframe? timeframe = null, double? step = null, double? maximum = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorSAR` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | ATR calculation lookback period. |
| `multiplier` | `double?` | ATR multiplier threshold factor. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Return Value**

Returns `IIndicatorSuperTrend` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

**Syntax**

```csharp
IIndicatorTEMA CreateIndicatorTEMA(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorTEMA` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

﻿---
title: Volumes

**Syntax**

```csharp
IIndicatorAD CreateIndicatorAD(string? symbol = null, Timeframe? timeframe = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorAD` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `fast` | `int?` | Fast MA period (default 3). |
| `slow` | `int?` | Slow MA period (default 10). |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Remarks**
Applies MACD logic to the Accumulation/Distribution line to identify momentum shifts.

**Syntax**

```csharp
IIndicatorForce CreateIndicatorForce(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorForce` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Remarks**
OBV adds volume on up days and subtracts volume on down days to measure cumulative volume flow.

**Syntax**

```csharp
IIndicatorVolumeSpike CreateIndicatorVolumeSpike(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? spikeThreshold = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Return Value**

Returns `IIndicatorVolumeSpike` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

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

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `resetDaily` | `bool?` | Reset the cumulative volume/price products daily at 00:00 UTC. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

**Remarks**
Includes helper methods: `FindVWAP()`, `FindCumulativeVolume()`, `IsPriceAboveVWAP()`, `IsPriceBelowVWAP()`, and `GetDistanceFromVWAP()`.

The `ITimeSeriesClient` interface provides local technical indicators and in-memory caching for strategies and charts.

The only underlying API call is invoked by the background scheduler to sync kline database:

## API Mappings

| Action | OKX.Net Call | OKX API Endpoint | OKX API Documentation |
|---|---|---|---|
| Fetch Candles | `UnifiedApi.ExchangeData.GetKlineHistoryAsync` | `GET /api/v5/market/history-candles` | [Get Candlesticks History](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-candlesticks-history) |

## Bars
Returns the total number of bars available for a trading pair and timeframe.

**Syntax**

```csharp
int Bars(string? symbol, Timeframe? timeframe);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading symbol (e.g., "BTC-USDT"). If null, uses the default symbol. |
| `timeframe` | `Timeframe?` | The timeframe (e.g., `Timeframe.OneHour`). If null, uses the default timeframe. |

**Return Value**

Returns the total number of available bars as an `int`.

**Remarks**

No special remarks.

**Example**

```csharp
int totalBars = Market.Bars("BTC-USDT", Timeframe.OneHour);
Logger.Info($"Total 1H bars for BTC-USDT: {totalBars}");
```

## Candle Access

Directly queries specific candles (current, closed, open, etc.).

**Syntax**

```csharp
Task<CandleData> GetOHCLVAsync(string? symbol = null, Timeframe? timeframe = null, int shift = 0, CancellationToken ct = default);
Task<CandleData> GetCurrentCandleAsync(string? symbol = null, Timeframe? timeframe = null, CancellationToken ct = default);
DateTime GetTime(Timeframe timeframe, int shift);
CandleData GetOpenCandle(string? symbol = null, Timeframe? timeframe = null);
CandleData GetLastClosedCandle(string? symbol = null, Timeframe? timeframe = null);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading symbol. |
| `timeframe` | `Timeframe?` | The timeframe for the candle. |
| `shift` | `int` | The shift index (0 = current forming candle, 1 = last closed candle, etc.). |
| `ct` | `CancellationToken` | The cancellation token for async tasks. |

**Return Value**

Returns a `CandleData` object or a `DateTime` representing the candle's open time.

**Example**

```csharp
// Get the last closed candle
CandleData lastClosed = Market.GetLastClosedCandle();
Logger.Info($"Last closed candle close price: {lastClosed.Close}");

// Get the open time of the current forming candle
DateTime currentOpenTime = Market.GetTime(Timeframe.OneMinute, 0);
```

## CopyBuffer
Copies indicator buffer values by index or time range.

**Syntax**

```csharp
int CopyBuffer(string indicatorHandle, int bufferNumber, int startIndex, int count, DateTime startTime, DateTime endTime, out IEnumerable<IndicatorValue> buffers);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `indicatorHandle` | `string` | The unique handle of the indicator. |
| `bufferNumber` | `int` | The buffer number to copy from (e.g., 0 for main line). |
| `startIndex` | `int` | The starting index in the buffer (0 is the current candle, 1 is previous). |
| `count` | `int` | The number of values to copy. |
| `startTime` | `DateTime` | The start time for copying data. |
| `endTime` | `DateTime` | The end time of the range. |
| `buffers` | `out IEnumerable<IndicatorValue>` | The output enumerable of copied indicator values. |

**Return Value**

Returns the number of values successfully copied as an `int`.

**Remarks**

No special remarks.

**Example**

```csharp
var rsi = Market.CreateIndicatorRSI(period: 14);
int copied = Market.CopyBuffer(rsi.Id, 0, 1, 3, out var rsiValues);
foreach (var val in rsiValues)
{
    Logger.Info($"RSI Value: {val.Value} at {val.Time}");
}
```

## CopyHighs
Copies high prices of candles.

**Syntax**

```csharp
decimal[] CopyHighs(string? symbol, Timeframe? tf, int / DateTime startPos / startTime, int / DateTime count / endTime);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading symbol (optional). |
| `tf` | `Timeframe?` | The timeframe (optional). |
| `startPos` / `startTime` | `int` / `DateTime` | The starting position index or the start time. |
| `count` / `endTime` | `int` / `DateTime` | The number of prices to copy, or the end time. |

**Return Value**

Returns an array of high prices (`decimal[]`).

**Remarks**

No special remarks.

**Example**

```csharp
// Get the highest high in the last 10 candles
decimal[] highs = await Market.CopyHighs(null, null, 1, 10);
decimal highest = highs.Max();
```

## CopyOpens
Copies open prices of candles.

**Syntax**

```csharp
decimal[] CopyOpens(string? symbol, Timeframe? tf, int / DateTime startPos / startTime, int / DateTime count / endTime);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading symbol (optional). |
| `tf` | `Timeframe?` | The timeframe (optional). |
| `startPos` / `startTime` | `int` / `DateTime` | The starting position index or the start time. |
| `count` / `endTime` | `int` / `DateTime` | The number of prices to copy, or the end time. |

**Return Value**

Returns an array of open prices (`decimal[]`).

**Remarks**

No special remarks.

**Example**

```csharp
decimal[] opens = await Market.CopyOpens(null, null, 1, 3);
```

## CopySeries
Copies an array of OHLCV candle data.

**Syntax**

```csharp
CandleData CopySeries(string? symbol, Timeframe? timeframe, int / DateTime startPos / startTime, int / DateTime count / endTime);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading symbol (optional). |
| `timeframe` | `Timeframe?` | The timeframe (optional). |
| `startPos` / `startTime` | `int` / `DateTime` | The starting position index or the start time. |
| `count` / `endTime` | `int` / `DateTime` | The number of candles to copy, or the end time. |

**Return Value**

Returns an array of `CandleData` objects.

**Remarks**

No special remarks.

**Example**

```csharp
// Get full candle data for the last 3 candles
CandleData[] candles = await Market.CopySeries(null, null, 1, 3);
foreach(var candle in candles)
{
    Logger.Info($"O: {candle.Open} H: {candle.High} L: {candle.Low} C: {candle.Close}");
}
```

## CopyVolumes
Copies volume values of candles.

**Syntax**

```csharp
decimal[] CopyVolumes(string? symbol, Timeframe? tf, int / DateTime startPos / startTime, int / DateTime count / endTime);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading symbol (optional). |
| `tf` | `Timeframe?` | The timeframe (optional). |
| `startPos` / `startTime` | `int` / `DateTime` | The starting position index or the start time. |
| `count` / `endTime` | `int` / `DateTime` | The number of volumes to copy, or the end time. |

**Return Value**

Returns an array of volume values (`decimal[]`).

**Remarks**

No special remarks.

**Example**

```csharp
decimal[] volumes = await Market.CopyVolumes(null, null, 1, 5);
```

