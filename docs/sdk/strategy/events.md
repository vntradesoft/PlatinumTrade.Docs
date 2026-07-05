---
id: sdk-strategy-events
title: Strategy Events
description: Handling order fills, ticks, and candle updates
status: draft
visibility: internal
publish: false
---

# Events and State

Your strategy is entirely event-driven. The core logic executes inside the `RunAsync` method, which is invoked by the platform whenever a market or account event occurs.

## StrategyEventType

The `eventType` parameter tells you exactly *why* the strategy woke up.

| Event Type | When is it called? |
|---|---|
| `Kline` | When a new candle closes. This is the most common place to check entry/exit indicators. |
| `Tick` | When the ticker price updates (real-time stream). Very frequent. |
| `Order` | When an order state changes (e.g., submitted, partially filled, cancelled, fully filled). |
| `AlgoOrder` | When an algorithmic order (TP/SL) is triggered or cancelled. |
| `Position` | When a position is opened, closed, or its PnL/Margin updates. |
| `Balance` | When the account balance changes (deposits, fees, realized PnL). |
| `Transaction` | When a trade match (fill) occurs. |
| `TradeCommand` | When the user sends a command via Telegram or the UI. |

## The `RunAsync` Method

```csharp
public async Task RunAsync(
    StrategyEventType eventType,
    IStrategyStateStore state,
    CancellationToken ct)
{
    // Filter events to only run logic on new candles
    if (eventType == StrategyEventType.Kline)
    {
        if (state.HasOpenPosition)
        {
            // Manage TP/SL for the existing position
            ManagePosition(state);
            return;
        }

        // No open position — look for entry signals
        await FindEntrySignal(state, ct);
    }
    
    if (eventType == StrategyEventType.Order)
    {
        // Handle order updates (e.g., verify if our entry filled)
    }
}
```

## IStrategyStateStore — State Access

The `IStrategyStateStore` interface provides a unified, synchronous snapshot of the current account and market state. The platform maintains this state in the background via WebSockets, so reading from `state` is extremely fast and doesn't require API calls.

```csharp
public interface IStrategyStateStore
{
    // Snapshot Collections
    Order[] Orders { get; }              // Currently open orders (Limit, Market, etc.)
    AlgoOrder[] AlgoOrders { get; }      // Pending algo orders (Take Profit / Stop Loss)
    Position[] Positions { get; }        // Currently open positions
    AccountBalance[] Balances { get; }   // Account balances
    Transaction[] Transactions { get; }  // Recent transactions (fills)
    
    // External Triggers
    TradeCommand TradeCommand { get; }   // External user command (if any)
    CandleData? LastKline { get; }       // The most recently closed candle
    
    // Convenience properties
    bool HasOpenPosition { get; }
    bool HasOpenOrders { get; }
    bool HasProtectiveAlgoOrders { get; }
    int OpenOrderCount { get; }
    int AlgoOrderCount { get; }
}
```

### When to query the API directly vs using `IStrategyStateStore`?

- **Use `IStrategyStateStore`** for the majority of your logic within `RunAsync`. Because this data is streamed via WebSockets, it avoids rate-limiting and is zero-latency during event loops.
- **Use `IOkxClient` APIs directly** during the `InitializeAsync` phase to recover state (e.g., reading positions and pending orders on bot startup) because WebSockets might not have pushed the full initial state yet.

## Event Handlers in Practice

A common pattern is to dispatch events to specific methods to keep your code clean:

```csharp
public async Task RunAsync(StrategyEventType eventType, IStrategyStateStore state, CancellationToken ct)
{
    switch (eventType)
    {
        case StrategyEventType.Kline:
            await OnNewCandleAsync(state.LastKline);
            break;
            
        case StrategyEventType.Order:
            foreach (var order in state.Orders)
                await OnOrderUpdateAsync(order);
            break;
            
        case StrategyEventType.Position:
            await OnPositionUpdateAsync(state.Positions);
            break;
    }
}
```