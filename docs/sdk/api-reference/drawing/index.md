---
id: index
title: Drawing
sidebar_position: 2
description: Drawing API allows you to create, modify, and delete drawing objects on charts programmatically.
status: stable
visibility: public
---

# Drawing API

The Drawing API allows your strategies to draw visual objects on the chart, such as trend lines, text, fibonacci retracements, and rectangles. You can access these methods via the `Drawing` property on your strategy or client context.

## Add
Adds a raw drawing object to the chart.

**Syntax**

```csharp
id Add(DrawingObject obj);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `obj` | [`DrawingObject`](../models.md#drawingobject) | The drawing object to add to the chart. |

**Return Value**

Returns the unique string identifier (`id`) of the added drawing object.

**Remarks**

No special remarks.

**Example**

```csharp
// Context.Add();
```

---

## Remove
Removes a drawing object by its unique identifier.

**Syntax**

```csharp
void Remove(string id);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | The unique identifier of the drawing object. |

**Return Value**

void

**Remarks**

No special remarks.

**Example**

```csharp
// Context.Remove();
```

---

## Update
Updates an existing drawing object by applying a mutation action.

**Syntax**

```csharp
void Update(string id, DrawingObject mutate);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | The unique identifier of the drawing object to update. |
| `mutate` | `Action&lt;`[`DrawingObject`](../models.md#drawingobject)`&gt;` | A callback action that modifies the drawing object properties. |

**Return Value**

void

**Remarks**

No special remarks.

**Example**

```csharp
// Context.Update();
```

---

## Clear
Clears all drawing objects, optionally filtered by symbol.

**Syntax**

```csharp
void Clear(string? symbol);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | Optional trading symbol to filter objects for clearing. If null, all objects across all symbols are cleared. |

**Return Value**

void

**Remarks**

No special remarks.

**Example**

```csharp
// Context.Drawing.Clear(...);
```

---

## GetAll
Retrieves all drawing objects for a specific symbol and timeframe.

**Syntax**

```csharp
DrawingObject GetAll(string symbol, Timeframe tf);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `tf` | [`Timeframe`](../enums.md#timeframe) | The chart timeframe. |

**Return Value**

Returns a read-only list of [`DrawingObject`](../models.md#drawingobject).

**Remarks**

No special remarks.

**Example**

```csharp
// Context.GetAll();
```

---

## GetById
Retrieves a specific drawing object by its unique identifier.

**Syntax**

```csharp
DrawingObject GetById(string id);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | The unique identifier of the object. |

**Return Value**

