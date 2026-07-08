---
id: sdk-strategy-settings
title: Strategy Settings
description: Configuring trading mode, leverage, and settings
status: draft
visibility: internal
publish: false
---

# Strategy Settings

The `StrategySettings` class contains the core configuration for a strategy instance. This configuration defines the basic operating parameters of the strategy (like which symbol to trade, timeframe, and leverage) as well as the execution mode (Live, Sandbox, or Backtest).

You can access these settings in your strategy by injecting `IOptions<StrategySettings>` into the constructor.

## Structure

```csharp
using Pt.Okx.Sdk.Strategy.Settings;

public class StrategySettings
{
    // --- Environment & Mode ---
    public bool SandBox { get; set; }           // Run in OKX Demo trading environment
    public bool Backtest { get; set; }          // Run in the local Backtesting engine

    // --- Trading Parameters ---
    public string Symbol { get; set; }          // Trading symbol (e.g., "BTC-USDT-SWAP")
    public string Underlying { get; set; }      // Underlying asset (e.g., "BTC")
    public Timeframe Timeframe { get; set; }    // Base chart timeframe (e.g., Timeframe.M1, Timeframe.H1)
    public int Leverage { get; set; }           // Leverage multiplier
    public TradeMode TradeMode { get; set; }    // Isolated / Cross
    public MarginMode MarginMode { get; set; }  // Isolated / Cross
    
    // --- Simulation & Backtest Constraints ---
    public decimal Deposite { get; set; }       // Initial simulation deposit (e.g., 10000 USDT)
    public int MaxBars { get; set; }            // Max bars to keep in memory for indicator calculations
    public int WarmupBars { get; set; }         // Warmup period before strategy starts trading
    public DateTime? StartTime { get; set; }    // Backtest start bound
    public DateTime? EndTime { get; set; }      // Backtest end bound
}
```

## How to use in your Strategy

```csharp
public class MyStrategy : StrategyBase
{
    private readonly StrategySettings _settings;

    public MyStrategy(IOptions<StrategySettings> strategySettings)
    {
        _settings = strategySettings.Value;

        if (_settings.Backtest)
        {
            // Execute backtest-specific initialization logic
        }
    }

    public async Task<bool> OnInitAsync(IStrategyStateStore state, CancellationToken ct)
    {
        // Example: access the configured symbol and timeframe
        var symbol = _settings.Symbol;
        var period = _settings.Timeframe;
        
        return true;
    }
}
```

> [!NOTE]
> `StrategySettings` properties are mostly read-only during the strategy execution, as they are configured by the user via the GUI before launching the bot or starting a backtest. For dynamic configurations, you should use the `InputParameter` system.