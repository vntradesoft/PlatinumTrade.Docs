---
id: sdk-trade-utilities
title: Utilities
sidebar_label: Utilities
---
# Utilities

## `SetMagicNumber`
Sets the Magic Number to identify the order source.

```csharp
(bool Success, string ErrorMsg) SetMagicNumber(string magicNumber);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `magicNumber` | [`string`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types) | Custom identifier. |

**Return Value**

Tuple with success status.

**Remarks**

Bots use magic numbers to distinguish their orders from manual trades or other bots.

**Example**

```csharp
Context.Trade.SetMagicNumber("MyBot_01");
```

---
