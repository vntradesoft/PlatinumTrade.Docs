---
id: sdk-trade-client
title: Trade API
sidebar_label: Trade
sidebar_position: 3
---
# Trade API
The Trade API (`Context.Trade`) manages placing, amending, cancelling orders, closing positions, and querying live or historical trading data.

The `ITradeClient` interface provides access to:

- Order placement and management
- Position management and closing
- Trade history and analytics
- Algo orders (Take Profit, Stop Loss, Trailing Stop)
- Pre-trade order validation

:::info[Notice]
Currently, only OKX USDT-margined perpetual swap instruments are supported.
Spot, Futures, Options, and other instrument types are not supported.
:::

---

## Order Placement & Management

### `PlaceOrderAsync`
Places a new standard trading order (Limit, Market, etc.).

**Syntax**

```csharp
Task<ApiResult<OrderPlaceResponse>> PlaceOrderAsync(string symbol, OrderSide side, OrderType type, decimal quantity, decimal? price = null, AttachedAlgoOrder? attachedAlgoOrder = null, bool? reduceOnly = null, string? tag = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Trading symbol. |
| `side` | `OrderSide` | Buy or Sell. |
| `type` | `OrderType` | Limit or Market. |
| `quantity` | `decimal` | Trade quantity. |
| `price` | `decimal?` | Target price (required for Limit orders). |
| `attachedAlgoOrder` | `AttachedAlgoOrder?` | Optional attached algo order (TP/SL). |
| `reduceOnly` | `bool?` | If true, only reduces position size. |
| `tag` | `string?` | Custom order tag for tracking. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the [`OrderPlaceResponse`](../models.md#orderplaceresponse) containing the order ID.

**Remarks**

Quantity and price are automatically normalized by the system before submission. The order is submitted asynchronously, so check `GetOrderAsync` to confirm its status.

**Example**

```csharp
var res = await Context.Trade.PlaceOrderAsync(
    "BTC-USDT-SWAP",
    OrderSide.Buy,
    OrderType.Market,
    quantity: 1.5m
);
if (res.Success)
{
    Context.Logger.LogInformation("Order", $"Placed with ID: {res.Data.OrderId}");
}
```

**Exchange API Mapping**

| **Endpoint** | [`POST /api/v5/trade/order`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-place-order) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.PlaceOrderAsync`](https://github.com/JKorf/OKX.Net) |

---

### `OrderCheckAsync`
Performs a pre-trade check without actually placing an order.

**Syntax**

```csharp
Task<ApiResult<CheckOrderResponse>> OrderCheckAsync(string symbol, OrderSide side, OrderType type, decimal quantity, decimal? price = null, PositionSide? positionSide = null, TradeMode? tradeMode = null, decimal? takeProfitTriggerPrice = null, decimal? stopLossTriggerPrice = null, decimal? takeProfitOrderPrice = null, decimal? stopLossOrderPrice = null, TriggerPriceType? takeProfitTriggerPriceType = null, TriggerPriceType? stopLossTriggerPriceType = null, QuantityAsset? quantityAsset = null, bool? reduceOnly = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Trading symbol. |
| `side` | `OrderSide` | Buy or Sell. |
| `type` | `OrderType` | Order type. |
| `quantity` | `decimal` | Order quantity. |
| `price` | `decimal?` | Order price (for limit orders). |
| `reduceOnly` | `bool?` | If true, only reduces position. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the [`CheckOrderResponse`](../models.md#checkorderresponse) with validation details.

**Remarks**

Useful for verifying margin requirements and position impact before committing a trade. No actual order is placed.

**Example**

```csharp
var check = await Context.Trade.OrderCheckAsync(
    "BTC-USDT-SWAP",
    OrderSide.Buy,
    OrderType.Market,
    quantity: 1.5m
);
if (check.Success)
{
    Context.Logger.LogInformation("Pre-trade check passed");
}
```

**Exchange API Mapping**

| **Endpoint** | [`POST /api/v5/trade/check-order`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-check-order) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.CheckOrderAsync`](https://github.com/JKorf/OKX.Net) |

---

### `AmendOrderAsync`
Amends an open order (changes quantity, price, or TP/SL).

**Syntax**

```csharp
Task<ApiResult<OrderAmendResponse>> AmendOrderAsync(string symbol, long? orderId = null, string? clientOrderId = null, string? requestId = null, bool? cancelOnFail = null, decimal? newQuantity = null, decimal? newPrice = null, decimal? newTriggerPrice = null, decimal? newTakeProfitTriggerPrice = null, decimal? newStopLossTriggerPrice = null, decimal? newTakeProfitOrderPrice = null, decimal? newStopLossOrderPrice = null, TriggerPriceType? newTakeProfitPriceTriggerType = null, TriggerPriceType? newStopLossPriceTriggerType = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Trading symbol. |
| `orderId` | `long?` | Order ID (use either orderId or clientOrderId). |
| `clientOrderId` | `string?` | Client order ID. |
| `newQuantity` | `decimal?` | New quantity. |
| `newPrice` | `decimal?` | New price. |
| `newTakeProfitTriggerPrice` | `decimal?` | New TP trigger price. |
| `newStopLossTriggerPrice` | `decimal?` | New SL trigger price. |
| `cancelOnFail` | `bool?` | If true, cancel order if amendment fails. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the [`OrderAmendResponse`](../models.md#orderamendresponse).

**Remarks**

Can only amend open orders. Not all fields can be amended on every order type.

**Example**

```csharp
var res = await Context.Trade.AmendOrderAsync(
    "BTC-USDT-SWAP",
    orderId: 12345,
    newPrice: 64500m
);
```

**Exchange API Mapping**

| **Endpoint** | [`POST /api/v5/trade/amend-order`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-amend-order) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.AmendOrderAsync`](https://github.com/JKorf/OKX.Net) |

---

### `CancelOrderAsync`
Cancels a single open order.

**Syntax**

```csharp
Task<ApiResult<OrderCancelResponse>> CancelOrderAsync(string symbol, long? orderId = null, string? origClientOrderId = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Trading symbol. |
| `orderId` | `long?` | Order ID (use either orderId or origClientOrderId). |
| `origClientOrderId` | `string?` | Original client order ID. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the [`OrderCancelResponse`](../models.md#ordercancelresponse).

**Remarks**

Cannot cancel already filled or canceled orders.

**Example**

```csharp
var res = await Context.Trade.CancelOrderAsync(
    "BTC-USDT-SWAP",
    orderId: 12345
);
```

**Exchange API Mapping**

| **Endpoint** | [`POST /api/v5/trade/cancel-order`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-cancel-order) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.CancelOrderAsync`](https://github.com/JKorf/OKX.Net) |

---

### `CancelMultipleOrdersAsync`
Cancels multiple open orders at once.

**Syntax**

```csharp
Task<ApiResult<OrderCancelResponse[]>> CancelMultipleOrdersAsync(IEnumerable<OrderCancelRequest> orders, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `orders` | `IEnumerable<OrderCancelRequest>` | List of orders to cancel. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping an array of [`OrderCancelResponse`](../models.md#ordercancelresponse).

**Remarks**

Use this for batch cancellations instead of calling `CancelOrderAsync` multiple times.

**Example**

```csharp
var orders = new[]
{
    new OrderCancelRequest { Symbol = "BTC-USDT-SWAP", OrderId = 12345 },
    new OrderCancelRequest { Symbol = "BTC-USDT-SWAP", OrderId = 12346 }
};
var res = await Context.Trade.CancelMultipleOrdersAsync(orders);
```

**Exchange API Mapping**

| **Endpoint** | [`POST /api/v5/trade/cancel-batch-orders`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-cancel-multiple-orders) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.CancelMultipleOrdersAsync`](https://github.com/JKorf/OKX.Net) |

---

## Algo Orders

### `PlaceAlgoOrderAsync`
Places an Algo order (Take Profit, Stop Loss, Trailing Stop, Trigger, etc.).

**Syntax**

```csharp
Task<ApiResult<AlgoOrderResponse>> PlaceAlgoOrderAsync(string symbol, OrderSide orderSide, AlgoOrderType algoOrderType, decimal? quantity = null, bool? reduceOnly = null, PositionSide? positionSide = null, AlgoPriceType? tpTriggerPxType = null, decimal? tpTriggerPrice = null, decimal? tpOrderPrice = null, AlgoPriceType? slTriggerPxType = null, decimal? slTriggerPrice = null, decimal? slOrderPrice = null, decimal? closeFraction = null, bool? cancelOnClose = null, string? tag = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Trading symbol. |
| `orderSide` | `OrderSide` | Buy or Sell. |
| `algoOrderType` | `AlgoOrderType` | Type of algo order (TP/SL, Trailing Stop, etc.). |
| `quantity` | `decimal?` | Quantity. |
| `tpTriggerPrice` | `decimal?` | Take Profit trigger price. |
| `tpOrderPrice` | `decimal?` | Take Profit order price. |
| `slTriggerPrice` | `decimal?` | Stop Loss trigger price. |
| `slOrderPrice` | `decimal?` | Stop Loss order price. |
| `reduceOnly` | `bool?` | If true, only closes positions. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the [`AlgoOrderResponse`](../models.md#algoorderresponse).

**Remarks**

Algo orders are useful for automated TP/SL management. They execute conditionally based on market price triggers.

**Example**

```csharp
var res = await Context.Trade.PlaceAlgoOrderAsync(
    "BTC-USDT-SWAP",
    OrderSide.Sell,
    AlgoOrderType.TakeProfitStopLoss,
    quantity: 1.0m,
    tpTriggerPrice: 65000m,
    tpOrderPrice: 64950m,
    slTriggerPrice: 60000m,
    slOrderPrice: 60050m
);
```

**Exchange API Mapping**

| **Endpoint** | [`POST /api/v5/trade/order-algo`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-place-algo-order) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.PlaceAlgoOrderAsync`](https://github.com/JKorf/OKX.Net) |

---

### `AmendAlgoOrderAsync`
Amends a pending Algo order.

**Syntax**

```csharp
Task<ApiResult<AlgoOrderAmendResponse>> AmendAlgoOrderAsync(string symbol, string? algoId = null, string? clientAlgoId = null, string? requestId = null, bool? cancelOnFail = null, decimal? newQuantity = null, decimal? newTakeProfitTriggerPrice = null, decimal? newStopLossTriggerPrice = null, decimal? newTakeProfitOrderPrice = null, decimal? newStopLossOrderPrice = null, TriggerPriceType? newTakeProfitPriceTriggerType = null, TriggerPriceType? newStopLossPriceTriggerType = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Trading symbol. |
| `algoId` | `string?` | Algo order ID (use either algoId or clientAlgoId). |
| `clientAlgoId` | `string?` | Client Algo order ID. |
| `newQuantity` | `decimal?` | New quantity. |
| `newTakeProfitTriggerPrice` | `decimal?` | New TP trigger price. |
| `newStopLossTriggerPrice` | `decimal?` | New SL trigger price. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the [`AlgoOrderAmendResponse`](../models.md#algoorderamendresponse).

**Example**

```csharp
var res = await Context.Trade.AmendAlgoOrderAsync(
    "BTC-USDT-SWAP",
    algoId: "abc123",
    newTakeProfitTriggerPrice: 66000m
);
```

**Exchange API Mapping**

| **Endpoint** | [`POST /api/v5/trade/amend-algos`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-amend-algo-order) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.AmendAlgoOrderAsync`](https://github.com/JKorf/OKX.Net) |

---

### `CancelAlgoOrderAsync`
Cancels one or more pending Algo orders.

**Syntax**

```csharp
Task<ApiResult<AlgoOrderResponse>> CancelAlgoOrderAsync(IEnumerable<AlgoOrderRequest> orders, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `orders` | `IEnumerable<AlgoOrderRequest>` | List of Algo orders to cancel. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the [`AlgoOrderResponse`](../models.md#algoorderresponse).

**Example**

```csharp
var orders = new[] { new AlgoOrderRequest { Symbol = "BTC-USDT-SWAP", AlgoId = "abc123" } };
var res = await Context.Trade.CancelAlgoOrderAsync(orders);
```

**Exchange API Mapping**

| **Endpoint** | [`POST /api/v5/trade/cancel-algos`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-cancel-algo-order) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.CancelAlgoOrderAsync`](https://github.com/JKorf/OKX.Net) |

---

## Position Management

### `GetPositionsAsync`
Gets a list of open positions.

**Syntax**

```csharp
Task<ApiResult<Position[]>> GetPositionsAsync(string? symbol = null, string? positionId = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | Filter by trading symbol (optional). |
| `positionId` | `string?` | Filter by position ID (optional). |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping an array of [`Position`](../models.md#position).

**Example**

```csharp
var posRes = await Context.Trade.GetPositionsAsync(symbol: "BTC-USDT-SWAP");
if (posRes.Success)
{
    foreach (var pos in posRes.Data)
    {
        Context.Logger.LogInformation("Position", $"Symbol: {pos.Symbol}, Size: {pos.Contracts}");
    }
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/account/positions`](https://www.okx.com/docs-v5/en/#trading-account-api-get-positions) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Account.GetPositionsAsync`](https://github.com/JKorf/OKX.Net) |

---

### `ClosePositionAsync`
Closes an open position fully at market price.

**Syntax**

```csharp
Task<ApiResult<ClosePositionResponse>> ClosePositionAsync(string symbol, PositionSide? positionSide = null, string? asset = null, bool? autoCancel = null, string? clientOrderId = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Trading symbol. |
| `positionSide` | `PositionSide?` | Long or Short (required in Hedge Mode). |
| `autoCancel` | `bool?` | If true, cancel associated TP/SL orders. |
| `clientOrderId` | `string?` | Custom client order ID. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the [`ClosePositionResponse`](../models.md#closepositionresponse).

**Remarks**

Executes a market order to close the entire position. Associated Algo orders (TP/SL) are automatically canceled if `autoCancel` is true.

**Example**

```csharp
var res = await Context.Trade.ClosePositionAsync(
    "BTC-USDT-SWAP",
    positionSide: PositionSide.Long,
    autoCancel: true
);
if (res.Success)
{
    Context.Logger.LogInformation("Position closed");
}
```

**Exchange API Mapping**

| **Endpoint** | [`POST /api/v5/trade/close-position`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-close-positions) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.ClosePositionAsync`](https://github.com/JKorf/OKX.Net) |

---

## Order & Trade Queries

### `GetOrderAsync`
Gets detailed information for a single order.

**Syntax**

```csharp
Task<ApiResult<Order>> GetOrderAsync(string symbol, long? orderId = null, string? origClientOrderId = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Trading symbol. |
| `orderId` | `long?` | Order ID (use either orderId or origClientOrderId). |
| `origClientOrderId` | `string?` | Original client order ID. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the [`Order`](../models.md#order).

**Remarks**

Use this to check the fill status and details of an order.

**Example**

```csharp
var orderRes = await Context.Trade.GetOrderAsync("BTC-USDT-SWAP", orderId: 12345);
if (orderRes.Success)
{
    var order = orderRes.Data;
    Context.Logger.LogInformation("Order", $"Status: {order.State}, Filled: {order.FilledQuantity}");
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/trade/order`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-order-details) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.GetOrderDetailsAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetOrdersAsync`
Gets a list of all open (live/partially filled) orders.

**Syntax**

```csharp
Task<ApiResult<Order[]>> GetOrdersAsync(string? symbol = null, string? underlying = null, OrderType? orderType = null, OrderStatus? state = null, string? instrumentFamily = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | Filter by trading symbol (optional). |
| `underlying` | `string?` | Filter by underlying asset (optional). |
| `orderType` | `OrderType?` | Filter by order type (optional). |
| `state` | `OrderStatus?` | Filter by order status (optional). |
| `instrumentFamily` | `string?` | Filter by instrument family (optional). |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping an array of [`Order`](../models.md#order).

**Example**

```csharp
var ordersRes = await Context.Trade.GetOrdersAsync(symbol: "BTC-USDT-SWAP");
if (ordersRes.Success)
{
    Context.Logger.LogInformation("Orders", $"Open orders: {ordersRes.Data.Length}");
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/trade/orders-pending`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-open-orders) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.GetOpenOrdersAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetHistoryOrdersAsync`
Gets the history of closed or canceled orders (last 7 days).

**Syntax**

```csharp
Task<ApiResult<Order[]>> GetHistoryOrdersAsync(string? symbol = null, string? underlying = null, OrderType? orderType = null, OrderStatus? state = null, DateTime? startTime = null, DateTime? endTime = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | Filter by trading symbol (optional). |
| `underlying` | `string?` | Filter by underlying asset (optional). |
| `orderType` | `OrderType?` | Filter by order type (optional). |
| `state` | `OrderStatus?` | Filter by order status (optional). |
| `startTime` | `DateTime?` | Start time for query (optional). |
| `endTime` | `DateTime?` | End time for query (optional). |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping an array of [`Order`](../models.md#order).

**Remarks**

Returns only the last 7 days of history. For older data, use `GetOrdersArchiveAsync`.

**Example**

```csharp
var historyRes = await Context.Trade.GetHistoryOrdersAsync(symbol: "BTC-USDT-SWAP");
if (historyRes.Success)
{
    Context.Logger.LogInformation("History", $"Closed orders: {historyRes.Data.Length}");
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/trade/orders-history`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.GetOrderHistoryAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetOrdersArchiveAsync`
Gets archived order history (older than 7 days, up to 3+ months).

**Syntax**

```csharp
Task<ApiResult<Order[]>> GetOrdersArchiveAsync(string? symbol = null, string? underlying = null, OrderType? orderType = null, OrderStatus? state = null, DateTime? startTime = null, DateTime? endTime = null, CancellationToken ct = default);
```

**Parameters**

Same as `GetHistoryOrdersAsync`.

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping an array of [`Order`](../models.md#order).

**Remarks**

Use this when you need order history beyond the 7-day window of `GetHistoryOrdersAsync`.

**Example**

```csharp
var archiveRes = await Context.Trade.GetOrdersArchiveAsync(
    symbol: "BTC-USDT-SWAP",
    startTime: DateTime.UtcNow.AddMonths(-3),
    endTime: DateTime.UtcNow.AddDays(-7)
);
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/trade/orders-history-archive`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-order-history-archive) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.GetOrderHistoryArchiveAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetUserTradesAsync`
Gets the history of matched trades (fills).

**Syntax**

```csharp
Task<ApiResult<Transaction[]>> GetUserTradesAsync(string? symbol = null, string? underlying = null, long? orderId = null, DateTime? startTime = null, DateTime? endTime = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | Filter by trading symbol (optional). |
| `underlying` | `string?` | Filter by underlying asset (optional). |
| `orderId` | `long?` | Filter by order ID (optional). |
| `startTime` | `DateTime?` | Start time for query (optional). |
| `endTime` | `DateTime?` | End time for query (optional). |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping an array of [`Transaction`](../models.md#transaction) (fills).

**Example**

```csharp
var tradesRes = await Context.Trade.GetUserTradesAsync(symbol: "BTC-USDT-SWAP");
if (tradesRes.Success)
{
    foreach (var trade in tradesRes.Data)
    {
        Context.Logger.LogInformation("Trade", $"Qty: {trade.Quantity}, Price: {trade.Price}");
    }
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/trade/fills`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-transaction-details) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.GetTradesAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetUserTradesArchiveAsync`
Gets archived trade history (older data, up to 3+ months).

**Syntax**

```csharp
Task<ApiResult<Transaction[]>> GetUserTradesArchiveAsync(string? symbol = null, string? underlying = null, long? orderId = null, DateTime? startTime = null, DateTime? endTime = null, CancellationToken ct = default);
```

**Parameters**

Same as `GetUserTradesAsync`.

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping an array of [`Transaction`](../models.md#transaction).

**Remarks**

Use when you need trade history beyond the recent window.

**Example**

```csharp
var archiveRes = await Context.Trade.GetUserTradesArchiveAsync(
    symbol: "BTC-USDT-SWAP",
    startTime: DateTime.UtcNow.AddMonths(-3)
);
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/trade/fills-history`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-months) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.GetTradesHistoryAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetClosePositionsAsync`
Gets the history of closed positions.

**Syntax**

```csharp
Task<ApiResult<ClosingPosition[]>> GetClosePositionsAsync(string? symbol = null, MarginMode? marginMode = null, ClosingPositionType? type = null, string? positionId = null, DateTime? endTime = null, DateTime? startTime = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | Filter by trading symbol (optional). |
| `marginMode` | `MarginMode?` | Filter by margin mode (optional). |
| `type` | `ClosingPositionType?` | Filter by closing position type (optional). |
| `positionId` | `string?` | Filter by position ID (optional). |
| `startTime` | `DateTime?` | Start time for query (optional). |
| `endTime` | `DateTime?` | End time for query (optional). |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping an array of [`ClosingPosition`](../models.md#closingposition).

**Remarks**

Retrieves up to 3 months of data. For older data, check archived records.

**Example**

```csharp
var closedRes = await Context.Trade.GetClosePositionsAsync(symbol: "BTC-USDT-SWAP");
if (closedRes.Success)
{
    Context.Logger.LogInformation("Closed Positions", $"Count: {closedRes.Data.Length}");
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/account/close-positions`](https://www.okx.com/docs-v5/en/#trading-account-api-get-closed-position) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Account.GetClosedPositionsAsync`](https://github.com/JKorf/OKX.Net) |

---

## Algo Order Queries

### `GetAlgoOrdersAsync`
Gets a list of pending Algo orders.

**Syntax**

```csharp
Task<ApiResult<AlgoOrder[]>> GetAlgoOrdersAsync(AlgoOrderType algoOrderType, string? algoId = null, string? symbol = null, DateTime? startTime = null, DateTime? endTime = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `algoOrderType` | `AlgoOrderType` | Type of algo order to query (e.g., TakeProfitStopLoss). |
| `algoId` | `string?` | Filter by Algo order ID (optional). |
| `symbol` | `string?` | Filter by trading symbol (optional). |
| `startTime` | `DateTime?` | Start time for query (optional). |
| `endTime` | `DateTime?` | End time for query (optional). |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping an array of [`AlgoOrder`](../models.md#algoorder).

**Example**

```csharp
var algoRes = await Context.Trade.GetAlgoOrdersAsync(
    AlgoOrderType.TakeProfitStopLoss,
    symbol: "BTC-USDT-SWAP"
);
if (algoRes.Success)
{
    Context.Logger.LogInformation("Algo Orders", $"Count: {algoRes.Data.Length}");
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/trade/orders-algo-pending`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-algo-order-list) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.GetAlgoOrdersAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetAlgoOrderAsync`
Gets detailed information for a single Algo order.

**Syntax**

```csharp
Task<ApiResult<AlgoOrder>> GetAlgoOrderAsync(string? algoId = null, string? clientAlgoId = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `algoId` | `string?` | Algo order ID (use either algoId or clientAlgoId). |
| `clientAlgoId` | `string?` | Client Algo order ID. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the [`AlgoOrder`](../models.md#algoorder).

**Example**

```csharp
var algoRes = await Context.Trade.GetAlgoOrderAsync(algoId: "abc123");
if (algoRes.Success)
{
    Context.Logger.LogInformation("Algo Order", $"Status: {algoRes.Data.State}");
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/trade/orders-algo-details`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-get-algo-order-details) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.GetAlgoOrderDetailsAsync`](https://github.com/JKorf/OKX.Net) |

---

## Configuration

### `SetOrderSourceIdPrefix`
Sets the default source identifier prefix used when generating client order IDs.

**Syntax**

```csharp
(bool Success, string ErrorMsg) SetOrderSourceIdPrefix(string sourceIdPrefix);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `sourceIdPrefix` | `string` | Unique prefix to distinguish orders from different bots/strategies. |

**Return Value**

A tuple containing `Success` (bool) and `ErrorMsg` (string).

**Remarks**

Useful for identifying orders from different strategies or bots when using the same API account. The prefix is included in client order IDs.

**Example**

```csharp
var (success, error) = Context.Trade.SetOrderSourceIdPrefix("StrategyA_");
if (success)
{
    Context.Logger.LogInformation("Config", "Order source ID prefix set");
}
```

---

### `DisableLogApiEndPoint`
Disables logging for specified API endpoints.

**Syntax**

```csharp
void DisableLogApiEndPoint(IEnumerable<ApiName> apiNames);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `apiNames` | `IEnumerable<ApiName>` | API endpoints to disable logging for. |

**Remarks**

Use this to reduce log spam for frequently called APIs like quote or position queries.

**Example**

```csharp
Context.Trade.DisableLogApiEndPoint(new[] { ApiName.GetPositions, ApiName.GetOrders });
```
