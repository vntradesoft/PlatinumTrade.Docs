---
id: mfi
title: Money Flow Index (MFI)
sidebar_label: Money Flow Index
sidebar_position: 7
description: API documentation for the Money Flow Index (MFI) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Money Flow Index (MFI)

Đo lường dòng tiền thông qua tích hợp cả dữ liệu giá và khối lượng.

---

## Syntax

```csharp
IIndicatorMFI CreateIndicatorMFI(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `period` | `int?` | Lookback period. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorMFI` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Includes helper methods: `IsOverbought(double threshold = 80, int index = 0)` and `IsOversold(double threshold = 20, int index = 0)`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorMFI _mfi;

public override async Task OnInitAsync()
{
    _mfi = Context.Timeseries.CreateIndicatorMFI(period: 14, indicatorAlias: "MFI");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("MFI") <= 0) return;
    if (_mfi.IsOversold())
    {
        Logger.Info("MFI is Oversold (< 20)!");
    }
}
}
```
