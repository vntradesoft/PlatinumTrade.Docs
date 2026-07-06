---
id: sdk-indicator-plugin
title: Indicator Plugin
description: Developing custom indicator plugins
status: draft
visibility: internal
publish: false
---

# Custom Indicator Plugin

This guide explains how to create a custom technical indicator plugin for the Platinum Trading Platform (supporting OKX exchange futures & swaps). A plugin is an independent DLL that can be loaded into the GUI or Bot without recompiling the core.

## Overview

The indicator plugin system relies on three main components:

| Interface | Role |
|---|---|
| `IIndicatorPlugin` | Entry point — defines plugin metadata and registers indicators |
| `IIndicatorRegistrationContext` | Context used to register indicator factory methods |
| `CalcIndBase` | Base class for custom indicator calculation logic |

## Step 1: Create the Project

```bash
dotnet new classlib -n MyIndicators -f net10.0
```

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
</Project>
```

## Step 2: Implement the Plugin Entry Point

```csharp
using Pt.Okx.Sdk.Indicators.Plugin;

public class MyIndicatorPlugin : IIndicatorPlugin
{
    // Metadata
    public string Name => "My Custom Indicators";
    public string PluginVersion => "1.0.0";
    public string RequiredSdkVersion => "1.0.0";
    public string Description => "Custom Momentum & Signal indicators";
    public string Author => "John Doe";

    // Register all indicators
    public void RegisterIndicators(IIndicatorRegistrationContext context)
    {
        context.Register(
            "MyMomentum",
            (factory, manager, config, options) =>
            {
                // Set default parameters
                if (!config.Parameters.Contains("Period"))
                    config.SetParam("Period", null, 14);

                return new CalcIndMyMomentum(factory, manager, config, options);
            },
            // Parameter metadata used by the GUI input dialog
            [
                new IndicatorParameterInfo(
                    Key: "Period",
                    DisplayName: "Period",
                    ValueType: typeof(int),
                    DefaultValue: 14,
                    MinValue: 1,
                    MaxValue: 500)
            ]);
    }
}
```

### IndicatorParameterInfo

The GUI uses this parameter metadata to automatically generate the configuration dialog:

```csharp
public record IndicatorParameterInfo(
    string Key,           // Configuration key
    string DisplayName,   // Name displayed in the UI
    Type ValueType,       // int, double, string, etc.
    object DefaultValue,  // Default value
    object? MinValue,     // Minimum limit for numeric types
    object? MaxValue);    // Maximum limit for numeric types
```

## Step 3: Implement Indicator Logic

Inherit from `CalcIndBase` and override the required methods:

```csharp
using Pt.Okx.Sdk.Indicators.Base;
using Pt.Okx.Sdk.Indicators.Enums;
using Pt.Okx.Sdk.Indicators.Models;
using Pt.Okx.Sdk.Indicators.Services;

public interface IIndicatorMyMomentum : IIndicator
{
    IndicatorValue FindROC(int index = 0);
    bool IsBullish();
    bool IsBearish();
}

public class CalcIndMyMomentum : CalcIndBase, IIndicatorMyMomentum
{
    private IIndicatorBuffer? _rocBuffer;
    private int _period;

    public CalcIndMyMomentum(
        IIndicatorFactory factory,
        IIndicatorManager manager,
        IndicatorConfig config,
        Action<IndicatorProperty>? propertyOptions = null)
        : base(factory, manager, config, propertyOptions)
    {
    }

    // ① Define indicator properties (buffers, display settings)
    protected override IndicatorProperty CreateDefaultProperty()
    {
        _period = GetParameter<int>("Period");

        return new IndicatorProperty(
            name: $"MyMomentum({_period})",
            window: IndicatorWindow.Separate,  // Display in a separate panel
            buffers: 1,
            plots: 1
        )
        {
            Labels = new Dictionary<int, IndicatorLabel>
            {
                {
                    0, new IndicatorLabel
                    {
                        Label = "ROC",
                        Type = IndicatorDrawType.Histogram,
                        Color = IndicatorColor.Green,
                        Style = IndicatorStyle.Solid,
                        Width = 2.0
                    }
                }
            },
            SpecialFeatures = new IndicatorSpecialFeatures
            {
                ShowZeroLine = true,
                ZeroLineColor = IndicatorColor.Gray,
                ZeroLineWidth = 1.0
            }
        };
    }

    // ② Initialize buffers
    public override bool OnInit()
    {
        base.OnInit();
        SetBuffer(0, IndicatorBufferType.Data);
        _rocBuffer = GetBuffer(0);
        return true;
    }

    // ③ Calculate values — called on every new candle
    public override int OnCalculate(
        in int ratesTotal,
        in int prevCalculated,
        in DateTime[] datetime,
        in double[] opens,
        in double[] highs,
        in double[] lows,
        in double[] closes,
        in double[] volumes,
        in double spreads)
    {
        if (_period <= 0 || ratesTotal <= _period)
            return 0;

        _rocBuffer ??= GetBuffer(0);
        if (_rocBuffer == null) return 0;

        var start = Math.Max(prevCalculated - 1, _period);

        for (var i = start; i < ratesTotal; i++)
        {
            var current = GetSourceValue(0, i, datetime[i],
                opens, highs, lows, closes);
            var previous = GetSourceValue(0, i - _period,
                datetime[i - _period], opens, highs, lows, closes);

            if (current.IsEmpty || previous.IsEmpty)
            {
                _rocBuffer.MarkEmpty(i, datetime[i]);
                continue;
            }

            var roc = previous.Value != 0
                ? ((current.Value - previous.Value) / previous.Value) * 100
                : 0;

            _rocBuffer.ForceAdd(i, datetime[i], roc);
        }

        return ratesTotal;
    }

