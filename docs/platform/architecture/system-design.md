---
id: platform-architecture-system-design
title: System Design
description: Component boundaries and responsibility map
status: draft
visibility: internal
---

# System Design

This page maps major system components and their boundaries. It is a technical reference, not an operational guide.

## Top-Level Components

- **GUI host** — WPF desktop application managing user interaction, charting, and feature gating.
- **CLI host** — .NET Generic Host running strategy automation with command-line configuration.
- **Core library** — Domain logic: order tracking, indicator computation, event dispatch, history storage.
- **SDK library** — Public contract surface: interfaces, models, enums, and plugin contracts.
- **LicenseGen** — Offline RSA key generation and license signing tooling.

## Responsibility Boundaries

| Layer | Responsible For | NOT Responsible For |
|---|---|---|
| GUI/Bot host | DI wiring, credential config, UI lifecycle | Business trading logic |
| Core | Domain logic, event bus, simulation | UI rendering, credential storage |
| SDK | Public contracts, plugin isolation context | Runtime orchestration |
| Strategy plugin | Entry/exit signals, position sizing | Exchange I/O, UI |

## Key Design Constraints

- Core and SDK are the stable contraction points — host-level implementation details stay in host projects.
- Plugin assemblies are loaded in isolated AssemblyLoadContext to avoid type-identity conflicts.

## Related Docs

- [Data Flow](./data-flow.md)
- [Core vs SDK](./core-vs-sdk.md)
- [Bot Engine](./bot-engine.md)
