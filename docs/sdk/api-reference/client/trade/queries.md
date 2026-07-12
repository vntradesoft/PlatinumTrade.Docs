---
id: sdk-trade-queries
title: Live Queries
sidebar_label: Live Queries
---
# Live Queries

## `GetOrderAsync`
Gets detailed information for a single order.

**Syntax**

```csharp
Task<ApiResult<Order>> GetOrderAsync(string symbol, long? orderId = null, string? origClientOrderId = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Trading symbol. |
| `orderId` | [`long?`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Order ID. |

**Return Value**

`ApiResult<Order>`.

**Remarks**

Use this to check the fill status of a limit order.

**Example**

```csharp
var orderInfo = await Context.Trade.GetOrderAsync("BTC-USDT", orderId: 12345);
```

---

## `GetPositionsAsync`
Gets a list of all open positions.

**Syntax**

```csharp
Task<ApiResult<Position[]>> GetPositionsAsync(string? symbol = null, string? positionId = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string?`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Optional filter by symbol. |

**Return Value**

`ApiResult<Position[]>`.

**Remarks**

Provides unrealized PnL, leverage, and entry prices.

**Example**

```csharp
var posRes = await Context.Trade.GetPositionsAsync("BTC-USDT-SWAP");
if (posRes.Success && posRes.Data.Length > 0)
{
    decimal pnl = posRes.Data[0].UnrealizedPnL;
}
```

---
