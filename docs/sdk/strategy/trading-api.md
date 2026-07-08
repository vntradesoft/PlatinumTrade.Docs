---
id: sdk-strategy-trading-api
title: Trading API
description: Placing and managing orders from strategy logic
status: draft
visibility: internal
publish: false
---

# Trading API

The `IOkxClient.Trade` service provides all the capabilities required to manage orders and positions on the exchange.

## Accessing the Client

You can access the API client by injecting `IOkxClient` into your strategy constructor.

```csharp
public class MyStrategy : StrategyBase
{
    private readonly IOkxClient _client;
    
    public MyStrategy(IOkxClient client)
    {
        _client = client;
    }
}
```

## Placing an Order

To enter a position, you use `PlaceOrderAsync`.

```csharp
var result = await _client.Trade.PlaceOrderAsync(
    symbol: "BTC-USDT-SWAP",
    side: OrderSide.Buy,
    type: OrderType.Market,
    quantity: 0.1m,
    ct: ct
);

if (result.Success)
{
    long orderId = result.Data.OrderId;
    _logger.LogInformation("Entry", $"Order {orderId} placed successfully.");
}
else
{
    _logger.LogError("Entry", $"Order failed: {result.Error}");
}
```

## Placing Algo Orders (Take Profit & Stop Loss)

You can attach Take Profit and Stop Loss conditionally using `PlaceAlgoOrderAsync`.

```csharp
var algoResult = await _client.Trade.PlaceAlgoOrderAsync(
    symbol: "BTC-USDT-SWAP",
    orderSide: OrderSide.Sell,           // Oppsite of entry (to close a Buy)
    algoOrderType: AlgoOrderType.Conditional,
    reduceOnly: true,                    // Ensure this only closes a position
    tpTriggerPrice: 95000m,
    tpOrderPrice: -1,                    // -1 means Market order on trigger
    slTriggerPrice: 90000m,
    slOrderPrice: -1,
    ct: ct
);
```

## Closing a Position

You can close an open position entirely without calculating the exact quantity.

```csharp
var closeResult = await _client.Trade.ClosePositionAsync(
    symbol: "BTC-USDT-SWAP",
    positionSide: PositionSide.Net, // Or Long/Short depending on Margin Mode
    autoCancel: true,               // Automatically cancel pending TP/SL orders
    ct: ct
);
```

## Modifying Orders (Trailing Stop)

To implement a Trailing Stop, you frequently amend an existing Stop Loss order as the price moves in your favor.

```csharp
var amendResult = await _client.Trade.AmendAlgoOrderAsync(
    symbol: "BTC-USDT-SWAP",
    algoId: "existing_algo_order_id",
    newStopLossTriggerPrice: 92000m,   // Move the stop up
    newStopLossOrderPrice: -1,
    ct: ct
);
```

## Fetching Live Data

While the host state store is the fastest source during strategy callbacks, you often need to fetch live data directly from the exchange during `OnInitAsync` to recover state after restarts.

```csharp
// 1. Get live positions
var positionsResult = await _client.Trade.GetPositionsAsync("BTC-USDT-SWAP");
if (positionsResult.Success)
{
    foreach (var pos in positionsResult.Data)
    {
        // ... build internal state ...
    }
}

// 2. Get live pending Limit orders (e.g. TP orders)
var ordersResult = await _client.Trade.GetOrdersAsync("BTC-USDT-SWAP");

// 3. Get live pending Algo orders (e.g. SL orders)
var algoOrdersResult = await _client.Trade.GetAlgoOrdersAsync(
    AlgoOrderType.Conditional, 
    symbol: "BTC-USDT-SWAP"
);
```

## Timeseries & Candle Data

To fetch chart data, historical candles, or current prices, use `IOkxClient.Timeseries`.

### Fetching Candles (OHLCV)

You can query candles using an index-based shift system.

> [!IMPORTANT]
> The system **does not support** querying the currently forming (unclosed) candle via `shift`. 
> - `shift = 0` refers to the **latest fully closed candle**.
> - `shift = 1` refers to the candle closed immediately before that, and so on.
> - This rule also applies when accessing Indicator values (`GetValue(0)` gets the indicator value computed at the last closed candle).

```csharp
// Get the latest fully closed candle (Shift 0)
var latestClosedCandle = await _client.Timeseries.GetOHCLVAsync("BTC-USDT-SWAP", Timeframe.M15, shift: 0, ct);

// Get the previous closed candle (Shift 1)
var previousClosedCandle = await _client.Timeseries.GetOHCLVAsync("BTC-USDT-SWAP", Timeframe.M15, shift: 1, ct);

// Access OHLCV properties
if (!latestClosedCandle.IsEmpty)
{
    decimal open = latestClosedCandle.Open;
    decimal high = latestClosedCandle.High;
    decimal low = latestClosedCandle.Low;
    decimal close = latestClosedCandle.Close;
    decimal vol = latestClosedCandle.Volume;
}
```

### Current Price & Tick Data

For real-time pricing without waiting for a candle to close:

```csharp
// Get the most recent tick price from the real-time stream
decimal currentPrice = _client.Timeseries.CurrentTickPrice;

// Alternatively, get the Mark price (often used for liquidation/risk calculations)
var markPrice = await _client.Instrument.GetMarkPriceAsync("BTC-USDT-SWAP", ct);
```

> [!TIP]
> For calculating and reading moving averages, RSI, or custom formulas, you should use **Indicators** rather than parsing OHLCV data manually. (See the [Using Indicators](indicators.md) section for more details).