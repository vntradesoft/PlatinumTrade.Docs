---
id: sdk-timeseries-client
title: Timeseries API
sidebar_label: Timeseries
sidebar_position: 1
---

# Timeseries API

The Timeseries API (`Context.Timeseries`) provides methods and properties for querying historical and real-time market data (OHLCV candles, ticks) and managing technical indicators.

---

## Properties & Status

### `PeriodCurrent`
Gets the current timeframe (Kline interval) in use by the strategy.

```csharp
Timeframe PeriodCurrent { get; }
```

---

### `BeginTime`
Gets the timestamp at which the warmup data period begins.

```csharp
DateTime BeginTime { get; }
```

**Remarks**

This time is earlier than `StartTime` and is used to load enough historical candles for indicator calculations before live or simulated trading processing starts.

---

### `StartTime`
Gets the effective timestamp at which the strategy starts processing trading logic after warmup completes.

```csharp
DateTime? StartTime { get; }
```

---

### `EndTime`
Gets the timestamp when the session ends (returns `null` in real-time trading).

```csharp
DateTime? EndTime { get; }
```

---

### `MaxBars`
Gets the maximum number of bars (candles) stored in the cache.

```csharp
int MaxBars { get; }
```

---

### `CurrentTickPrice`
Gets the most recent tick price of the primary asset received from the market data feed.

```csharp
decimal CurrentTickPrice { get; }
```

---

### `CurrentTick`
Gets the full tick data structure for the most recent tick.

```csharp
TickData CurrentTick { get; }
```

---

### `Indicator`
Gets the manager interface (`IIndicatorManager`) for registered technical indicators.

```csharp
IIndicatorManager Indicator { get; }
```

---

### `SymbolsTimeframes`
Gets the distinct symbol and timeframe pairs scoped to this strategy instance.

```csharp
HashSet<(string Symbol, Timeframe Timeframe)> SymbolsTimeframes { get; }
```

---

## Bar & Time Queries

### `Bars`
Returns the total number of available bars for a specified symbol and timeframe.

**Syntax**

