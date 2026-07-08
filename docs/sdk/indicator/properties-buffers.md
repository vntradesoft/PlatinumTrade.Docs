---
id: sdk-indicator-properties-buffers
title: Properties & Buffers
description: Configuring visual properties and data arrays
status: published
visibility: public
---

# Properties & Buffers

Indicators consist of mathematical calculations applied to price series. To draw these calculations on a chart, you must configure **Properties** (how it looks) and allocate **Buffers** (where the data is stored).

## IndicatorProperty

The `CreateDefaultProperty` method in your indicator defines the metadata required by the GUI to render the indicator correctly.

```csharp
protected override IndicatorProperty CreateDefaultProperty()
{
    var property = new IndicatorProperty(
        name: $"MyMomentum({_period})",
        window: IndicatorWindow.Separate,  // Where to display
        buffers: 1,                        // Total number of buffers
        plots: 1                           // How many buffers are drawn
    )
    {
        Labels = new Dictionary<int, IndicatorLabel>
        {
            {
                0, new IndicatorLabel // Settings for Buffer 0
                {
                    Label = "ROC",
                    Type = IndicatorDrawType.Histogram,
                    Color = IndicatorColor.Green,
                    Style = IndicatorStyle.Solid,
                    Width = 2.0
                }
            }
        }
    };
    
    return property;
}
```

### Display Windows (`IndicatorWindow`)

| Value | Description | Examples |
|---|---|---|
| `IndicatorWindow.Main` | Overlay directly on top of the price chart candlesticks. | SMA, EMA, Bollinger Bands |
| `IndicatorWindow.Separate` | Renders in a dedicated sub-panel below the price chart. | RSI, MACD, Volume |

### Draw Types (`IndicatorDrawType`)

| Value | Description |
|---|---|
| `Line` | A continuous line connecting points. |
| `Histogram` | Vertical bars anchored to the zero line or bottom. |
| `Arrow` | Distinct markers (arrows/dots) plotted at specific points. |
| `Section` | Discontinuous line segments (will not draw lines between missing data). |
| `None` | The buffer is hidden (useful for intermediate calculations). |

### Special Features

You can apply advanced visual bounds to your `IndicatorProperty` via `SpecialFeatures`. This is very common for oscillators like the RSI.

```csharp
SpecialFeatures = new IndicatorSpecialFeatures
{
    ShowZeroLine = true,
    ZeroLineColor = IndicatorColor.Gray,
    ZeroLineWidth = 1.0,

    // Defines static threshold lines on the chart
    BoundLines = new[]
    {
        new BoundLine { Value = 70, Color = IndicatorColor.Red },
        new BoundLine { Value = 30, Color = IndicatorColor.Green }
    },

    // Shades the background between two thresholds
    BoundFill = new BoundFill
    {
        UpperBound = 70,
        LowerBound = 30,
        FillColor = IndicatorColor.LightBlue,
        FillOpacity = 0.2
    }
}
```

## Buffer Allocation

After properties are defined, the platform calls `OnInit()`. Here, you must allocate the internal arrays that will hold your calculated data.

```csharp
private IIndicatorBuffer? _rocBuffer;

public override bool OnInit()
{
    // Must call base implementation!
    if (!base.OnInit())
        return false;

    // Buffer 0 is for drawing data
    SetBuffer(0, IndicatorBufferType.Data);
    
    // Retrieve the buffer instance
    _rocBuffer = GetBuffer(0);
    
    return true;
}
```

### Buffer Types

| Type | Description |
|---|---|
| `IndicatorBufferType.Data` | The buffer contains data intended to be drawn on the chart. Its index must correspond to an `IndicatorLabel` definition in your properties. |
| `IndicatorBufferType.ColorIndex` | The buffer stores color indexes, allowing you to dynamically change the color of individual points or bars on the chart. |
| `IndicatorBufferType.Calculations` | A temporary array used for storing intermediate math. It will never be rendered. |

> [!TIP]
> Always store your `IIndicatorBuffer` instances in class-level fields during `OnInit()` to avoid the overhead of retrieving them during high-frequency calculations.

---

Next, proceed to **[Calculation Flow](calculation.md)** to learn how to fill these buffers efficiently using `OnCalculate`.
