---
id: products-gui-strategy-config
title: Strategy Configuration
sidebar_position: 8
description: Load and configure custom strategy plugins in the GUI
status: draft
visibility: internal
publish: false
---

# Strategy Configuration

The **Strategy Config** control allows you to load compiled custom strategy plugins (`.dll`), adjust trading parameters, and run simulations (Backtest) or execute orders on OKX (Live/Paper Trading).

---

## 1. Setting Up the Strategy

To configure and run a custom strategy:

1. Open a **Strategy Workspace** tab in the main interface.
2. In the **Settings** tab, locate the **Strategy File** field.
3. Click the browse button (**`...`**) next to the text box and select your compiled strategy plugin DLL file (e.g., `MyStrategyPlugin.dll`).
4. Once loaded, the application will validate the assembly and automatically populate its details. If the plugin implements custom parameters, they will appear under the **Input Parameters** tab.

---

## 2. Configuration Parameters

### Settings Tab

- **Mode:** Select either **Live Trading** (Production / Demo) or **Backtest** (Simulation).
- **Strategy File:** Path to your strategy plugin's `.dll`. Click the information (**ℹ️**) icon to view metadata such as Name, Version, Author, and SDK Compatibility.
- **Symbol & Timeframe:** Choose the OKX trading pair (e.g., `BTC-USDT`) and chart interval (e.g., `1m`, `5m`, `1h`).
- **Date Range (Backtest only):** Define the start and end dates for the simulation data feed.
- **Price Data Type (Backtest only):** Choose between *Every Tick* simulation or *Bar OHLC* values.
- **Deposit & Leverage (Backtest only):** Set the initial virtual capital and leverage factor for the backtest.
- **Leverage (Live Trading only):** Select the leverage multiplier for your live/paper trades.
- **Telegram Bot (Live Trading only):** Attach a registered Telegram Bot to receive automated status updates and execution alerts.
- **OKX Account (Live Trading only):** Choose which API credential account configuration to use for order placement.
- **Include Funding Fee (Backtest only):** Toggle whether perpetual swap funding fees should be calculated during the simulation.

### Input Parameters Tab

This tab dynamically reads the input schema declared inside your strategy plugin (using `[InputParam]` annotations):
- Adjust period intervals, thresholds, whitelist symbols, or file paths.
- Right-click the tab to **Export Input Parameters** to a JSON file or **Import Input Parameters** from a saved config.

---

## 3. Starting the Strategy

Once all settings and inputs are configured:
- Click the **Start Trading** (or **Start Backtest**) button at the bottom-right.
- Check the output console logs and runtime dashboard charts to monitor execution in real time.
