---
id: platform-histories-overview
title: Histories Overview
description: Historical candle storage system and download management
status: draft
visibility: internal
---

# Histories Overview

## Purpose

History management provides on-demand download and local caching of OHLCV candle data for backtest and live warmup.

## Storage Backends

## Architecture

**v2.0 (Current)**: Monthly-partitioned binary-only with JSON manifest metadata.
- Manifest-driven O(1) metadata queries (no file scanning)
- Atomic writes with temp-file rename pattern
- Memory-efficient streaming (constant buffer size)
- Deduplication & intelligent merge on download

See [Manifest-Based Architecture](./manifest-based-architecture.md) for complete design.

## Smart Sync

SmartSyncAsync checks existing local data and downloads only missing ranges. Metadata caching avoids re-scanning.

## Related Docs

- [Download](./download.md)
- [Storage](./storage.md)
- [Platform Storage](../storage/overview.md)
