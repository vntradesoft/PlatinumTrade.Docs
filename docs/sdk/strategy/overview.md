---
id: sdk-strategy-overview
title: Strategy Overview
description: Lifecycle, interfaces, and architecture of trading strategies
status: draft
visibility: internal
publish: false
---

# Strategy Plugin: Overview & Lifecycle

This guide explains the foundation of creating a trading strategy plugin for the Platinum Trading Platform. The plugin system is designed to allow the exact same strategy code to run seamlessly in both **Backtest** (GUI) and **Live Trading** (Bot) environments without modification.

## IStrategy — The Core Lifecycle

Every strategy must implement the `IStrategy` interface. This interface defines three core lifecycle methods:

```csharp
public interface IStrategy
{
    // ① Initialization — called once when the bot starts
    Task<bool> InitializeAsync(IStrategyStateStore state, CancellationToken ct);

    // ② Main loop — called whenever a market or system event occurs
    Task RunAsync(StrategyEventType eventType, IStrategyStateStore state, CancellationToken ct);

    // ③ Cleanup — called once when the bot stops
    Task<bool> StopAsync(CancellationToken ct);
}
```

### Lifecycle Flow

The execution flow of a strategy follows this pattern:

```text
Bot Start
  │
  ├── InitializeAsync()     ← Setup indicators, load configuration, recover state
  │
  ├── RunAsync(Kline)       ← Fired on each new candle
  ├── RunAsync(Tick)         ← Fired on each price tick update
  ├── RunAsync(Order)        ← Order status update (filled, cancelled, etc.)
  ├── RunAsync(Position)     ← Position update
  ├── RunAsync(Balance)      ← Account balance change
  ├── RunAsync(AlgoOrder)    ← Algo order triggered or cancelled
  ├── RunAsync(Transaction)  ← Trade fill event
  ├── RunAsync(TradeCommand) ← Telegram command received
  │   ... (repeats) ...
  │
  └── StopAsync()            ← Cleanup, cancel pending orders, close positions (optional)
```

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