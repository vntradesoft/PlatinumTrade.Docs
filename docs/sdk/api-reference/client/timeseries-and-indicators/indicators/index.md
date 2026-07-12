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

### Trend Indicators\n\n| Indicator | Creation Method | Interface |\n|---|---|---|\n\n| [Moving Average (MA)](./trend/ma.md) | `CreateIndicatorMA` | [`IIndicatorMA`] |\n\n| [Double Exponential Moving Average (DEMA)](./trend/dema.md) | `CreateIndicatorDEMA` | [`IIndicatorDEMA`] |\n\n| [Triple Exponential Moving Average (TEMA)](./trend/tema.md) | `CreateIndicatorTEMA` | [`IIndicatorTEMA`] |\n\n| [Adaptive Moving Average (AMA)](./trend/ama.md) | `CreateIndicatorAMA` | [`IIndicatorAMA`] |\n\n| [Parabolic SAR](./trend/sar.md) | `CreateIndicatorSAR` | [`IIndicatorSAR`] |\n\n| [Envelopes](./trend/envelopes.md) | `CreateIndicatorEnvelopes` | [`IIndicatorEnvelopes`] |\n\n| [SuperTrend](./trend/supertrend.md) | `CreateIndicatorSuperTrend` | [`IIndicatorSuperTrend`] |\n\n| [Ichimoku Kinko Hyo](./trend/ichimoku.md) | `CreateIndicatorIchimoku` | [`IIndicatorIchimoku`] |\n\n| [Bollinger Bands](./trend/bollinger-bands.md) | `CreateIndicatorBollingerBands` | [`IIndicatorBollingerBands`] |\n\n| [Average Directional Index (ADX)](./trend/adx.md) | `CreateIndicatorADX` | [`IIndicatorADX`] |\n\n| [Average Directional Index Wilder (ADXW)](./trend/adxw.md) | `CreateIndicatorADXW` | [`IIndicatorADXW`] |\n\n### Oscillators Indicators\n\n| Indicator | Creation Method | Interface |\n|---|---|---|\n\n| [Relative Strength Index (RSI)](./oscillators/rsi.md) | `CreateIndicatorRSI` | [`IIndicatorRSI`] |\n\n| [Stochastic Oscillator](./oscillators/stochastic.md) | `CreateIndicatorStochastic` | [`IIndicatorStochastic`] |\n\n| [Moving Average Convergence Divergence (MACD)](./oscillators/macd.md) | `CreateIndicatorMACD` | [`IIndicatorMACD`] |\n\n| [Oscillator of Moving Average (OsMA)](./oscillators/osma.md) | `CreateIndicatorOsMA` | [`IIndicatorOsMA`] |\n\n| [Commodity Channel Index (CCI)](./oscillators/cci.md) | `CreateIndicatorCCI` | [`IIndicatorCCI`] |\n\n| [Momentum](./oscillators/momentum.md) | `CreateIndicatorMomentum` | [`IIndicatorMomentum`] |\n\n| [Money Flow Index (MFI)](./oscillators/mfi.md) | `CreateIndicatorMFI` | [`IIndicatorMFI`] |\n\n| [Relative Vigor Index (RVI)](./oscillators/rvi.md) | `CreateIndicatorRVI` | [`IIndicatorRVI`] |\n\n| [Williams' Percent Range (WPR)](./oscillators/wpr.md) | `CreateIndicatorWPR` | [`IIndicatorWPR`] |\n\n| [DeMarker (DeM)](./oscillators/demarker.md) | `CreateIndicatorDeMarker` | [`IIndicatorDeMarker`] |\n\n| [Triple Exponential Average (TRIX)](./oscillators/trix.md) | `CreateIndicatorTRIX` | [`IIndicatorTRIX`] |\n\n| [Standard Deviation (StdDev)](./oscillators/stddev.md) | `CreateIndicatorStdDev` | [`IIndicatorStdDev`] |\n\n| [Average True Range (ATR)](./oscillators/atr.md) | `CreateIndicatorATR` | [`IIndicatorATR`] |\n\n| [Bollinger Bands %B (%B)](./oscillators/bollinger-percent-b.md) | `CreateIndicatorBollingerPercentB` | [`IIndicatorBollingerPercentB`] |\n\n| [Bollinger Band Width (BBW)](./oscillators/bollinger-band-width.md) | `CreateIndicatorBollingerBandWidth` | [`IIndicatorBollingerBandWidth`] |\n\n### Bill williams Indicators\n\n| Indicator | Creation Method | Interface |\n|---|---|---|\n\n| [Accelerator Oscillator (AC)](./bill-williams/ac.md) | `CreateIndicatorAC` | [`IIndicatorAC`] |\n\n| [Awesome Oscillator (AO)](./bill-williams/ao.md) | `CreateIndicatorAO` | [`IIndicatorAO`] |\n\n| [Alligator](./bill-williams/alligator.md) | `CreateIndicatorAlligator` | [`IIndicatorAlligator`] |\n\n| [Gator Oscillator](./bill-williams/gator.md) | `CreateIndicatorGator` | [`IIndicatorGator`] |\n\n| [Fractals](./bill-williams/fractals.md) | `CreateIndicatorFractals` | [`IIndicatorFractals`] |\n\n| [Market Facilitation Index (BWMFI)](./bill-williams/bwmfi.md) | `CreateIndicatorBWMFI` | [`IIndicatorBWMFI`] |\n\n### Volumes Indicators\n\n| Indicator | Creation Method | Interface |\n|---|---|---|\n\n| [Accumulation/Distribution (AD)](./volumes/ad.md) | `CreateIndicatorAD` | [`IIndicatorAD`] |\n\n| [On-Balance Volume (OBV)](./volumes/obv.md) | `CreateIndicatorOBV` | [`IIndicatorOBV`] |\n\n| [Volume Spike](./volumes/volume-spike.md) | `CreateIndicatorVolumeSpike` | [`IIndicatorVolumeSpike`] |\n\n| [Force Index](./volumes/force.md) | `CreateIndicatorForce` | [`IIndicatorForce`] |\n\n| [Volume Weighted Average Price (VWAP)](./volumes/vwap.md) | `CreateIndicatorVWAP` | [`IIndicatorVWAP`] |\n\n| [Chaikin Oscillator](./volumes/chaikin.md) | `CreateIndicatorChaikin` | [`IIndicatorChaikin`] |
