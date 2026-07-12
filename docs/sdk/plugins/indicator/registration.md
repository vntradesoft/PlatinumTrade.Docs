---
sidebar_position: 2
id: sdk-indicator-registration
title: Registration & Parameters
description: Registering indicators and managing input parameters
status: published
visibility: public
---

# Registration & Parameters

This section explains how to register your indicator implementations with the platform and define their configurable input parameters.

## Registering Indicators

In your `IIndicatorPlugin` implementation, the `RegisterIndicators` method is used to hook up your indicator classes. You use the `IIndicatorRegistrationContext` to define the creation logic (Factory pattern).

```csharp
using Pt.Okx.Sdk.Indicators.Plugin;

public class MyIndicatorPlugin : IIndicatorPlugin
{
    // ... metadata properties ...

    public void RegisterIndicators(IIndicatorRegistrationContext context)
    {
        // Example: Registering a Simple Moving Average (SMA)
        context.Register(
            name: "MySMA",
            creator: (factory, manager, config, options) =>
            {
                // Ensure default parameters exist in the config before creating the instance
                if (!config.Parameters.Contains("Period"))
                    config.SetParam("Period", null, 14);

                // Return the actual indicator instance
                return new CalcIndMySMA(factory, manager, config, options);
            },
            // Parameter definitions for the UI
            parameterDefs: new[]
            {
                new IndicatorParameterInfo(
                    Key: "Period",
                    DisplayName: "Moving Average Period",
                    ValueType: typeof(int),
                    DefaultValue: 14,
                    MinValue: 1,
                    MaxValue: 500)
            }
        );
    }
}
```

## Parameter Definitions

The `parameterDefs` array contains `IndicatorParameterInfo` objects. 

> [!NOTE]
> The GUI platform uses these objects to automatically generate a visual properties dialog for the user when they apply your indicator to a chart.

```csharp
public record IndicatorParameterInfo(
    string Key,           // Configuration key used to retrieve the value
    string DisplayName,   // Name displayed in the UI dialog
    Type ValueType,       // typeof(int), typeof(double), typeof(string), etc.
    object DefaultValue,  // The default fallback value
    object? MinValue,     // Optional: Minimum allowed value (for numeric types)
    object? MaxValue);    // Optional: Maximum allowed value (for numeric types)
```

## Reading Parameters in the Indicator

When your custom indicator class (inheriting from `CalcIndBase`) is instantiated, you need to read the user's parameter inputs so that your `OnCalculate` method can use them.

You do this inside your `CreateDefaultProperty()` method using `GetParameter<T>()`.

```csharp
using Pt.Okx.Sdk.Indicators.Base;
using Pt.Okx.Sdk.Indicators.Models;
using Pt.Okx.Sdk.Indicators.Services;

public class CalcIndMySMA : CalcIndBase
{
    private int _period;

    public CalcIndMySMA(
        IIndicatorFactory factory, 
        IIndicatorManager manager, 
        IndicatorConfig config, 
        Action<IndicatorProperty>? propertyOptions = null)
        : base(factory, manager, config, propertyOptions)
    {
    }

    protected override IndicatorProperty CreateDefaultProperty()
    {
        // 1. Read the parameter configured by the user (or default)
        _period = GetParameter<int>("Period");

        // 2. Return properties based on the parameter
        return new IndicatorProperty(
            name: $"MySMA({_period})",
            window: IndicatorWindow.Main, // Display on the main price chart
            buffers: 1,
            plots: 1
        )
        {
            // Set styles here...
        };
    }
}
```

> [!IMPORTANT]
> The `GetParameter<T>(key)` method is provided by the `CalcIndBase` class. It safely reads the dictionary of parameters passed down via the `IndicatorConfig`.

---

Next, proceed to **[Properties & Buffers](properties-buffers.md)** to learn how to configure visual outputs and calculation arrays.
