---
id: platform-config-input-parameters
title: Input Parameters
description: Plugin input parameter system for strategy/indicator configuration
status: draft
visibility: internal
---

# Input Parameters

## Purpose

Input parameters allow strategy and indicator plugins to declare configurable values without hardcoding them. The host resolves these from external JSON configuration.

## Storage

Each strategy DLL has a paired `<StrategyName>.json` file containing user-defined parameter values.

## Parameter Access (in plugin code)

```csharp
var period = GetParameter<int>("Period");
var multiplier = GetParameter<double>("Multiplier");
```

## Key Types

- IInputParamManager — loads and serves parameter values.
- InputParamManager — implementation with LoadFromFile(path) entry point.

## Related Docs

- [Strategy Settings](./strategy-settings.md)
- [Create Strategy Guide](../../guides/create-strategy.md)
