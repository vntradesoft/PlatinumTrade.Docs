---
id: sdk-inst-basic-info
title: Basic Info
sidebar_label: Basic Info
---
# Basic Info

## `InstrumentType`
Gets the type of trading instrument handled by this client.

**Syntax**

```csharp
InstrumentType InstrumentType { get; }
```

**Parameters**

None.

**Return Value**

The `InstrumentType` enum value (e.g., Futures, Spot).

**Remarks**

Useful when sharing common logic across different bot instances.

**Example**

```csharp
if (Context.Instrument.InstrumentType == InstrumentType.Spot)
{
    // Handle spot specific logic
}
```

---

## `IsSymbol`
Checks if the specified symbol is a valid and tracked trading symbol.

**Syntax**

```csharp
bool IsSymbol(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol to check. |

**Return Value**

`true` if valid and tracked; otherwise `false`.

**Remarks**

Use this before making order requests on dynamic symbols.

**Example**

```csharp
if (Context.Instrument.IsSymbol("BTC-USDT-SWAP"))
{
    // Valid symbol
}
```

---

## `TotalSymbols`
Gets the total number of trading symbols currently tracked by the bot.

**Syntax**

```csharp
int TotalSymbols();
```

**Parameters**

None.

**Return Value**

The integer count of tracked symbols.

**Remarks**

Usually 1 for single-pair bots, or multiple for multi-pair bots.

**Example**

```csharp
int count = Context.Instrument.TotalSymbols();
Context.Logger.LogInformation("Symbols", $"Tracking {count} pairs");
```

---

## `QuoteAsset`
Gets the quote asset for the specified symbol.

**Syntax**

```csharp
string QuoteAsset(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |

**Return Value**

The quote asset string (e.g., "USDT").

**Remarks**

For BTC-USDT, the quote asset is USDT.

**Example**

```csharp
string quote = Context.Instrument.QuoteAsset("BTC-USDT");
```

---

## `BaseAsset`
Gets the base asset for the specified symbol.

**Syntax**

```csharp
string BaseAsset(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |

**Return Value**

The base asset string (e.g., "BTC").

**Remarks**

For BTC-USDT, the base asset is BTC.

**Example**

```csharp
string baseAsset = Context.Instrument.BaseAsset("BTC-USDT");
```

---

## `Underlying`
Gets the underlying asset index for the specified derivatives symbol.

**Syntax**

```csharp
string Underlying(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |

**Return Value**

The underlying asset string.

**Remarks**

Useful for futures and options trading.

**Example**

```csharp
string underlying = Context.Instrument.Underlying("BTC-USDT-SWAP");
```

---
