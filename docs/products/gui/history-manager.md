---
id: products-gui-history-manager
title: History Manager
sidebar_position: 9
description: Manage, clean, and diagnose historical candlestick data locally
status: draft
visibility: internal
publish: false
---

# History Manager

The **History Manager** helps users monitor local disk usage, clean up old datasets, and diagnose the quality of downloaded historical candlestick data used for backtesting or running simulations.

---

## 1. How to Access

To open the History Manager dialog, use one of the following methods:
- **Via the Main Menu:** Select **Tools** -> **History Manager**.
- **Keyboard Shortcut:** Press **Ctrl + Shift + H**.

---

## 2. Interface and Displayed Information

The dialog displays visual information based on the current system environment configuration:

- **Active Environment:** Automatically detected based on the `IsTestnet` setting:
  - **Demo:** Data is scanned from `%LocalAppData%\PlatinumTrade\Histories\demo`.
  - **Real (Mainnet):** Data is scanned from `%LocalAppData%\PlatinumTrade\Histories\real`.
- **Total Size:** Displays the total disk space (in MB) occupied by all historical candlestick data in the active environment.
- **Symbol Data Table:**
  - **Symbol:** The trading pair name (e.g., `BTC-USDT-SWAP`).
  - **Format:** The storage file format (`bin` for binary or `csv` for text). Binary (`bin`) format is highly recommended for optimal read/write speeds during backtesting.
  - **Data Range:** The actual timeframe range of the stored data (e.g., `2025-01-01 -> 2026-06-30`).
  - **Files:** The number of yearly archive files stored.
  - **Size:** The actual disk space occupied by the specific symbol's data.

---

## 3. Operational Features

In the list table, the **Actions** column provides quick tools for managing data:

### A. Open Storage Directory (📁)
- Clicking the folder icon opens the symbol's local storage directory directly in Windows Explorer.
- This allows you to easily copy, share, or inspect yearly archive files (`2024.bin`, `2025.bin`, etc.) manually.

### B. Diagnose Data Quality (🩺)
The diagnostic tool scans all candlestick data for the selected symbol from the disk to assess its integrity:
- **Detect Gaps:** Identifies missing data intervals (where the time gap between two consecutive candles exceeds 1 minute for standard 1m data).
- **Detect Unsorted Data:** Verifies if any candles are sorted out of chronological order (a critical issue that can corrupt backtest simulation runs).
- **Detect Anomalies:** Identifies invalid candle values, such as Open, High, Low, or Close prices less than or equal to 0, negative volumes, or High prices lower than Low prices.
- **Results Report:** The dialog displays a detailed breakdown of detected issues along with recommendations (e.g., data is healthy, or redownload is advised due to excessive gaps).

### C. Delete Symbol Historical Data (🗑️)
- Allows you to delete all historical archive files for the selected symbol to free up disk space.
- A confirmation prompt is displayed before deletion to prevent accidental data loss.

---

## 4. Global Controls (Footer Buttons)

The bottom of the dialog provides global control options:
- **Refresh:** Rescans the directories and updates the disk usage metrics immediately.
- **Clear All:** Deletes all historical data in the active environment (Demo or Real).
  > [!WARNING]
  > This action permanently deletes historical data for all symbols in the active environment. Use this with caution.
- **Close:** Closes the management dialog.
