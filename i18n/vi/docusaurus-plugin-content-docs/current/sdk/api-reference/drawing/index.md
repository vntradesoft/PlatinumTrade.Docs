---
id: index
title: Drawing API
sidebar_position: 2
description: Drawing API cho phép tạo, sửa đổi và xóa các đối tượng vẽ trực quan trên biểu đồ theo chương trình.
status: stable
visibility: public
sidebar_label: Vẽ Biểu Đồ (Drawing)
---

# Drawing API

Drawing API cho phép chiến lược của bạn vẽ các đối tượng trực quan trên biểu đồ, chẳng hạn như đường xu hướng, văn bản, fibonacci và hình chữ nhật. Bạn có thể truy cập các phương thức này qua thuộc tính `Drawing` trên chiến lược hoặc context client.

## Add
Thêm một đối tượng vẽ thô vào biểu đồ.

**Cú pháp**

```csharp
string Add(DrawingObject obj);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `obj` | [`DrawingObject`](../models.md) | Đối tượng vẽ cần thêm vào biểu đồ. |

**Giá trị trả về**

Trả về chuỗi định danh duy nhất (`id`) của đối tượng vẽ đã thêm.

**Ghi chú**

Không có ghi chú đặc biệt.

**Ví dụ**

```csharp
// Context.Add();
```

---

## Remove
Xóa một đối tượng vẽ theo mã định danh duy nhất.

**Cú pháp**

```csharp
void Remove(string id);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `id` | `string` | Định danh duy nhất của đối tượng vẽ. |

**Giá trị trả về**

`void`

**Ghi chú**

Không có ghi chú đặc biệt.

**Ví dụ**

```csharp
// Context.Remove();
```

---

## Update
Cập nhật một đối tượng vẽ hiện có bằng cách áp dụng một hành động sửa đổi.

**Cú pháp**

```csharp
void Update(string id, DrawingObject mutate);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `id` | `string` | Định danh duy nhất của đối tượng vẽ cần cập nhật. |
| `mutate` | `Action&lt;`[`DrawingObject`](../models.md)`&gt;` | Hàm callback sửa đổi các thuộc tính của đối tượng vẽ. |

**Giá trị trả về**

`void`

**Ghi chú**

Không có ghi chú đặc biệt.

**Ví dụ**

```csharp
// Context.Update();
```

---

## Clear
Xóa toàn bộ các đối tượng vẽ, có thể lọc theo symbol.

**Cú pháp**

```csharp
void Clear(string? symbol);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `symbol` | `string?` | Cặp giao dịch tùy chọn để lọc đối tượng cần xóa. Nếu `null`, toàn bộ đối tượng trên mọi symbol sẽ bị xóa. |

**Giá trị trả về**

`void`

**Ghi chú**

Không có ghi chú đặc biệt.

**Ví dụ**

```csharp
// Context.Drawing.Clear(...);
```

---

## GetAll
Lấy danh sách toàn bộ đối tượng vẽ cho một symbol và khung thời gian cụ thể.

**Cú pháp**

```csharp
DrawingObject GetAll(string symbol, Timeframe tf);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `symbol` | `string` | Mã cặp giao dịch. |
| `tf` | [`Timeframe`](../enums.md) | Khung thời gian biểu đồ. |

**Giá trị trả về**

Trả về danh sách chỉ đọc các [`DrawingObject`](../models.md).

**Ghi chú**

Không có ghi chú đặc biệt.

**Ví dụ**

```csharp
// Context.GetAll();
```

---

## GetById
Lấy một đối tượng vẽ cụ thể theo định danh duy nhất của nó.

**Cú pháp**

```csharp
DrawingObject GetById(string id);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `id` | `string` | Định danh duy nhất của đối tượng. |

**Giá trị trả về**

Trả về [`DrawingObject`](../models.md) nếu tìm thấy; ngược lại trả về `null`.

**Ghi chú**

Không có ghi chú đặc biệt.

**Ví dụ**

```csharp
// Context.GetById();
```

---

## AddHorizontalLine
Tạo và thêm một đối tượng vẽ đường ngang (horizontal line).

**Cú pháp**

```csharp
string AddHorizontalLine(string symbol, Timeframe tf, decimal price, DrawingStyle style, DrawingSource source, string? indicatorId);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `symbol` | `string` | Mã cặp giao dịch. |
| `tf` | [`Timeframe`](../enums.md) | Khung thời gian biểu đồ. |
| `price` | `decimal` | Mức giá của đường ngang. |
| `style` | [`DrawingStyle`](../models.md)? | Kiểu hiển thị trực quan tùy chọn. |
| `source` | [`DrawingSource`](../enums.md) | Nguồn khởi tạo (ví dụ: Strategy, Indicator). Mặc định là Strategy. |
| `indicatorId` | `string?` | ID tùy chọn của chỉ báo đã tạo hình vẽ. |

**Giá trị trả về**

Trả về chuỗi định danh duy nhất (`id`) của đối tượng vẽ đã thêm.

**Ghi chú**

Không có ghi chú đặc biệt.

**Ví dụ**

```csharp
// Context.AddHorizontalLine();
```

---

## AddTrendLine
Tạo và thêm một đường xu hướng (trend line) nối giữa hai điểm.

**Cú pháp**

```csharp
string AddTrendLine(string symbol, Timeframe tf, DrawingAnchor startAnchor, DrawingAnchor endAnchor, DrawingStyle style, string? indicatorId);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `symbol` | `string` | Mã cặp giao dịch. |
| `tf` | [`Timeframe`](../enums.md) | Khung thời gian biểu đồ. |
| `startAnchor` | [`DrawingAnchor`](../models.md) | Tọa độ điểm bắt đầu (thời gian và giá). |
| `endAnchor` | [`DrawingAnchor`](../models.md) | Tọa độ điểm kết thúc (thời gian và giá). |
| `style` | [`DrawingStyle`](../models.md)? | Kiểu hiển thị trực quan tùy chọn. |
| `indicatorId` | `string?` | ID tùy chọn của chỉ báo. |

