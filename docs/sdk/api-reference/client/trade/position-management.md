---
id: sdk-trade-position-management
title: Position Management
sidebar_label: Position Management
---
# Position Management

## `ClosePositionAsync`
Closes an open position fully at market price.

```csharp
Task<ApiResult<ClosePositionResponse>> ClosePositionAsync(string symbol, PositionSide? positionSide = null, string? asset = null, bool? autoCancel = null, string? clientOrderId = null, CancellationToken ct = default);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Trading symbol. |
| `positionSide` | [`PositionSide?`](../../enums.md#positionside) | Long or Short (required if in Hedge mode). |
| `ct` | `CancellationToken` | Cancellation token. |

**Return Value**

`ApiResult<ClosePositionResponse>`.

**Remarks**

Executing this will cancel associated TP/SL orders if autoCancel is true.

**Example**

```csharp
var res = await Context.Trade.ClosePositionAsync("BTC-USDT-SWAP", PositionSide.Long);
if (res.Success)
{
    Context.Logger.LogInformation("Position closed");
}
```

---
