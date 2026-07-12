---
id: rsi
title: Relative Strength Index (RSI)
sidebar_label: Relative Strength Index
sidebar_position: 1
description: API documentation for the Relative Strength Index (RSI) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Relative Strength Index (RSI)

Chỉ báo dao động động lượng đo lường tốc độ và thay đổi của biến động giá.

---

## Syntax

```csharp
IIndicatorRSI CreateIndicatorRSI(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | RSI calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorRSI` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Specialized helper methods: `IsOverbought(double threshold = 70, int index = 0)` and `IsOversold(double threshold = 30, int index = 0)`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorRSI _rsi;

public override async Task OnInitAsync()
{
    _rsi = Context.Timeseries.CreateIndicatorRSI(period: 14, indicatorAlias: "RSI14");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("RSI14") <= 0) return;
    if (_rsi.IsOversold())
    {
        Logger.Info("RSI is Oversold (< 30)!");
    }
}
}
```
