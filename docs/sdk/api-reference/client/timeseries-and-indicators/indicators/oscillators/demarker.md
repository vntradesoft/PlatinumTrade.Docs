---
id: demarker
title: DeMarker (DeM)
sidebar_label: DeMarker
sidebar_position: 10
description: API documentation for the DeMarker (DeM) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# DeMarker (DeM)

So sánh đỉnh/đáy của chu kỳ hiện tại với chu kỳ trước để đánh giá nhu cầu thị trường.

---

## Syntax

```csharp
IIndicatorDeMarker CreateIndicatorDeMarker(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | DeMarker calculation period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorDeMarker` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Specialized helper methods: `IsOverbought(double threshold = 0.7, int index = 0)` and `IsOversold(double threshold = 0.3, int index = 0)`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorDeMarker _dem;

public override async Task OnInitAsync()
{
    _dem = Context.Timeseries.CreateIndicatorDeMarker(period: 14, indicatorAlias: "DeMarker");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("DeMarker") <= 0) return;
    if (_dem.IsOverbought())
    {
        Logger.Info("DeMarker is Overbought (> 0.7)!");
    }
}
}
```
