---
id: cci
title: Commodity Channel Index (CCI)
sidebar_label: Commodity Channel Index
sidebar_position: 5
description: API documentation for the Commodity Channel Index (CCI) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Commodity Channel Index (CCI)

Đo lường mức độ sai lệch của giá so với giá trung bình thống kê để phát hiện vùng cực đoan.

---

## Syntax

```csharp
IIndicatorCCI CreateIndicatorCCI(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorCCI` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Includes helper methods: `IsOverbought(double threshold = 100, int index = 0)` and `IsOversold(double threshold = -100, int index = 0)`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorCCI _cci;

public override async Task OnInitAsync()
{
    _cci = Context.Timeseries.CreateIndicatorCCI(period: 20, indicatorAlias: "CCI");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("CCI") <= 0) return;
    if (_cci.IsOverbought())
    {
        Logger.Info("CCI is Overbought (> 100)!");
    }
}
}
```
