---
id: instrument-client
title: Instrument Client (IInstrumentClient)
description: Detailed API mappings for IInstrumentClient.
status: stable
visibility: public
---

# Instrument Client (IInstrumentClient)

The `IInstrumentClient` interface retrieves market tickers, order book spreads, margin tiers, and price rules.

## API Mappings

| SDK Method | OKX.Net Call | OKX API Endpoint | OKX API Documentation |
|---|---|---|---|
| `GetBidAskSpreadAsync` | `UnifiedApi.ExchangeData.GetOrderBookAsync` | `GET /api/v5/market/books` | [Get Order Book](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-order-book) |
| `GetLastPriceAsync` | `UnifiedApi.ExchangeData.GetTickerAsync` | `GET /api/v5/market/ticker` | [Get Ticker](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-ticker) |
| `GetMarkPriceAsync` | `UnifiedApi.ExchangeData.GetMarkPricesAsync` | `GET /api/v5/public/mark-price` | [Get Mark Price](https://www.okx.com/docs-v5/en/#public-data-api-get-mark-price) |
| `GetHighPriceAsync` | `UnifiedApi.ExchangeData.GetTickerAsync` | `GET /api/v5/market/ticker` | [Get Ticker](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-ticker) |
| `GetLowPriceAsync` | `UnifiedApi.ExchangeData.GetTickerAsync` | `GET /api/v5/market/ticker` | [Get Ticker](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-ticker) |
| `GetLimitPriceAsync` | `UnifiedApi.ExchangeData.GetPriceLimitsAsync` | `GET /api/v5/public/price-limit` | [Get Price Limits](https://www.okx.com/docs-v5/en/#public-data-api-get-price-limits) |
| `GetMaintMarginRateAsync` | `UnifiedApi.ExchangeData.GetPositionTiersAsync` | `GET /api/v5/public/position-tiers` | [Get Position Tiers](https://www.okx.com/docs-v5/en/#public-data-api-get-position-tiers) |
