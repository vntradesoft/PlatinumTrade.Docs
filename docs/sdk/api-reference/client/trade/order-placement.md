---
id: sdk-trade-order-placement
title: Order Placement
sidebar_label: Order Placement
---
# Order Placement

## `PlaceOrderAsync`
Places a new standard trading order (Limit, Market, etc.).

**Syntax**

```csharp
Task<ApiResult<OrderPlaceResponse>> PlaceOrderAsync(string symbol, OrderSide side, OrderType type, decimal quantity, decimal? price = null, AttachedAlgoOrder? attachedAlgoOrder = null, bool? reduceOnly = null, string? tag = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Trading symbol. |
| `side` | [`OrderSide`](../../enums.md#orderside) | Buy or Sell. |
| `type` | [`OrderType`](../../enums.md#ordertype) | Limit or Market. |
| `quantity` | [`decimal`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Trade amount. |
| `price` | [`decimal?`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Target price (required for Limit). |
| `attachedAlgoOrder` | `AttachedAlgoOrder?` | Optional TP/SL. |
| `reduceOnly` | [`bool?`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | True to reduce position only. |
| `tag` | [`string?`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Custom order tag. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

`ApiResult<OrderPlaceResponse>` containing order ID.

**Remarks**

Quantity and price are automatically normalized by the system before submission.

**Example**

```csharp
var res = await Context.Trade.PlaceOrderAsync("BTC-USDT-SWAP", OrderSide.Buy, OrderType.Market, 1.5m);
if (res.Success)
{
    Context.Logger.LogInformation("Order placed", res.Data.OrderId);
}
```

---

## `PlaceAlgoOrderAsync`
Places an Algo order (Take Profit, Stop Loss, Trailing Stop, etc.).

**Syntax**

```csharp
Task<ApiResult<AlgoOrderResponse>> PlaceAlgoOrderAsync(string symbol, OrderSide orderSide, AlgoOrderType algoOrderType, decimal? quantity = null, bool? reduceOnly = null, PositionSide? positionSide = null, AlgoPriceType? tpTriggerPxType = null, decimal? tpTriggerPrice = null, decimal? tpOrderPrice = null, AlgoPriceType? slTriggerPxType = null, decimal? slTriggerPrice = null, decimal? slOrderPrice = null, decimal? closeFraction = null, bool? cancelOnClose = null, string? tag = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Trading symbol. |
| `orderSide` | [`OrderSide`](../../enums.md#orderside) | Buy/Sell. |
| `algoOrderType` | `AlgoOrderType` | Type of algo order. |
| `quantity` | [`decimal?`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Order quantity. |
- `tpTriggerPrice` / `slTriggerPrice` (`decimal?`): Trigger prices.
- `tpOrderPrice` / `slOrderPrice` (`decimal?`): Order execution prices.
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

`ApiResult<AlgoOrderResponse>` containing algo order ID.

**Remarks**

Used for setting standalone TP/SL or conditional triggers.

**Example**

```csharp
var res = await Context.Trade.PlaceAlgoOrderAsync("BTC-USDT", OrderSide.Sell, AlgoOrderType.StopOrder, 1.5m, slTriggerPrice: 60000m);
```

---

## `OrderCheckAsync`
Checks a potential order (pre-trade check) without actually placing it.

**Syntax**

```csharp
Task<ApiResult<CheckOrderResponse>> OrderCheckAsync(string symbol, OrderSide side, OrderType type, decimal quantity, decimal? price = null, ...);
```

**Parameters**

Similar to PlaceOrderAsync.

**Return Value**

`ApiResult<CheckOrderResponse>`.

**Remarks**

Useful for verifying margin requirements before committing a trade.

**Example**

```csharp
var check = await Context.Trade.OrderCheckAsync("BTC-USDT", OrderSide.Buy, OrderType.Market, 1.5m);
if (check.Success) { /* Safe to place order */ }
```

---
