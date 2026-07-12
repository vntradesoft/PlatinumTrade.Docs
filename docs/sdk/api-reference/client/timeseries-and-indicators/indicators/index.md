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
| [Bars](./bars.md) | Returns the number of bars for a specified symbol and timeframe. |
| [BarsCalculated](./bars-calculated.md) | Returns the number of calculated bars for a specified indicator. |
| [CopyBuffer](./copy-buffer.md) | Copies indicator buffer values by index or time range. |
| [CopySeries](./copy-series.md) | Copies an array of OHLCV candle data. |
| [CopyTimes](./copy-times.md) | Copies open timestamps of candles. |
| [CopyOpens](./copy-opens.md) | Copies open prices of candles. |
| [CopyHighs](./copy-highs.md) | Copies high prices of candles. |
| [CopyLows](./copy-lows.md) | Copies low prices of candles. |
| [CopyCloses](./copy-closes.md) | Copies close prices of candles. |
| [CopyVolumes](./copy-volumes.md) | Copies volume values of candles. |
| [CopyPrices](./copy-prices.md) | Copies prices by AppliedPrice type. |
| [Candle Access](./candle-access.md) | Directly queries specific candles (current, closed, open, etc.). |
| [Creating Indicators](./indicator-create.md) | Factory methods to create built-in indicators (MA, RSI, Stochastic, etc.). |
| [Indicators Overview](./indicators-overview.md) | Base interfaces (`IIndicator`, `IIndicatorMethodCommon`) and common value retrieval methods. |

---

## Built-in Technical Indicators

Use the links in the tables below to view the dedicated API guides, interface parameters, and examples for each built-in indicator.

