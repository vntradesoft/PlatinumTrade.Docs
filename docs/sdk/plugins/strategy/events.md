---
sidebar_position: 2
id: sdk-strategy-events
title: Strategy Events
description: Handling order fills, ticks, and candle updates
status: draft
visibility: internal
publish: false
---

# Event Handlers

Your strategy is entirely event-driven. The host engine receives raw events and dispatches them to strategy callbacks.



## Strategy Callbacks

You implement one required market callback and optional typed handlers to respond to market events.

| Handler | When is it called? |
|---|---|
| `OnTickAsync(TickPhase.BarClose, ...)` | When a candle closes. This is where most indicator-based logic runs. |
| `OnTickAsync(TickPhase.Tick, ...)` | On every intra-bar price update. Used for trailing stops or high-frequency checks. |
| `OnOrderAsync(...)` | When an order state changes (e.g., submitted, partially filled, cancelled, fully filled). |
| `OnAlgoOrderAsync(...)` | When an algorithmic order (TP/SL) is triggered or cancelled. |
| `OnPositionAsync(...)` | When a position is opened, closed, or its PnL/Margin updates. |
| `OnBalanceAsync(...)` | When the account balance changes (deposits, fees, realized PnL). |
| `OnTransactionAsync(...)` | When a trade match (fill) occurs. |
| `OnTradeCommandAsync(...)` | When the user sends a command via Telegram or the UI. |

```csharp
public sealed class MyStrategy : StrategyBase
{
    public override async Task OnTickAsync(TickPhase tickPhase, CancellationToken ct)
    {
        if (tickPhase == TickPhase.BarClose)
        {
            await EvaluateEntryExitAsync(ct);
        }

        if (tickPhase == TickPhase.Tick)
        {
            await UpdateIntrabarProtectionAsync(ct);
        }
    }

    public override Task OnOrderAsync(IReadOnlyList<Order> orders, CancellationToken ct)
    {
        // Handle order updates (optional)
        return Task.CompletedTask;
    }
}
```

## IStrategyStateStore — State Access

`IStrategyStateStore` is the internal runtime state container owned by the host. The platform updates it via WebSockets and snapshots.

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

- **Use `IOkxClient` APIs directly** in `OnInitAsync` for recovery and bootstrap checks.
- **Use optional typed handlers** for event-driven workflows (`OnOrderAsync`, `OnPositionAsync`, etc.).
- Keep `OnTickAsync(TickPhase, ...)` focused on market cadence decisions.

## Event Handlers in Practice

A common pattern is to keep `OnTickAsync` minimal and delegate work by phase:

```csharp
public override async Task OnTickAsync(TickPhase tickPhase, CancellationToken ct)
{
    switch (tickPhase)
    {
        case TickPhase.BarClose:
            await OnBarCloseAsync(ct);
            break;

        case TickPhase.Tick:
            await OnIntrabarTickAsync(ct);
            break;
    }
}
```