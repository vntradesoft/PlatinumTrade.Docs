---
id: sdk-strategy-input-parameters
title: Input Parameters
description: Defining customizable inputs and schema attributes
status: draft
visibility: internal
publish: false
---

# InputParameter System

The platform uses an annotation-first workflow for strategy parameters.

Plugin developers define one schema class with attributes. The platform then:

1. Builds `InputParameter` metadata for GUI and JSON persistence.
2. Loads user-edited values from `<StrategyName>.json`.
3. Binds a populated typed object and injects it into the strategy through DI.

No manual dictionary construction and no manual `GetValue<T>` mapping class is required.
You do not need a per-strategy `InputParamsLoader` for normal parameter mapping.

## Supported Property Types

`InputSchemaBuilder` supports these property types in schema classes:

| Property Type | Parameter Type |
|---|---|
| `int` | `IntParameter` |
| `double`, `float` | `DoubleParameter` |
| `decimal` | `DecimalParameter` |
| `bool` | `BoolParameter` |
| `string` | `StringParameter` |
| `TimeSpan` | `TimeSpanParameter` |
| `DateTime` | `DateTimeParameter` |
| `enum` | `EnumParameter` |
| `List<string>` | `ListParameter<string>` |
| `List<int>` | `ListParameter<int>` |
| `List<decimal>` | `ListParameter<decimal>` |
| `List<double>` | `ListParameter<double>` |
| `List<float>` | `ListParameter<float>` |
| `List<bool>` | `ListParameter<bool>` |
| `List<long>` | `ListParameter<long>` |

Use `[InputParamIgnore]` for computed/runtime-only properties.

## Specialized String Data Types

For `string` properties, you can provide a type hint via `InputParam.DataType`.

Currently supported hints:

| DataType | Resulting Parameter Type | Typical Use |
|---|---|---|
| `InputParamDataType.Auto` | `StringParameter` | Generic text |
| `InputParamDataType.FilePath` | `FilePathParameter` | File path selection and path validation |

## List Parameters

### Overview

Use `List<T>` properties to store collections of primitive values. Supported element types are:
string, int, decimal, double, float, bool, long.

List parameters are serialized as comma-separated values in JSON and parsed back with full per-element validation.

### Example: Whitelist and Risk Levels

```csharp
[InputParam(
    Section = 1,
    SectionTitle = "Trading",
    Order = 1,
    Description = "Symbols to trade (comma-separated)")]
public List<string> AllowedSymbols { get; set; } = new()
{
    "BTC-USDT",
    "ETH-USDT",
    "SOL-USDT"
};

[InputParam(
    Section = 1,
    Order = 2,
    Description = "Risk-reward ratio levels")]
public List<decimal> RiskRewardRatios { get; set; } = new()
{
    1.0m,
    1.5m,
    2.0m
};

[InputParam(
    Section = 1,
    Order = 3,
    Description = "Trading session hour indices (0-23)")]
public List<int> SessionHours { get; set; } = new() { 9, 10, 14, 16, 18 };
```

### JSON Serialization

List parameters store comma-separated values in JSON:

```json
{
  "allowedSymbols": {
    "type": "list[STRING]",
    "value": ["BTC-USDT", "ETH-USDT", "SOL-USDT"],
    "range": {},
    "description": "Symbols to trade"
  },
  "riskRewardRatios": {
    "type": "list[DECIMAL]",
    "value": [1.0, 1.5, 2.0],
    "range": {},
    "description": "Risk-reward levels"
  },
  "sessionHours": {
    "type": "list[INT]",
    "value": [9, 10, 14, 16, 18],
    "range": {},
    "description": "Trading session hours"
  }
}
```

### Parsing and Validation

When loaded from JSON or edited in the UI:

1. **Comma-separated strings** are split and trimmed.
2. **Per-element parsing** uses invariant culture (e.g., "1.5" parses as `1.5m` for decimal).
3. **Type checking**: Each element must parse successfully as the target type.
4. **Error messages** indicate which element failed and why.

Example parsing for `List<decimal>`:
- `"2.5, 1.0, 3.14"` → `[2.5m, 1.0m, 3.14m]` ✅
- `"2.5, invalid"` → ❌ Error: "Cannot parse 'invalid' as decimal"

### Reading in Strategy

```csharp
public class MyStrategy : StrategyBase
{
    private readonly MyStrategyInput _input;

    public MyStrategy(MyStrategyInput input)
    {
        _input = input;
    }

    public void Execute()
    {
        foreach (var symbol in _input.AllowedSymbols)
        {
            // Trade this symbol
        }

        var selectedRatio = _input.RiskRewardRatios[0]; // 1.0m
    }
}
```



