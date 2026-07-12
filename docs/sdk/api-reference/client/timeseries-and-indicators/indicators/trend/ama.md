---
id: ama
title: Adaptive Moving Average (AMA)
sidebar_label: Adaptive Moving Average
sidebar_position: 4
description: API documentation for the Adaptive Moving Average (AMA) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Adaptive Moving Average (AMA)

Đường trung bình động tự động điều chỉnh độ nhạy dựa trên mức độ biến động của thị trường.

---

## Syntax

```csharp
IIndicatorAMA CreateIndicatorAMA(string? symbol = null, Timeframe? timeframe = null, int? period = null, int? fast = null, int? slow = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Efficiency Ratio lookback period. |
| `fast` | `int?` | Fast EMA period. |
| `slow` | `int?` | Slow EMA period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorAMA` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

AMA automatically speeds up in volatile markets and slows down in rangebound markets.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorAMA _ama;

public override async Task OnInitAsync()
{
    _ama = Context.Timeseries.CreateIndicatorAMA(period: 10, fast: 2, slow: 30, indicatorAlias: "AMA10");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("AMA10") <= 0) return;
    decimal value = _ama.GetAt(0).Value;
    Logger.Info($"Current AMA: {value:F2}");
}
}
```
