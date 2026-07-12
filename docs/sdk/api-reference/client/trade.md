---
id: sdk-trade-client
title: Trade API
sidebar_label: Trade
sidebar_position: 3
---
# Trade API
The Trade API (`Context.Trade`) manages placing, amending, cancelling orders, closing positions, and querying live or historical trading data.

## `GetHistoryOrdersAsync`
Gets the history of closed or canceled orders (last 7 days).

**Syntax**

```csharp
Task<ApiResult<Order[]>> GetHistoryOrdersAsync(string? symbol = null, string? underlying = null, OrderType? orderType = null, OrderStatus? state = null, DateTime? startTime = null, DateTime? endTime = null, CancellationToken ct = default);
```

**Parameters**

Filters like symbol, status, and time range.

**Return Value**

`ApiResult<Order[]>`.

**Remarks**

For data older than 7 days, use `GetOrdersArchiveAsync`.

**Example**

```csharp
var history = await Context.Trade.GetHistoryOrdersAsync(symbol: "BTC-USDT");
```

**Exchange API Mapping**

| **Endpoint** | `GET /api/v5/trade/orders-history` |
|---|---|
| **OKX.Net** | [`UnifiedApi.Trading.GetOrderHistoryAsync`](https://github.com/JKorf/OKX.Net) |
| **Docs** | [Get Order History (7 Days)](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days) |


## `AmendOrderAsync`
Amends an open limit order (changes quantity or price).

**Syntax**

```csharp
Task<ApiResult<OrderAmendResponse>> AmendOrderAsync(string symbol, long? orderId = null, string? clientOrderId = null, string? requestId = null, bool? cancelOnFail = null, decimal? newQuantity = null, decimal? newPrice = null, decimal? newTriggerPrice = null, decimal? newTakeProfitTriggerPrice = null, decimal? newStopLossTriggerPrice = null, decimal? newTakeProfitOrderPrice = null, decimal? newStopLossOrderPrice = null, TriggerPriceType? newTakeProfitPriceTriggerType = null, TriggerPriceType? newStopLossPriceTriggerType = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Trading symbol. |
| `orderId` | `long?` | Order ID. |
| `newQuantity` | `decimal?` | New quantity. |
| `newPrice` | `decimal?` | New price. |

**Return Value**

[`ApiResult`](../models.md#apiresult)&lt;[`OrderAmendResponse`](../models.md#orderamendresponse)&gt;.

**Remarks**

Some fields might not be amendable on all exchanges.

**Example**

```csharp
var res = await Context.Trade.AmendOrderAsync("BTC-USDT", orderId: 12345, newPrice: 64500m);
```

**Exchange API Mapping**

| **Endpoint** | `POST /api/v5/trade/amend-order` |
|---|---|
| **OKX.Net** | [`UnifiedApi.Trading.AmendOrderAsync`](https://github.com/JKorf/OKX.Net) |
| **Docs** | [Amend Order](https://www.okx.com/docs-v5/en/#order-book-trading-trade-amend-order) |


## `PlaceOrderAsync`
Places a new standard trading order (Limit, Market, etc.).

**Syntax**

```csharp
Task<ApiResult<OrderPlaceResponse>> PlaceOrderAsync(string symbol, OrderSide side, OrderType type, decimal quantity, decimal? price = null, AttachedAlgoOrder? attachedAlgoOrder = null, bool? reduceOnly = null, string? tag = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Trading symbol. |
| `side` | [`OrderSide`](#orderside) | Buy or Sell. |
| `type` | [`OrderType`](#ordertype) | Limit or Market. |
| `quantity` | `decimal` | Trade amount. |
| `price` | `decimal?` | Target price (required for Limit). |
| `attachedAlgoOrder` | `AttachedAlgoOrder?` | Optional TP/SL. |
| `reduceOnly` | `bool?` | True to reduce position only. |
| `tag` | `string?` | Custom order tag. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

[`ApiResult`](../models.md#apiresult)&lt;[`OrderPlaceResponse`](../models.md#orderplaceresponse)&gt; containing order ID.

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

**Exchange API Mapping**

| **Endpoint** | `POST /api/v5/trade/order` |
|---|---|
| **OKX.Net** | [`UnifiedApi.Trading.PlaceOrderAsync`](https://github.com/JKorf/OKX.Net) |
| **Docs** | [Place Order](https://www.okx.com/docs-v5/en/#order-book-trading-trade-place-order) |


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

**Exchange API Mapping**

| **Endpoint** | `POST /api/v5/trade/check-order` |
|---|---|
| **OKX.Net** | [`UnifiedApi.Trading.CheckOrderAsync`](https://github.com/JKorf/OKX.Net) |
| **Docs** | [Check Order](https://www.okx.com/docs-v5/en/#order-book-trading-trade-check-order) |


## `ClosePositionAsync`
Closes an open position fully at market price.

**Syntax**

```csharp
Task<ApiResult<ClosePositionResponse>> ClosePositionAsync(string symbol, PositionSide? positionSide = null, string? asset = null, bool? autoCancel = null, string? clientOrderId = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Trading symbol. |
| `positionSide` | [`PositionSide?`](#positionside) | Long or Short (required if in Hedge mode). |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

[`ApiResult`](../models.md#apiresult)&lt;[`ClosePositionResponse`](../models.md#closepositionresponse)&gt;.

**Remarks**

Executing this will cancel associated TP/SL orders if autoCancel is true.

**Example**

```csharp
var res = await Context.Trade.ClosePositionAsync("BTC-USDT-SWAP", PositionSide.Long);
if (res.Success)
{
    Context.Logger.LogInformation("Position closed");
}
```

**Exchange API Mapping**

| **Endpoint** | `POST /api/v5/trade/close-position` |
|---|---|
| **OKX.Net** | [`UnifiedApi.Trading.ClosePositionAsync`](https://github.com/JKorf/OKX.Net) |
| **Docs** | [Close Position](https://www.okx.com/docs-v5/en/#order-book-trading-trade-close-positions) |


## `GetOrderAsync`
Gets detailed information for a single order.

**Syntax**

```csharp
Task<ApiResult<Order>> GetOrderAsync(string symbol, long? orderId = null, string? origClientOrderId = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Trading symbol. |
| `orderId` | `long?` | Order ID. |

**Return Value**

[`ApiResult`](../models.md#apiresult)&lt;[`Order`](../models.md#order)&gt;.

**Remarks**

Use this to check the fill status of a limit order.

**Example**

```csharp
var orderInfo = await Context.Trade.GetOrderAsync("BTC-USDT", orderId: 12345);
```

The `ITradeClient` interface handles placing, amending, and canceling orders, as well as retrieving active positions and historical transaction data.

**Exchange API Mapping**

| **Endpoint** | `GET /api/v5/trade/order` |
|---|---|
| **OKX.Net** | [`UnifiedApi.Trading.GetOrderDetailsAsync`](https://github.com/JKorf/OKX.Net) |
| **Docs** | [Get Order Details](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-order-details) |


## `SetMagicNumber`
Sets the Magic Number to identify the order source.

**Syntax**

```csharp
(bool Success, string ErrorMsg) SetMagicNumber(string magicNumber);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `magicNumber` | `string` | Custom identifier. |

**Return Value**

Tuple with success status.

**Remarks**

Bots use magic numbers to distinguish their orders from manual trades or other bots.

**Example**

```csharp
Context.Trade.SetMagicNumber("MyBot_01");
```