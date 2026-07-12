---
id: sdk-plugins
title: Plugins
sidebar_label: Plugins
sidebar_position: 4
description: Develop custom Strategy and Indicator plugins for the Platinum Trade platform.
---

# Plugins

The Platinum Trade platform uses a plugin architecture. Strategy and Indicator plugins are .NET DLLs that reference only `Pt.Okx.Sdk` and are loaded at runtime.

| Plugin Type | Description | Get Started |
|---|---|---|
| [Strategy Plugin](strategy/overview.md) | Build automated trading strategies with lifecycle management, event handling, state persistence, and Telegram integration | [Overview & Setup →](strategy/overview.md) |
| [Indicator Plugin](indicator/overview.md) | Create custom technical indicators with multi-buffer support, drawing capabilities, and parameter registration | [Overview & Setup →](indicator/overview.md) |

## Plugin Architecture

- Plugins reference **only** `Pt.Okx.Sdk` (the contracts library)
- They are loaded at runtime by the Core engine via reflection
- Each plugin registers itself through a metadata interface (`IStrategyPlugin` or `IIndicatorPlugin`)
- Plugins do not access OKX APIs directly — they use SDK abstractions
