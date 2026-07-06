---
id: platform-event-bus-overview
title: Event Bus Overview
description: Async event dispatch architecture for orders, positions, and klines
status: draft
visibility: internal
---

# Event Bus Overview

## Design

The event bus uses System.Threading.Channels for bounded async dispatch to avoid blocking the WebSocket read loop.

## Channel Policy

- **Order events** — `BoundedChannel<OrderEventWrapper>` with DropWrite on overflow.
- **Position/Account events** — SemaphoreSlim-guarded direct processing.

## Key Types

- EventProcessor — manages order event channel and continuous consumer loop.
- TradeSimEventDispatcher (backtest) — batches events with 200ms timer aggregation.

## TBD

- [ ] Event bus async strategy finalization for all domain event types.
- [ ] Unified ordering guarantees across order/position/balance streams.

## Related Docs

- [Events List](./events-list.md)
- [Data Flow](../architecture/data-flow.md)
