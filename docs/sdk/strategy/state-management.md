---
sidebar_position: 7
id: sdk-strategy-state-management
title: State Management
description: Persisting state variables across runs
status: draft
visibility: internal
publish: false
---

# State Management and Persistence

State management is the most critical aspect of writing a robust trading strategy. You must ensure your strategy handles bot restarts cleanly, does not bleed state across backtest runs, and saves critical data to the disk.

## 1. Avoid Static Mutable State

> [!CAUTION]
> **Never use `static` variables to store strategy state.**

The platform can run multiple instances of your strategy simultaneously (e.g., trading different symbols on different accounts, or running massive parallel backtests). Using static variables will cause data collisions and completely break backtesting.

State must be encapsulated within dedicated service/manager classes injected via the DI container.

## 2. Using State Managers

We recommend splitting your state into dedicated managers, as demonstrated in the `Pt.Example.Stgy.UpTrend` example plugin.

- **`BotStateManager`**: Tracks the macro-state of the bot (`Idle`, `PositionOpen`, `Recovery`, `Blocked`).
- **`RiskManager`**: Tracks historical performance (win/loss streaks, drawdowns) across the session to enforce global risk rules.

Register these in your `IStrategyPlugin` implementation:

```csharp
public void Register(IServiceCollection services)
{
    services.AddSingleton<BotStateManager>();
    services.AddSingleton<RiskManager>();
    services.AddSingleton<IStrategy, MyStrategy>();
}

public void RegisterForBacktest(IServiceCollection services)
{
    // CRITICAL: Use Transient for Backtesting to ensure state is fresh on each run
    services.AddTransient<BotStateManager>();
    services.AddTransient<RiskManager>();
    services.AddTransient<IStrategy, MyStrategy>();
}
```

## 3. Storage and Persistence

For data that must survive bot restarts (like tracking consecutive losses or custom daily drawdowns), use the `IStoragePathProvider` to resolve safe directories for file I/O.

```csharp
var storage = serviceProvider.GetRequiredService<IStoragePathProvider>();

string stateDir   = storage.GetPath(StoragePathScope.State);
string logsDir    = storage.GetPath(StoragePathScope.BacktestLogs);
```

### Storage Scopes

| Scope | Description |
|---|---|
| `State` | Persistent strategy state files (e.g., `risk_state.json`) |
| `Cache` | Temporary cache files |
| `LiveLogs` | Logs and artifacts specific to a live trading session |
| `BacktestLogs` | Logs and artifacts specific to a backtest run |
| `Exports` | User-exported artifacts and reports |

### Example: Persisting Risk State

In `Pt.Example.Stgy.UpTrend`, the `RiskManager` saves its state to a JSON file whenever a trade closes. 

```csharp
var stateFile = Path.Combine(storage.GetPath(StoragePathScope.State), "risk_state.json");
var json = JsonSerializer.Serialize(_riskState);
await File.WriteAllTextAsync(stateFile, json);
```

> [!WARNING]
> **Disable File I/O during backtests.** When registering services in `RegisterForBacktest`, ensure you disable file saving (e.g., `AllowSave = false`) to prevent massive disk overhead during high-speed multi-year simulations.

## 4. Deterministic Backtesting

Backtests must be deterministic. This means running the exact same parameters over the exact same date range must yield the exact same results every single time.

**Rules for Determinism:**
- **Never rely on `DateTime.Now` or `DateTime.UtcNow`.** Always ask the client for the current time: `_client.Instrument.GetCurrentTime()`. In live trading, this returns real time; in backtesting, it returns the mocked simulation time.
- **Never use `Task.Delay` or rely on thread timings.** Time only advances when the backtest engine pumps a new tick or candle.
- **Never make live API calls inside strategy logic.** All `IOkxClient.Trade` calls are automatically intercepted by the simulation engine during backtests, but calls to external APIs will break the timeline.

## 5. Custom Telegram Commands

You can allow users to interact with your strategy remotely via Telegram. This is done by implementing `ITelegramCommandExtension` and handling `TradeAction.Custom` inside your strategy's `OnTradeCommandAsync` handler.

For a comprehensive guide, detailed explanations of built-in commands, and a step-by-step custom implementation example, please refer to the dedicated [Telegram Commands & Extensions](telegram-commands.md) article.