```csharp
int Bars(string? symbol = null, Timeframe? timeframe = null);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading symbol (e.g., `"BTC-USDT-SWAP"`). When `null`, the primary symbol is used. |
| `timeframe` | `Timeframe?` | The timeframe (e.g., `Timeframe.OneHour`). When `null`, the primary timeframe is used. |

**Return Value**

Returns the total number of available bars as an `int`.

**Example**

```csharp
int totalBars = Context.Timeseries.Bars("BTC-USDT-SWAP", Timeframe.OneHour);
Context.Logger.LogInformation("Bars", $"Total 1H bars: {totalBars}");
```

---

### `BarsCalculated`
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

**Example**

```csharp
var rsi = Context.Timeseries.CreateIndicatorRSI(period: 14);
int calculated = Context.Timeseries.BarsCalculated(rsi.Id);
```

---

### `GetCurrentCandleTime`
Gets the current candle open time for the specified timeframe.

**Syntax**

```csharp
DateTime GetCurrentCandleTime(Timeframe timeframe = Timeframe.OneMinute);
```

---

### `GetCurrentTime`
Gets the current system time (or simulated time during backtests).

**Syntax**

```csharp
DateTime GetCurrentTime();
```

---

## Candle Data Access

### `GetOHLCVAsync`
Gets the OHLCV candle data at a specific shift index (0 = current forming candle, 1 = previous closed candle, etc.).

**Syntax**

```csharp
Task<CandleData> GetOHLCVAsync(string? symbol = null, Timeframe? timeframe = null, int shift = 0, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading symbol. When `null`, uses the primary symbol. |
| `timeframe` | `Timeframe?` | The timeframe. When `null`, uses the primary timeframe. |
| `shift` | `int` | The candle shift index (0 = forming candle, 1 = last closed candle). |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

Returns a [`CandleData`](../../models.md#candledata) object.

**Example**

```csharp
var candle = await Context.Timeseries.GetOHLCVAsync(shift: 1);
Context.Logger.LogInformation("Candle", $"Previous Close: {candle.Close}");
```

---

### `GetLastClosedCandle` / `GetLastClosedCandleAsync`
Gets the most recent finalized (closed) candle.

**Syntax**

```csharp
// Synchronous version
CandleData GetLastClosedCandle(string? symbol = null, Timeframe? timeframe = null);

// Asynchronous version
Task<CandleData> GetLastClosedCandleAsync(string? symbol = null, Timeframe? timeframe = null, CancellationToken ct = default);
```

**Example**

```csharp
CandleData lastClosed = Context.Timeseries.GetLastClosedCandle();
Context.Logger.LogInformation("Candle", $"Closed price: {lastClosed.Close}");
```

---

### `GetOpenCandle`
Gets the currently forming (open) candle.

**Syntax**

```csharp
CandleData GetOpenCandle(string? symbol = null, Timeframe? timeframe = null);
```

---

### `GetTime`
Gets the timestamp of the candle at the specified shift for a given timeframe.

**Syntax**

```csharp
DateTime GetTime(Timeframe timeframe, int shift);
```

---

### `UpdateOpenCandleIndicators`
Manually forces an on-demand recalculation of indicators using the current forming (open) candle tick data.

**Syntax**

```csharp
void UpdateOpenCandleIndicators(string? symbol = null, Timeframe? timeframe = null);
```

**Remarks**

By default, indicators are calculated once at bar open to conserve CPU. If your strategy requires the indicator value to reflect intermediate forming candle ticks, call `UpdateOpenCandleIndicators()` before reading indicator buffer index 0.

---

## Bulk Data Copy APIs (CopySeries & Components)

### `CopySeries`
Copies an array of full OHLCV candles by range, position, or start time.

**Syntax**

```csharp
// 1. By time range
Task<CandleData[]> CopySeries(string? symbol = null, Timeframe? timeframe = null, DateTime? startTime = null, DateTime? endTime = null);

// 2. By start index and count
Task<CandleData[]> CopySeries(string? symbol = null, Timeframe? timeframe = null, int startPos = 0, int count = 1);

// 3. By start time and count
Task<CandleData[]> CopySeries(string? symbol = null, Timeframe? timeframe = null, DateTime? startTime = null, int count = 1);
```

**Example**

```csharp
CandleData[] candles = await Context.Timeseries.CopySeries(startPos: 1, count: 5);
foreach (var c in candles)
{
    Context.Logger.LogInformation("Bar", $"O: {c.Open}, H: {c.High}, L: {c.Low}, C: {c.Close}");
}
```

---

### Component Copy APIs (`CopyTimes`, `CopyOpens`, `CopyHighs`, `CopyLows`, `CopyCloses`, `CopyVolumes`)

Extract specific price components directly into primitive arrays for high-performance vectorized operations.

Each method provides 3 overloads matching the `CopySeries` pattern:
1. `(string? symbol, Timeframe? timeframe, int startPos, int count)`
2. `(string? symbol, Timeframe? timeframe, DateTime? startTime, int count)`
3. `(string? symbol, Timeframe? timeframe, DateTime? startTime, DateTime? endTime)`

```csharp
Task<DateTime[]> CopyTimes(string? symbol = null, Timeframe? timeframe = null, int startPos = 0, int count = 1);
Task<decimal[]>  CopyOpens(string? symbol = null, Timeframe? timeframe = null, int startPos = 0, int count = 1);
Task<decimal[]>  CopyHighs(string? symbol = null, Timeframe? timeframe = null, int startPos = 0, int count = 1);
Task<decimal[]>  CopyLows(string? symbol = null, Timeframe? timeframe = null, int startPos = 0, int count = 1);
Task<decimal[]>  CopyCloses(string? symbol = null, Timeframe? timeframe = null, int startPos = 0, int count = 1);
Task<decimal[]>  CopyVolumes(string? symbol = null, Timeframe? timeframe = null, int startPos = 0, int count = 1);
```

**Example**

```csharp
// Fast array calculation of 10-period High and Low
decimal[] highs = await Context.Timeseries.CopyHighs(startPos: 1, count: 10);
decimal[] lows  = await Context.Timeseries.CopyLows(startPos: 1, count: 10);

decimal highest = highs.Max();
decimal lowest  = lows.Min();
```

---

## Indicator Buffer Copy API (`CopyBuffer`)

Copies calculated values from an indicator buffer.

**Syntax**

```csharp
// 1. By start position and count
int CopyBuffer(string indicatorHandle, int bufferNumber, int startPos, int count, out IEnumerable<IndicatorValue> buffers);

// 2. By start time and count
int CopyBuffer(string indicatorHandle, int bufferNumber, DateTime startTime, int count, out IEnumerable<IndicatorValue> buffers);

// 3. By time range
int CopyBuffer(string indicatorHandle, int bufferNumber, DateTime startTime, DateTime endTime, out IEnumerable<IndicatorValue> buffers);
```

**Example**

```csharp
var rsi = Context.Timeseries.CreateIndicatorRSI(period: 14);
int copied = Context.Timeseries.CopyBuffer(rsi.Id, 0, startPos: 1, count: 3, out var rsiValues);

foreach (var item in rsiValues)
{
    Context.Logger.LogInformation("RSI", $"Time: {item.Time}, Value: {item.Value}");
}
```

---

## Creating Built-in Indicators

Factory methods to initialize standard technical indicators:

```csharp
IIndicatorMA   CreateIndicatorMA(string? symbol = null, Timeframe? timeframe = null, int? period = null, MaMethod? method = null, AppliedPrice? appliedPrice = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
IIndicatorRSI  CreateIndicatorRSI(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
IIndicatorMACD CreateIndicatorMACD(string? symbol = null, Timeframe? timeframe = null, int? fastPeriod = null, int? slowPeriod = null, int? signalPeriod = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
IIndicatorATR  CreateIndicatorATR(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
IIndicatorBollingerBands CreateIndicatorBollingerBands(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? deviations = null, AppliedPrice? appliedPrice = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Example**

```csharp
// 20-period Exponential Moving Average on Close price
var ema20 = Context.Timeseries.CreateIndicatorMA(period: 20, method: MaMethod.Ema, appliedPrice: AppliedPrice.Close);

// Access buffer value (index 1 is last closed candle value)
double currentEma = ema20.GetValue(1);
```

---

## Custom Indicators

```csharp
Task<T> GetCustomIndicatorAsync<T>(string indicatorName, string? symbol = null, Timeframe? timeframe = null, params object[] parameters) where T : class;
```
