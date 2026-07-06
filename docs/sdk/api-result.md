---
id: sdk-api-result
title: ApiResult Pattern
description: Unified error handling without exceptions
status: draft
visibility: internal
publish: false
---

# ApiResult Pattern

`ApiResult` / `ApiResult<T>` is the primary error-handling pattern in Pt.Okx.Sdk. Instead of throwing exceptions for business logic errors, the SDK uses a result pattern so callers can handle failures explicitly.

## When to use what

| Scenario | Use |
|---|---|
| API call failure (network, rate limit, insufficient balance) | `ApiResult<T>` |
| Validation error (invalid symbol, invalid quantity) | `ApiResult<T>` |
| Code bug (null reference, index out of range) | Exception |
| Configuration error (missing API key) | Exception |
| Fatal / infrastructure error | Exception |

> [!TIP]
> **Rule of thumb:** If the error is predictable and occurs in the normal business flow → use `ApiResult`. If the error is a bug or infrastructure failure → throw an exception.

## Class Hierarchy

```csharp
// Non-generic: for operations that return no data
public class ApiResult
{
    public bool Success { get; }
    public ApiError? Error { get; }

    // Implicit bool conversion
    public static implicit operator bool(ApiResult result) => result.Success;
}

// Generic: for operations that return data
public class ApiResult<T> : ApiResult
{
    public T Data { get; }
}
```

## Creating Results

Use the `ApiResultFactory` static class:

```csharp
// Success
var ok = ApiResultFactory.Ok(data);         // ApiResult<T>
var ok = ApiResultFactory.Ok();             // ApiResult (non-generic)

// Failure
var fail = ApiResultFactory.Fail<T>(error); // ApiResult<T>
var fail = ApiResultFactory.Fail(error);    // ApiResult (non-generic)
```

## Consuming Results

### Pattern 1: GetResultOrError (Recommended)

```csharp
var result = await client.Trade.PlaceOrderAsync(
    "BTC-USDT", OrderSide.Buy, OrderType.Market, 0.01m);

if (result.GetResultOrError(out var order, out var error))
{
    // ✅ Success — order is guaranteed non-null
    logger.LogSuccess("Order Placed", "OrderId: {Id}", order.OrderId);
}
else
{
    // ❌ Failure — error is guaranteed non-null
    logger.LogError(new Exception(error.Message), "Order Failed",
        "[{Code}] {Msg}", error.Code, error.Message);
}
```

### Pattern 2: Implicit Bool Conversion

```csharp
var result = await client.Account.LoadBalanceAsync();

if (result)
{
    var balance = result.Data;
}
else
{
    logger.LogWarning("Load Failed", result.Error!.Message);
}
```

### Pattern 3: Deconstruct

```csharp
var (success, data, error) = await client.Trade.GetOrderAsync("BTC-USDT");

if (success)
    Console.WriteLine($"Order: {data!.OrderId}");
else
    Console.WriteLine($"Error: {error!.Message}");
```

### Pattern 4: Map — Transform Data

Transforms the data type on success; preserves the error on failure:

```csharp
ApiResult<OrderSummary> summary = result.Map(order => new OrderSummary
{
    Id = order.OrderId,
    Symbol = order.Symbol,
    Status = order.Status
});
```

### Pattern 5: AsError — Propagate Error Type

Copies the error into a different generic type when you only need to forward the failure:

```csharp
public async Task<ApiResult<Position>> OpenPosition(...)
{
    var orderResult = await client.Trade.PlaceOrderAsync(...);

    if (!orderResult)
        return orderResult.AsError<Position>();

    // ... continue with position logic
    return ApiResultFactory.Ok(position);
}
```

## ApiError

`ApiError` contains detailed information about a failure:

```csharp
public class ApiError
{
    public string Message { get; }           // Human-readable message
    public string? Code { get; }             // OKX error code (e.g., "50001")
    public HttpStatusCode? HttpStatusCode { get; }  // HTTP status
    public ApiErrorType ErrorType { get; }   // Error category
}
```

### Error Types

| ApiErrorType | Description |
|---|---|
| `Unknown` | Unclassified error |
| `Network` | Network error (timeout, connection refused) |
| `RateLimit` | Rate-limited by the OKX API |
| `Authentication` | Invalid API key / secret / passphrase |
| `InsufficientBalance` | Insufficient balance |
| `InvalidParameter` | Invalid parameter |
| `OrderNotFound` | Order does not exist |
| `Exchange` | Error from the exchange side |

## Best Practices

> [!WARNING]
> **Never log credentials** in error messages. `ApiError` may contain OKX error codes but must **never** contain API keys, secrets, or passphrases.

1. **Always check the result** before accessing `.Data` — this is not just a nullable warning but a business logic requirement
2. **Prefer `GetResultOrError`** over `.Success` + `.Data` — the compiler helps guarantee null safety
3. **Chain operations** with `Map` instead of creating many temporary variables
4. **Propagate errors** with `AsError<T>()` instead of constructing a new `ApiError` when you only need to forward a failure

## See also

- [ApiResult](xref:Pt.Okx.Sdk.Common.ApiResult) API Reference
- [ApiError](xref:Pt.Okx.Sdk.Common.ApiError) API Reference
- [Using the Trading Client](trading-client.md) — Real-world examples with ApiResult