---
id: products-gui-settings-backtest
title: Backtest
sidebar_position: 4
description: Configure simulation parameters, chart history limits, and execution log formatting for the backtesting engine
---

# Backtest

This section describes how to configure backtest simulation parameters, engine rendering limits, and trade log formatting.

![Backtest Settings](/img/products/gui/settings/backtest-settings.png)

## Simulation Parameters

- **Warmup Bars**: The number of historical bars to preload before the backtest actively begins. This ensures indicators with lookback periods (e.g., 200 EMA) have time to calculate valid values before strategy execution starts.
- **Max Bars In Chart**: Limits the maximum number of candlesticks rendered on the chart at any given time to maintain smooth UI performance during long backtests.
- **Ticks Per Candle**: Defines the granularity of price simulation within a single candlestick. Higher values produce more realistic intra-bar price action and wick execution testing, but require more CPU processing time.

## Logs & Display Formatting

Configure the storage location and readability of trade execution logs:

- **Log Store Directory**: The folder path where the backtest engine automatically persists execution logs, strategy debug traces, and trade reports. Click the browse button (`...`) to select an output folder.
- **Log Editor Path**: The executable path to your preferred text editor (e.g., Notepad++, VS Code) used when opening raw log files from the GUI.
- **Log Font Size**: Adjusts the font size of the text rendered inside the trade execution log viewer (configurable from `6.0` to `48.0` pt with `0.5` pt precision; default: `10.0`).
- **Log Font Family**: Selects the typeface used to display trade logs (default: `Consolas`). Monospace fonts such as `Consolas`, `Cascadia Code`, or `Courier New` ensure columns and tabular data remain perfectly aligned.
