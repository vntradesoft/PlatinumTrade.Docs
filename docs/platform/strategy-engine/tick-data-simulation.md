---
id: platform-strategy-engine-tick-data-simulation
title: Tick Data Simulation
description: Synthetic tick generation from OHLCV for intra-bar strategy testing
status: draft
visibility: internal
---

# Tick Data Simulation

## Purpose

Simulate realistic intra-bar price movement from OHLCV candles without storing actual tick data.

## Algorithm

Each candle boundary produces N synthetic ticks via:

1. **Brownian bridge** path constrained by Open/High/Low/Close.
2. **Skewed volume distribution** — front-loaded or back-loaded based on OhlcPattern.
3. **Lazy price computation** — PriceData (bid/ask/mark/index/funding rate) computed only on access.

## Configuration (TickSourceConfig)

| Setting | Purpose |
|---|---|
| TicksPerCandle | Number of synthetic ticks per bar |
| RandomSeed | Seed for deterministic replay |
| OhlcPattern | Volume/price shaping profile |

## Technical Notes

- PRNG: Xoshiro256StarStar (fast, good statistical properties).
- Indicators available per tick: EMA(10), VWAP(20), rolling std dev.
- No tick storage — generated JIT from candle array reference.

## Related Docs

- [Simulator](./simulator.md)
