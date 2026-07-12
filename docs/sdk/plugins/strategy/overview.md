---
sidebar_position: 1
id: sdk-strategy-overview
title: Strategy Overview
description: Lifecycle, interfaces, and architecture of trading strategies
status: draft
visibility: internal
publish: false
---

# Strategy Plugin: Overview & Setup

This guide explains the foundation of creating a trading strategy plugin for the Platinum Trading Platform. The plugin system is designed to allow the exact same strategy code to run seamlessly in both **Backtest** (GUI) and **Live Trading** (Bot) environments without modification.

## Step 1: Create the Project

A custom strategy is compiled as a standalone `.dll` file using a standard .NET 10 Class Library.

1. Open your terminal and create a new class library:
   ```bash
   dotnet new classlib -n MyStrategy -f net10.0
   ```
2. Add a project reference to the SDK (`Pt.Okx.Sdk.csproj`) or install the NuGet package if you are developing outside the main repository.
3. Your `.csproj` should look like this:
   ```xml
   <Project Sdk="Microsoft.NET.Sdk">
     <PropertyGroup>
       <TargetFramework>net10.0</TargetFramework>
       <ImplicitUsings>enable</ImplicitUsings>
       <Nullable>enable</Nullable>
     </PropertyGroup>

     <ItemGroup>
       <ProjectReference Include="..\Pt.Okx.Sdk\Pt.Okx.Sdk.csproj" />
     </ItemGroup>
   </Project>
   ```

## IStrategy — The Core Lifecycle

Every strategy follows the `IStrategy` lifecycle. For most cases, inherit from `StrategyBase` and override only the handlers you need.

```csharp
public interface IStrategy
{
    // ① Initialization — called once when the bot starts
    Task<bool> OnInitAsync(IStrategyStateStore state, CancellationToken ct);

    // ② Market cadence callback — called on each market update
    Task OnTickAsync(TickPhase tickPhase, CancellationToken ct);

    // ③ Cleanup — called once when the bot stops
    Task<bool> OnStopAsync(CancellationToken ct);
}
```

The recommended base class also exposes optional event handlers:

- `OnOrderAsync(...)`
- `OnAlgoOrderAsync(...)`
- `OnPositionAsync(...)`
- `OnTransactionAsync(...)`
- `OnBalanceAsync(...)`
- `OnTradeCommandAsync(...)`

The host engine dispatches internal events to these handlers.

### Lifecycle Flow

The execution flow of a strategy follows this pattern:

```text
Bot Start
  │
  ├── OnInitAsync()         ← Setup indicators, load configuration, recover state
  │
    ├── OnTickAsync(Tick)           ← Intra-bar update
    ├── OnTickAsync(BarClose)       ← Candle close update
    ├── OnOrderAsync(...)           ← Order status update
    ├── OnPositionAsync(...)        ← Position update
    ├── OnBalanceAsync(...)         ← Account balance change
    ├── OnAlgoOrderAsync(...)       ← Algo order update
    ├── OnTransactionAsync(...)     ← Trade fill event
    ├── OnTradeCommandAsync(...)    ← Telegram/UI command
  │   ... (repeats) ...
  │
  └── OnStopAsync()          ← Cleanup, cancel pending orders, close positions (optional)
```

## State Ownership

- Runtime state is maintained internally by the host engine.
- Strategies should treat state as infrastructure concern, not as the primary public callback input.
- Use `TickPhase` to distinguish intra-bar vs bar-close logic in `OnTickAsync`.

## IStrategyPlugin — DI Registration

To make your strategy discoverable by the platform, you must provide an entry point that implements `IStrategyPlugin` and `IStrategyPluginMetadata`. This entry point registers your strategy and its dependencies into the **Dependency Injection (DI)** container.

```csharp
using Microsoft.Extensions.DependencyInjection;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Strategy;
using Pt.Okx.Sdk.Strategy.Plugin;

public class MyStrategyPlugin : IStrategyPlugin, IStrategyPluginMetadata
{
    // --- Metadata ---
    public string Name => "MyStrategy";
    public string PluginVersion => "1.0.0";
    public string RequiredSdkVersion => "1.0";
    public string Author => "Your Name";
    public string Description => "A description of the strategy.";

    // Optional: customize which log levels appear in the UI
    public IReadOnlyList<PtLogLevel>? PluginDisplayLogLevels => new[]
    {
        PtLogLevel.Debug,
        PtLogLevel.Information,
        PtLogLevel.Warning,
        PtLogLevel.Error,
        PtLogLevel.Critical
    };

    // Optional: customize which log levels trigger external notifications (e.g. Telegram)
    public IReadOnlyList<PtLogLevel>? PluginNotifyLevels => new[]
    {
        PtLogLevel.Warning,
        PtLogLevel.Error,
        PtLogLevel.Critical,
        PtLogLevel.Success
    };

    // --- Live Trading Registration ---
    public void Register(IServiceCollection services)
    {
        // Live trading — use singletons
        services.AddSingleton<IStrategy, MyStrategy>();
        services.AddSingleton<MyRiskManager>();
    }

    // --- Backtesting Registration ---
    public void RegisterForBacktest(IServiceCollection services)
    {
        // Backtest — use transients (a fresh instance is created for every run)
        services.AddTransient<IStrategy, MyStrategy>();
        services.AddTransient<MyRiskManager>();
    }
}
```

> [!IMPORTANT]
> **Live vs Backtest lifetimes:**
> - **Live (`Register`)**: Use `AddSingleton`. In live trading, the bot runs continuously and the strategy instance must persist across events.
> - **Backtest (`RegisterForBacktest`)**: Use `AddTransient`. During backtesting or optimizations, the engine might run multiple simulations sequentially or in parallel. Transients guarantee that a fresh strategy instance (and state) is created for each simulation run, preventing state leakage between runs.