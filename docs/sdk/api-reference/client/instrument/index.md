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
| [InstrumentType](basic-info.md#instrumenttype) | Gets the type of trading instrument handled by this client. |

## Methods Overview
| Method | Description |
|---|---|
| [IsSymbol](basic-info.md#issymbol) | Checks if the specified symbol is a valid and tracked trading symbol. |
| [TotalSymbols](basic-info.md#totalsymbols) | Gets the total number of trading symbols currently tracked by the bot. |
| [QuoteAsset](basic-info.md#quoteasset) | Gets the quote asset for the specified symbol. |
| [BaseAsset](basic-info.md#baseasset) | Gets the base asset for the specified symbol. |
| [Underlying](basic-info.md#underlying) | Gets the underlying asset index for the specified derivatives symbol. |
| [GetLastPriceAsync](market-price-data.md#getlastpriceasync) | Gets the last traded price for the specified symbol. |
| [GetBidAskSpreadAsync](market-price-data.md#getbidaskspreadasync) | Gets the bid, ask, and spread for the specified symbol in a single call. |
| [GetLimitPriceAsync](market-price-data.md#getlimitpriceasync) | Gets the maximum/minimum limit prices allowed for the specified symbol. |
| [NormalizePrice](trading-rules.md#normalizeprice) | Normalizes a price according to exchange tick sizes and precision rules. |
| [NormalizeLot](trading-rules.md#normalizelot) | Normalizes a lot size (quantity) according to exchange rules. |
| [GetTickPrice](trading-rules.md#gettickprice) | Gets the tick size (minimum price increment) for the specified symbol. |
| [GetFeeTaker](fees-and-margin.md#getfeetaker) | Gets the taker trading fee for the specified symbol. |
| [GetMaintMarginRateAsync](fees-and-margin.md#getmaintmarginrateasync) | Gets the maintenance margin rate for a specific position size. |
| [ContractSize](fees-and-margin.md#contractsize) | Gets the contract size for the specified symbol (Futures/Swap). |
| [GetCurrentTime](system-utilities.md#getcurrenttime) | Gets the current system time from the client's perspective. |