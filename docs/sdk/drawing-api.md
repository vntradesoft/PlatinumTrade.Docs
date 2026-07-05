---
id: sdk-drawing-api
title: Drawing API
description: Drawing indicators, lines, shapes, and texts on charts
status: draft
visibility: internal
publish: false
---

# Drawing API

The Drawing API allows trading strategies to programmatically draw objects (lines, shapes, text, etc.) directly on the chart in the **Platinum Trade App**.

## IDrawingManager — Overview

The `IDrawingManager` interface provides CRUD operations and convenience factory methods for creating drawing objects. A strategy receives this service via Dependency Injection.

```csharp
public class MyStrategy : IStrategy
{
    private readonly IDrawingManager _drawing;

    public MyStrategy(IDrawingManager drawing)
    {
        _drawing = drawing;
    }
}
```

> [!NOTE]
> When the strategy runs in the **CLI Bot** console application (where there is no UI), a `NullDrawingManager` is automatically injected, making all drawing operations safe no-ops.

## Drawing Objects

The SDK supports various drawing objects, all inheriting from the `DrawingObject` base class.

| Type | Description | Anchor Points |
|---|---|---|
| `HorizontalLineObject` | A horizontal price line | `Price` |
| `VerticalLineObject` | A vertical time line | `Time` |
| `TrendLineObject` | A straight line connecting two points | `Start`, `End` |
| `RectangleObject` | A rectangular shape | `TopLeft`, `BottomRight` |
| `TextObject` | A text label | `Anchor` |
| `EmojiObject` | An emoji marker | `Anchor` |
| `MeasurementObject` | A tool measuring price/time delta | `Start`, `End` |
| `FibRetracementObject` | Fibonacci retracement levels | `Start`, `End` |

### The DrawingAnchor

Points on the chart are defined by a `DrawingAnchor`, representing an exact `(Time, Price)` coordinate:

```csharp
public struct DrawingAnchor
{
    public DateTime Time { get; set; }
    public decimal Price { get; set; }
}
```

## Adding Drawings (Convenience Methods)

The easiest way to draw is using the factory extension methods. These methods automatically create the object, add it to the manager, and return its unique ID.

### Horizontal Line

Draws a line at a specific price level (e.g., Support / Resistance).

```csharp
string id = _drawing.AddHorizontalLine(
    symbol: "BTC-USDT",
    tf: Timeframe.OneHour,
    price: 95000m,
    style: new DrawingStyle 
    { 
        Color = "#FF0000",   // Red
        Width = 2.0,
        LineStyle = DrawingLineStyle.Dashed 
    });
```

### Trend Line

Draws a line connecting two specific points.

```csharp
var start = new DrawingAnchor { Time = DateTime.UtcNow.AddDays(-1), Price = 90000m };
var end = new DrawingAnchor { Time = DateTime.UtcNow, Price = 95000m };

string id = _drawing.AddTrendLine(
    "BTC-USDT", Timeframe.OneHour, start, end,
    style: new DrawingStyle { Color = "#00FF00" });
```

### Text and Emoji

Draws text labels or emoji markers at specific coordinates.

```csharp
var anchor = new DrawingAnchor { Time = DateTime.UtcNow, Price = 96000m };

// Add text
_drawing.AddText("BTC-USDT", Timeframe.OneHour, anchor, "Buy Signal",
    style: new DrawingStyle { Color = "#FFFFFF" });

// Add emoji
_drawing.AddEmoji("BTC-USDT", Timeframe.OneHour, anchor, "🚀");
```

### Rectangle

Draws a rectangle to highlight an area on the chart (e.g., a supply/demand zone).

```csharp
var topLeft = new DrawingAnchor { Time = DateTime.UtcNow.AddHours(-4), Price = 96000m };
var bottomRight = new DrawingAnchor { Time = DateTime.UtcNow, Price = 95000m };

_drawing.AddRectangle("BTC-USDT", Timeframe.OneHour, topLeft, bottomRight,
    style: new DrawingStyle 
    { 
        Color = "#FFFF00", 
        Fill = true, 
        FillColor = "#22FFFF00" // 22 is hex alpha
    });
```

## Managing Drawings (CRUD)

If the convenience methods don't cover your use case, you can create and manage objects manually.

### Create and Add

```csharp
var fib = new FibRetracementObject
{
    Symbol = "BTC-USDT",
    Timeframe = Timeframe.OneHour,
    Start = new DrawingAnchor { Time = startT, Price = startP },
    End = new DrawingAnchor { Time = endT, Price = endP },
    Levels = new List<double> { 0, 0.382, 0.5, 0.618, 1 },
    Style = new DrawingStyle { Color = "#FFFFFF" },
    Source = DrawingSource.Strategy
};

string id = _drawing.Add(fib);
```

### Update

You can mutate properties of an existing drawing object. This automatically notifies the UI to redraw.

```csharp
_drawing.Update(id, obj =>
{
    if (obj is HorizontalLineObject hline)
    {
        hline.Price = 96500m;
        hline.Style.Color = "#00FF00"; // Change to green
    }
});
```

### Remove and Clear

```csharp
// Remove a specific object
_drawing.Remove(id);

// Clear all objects for a specific symbol
_drawing.Clear("BTC-USDT");

// Clear ALL objects across all symbols
_drawing.Clear();
```

## Styling Options

The `DrawingStyle` class controls the visual appearance of objects.

```csharp
public class DrawingStyle
{
    public string Color { get; set; } = "#FFFFFF";       // Stroke color
    public double Width { get; set; } = 1.0;             // Line width
    public DrawingLineStyle LineStyle { get; set; }      // Solid, Dashed, Dotted
    public double Opacity { get; set; } = 1.0;           // 0.0 to 1.0
    public bool Fill { get; set; }                       // Enable background fill
    public string FillColor { get; set; } = "#44FFFFFF"; // Background color
}
```

> [!TIP]
> Colors are defined as standard hex strings (`#RRGGBB` or `#AARRGGBB` for alpha transparency).

## Example: Drawing Support & Resistance

Here is a practical example of a strategy drawing dynamic Support & Resistance lines based on the recent High/Low.

```csharp
public async Task RunAsync(StrategyEventType eventType, IStrategyStateStore state, CancellationToken ct)
{
    if (eventType != StrategyEventType.Kline) return;

    var candles = await _client.Timeseries.CopySeries(startPos: 0, count: 20);
    if (candles.Length < 20) return;

    decimal highestHigh = candles.Max(c => c.High);
    decimal lowestLow = candles.Min(c => c.Low);

    // Clear previous drawings
    _drawing.Clear("BTC-USDT");

    // Draw Resistance (Red)
    _drawing.AddHorizontalLine("BTC-USDT", Timeframe.OneHour, highestHigh, 
        new DrawingStyle { Color = "#FF4444", Width = 2, LineStyle = DrawingLineStyle.Dashed });

    // Draw Support (Green)
    _drawing.AddHorizontalLine("BTC-USDT", Timeframe.OneHour, lowestLow, 
        new DrawingStyle { Color = "#44FF44", Width = 2, LineStyle = DrawingLineStyle.Dashed });
        
    // Add text label
    var labelAnchor = new DrawingAnchor { Time = DateTime.UtcNow, Price = highestHigh };
    _drawing.AddText("BTC-USDT", Timeframe.OneHour, labelAnchor, "R1", 
        new DrawingStyle { Color = "#FF4444" });
}
```

## See also

- [IDrawingManager](xref:Pt.Okx.Sdk.Drawing.IDrawingManager) API Reference
- [Strategy Plugin](strategy/overview.md) — Main strategy documentation