Returns the [`DrawingObject`](../models.md#drawingobject) if found; otherwise, `null`.

**Remarks**

No special remarks.

**Example**

```csharp
// Context.GetById();
```

---

## AddHorizontalLine
Creates and adds a horizontal line drawing object.

**Syntax**

```csharp
id AddHorizontalLine(string symbol, Timeframe tf, decimal price, DrawingStyle style, DrawingSource source, string? indicatorId);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `tf` | [`Timeframe`](../enums.md#timeframe) | The chart timeframe. |
| `price` | `decimal` | The price level for the horizontal line. |
| `style` | [`DrawingStyle`](../models.md#drawingstyle)? | Optional visual style. |
| `source` | [`DrawingSource`](../enums.md#drawingsource) | Origin source (e.g., Strategy, Indicator). Default is Strategy. |
| `indicatorId` | `string?` | The optional ID of the indicator that created the drawing. |

**Return Value**

Returns the unique string identifier (`id`) of the added drawing object.

**Remarks**

No special remarks.

**Example**

```csharp
// Context.AddHorizontalLine();
```

---

## AddTrendLine
Creates and adds a trend line drawing object between two points.

**Syntax**

```csharp
id AddTrendLine(string symbol, Timeframe tf, DrawingAnchor startAnchor, DrawingAnchor endAnchor, DrawingStyle style, string? indicatorId);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `tf` | [`Timeframe`](../enums.md#timeframe) | The chart timeframe. |
| `startAnchor` | [`DrawingAnchor`](../models.md#drawinganchor) | The starting coordinate (time and price). |
| `endAnchor` | [`DrawingAnchor`](../models.md#drawinganchor) | The ending coordinate (time and price). |
| `style` | [`DrawingStyle`](../models.md#drawingstyle)? | Optional visual style. |
| `indicatorId` | `string?` | The optional ID of the indicator. |

**Return Value**

Returns the unique string identifier (`id`) of the added drawing object.

**Remarks**

No special remarks.

**Example**

```csharp
// Context.AddTrendLine();
```

---

## AddRectangle
Creates and adds a rectangle drawing object.

**Syntax**

```csharp
id AddRectangle(string symbol, Timeframe tf, DrawingAnchor topLeft, DrawingAnchor bottomRight, DrawingStyle style, string? indicatorId);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `tf` | [`Timeframe`](../enums.md#timeframe) | The chart timeframe. |
| `topLeft` | [`DrawingAnchor`](../models.md#drawinganchor) | The top-left corner coordinate. |
| `bottomRight` | [`DrawingAnchor`](../models.md#drawinganchor) | The bottom-right corner coordinate. |
| `style` | [`DrawingStyle`](../models.md#drawingstyle)? | Optional visual style. |
| `indicatorId` | `string?` | The optional ID of the indicator. |

**Return Value**

Returns the unique string identifier (`id`) of the added drawing object.

**Remarks**

No special remarks.

**Example**

```csharp
// Context.AddRectangle();
```

---

## AddText
Creates and adds a text label drawing object.

**Syntax**

```csharp
id AddText(string symbol, Timeframe tf, DrawingAnchor anchor, string text, DrawingStyle style, string? indicatorId);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `tf` | [`Timeframe`](../enums.md#timeframe) | The chart timeframe. |
| `anchor` | [`DrawingAnchor`](../models.md#drawinganchor) | The coordinate where the text will be placed. |
| `text` | `string` | The text content to display. |
| `style` | [`DrawingStyle`](../models.md#drawingstyle)? | Optional visual style. |
| `indicatorId` | `string?` | The optional ID of the indicator. |

**Return Value**

Returns the unique string identifier (`id`) of the added drawing object.

**Remarks**

No special remarks.

**Example**

```csharp
// Context.AddText();
```

---

## AddEmoji
Creates and adds an emoji icon drawing object.

**Syntax**

```csharp
id AddEmoji(string symbol, Timeframe tf, DrawingAnchor anchor, string emoji, DrawingStyle style, string? indicatorId);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `tf` | [`Timeframe`](../enums.md#timeframe) | The chart timeframe. |
| `anchor` | [`DrawingAnchor`](../models.md#drawinganchor) | The coordinate where the emoji will be placed. |
| `emoji` | `string` | The unicode emoji character (e.g., "🚀"). |
| `style` | [`DrawingStyle`](../models.md#drawingstyle)? | Optional visual style. |
| `indicatorId` | `string?` | The optional ID of the indicator. |

**Return Value**

Returns the unique string identifier (`id`) of the added drawing object.

**Remarks**

No special remarks.

**Example**

```csharp
// Context.AddEmoji();
```

---

## AddMeasurement
Creates and adds a measurement tool (ruler) drawing object.

**Syntax**

```csharp
id AddMeasurement(string symbol, Timeframe tf, DrawingAnchor startAnchor, DrawingAnchor endAnchor, string? indicatorId);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | The trading symbol. |
| `tf` | [`Timeframe`](../enums.md#timeframe) | The chart timeframe. |
| `startAnchor` | [`DrawingAnchor`](../models.md#drawinganchor) | The starting coordinate. |
| `endAnchor` | [`DrawingAnchor`](../models.md#drawinganchor) | The ending coordinate. |
| `indicatorId` | `string?` | The optional ID of the indicator. |

**Return Value**

Returns the unique string identifier (`id`) of the added drawing object.

**Remarks**

No special remarks.

**Example**

```csharp
// Context.AddMeasurement();
```

---
