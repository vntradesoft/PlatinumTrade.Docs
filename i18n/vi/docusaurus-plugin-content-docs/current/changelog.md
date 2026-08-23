---
id: changelog
title: Nhật Ký Thay Đổi
description: Ghi chú phát hành và liên kết tải về Platinum Trade App
sidebar_position: 99
---

# Platinum Trade App

## Changelog

### [0.12.0-beta.1] - 2026-08-21

#### Features
- **strategy:** Implement Strategy Host Process Manager and multi-process lifecycle isolation.
- **strategy:** Update UpTrend strategy, indicator examples, and project templates.
- **ui:** Redesign Backtest Metrics dashboard with Win/Loss ratio donut chart, radar chart, and dynamic PnL coloring.
- **ui:** Add position history view and inline filters to order and position history tabs.
- **ui:** Add search, real-time prices, and multi-language support to AddSymbolDialog.
- **ui:** Add dynamic theme, language, and settings toolbar controls to Backtest and Live Trading dialogs.
- **core:** Add calculation mode and history warmup support for multi-timeframe indicators.
- **sdk:** Refine plugin metadata, contract compatibility, and parameter serialization.

#### Fixes & Improvements
- **chart:** Preserve indicator order and sub-window redraw on timeframe switch.
- **chart:** Fix X-to-index mapping offset and add smart X-axis label decimation for large backtest datasets.
- **chart:** Optimize memory consumption, candle pooling buffers, and rendering performance.
- **ui:** Fix data binding for tab headers to support dynamic runtime language switching.
- **bot:** Improve exception handling and clean up stack traces for CLI runner.
- **app:** Prevent Velopack `NotInstalledException` when running in portable mode.

---

### [0.11.0-beta.1] - 2026-07-20

#### Features & Improvements
- **app:** Update licensing verification services and feature access pipeline.
- **ci:** Automate build and deployment packaging for version 0.11.0-beta.1.

---

### [0.10.0-beta.1] - 2026-07-19

#### Features
- **chart:** Trigger open candle indicator recalculation on live ticks in the chart data engine.
- **core:** Synchronize indicator buffer length with price series and support on-demand open candle updates.

#### Fixes & Improvements
- **chart:** Show tooltip and time label for open candle.
- **chart:** Prevent late ticks from reopening closed candles.
- **indicator:** Prevent out-of-order candles from inflating buffer and synchronize rendering on timeframe switch.
- **core:** Ensure realtime ticks update multi-timeframe indicator dependencies.
- **core:** Optimize single-symbol `CandleAggregator` using `PriceValue`.

---

### [0.9.3-beta.4] - 2026-07-15

#### Features
- **core:** Redesign time series update engine and optimize GUI chart views.
- **docs:** Restructure API reference for client and indicators, adding comprehensive OKX.Net method and REST endpoint mappings.

#### Fixes & Improvements
- **test:** Resolve failing unit tests across Core and Gui test suites.
- **config:** Resolve settings persistence and migration from local `appsettings.json` to shared `%LocalAppData%` configuration.

---

### [0.9.3-beta.3] - 2026-07-09

#### Features
- **ui:** Add update settings tab and non-blocking update notification dialog.

#### Fixes
- **ui:** Use invariant culture for process architecture in About Dialog.

---

### [0.9.3-beta.2] - 2026-07-08

#### Features
- **gui:** Replace old terms with new EULA.
- **gui:** Enable Velopack auto-check and configure GitHub feed URL.

#### Fixes
- **app:** Fix Velopack auto-update channel configuration to support switching between stable and beta channels.

#### Breaking Changes
- **okx:** Upgrade JK.OKX.Net to 5.0.2.

---

### [0.9.3-beta.1] - 2026-07-08

#### Dependencies & CI
- **deps:** Upgrade `Telegram.Bot` to 22.10.1.1.
- **ci:** Automate GitHub release notes generation.

---

### [0.9.2-beta.4] - 2026-07-08

#### Fixes
- **gui:** Configure GitHub feed URL for Velopack auto-updater.

---

### [0.9.1-beta.4] - 2026-07-08

#### Features & Docs
- **gui:** Replace old terms with new EULA.
- **docs:** Update company branding, legal terms, and contact information.

---

### [0.9.0-beta.5] - 2026-07-08

#### Features & SDK
- **sdk:** Restructure strategy and indicator documentation with complete lifecycle guides (`OnInitAsync`, `OnStopAsync`).
- **docs:** Add DocFX API reference generation configuration.

---

### [0.9.0-beta.4] - 2026-07-08

#### Features
- **gui:** Add third-party notices link in About dialog.
- **gui:** Show full semantic version and architecture in About Dialog.

---

### [0.9.0-beta.3] - 2026-07-08

#### Features
- **sdk:** Add `dotnet new` project templates for strategy and indicator plugins.
- **gui:** Bypass feature limits for beta versions.
- **strategy:** Refactor strategy lifecycle methods to `OnInitAsync` and `OnStopAsync`.

---

### [0.9.0-beta.2] - 2026-07-06

#### Features
- **core:** Update strategy engine, plugin loader, websocket client, indicators, and backtest engine.

---

### [0.9.0-beta.1] - 2026-07-05

#### Features & Packaging
- **ci:** Enable Velopack packaging with versioned installer `PlatinumTrade-{version}-win-x64-Setup.exe`.
- **storage:** Implement partitioned storage architecture under `%LocalAppData%\PlatinumTrade\Histories\`.
- **docs:** Add comprehensive release guides for App, SDK, and Docs.