---
id: platform-strategy-engine-simulator
title: Simulator
description: Backtest simulation engine and replay pipeline
status: draft
visibility: internal
---

# Simulator

## What It Does

The simulator replays historical OHLCV candle data through the same indicator and strategy pipelines used in live mode, enabling deterministic backtest evaluation.

## Key Components

- **BacktestUpdateStrategy** — initializes time-series with history data, drives bar-by-bar replay.
- **SyntheticTickSource** — generates intra-bar ticks from OHLCV with Brownian bridge price path.
- **TradeSimEventDispatcher** — batches and dispatches simulated trade events with 200ms timer aggregation.
- **BacktestRunner** (GUI) — orchestrates history download, engine init, and main run loop.

## Determinism

Tick generation uses Xoshiro256StarStar PRNG seeded by configurable RandomSeed. Same seed produces identical tick paths.

## Performance Characteristics

- Memory: O(TicksPerCandle) per candle — not O(Candles × TicksPerCandle).
- Tick indicators: EMA(10) fast-close, VWAP(20) typical price, rolling volatility std dev.

## Related Docs

- [Tick Data Simulation](./tick-data-simulation.md)
- [Histories Overview](../histories/overview.md)
