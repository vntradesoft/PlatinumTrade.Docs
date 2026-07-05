---
id: platform-architecture-data-flow
title: Data Flow
description: Runtime data paths from market feed to strategy output
status: draft
visibility: internal
---

# Data Flow

## High-Level Path

`
Market (OKX WebSocket/REST)
  → Kline/Tick tracker
  → Time-series manager (bar updates)
  → Indicator coordinator (calculate pipeline)
  → Strategy event dispatch
  → Strategy RunAsync handler
  → Order/position state
`

## Key Stages

1. **Market data ingestion** — WebSocket tracker pushes new candle data into time-series manager.
2. **Indicator pipeline** — Coordinator triggers sorted indicator calculations on bar-close events.
3. **Event dispatch** — Typed events (Kline, Order, Balance, etc.) are published through channel or direct call.
4. **Strategy execution** — Strategy RunAsync receives event type and current state snapshot.
5. **Order submission** — Strategy emits trade commands dispatched to exchange API.

## Backtest Parallel Path

- History data replaces live feed.
- SyntheticTickSource generates JIT tick events from OHLCV candles.
- Event dispatch and strategy logic remain identical to live path.

## Related Docs

- [System Design](./system-design.md)
- [Strategy Engine Overview](../strategy-engine/overview.md)
- [Event Bus Overview](../event-bus/overview.md)
