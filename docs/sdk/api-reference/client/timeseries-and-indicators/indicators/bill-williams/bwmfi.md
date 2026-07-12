---
id: bwmfi
title: Market Facilitation Index (BWMFI)
sidebar_label: Market Facilitation Index
sidebar_position: 6
description: API documentation for the Market Facilitation Index (BWMFI) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# Market Facilitation Index (BWMFI)

Đánh giá mức độ thay đổi giá của một tài sản trên một đơn vị khối lượng giao dịch.

---

## Syntax

```csharp
IIndicatorBWMFI CreateIndicatorBWMFI(string? symbol = null, Timeframe? timeframe = null, double? multiplier = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `multiplier` | `double?` | Index multiplier scale factor. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorBWMFI` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

Provides methods to check Williams' bar types: `GetGreen()`, `GetBrown()`, `GetBlue()`, and `GetPink()`.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorBWMFI _mfi;

public override async Task OnInitAsync()
{
    _mfi = Context.Timeseries.CreateIndicatorBWMFI(indicatorAlias: "BWMFI");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("BWMFI") <= 0) return;
    if (!_mfi.GetGreen(0).IsEmpty)
    {
        Logger.Info("Market facilitation has green light: MFI up, Volume up.");
    }
}
}
```
