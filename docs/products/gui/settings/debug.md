---
id: products-gui-settings-debug
title: Debug
sidebar_position: 5
description: Developer diagnostics, performance profiling, raw socket logging, and child-process debugger wait configuration
---

# Debug

The **Debug** tab provides low-level diagnostics, verbosity controls, and developer profiling options.

:::note Build Visibility
In production release builds, the Debug tab is hidden from regular users to prevent accidental performance degradation. It is readily accessible in DEBUG builds or when developer diagnostic flags are active.
:::

![Debug Settings](/img/products/gui/settings/debug-settings.png)

## Logging Options

- **Library Logs**: Enables verbose internal logging from underlying exchange and network libraries (such as `Pt.Okx.Sdk` and websocket connection drivers).
- **Performance Logs**: Outputs high-resolution execution time, memory allocation, and handler latency metrics to assist in profiling system bottlenecks.
- **Developer Mode**: Bypasses UI log level filtering rules, allowing all low-level `Debug` and `Trace` events to stream directly to the trade log viewer in real time. Use this when diagnosing custom plugin lifecycle issues or strategy state transitions.
- **Debug Wait (attach debugger)**:
  
  :::tip DEBUG Builds Only
  When enabled in a DEBUG compilation of the app, this setting automatically passes the `--debug-wait` argument to every spawned `strategy-host` child process (for both Backtest and Live trading). The child process halts at entry and displays a process ID prompt, giving you time to attach the Visual Studio, Rider, or `vsdbg` debugger before strategy code begins execution.
  :::

## Advanced Data

- **Library Raw Logging**: When enabled, the application dumps the exact, unparsed raw JSON payloads received directly from the OKX WebSocket channels and REST API endpoints. Useful for investigating exchange payload schema changes or unexpected data formats.
