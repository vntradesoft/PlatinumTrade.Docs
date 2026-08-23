---
sidebar_position: 99
id: sdk-document-history
title: Document History
description: Version and modification history of the Platinum Trade SDK and Examples
---

# Document History

This page tracks significant changes, contract updates, and new features made strictly to the **Platinum Trade SDK** (`Pt.Okx.Sdk`), public API abstractions, and **Examples / Project Templates**.

---

### [0.12.0-beta.1] - 2026-08-21

#### Features & Contracts
- **sdk:** Refine plugin metadata contracts (`IStrategyPluginMetadata`, `InputParamAttribute`), compatibility checks, and parameter serialization.
- **sdk:** Add deep copy functionality to indicator models and property collections (`IndicatorProperty`).

#### Examples & Templates
- **examples:** Update UpTrend strategy sample (`Pt.Example.Stgy.UpTrend`) and indicator examples.
- **templates:** Update `dotnet new` project templates (`Pt.Templates.Strategy`, `Pt.Templates.Indicator`) targeting .NET 10.0.

---

### [0.11.0-beta.1] - 2026-07-20

#### Contracts
- **sdk:** Sync public SDK contracts and NuGet package metadata with platform release v0.11.0-beta.1.

---

### [0.10.0-beta.1] - 2026-07-19

#### Contracts & Indicators
- **sdk:** Add calculation mode support and optimize indicator buffer contracts for open candle updates.

---

### [0.9.3-beta.4] - 2026-07-15

#### Features
- **sdk:** Sync `Pt.Okx.Sdk` package references and update API mapping annotations for sub-clients (`IAccountClient`, `IInstrumentClient`, `ITradeClient`).

---

### [0.9.3-beta.3] - 2026-07-09

#### Contracts
- **sdk:** Sync SDK version with platform release v0.9.3-beta.3.

---

### [0.9.3-beta.2] - 2026-07-08

#### Dependencies
- **sdk:** Upgrade underlying `JK.OKX.Net` to 5.0.2 in SDK client adapters.

---

### [0.9.3-beta.1] - 2026-07-08

#### Dependencies
- **sdk:** Upgrade `Telegram.Bot` to 22.10.1.1 for strategy Telegram event notifications.

---

### [0.9.0-beta.5] - 2026-07-08

#### Contracts & Lifecycle
- **sdk:** Standardize strategy lifecycle method contracts (`OnInitAsync`, `OnStopAsync`).
- **examples:** Rename example projects to `Pt.Examples.Indicator` and `Pt.Example.Stgy.UpTrend`.

---

### [0.9.0-beta.4] - 2026-07-08

#### Contracts
- **sdk:** Sync SDK contracts with App version v0.9.0-beta.4.

---

### [0.9.0-beta.3] - 2026-07-08

#### Templates & Lifecycle
- **templates:** Add `dotnet new` project templates for strategy and indicator plugins (`Pt.Templates.Strategy`, `Pt.Templates.Indicator`).
- **strategy:** Refactor strategy lifecycle contracts from `InitializeAsync`/`StopAsync` to `OnInitAsync`/`OnStopAsync`.

---

### [0.9.0-beta.2] - 2026-07-06

#### Contracts
- **sdk:** Update abstractions for strategy interfaces, indicator plugins, and backtest contracts.

---

### [0.9.0-beta.1] - 2026-07-05

#### Initial Beta Release
- **sdk:** Initial Beta Release of `Pt.Okx.Sdk` NuGet package.
- **contracts:** Public contract surface for developing custom trading strategies (`StrategyBase`) and technical indicators (`IndicatorBase`).
- **examples:** Initial demonstration samples for strategy and indicator plugin development.