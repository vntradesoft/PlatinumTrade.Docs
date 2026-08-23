---
sidebar_position: 3
id: sdk-getting-started
title: Getting Started
description: Guide on using the SDK to write indicators and strategies
---

# Getting Started

This guide walks you through setting up a project and writing your first code with `Pt.Okx.Sdk`.

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) or later
- Visual Studio 2022 / Rider / VS Code
- NuGet access to the internal package feed (if using private NuGet)

## Create a Strategy Plugin Project

### 1. Install the dotnet templates (Recommended)

The quickest way to scaffold a new plugin project is via the official dotnet templates. Install once from the NuGet package, or directly from source if you cloned the repository:

```bash
# From the cloned repository root:
dotnet new install ./templates/StrategyTemplate
dotnet new install ./templates/IndicatorTemplate
```

Then scaffold a new project in seconds:

```bash
# Strategy plugin
dotnet new pt-strategy -n MyTradingStrategy

# Indicator plugin
dotnet new pt-indicator -n MyCustomIndicators
```

The generated project already includes:
- Correct `.csproj` referencing `Pt.Okx.Sdk`
- Stub implementations of `IStrategyPlugin`, `IStrategyImpl`, and `IStrategyInput` (or `IIndicatorPlugin` / `CalcIndBase`)
- `Properties/launchSettings.json` with ready-to-use **live** and **backtest** launch profiles pointing to the installed `PlatinumTrade.exe`

Open the project in Visual Studio, select the **live** or **backtest** profile from the run dropdown, and press **F5** to launch PlatinumTrade in the corresponding mode.

### 2. Reference Pt.Okx.Sdk (manual alternative)

Add a project reference to `Pt.Okx.Sdk`:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="..\Pt.Okx.Sdk\Pt.Okx.Sdk.csproj" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.DependencyInjection.Abstractions" />
  </ItemGroup>
</Project>
```

### 3. Implement IStrategy

```csharp
using Pt.Okx.Sdk.Strategy;
using Pt.Okx.Sdk.Strategy.Events;

public class MyStrategy : IStrategy
{
    private readonly IOkxClient _client;
    private readonly IStrategyLogger _logger;

    public MyStrategy(IOkxClient client, IStrategyLogger logger)
    {
        _client = client;
        _logger = logger;
    }

    public async Task<bool> OnInitAsync(IStrategyStateStore state, CancellationToken ct)
    {
        _logger.LogInformation("Init", "Strategy initialized");
        return true;
    }

    public async Task RunAsync(
        StrategyEventType eventType,
        IStrategyStateStore state,
        CancellationToken ct)
    {
        if (eventType == StrategyEventType.Kline)
        {
            var candle = await _client.Timeseries
                .GetCurrentCandleAsync(ct: ct);
            _logger.LogDebug("Tick",
                "Price: {Price}", candle.Close);
        }
    }

    public Task<bool> OnStopAsync(CancellationToken ct)
    {
        _logger.LogInformation("Stop", "Strategy stopped");
        return Task.FromResult(true);
    }
}
```

### 4. Register the Plugin

```csharp
using Microsoft.Extensions.DependencyInjection;
using Pt.Okx.Sdk.Strategy;
using Pt.Okx.Sdk.Strategy.Plugin;

public class MyStrategyPlugin : IStrategyPlugin, IStrategyPluginMetadata
{
    public string Name => "MyStrategy";
    public string PluginVersion => "1.0";
    public string Author => "Your Name";
    public string Description => "My custom strategy implementation.";

    public void Register(IServiceCollection services)
    {
        services.AddSingleton<IStrategy, MyStrategy>();
    }

    public void RegisterForBacktest(IServiceCollection services)
    {
        services.AddTransient<IStrategy, MyStrategy>();
    }
}
```

Compatibility is auto-detected by the host from the referenced `Pt.Okx.Sdk` version in your plugin assembly.

> [!NOTE]
> Live trading uses `AddSingleton` (a single instance throughout the lifetime). Backtesting uses `AddTransient` (a fresh instance for every run).

## IOkxClient — Entry Point

`IOkxClient` is the aggregator interface providing access to four sub-clients:

```csharp
public interface IOkxClient
{
    ITimeSeriesClient Timeseries { get; init; }  // OHLCV, indicators
    IInstrumentClient Instrument { get; init; }  // Trading pair info
    IAccountClient Account { get; init; }        // Balances, leverage
    ITradeClient Trade { get; init; }            // Orders, positions
}
```

Strategies receive `IOkxClient` via constructor injection and use the sub-clients:

```csharp
// Read candle data
var candle = await _client.Timeseries.GetLastClosedCandle();

// Check balance
var balance = _client.Account.AvailableBalance;

// Place an order
var result = await _client.Trade.PlaceOrderAsync(
    symbol: "BTC-USDT",
    side: OrderSide.Buy,
    type: OrderType.Market,
    quantity: 0.01m);
```

## Running your Strategy

To run or backtest your compiled strategy, load its `.dll` file directly into the **Platinum Trade App** GUI:

1. Build your strategy project to output the compiled DLL assembly.
2. Refer to the [GUI Strategy Configuration Guide](../../products/gui/strategy-config.md) for step-by-step instructions on loading the DLL, adjusting custom parameters, and running it in Live/Backtest mode.

## Next steps

- [Debugging Guide](debugging.md) — How to debug your strategy with live breakpoints
- [ApiResult Pattern](api-result.md) — How to handle errors
- [Using the Trading Client](trading-client.md) — Placing and cancelling orders
- [Strategy Plugin](../plugins/strategy/overview.md) — Full details on the strategy lifecycle