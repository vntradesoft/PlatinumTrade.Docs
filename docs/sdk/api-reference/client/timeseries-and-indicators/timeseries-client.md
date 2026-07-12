---
id: timeseries-client
title: Time Series Client (ITimeSeriesClient)
description: Detailed API mappings for ITimeSeriesClient.
status: stable
visibility: public
---

# Time Series Client (ITimeSeriesClient)

The `ITimeSeriesClient` interface provides local technical indicators and in-memory caching for strategies and charts.

The only underlying API call is invoked by the background scheduler to sync kline database:

## API Mappings

| Action | OKX.Net Call | OKX API Endpoint | OKX API Documentation |
|---|---|---|---|
| Fetch Candles | `UnifiedApi.ExchangeData.GetKlineHistoryAsync` | `GET /api/v5/market/history-candles` | [Get Candlesticks History](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-candlesticks-history) |
