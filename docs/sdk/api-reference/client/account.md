---
id: sdk-account-client
title: Account API
sidebar_label: Account
sidebar_position: 2
---
# Account API
The Account API (`Context.Account`) provides methods for retrieving balances, analytics, and configuring trading modes.

The `IAccountClient` interface provides access to:

- Account balances and equity information
- Trading leverage configuration
- Position mode (Hedge vs Netting)
- Fee structure and VIP level

:::info[Notice]
Currently, only OKX USDT-margined perpetual swap accounts are supported.
Spot, Futures, Options, and other instrument types are not supported.
:::

---

## Balances & Assets

### `WalletBalance`
Gets the total wallet balance, excluding unrealized profit and loss.

**Syntax**

```csharp
decimal WalletBalance { get; }
```

**Parameters**

None.

**Return Value**

The total wallet balance as a `decimal`.

**Remarks**

This is the actual balance without accounting for unrealized PnL. Use this to see your base capital.

**Example**

```csharp
decimal walletBalance = Context.Account.WalletBalance;
Context.Logger.LogInformation("Balance", $"Wallet Balance: {walletBalance}");
```

---

### `AvailableBalance`
Gets the available balance for opening new positions.

**Syntax**

```csharp
decimal AvailableBalance { get; }
```

**Parameters**

None.

**Return Value**

The available balance as a `decimal`.

**Remarks**

This balance excludes margin already allocated to open positions and can be used for new trades.

**Example**

```csharp
decimal available = Context.Account.AvailableBalance;
if (available > 1000m)
{
    // Have sufficient margin to open new positions
}
```

---

### `Equity`
Gets the current account equity, including unrealized profit and loss.

**Syntax**

```csharp
decimal Equity { get; }
```

**Parameters**

None.

**Return Value**

The total equity as a `decimal`.

**Remarks**

Equity = `WalletBalance + UnrealizedPnL`. This represents the true total value of the account.

**Example**

```csharp
decimal equity = Context.Account.Equity;
decimal pnl = Context.Account.Equity - Context.Account.WalletBalance;
```

---

### `UnrealizedPnL`
Gets the total unrealized profit and loss across all open positions.

**Syntax**

```csharp
decimal UnrealizedPnL { get; }
```

**Parameters**

None.

**Return Value**

The total unrealized PnL as a `decimal`.

**Remarks**

This value changes in real-time as market prices move. It includes all open positions.

**Example**

```csharp
decimal unrealizedPnL = Context.Account.UnrealizedPnL;
if (unrealizedPnL > 0)
{
    Context.Logger.LogInformation("Profit", $"Currently up {unrealizedPnL}");
}
```

---

### `InitialMargin`
Gets the total initial margin currently in use.

**Syntax**

```csharp
decimal InitialMargin { get; }
```

**Parameters**

None.

**Return Value**

The total initial margin as a `decimal`.

**Remarks**

This is the minimum margin required to keep all open positions. Positions may be liquidated if account equity falls below maintenance margin.

**Example**

```csharp
decimal initialMargin = Context.Account.InitialMargin;
decimal marginUsagePercent = (initialMargin / Context.Account.Equity) * 100;
```

---

### `MarginRatio`
Gets the current margin ratio of the account.

**Syntax**

```csharp
decimal MarginRatio { get; }
```

**Parameters**

None.

**Return Value**

The margin ratio as a `decimal`.

**Remarks**

Positions may be liquidated when this value reaches the exchange liquidation threshold (typically around 1.5 or 100% depending on maintenance margin rate).

**Example**

```csharp
decimal ratio = Context.Account.MarginRatio;
if (ratio > 0.8m)
{
    Context.Logger.LogWarning("Liquidation Risk", "Margin ratio exceeds 80%!");
}
```

---

### `GetBalanceUsdtAsync`
Retrieves the latest USDT account balance information from the exchange.

**Syntax**

