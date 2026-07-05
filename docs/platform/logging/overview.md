---
id: platform-logging-overview
title: Logging Overview
description: Structured logging architecture across bot and strategy layers
status: draft
visibility: public
---

# Logging Overview

## Two-Layer Model

1. **Infrastructure logs** (Serilog) ? App-level: startup errors, DI issues, library output. Written to rolling files and console.
2. **Strategy logs** (IStrategyLogger) ? Domain-level: trade signals, order events, risk checks. Written to both Serilog and session binary log.

## Key Types

- IStrategyLogger ? interface consumed by strategy code.
- StrategyLogger ? implementation with level + notifier dispatch.
- TradeLogger ? domain-specific formatters for orders/positions.
- StoreLogger ? binary session log writer.

## Log Levels (PtLogLevel)

Critical Å® Error Å® Warning Å® Success Å® Information Å® Debug Å® Trace

## Related Docs

- [Structured Logging](./structured-logging.md)
- [Correlation ID](./correlation-id.md)
