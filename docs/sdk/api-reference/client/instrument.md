---
id: sdk-instrument-client
title: Instrument API
sidebar_label: Instrument
sidebar_position: 1
---
# Instrument API
The Instrument API (`Context.Instrument`) provides market price data, trading rules, tick sizes, and symbol utilities.

## Properties Overview
| Property | Description |
|---|---|
| [InstrumentType](#instrumenttype) | Gets the type of trading instrument handled by this client. |

## Methods Overview
| Method | Description |
|---|---|
| [IsSymbol](#issymbol) | Checks if the specified symbol is a valid and tracked trading symbol. |
| [TotalSymbols](#totalsymbols) | Gets the total number of trading symbols currently tracked by the bot. |
| [QuoteAsset](#quoteasset) | Gets the quote asset for the specified symbol. |
| [BaseAsset](#baseasset) | Gets the base asset for the specified symbol. |
| [Underlying](#underlying) | Gets the underlying asset index for the specified derivatives symbol. |
| [GetLastPriceAsync](#getlastpriceasync) | Gets the last traded price for the specified symbol. |
| [GetBidAskSpreadAsync](#getbidaskspreadasync) | Gets the bid, ask, and spread for the specified symbol in a single call. |
| [GetLimitPriceAsync](#getlimitpriceasync) | Gets the maximum/minimum limit prices allowed for the specified symbol. |
| [NormalizePrice](#normalizeprice) | Normalizes a price according to exchange tick sizes and precision rules. |
| [NormalizeLot](#normalizelot) | Normalizes a lot size (quantity) according to exchange rules. |
| [GetTickPrice](#gettickprice) | Gets the tick size (minimum price increment) for the specified symbol. |
| [GetFeeTaker](#getfeetaker) | Gets the taker trading fee for the specified symbol. |
| [GetMaintMarginRateAsync](#getmaintmarginrateasync) | Gets the maintenance margin rate for a specific position size. |
| [ContractSize](#contractsize) | Gets the contract size for the specified symbol (Futures/Swap). |
| [GetCurrentTime](#getcurrenttime) | Gets the current system time from the client's perspective. |

## `InstrumentType`
Gets the type of trading instrument handled by this client.

**Syntax**

```csharp
InstrumentType InstrumentType { get; }
```

**Parameters**

None.

**Return Value**

The `InstrumentType` enum value (e.g., Futures, Spot).

**Remarks**

Useful when sharing common logic across different bot instances.

**Example**

```csharp
if (Context.Instrument.InstrumentType == InstrumentType.Spot)
{
    // Handle spot specific logic
}
```

## `TotalSymbols`
Gets the total number of trading symbols currently tracked by the bot.

**Syntax**

```csharp
int TotalSymbols();
```

**Parameters**

None.

**Return Value**

The integer count of tracked symbols.

**Remarks**

Usually 1 for single-pair bots, or multiple for multi-pair bots.

**Example**

```csharp
int count = Context.Instrument.TotalSymbols();
Context.Logger.LogInformation("Symbols", $"Tracking {count} pairs");
```

## `BaseAsset`
Gets the base asset for the specified symbol.

**Syntax**

```csharp
string BaseAsset(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |

**Return Value**

The base asset string (e.g., "BTC").

**Remarks**

For BTC-USDT, the base asset is BTC.

**Example**

```csharp
string baseAsset = Context.Instrument.BaseAsset("BTC-USDT");
```

## `GetFeeTaker`
Gets the taker trading fee for the specified symbol.

**Syntax**

```csharp
decimal GetFeeTaker(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |

**Return Value**

The taker fee as a decimal (e.g., 0.001 for 0.1%).

**Remarks**

Applied when your order executes immediately against the orderbook.

**Example**

```csharp
decimal feeRate = Context.Instrument.GetFeeTaker("BTC-USDT");
decimal totalFee = orderValue * feeRate;
```

## `ContractSize`
Gets the contract size for the specified symbol (Futures/Swap).

**Syntax**

```csharp
decimal ContractSize(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |

**Return Value**

The contract size.

**Remarks**

Determines the actual value multiplier for one contract.

**Example**

```csharp
decimal size = Context.Instrument.ContractSize("BTC-USDT-SWAP");
```

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

## `GetLastPriceAsync`
Gets the last traded price for the specified symbol.

**Syntax**

```csharp
Task<ApiResult<decimal>> GetLastPriceAsync(string symbol, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An `ApiResult` wrapping the last price.

**Remarks**

Use this for evaluating current market conditions.

**Example**

```csharp
var priceRes = await Context.Instrument.GetLastPriceAsync("BTC-USDT");
if (priceRes.Success)
{
    decimal lastPrice = priceRes.Data;
}
```

## `GetLimitPriceAsync`
Gets the maximum/minimum limit prices allowed for the specified symbol.

**Syntax**

```csharp
Task<ApiResult<LimitPrice>> GetLimitPriceAsync(string symbol, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An `ApiResult` wrapping the `LimitPrice` data.

**Remarks**

Exchanges restrict how far from the mark price a limit order can be placed.

**Example**

```csharp
var limits = await Context.Instrument.GetLimitPriceAsync("BTC-USDT");
if (limits.Success)
{
    decimal maxBuy = limits.Data.BuyLimit;
}
```

## `GetCurrentTime`
Gets the current system time from the client's perspective.

**Syntax**

```csharp
DateTime GetCurrentTime();
```

**Parameters**

None.

**Return Value**

The current system time as a `DateTime`.

**Remarks**

During backtests, this returns the simulated time, not the real computer time.

**Example**

```csharp
DateTime now = Context.Instrument.GetCurrentTime();
if (now.Hour == 14) { /* handle 2 PM logic */ }
```

## `NormalizePrice`
Normalizes a price according to exchange tick sizes and precision rules.

**Syntax**

```csharp
decimal NormalizePrice(string symbol, decimal price, bool roundUp = false);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |
| `price` | [`decimal`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The raw price. |
| `roundUp` | [`bool`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | True to round up to nearest tick; false to round down. |

**Return Value**

The normalized price.

**Remarks**

Always use this before placing a limit order to prevent precision errors.

**Example**

```csharp
decimal rawTarget = 65123.4567m;
decimal validPrice = Context.Instrument.NormalizePrice("BTC-USDT", rawTarget);
// validPrice might be 65123.4m
```

## `GetTickPrice`
Gets the tick size (minimum price increment) for the specified symbol.

**Syntax**

```csharp
decimal GetTickPrice(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |

**Return Value**

The tick size value.

**Remarks**

Useful when iterating or shifting prices by discrete steps.

**Example**

```csharp
decimal tick = Context.Instrument.GetTickPrice("BTC-USDT");
decimal nextPrice = currentPrice + tick;
```

