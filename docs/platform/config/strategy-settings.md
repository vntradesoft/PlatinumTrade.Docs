---
id: platform-config-strategy-settings
title: Strategy Settings
description: Runtime strategy configuration and execution parameters
status: draft
visibility: internal
---

# Strategy Settings

## Key Parameters

| Parameter | Type | Description |
|---|---|---|
| Symbol | string | Trading pair (e.g. BTC-USDT-SWAP) |
| Timeframe | Timeframe enum | Primary candle timeframe |
| WarmupBars | int | Historical bars loaded before strategy activates |
| Leverage | int | Account leverage setting |
| MarginMode | MarginMode | Isolated or cross margin |
| Sandbox | bool | Demo/demo mode switch |

## Notes

- Strategy settings are hydrated from command-line arguments in CLI.
- GUI host reads settings from app config and credential store.
- Warmup bars directly affect how many historical candles the indicator pipeline processes before the strategy emits first signal.

## Related Docs

- [Input Parameters](./input-parameters.md)
- [Bot Engine](../architecture/bot-engine.md)
