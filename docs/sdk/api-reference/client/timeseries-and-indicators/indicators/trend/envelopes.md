---
id: envelopes
title: Envelopes
sidebar_label: Envelopes
sidebar_position: 6
description: API documentation for the Envelopes indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Envelopes

Đường bao bao gồm dải biên trên và biên dưới dịch chuyển theo tỉ lệ lệch so với đường trung bình.

---

## Syntax

```csharp
IIndicatorEnvelopes CreateIndicatorEnvelopes(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? deviation = null, MaMethod? method = null, AppliedPrice? appliedPrice = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Moving average period. |
| `deviation` | `double?` | Envelope band deviation multiplier. |
| `method` | `MaMethod?` | Moving average smoothing method. |
| `appliedPrice` | `AppliedPrice?` | Price component to apply calculation on. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorEnvelopes` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Provides `GetUpper()`, `GetLower()`, `IsPriceAboveUpper()`, and `IsPriceBelowLower()` to detect breakout signals.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorEnvelopes _envelopes;

public override async Task OnInitAsync()
{
    _envelopes = Context.Timeseries.CreateIndicatorEnvelopes(period: 14, deviation: 0.1, method: MaMethod.SMA, indicatorAlias: "Envelopes");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("Envelopes") <= 0) return;
    decimal close = Context.Timeseries.GetLastClosedCandle().Close;
    if (_envelopes.IsPriceAboveUpper((double)close))
    {
        Logger.Info("Price breakout above upper envelope band!");
    }
}
}
```
