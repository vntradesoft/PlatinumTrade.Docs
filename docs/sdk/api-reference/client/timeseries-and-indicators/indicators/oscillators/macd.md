---
id: macd
title: Moving Average Convergence Divergence (MACD)
sidebar_label: Moving Average Convergence Divergence
sidebar_position: 3
description: API documentation for the Moving Average Convergence Divergence (MACD) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Moving Average Convergence Divergence (MACD)

Chỉ báo động lượng theo xu hướng thể hiện mối liên hệ giữa hai đường trung bình động.

---

## Syntax

```csharp
IIndicatorMACD CreateIndicatorMACD(string? symbol = null, Timeframe? timeframe = null, int? fastPeriod = null, int? slowPeriod = null, int? signalPeriod = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `fastPeriod` | `int?` | Fast EMA period. |
| `slowPeriod` | `int?` | Slow EMA period. |
| `signalPeriod` | `int?` | Signal line smoothing period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorMACD` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Specialized helper methods: `GetMacd()`, `GetSignal()`, and `GetHistogram()`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorMACD _macd;

public override async Task OnInitAsync()
{
    _macd = Context.Timeseries.CreateIndicatorMACD(fastPeriod: 12, slowPeriod: 26, signalPeriod: 9, indicatorAlias: "MACD");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("MACD") <= 0) return;
    decimal macdLine = _macd.GetMacd(0).Value;
    decimal sigLine = _macd.GetSignal(0).Value;
    Logger.Info($"MACD: {macdLine:F4}, Signal: {sigLine:F4}");
}
}
```
