---
id: sdk-account-performance-analytics
title: Performance Analytics
sidebar_label: Performance Analytics
---
# Performance Analytics

## `GetCurrentEquity`
Gets the current equity value of the account.

```csharp
decimal GetCurrentEquity();
```

**Parameters**

None.

**Return Value**

The current equity value.

**Remarks**

Equivalent to `Equity` property.

**Example**

```csharp
decimal equity = Context.Account.GetCurrentEquity();
```

---

## `GetEquityChangePercentage`
Calculates the percentage change in equity compared to the initial balance.

```csharp
decimal GetEquityChangePercentage();
```

**Parameters**

None.

**Return Value**

The equity change percentage.

**Remarks**

Returns a value where 1.0 means +100%.

**Example**

```csharp
decimal change = Context.Account.GetEquityChangePercentage();
if (change > 0.1m)
{
    Context.Logger.LogInformation("Profit", "Account up by more than 10%");
}
```

---

## `GetMarginRatio`
Calculates the current margin ratio of the account.

```csharp
decimal GetMarginRatio();
```

**Parameters**

None.

**Return Value**

The margin ratio value.

**Remarks**

High margin ratio increases the risk of liquidation. Usually liquidation happens near 100%.

**Example**

```csharp
decimal ratio = Context.Account.GetMarginRatio();
if (ratio > 0.8m)
{
    Context.Logger.LogWarning("Margin Call", "Margin ratio exceeds 80%!");
}
```

---

## `GetCurrentDrawdown`
Calculates the current account drawdown compared to the equity peak.

```csharp
decimal GetCurrentDrawdown();
```

**Parameters**

None.

**Return Value**

The current drawdown value (as a positive decimal percentage).

**Remarks**

Useful for implementing risk management strategies that pause trading after a specific drawdown.

**Example**

```csharp
decimal dd = Context.Account.GetCurrentDrawdown();
if (dd > 0.15m)
{
    // Halt trading if drawdown is > 15%
    HaltStrategy();
}
```

---
