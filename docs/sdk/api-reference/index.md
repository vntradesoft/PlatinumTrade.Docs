---
id: sdk-api-reference
title: API Reference Overview
description: Overview of the Platinum Trade SDK Client sub-interfaces and mapping structure.
status: stable
visibility: public
slug: /sdk/api-reference
---

# API Reference

The Platinum Trade SDK provides a unified client `IOkxClient` that aggregates specialized sub-clients for interacting with the OKX exchange.

This section contains detailed mapping tables between the SDK methods, the underlying `OKX.Net` library functions, and the official OKX REST API endpoints.

## SDK Client Sub-Interfaces

Select a client interface below to view its detailed API mappings, methods, and OKX endpoint mappings:

*   **[Trading Client (ITradeClient)](/docs/sdk/api-reference/trade-client)**: Manage live orders, algorithmic orders, positions, and user trade history.
*   **[Account Client (IAccountClient)](/docs/sdk/api-reference/account-client)**: Load wallet balances, set leverage, position modes, and fetch fee levels.
*   **[Instrument Client (IInstrumentClient)](/docs/sdk/api-reference/instrument-client)**: Retrieve market price tickers, order books, spreads, margin tiers, and price limits.
*   **[Time Series Client (ITimeSeriesClient)](/docs/sdk/api-reference/timeseries-client)**: Access local technical indicators (MA, RSI, etc.) and candlestick history caching.

---

## Data Models & Enums

*   **[Models & Enums](/docs/sdk/api-reference/models-enums)**: Overview of core SDK models (`ApiResult<T>`, `Order`, `Position`, `CandleData`) and enums (`StrategyEventType`, `PtLogLevel`).
*   **[Error Codes](/docs/sdk/api-reference/errors)**: Reference list of server errors, trading errors, and handling guidance.
