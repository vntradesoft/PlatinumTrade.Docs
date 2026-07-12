---
id: sdk-trade-history
title: History Data
sidebar_label: History Data
---
# History Data

## `GetHistoryOrdersAsync`
Gets the history of closed or canceled orders (last 7 days).

```csharp
Task<ApiResult<Order[]>> GetHistoryOrdersAsync(string? symbol = null, string? underlying = null, OrderType? orderType = null, OrderStatus? state = null, DateTime? startTime = null, DateTime? endTime = null, CancellationToken ct = default);
```

**Parameters**

Filters like symbol, status, and time range.

**Return Value**

`ApiResult<Order[]>`.

**Remarks**

For data older than 7 days, use `GetOrdersArchiveAsync`.

**Example**

```csharp
var history = await Context.Trade.GetHistoryOrdersAsync(symbol: "BTC-USDT");
```

---
