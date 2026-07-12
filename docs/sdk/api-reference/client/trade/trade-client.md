---
id: trade-client
title: Trading Client (ITradeClient)
description: Detailed API mappings for ITradeClient.
status: stable
visibility: public
---

# Trading Client (ITradeClient)

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
