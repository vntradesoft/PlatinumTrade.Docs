---
sidebar_position: 4
id: sdk-market-data
title: Market Data
description: Retrieving historical and real-time market data
status: draft
visibility: internal
publish: false
---

# Market Data & Indicators

`ITimeSeriesClient` provides access to OHLCV (candle) data, tick data, and the technical indicator system.

## ITimeSeriesClient — Overview

Access via `IOkxClient.Timeseries`:

```csharp
var ts = client.Timeseries;
```

## Configuration & Status

```csharp
Timeframe tf    = ts.PeriodCurrent;        // Current timeframe
DateTime begin  = ts.BeginTime;            // Data start time
DateTime? end   = ts.EndTime;             // Null when running in real-time
decimal price   = ts.CurrentTickPrice;     // Latest tick price
TickData tick   = ts.CurrentTick;          // Latest tick data
int total       = ts.Bars("BTC-USDT", Timeframe.OneHour);  // Total available bars
int maxBars     = ts.MaxBars;              // Maximum bars in cache
```

## Reading OHLCV Data

### Current and Previous Candles

```csharp
// The latest closed candle (shift = 0)
var lastClosed = ts.GetLastClosedCandle();

// Candle at a specific index (0 = latest closed, 1 = previous closed, …)
var prev = await ts.GetOHCLVAsync(
    symbol: "BTC-USDT",
    timeframe: Timeframe.OneHour,
    shift: 1);
```

> [!IMPORTANT]
> The system **does not support** querying the currently forming (unclosed) candle. 
> `shift = 0` always refers to the **latest fully closed candle**. This rule applies to both OHLCV data and Indicator values (`GetValue(0)` returns the value at the last closed candle).

> [!NOTE]
> The `symbol` and `timeframe` parameters are optional — when omitted, the defaults from the strategy settings are used.

### CandleData Properties

```csharp
CandleData candle = ts.GetLastClosedCandle();

DateTime time   = candle.Time;
decimal open    = candle.Open;
decimal high    = candle.High;
decimal low     = candle.Low;
decimal close   = candle.Close;
decimal volume  = candle.Volume;
```

## Copying Series Data

Copy an array of OHLCV data — useful for batch analysis:

### By Position & Count

```csharp
// Last 100 candles
CandleData[] candles = await ts.CopySeries(
    symbol: null,           // default symbol
    timeframe: null,        // default timeframe
    startPos: 0,
    count: 100);
```

### By Time Range

```csharp
CandleData[] candles = await ts.CopySeries(
    symbol: "BTC-USDT",
    timeframe: Timeframe.FifteenMinutes,
    startTime: DateTime.UtcNow.AddDays(-7),
    endTime: DateTime.UtcNow);
```

### Copy Individual Components

```csharp
decimal[] closes  = await ts.CopyCloses(null, null, 0, 100);
decimal[] highs   = await ts.CopyHighs(null, null, 0, 100);
decimal[] lows    = await ts.CopyLows(null, null, 0, 100);
decimal[] opens   = await ts.CopyOpens(null, null, 0, 100);
decimal[] volumes = await ts.CopyVolumes(null, null, 0, 100);
DateTime[] times  = await ts.CopyTimes(null, null, 0, 100);
```

### Copy Prices by AppliedPrice

```csharp
// Use the AppliedPrice enum to select which price component to extract
var prices = await ts.CopyPrices(
    AppliedPrice.Close, null, null, startPos: 0, count: 50);

// Or from a time range
var prices = await ts.CopyPrices(
    AppliedPrice.Typical,   // (H + L + C) / 3
    "BTC-USDT",
    Timeframe.OneHour,
    start: DateTime.UtcNow.AddDays(-1),
    endTime: DateTime.UtcNow);
```

## Built-in Indicators

`ITimeSeriesClient` provides factory methods for creating built-in indicators. All indicators are:

- **Incremental** — computed progressively as new candles arrive
- **Resettable** — compatible with both live trading and backtesting
- **Multi-symbol / multi-timeframe** — can be created on any symbol / timeframe

### Trend Indicators

```csharp
var ma   = ts.CreateIndicatorMA(period: 20, method: MaMethod.EMA, appliedPrice: AppliedPrice.Close);
var st   = ts.CreateIndicatorSuperTrend(period: 10, multiplier: 3.0);
var ichi = ts.CreateIndicatorIchimoku(tenkanPeriod: 9, kijunPeriod: 26, senkouBPeriod: 52);
var gator = ts.CreateIndicatorAlligator();
```

### Oscillators

```csharp
var rsi   = ts.CreateIndicatorRSI(period: 14);
var macd  = ts.CreateIndicatorMACD(fastPeriod: 12, slowPeriod: 26, signalPeriod: 9);
var stoch = ts.CreateIndicatorStochastic(kPeriod: 14, dPeriod: 3, kSlow: 3);
var wpr   = ts.CreateIndicatorWPR(period: 14);
var dm    = ts.CreateIndicatorDeMarker(period: 14);
```

