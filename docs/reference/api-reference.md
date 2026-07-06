---
id: reference-api-reference
title: API Reference
description: SDK public interface and model catalog
status: draft
visibility: public
---

# API Reference

## SDK Interfaces

| Interface | Purpose |
|---|---|
| IOkxClient | Root SDK client entry point |
| IIndicatorPlugin | Indicator plugin registration contract |
| IStrategyPlugin | Strategy plugin registration contract |
| IStrategy | Strategy runtime lifecycle contract |
| IStoragePathProvider | Storage path override contract |
| IHistoryCandleDownloader | History candle download contract |

## Models

| Model | Description |
|---|---|
| `ApiResult<T>` | Generic response wrapper with success flag |
| ApiError | Error detail from API response |
| CandleData | OHLCV candle record |
| TickData | Intra-bar tick snapshot |
| Order | Exchange order state |
| Position | Open position state |
| Transaction | Trade fill record |
| StrategyEvent | Base event dispatched to strategy |

## Enums

| Enum | Values |
|---|---|
| StrategyEventType | Order, Balance, Position, AlgoOrder, Kline, Transaction, TradeCommand, Tick |
| StorageType | Binary, Csv |
| PtLogLevel | Critical, Error, Warning, Success, Information, Debug, Trace |

## Related Docs

- [SDK Overview](../sdk/intro.md)
- [Trading Client](../sdk/trading-client.md)
- [SDK Error Handling](../sdk/api-result.md)