### Trend Indicators\n\n| Indicator | Creation Method | Interface |\n|---|---|---|\n\n| [Moving Average (MA)](./trend.md#moving-average-ma) | `CreateIndicatorMA` | [`IIndicatorMA`] |\n\n| [Double Exponential Moving Average (DEMA)](./trend.md#double-exponential-moving-average-dema) | `CreateIndicatorDEMA` | [`IIndicatorDEMA`] |\n\n| [Triple Exponential Moving Average (TEMA)](./trend.md#triple-exponential-moving-average-tema) | `CreateIndicatorTEMA` | [`IIndicatorTEMA`] |\n\n| [Adaptive Moving Average (AMA)](./trend.md#adaptive-moving-average-ama) | `CreateIndicatorAMA` | [`IIndicatorAMA`] |\n\n| [Parabolic SAR](./trend.md#parabolic-sar) | `CreateIndicatorSAR` | [`IIndicatorSAR`] |\n\n| [Envelopes](./trend.md#envelopes) | `CreateIndicatorEnvelopes` | [`IIndicatorEnvelopes`] |\n\n| [SuperTrend](./trend.md#supertrend) | `CreateIndicatorSuperTrend` | [`IIndicatorSuperTrend`] |\n\n| [Ichimoku Kinko Hyo](./trend.md#ichimoku-kinko-hyo) | `CreateIndicatorIchimoku` | [`IIndicatorIchimoku`] |\n\n| [Bollinger Bands](./trend.md#bollinger-bands) | `CreateIndicatorBollingerBands` | [`IIndicatorBollingerBands`] |\n\n| [Average Directional Index (ADX)](./trend.md#average-directional-index-adx) | `CreateIndicatorADX` | [`IIndicatorADX`] |\n\n| [Average Directional Index Wilder (ADXW)](./trend.md#average-directional-index-wilder-adxw) | `CreateIndicatorADXW` | [`IIndicatorADXW`] |\n\n### Oscillators Indicators\n\n| Indicator | Creation Method | Interface |\n|---|---|---|\n\n| [Relative Strength Index (RSI)](./oscillators.md#relative-strength-index-rsi) | `CreateIndicatorRSI` | [`IIndicatorRSI`] |\n\n| [Stochastic Oscillator](./oscillators.md#stochastic-oscillator) | `CreateIndicatorStochastic` | [`IIndicatorStochastic`] |\n\n| [Moving Average Convergence Divergence (MACD)](./oscillators.md#moving-average-convergence-divergence-macd) | `CreateIndicatorMACD` | [`IIndicatorMACD`] |\n\n| [Oscillator of Moving Average (OsMA)](./oscillators.md#oscillator-of-moving-average-osma) | `CreateIndicatorOsMA` | [`IIndicatorOsMA`] |\n\n| [Commodity Channel Index (CCI)](./oscillators.md#commodity-channel-index-cci) | `CreateIndicatorCCI` | [`IIndicatorCCI`] |\n\n| [Momentum](./oscillators.md#momentum) | `CreateIndicatorMomentum` | [`IIndicatorMomentum`] |\n\n| [Money Flow Index (MFI)](./oscillators.md#money-flow-index-mfi) | `CreateIndicatorMFI` | [`IIndicatorMFI`] |\n\n| [Relative Vigor Index (RVI)](./oscillators.md#relative-vigor-index-rvi) | `CreateIndicatorRVI` | [`IIndicatorRVI`] |\n\n| [Williams' Percent Range (WPR)](./oscillators.md#williams-percent-range-wpr) | `CreateIndicatorWPR` | [`IIndicatorWPR`] |\n\n| [DeMarker (DeM)](./oscillators.md#demarker-dem) | `CreateIndicatorDeMarker` | [`IIndicatorDeMarker`] |\n\n| [Triple Exponential Average (TRIX)](./oscillators.md#triple-exponential-average-trix) | `CreateIndicatorTRIX` | [`IIndicatorTRIX`] |\n\n| [Standard Deviation (StdDev)](./oscillators.md#standard-deviation-stddev) | `CreateIndicatorStdDev` | [`IIndicatorStdDev`] |\n\n| [Average True Range (ATR)](./oscillators.md#average-true-range-atr) | `CreateIndicatorATR` | [`IIndicatorATR`] |\n\n| [Bollinger Bands %B (%B)](./oscillators.md#bollinger-bands-b-b) | `CreateIndicatorBollingerPercentB` | [`IIndicatorBollingerPercentB`] |\n\n| [Bollinger Band Width (BBW)](./oscillators.md#bollinger-band-width-bbw) | `CreateIndicatorBollingerBandWidth` | [`IIndicatorBollingerBandWidth`] |\n\n### Bill williams Indicators\n\n| Indicator | Creation Method | Interface |\n|---|---|---|\n\n| [Accelerator Oscillator (AC)](./bill-williams.md#accelerator-oscillator-ac) | `CreateIndicatorAC` | [`IIndicatorAC`] |\n\n| [Awesome Oscillator (AO)](./bill-williams.md#awesome-oscillator-ao) | `CreateIndicatorAO` | [`IIndicatorAO`] |\n\n| [Alligator](./bill-williams.md#alligator) | `CreateIndicatorAlligator` | [`IIndicatorAlligator`] |\n\n| [Gator Oscillator](./bill-williams.md#gator-oscillator) | `CreateIndicatorGator` | [`IIndicatorGator`] |\n\n| [Fractals](./bill-williams.md#fractals) | `CreateIndicatorFractals` | [`IIndicatorFractals`] |\n\n| [Market Facilitation Index (BWMFI)](./bill-williams.md#market-facilitation-index-bwmfi) | `CreateIndicatorBWMFI` | [`IIndicatorBWMFI`] |\n\n### Volumes Indicators\n\n| Indicator | Creation Method | Interface |\n|---|---|---|\n\n| [Accumulation/Distribution (AD)](./volumes.md#accumulationdistribution-ad) | `CreateIndicatorAD` | [`IIndicatorAD`] |\n\n| [On-Balance Volume (OBV)](./volumes.md#on-balance-volume-obv) | `CreateIndicatorOBV` | [`IIndicatorOBV`] |\n\n| [Volume Spike](./volumes.md#volume-spike) | `CreateIndicatorVolumeSpike` | [`IIndicatorVolumeSpike`] |\n\n| [Force Index](./volumes.md#force-index) | `CreateIndicatorForce` | [`IIndicatorForce`] |\n\n| [Volume Weighted Average Price (VWAP)](./volumes.md#volume-weighted-average-price-vwap) | `CreateIndicatorVWAP` | [`IIndicatorVWAP`] |\n\n| [Chaikin Oscillator](./volumes.md#chaikin-oscillator) | `CreateIndicatorChaikin` | [`IIndicatorChaikin`] |


