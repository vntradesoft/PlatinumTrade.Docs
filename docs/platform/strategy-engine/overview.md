---
id: platform-strategy-engine-overview
title: Strategy Engine
description: Strategy lifecycle orchestration and event loop architecture
status: draft
visibility: internal
---

# Strategy Engine

## Responsibility

The strategy engine drives the IStrategy lifecycle, coordinates market data updates with indicator calculations, and dispatches typed events to the running strategy.

## Core Components

- **BacktestUpdateStrategy / RealtimeUpdateStrategy** — two update implementations sharing the same IIndicatorUpdateStrategy contract.
- **IndicatorCoordinator** — sorts and executes indicator calculate pipeline on bar events.
- **EventProcessor** — bounded channel dispatch for order/position/account events (REST/WS).
- **SyntheticTickSource** — JIT tick generator for backtest simulation from OHLCV candles.

## Event Loop Pattern

1. New bar detected → coordinator triggers indicator calculations.
2. Indicator update completes → strategy RunAsync(Kline, state, ct) called.
3. Exchange events (order fill, position change) → RunAsync(Order|Position|Balance, ...).

## Related Docs

- [Simulator](./simulator.md)
- [Tick Data Simulation](./tick-data-simulation.md)
- [Data Flow](../architecture/data-flow.md)
