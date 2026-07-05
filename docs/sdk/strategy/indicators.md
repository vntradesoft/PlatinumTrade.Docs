---
id: sdk-strategy-indicators
title: Strategy Indicators
description: Registering and consuming technical indicators in strategies
status: draft
visibility: internal
publish: false
---

# Using Indicators

A robust strategy often relies on technical indicators. The `Pt.Okx.Sdk` provides a wide variety of built-in indicators and supports loading custom indicators developed via the [Indicator Plugin](../indicator-plugin.md) architecture.

## 1. Using Built-in Indicators

To use built-in indicators, you call the `CreateIndicator...` methods from `_client.Timeseries` during your strategy's `InitializeAsync` phase.

When you create an indicator this way, the platform automatically registers it. As new candles or ticks arrive, the platform automatically feeds the data into the indicator, updating its values. Furthermore, any indicators created here are **automatically rendered on the GUI Chart**.

### Initialization Example

```csharp
public class MyStrategy : IStrategy
{
    private readonly IOkxClient _client;
    
    // Keep a reference to read values later
    private IIndicatorSuperTrend _superTrend;
    private IIndicatorATR _atr;

    public MyStrategy(IOkxClient client)
    {
        _client = client;
    }

    public async Task<bool> InitializeAsync(IStrategyStateStore state, CancellationToken ct)
    {
        // 1. Create a SuperTrend indicator
        _superTrend = _client.Timeseries.CreateIndicatorSuperTrend(
            indicatorAlias: "SuperTrendMain", // Unique name for the chart
            timeframe: Timeframe.M15,
            period: 14,
            multiplier: 3.0,
            propertyOptions: (o) => 
            { 
                o.Labels[0].Width = 1.5; 
                o.Labels[0].Color = IndicatorColor.DarkRed; 
            });

        // 2. Create an ATR indicator (hidden from chart)
        _atr = _client.Timeseries.CreateIndicatorATR(
             indicatorAlias: "ATRStoploss",
             period: 14,
             method: MaMethod.EMA,
             propertyOptions: o => { o.IsVisible = false; }); // Hide from GUI

        return true;
    }
}
```

### Reading Values in RunAsync

Once initialized, the indicators automatically stay up-to-date. You simply read their properties when a new candle closes.

```csharp
public async Task RunAsync(StrategyEventType eventType, IStrategyStateStore state, CancellationToken ct)
{
    if (eventType == StrategyEventType.Kline)
    {
        // Read the latest calculated value
        var currentTrend = _superTrend.Trend;
        var currentAtr = _atr.Value;

        if (currentTrend == SuperTrendDirection.Up)
        {
            // Trigger Long Logic...
        }
    }
}
```

## 2. Loading Custom Indicators from Plugins

If you have developed custom indicators compiled into an external `.dll` (as explained in the [Custom Indicator Plugin](../indicator-plugin.md) documentation), you can dynamically load them into your strategy.

### Injecting Required Services

To load plugins, your strategy needs `IIndicatorPluginLoader` and `IIndicatorFactory`. Inject them via the constructor.

```csharp
public class MyStrategy : IStrategy
{
    private readonly IOkxClient _client;
    private readonly IIndicatorPluginLoader _indicatorPluginLoader;
    private readonly IIndicatorFactory _indicatorFactory;
    private readonly IStrategyLogger _logger;

    public MyStrategy(
        IOkxClient client,
        IIndicatorPluginLoader indicatorPluginLoader,
        IIndicatorFactory indicatorFactory,
        IStrategyLogger logger)
    {
        _client = client;
        _indicatorPluginLoader = indicatorPluginLoader;
        _indicatorFactory = indicatorFactory;
        _logger = logger;
    }
    
    // ...
}
```

### Loading the Plugin DLL

During `InitializeAsync`, you first tell the `IIndicatorPluginLoader` to scan and load the DLL containing your custom indicators.

```csharp
public async Task<bool> InitializeAsync(IStrategyStateStore state, CancellationToken ct)
{
    // Path to the DLL (usually configured via InputParameters)
    string dllPath = @"C:\Trading\Plugins\MyCustomIndicators.dll";
    
    // 1. Load the DLL
    _indicatorPluginLoader.LoadAll(dllPath);

    // Optional: Log loaded plugins for debugging
    foreach (var p in _indicatorPluginLoader.LoadedPlugins)
    {
        _logger.LogInformation("Init", 
            $"Loaded plugin: {p.Name} v{p.Version} — indicators: [{string.Join(", ", p.IndicatorNames)}]");
    }
    
    // 2. Initialize the indicators
    InitializeCustomIndicators();

    return true;
}
```

### Initializing Custom Indicators

Once the DLL is loaded, the custom indicators are registered with the `IIndicatorFactory`. You can now create them on the chart using `_client.Timeseries.CreateCustomIndicator`.

```csharp
private void InitializeCustomIndicators()
{
    // Check if the plugin successfully registered "MACrossover"
    if (_indicatorFactory.IsCustomRegistered("MACrossover"))
    {
        _client.Timeseries.CreateCustomIndicator(
            customName: "MACrossover",       // The exact name registered by the plugin
            indicatorAlias: "MACrossover",   // Name displayed on the chart
            parameters: new Dictionary<string, object>
            {
                // Pass dynamic parameters to the custom indicator
                ["FastPeriod"] = 10,
                ["SlowPeriod"] = 20,
            },
            propertyOptions: o => 
            { 
                o.Labels[0].Width = 1.5; 
                o.Labels[1].Width = 1.5; 
            });
    }
}
```

> [!TIP]
> **Why `CreateCustomIndicator`?**
> Even if your strategy doesn't explicitly read the output of a custom indicator in code, calling `CreateCustomIndicator` ensures that the indicator is drawn on the GUI chart, providing visual context during backtesting.