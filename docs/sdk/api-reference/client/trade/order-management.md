---
id: sdk-trade-order-management
title: Order Management
sidebar_label: Order Management
---
# Order Management

## `AmendOrderAsync`
Amends an open limit order (changes quantity or price).

**Syntax**

```csharp
Task<ApiResult<OrderAmendResponse>> AmendOrderAsync(string symbol, long? orderId = null, string? clientOrderId = null, string? requestId = null, bool? cancelOnFail = null, decimal? newQuantity = null, decimal? newPrice = null, decimal? newTriggerPrice = null, decimal? newTakeProfitTriggerPrice = null, decimal? newStopLossTriggerPrice = null, decimal? newTakeProfitOrderPrice = null, decimal? newStopLossOrderPrice = null, TriggerPriceType? newTakeProfitPriceTriggerType = null, TriggerPriceType? newStopLossPriceTriggerType = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Trading symbol. |
| `orderId` | [`long?`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Order ID. |
| `newQuantity` | [`decimal?`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | New quantity. |
| `newPrice` | [`decimal?`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | New price. |

**Return Value**

`ApiResult<OrderAmendResponse>`.

**Remarks**

Some fields might not be amendable on all exchanges.

**Example**

```csharp
var res = await Context.Trade.AmendOrderAsync("BTC-USDT", orderId: 12345, newPrice: 64500m);
```

---

## `CancelOrderAsync`
Cancels a specific open order.

**Syntax**

```csharp
Task<ApiResult<OrderCancelResponse>> CancelOrderAsync(string symbol, long? orderId = null, string? origClientOrderId = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Trading symbol. |
| `orderId` | [`long?`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Order ID to cancel. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

`ApiResult<OrderCancelResponse>`.

**Remarks**

Provide either `orderId` or `origClientOrderId`.

**Example**

```csharp
var res = await Context.Trade.CancelOrderAsync("BTC-USDT", orderId: 12345);
```

---
