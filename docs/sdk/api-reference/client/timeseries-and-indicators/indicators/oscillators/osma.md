---
id: osma
title: Oscillator of Moving Average (OsMA)
sidebar_label: Oscillator of Moving Average
sidebar_position: 4
description: API documentation for the Oscillator of Moving Average (OsMA) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Oscillator of Moving Average (OsMA)

Đo lường khoảng cách sai lệch giữa đường MACD và đường tín hiệu MACD.

---

## Syntax

```csharp
IIndicatorOsMA CreateIndicatorOsMA(string sourceId1, string sourceId2, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `sourceId1` | `string` | The ID of the first source indicator (usually MACD line). |
| `sourceId2` | `string` | The ID of the second source indicator (usually MACD Signal line). |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorOsMA` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Calculates the difference between the main line and the signal line of a source indicator (like MACD).

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorOsMA _osma;

public override async Task OnInitAsync()
{
    // Make sure MACD is initialized first with "MACD" alias
    _osma = Context.Timeseries.CreateIndicatorOsMA("MACD", "MACD_Signal", indicatorAlias: "OsMA");
}
}
```
