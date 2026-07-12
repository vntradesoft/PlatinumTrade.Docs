---
id: index
title: Drawing
sidebar_position: 2
description: Drawing API allows you to create, modify, and delete drawing objects on charts programmatically.
status: stable
visibility: public
---

# Drawing API

The Drawing API allows your strategies to draw visual objects on the chart, such as trend lines, text, fibonacci retracements, and rectangles. You can access these methods via the Drawing property on your strategy or client context.

## Add

Adds a raw drawing object to the chart.

**Syntax**

`csharp
string Add(DrawingObject obj);
`

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| obj | [DrawingObject](../../models.md#drawingobject) | The drawing object to add to the chart. |

**Return Value**

Returns the unique string identifier (id) of the added drawing object.

## Remove

Removes a drawing object by its unique identifier.

**Syntax**

`csharp
void Remove(string id);
`

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| id | string | The unique identifier of the drawing object. |

## Update

Updates an existing drawing object by applying a mutation action.

**Syntax**

`csharp
void Update(string id, Action<DrawingObject> mutate);
`

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| id | string | The unique identifier of the drawing object to update. |
| mutate | Action&lt;[DrawingObject](../../models.md#drawingobject)&gt; | A callback action that modifies the drawing object properties. |

## Clear

Clears all drawing objects, optionally filtered by symbol.

**Syntax**

`csharp
void Clear(string? symbol = null);
`

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| symbol | string? | Optional trading symbol to filter objects for clearing. If null, all objects across all symbols are cleared. |

## GetAll

Retrieves all drawing objects for a specific symbol and timeframe.

**Syntax**

`csharp
IReadOnlyList<DrawingObject> GetAll(string symbol, Timeframe tf);
`

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| symbol | string | The trading symbol. |
| 	f | [Timeframe](../../enums.md#timeframe) | The chart timeframe. |

**Return Value**

Returns a read-only list of drawing objects.

## GetById

Retrieves a specific drawing object by its unique identifier.

**Syntax**

`csharp
DrawingObject? GetById(string id);
`

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| id | string | The unique identifier of the object. |

**Return Value**

Returns the drawing object if found; otherwise, 
ull.

## AddHorizontalLine

Creates and adds a horizontal line drawing object.

**Syntax**

`csharp
string AddHorizontalLine(string symbol, Timeframe tf, decimal price, DrawingStyle? style = null, DrawingSource source = DrawingSource.Strategy, string? indicatorId = null);
`

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| symbol | string | The trading symbol. |
| 	f | [Timeframe](../../enums.md#timeframe) | The chart timeframe. |
| price | decimal | The price level for the horizontal line. |
| style | [DrawingStyle](../../models.md#drawingstyle)? | Optional visual style. |
| source | [DrawingSource](../../enums.md#drawingsource) | Origin source (e.g., Strategy, Indicator). Default is Strategy. |
| indicatorId | string? | The optional ID of the indicator that created the drawing. |

## AddTrendLine

Creates and adds a trend line drawing object between two points.

**Syntax**

`csharp
string AddTrendLine(string symbol, Timeframe tf, DrawingAnchor startAnchor, DrawingAnchor endAnchor, DrawingStyle? style = null, string? indicatorId = null);
`

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| symbol | string | The trading symbol. |
| 	f | [Timeframe](../../enums.md#timeframe) | The chart timeframe. |
| startAnchor | [DrawingAnchor](../../models.md#drawinganchor) | The starting coordinate (time and price). |
| endAnchor | [DrawingAnchor](../../models.md#drawinganchor) | The ending coordinate (time and price). |
| style | [DrawingStyle](../../models.md#drawingstyle)? | Optional visual style. |
| indicatorId | string? | The optional ID of the indicator. |

## AddRectangle

Creates and adds a rectangle drawing object.

**Syntax**

`csharp
string AddRectangle(string symbol, Timeframe tf, DrawingAnchor topLeft, DrawingAnchor bottomRight, DrawingStyle? style = null, string? indicatorId = null);
`

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| symbol | string | The trading symbol. |
| 	f | [Timeframe](../../enums.md#timeframe) | The chart timeframe. |
| 	opLeft | [DrawingAnchor](../../models.md#drawinganchor) | The top-left corner coordinate. |
| ottomRight | [DrawingAnchor](../../models.md#drawinganchor) | The bottom-right corner coordinate. |
| style | [DrawingStyle](../../models.md#drawingstyle)? | Optional visual style. |
| indicatorId | string? | The optional ID of the indicator. |

## AddText

Creates and adds a text label drawing object.

**Syntax**

`csharp
string AddText(string symbol, Timeframe tf, DrawingAnchor anchor, string text, DrawingStyle? style = null, string? indicatorId = null);
`

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| symbol | string | The trading symbol. |
| 	f | [Timeframe](../../enums.md#timeframe) | The chart timeframe. |
| nchor | [DrawingAnchor](../../models.md#drawinganchor) | The coordinate where the text will be placed. |
| 	ext | string | The text content to display. |
| style | [DrawingStyle](../../models.md#drawingstyle)? | Optional visual style. |
| indicatorId | string? | The optional ID of the indicator. |

## AddEmoji

Creates and adds an emoji icon drawing object.

**Syntax**

`csharp
string AddEmoji(string symbol, Timeframe tf, DrawingAnchor anchor, string emoji, DrawingStyle? style = null, string? indicatorId = null);
`

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| symbol | string | The trading symbol. |
| 	f | [Timeframe](../../enums.md#timeframe) | The chart timeframe. |
| nchor | [DrawingAnchor](../../models.md#drawinganchor) | The coordinate where the emoji will be placed. |
| emoji | string | The unicode emoji character (e.g., "??"). |
| style | [DrawingStyle](../../models.md#drawingstyle)? | Optional visual style. |
| indicatorId | string? | The optional ID of the indicator. |

## AddMeasurement

Creates and adds a measurement tool (ruler) drawing object.

**Syntax**

`csharp
string AddMeasurement(string symbol, Timeframe tf, DrawingAnchor startAnchor, DrawingAnchor endAnchor, string? indicatorId = null);
`

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| symbol | string | The trading symbol. |
| 	f | [Timeframe](../../enums.md#timeframe) | The chart timeframe. |
| startAnchor | [DrawingAnchor](../../models.md#drawinganchor) | The starting coordinate. |
| endAnchor | [DrawingAnchor](../../models.md#drawinganchor) | The ending coordinate. |
| indicatorId | string? | The optional ID of the indicator. |