```csharp
using Pt.Okx.Sdk.Strategy.Parameters;

internal sealed class MyStrategyInput
{
    [InputParam(
        Section = 1,
        SectionTitle = "Indicators",
        Order = 1,
        Min = 1,
        Max = 500,
        Description = "Fast MA period")]
    public int FastPeriod { get; set; } = 10;

    [InputParam(
        Section = 1,
        Order = 2,
        Min = 0.1,
        Max = 10,
        Description = "Risk per trade (%)")]
    public decimal RiskPercent { get; set; } = 2.0m;

    [InputParam(
        Section = 1,
        Order = 3,
        Description = "Cooldown between entries")]
    public TimeSpan EntryCooldown { get; set; } = TimeSpan.FromMinutes(15);

    [InputParam(
        Section = 2,
        SectionTitle = "Execution",
        Order = 1,
        Description = "Enable trailing stop")]
    public bool EnableTrailing { get; set; } = true;

    [InputParam(
        Section = 2,
        Order = 2,
        DataType = InputParamDataType.FilePath,
        Description = "Path to custom indicator DLL")]
    public string CustomIndicatorDllPath { get; set; } = string.Empty;

    [InputParam(
        Section = 2,
        Order = 3,
        Description = "Whitelist trading pairs")]
    public List<string> AllowedSymbols { get; set; } = new() { "BTC-USDT", "ETH-USDT" };

    [InputParam(
        Section = 2,
        Order = 4,
        Description = "Risk-reward levels")]
    public List<decimal> RiskRewardLevels { get; set; } = new() { 0.5m, 1.0m, 2.0m };

    [InputParamIgnore]
    public List<string> RuntimeCache { get; set; } = new();
}
```

## Expose Schema Type In Plugin

```csharp
using Pt.Okx.Sdk.Strategy.Plugin;

public class MyStrategyPlugin : IStrategyPlugin, IStrategyPluginMetadata, IStrategyPluginInputSchema
{
    public Type GetInputSchemaType() => typeof(MyStrategyInput);
}
```

## Read Parameters In Strategy (DI)

Inject the typed schema class directly into your strategy:

```csharp
public class MyStrategy : StrategyBase
{
    private readonly MyStrategyInput _input;

    public MyStrategy(MyStrategyInput input)
    {
        _input = input;
    }
}
```

The injected schema object contains values only. This keeps runtime usage simple:

```csharp
var riskPercent = _input.RiskPercent;
```

If you need metadata such as `Min` / `Max`, use the typed metadata API shown below.

## Register Typed Schema For DI

Most strategies register the typed schema once in plugin DI setup:

```csharp
public void Register(IServiceCollection services)
{
    services.AddSingleton(sp =>
    {
        var manager = sp.GetRequiredService<IInputParamManager>();
        return manager.BindSchema<MyStrategyInput>();
    });

    services.AddSingleton<IStrategy, MyStrategy>();
}
```

Use runtime post-processing only for values that are intentionally not persisted as input parameters (for example, converting a file path string into a runtime object graph).

## Built-in Logging Utility

The SDK now provides a built-in logger extension for typed schema objects:

```csharp
_strategyLogger.LogInputParams(_input);
```

This logs all public readable properties except those marked with `[InputParamIgnore]`.
By default, logged keys follow the same naming behavior as schema binding:

- `Key` from `[InputParam(Key = ...)]` when provided.
- Otherwise camelCase of the property name.

## Access Metadata (Min/Max, Description, Key)

For compile-time-safe metadata access, use `InputSchemaMetadata` with a property expression:

```csharp
var metadata = InputSchemaMetadata.Get<MyStrategyInput, decimal>(x => x.RiskPercent);
var range = InputSchemaMetadata.GetRange<MyStrategyInput, decimal>(x => x.RiskPercent);

Console.WriteLine(metadata.Key);        // riskPercent
Console.WriteLine(range.Min);           // 0.1
Console.WriteLine(range.Max);           // 10
```

This is the recommended way for strategy authors to access metadata because:

- it does not require string keys
- it stays aligned with refactors/renames
- it keeps the DI schema object focused on values only
- works with all parameter types, including `ListParameter<T>`

Example with a list property:

```csharp
var metadata = InputSchemaMetadata.Get<MyStrategyInput, List<decimal>>(x => x.RiskRewardRatios);
Console.WriteLine(metadata.Description); // "Risk-reward levels"
```

### Alternative: Runtime String-Key Access

If your code is dynamic or generic, you can still access range metadata from `IInputParamManager`:

```csharp
var range = inputParamManager.GetValueRange("riskPercent");
```

Use this when you do not know the schema type at compile time.

## Optional Key Override

By default, key names are inferred from property names using camelCase.
Use `Key` when you need explicit compatibility with a different key name.

```csharp
[InputParam(Key = "maCrossoverFastPeriod", Description = "Fast MA")]
public int MACrossoverFastPeriod { get; set; } = 10;
```

## Validation Behavior

Validation is strict and fail-fast:

1. Duplicate keys in schema raise startup/configuration errors.
2. Unsupported property types raise startup/configuration errors.
3. Invalid persisted values are constrained by `InputParameter` validation rules.

`FilePathParameter` also validates path format (empty is allowed).

## JSON Type Names

Generated/serialized parameter type names now include:

- `decimal`
- `timespan`
- `filepath`
- `list[STRING]`, `list[INT]`, `list[DECIMAL]`, `list[DOUBLE]`, `list[FLOAT]`, `list[BOOL]`, `list[LONG]`

## Notes

`IInputParamManager.GetValue<T>()` still exists in runtime infrastructure and can be used where necessary, but the recommended strategy authoring path is typed DI from annotated schema classes.