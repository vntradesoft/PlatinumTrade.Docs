---
id: platform-storage-overview
title: Storage Overview
description: Runtime data layout and scope-based path model
status: draft
visibility: internal
---

# Storage Overview

## Scope-Based Layout

All runtime data is organized by scope:

| Scope | Default Path | Contents |
|---|---|---|
| RuntimeDataRoot | %AppData%\PlatinOkx (Win) / /var/lib/platinokx (Linux) | All data root |
| Histories | root/histories | OHLCV candle files |
| Logs | root/logs | App and strategy logs |
| State | root/state | Strategy state snapshots |
| Cache | root/cache | Computed metadata cache |
| Backtest | root/backtest | Backtest output artifacts |
| Live | root/live | Live session artifacts |

## Customization

Override via IStoragePathProvider in host DI.

See: [SDK Storage API](../../sdk/client/storage-api.md)

## Related Docs

- [Histories Overview](../histories/overview.md)
- [Logging Overview](../logging/overview.md)
