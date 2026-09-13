---
id: products-gui-settings-chart
title: Chart
sidebar_position: 6
description: Candlestick chart visualization options, live indicator reordering, volume label formatting, and candle color presets
---

# Chart

This section explains how to configure chart visualization options, live indicator reordering, volume label formatting, and candlestick color presets.

![Chart Settings](/img/products/gui/settings/chart-settings.png)

## Display Options

- **Show Volume**: Toggles the visibility of the volume histogram pane at the bottom of the candlestick chart.
- **Enable indicator reorder on Live chart**: When enabled, Up and Down reorder buttons are displayed next to indicator panels during active Live trading sessions, allowing you to reposition indicator panes on the fly.
  
  :::warning UI Redraw Notice
  Reordering indicator panes during live trading triggers a brief graphical redraw of the chart canvas. While this is purely visual and does **not** affect order execution or socket feeds, avoid making frequent indicator reorderings when monitoring fast, high-volatility market movements.
  :::

- **Volume Label Format**: Determines how trading volume values are formatted in the chart status header and axis tooltips:
  - `Compact (K/M/B)`: Abbreviates large numbers using standard metric suffixes (e.g., `1.2M`, `450K`).
  - `Full number`: Displays the full, unrounded integer volume (e.g., `1,234,567`).

## Candle Colors

Customize the visual representation of price action on the candlestick chart:

- **Color Presets**: Rapidly apply professionally designed color palettes:
  - `Solid Classic`: Popular TradingView theme with solid teal green (`#26A69A`) and soft red (`#EF5350`).
  - `Traditional`: Legacy financial charting style with hollow lime green up-candles and solid light-gray/red down-candles.
  - `Blue / Orange`: High-contrast blue bullish candles and warm orange bearish candles.
  - `Monochrome`: Minimalist black, white, and grayscale palette.
  - `MetaTrader 5`: MetaTrader-style lime green outlines with translucent interior fills.
  - `Ghost`: Outline-only candlestick borders without solid interior body fills.
  - `Vivid`: High-contrast neon cyan and magenta palette.
  - `Modern Solid`: Fully saturated solid lime green and pure red.
  - `Custom`: Unlocks individual color pickers for custom personalization.

- **Custom Colors**: When `Custom` is selected, you can fine-tune:
  - **Up Candle Color**: Border and wick color for bullish candles.
  - **Up Body Color**: Interior fill color for bullish candles.
  - **Down Candle Color**: Border and wick color for bearish candles.
  - **Down Body Color**: Interior fill color for bearish candles.
