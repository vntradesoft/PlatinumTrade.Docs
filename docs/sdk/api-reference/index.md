---
id: sdk-api-reference
title: API Reference
description: Overview of the Platinum Trade SDK Client sub-interfaces and mapping structure.
status: stable
visibility: public
---

# API Reference

The Platinum Trade SDK provides a unified client `IOkxClient` that aggregates specialized sub-clients for interacting with the OKX exchange.

This section contains detailed mapping tables between the SDK methods, the underlying `OKX.Net` library functions, and the official OKX REST API endpoints.

## SDK Client Sub-Interfaces

Select a client interface below to view its detailed API mappings, methods, and OKX endpoint mappings:

*   **[Trading Client (ITradeClient)](./client/trade.md)**: Manage live orders, algorithmic orders, positions, and user trade history.
*   **[Account Client (IAccountClient)](./client/account.md)**: Load wallet balances, set leverage, position modes, and fetch fee levels.
*   **[Instrument Client (IInstrumentClient)](./client/instrument.md)**: Retrieve market price tickers, order books, spreads, margin tiers, and price limits.
*   **[Time Series Client (ITimeSeriesClient)](./client/timeseries-and-indicators/index.md)**: Access local technical indicators (MA, RSI, etc.) and candlestick history caching.

---

## Data Models & Enums

*   **[Models & Enums](./models.md)**: Overview of core SDK models (`ApiResult<T>`, `Order`, `Position`, `CandleData`) and enums (`StrategyEventType`, `PtLogLevel`).
*   **[Error Codes](./errors/errors.md)**: Reference list of server errors, trading errors, and handling guidance.
