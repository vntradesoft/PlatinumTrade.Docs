---
id: enums
title: SDK Enums
sidebar_position: 10
---

# SDK Enums

## ApiErrorType

/// SDK error classification used by API result wrappers.
    ///

| Value | Description |
|---|---|
| `Unknown` | Unknown or unclassified error. |
| `Network` | Network or connection error, such as timeout or DNS failure. |
| `InternalError` | Internal error within the SDK or application. |
| `ServerError` | The server returned a non-success HTTP status code. |
| `Authentication` | Authentication failed, such as invalid API key or signature mismatch. |
| `RateLimit` | The request was rate-limited by OKX. |
| `Deserialization` | The response could not be parsed because of an unexpected format. |
| `BusinessLogic` | Business logic error returned by OKX, such as insufficient funds. |

## ApiName

/// OKX API operation names used for logging and error context.
    ///

| Value | Description |
|---|---|
| `PlaceOrder` | Place an order. |
| `CancelOrder` | Cancel an order. |
| `CancelMultipleOrder` | Cancel multiple orders. |
| `ModifyOrder` | Modify an order. |
| `PlaceAlgoOrder` | Place an algorithmic order. |
| `CancelAlgoOrder` | Cancel an algorithmic order. |
| `ClosePosition` | Close a position. |
| `GetOrders` | Get open orders. |
| `GetPositions` | Get positions. |
| `GetAlgoOrder` | Get one algorithmic order. |
| `GetHistoryOrders` | Get historical orders. |
| `GetHistoryAlgoOrders` | Get historical algorithmic orders. |
| `GetHistoryPositions` | Get historical positions. |
| `GetUserTrade` | Get user trades. |
| `GetOrder` | Get one order. |
| `AmendAlgoOrder` | Amend an algorithmic order. |
| `AmendOrder` | Amend an order. |
| `GetAlgoOrders` | Get algorithmic orders. |
| `OrderCheck` | Check an order before placement. |
| `GetUserTradesArchive` | Get archived user trades. |
| `GetOrdersArchive` | Get archived orders. |

## InstrumentType

/// OKX instrument types.
    ///

| Value | Description |
|---|---|
| `Any` | Any supported instrument type. |
| `Spot` | Spot instrument. |
| `Margin` | Margin instrument. |
| `Swap` | Perpetual swap instrument. |
| `Futures` | Futures instrument. |
| `Option` | Option instrument. |

## OrderSide

/// Order direction.
    ///

| Value | Description |
|---|---|
| `Buy` | Buy order. |

## OrderType

/// OKX order types used by trading requests.
    ///

| Value | Description |
|---|---|
| `Market` | Market order. |
| `Limit` | Limit order. |
| `PostOnly` | Post-only order. |
| `FillOrKill` | Fill-or-kill order. |
| `ImmediateOrCancel` | Immediate-or-cancel order. |
| `OptimalLimitOrder` | Optimal limit order. |
| `MarketMakerProtection` | Market maker protection order. |
| `MarketMakerProtectionPostOnly` | Post-only market maker protection order. |

## PositionSide

/// Position side in long/short or net position mode.
    ///

| Value | Description |
|---|---|
| `Long` | Long position side. |
| `Short` | Short position side. |

## PtLogLevel

/// Log severity used by OKX strategy and SDK components.
    ///

| Value | Description |
|---|---|
| `Critical` | Critical failure. |
| `Error` | Error. |
| `Warning` | Warning. |
| `Success` | Successful operation. |
| `Core` | Core system message. |
| `Information` | Informational message. |
| `Debug` | Debug message. |
| `Trace` | Trace message. |

## Timeframe



| Value | Description |
|---|---|
| `Unknown` | Unknown or unspecified timeframe. |
| `OneSecond` | One second (1 second). |
| `OneMinute` | One minute (60 seconds). |
| `ThreeMinutes` | Three minutes (180 seconds). |
| `FiveMinutes` | Five minutes (300 seconds). |
| `FifteenMinutes` | Fifteen minutes (900 seconds). |
| `ThirtyMinutes` | Thirty minutes (1800 seconds). |
| `OneHour` | One hour (3600 seconds). |
| `TwoHours` | Two hours (7200 seconds). |
| `FourHours` | Four hours (14400 seconds). |
| `SixHours` | Six hours (21600 seconds). |
| `TwelveHours` | Twelve hours (43200 seconds). |
| `OneDay` | One day (86400 seconds). |
| `OneWeek` | One week (604800 seconds). |

## TradeMode

/// OKX trade modes.
    ///

| Value | Description |
|---|---|
| `Cross` | Cross margin mode. |
| `Isolated` | Isolated margin mode. |
| `Cash` | Cash mode. |

