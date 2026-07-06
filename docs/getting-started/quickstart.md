---
id: getting-started-quickstart
title: Quickstart
sidebar_position: 2
description: The fastest way to install the GUI application, configure API, and run Trading View, Backtest, and Live Trade
status: draft
visibility: internal
publish: false
---

# Quickstart

This quickstart guide provides the shortest practical path to installing the application and using its core features: Trading View, Backtesting, and Live Trading.

## 1. Get Platinum Trade

Download the latest release package from [GitHub Releases](https://github.com/vntradesoft/PlatinumTrade.App/releases).

## 2. App Installation & Setup

1. **Install Runtime**: Verify that your system has the **.NET 10 Runtime** installed.
2. **Install GUI Application**: Run the downloaded installer and follow the on-screen instructions to complete the installation.
3. **Launch**: Open Platinum Trade from the Start Menu or Desktop shortcut.
4. **API Configuration**:
   - Navigate to **Tools** -> **Options** from the top menu.
   - Go to **API Settings** and enter your OKX API Key, Secret, Passphrase, and select the environment (**Production** or **Demo**).
   - Click **Test Connection** to verify connection status, then click **Save**.

## 3. Trading View & Charting

The main interface is designed to view real-time market data and perform technical analysis.

![Trading View Dashboard](/img/overview/dashboard.png)

- **Market Watch**: Located on the left panel. Search for your target trading pairs (e.g., `BTC-USDT-SWAP`) and double-click to open its chart.
- **Timeframes & Chart Types**: Use the top toolbar to switch between timeframes (e.g., 1m, 5m, 1h, 1d) and chart types (Candlestick, Bar, Line).
- **Indicators**: Click the **Indicators** icon on the toolbar to add built-in indicators or load custom indicator plugins.
- **Drawing Tools**: Use the drawing toolbar to place trend lines, horizontal/vertical lines, Fibonacci retracements, and shapes on the active chart.

## 4. Backtest (Historical Strategy Testing)

Test your custom trading strategies on historical data before going live.

<div style={{ display: 'flex', gap: '10px' }}>
  <div style={{ flex: 1 }}>
    ![Backtest Configuration](/img/overview/backtest1.png)
  </div>
  <div style={{ flex: 1 }}>
    ![Backtest Simulation](/img/overview/backtest.png)
  </div>
</div>

1. **Historical Data**: Open the **History Manager** to download or import historical candlesticks. It is recommended to use the `.bin` (Binary) format for optimal read speeds.
2. **Open Backtest Dialog**: Navigate to **Tools** -> **Backtest Engine** or click the Backtest icon.
3. **Select Strategy**: Load your strategy plugin assembly (`.dll` file) and configure the strategy parameters in the properties panel.
4. **Run Simulation**: Select the symbol, timeframe, and historical period, then click the **Run** button. Use the playback controls (🔍+, 🔍-, 🔄, ⏸️, ⏹️) to fast-forward, pause, or stop the simulation. Review performance metrics and trade logs in the bottom tabs.

## 5. Live Trade (Live & Paper Trading)

Once you have verified your strategy, you can deploy it to live or paper trading.

![Live Trading](/img/overview/livetrade.png)

- **Configure Environment**: Go to settings and ensure you have correct API keys. For risk-free live testing, select the **Demo** environment for Paper Trading.
- **Strategy Deployment**: From the strategy panel, load your strategy onto the live chart of the selected symbol.
- **Configure Risk Controls**: Define your position sizing, stop-loss, take-profit, and max slippage settings.
- **Enable Execution**: Click **Start Trading** to activate the automated bot, or place orders manually using the trading panel. Monitor active orders, positions, and live notifications from the status bar and log panels.

## Risk Warning

Trading cryptocurrencies involves significant risk. This software is not financial advice. Never run automated live trading without proper risk limits and validation.

## Status and Next Steps

- For detailed GUI configuration, see the [GUI Getting Started](../products/gui/getting-started.md).
- To run automated trading via command-line, see [CLI Bot Getting Started](../products/bot-cli/getting-started.md).
- Explore SDK capabilities in [SDK Overview](../sdk/overview.md).