```csharp
Task<ApiResult<AccountBalanceDetail>> GetBalanceUsdtAsync(CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the [`AccountBalanceDetail`](../models.md#accountbalancedetail).

**Remarks**

Call this to forcefully refresh balance data from the server. This is useful when you need the latest balance state.

**Example**

```csharp
var balanceRes = await Context.Account.GetBalanceUsdtAsync();
if (balanceRes.Success)
{
    var balance = balanceRes.Data;
    Context.Logger.LogInformation("Balance", $"Updated Balance: {balance.TotalEq}");
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/account/balance`](https://www.okx.com/docs-v5/en/#trading-account-api-get-balance) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Account.GetAccountBalanceAsync`](https://github.com/JKorf/OKX.Net) |

---

## Trading Configuration

### `GetLeverage`
Gets the configured leverage for the specified trading symbol.

**Syntax**

```csharp
decimal GetLeverage(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |

**Return Value**

The leverage multiplier as a `decimal`.

**Remarks**

Returns the currently configured leverage for the symbol. If not explicitly set, returns the default leverage.

**Example**

```csharp
decimal leverage = Context.Account.GetLeverage("BTC-USDT-SWAP");
Context.Logger.LogInformation("Leverage", $"Current leverage: {leverage}x");
```

---

### `SetInitialLeverageAsync`
Sets the leverage for the specified trading symbol.

**Syntax**

```csharp
Task<bool> SetInitialLeverageAsync(string symbol, int leverage, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `leverage` | `int` | The leverage multiplier to set (e.g., 10, 20). |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

`true` if successful; otherwise `false`.

**Remarks**

Changing leverage while holding open positions may affect liquidation prices and margin requirements. Setting higher leverage increases risk.

**Example**

```csharp
bool success = await Context.Account.SetInitialLeverageAsync("BTC-USDT-SWAP", 10);
if (success)
{
    Context.Logger.LogInformation("Leverage", "Leverage updated successfully to 10x.");
}
```

**Exchange API Mapping**

| **Endpoint** | [`POST /api/v5/account/set-leverage`](https://www.okx.com/docs-v5/en/#trading-account-api-set-leverage) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Account.SetLeverageAsync`](https://github.com/JKorf/OKX.Net) |

---

### `IsHedgeMode`
Gets a value indicating whether the account is currently operating in Hedge Mode.

**Syntax**

```csharp
bool IsHedgeMode { get; }
```

**Parameters**

None.

**Return Value**

`true` if in Hedge Mode; `false` if in Netting Mode.

**Remarks**

- **Hedge Mode**: Allows independent long and short positions on the same symbol.
- **Netting Mode**: Combines long and short positions into a single net position.

**Example**

```csharp
if (Context.Account.IsHedgeMode)
{
    Context.Logger.LogInformation("Mode", "Operating in Hedge Mode");
}
else
{
    Context.Logger.LogInformation("Mode", "Operating in Netting Mode");
}
```

---

### `SetHedgeModeAsync`
Sets the account position mode.

**Syntax**

```csharp
Task<(bool Success, string? Error)> SetHedgeModeAsync(bool hedge, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `hedge` | `bool` | `true` for Hedge Mode; `false` for Netting Mode. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

A tuple containing:
- `Success`: `true` if the mode change succeeded; otherwise `false`.
- `Error`: An optional error message if the operation failed.

**Remarks**

Cannot be changed while there are open positions. You must close all positions before switching modes.

**Example**

```csharp
var (success, error) = await Context.Account.SetHedgeModeAsync(true);
if (success)
{
    Context.Logger.LogInformation("Mode", "Switched to Hedge Mode");
}
else
{
    Context.Logger.LogError(null, $"Failed to switch mode: {error}");
}
```

**Exchange API Mapping**

| **Endpoint** | [`POST /api/v5/account/set-position-mode`](https://www.okx.com/docs-v5/en/#trading-account-api-set-position-mode) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Account.SetPositionModeAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetFeeLevelAsync`
Retrieves the account''s current fee VIP level.

**Syntax**

```csharp
Task<ApiResult<FeeVipLevel>> GetFeeLevelAsync();
```

**Parameters**

None.

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the [`FeeVipLevel`](../models.md#feeviplevel) data.

**Remarks**

The VIP level determines your trading fees. Higher VIP levels have lower fees. Fee level is updated based on your trading volume and holdings.

**Example**

```csharp
var feeRes = await Context.Account.GetFeeLevelAsync();
if (feeRes.Success)
{
    var vipLevel = feeRes.Data.Level;
    Context.Logger.LogInformation("Fee", $"Current VIP Level: {vipLevel}");
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/account/config`](https://www.okx.com/docs-v5/en/#trading-account-api-get-account-configuration) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Account.GetAccountConfigurationAsync`](https://github.com/JKorf/OKX.Net) |
