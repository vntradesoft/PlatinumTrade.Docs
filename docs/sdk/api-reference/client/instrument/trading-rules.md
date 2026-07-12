---
id: sdk-inst-trading-rules
title: Trading Rules
sidebar_label: Trading Rules
---
# Trading Rules

## `NormalizePrice`
Normalizes a price according to exchange tick sizes and precision rules.

**Syntax**

```csharp
decimal NormalizePrice(string symbol, decimal price, bool roundUp = false);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |
| `price` | [`decimal`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The raw price. |
| `roundUp` | [`bool`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | True to round up to nearest tick; false to round down. |

**Return Value**

The normalized price.

**Remarks**

Always use this before placing a limit order to prevent precision errors.

**Example**

```csharp
decimal rawTarget = 65123.4567m;
decimal validPrice = Context.Instrument.NormalizePrice("BTC-USDT", rawTarget);
// validPrice might be 65123.4m
```

---

## `NormalizeLot`
Normalizes a lot size (quantity) according to exchange rules.

**Syntax**

```csharp
decimal NormalizeLot(string symbol, decimal lot, bool isMarket, bool roundUp = false);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |
| `lot` | [`decimal`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The raw quantity. |
| `isMarket` | [`bool`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | True if placing a market order. |
| `roundUp` | [`bool`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | True to round up; false to round down. |

**Return Value**

The normalized lot size.

**Remarks**

Market and Limit orders sometimes have different precision constraints.

**Example**

```csharp
decimal validQty = Context.Instrument.NormalizeLot("BTC-USDT", 1.123456m, false);
```

---

## `GetTickPrice`
Gets the tick size (minimum price increment) for the specified symbol.

**Syntax**

```csharp
decimal GetTickPrice(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |

**Return Value**

The tick size value.

**Remarks**

Useful when iterating or shifting prices by discrete steps.

**Example**

```csharp
decimal tick = Context.Instrument.GetTickPrice("BTC-USDT");
decimal nextPrice = currentPrice + tick;
```

---
