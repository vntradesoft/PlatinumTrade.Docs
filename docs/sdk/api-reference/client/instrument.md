---
id: sdk-instrument-client
title: Instrument API
sidebar_label: Instrument
sidebar_position: 1
---
# Instrument API
The Instrument API (`Context.Instrument`) provides market price data, trading rules, tick sizes, and symbol utilities.

The `IInstrumentClient` interface provides access to:

- Instrument metadata
- Market prices and spreads
- Trading rules and normalization
- Fees and margin information
- Symbol utilities

:::info[Notice]
Currently, only OKX linear perpetual swap instruments are supported. Spot, Futures, Options, inverse contracts, and other instrument types are not supported.
:::

---

## Basic Info

### `InstrumentType`
Gets the type of trading instrument handled by this client.

**Syntax**

```csharp
InstrumentType InstrumentType { get; }
```

**Parameters**

None.

**Return Value**

The [`InstrumentType`](../enums#instrumenttype) value handled by this client.
Currently, this value is always `InstrumentType.Swap`.

**Remarks**

Useful when sharing common logic across different bot instances.

**Example**

```csharp
if (Context.Instrument.InstrumentType == InstrumentType.Swap)
{
    // Handle swap specific logic
}
```

---

### `IsSymbol`

Determines whether the specified symbol is supported by the current trading environment.

**Syntax**

```csharp
bool IsSymbol(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol to validate. |

**Return Value**

`true` if the symbol is supported; otherwise, `false`.

**Remarks**

This method checks whether the specified symbol exists in the list of supported perpetual swap instruments.

**Example**

```csharp
bool supported = Context.Instrument.IsSymbol("BTC-USDT-SWAP");

if (supported)
{
    Context.Logger.LogInformation(
        "Symbol",
        "BTC-USDT-SWAP is supported.");
}
```

---

### `TotalSymbols`
Gets the total number of perpetual swap symbols supported by the current trading environment.

**Syntax**

```csharp
int TotalSymbols();
```

**Parameters**

None.

**Return Value**

The total number of available perpetual swap symbols.

**Remarks**

This value represents the number of perpetual swap symbols available in the current environment, not the number of symbols actively traded by a strategy.

**Example**

```csharp
int totalSymbols = Context.Instrument.TotalSymbols();

Context.Logger.LogInformation(
    "Symbols",
    $"Available symbols: {totalSymbols}");
```

---

### `QuoteAsset`
Gets the quote asset for the specified perpetual swap symbol.

**Syntax**

```csharp
string QuoteAsset(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |

**Return Value**

The quote asset string (e.g., `"USDT"`).

**Remarks**

For `BTC-USDT-SWAP`, the quote asset is `USDT`.

**Example**

```csharp
string quoteAsset = Context.Instrument.QuoteAsset("BTC-USDT-SWAP");
// quoteAsset == "USDT"
```

---

### `BaseAsset`
Gets the base asset for the specified symbol.

**Syntax**

```csharp
string BaseAsset(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |

**Return Value**

The base asset string (e.g., `"BTC"`).

**Remarks**

For `BTC-USDT-SWAP`, the base asset is `BTC`.

**Example**

```csharp
string baseAsset = Context.Instrument.BaseAsset("BTC-USDT-SWAP");
// baseAsset == "BTC"
```

---

### `Underlying`
Gets the underlying asset for the specified perpetual swap symbol.

**Syntax**

```csharp
string Underlying(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |

**Return Value**

The underlying asset string (e.g., `"BTC-USDT"`).

**Example**

```csharp
string underlying = Context.Instrument.Underlying("BTC-USDT-SWAP");
```

---

## Market Data

### `GetLastPriceAsync`
Gets the last traded price for the specified symbol.

**Syntax**

```csharp
Task<ApiResult<decimal>> GetLastPriceAsync(string symbol, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the last price.

**Remarks**

Use this for evaluating current market conditions.

**Example**

```csharp
var priceRes = await Context.Instrument.GetLastPriceAsync("BTC-USDT-SWAP");
if (priceRes.Success)
{
    decimal lastPrice = priceRes.Data;
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/market/ticker`](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-ticker) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.ExchangeData.GetTickerAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetMarkPriceAsync`
Gets the mark price for the specified perpetual swap symbol.

**Syntax**

```csharp
Task<ApiResult<decimal>> GetMarkPriceAsync(string symbol, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the mark price.

**Remarks**

The mark price is used by the exchange for liquidation calculations and funding rate settlement. It differs from the last traded price and is typically more stable.

**Example**

```csharp
var markRes = await Context.Instrument.GetMarkPriceAsync("BTC-USDT-SWAP");
if (markRes.Success)
{
    decimal markPrice = markRes.Data;
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/public/mark-price`](https://www.okx.com/docs-v5/en/#public-data-api-get-mark-price) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.ExchangeData.GetMarkPricesAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetBidAsync`
Gets the current best bid price for the specified symbol.

**Syntax**

```csharp
Task<ApiResult<decimal>> GetBidAsync(string symbol, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the best bid price.

**Remarks**
The bid price represents the highest price currently offered by buyers.

**Example**

```csharp
var bidRes = await Context.Instrument.GetBidAsync("BTC-USDT-SWAP");
if (bidRes.Success)
{
    decimal bid = bidRes.Data;
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/market/ticker`](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-ticker) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.ExchangeData.GetTickerAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetAskAsync`
Gets the current best ask price for the specified symbol.

**Syntax**

```csharp
Task<ApiResult<decimal>> GetAskAsync(string symbol, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the best ask price.

**Remarks**
The ask price represents the lowest price currently offered by sellers.

**Example**

```csharp
var askRes = await Context.Instrument.GetAskAsync("BTC-USDT-SWAP");
if (askRes.Success)
{
    decimal ask = askRes.Data;
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/market/ticker`](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-ticker) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.ExchangeData.GetTickerAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetSpreadAsync`
Gets the spread (difference between ask and bid prices) for the specified symbol.

**Syntax**

```csharp
Task<ApiResult<decimal>> GetSpreadAsync(string symbol, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the spread value (`Ask - Bid`).

**Remarks**
Spread = Ask Price - Bid Price.
If the bid price is `100` and the ask price is `101`, the spread is `1`.

**Example**

```csharp
var spreadRes = await Context.Instrument.GetSpreadAsync("BTC-USDT-SWAP");
if (spreadRes.Success)
{
    decimal spread = spreadRes.Data;
}
```

---

### `GetBidAskSpreadAsync`
Gets the bid price, ask price, and spread for the specified symbol in a single call.

**Syntax**

```csharp
Task<ApiResult<(decimal Bid, decimal Ask, decimal Spread)>> GetBidAskSpreadAsync(string symbol, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping a tuple with `Bid`, `Ask`, and `Spread`.

**Remarks**

Prefer this over calling `GetBidAsync`, `GetAskAsync`, and `GetSpreadAsync` separately to reduce API round trips.

**Example**

```csharp
var res = await Context.Instrument.GetBidAskSpreadAsync("BTC-USDT-SWAP");
if (res.Success)
{
    var (bid, ask, spread) = res.Data;
    Context.Logger.LogInformation("Market", $"Bid: {bid}, Ask: {ask}, Spread: {spread}");
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/market/ticker`](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-ticker) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.ExchangeData.GetTickerAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetHighPriceAsync`
Gets the 24-hour high price for the specified symbol.

**Syntax**

```csharp
Task<ApiResult<decimal>> GetHighPriceAsync(string symbol, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the high price.

**Example**

```csharp
var highRes = await Context.Instrument.GetHighPriceAsync("BTC-USDT-SWAP");
if (highRes.Success)
{
    decimal high = highRes.Data;
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/market/ticker`](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-ticker) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.ExchangeData.GetTickerAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetLowPriceAsync`
Gets the 24-hour low price for the specified symbol.

**Syntax**

```csharp
Task<ApiResult<decimal>> GetLowPriceAsync(string symbol, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the low price.

**Example**

```csharp
var lowRes = await Context.Instrument.GetLowPriceAsync("BTC-USDT-SWAP");
if (lowRes.Success)
{
    decimal low = lowRes.Data;
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/market/ticker`](https://www.okx.com/docs-v5/en/#order-book-trading-market-data-get-ticker) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.ExchangeData.GetTickerAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetLimitPriceAsync`
Gets the exchange-defined upper and lower limit prices for the specified symbol.

**Syntax**

```csharp
Task<ApiResult<LimitPrice>> GetLimitPriceAsync(string symbol, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An [`ApiResult`](../models.md#apiresult) wrapping the [`LimitPrice`](../models#limitprice) data.

**Remarks**

Exchanges restrict how far from the mark price a limit order can be placed.

**Example**

```csharp
var limits = await Context.Instrument.GetLimitPriceAsync("BTC-USDT-SWAP");
if (limits.Success)
{
    decimal maxBuy = limits.Data.BuyLimit;
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/public/price-limit`](https://www.okx.com/docs-v5/en/#public-data-api-get-price-limits) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.ExchangeData.GetPriceLimitsAsync`](https://github.com/JKorf/OKX.Net) |

---

## Fees & Margin

### `GetFeeTaker`
Gets the taker trading fee for the specified symbol.

**Syntax**

```csharp
decimal GetFeeTaker(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |

**Return Value**

The taker fee as a decimal (e.g., `0.001` for 0.1%).

**Remarks**

Applied when an order immediately matches existing liquidity in the order book.

**Example**

```csharp
decimal feeRate = Context.Instrument.GetFeeTaker("BTC-USDT-SWAP");
decimal totalFee = orderValue * feeRate;
```

---

### `GetFeeMaker`
Gets the maker trading fee for the specified symbol.

**Syntax**

```csharp
decimal GetFeeMaker(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |

**Return Value**

The maker fee as a decimal (e.g., `0.0002` for 0.02%).

**Remarks**

Applied when an order is added to the order book and provides liquidity (e.g., a resting limit order).

**Example**

```csharp
decimal makerFee = Context.Instrument.GetFeeMaker("BTC-USDT-SWAP");
decimal estimatedFee = orderValue * makerFee;
```

---

### `GetMaintMarginRateAsync`
Gets the maintenance margin rate for the specified symbol and position notional.

**Syntax**

```csharp
Task<decimal> GetMaintMarginRateAsync(string symbol, decimal positionNotional, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `positionNotional` | `decimal` | The notional value of the position. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

The maintenance margin rate as a decimal.

**Remarks**

The maintenance margin rate varies by position size tier. Use this to estimate liquidation distance or risk exposure.

**Example**

```csharp
decimal notional = 50000m; // $50,000 position
decimal mmRate = await Context.Instrument.GetMaintMarginRateAsync("BTC-USDT-SWAP", notional);
decimal maintMargin = notional * mmRate;
```

---

### `ContractSize`
Gets the contract size for the specified perpetual swap symbol.

**Syntax**

```csharp
decimal ContractSize(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |

**Return Value**

The contract size.

**Remarks**

Determines the notional value represented by a single contract.

**Example**

```csharp
decimal size = Context.Instrument.ContractSize("BTC-USDT-SWAP");
```

---

### `ContractMultiplier`
Gets the contract multiplier for the specified perpetual swap symbol.

**Syntax**

```csharp
decimal ContractMultiplier(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |

**Return Value**

The contract multiplier value.

**Remarks**

Used to compute the actual position notional from the number of contracts. The notional value equals `contracts × ContractSize × ContractMultiplier × price`.

**Example**

```csharp
decimal multiplier = Context.Instrument.ContractMultiplier("BTC-USDT-SWAP");
```

---

## Trading Rules

### `GetPrecisionPrice`
Gets the price precision (number of decimal places) for the specified symbol.

**Syntax**

```csharp
int GetPrecisionPrice(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |

**Return Value**

The number of decimal places allowed for prices.

**Example**

```csharp
int pricePrecision = Context.Instrument.GetPrecisionPrice("BTC-USDT-SWAP");
// e.g., 1 means prices like 65123.4
```

---

### `GetPrecisionLot`
Gets the lot size precision (number of decimal places) for the specified symbol.

**Syntax**

```csharp
int GetPrecisionLot(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |

**Return Value**

The number of decimal places allowed for lot sizes.

**Example**

```csharp
int lotPrecision = Context.Instrument.GetPrecisionLot("BTC-USDT-SWAP");
```

---

### `GetTickPrice`
Gets the tick size (minimum price increment) for the specified symbol.

**Syntax**

```csharp
decimal GetTickPrice(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |

**Return Value**

The tick size value.

**Remarks**

Useful when iterating or shifting prices by discrete steps.

**Example**

```csharp
decimal tick = Context.Instrument.GetTickPrice("BTC-USDT-SWAP");
decimal nextPrice = currentPrice + tick;
```

---

### `GetLimitLotSize`
Gets the minimum, maximum, and step size for lot orders for the specified symbol.

**Syntax**

```csharp
(decimal MinQuantity, decimal MaxQuantity, decimal StepSize) GetLimitLotSize(string symbol, bool isMarket);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `isMarket` | `bool` | `true` for market orders; `false` for limit orders. |

**Return Value**

A tuple with:

| Field | Type | Description |
|---|---|---|
| `MinQuantity` | `decimal` | Minimum lot size. |
| `MaxQuantity` | `decimal` | Maximum lot size. |
| `StepSize` | `decimal` | Minimum increment between lot sizes. |

**Example**

```csharp
var (min, max, step) = Context.Instrument.GetLimitLotSize("BTC-USDT-SWAP", isMarket: false);
if (desiredLot < min) desiredLot = min;
```

---

### `GetLimitMaxCost`
Gets the maximum allowed order cost for the specified symbol.

**Syntax**

```csharp
decimal GetLimitMaxCost(string symbol, bool isMarket);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `isMarket` | `bool` | `true` for market orders; `false` for limit orders. |

**Return Value**

The maximum cost value (in quote currency).

**Example**

```csharp
decimal maxCost = Context.Instrument.GetLimitMaxCost("BTC-USDT-SWAP", isMarket: false);
```

---

### `NormalizeLot`
Normalizes the lot size according to exchange rules.

**Syntax**

```csharp
decimal NormalizeLot(string symbol, decimal lot, bool isMarket, bool roundUp = false);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `lot` | `decimal` | The lot size to normalize. |
| `isMarket` | `bool` | `true` for market orders; `false` for limit orders. |
| `roundUp` | `bool` | `true` to round up; `false` to round down. Default is `false`. |

**Return Value**

The normalized lot size conforming to exchange step size and precision requirements.

**Remarks**

Always use this before placing an order to avoid rejection due to invalid lot size.

**Example**

```csharp
decimal rawLot = 0.123456m;
decimal validLot = Context.Instrument.NormalizeLot("BTC-USDT-SWAP", rawLot, isMarket: false);
```

---

### `NormalizePrice`
Normalizes a price according to exchange tick sizes and precision rules.

**Syntax**

```csharp
decimal NormalizePrice(string symbol, decimal price, bool roundUp = false);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `price` | `decimal` | The raw price. |
| `roundUp` | `bool` | `true` to round up to nearest tick; `false` to round down. Default is `false`. |

**Return Value**

The normalized price.

**Remarks**

Always use this before placing a limit order to prevent precision errors.

**Example**

```csharp
decimal rawTarget = 65123.4567m;
decimal validPrice = Context.Instrument.NormalizePrice("BTC-USDT-SWAP", rawTarget);
// validPrice might be 65123.4m
```

---

## Utilities

### `GetCurrentTime`
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

During backtesting, this method returns the simulated strategy time rather than the local system time.

:::tip[Notice]
Always use this method instead of `DateTime.Now` or `DateTime.UtcNow` when developing strategies to ensure consistent behavior in both live trading and backtesting environments.
:::

**Example**

```csharp
DateTime now = Context.Instrument.GetCurrentTime();
if (now.Hour == 14) { /* handle 2 PM logic */ }
```

---

### `SymbolCode`
Gets the unique numeric code for the specified trading symbol.

**Syntax**

```csharp
long SymbolCode(string symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol string. |

**Return Value**

A `long` integer uniquely identifying the symbol.

**Remarks**

Symbol codes are useful for high-performance scenarios where string comparisons are too slow, such as dictionary keys or bitwise lookups.

**Example**

```csharp
long code = Context.Instrument.SymbolCode("BTC-USDT-SWAP");
```

---

### `Symbol`
Gets the trading symbol string for the specified numeric symbol code.

**Syntax**

```csharp
string Symbol(long symbolCode);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbolCode` | `long` | The unique symbol code. |

**Return Value**

The trading symbol string (e.g., `"BTC-USDT-SWAP"`).

**Remarks**

This is the reverse lookup of [`SymbolCode`](#symbolcode).

**Example**

```csharp
long code = Context.Instrument.SymbolCode("BTC-USDT-SWAP");
string symbol = Context.Instrument.Symbol(code);
// symbol == "BTC-USDT-SWAP"
```
