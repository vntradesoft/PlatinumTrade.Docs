---
id: reference-api-reference
title: API Reference
description: SDK public interface, model catalog, and OKX API mappings.
status: stable
visibility: public
---

# API Reference

This page describes the core SDK interfaces, models, and enums. It also documents the mapping from the SDK client interfaces (`ITradeClient`, `IAccountClient`, `IInstrumentClient`, `ITimeSeriesClient`) to the underlying `OKX.Net` library calls and official OKX API endpoints.

---

## SDK Interfaces Overview

| Interface | Purpose |
|---|---|
| [IOkxClient](#iokxclient-mapping) | Root SDK client entry point aggregating specialized client sub-APIs |
| [ITradeClient](#itradeclient-mapping) | Handles orders, positions, trades, and execution |
| [IAccountClient](#iaccountclient-mapping) | Handles balances, margin settings, and account config |
| [IInstrumentClient](#iinstrumentclient-mapping) | Fetches ticket data, spreads, lot rules, and fees |
| [ITimeSeriesClient](#itimeseriesclient-mapping) | Manages historical candles, tick feeds, and technical indicators |
| `IIndicatorPlugin` | Indicator plugin registration contract |
| `IStrategyPlugin` | Strategy plugin registration contract |
| `IStrategy` | Strategy runtime lifecycle contract |
| `IStoragePathProvider` | Storage path override contract |
| `IHistoryCandleDownloader` | History candle download contract |

---

## IOkxClient Mapping

`IOkxClient` is the root client interface. It exposes specific client sub-APIs:

| Property | Type | Description |
|---|---|---|
| `Timeseries` | `ITimeSeriesClient` | Technical indicator and candle database engine |
| `Instrument` | `IInstrumentClient` | Market metadata, ticker data, and normalization rules |
| `Account` | `IAccountClient` | Account balance, leverage, and margin controls |
| `Trade` | `ITradeClient` | Live orders, algo orders, positions, and trades |

---

## ITradeClient Mapping

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

---

## IAccountClient Mapping

| SDK Method | OKX.Net Call | OKX API Endpoint | OKX API Documentation |
|---|---|---|---|
| `LoadBalanceAsync` | `UnifiedApi.Account.GetAccountBalanceAsync` | `GET /api/v5/account/balance` | [Get Balance](https://www.okx.com/docs-v5/en/#trading-account-api-get-balance) |
| `SetInitialLeverageAsync` | `UnifiedApi.Account.GetLeverageAsync` & `SetLeverageAsync` | `GET /leverage-info` & `POST /set-leverage` | [Get](https://www.okx.com/docs-v5/en/#trading-account-api-get-leverage) & [Set Leverage](https://www.okx.com/docs-v5/en/#trading-account-api-set-leverage) |
| `SetHedgeModeAsync` | `UnifiedApi.Account.GetAccountConfigurationAsync` & `SetPositionModeAsync` | `GET /config` & `POST /set-position-mode` | [Get Config](https://www.okx.com/docs-v5/en/#trading-account-api-get-account-configuration) & [Set Position Mode](https://www.okx.com/docs-v5/en/#trading-account-api-set-position-mode) |
| `GetFeeLevelAsync` | `UnifiedApi.Account.GetAccountConfigurationAsync` | `GET /api/v5/account/config` | [Get Account Configuration](https://www.okx.com/docs-v5/en/#trading-account-api-get-account-configuration) |

---

## IInstrumentClient Mapping

| SDK Method | OKX.Net Call | OKX API Endpoint | OKX API Documentation |
|---|---|---|---|
| `GetBidAskSpreadAsync` | `UnifiedApi.ExchangeData.GetOrderBookAsync` | `GET /api/v5/market/books` | [Get Order Book](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-order-book) |
| `GetLastPriceAsync` | `UnifiedApi.ExchangeData.GetTickerAsync` | `GET /api/v5/market/ticker` | [Get Ticker](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-ticker) |
| `GetMarkPriceAsync` | `UnifiedApi.ExchangeData.GetMarkPricesAsync` | `GET /api/v5/public/mark-price` | [Get Mark Price](https://www.okx.com/docs-v5/en/#public-data-api-get-mark-price) |
| `GetHighPriceAsync` | `UnifiedApi.ExchangeData.GetTickerAsync` | `GET /api/v5/market/ticker` | [Get Ticker](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-ticker) |
| `GetLowPriceAsync` | `UnifiedApi.ExchangeData.GetTickerAsync` | `GET /api/v5/market/ticker` | [Get Ticker](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-ticker) |
| `GetLimitPriceAsync` | `UnifiedApi.ExchangeData.GetPriceLimitsAsync` | `GET /api/v5/public/price-limit` | [Get Price Limits](https://www.okx.com/docs-v5/en/#public-data-api-get-price-limits) |
| `GetMaintMarginRateAsync` | `UnifiedApi.ExchangeData.GetPositionTiersAsync` | `GET /api/v5/public/position-tiers` | [Get Position Tiers](https://www.okx.com/docs-v5/en/#public-data-api-get-position-tiers) |

---

## ITimeSeriesClient Mapping

The `ITimeSeriesClient` interface provides local technical indicators and in-memory caching for strategies and charts. The only underlying API call is invoked by the background scheduler to sync kline database:

| Action | OKX.Net Call | OKX API Endpoint | OKX API Documentation |
|---|---|---|---|
| Fetch Candles | `UnifiedApi.ExchangeData.GetKlineHistoryAsync` | `GET /api/v5/market/history-candles` | [Get Candlesticks History](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-candlesticks-history) |

---

## Models

| Model | Description |
|---|---|
| `ApiResult<T>` | Generic response wrapper with success flag |
| `ApiError` | Error detail from API response |
| `CandleData` | OHLCV candle record |
| `TickData` | Intra-bar tick snapshot |
| `Order` | Exchange order state |
| `Position` | Open position state |
| `Transaction` | Trade fill record |
| `StrategyEvent` | Base event dispatched to strategy |

---

## Enums

| Enum | Values |
|---|---|
| `StrategyEventType` | Order, Balance, Position, AlgoOrder, Kline, Transaction, TradeCommand, Tick |
| `StorageType` | Binary, Csv |
| `PtLogLevel` | Critical, Error, Warning, Success, Information, Debug, Trace |

---

## Related Docs

- [SDK Overview](../sdk/intro.md)
- [Trading Client](../sdk/trading-client.md)
- [SDK Error Handling](../sdk/api-result.md)
