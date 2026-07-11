---
id: products-gui-settings-backtest
title: Backtest
sidebar_position: 4
description: Configure default parameters for the backtesting engine
status: draft
visibility: internal
publish: false
---

# Backtest

This section describes how to configure backtest environment settings, engine limits, and default behaviours.

![Backtest Settings](/img/products/gui/settings/backtest-settings.png)

## Simulation Parameters

- **Warmup Bars**: The number of historical bars to preload before the backtest actively begins. This ensures indicators with lookback periods (e.g., 200 EMA) have time to stabilize.
- **Max Bars In Chart**: Limits the maximum number of candlesticks rendered on the chart at any given time to maintain optimal UI performance during long backtests.
- **Ticks Per Candle**: Defines the granularity of price simulation within a single candlestick. Higher values produce more realistic intra-bar price action but increase simulation time.

## Logs

- **Log Store Directory**: The path to the folder where the backtest engine stores execution logs and trade reports.
- **Log Editor Path**: The executable path to your preferred text editor (e.g., Notepad++, VS Code) used when opening log files from the GUI.
