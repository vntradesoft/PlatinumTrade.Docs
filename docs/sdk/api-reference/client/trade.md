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
| `side` | [`OrderSide`](#orderside) | Buy or Sell. |
| `type` | [`OrderType`](#ordertype) | Limit or Market. |
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

## `ClosePositionAsync`
Closes an open position fully at market price.

**Syntax**

```csharp
Task<ApiResult<ClosePositionResponse>> ClosePositionAsync(string symbol, PositionSide? positionSide = null, string? asset = null, bool? autoCancel = null, string? clientOrderId = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Trading symbol. |
| `positionSide` | [`PositionSide?`](#positionside) | Long or Short (required if in Hedge mode). |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

`ApiResult<ClosePositionResponse>`.

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

The `ITradeClient` interface handles placing, amending, and canceling orders, as well as retrieving active positions and historical transaction data.

## API Mappings

| SDK Method | OKX.Net Call | OKX API Endpoint | OKX API Documentation |
|---|---|---|---|
| `PlaceOrderAsync` | `UnifiedApi.Trading.PlaceOrderAsync` | `POST /api/v5/trade/order` | [Place Order](https://www.okx.com/docs-v5/en/#order-book-trading-trade-place-order) |
| `PlaceAlgoOrderAsync` | `UnifiedApi.Trading.PlaceAlgoOrderAsync` | `POST /api/v5/trade/order-algo` | [Place Algo Order](https://www.okx.com/docs-v5/en/#order-book-trading-algo-trading-place-algo-order) |
| `AmendOrderAsync` | `UnifiedApi.Trading.AmendOrderAsync` | `POST /api/v5/trade/amend-order` | [Amend Order](https://www.okx.com/docs-v5/en/#order-book-trading-trade-amend-order) |
| `AmendAlgoOrderAsync` | `UnifiedApi.Trading.AmendAlgoOrderAsync` | `POST /api/v5/trade/amend-algo-order` | [Amend Algo Order](https://www.okx.com/docs-v5/en/#order-book-trading-algo-trading-amend-algo-order) |
| `CancelOrderAsync` | `UnifiedApi.Trading.CancelOrderAsync` | `POST /api/v5/trade/cancel-order` | [Cancel Order](https://www.okx.com/docs-v5/en/#order-book-trading-trade-cancel-order) |
| `CancelMultipleOrdersAsync` | `UnifiedApi.Trading.CancelMultipleOrdersAsync` | `POST /api/v5/trade/cancel-batch-orders` | [Cancel Multiple Orders](https://www.okx.com/docs-v5/en/#order-book-trading-trade-cancel-multiple-orders) |
| `CancelAlgoOrderAsync` | `UnifiedApi.Trading.CancelAlgoOrderAsync` | `POST /api/v5/trade/cancel-algo-orders` | [Cancel Algo Order](https://www.okx.com/docs-v5/en/#order-book-trading-algo-trading-cancel-algo-order) |
| `ClosePositionAsync` | `UnifiedApi.Trading.ClosePositionAsync` | `POST /api/v5/trade/close-position` | [Close Position](https://www.okx.com/docs-v5/en/#order-book-trading-trade-close-positions) |
| `OrderCheckAsync` | `UnifiedApi.Trading.CheckOrderAsync` | `POST /api/v5/trade/check-order` | [Check Order](https://www.okx.com/docs-v5/en/#order-book-trading-trade-check-order) |
| `GetOrderAsync` | `UnifiedApi.Trading.GetOrderDetailsAsync` | `GET /api/v5/trade/order` | [Get Order Details](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-order-details) |
| `GetOrdersAsync` | `UnifiedApi.Trading.GetOrdersAsync` | `GET /api/v5/trade/orders-pending` | [Get Order List (Pending)](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-order-list) |
| `GetAlgoOrderAsync` | `UnifiedApi.Trading.GetAlgoOrderAsync` | `GET /api/v5/trade/order-algo` | [Get Algo Order Details](https://www.okx.com/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-details) |
| `GetAlgoOrdersAsync` | `UnifiedApi.Trading.GetAlgoOrderListAsync` | `GET /api/v5/trade/orders-algo-pending` | [Get Algo Order List](https://www.okx.com/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list) |
| `GetPositionsAsync` | `UnifiedApi.Account.GetPositionsAsync` | `GET /api/v5/account/positions` | [Get Positions](https://www.okx.com/docs-v5/en/#trading-account-api-get-positions) |
| `GetClosePositionsAsync` | `UnifiedApi.Account.GetPositionHistoryAsync` | `GET /api/v5/account/positions-history` | [Get Positions History](https://www.okx.com/docs-v5/en/#trading-account-api-get-positions-history) |
| `GetHistoryOrdersAsync` | `UnifiedApi.Trading.GetOrderHistoryAsync` | `GET /api/v5/trade/orders-history` | [Get Order History (7 Days)](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days) |
| `GetOrdersArchiveAsync` | `UnifiedApi.Trading.GetOrderArchiveAsync` | `GET /api/v5/trade/orders-history-archive` | [Get Order History (Archive)](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-order-history-archive) |
| `GetUserTradeAsync` | `UnifiedApi.Trading.GetUserTradesAsync` | `GET /api/v5/trade/fills` | [Get Transaction Details (Fills)](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-days) |
| `GetUserTradesArchiveAsync` | `UnifiedApi.Trading.GetUserTradesArchiveAsync` | `GET /api/v5/trade/fills-archive` | [Get Transaction Details (Archive)](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-transaction-details-history) |

## `SetMagicNumber`
Sets the Magic Number to identify the order source.

**Syntax**

```csharp
(bool Success, string ErrorMsg) SetMagicNumber(string magicNumber);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `magicNumber` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Custom identifier. |

**Return Value**

Tuple with success status.

**Remarks**

Bots use magic numbers to distinguish their orders from manual trades or other bots.

**Example**

```csharp
Context.Trade.SetMagicNumber("MyBot_01");
```

