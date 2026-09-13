---
sidebar_position: 99
id: sdk-document-history
title: Document History
description: Comprehensive version and contract modification history of the Platinum Trade SDK, API abstractions, and Examples
---

# Document History

This page provides a detailed changelog of public API contracts, base classes, attributes, dependencies, and project templates for the **Platinum Trade SDK** (`Pt.Okx.Sdk`) and official **Examples / Templates**.

---

### [0.12.0-beta.2] - 2026-09-13

#### Strategy Contracts & Indicators
- **Simulation & Testing Signals:**
  - Added simulated signal generation parameter to `Stgy.UpTrend` reference strategy, enabling rapid verification of order routing and position handling without waiting for live market events.
  - Formatted decimal precision display for `SuperTrend` indicator upper/lower bands and ATR values.
  - Refined `EntryChaseLimit` order chasing calculation to prevent slippage on fast-moving tick streams.
- **Metric Generalization & State Persistence:**
  - Standardized performance measurement by generalizing `BacktestMetrics` into `TradingMetrics`, providing unified tracking contracts across Backtest, Paper, and Live modes.
  - Added balance tracking mode contracts to support equity vs balance PnL evaluation.
  - Clarified architectural distinction between `IStrategyStateStore` (key-value state persistence across restarts) and `IStoragePathProvider` (filesystem directory resolution).

#### Project Templates & Tooling
- **dotnet new Templates:**
  - Synchronized `Pt.Templates.Strategy` (`dotnet new pt-strategy`) and `Pt.Templates.Indicator` (`dotnet new pt-indicator`) to reference `Pt.Okx.Sdk` version `0.12.0-beta.2`.
  - Updated template symbols in `template.json` with modern C# 13 and .NET 10.0 defaults.

#### Documentation & Bilingual Guides
- **Expanded SDK Guides:**
  - Added dedicated architectural guides for Multi-Timeframe data consumption, Backtest engine customization, State Persistence, and 2-way Telegram bot integration.
  - Aligned client API references (`IAccountClient`, `IInstrumentClient`, `ITradeClient`, `ITimeseriesClient`) with current SDK interfaces.
  - Synchronized full English and Vietnamese documentation for all technical indicator references and plugin creation tutorials.

---

### [0.12.0-beta.1] - 2026-08-21

#### Public API Contracts & Types
- **Plugin Metadata & Schema:**
  - Enhanced `IStrategyPluginMetadata` and `IIndicatorPluginMetadata` with runtime version validation and author metadata contracts.
  - Added `InputSchemaBuilder` and `InputSchemaMetadata` for declarative dynamic input parameter generation.
  - Refined `InputParamAttribute` parameter binding with typed constraints (`IntParameter`, `DoubleParameter`, `DecimalParameter`, `BoolParameter`, `StringParameter`, `EnumParameter`, `TimeSpanParameter`, `FilePathParameter`, `ListParameter<T>`).
- **Indicator Models & Properties:**
  - Added deep copy (`Clone()`) support to `IndicatorProperty`, `IndicatorBuffer`, and plot style descriptors to ensure thread-safe decoupling between background calculation routines and UI render loops.
  - Added `CalculationMode` enum (`OnBarClose`, `OnEveryTick`, `OnTimer`) allowing indicators to explicitly define recalculation frequency.
- **Client & Market Data Abstractions:**
  - Expanded `ITimeseriesClient` methods: `CopyBuffer`, `CopyTimes`, `CopyOpens`, `CopyHighs`, `CopyLows`, `CopyCloses`, `CopyVolumes`, and `CopyPrices`.
  - Added multi-timeframe candle stream subscription and history range warmup synchronization.

#### Examples & Templates
- **Pt.Example.Stgy.UpTrend:** Updated reference trading strategy demonstrating:
  - Multi-indicator binding (`SimpleMovingAverage`, `RelativeStrengthIndex`).
  - Dynamic parameter configuration using `[InputParam]`.
  - Order placement via `PlaceOrderAsync` and position state tracking in `OnTickAsync`.
  - Automated state persistence via `IStrategyStateStore`.
- **Pt.Examples.Indicator:** Added custom indicator samples demonstrating custom buffer allocation, drawing styles, and multi-buffer output.
- **Project Templates:** Updated `dotnet new pt-strategy` and `dotnet new pt-indicator` templates targeting .NET 10.0 with modern C# 13 syntax.

---

### [0.11.0-beta.1] - 2026-07-20

#### Contracts & Nuget Packages
- **Package Metadata:** Synchronized `Pt.Okx.Sdk` NuGet package metadata, dependencies, and symbol packages (`.snupkg`) with platform release v0.11.0-beta.1.
- **Licensing Abstractions:** Refined feature tier checking contracts and access validation pipelines for custom plugins.

