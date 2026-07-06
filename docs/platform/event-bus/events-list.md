---
id: platform-event-bus-events-list
title: Events List
description: Catalog of dispatched event types with trigger conditions
status: draft
visibility: internal
---

# Events List

## Strategy Events

| Event Type | Trigger |
|---|---|
| Kline | New bar close or bar update from candle tracker |
| Tick | Each synthetic tick during backtest |
| Order | Order state change (new, filled, cancelled, rejected) |
| Position | Position open/close/change |
| Balance | Account balance update |
| AlgoOrder | Algo order state change |
| Transaction | Trade fill transaction |
| TradeCommand | Internal command from strategy to trade layer |

## Delivery Guarantee

Current: at-least-once within bounded channel, drop-write on overflow.

## Related Docs

- [Event Bus Overview](./overview.md)
