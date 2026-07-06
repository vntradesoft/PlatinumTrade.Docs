---
id: sdk-getting-started
title: Getting Started
description: Guide on using the SDK to write indicators and strategies
status: draft
visibility: internal
publish: false
---

# Getting Started

This guide walks you through setting up a project and writing your first code with `Pt.Okx.Sdk`.

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) or later
- Visual Studio 2022 / Rider / VS Code
- NuGet access to the internal package feed (if using private NuGet)

## Create a Strategy Plugin Project

### 1. Create a Class Library

```bash
dotnet new classlib -n MyStrategy -f net10.0
cd MyStrategy
```

### 2. Reference Pt.Okx.Sdk

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

    public async Task<bool> InitializeAsync(
        IStrategyStateStore state, CancellationToken ct)
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

    public Task<bool> StopAsync(CancellationToken ct)
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
    public string RequiredSdkVersion => "1.0";
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

## Build and Run

```bash
# Build the entire solution
dotnet build PlatinumTrade.sln

# Run backtest via the Platinum Trade App
# (Launch the Platinum Trade App executable or via Visual Studio)

# Or run the console bot
dotnet run --project CliBot\CliBot.csproj -- --help
```

## Next steps

- [ApiResult Pattern](api-result.md) — How to handle errors
- [Using the Trading Client](trading-client.md) — Placing and cancelling orders
- [Strategy Plugin](strategy/overview.md) — Full details on the strategy lifecycle