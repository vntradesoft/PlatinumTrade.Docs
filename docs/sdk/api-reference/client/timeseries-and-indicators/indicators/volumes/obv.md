---
id: obv
title: On-Balance Volume (OBV)
sidebar_label: On-Balance Volume
sidebar_position: 2
description: API documentation for the On-Balance Volume (OBV) indicator in Platinum Trade SDK.
status: stable
visibility: public
---

# On-Balance Volume (OBV)

Theo dõi dòng khối lượng tích lũy để dự đoán xu hướng giá dịch chuyển tương lai.

---

## Syntax

```csharp
IIndicatorOBV CreateIndicatorOBV(string? symbol = null, Timeframe? timeframe = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | `Timeframe?` | K-line timeframe. Defaults to strategy primary timeframe. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<IndicatorProperty>?` | Visual styles config delegate. |

---

## Return Value

Returns `IIndicatorOBV` which inherits from `IIndicator` and `IIndicatorMethodCommon`.

---

## Remarks

OBV adds volume on up days and subtracts volume on down days to measure cumulative volume flow.

---

## Example

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorOBV _obv;

public override async Task OnInitAsync()
{
    _obv = Context.Timeseries.CreateIndicatorOBV(indicatorAlias: "OBV");
}
}
```
