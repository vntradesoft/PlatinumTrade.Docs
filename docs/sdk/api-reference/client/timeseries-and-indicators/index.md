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
| [Bars](./timeseries/bars.md) | Returns the number of bars for a specified symbol and timeframe. |
| [BarsCalculated](./timeseries/bars-calculated.md) | Returns the number of calculated bars for a specified indicator. |
| [CopyBuffer](./timeseries/copy-buffer.md) | Copies indicator buffer values by index or time range. |
| [CopySeries](./timeseries/copy-series.md) | Copies an array of OHLCV candle data. |
| [CopyTimes](./timeseries/copy-times.md) | Copies open timestamps of candles. |
| [CopyOpens](./timeseries/copy-opens.md) | Copies open prices of candles. |
| [CopyHighs](./timeseries/copy-highs.md) | Copies high prices of candles. |
| [CopyLows](./timeseries/copy-lows.md) | Copies low prices of candles. |
| [CopyCloses](./timeseries/copy-closes.md) | Copies close prices of candles. |
| [CopyVolumes](./timeseries/copy-volumes.md) | Copies volume values of candles. |
| [CopyPrices](./timeseries/copy-prices.md) | Copies prices by AppliedPrice type. |
| [Candle Access](./timeseries/candle-access.md) | Directly queries specific candles (current, closed, open, etc.). |
| [Creating Indicators](./timeseries/indicator-create.md) | Factory methods to create built-in indicators (MA, RSI, Stochastic, etc.). |

---

## Built-in Technical Indicator Groups

Select a group below to view the available built-in technical indicators, their formulas, interfaces, and examples.

| Indicator Group | Description | Link |
|---|---|---|
| **Trend Indicators** | Standard trend-following lines such as Moving Averages, Parabolic SAR, and Bollinger Bands. | [View Trend Indicators](./trend/index.md) |
| **Oscillators and Volatility** | Indicators measuring momentum and market volatility, e.g., RSI, Stochastic, MACD, and ATR. | [View Oscillators](./oscillators/index.md) |
| **Bill Williams Indicators** | The complete suite of Bill Williams indicators (Alligator, Fractals, AO, AC, Gator). | [View Bill Williams](./bill-williams/index.md) |
| **Volume Indicators** | Volume-based technical indicators (OBV, A/D, VWAP, Chaikin, Volume Spike). | [View Volume Indicators](./volumes/index.md) |
