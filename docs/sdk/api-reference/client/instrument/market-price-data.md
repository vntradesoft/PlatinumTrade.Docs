---
id: sdk-inst-market-price-data
title: Market Price Data
sidebar_label: Market Price Data
---
# Market Price Data

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

---

## `GetBidAskSpreadAsync`
Gets the bid, ask, and spread for the specified symbol in a single call.

**Syntax**

```csharp
Task<ApiResult<(decimal Bid, decimal Ask, decimal Spread)>> GetBidAskSpreadAsync(string symbol, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | The trading symbol. |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

An `ApiResult` wrapping a tuple with Bid, Ask, and Spread.

**Remarks**

This is more efficient than calling GetBid, GetAsk, and GetSpread separately.

**Example**

```csharp
var data = await Context.Instrument.GetBidAskSpreadAsync("BTC-USDT");
if (data.Success)
{
    decimal spread = data.Data.Spread;
}
```

---

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

---
