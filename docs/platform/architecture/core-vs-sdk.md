---
id: platform-architecture-core-vs-sdk
title: Core vs SDK
description: Boundary and dependency direction between Core and SDK libraries
status: draft
visibility: internal
---

# Core vs SDK

## Rule

Pt.Okx.SDK defines the public contracts.
Pt.Okx.Core implements them.

## SDK Surface (public contract)

- Interfaces: IStrategy, IIndicatorPlugin, IOkxClient, IStoragePathProvider, etc.
- Models: Order, Position, CandleData, StrategyEvent, etc.
- Enums and error definitions.
- Plugin isolation context base (AssemblyLoadContext usage).

## Core Implementation (internal)

- Exchange integration, WebSocket tracking, event processing.
- Indicator manager, coordinator, buffer management.
- History downloader, storage backend, state recovery.
- Licensing validation, feature access gate.

## Plugin Developer Rule

- Reference **SDK** only in plugin projects.
- Core assemblies are resolved from the host via AssemblyDependencyResolver to prevent type identity splits.

## Related Docs

- [System Design](./system-design.md)
