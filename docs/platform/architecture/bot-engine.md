---
id: platform-architecture-bot-engine
title: Bot Engine
description: CLI host assembly and service orchestration design
status: draft
visibility: internal
---

# Bot Engine

## Role

The CLI host wires all runtime services and drives the strategy execution loop as a .NET Generic Host.

## Startup Sequence

1. Parse command-line arguments.
2. Configure Serilog and output sinks.
3. Construct exchange client from environment credentials.
4. Register: history downloader, kline tracker, user data tracker, strategy plugin, indicators, notifiers.
5. Start TradingHostedService — runs strategy lifecycle as hosted background service.

## Key Runtime Components

- StrategyEngine — drives IStrategy lifecycle (init → run → stop).
- OkxKlineTracker — polls/subscribes market candle data.
- OkxUserTracker — WebSocket user data (orders, positions, balance).
- IStrategyLogger + IStoreLogger — structured strategy logging with session persistence.
- TradingMetrics — performance metric capture with debounced state save.

## Configuration Entry Points

| Concern | Mechanism |
|---|---|
| API credentials | Environment variables |
| Strategy DLL + params | --strategy argument |
| Symbol/timeframe | --symbol / --timeframe arguments |
| Notifier | --notifier argument |
| Storage format | --history_load argument |

## Related Docs

- [System Design](./system-design.md)
- [Data Flow](./data-flow.md)
- [Platform Logging](../logging/overview.md)
