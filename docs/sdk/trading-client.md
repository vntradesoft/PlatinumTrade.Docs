---
id: sdk-trading-client
title: Trading Client
description: Placing orders, managing positions and balances
status: draft
visibility: internal
publish: false
---

# Using the Trading Client

`ITradeClient` and `IAccountClient` provide the full suite of trading and account management functionality on OKX.

## ITradeClient — Overview

Access `ITradeClient` via `IOkxClient.Trade`:

```csharp
var trade = client.Trade;
```

### Available Methods

| Method Group | Description |
|---|---|
| `PlaceOrderAsync` | Place a Limit / Market order |
| `PlaceAlgoOrderAsync` | Place a TP/SL, Trailing Stop, or Trigger order |
| `AmendOrderAsync` / `AmendAlgoOrderAsync` | Modify an open order |
| `CancelOrderAsync` / `CancelAlgoOrderAsync` | Cancel an order |
| `GetOrderAsync` / `GetOrdersAsync` | Query order details |
| `GetPositionsAsync` | Query open positions |
| `GetHistoryOrdersAsync` | Order history (up to 7 days) |
| `GetUserTradeAsync` | Trade history (fills) |
| `ClosePositionAsync` | Close a position |
| `OrderCheckAsync` | Pre-trade validation (dry run) |

## Placing Orders

### Market Order

```csharp
var result = await client.Trade.PlaceOrderAsync(
    symbol: "BTC-USDT",
    side: OrderSide.Buy,
    type: OrderType.Market,
    quantity: 0.01m);

if (result.GetResultOrError(out var order, out var error))
{
    logger.LogEntry("BTC-USDT", OrderSide.Buy, 0.01m,
        order.Price, sl: 0, tp: 0);
}
else
{
    logger.LogError(new Exception(error.Message), "PlaceOrder Failed");
}
```

### Limit Order

```csharp
var result = await client.Trade.PlaceOrderAsync(
    symbol: "BTC-USDT",
    side: OrderSide.Buy,
    type: OrderType.Limit,
    quantity: 0.01m,
    price: 95000m);
```

### Limit Order with Attached TP/SL

```csharp
var result = await client.Trade.PlaceOrderAsync(
    symbol: "BTC-USDT",
    side: OrderSide.Buy,
    type: OrderType.Limit,
    quantity: 0.01m,
    price: 95000m,
    attachedAlgoOrder: new AttachedAlgoOrder
    {
        TakeProfitTriggerPrice = 100000m,
        StopLossTriggerPrice = 93000m
    });
```

## Placing Algo Orders (TP/SL)

```csharp
// Stop Loss
var slResult = await client.Trade.PlaceAlgoOrderAsync(
    symbol: "BTC-USDT",
    orderSide: OrderSide.Sell,
    algoOrderType: AlgoOrderType.StopLoss,
    quantity: 0.01m,
    slTriggerPrice: 93000m,
    slOrderPrice: -1m,  // Market price
    reduceOnly: true);

// Take Profit
var tpResult = await client.Trade.PlaceAlgoOrderAsync(
    symbol: "BTC-USDT",
    orderSide: OrderSide.Sell,
    algoOrderType: AlgoOrderType.TakeProfit,
    quantity: 0.01m,
    tpTriggerPrice: 100000m,
    tpOrderPrice: -1m,
    reduceOnly: true);
```

## Amending Orders

```csharp
var result = await client.Trade.AmendOrderAsync(
    symbol: "BTC-USDT",
    orderId: 12345678L,
    newPrice: 96000m,
    newQuantity: 0.02m);
```

## Cancelling Orders

### Cancel a Single Order

```csharp
var result = await client.Trade.CancelOrderAsync(
    symbol: "BTC-USDT",
    orderId: 12345678L);
```

### Cancel Multiple Orders

```csharp
var orders = new[]
{
    new OrderCancelRequest { Symbol = "BTC-USDT", OrderId = 111 },
    new OrderCancelRequest { Symbol = "BTC-USDT", OrderId = 222 },
};
var result = await client.Trade.CancelMultipleOrdersAsync(orders);
```

## Closing a Position

```csharp
var result = await client.Trade.ClosePositionAsync(
    symbol: "BTC-USDT",
    autoCancel: true);  // Automatically cancel pending orders
```

## Querying Orders & Positions

### Open Positions

```csharp
var result = await client.Trade.GetPositionsAsync(symbol: "BTC-USDT");

if (result.GetResultOrError(out var positions, out var error))
{
    foreach (var pos in positions)
    {
        logger.LogDebug("Position",
            "Side={Side} Qty={Qty} PnL={Pnl}",
            pos.PositionSide, pos.Quantity, pos.UnrealizedPnl);
    }
}
```

### Open Orders

```csharp
var result = await client.Trade.GetOrdersAsync(symbol: "BTC-USDT");
```

### Order History

```csharp
// Last 7 days
var recent = await client.Trade.GetHistoryOrdersAsync(
    symbol: "BTC-USDT",
    startTime: DateTime.UtcNow.AddDays(-7));

// Archive (> 3 months)
var archive = await client.Trade.GetOrdersArchiveAsync(
    symbol: "BTC-USDT");
```

## Pre-trade Check

Validate an order before actually placing it (dry run):

```csharp
var check = await client.Trade.OrderCheckAsync(
    symbol: "BTC-USDT",
    side: OrderSide.Buy,
    type: OrderType.Limit,
    quantity: 0.01m,
    price: 95000m);

if (check)
    logger.LogDebug("Check", "Order would succeed");
else
    logger.LogWarning("Check", "Order would fail: {Msg}", check.Error!.Message);
```

## Magic Number

Use a magic number to distinguish orders from different bots:

```csharp
var (success, errorMsg) = client.Trade.SetMagicNumber("BOT_A_001");
if (!success)
    logger.LogWarning("MagicNumber", errorMsg);
```

## IAccountClient — Account Management

Access `IAccountClient` via `IOkxClient.Account`:

```csharp
var account = client.Account;
```

### Balance Properties

```csharp
decimal wallet    = account.WalletBalance;      // Actual balance (excluding unrealized PnL)
decimal available = account.AvailableBalance;    // Balance available to open new positions
decimal equity    = account.Equity;              // Wallet + Unrealized PnL
decimal upnl      = account.UnrealizedPnL;       // Unrealized profit and loss
decimal margin    = account.InitialMargin;       // Initial margin currently in use
```

### Leverage & Position Mode

```csharp
// Set leverage
await account.SetInitialLeverageAsync("BTC-USDT", leverage: 10);

// Get leverage
decimal lev = account.GetLeverage("BTC-USDT");

// Set Hedge Mode
await account.SetHedgeModeAsync(hedge: true);
bool isHedge = account.IsHedgeMode();
```

### Risk Analytics

```csharp
decimal equity      = account.GetCurrentEquity();
decimal equityPct   = account.GetEquityChangePercentage();
decimal marginRatio = account.GetMarginRatio();     // >= 100% → liquidation risk
decimal drawdown    = account.GetCurrentDrawdown();
```

## See also

- [ITradeClient](xref:Pt.Okx.Sdk.Clients.Trading.ITradeClient) API Reference
- [IAccountClient](xref:Pt.Okx.Sdk.Clients.Account.IAccountClient) API Reference
- [ApiResult Pattern](api-result.md) — Error handling for trade operations
- [Market Data & Indicators](market-data.md) — Reading price data