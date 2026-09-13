---
id: products-gui-settings-live-paper-runtime
title: Runtime Monitor
sidebar_position: 8
description: Configure real-time heartbeat monitoring, telemetry logging intervals, and performance warning thresholds for Live and Paper trading
---

# Runtime Monitor

This section explains how to configure real-time operational monitoring for live and paper trading sessions. The runtime monitor tracks heartbeat liveness, processing queue depth, execution latency, and system memory health to ensure reliable bot execution.

## Runtime Monitor Settings

Operational settings that govern how the trading engine logs its internal health state.

- **Enable runtime monitor**: Toggles background health and telemetry monitoring for the active trading loop. When disabled, runtime performance metrics will not be recorded or displayed in the live paper dashboard.
- **Log refresh interval (seconds)**: Specifies how frequently (in seconds) the monitor writes an operational health snapshot to the log file (default: `30`).
- **Heartbeat warning threshold (ms)**: Defines the maximum allowed duration (in milliseconds) without a heartbeat pulse from the trading loop before raising a stall warning (default: `10,000` ms). If the trading loop exceeds this threshold, the engine flags a potential deadlock or thread starvation.

:::tip
For high-frequency or latency-sensitive strategies, a log interval between 15 to 30 seconds provides adequate telemetry without generating excessive log volume.
:::

## Warning Thresholds

Custom threshold limits that alert you to potential network degradation, processing bottlenecks, or strategy stalls.

- **Kline drop rate warning (%)**: The percentage of incoming candlestick/kline ticks dropped by the input queue that triggers a performance alert (default: `5.0%`). Spikes above this threshold usually indicate network congestion or heavy CPU load preventing timely processing.
- **Strategy latency warning (P99) (ms)**: The 99th percentile execution latency threshold for strategy event handlers in milliseconds (default: `500.0` ms). If 1% or more of strategy calculation loops exceed this value, a warning is emitted to help you diagnose slow custom indicator logic.

:::warning
If you frequently observe P99 latency warnings during live execution, review your custom indicator loops and avoid executing synchronous I/O or heavy memory allocations within `OnCandle` or `OnTick` handlers.
:::
