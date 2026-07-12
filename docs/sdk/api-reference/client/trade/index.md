---
id: sdk-trade-client
title: Trade API
sidebar_label: Trade
sidebar_position: 3
---
# Trade API
The Trade API (`Context.Trade`) manages placing, amending, cancelling orders, closing positions, and querying live or historical trading data.

## Methods Overview
| Method | Description |
|---|---|
| [PlaceOrderAsync](order-placement.md#placeorderasync) | Places a new standard trading order (Limit, Market, etc.). |
| [PlaceAlgoOrderAsync](order-placement.md#placealgoorderasync) | Places an Algo order (Take Profit, Stop Loss, Trailing Stop, etc.). |
| [OrderCheckAsync](order-placement.md#ordercheckasync) | Checks a potential order (pre-trade check) without actually placing it. |
| [AmendOrderAsync](order-management.md#amendorderasync) | Amends an open limit order (changes quantity or price). |
| [CancelOrderAsync](order-management.md#cancelorderasync) | Cancels a specific open order. |
| [ClosePositionAsync](position-management.md#closepositionasync) | Closes an open position fully at market price. |
| [GetOrderAsync](queries.md#getorderasync) | Gets detailed information for a single order. |
| [GetPositionsAsync](queries.md#getpositionsasync) | Gets a list of all open positions. |
| [GetHistoryOrdersAsync](history.md#gethistoryordersasync) | Gets the history of closed or canceled orders (last 7 days). |
| [SetMagicNumber](utilities.md#setmagicnumber) | Sets the Magic Number to identify the order source. |