**Giá trị trả về**

Trả về chuỗi định danh duy nhất (`id`) của đối tượng vẽ đã thêm.

**Ghi chú**

Không có ghi chú đặc biệt.

**Ví dụ**

```csharp
// Context.AddTrendLine();
```

---

## AddRectangle
Tạo và thêm một đối tượng vẽ hình chữ nhật.

**Cú pháp**

```csharp
string AddRectangle(string symbol, Timeframe tf, DrawingAnchor topLeft, DrawingAnchor bottomRight, DrawingStyle style, string? indicatorId);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `symbol` | `string` | Mã cặp giao dịch. |
| `tf` | [`Timeframe`](../enums.md) | Khung thời gian biểu đồ. |
| `topLeft` | [`DrawingAnchor`](../models.md) | Tọa độ góc trên bên trái. |
| `bottomRight` | [`DrawingAnchor`](../models.md) | Tọa độ góc dưới bên phải. |
| `style` | [`DrawingStyle`](../models.md)? | Kiểu hiển thị trực quan tùy chọn. |
| `indicatorId` | `string?` | ID tùy chọn của chỉ báo. |

**Giá trị trả về**

Trả về chuỗi định danh duy nhất (`id`) của đối tượng vẽ đã thêm.

**Ghi chú**

Không có ghi chú đặc biệt.

**Ví dụ**

```csharp
// Context.AddRectangle();
```

---

## AddText
Tạo và thêm một nhãn văn bản (text label) lên biểu đồ.

**Cú pháp**

```csharp
string AddText(string symbol, Timeframe tf, DrawingAnchor anchor, string text, DrawingStyle style, string? indicatorId);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `symbol` | `string` | Mã cặp giao dịch. |
| `tf` | [`Timeframe`](../enums.md) | Khung thời gian biểu đồ. |
| `anchor` | [`DrawingAnchor`](../models.md) | Tọa độ đặt văn bản. |
| `text` | `string` | Nội dung văn bản cần hiển thị. |
| `style` | [`DrawingStyle`](../models.md)? | Kiểu hiển thị trực quan tùy chọn. |
| `indicatorId` | `string?` | ID tùy chọn của chỉ báo. |

**Giá trị trả về**

Trả về chuỗi định danh duy nhất (`id`) của đối tượng vẽ đã thêm.

**Ghi chú**

Không có ghi chú đặc biệt.

**Ví dụ**

```csharp
// Context.AddText();
```

---

## AddEmoji
Tạo và thêm một biểu tượng cảm xúc (emoji) lên biểu đồ.

**Cú pháp**

```csharp
string AddEmoji(string symbol, Timeframe tf, DrawingAnchor anchor, string emoji, DrawingStyle style, string? indicatorId);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `symbol` | `string` | Mã cặp giao dịch. |
| `tf` | [`Timeframe`](../enums.md) | Khung thời gian biểu đồ. |
| `anchor` | [`DrawingAnchor`](../models.md) | Tọa độ đặt biểu tượng emoji. |
| `emoji` | `string` | Ký tự unicode biểu tượng cảm xúc (ví dụ: "🚀"). |
| `style` | [`DrawingStyle`](../models.md)? | Kiểu hiển thị trực quan tùy chọn. |
| `indicatorId` | `string?` | ID tùy chọn của chỉ báo. |

**Giá trị trả về**

Trả về chuỗi định danh duy nhất (`id`) của đối tượng vẽ đã thêm.

**Ghi chú**

Không có ghi chú đặc biệt.

**Ví dụ**

```csharp
// Context.AddEmoji();
```

---

## AddMeasurement
Tạo và thêm một công cụ đo lường (ruler/thước đo) trên biểu đồ.

**Cú pháp**

```csharp
string AddMeasurement(string symbol, Timeframe tf, DrawingAnchor startAnchor, DrawingAnchor endAnchor, string? indicatorId);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `symbol` | `string` | Mã cặp giao dịch. |
| `tf` | [`Timeframe`](../enums.md) | Khung thời gian biểu đồ. |
| `startAnchor` | [`DrawingAnchor`](../models.md) | Tọa độ điểm bắt đầu. |
| `endAnchor` | [`DrawingAnchor`](../models.md) | Tọa độ điểm kết thúc. |
| `indicatorId` | `string?` | ID tùy chọn của chỉ báo. |

**Giá trị trả về**

Trả về chuỗi định danh duy nhất (`id`) của đối tượng vẽ đã thêm.

**Ghi chú**

Không có ghi chú đặc biệt.

**Ví dụ**

```csharp
// Context.AddMeasurement();
```
