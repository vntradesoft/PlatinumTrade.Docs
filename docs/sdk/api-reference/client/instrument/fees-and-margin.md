---
id: sdk-inst-fees-and-margin
title: Fees & Margin
sidebar_label: Fees & Margin
---
# Fees & Margin

## `GetFeeTaker`
Gets the taker trading fee for the specified symbol.

**Syntax**

```csharp
decimal GetFeeTaker(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |

**Return Value**

The taker fee as a decimal (e.g., 0.001 for 0.1%).

**Remarks**

Applied when your order executes immediately against the orderbook.

**Example**

```csharp
decimal feeRate = Context.Instrument.GetFeeTaker("BTC-USDT");
decimal totalFee = orderValue * feeRate;
```

---

## `GetMaintMarginRateAsync`
Gets the maintenance margin rate for a specific position size.

**Syntax**

```csharp
Task<decimal> GetMaintMarginRateAsync(string symbol, decimal positionNotional, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |
| `positionNotional` | [`decimal`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The notional value of the position. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

The maintenance margin rate.

**Remarks**

Margin rates often vary by position tier sizes.

**Example**

```csharp
decimal mmr = await Context.Instrument.GetMaintMarginRateAsync("BTC-USDT-SWAP", 50000m);
```

---

## `ContractSize`
Gets the contract size for the specified symbol (Futures/Swap).

**Syntax**

```csharp
decimal ContractSize(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |

**Return Value**

The contract size.

**Remarks**

Determines the actual value multiplier for one contract.

**Example**

```csharp
decimal size = Context.Instrument.ContractSize("BTC-USDT-SWAP");
```

---
