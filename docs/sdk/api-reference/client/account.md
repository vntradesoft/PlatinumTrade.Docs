---
id: sdk-account-client
title: Account API
sidebar_label: Account
sidebar_position: 2
---
# Account API
The Account API (`Context.Account`) provides methods for retrieving balances, analytics, and configuring trading modes.

## Properties
- `WalletBalance` (`decimal`): Total actual wallet balance excluding unrealized PnL.
- `AvailableBalance` (`decimal`): Balance available for opening new positions.
- `Equity` (`decimal`): Wallet balance + Unrealized PnL.
- `UnrealizedPnL` (`decimal`): Total unrealized profit/loss.
- `InitialMargin` (`decimal`): Total initial margin in use.

## `GetBalances`
Gets detailed information about the trading account balance.

**Syntax**

```csharp
AccountBalance? GetBalances();
```

**Parameters**

None.

**Return Value**

An [`AccountBalance`](#accountbalance) object, or `null` if unavailable.

**Remarks**

This retrieves the most recently cached balance without making a new network request.

**Example**

```csharp
var balance = Context.Account.GetBalances();
if (balance != null)
{
    Context.Logger.LogInformation("Balance", $"Total Equity: {balance.Eq}");
}
```

## `LoadBalanceAsync`
Asynchronously refreshes the account balance from the exchange.

**Syntax**

```csharp
Task<ApiResult<AccountBalance>> LoadBalanceAsync(CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the latest [`AccountBalance`](#accountbalance).

**Remarks**

Call this when you need to forcefully sync the balance with the server.

**Example**

```csharp
var result = await Context.Account.LoadBalanceAsync();
if (result.Success)
{
    var newEquity = result.Data.Eq;
}
```

**Exchange API Mapping**

- **OKX.Net Call**: `UnifiedApi.Account.GetAccountBalanceAsync`
- **Endpoint**: `GET /api/v5/account/balance`
- **Docs**: [Get Balance](https://www.okx.com/docs-v5/en/#trading-account-api-get-balance)


## `GetCurrentEquity`
Gets the current equity value of the account.

**Syntax**

```csharp
decimal GetCurrentEquity();
```

**Parameters**

None.

**Return Value**

The current equity value.

**Remarks**

Equivalent to `Equity` property.

**Example**

```csharp
decimal equity = Context.Account.GetCurrentEquity();
```

## `GetMarginRatio`
Calculates the current margin ratio of the account.

**Syntax**

```csharp
decimal GetMarginRatio();
```

**Parameters**

None.

**Return Value**

The margin ratio value.

**Remarks**

High margin ratio increases the risk of liquidation. Usually liquidation happens near 100%.

**Example**

```csharp
decimal ratio = Context.Account.GetMarginRatio();
if (ratio > 0.8m)
{
    Context.Logger.LogWarning("Margin Call", "Margin ratio exceeds 80%!");
}
```

## `SetInitialLeverageAsync`
Sets the initial leverage for a specific contract.

**Syntax**

```csharp
Task<bool> SetInitialLeverageAsync(string symbol, int leverage, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `leverage` | `int` | The leverage multiplier (e.g., 10, 20). |
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

**Exchange API Mapping**

- **OKX.Net Call**: `UnifiedApi.Account.GetLeverageAsync` & `SetLeverageAsync`
- **Endpoint**: `GET /leverage-info` & `POST /set-leverage`
- **Docs**: [Get](https://www.okx.com/docs-v5/en/#trading-account-api-get-leverage) & [Set Leverage](https://www.okx.com/docs-v5/en/#trading-account-api-set-leverage)


## `SetHedgeModeAsync`
Sets the position mode to Hedge Mode or Netting Mode.

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

**Exchange API Mapping**

- **OKX.Net Call**: `UnifiedApi.Account.GetAccountConfigurationAsync` & `SetPositionModeAsync`
- **Endpoint**: `GET /config` & `POST /set-position-mode`
- **Docs**: [Get Config](https://www.okx.com/docs-v5/en/#trading-account-api-get-account-configuration) & [Set Position Mode](https://www.okx.com/docs-v5/en/#trading-account-api-set-position-mode)


## `GetFeeLevelAsync`
Gets information about the account's trading fee VIP level.

**Syntax**

```csharp
Task<ApiResult<FeeVipLevel>> GetFeeLevelAsync();
```

**Parameters**

None.

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the [`FeeVipLevel`](../models.md#feeviplevel) info.

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

**Exchange API Mapping**

- **OKX.Net Call**: `UnifiedApi.Account.GetAccountConfigurationAsync`
- **Endpoint**: `GET /api/v5/account/config`
- **Docs**: [Get Account Configuration](https://www.okx.com/docs-v5/en/#trading-account-api-get-account-configuration)