    // ④ Public API methods
    public IndicatorValue FindROC(int index = 0)
    {
        _rocBuffer ??= GetBuffer(0);
        return _rocBuffer!.FindAtOrBeforeCurrent(index);
    }

    public bool IsBullish()
    {
        var v = FindROC();
        return !v.IsEmpty && v.Value > 0;
    }

    public bool IsBearish()
    {
        var v = FindROC();
        return !v.IsEmpty && v.Value < 0;
    }
}
```

## Key Concepts

### IndicatorWindow

| Value | Description |
|---|---|
| `IndicatorWindow.Main` | Overlay on the main price chart (e.g., MA, Bollinger Bands) |
| `IndicatorWindow.Separate` | Display in a separate panel below the chart (e.g., RSI, MACD) |

### IndicatorDrawType

| Value | Description |
|---|---|
| `Line` | Continuous line |
| `Histogram` | Histogram bars |
| `Arrow` | Arrow markers at specific points |
| `Section` | Discontinuous line segments |
| `None` | Do not draw (hidden buffer used for calculation) |

### Buffer Types

| Type | Description |
|---|---|
| `IndicatorBufferType.Data` | Buffer containing data to be drawn on the chart |
| `IndicatorBufferType.Calculation` | Temporary buffer used for intermediate calculations (not drawn) |

### SpecialFeatures

The `SpecialFeatures` object provides advanced visual customizations like zero lines and bound fills.

```csharp
SpecialFeatures = new IndicatorSpecialFeatures
{
    ShowZeroLine = true,
    ZeroLineColor = IndicatorColor.Gray,
    ZeroLineWidth = 1.0,

    // Bound lines (e.g., RSI 30/70 thresholds)
    BoundLines = new[]
    {
        new BoundLine { Value = 70, Color = IndicatorColor.Red },
        new BoundLine { Value = 30, Color = IndicatorColor.Green }
    },

    // Background fill between two bound lines
    BoundFill = new BoundFill
    {
        UpperBound = 70,
        LowerBound = 30,
        FillColor = IndicatorColor.LightBlue,
        FillOpacity = 0.2
    }
};
```

## OnCalculate — Deep Dive

### Incremental Calculation

`OnCalculate` is called every time a new candle arrives. The `prevCalculated` parameter tells you how many bars have already been computed:

```csharp
// First call:  ratesTotal = 500, prevCalculated = 0
// Second call: ratesTotal = 501, prevCalculated = 500
// → You only need to compute bar 500 (the newest one)

var start = Math.Max(prevCalculated - 1, _period);
// prevCalculated - 1 because the last bar might not have closed yet
```

### GetSourceValue

Use `GetSourceValue` to extract the correct source price (close / open / high / low) from the OHLCV arrays, respecting the user's configuration:

```csharp
var value = GetSourceValue(
    bufferIndex: 0,    // Buffer number
    barIndex: i,       // Bar index
    time: datetime[i], // Timestamp
    opens, highs, lows, closes);

if (value.IsEmpty)
    _buffer.MarkEmpty(i, datetime[i]); // Mark as empty if missing
else
    _buffer.ForceAdd(i, datetime[i], calculatedValue);
```

## Loading the Plugin

### From the GUI

Navigate to: **Insert > Indicators > Custom > Load Custom Indicator...**

### Programmatically

```csharp
IIndicatorPluginLoader loader = ...; // Injected via DI

// Load a specific DLL
var plugin = loader.LoadPlugin("path/to/MyIndicators.dll");

// Load all DLLs in the plugins directory
loader.LoadAll();

// Inspect loaded plugins
foreach (var p in loader.LoadedPlugins)
{
    Console.WriteLine($"{p.Metadata.Name} v{p.Metadata.PluginVersion}");
}
```

## Best Practices

> [!TIP]
> - **Indicators must be incremental** — only compute new bars; never recalculate the entire history.
> - **Indicators must be resettable** — they should support being cleared and recalculated from scratch (required for backtesting).
> - **Avoid allocations in OnCalculate** — this is a hot path called on every tick/candle. Do not instantiate new objects here.
> - **Use `MarkEmpty`** — explicitly mark bars with insufficient data as empty rather than assigning them a value of `0`.

> [!WARNING]
> **Never use static mutable state** in an indicator class. Every indicator instance must be completely isolated.

## See also

- [CalcIndBase](xref:Pt.Okx.Sdk.Indicators.Base.CalcIndBase) API Reference
- [IIndicatorPlugin](xref:Pt.Okx.Sdk.Indicators.Plugin.IIndicatorPlugin) API Reference
- [Market Data & Indicators](market-data.md) — Using built-in indicators
- [Okx.IndicatorExample](https://github.com) — Full source code for the example plugin