---
id: products-gui-network-monitor
title: Network Monitor
sidebar_position: 10
description: Technical specifications of network monitor states and display conventions
status: draft
visibility: internal
publish: false
---

# Network Monitor

This document describes the technical state specifications and display rules for the Network Monitor component in the Platinum Trade GUI App.

## Scope

- Standardization of network connection states.
- Standardization of color-coding and signal bar metrics.
- Consistency of latency values displayed on the application status bar.

## Status Metrics and States

### `<latency> ms`

- Definition: Successful round-trip latency to the endpoint.
- Format: Positive integer followed by the `ms` suffix.
- Examples: `87 ms`, `245 ms`.

### `ERR`

- Definition: The latency query request returned an error status (unsuccessful response).
- Purpose: Represents a business logic or HTTP communication error during the measurement cycle.

### `N/A`

- Definition: A runtime exception occurred during latency measurement.
- Purpose: Distinguishes physical network/runtime crashes from API business errors (`ERR`).

### `No API`

- Definition: No API client is initialized or available for measurement.
- Purpose: Indicates that the underlying API credential layer is not configured or ready.

## Signal Strength Mapping Rules

- `< 200 ms`: Green color, 4 signal bars.
- `< 500 ms`: Light Blue color, 3 signal bars.
- `< 1000 ms`: Yellow color, 2 signal bars.
- `>= 1000 ms`: Red color, 1 signal bar.

## Error and Unavailable State Conventions

- `ERR`: Gray color, 0 signal bars.
- `N/A`: Gray color, 0 signal bars.
- `No API`: Gray color, 0 signal bars.

## Display Binding Contracts

- `LatencyText`: Binds directly to the text representation of the states above.
- `LatencyMs`: The measured latency value (in milliseconds); error/unavailable states return a non-positive value.
- `NetworkStrengthColor`: Follows the color mapping rule corresponding to the current state.
- `NetworkBars`: Follows the signal bar count mapping rule, returning `0` during error/unavailable states.

## Related Docs

- [API Key Setup](./settings/api-credentials.md)
- [UI Overview](./ui-overview.md)
