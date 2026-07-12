---
id: sdk-account-balances-and-assets
title: Balances & Assets
sidebar_label: Balances & Assets
---
# Balances & Assets

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

An [`AccountBalance`](../../models.md#accountbalance) object, or `null` if unavailable.

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

---

## `AccountSelect`
Retrieves detailed information for a specific asset.

**Syntax**

```csharp
AccountBalanceDetail? AccountSelect(string currency = "USDT");
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `currency` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The asset symbol (e.g., "USDT", "BTC"). |

**Return Value**

An `AccountBalanceDetail` object, or `null` if not found.

**Remarks**

Useful when you only care about the available balance of a specific coin.

**Example**

```csharp
var usdtBalance = Context.Account.AccountSelect("USDT");
if (usdtBalance != null)
{
    decimal available = usdtBalance.AvailableBalance;
}
```

---

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

An `ApiResult` wrapping the latest [`AccountBalance`](../../models.md#accountbalance).

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

---
