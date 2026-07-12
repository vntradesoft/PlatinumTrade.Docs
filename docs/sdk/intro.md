---
sidebar_position: 1
id: sdk-intro
title: Introduction
description: Overview of Pt.Okx.Sdk components, indicators, and framework
status: draft
visibility: internal
publish: false
---

# Welcome to Pt.Okx.Sdk

**Pt.Okx.Sdk** is the contracts library for the **Platinum Trading Platform (supporting OKX exchange futures & swaps)** — the lowest layer in the solution, defining all interfaces, enums, models, and patterns consumed by every other project.

## What does this SDK provide?

| Component | Description |
|---|---|
| **Client Interfaces** | `IOkxClient`, `ITradeClient`, `ITimeSeriesClient`, `IAccountClient`, `IInstrumentClient` — abstraction layer over the entire OKX API |
| **ApiResult Pattern** | Unified error handling via `ApiResult<T>` — no exceptions for business logic errors |
| **Technical Indicators** | Base classes (`CalcIndBase`, `IIndicator`, `IIndicatorBuffer`) and 20+ built-in indicators (MA, RSI, MACD, ATR, SuperTrend, Ichimoku, VWAP, …) |
| **Strategy Framework** | `IStrategy`, `IStrategyStateStore`, `IStrategyLogger` — lifecycle and state management for trading strategies |
| **Plugin System** | `IStrategyPlugin`, `IIndicatorPlugin` — plugin interfaces for strategy and custom indicator DLLs |
| **Drawing API** | `IDrawingManager` — programmatic chart drawing objects (lines, shapes, text, Fibonacci) from strategy code |
| **Notification** | `ITelegramCommandExtension` — Telegram command handler extensions |
| **Storage** | `IStoragePathProvider` — abstraction for runtime storage directories |

## Who uses this SDK?

- **Strategy developers** — build trading strategy plugins (e.g., `Pt.Example.Stgy.UpTrend`)
- **Indicator developers** — build custom technical indicators (e.g., `Pt.Examples.Indicator`)
- **Core Engine** — implements the interfaces defined in this SDK
- **GUI / Bot** (**Platinum Trade App**, **CLI Bot**) — consume services via dependency injection


## Where to start

- New to the project → [Architecture](architecture.md)
- Ready to write code → [Getting Started](getting-started.md)
- Building a strategy → [Strategy Plugin](strategy/overview.md)
- Building an indicator → [Custom Indicator Plugin](indicator-plugin.md)
- Drawing on charts from code → [Drawing API](drawing-api.md)
- Looking up API signatures → [API Reference](pathname:///PlatinumTrade.Docs/sdk/api/index.html)