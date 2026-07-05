---
id: platform-logging-correlation-id
title: Correlation ID
description: Session and request correlation tracking in logs
status: tbd
visibility: public
---

# Correlation ID

## Status: TBD

Explicit correlation IDs are not yet standardized across the logging stack.

## Current State

Session isolation is implicit via per-session rolling log files (timestamp-based naming).

## Open Questions

- [ ] Should a CorrelationId field be added to TradeLogUnit?
- [ ] Should bot sessions generate a UUID correlation tag propagated across all log events?

## Related Docs

- [Logging Overview](./overview.md)
- [Structured Logging](./structured-logging.md)
