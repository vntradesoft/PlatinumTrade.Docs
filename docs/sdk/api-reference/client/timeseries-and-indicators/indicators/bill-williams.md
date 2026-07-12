---
title: Bill Williams
---

# Bill Williams
## Accelerator Oscillator (AC)

Measures the acceleration and deceleration of the current driving force.

---

**Syntax**

```csharp
IIndicatorAC CreateIndicatorAC(string? symbol = null, Timeframe? timeframe = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorAC`](../../interfaces.md#iindicatorac) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
Provides `GetUp()` and `GetDown()` to read the colored histogram values.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorAC _ac;

public override async Task OnInitAsync()
{
    _ac = Context.Timeseries.CreateIndicatorAC(indicatorAlias: "AC");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("AC") <= 0) return;
    bool isBullish = !_ac.GetUp(0).IsEmpty;
    Logger.Info($"AC is Bullish: {isBullish}");
}
}
```

## Alligator
A trend-following model combining three time-shifted moving averages. ---

**Syntax**

```csharp
IIndicatorAlligator Alligator(string? symbol, Timeframe? timeframe, string? indicatorAlias, Action<IndicatorProperty>? propertyOptions);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

**Return Value**

Returns [`IIndicatorAlligator`](../../interfaces.md#iindicatoralligator) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

**Remarks**

Provides specialized line getter methods `GetJaw()` (Blue line), `GetTeeth()` (Red line), and `GetLips()` (Green line).

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;
public class MyStrategy : StrategyBase
{
    private IIndicatorAlligator _alligator;
public override async Task OnInitAsync()
{
    _alligator = Context.Timeseries.CreateIndicatorAlligator(indicatorAlias: "Gator");
}
public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("Gator") <= 0) return;
    decimal jaw = _alligator.GetJaw(0).Value;
    decimal teeth = _alligator.GetTeeth(0).Value;
    decimal lips = _alligator.GetLips(0).Value;
    Logger.Info($"Jaw: {jaw:F2}, Teeth: {teeth:F2}, Lips: {lips:F2}");
}
}
```

---

## Awesome Oscillator (AO)

Measures the market momentum of the last 5 periods compared to the previous 34 periods.

---

**Syntax**

```csharp
IIndicatorAO CreateIndicatorAO(string? symbol = null, Timeframe? timeframe = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorAO`](../../interfaces.md#iindicatorao) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
Provides `GetUp()` and `GetDown()` to read the colored histogram values.

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorAO _ao;

public override async Task OnInitAsync()
{
    _ao = Context.Timeseries.CreateIndicatorAO(indicatorAlias: "AO");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("AO") <= 0) return;
    bool isBullish = !_ao.GetUp(0).IsEmpty;
    Logger.Info($"AO is Bullish: {isBullish}");
}
}
```

## Market Facilitation Index (BWMFI)

Evaluates the price change of an asset per unit of trading volume.

---

**Syntax**

```csharp
IIndicatorBWMFI CreateIndicatorBWMFI(string? symbol = null, Timeframe? timeframe = null, double? multiplier = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `multiplier` | `double?` | Index multiplier scale factor. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorBWMFI`](../../interfaces.md#iindicatorbwmfi) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
Provides methods to check Williams' bar types: `GetGreen()`, `GetBrown()`, `GetBlue()`, and `GetPink()`.

---

**Example**

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

## Fractals
Identifies local tops and bottoms in price movements. ---

**Syntax**

```csharp
IIndicatorFractals Fractals(string? symbol, Timeframe? timeframe, string? indicatorAlias, Action<IndicatorProperty>? propertyOptions);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

**Return Value**

Returns [`IIndicatorFractals`](../../interfaces.md#iindicatorfractals) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

**Remarks**

Provides `GetUp()` and `GetDown()`. If no fractal has formed on the candle, `IsEmpty` is returned as `true`.

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;
public class MyStrategy : StrategyBase
{
    private IIndicatorFractals _fractals;
public override async Task OnInitAsync()
{
    _fractals = Context.Timeseries.CreateIndicatorFractals(indicatorAlias: "Fractals");
}
public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("Fractals") <= 0) return;
    var upVal = _fractals.GetUp(2); // Check shift 2 for confirmation
    if (!upVal.IsEmpty)
    {
        Logger.Info($"Confirmed Up Fractal at Price: {upVal.Value}");
    }
}
}
```

---

## Gator Oscillator

Represents the convergence and divergence of the Alligator bands.

---

**Syntax**

```csharp
IIndicatorGator CreateIndicatorGator(string? symbol = null, Timeframe? timeframe = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

---

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | The trading pair symbol. Defaults to strategy primary symbol. |
| `timeframe` | [`Timeframe?`](../../enums.md#timeframe) | K-line timeframe. Defaults to strategy primary timeframe. |
| `indicatorAlias` | `string?` | Unique alias. |
| `propertyOptions` | `Action<`[IndicatorProperty](../../models.md#indicatorproperty)`>?` | Visual styles config delegate. |

---

**Return Value**

Returns [`IIndicatorGator`](../../interfaces.md#iindicatorgator) which inherits from [`IIndicator`](../../interfaces.md#iindicator) and [`IIndicatorMethodCommon`](../../interfaces.md#iindicatormethodcommon).

---

**Remarks**
Provides `GetUp()` (absolute distance between Jaw and Teeth) and `GetDown()` (negative distance between Teeth and Lips).

---

**Example**

```csharp
using Pt.Okx.Sdk.Clients;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class MyStrategy : StrategyBase
{
    private IIndicatorGator _gator;

public override async Task OnInitAsync()
{
    _gator = Context.Timeseries.CreateIndicatorGator(indicatorAlias: "GatorOsc");
}

public override async Task OnTickAsync()
{
    if (Context.Timeseries.BarsCalculated("GatorOsc") <= 0) return;
    decimal up = _gator.GetUp(0).Value;
    decimal down = _gator.GetDown(0).Value;
    Logger.Info($"Gator Up: {up:F4}, Gator Down: {down:F4}");
}
}
```

