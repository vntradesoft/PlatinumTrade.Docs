---
title: Timeseries
---

# Timeseries

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

---

## BarsCalculated
Counts the number of bars calculated for a specific indicator.

**Syntax**

```csharp
int BarsCalculated(string indicatorId);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `indicatorId` | `string` | The unique ID of the indicator. |

**Return Value**

Returns the number of bars calculated as an `int`.

**Remarks**

No special remarks.

**Example**

```csharp
var rsi = Market.CreateIndicatorRSI(period: 14);
int calculated = Market.BarsCalculated(rsi.Id);
Logger.Info($"RSI has calculated {calculated} bars.");
```

---

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

---

## CopyCloses
Copies close prices of candles.

**Syntax**

```csharp
decimal[] CopyCloses(string? symbol, Timeframe? tf, int / DateTime startPos / startTime, int / DateTime count / endTime);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading symbol (optional). |
| `tf` | `Timeframe?` | The timeframe (optional). |
| `startPos` / `startTime` | `int` / `DateTime` | The starting position index or the start time. |
| `count` / `endTime` | `int` / `DateTime` | The number of prices to copy, or the end time. |

**Return Value**

Returns an array of close prices (`decimal[]`).

**Remarks**

No special remarks.

**Example**

```csharp
// Get the last 5 closed prices
decimal[] closes = await Market.CopyCloses(null, null, 1, 5);
decimal averageClose = closes.Average();
```

---

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

---

## CopyLows
Copies low prices of candles.

**Syntax**

```csharp
decimal[] CopyLows(string? symbol, Timeframe? tf, int / DateTime startPos / startTime, int / DateTime count / endTime);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading symbol (optional). |
| `tf` | `Timeframe?` | The timeframe (optional). |
| `startPos` / `startTime` | `int` / `DateTime` | The starting position index or the start time. |
| `count` / `endTime` | `int` / `DateTime` | The number of prices to copy, or the end time. |

**Return Value**

Returns an array of low prices (`decimal[]`).

**Remarks**

No special remarks.

**Example**

```csharp
// Get the lowest low in the last 10 candles
decimal[] lows = await Market.CopyLows(null, null, 1, 10);
decimal lowest = lows.Min();
```

---

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

---

## CopyPrices
Copies prices by `AppliedPrice` type.

**Syntax**

```csharp
(DateTime, decimal) CopyPrices(AppliedPrice appliedPrice, string? symbol, Timeframe? timeframe, int / DateTime startPos / start, int / DateTime count / endTime, IEnumerable<CandleData> / CandleData ohclvs / ohclv);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `appliedPrice` | `AppliedPrice` | The type of price to extract (e.g., close, open, high, low, typical). |
| `symbol` | `string?` | The trading symbol (optional). |
| `timeframe` | `Timeframe?` | The timeframe (optional). |
| `startPos` / `start` | `int` / `DateTime` | The starting position index or the start time. |
| `count` / `endTime` | `int` / `DateTime` | The number of prices to copy, or the end time. |
| `ohclvs` / `ohclv` | `IEnumerable<CandleData>` / `CandleData` | Existing candle data to extract prices from. |

**Return Value**

Returns tuples of `(DateTime, decimal)` or raw `decimal` prices based on the overload.

**Remarks**

No special remarks.

**Example**

```csharp
// Get the Typical Price (H+L+C)/3 for the last 5 candles
var typicalPrices = await Market.CopyPrices(AppliedPrice.Typical, null, null, 1, 5);
foreach(var p in typicalPrices)
{
    Logger.Info($"Time: {p.Item1}, Typical Price: {p.Item2}");
}
```

---

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

---

## CopyTimes
Copies open timestamps of candles.

**Syntax**

```csharp
DateTime CopyTimes(string? symbol, Timeframe? tf, int / DateTime startPos / startTime, int / DateTime count / endTime);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading symbol (optional). |
| `tf` | `Timeframe?` | The timeframe (optional). |
| `startPos` / `startTime` | `int` / `DateTime` | The starting position index or the start time. |
| `count` / `endTime` | `int` / `DateTime` | The number of times to copy, or the end time. |

**Return Value**

Returns an array of `DateTime` objects.

**Remarks**

No special remarks.

**Example**

```csharp
DateTime[] times = await Market.CopyTimes(null, null, 1, 5);
```

---

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

---

## Creating Indicators

Factory methods to create built-in indicators (MA, RSI, Stochastic, MACD, ATR, Bollinger Bands, etc.).

**Syntax**

```csharp
IIndicatorMA CreateIndicatorMA(string? symbol = null, Timeframe? timeframe = null, int? period = null, MaMethod? method = null, AppliedPrice? appliedPrice = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
IIndicatorRSI CreateIndicatorRSI(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
IIndicatorMACD CreateIndicatorMACD(string? symbol = null, Timeframe? timeframe = null, int? fastPeriod = null, int? slowPeriod = null, int? signalPeriod = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
// ... and many more (e.g. CreateIndicatorATR, CreateIndicatorStochastic)
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading symbol (optional). |
| `timeframe` | `Timeframe?` | The timeframe for the indicator (optional). |
| `period` / `fastPeriod` | `int?` | Specific periods used by the indicator formula. |
| `indicatorAlias` | `string?` | An alias for the indicator instance (optional). |
| `propertyOptions` | `Action<IndicatorProperty>?` | Optional action to configure indicator UI properties (colors, thickness). |

**Return Value**

Returns an instance of the specific indicator interface (e.g., `IIndicatorMA`, `IIndicatorRSI`) registered and managed by the system.

**Example**

```csharp
// Initialize a Simple Moving Average (SMA) of 20 periods
var sma20 = Market.CreateIndicatorMA(period: 20, method: MaMethod.Sma, appliedPrice: AppliedPrice.Close);

// Initialize a MACD with custom colors
var macd = Market.CreateIndicatorMACD(
    fastPeriod: 12, 
    slowPeriod: 26, 
    signalPeriod: 9,
    propertyOptions: props => {
        props.LineColor = System.Drawing.Color.Blue;
    }
);
```
