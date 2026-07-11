---
id: products-gui-settings-debug
title: Debug
sidebar_position: 5
description: Developer and troubleshooting options
status: draft
visibility: internal
publish: false
---

# Debug

This section details how to enable advanced logging and developer debug mode for troubleshooting.

![Debug Settings](/img/products/gui/settings/debug-settings.png)

## Logging

- **Library Logs**: Enables detailed debug logs from the underlying core libraries (e.g., OKX SDK).
- **Performance Logs**: Outputs metrics about execution time, memory usage, and latency for performance profiling.
- **Developer Mode**: Disables UI selection policy controls and passes all low-level Debug/Trace logs directly to the user interface. Use only when actively troubleshooting plugin logic or system errors.

## Advanced Data

- **Library Raw Logging**: When enabled, the application will output the original, unparsed JSON data received directly from the OKX WebSocket and REST API endpoints.
