---
id: sdk-architecture
title: Architecture Overview
description: SDK architecture design and component interactions
status: draft
visibility: internal
publish: false
---

# Architecture

This page describes the overall architecture of the Platinum Trading Platform (supporting OKX exchange futures & swaps) solution and the role `Pt.Okx.Sdk` plays within it.

## Solution Structure

```text
Pt.Okx.Sdk             ← Contracts: interfaces, enums, models, ApiResult
  ^
  |
Core Engine             ← Engine: OKX wrapper, indicators, socket, simulator, notifier
  ^        ^
  |        |
CLI Bot     Platinum Trade App
  ^
  |
Stgy.UpTrend             ← Strategy plugin (example)

Okx.IndicatorExample     → Pt.Okx.Sdk  ← Indicator plugin (example)
Unit Tests               → Core Engine + Pt.Okx.Sdk
```

## Project Descriptions

| Project | Target | Description |
|---|---|---|
| `Pt.Okx.Sdk` | `net8.0;net9.0;net10.0` | Contracts library — interfaces, enums, models, patterns |
| **Core Engine** | `net10.0` | Engine — OKX API wrapper, indicators, WebSocket, simulator, notifier, history candle |
| **CLI Bot** | `net10.0` | Console host for real / forward trading |
| **Platinum Trade App** | `net10.0-windows` | WPF app — workspace, chart, market watch, strategy config, backtest UI |
| `Stgy.UpTrend` | `net10.0` | Example strategy plugin — trend-following strategy |
| `Okx.IndicatorExample` | `net10.0` | Example indicator plugin — MA Crossover, Momentum, ExRSI |
| **Unit Tests** | `net10.0` | NUnit tests for core, simulator, indicator, candle history |


## Namespace Map

```text
Pt.Okx.Sdk
├── Clients
│   ├── IOkxClient                    ← Aggregator interface
│   ├── Account
│   │   └── IAccountClient           ← Balances, leverage, margin
│   ├── Instruments
│   │   └── IInstrumentClient         ← Trading pair information
│   ├── Market
│   │   └── ITimeSeriesClient         ← OHLCV data, indicators, tick data
│   └── Trading
│       └── ITradeClient              ← Orders, positions, algo orders
├── Common
│   ├── ApiResult / ApiResult<T>      ← Result pattern
│   └── ApiError                      ← Error information
├── Enums
│   ├── Timeframe, OrderSide, OrderType
│   ├── InstrumentType, TradeMode
│   └── ApiErrorType, PtLogLevel
├── Indicators
│   ├── Base (IIndicator, CalcIndBase, IIndicatorBuffer)
│   ├── BuiltIn (IIndicatorMA, IIndicatorRSI, ...)
│   ├── Plugin (IIndicatorPlugin, IIndicatorRegistrationContext)
│   └── Services (IIndicatorFactory, IIndicatorManager)
├── Strategy
│   ├── IStrategy, IStrategyStateStore, IStrategyLogger
│   ├── Plugin (IStrategyPlugin, IStrategyPluginMetadata)
│   ├── Settings (StrategySettings)
│   ├── Parameters (InputParameter, IntParameter, ...)
│   └── Events (StrategyEventType, StrategyEvent)
├── Drawing
│   └── IDrawingManager               ← Chart drawing objects
├── Notifier
│   └── ITelegramCommandExtension     ← Telegram commands
└── Storage
    └── IStoragePathProvider           ← Runtime storage paths
```

## Technology Stack

| Technology | Usage |
|---|---|
| C# / .NET 10 | Nullable enabled, implicit usings |
| WPF | `net10.0-windows` for **Platinum Trade App** |
| Dependency Injection | `Microsoft.Extensions.DependencyInjection` / `Hosting` |
| Logging | `ILogger<T>` + Serilog provider |
| Testing | NUnit + Moq |

## See also

- [Getting Started](getting-started.md) — How to reference the SDK and write your first code
- [API Reference](pathname:///PlatinumTrade.Docs/sdk/api/index.html) — Full API documentation