---

### [0.10.0-beta.1] - 2026-07-19

#### Indicators & TimeSeries Engine
- **Open Candle Processing:**
  - Added support for live open candle (shift `0`) updates within indicator buffer calculations.
  - Synchronized `IndicatorBuffer` length contracts dynamically with underlying time series arrays.
- **Calculation Triggers:**
  - Added on-demand open candle indicator evaluation triggered directly by real-time market ticks.
- **Candle Models:**
  - Optimized `CompactCandle` struct and `PriceValue` representations for low-allocation tick aggregation.

---

### [0.9.3-beta.4] - 2026-07-15

#### Sub-Client Interfaces & Endpoint Mappings
- **Client Abstractions:**
  - Structured modular sub-client interfaces under `Pt.Okx.Sdk.Clients`:
    - `IAccountClient`: Account balance, positions, leverage, and margin mode endpoints.
    - `IInstrumentClient`: Symbol rules, tickers, contract sizes, tick sizes, and trading fee rates.
    - `ITradeClient`: Order placement, batch orders, cancellations, order amendments, and trade history.
    - `ITimeseriesClient`: Historical candlestick bars and real-time candle streaming.
- **Documentation & Types:**
  - Added complete OKX v5 REST API endpoint and WebSocket channel mapping attributes across all client methods.
  - Standardized response wrappers using `ApiResult<T>`.

---

### [0.9.3-beta.3] - 2026-07-09

#### Maintenance
- **Package Version:** Synchronized `Pt.Okx.Sdk` version to `0.9.3-beta.3`.
- **Contract Verification:** Validated binary backwards compatibility for existing compiled strategy assemblies.

---

### [0.9.3-beta.2] - 2026-07-08

#### Dependencies
- **Exchange Adapter:** Upgraded `JK.OKX.Net` underlying dependency to `5.0.2` within SDK network adapters.

---

### [0.9.3-beta.1] - 2026-07-08

#### Strategy Notifications
- **Telegram Integration:** Upgraded `Telegram.Bot` dependency to `22.10.1.1` in `Pt.Okx.Sdk.Notifier` for strategy alert dispatching and interactive 2-way bot commands.

---

### [0.9.0-beta.5] - 2026-07-08

#### Strategy & Indicator Lifecycle Standards
- **Strategy Lifecycle:**
  - Standardized lifecycle contracts:
    - `Task OnInitAsync()`: Asynchronous initialization, indicator registration, and parameter validation.
    - `Task OnStopAsync()`: Graceful cleanup, cancellation of open orders, and resource disposal.
    - `Task OnTickAsync(TickEventArgs e)`: Event-driven market tick handler.
    - `Task OnOrderUpdateAsync(OrderEventArgs e)`: Execution and order fill notifications.
- **Project Structure:**
  - Renamed official sample projects to `Pt.Examples.Indicator` and `Pt.Example.Stgy.UpTrend`.

---

### [0.9.0-beta.4] - 2026-07-08

#### Maintenance
- **Version Alignment:** Synchronized SDK contract version with application release v0.9.0-beta.4.

---

### [0.9.0-beta.3] - 2026-07-08

#### Project Templates & Architecture
- **dotnet new Templates:**
  - Published `Pt.Templates.Strategy` (`dotnet new pt-strategy`).
  - Published `Pt.Templates.Indicator` (`dotnet new pt-indicator`).
- **Lifecycle Modernization:**
  - Migrated legacy `InitializeAsync` / `StopAsync` to async-first `OnInitAsync` / `OnStopAsync`.

---

### [0.9.0-beta.2] - 2026-07-06

#### Core Abstractions
- **Plugin Architecture:** Introduced `IStrategyPlugin`, `IIndicatorPlugin`, and `IInputParamManager` interfaces.
- **State Store:** Introduced `IStrategyStateStore` interface for automatic strategy key-value state persistence across restarts.

---

### [0.9.0-beta.1] - 2026-07-05

#### Initial Beta Release
- **Pt.Okx.Sdk NuGet Package:** Initial public beta release for .NET 10.0 developers.
- **Core Strategy & Indicator Foundations:**
  - `StrategyBase`: Base class for algorithmic trading strategies.
  - `IndicatorBase`: Base class for custom mathematical and technical indicators.
  - `IOkxClient` / `ITradingClient`: Unified exchange client interface.
- **Built-in Indicators:** Pre-packaged catalog of technical indicators (Trend, Oscillators, Volumes, Bill Williams).
- **Chart Drawing API:** Introduced `IDrawingClient` and primitive chart drawing objects (Lines, Rectangles, Text, Fibonacci Retracements).