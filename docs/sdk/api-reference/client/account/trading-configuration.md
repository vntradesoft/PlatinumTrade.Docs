---
id: sdk-account-trading-configuration
title: Trading Configuration
sidebar_label: Trading Configuration
---
# Trading Configuration

## `SetInitialLeverageAsync`
Sets the initial leverage for a specific contract.

```csharp
Task<bool> SetInitialLeverageAsync(string symbol, int leverage, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |
| `leverage` | [`int`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The leverage multiplier (e.g., 10, 20). |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

`true` if successful; otherwise `false`.

**Remarks**

Changing leverage while holding open positions may affect liquidation prices.

**Example**

```csharp
bool success = await Context.Account.SetInitialLeverageAsync("BTC-USDT-SWAP", 10);
if (success)
{
    Context.Logger.LogInformation("Leverage updated successfully.");
}
```

---

## `GetLeverage`
Gets the current leverage for a specific contract.

```csharp
decimal GetLeverage(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |

**Return Value**

The leverage value as a `decimal`.

**Remarks**

Returns the cached leverage. Returns 1 if no leverage is set or for spot markets.

**Example**

```csharp
decimal currentLeverage = Context.Account.GetLeverage("BTC-USDT-SWAP");
if (currentLeverage > 20)
{
    Context.Logger.LogWarning("High leverage detected!");
}
```

---

## `SetHedgeModeAsync`
Sets the position mode to Hedge Mode or Netting Mode.

```csharp
Task<(bool Success, string? Error)> SetHedgeModeAsync(bool hedge, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `hedge` | [`bool`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | `true` for Hedge Mode; `false` for Netting Mode. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

A tuple containing a `Success` boolean and an optional `Error` message.

**Remarks**

Cannot be changed while there are open positions.

**Example**

```csharp
var (success, error) = await Context.Account.SetHedgeModeAsync(true);
if (!success)
{
    Context.Logger.LogError(null, $"Failed to set hedge mode: {error}");
}
```

---

## `IsHedgeMode`
Checks if the account is currently in Hedge Mode.

```csharp
bool IsHedgeMode();
```

**Parameters**

None.

**Return Value**

`true` if in Hedge Mode; otherwise `false`.

**Remarks**

Used to determine if you need to pass position side when placing orders.

**Example**

```csharp
if (Context.Account.IsHedgeMode())
{
    // Need to specify Long/Short position side
}
```

---

## `GetFeeLevelAsync`
Gets information about the account's trading fee VIP level.

```csharp
Task<ApiResult<FeeVipLevel>> GetFeeLevelAsync();
```

**Parameters**

None.

**Return Value**

An `ApiResult` wrapping the `FeeVipLevel` info.

**Remarks**

Fee calculations are generally done automatically by the engine.

**Example**

```csharp
var feeRes = await Context.Account.GetFeeLevelAsync();
if (feeRes.Success)
{
    var level = feeRes.Data.Level;
}
```

---
