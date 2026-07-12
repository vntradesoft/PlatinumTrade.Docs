---
id: index
title: Built-in Technical Indicators
sidebar_position: 1
description: Overview of built-in technical indicators, common access methods, and indicator buffers.
status: stable
visibility: public
slug: /sdk/api-reference/client/timeseries-and-indicators/indicators/
---

# Technical Indicators Overview

The Platinum Trade SDK provides a comprehensive suite of built-in technical indicators for quantitative analysis and algorithmic trading. These indicators are organized into logical groups based on their analytical characteristics.

---

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

---

## Indicator Buffer (`IIndicatorBuffer`)

Internally, indicator data is stored in time-indexed structures managed by `IIndicatorBuffer`. An indicator can have one or multiple buffers (e.g., MACD has a main line and a signal line).

```csharp
public interface IIndicatorBuffer
{
    // Returns the total number of items in the buffer.
    int Count { get; }
    
    // Gets the value at the specified time-shift index (0 = current bar).
    IndicatorValue At(int index);
    
    // Returns the value at the exact specified time.
    IndicatorValue Find(DateTime dateTime);
    
    // Returns the indicator value at or before the specified time.
    IndicatorValue FindAtOrBefore(DateTime dateTime);
    
    // Retrieves the latest values in the buffer as a fast, zero-allocation Span.
    Span<IndicatorValue> GetLatest(int count);
}
```

---

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