### Volatility

```csharp
var atr    = ts.CreateIndicatorATR(period: 14);
var bwmfi  = ts.CreateIndicatorBWMFI();
var stddev = ts.CreateIndicatorStdDev(period: 20);
```

### Volume

```csharp
var vwap   = ts.CreateIndicatorVWAP(resetDaily: true);
var obv    = ts.CreateIndicatorOBV();
var ad     = ts.CreateIndicatorAD();
var vspike = ts.CreateIndicatorVolumeSpike(period: 20, spikeThreshold: 2.0);
```

### Bill Williams

```csharp
var ac        = ts.CreateIndicatorAC();
var ao        = ts.CreateIndicatorAO();
var alligator = ts.CreateIndicatorAlligator();
var gator     = ts.CreateIndicatorGator();
```

### Multi-Symbol / Multi-Timeframe

```csharp
// RSI on a different timeframe
var rsi4h = ts.CreateIndicatorRSI(
    symbol: "BTC-USDT", timeframe: Timeframe.FourHours,
    period: 14, indicatorAlias: "RSI_4H");

// MA on a different symbol
var ethMa = ts.CreateIndicatorMA(
    symbol: "ETH-USDT", timeframe: Timeframe.OneHour,
    period: 50, indicatorAlias: "ETH_MA50");
```

## Reading Indicator Values

### Using the Typed Interface

Each built-in indicator returns a typed interface with convenience methods:

```csharp
var rsi = ts.CreateIndicatorRSI(period: 14);

IndicatorValue val = rsi.FindValue(0);   // 0 = latest closed candle
if (!val.IsEmpty)
{
    decimal rsiValue = (decimal)val.Value;
    logger.LogDebug("RSI", "Current: {V}", rsiValue);
}

bool overbought = rsi.IsOverbought();   // RSI > 70
bool oversold   = rsi.IsOversold();     // RSI < 30
```

### Using CopyBuffer

Copy an array of indicator values — useful for batch analysis:

```csharp
var macd = ts.CreateIndicatorMACD();
string handle = macd.GetIndicatorId();

// Copy MACD line (buffer 0) — last 50 values
int copied = ts.CopyBuffer(handle, bufferNumber: 0,
    startIndex: 0, count: 50, out var macdLine);

// Copy Signal line (buffer 1)
ts.CopyBuffer(handle, bufferNumber: 1,
    startIndex: 0, count: 50, out var signalLine);

// Copy Histogram (buffer 2)
ts.CopyBuffer(handle, bufferNumber: 2,
    startIndex: 0, count: 50, out var histogram);
```

## Example: Strategy Using Indicators

```csharp
public class TrendStrategy : StrategyBase
{
    private readonly IOkxClient _client;
    private IIndicatorMA? _ma50;
    private IIndicatorRSI? _rsi;
    private IIndicatorATR? _atr;

    public TrendStrategy(IOkxClient client) => _client = client;

    public override Task<bool> OnInitAsync(IStrategyStateStore state, CancellationToken ct)
    {
        var ts = _client.Timeseries;
        _ma50 = ts.CreateIndicatorMA(period: 50, method: MaMethod.EMA);
        _rsi  = ts.CreateIndicatorRSI(period: 14);
        _atr  = ts.CreateIndicatorATR(period: 14);
        return Task.FromResult(true);
    }

    public override async Task OnTickAsync(TickPhase tickPhase, CancellationToken ct)
    {
        if (tickPhase != TickPhase.BarClose) return;

        var candle = _client.Timeseries.GetLastClosedCandle();
        var maVal  = _ma50!.FindValue(0); // 0 = latest closed candle
        var rsiVal = _rsi!.FindValue(0);
        var atrVal = _atr!.FindValue(0);

        if (maVal.IsEmpty || rsiVal.IsEmpty || atrVal.IsEmpty) return;

        bool aboveMa = candle.Close > (decimal)maVal.Value;
        bool rsiOk   = rsiVal.Value > 40 && rsiVal.Value < 70;

        if (aboveMa && rsiOk && !State.HasOpenPosition)
        {
            await _client.Trade.PlaceOrderAsync(
                "BTC-USDT", OrderSide.Buy, OrderType.Market, 0.01m);
        }
    }

    public override Task<bool> OnStopAsync(CancellationToken ct) => Task.FromResult(true);
}
```

## See also

- [ITimeSeriesClient](xref:Pt.Okx.Sdk.Clients.Market.ITimeSeriesClient) API Reference
- [Custom Indicator Plugin](indicator-plugin.md) — Build your own indicator
- [Drawing API](drawing-api.md) — Draw objects on the chart from code
- [Strategy Plugin](strategy/overview.md) — Using indicators within a strategy