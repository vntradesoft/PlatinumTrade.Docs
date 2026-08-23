---
sidebar_position: 9
id: sdk-drawing-api
title: API Vẽ Biểu Đồ
description: Vẽ chỉ báo, đường thẳng, hình học và văn bản trực tiếp lên biểu đồ
---

# API Vẽ Biểu Đồ (Drawing API)

API Vẽ Biểu Đồ cho phép các chiến lược giao dịch tự động vẽ các đối tượng đồ họa (đường thẳng, hình khối, văn bản, ...) trực tiếp lên biểu đồ trong ứng dụng **Platinum Trade App**.

## Tổng Quan Về IDrawingManager

Interface `IDrawingManager` cung cấp các thao tác CRUD và các phương thức tiện ích để tạo nhanh các đối tượng vẽ. Chiến lược nhận dịch vụ này qua cơ chế Dependency Injection:

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
> Khi chiến lược chạy trong ứng dụng console **CLI Bot** (nơi không có giao diện đồ họa), hệ thống sẽ tự động inject `NullDrawingManager`, giúp các thao tác vẽ được bỏ qua an toàn mà không gây ra lỗi.

## Các Đối Tượng Vẽ (Drawing Objects)

SDK hỗ trợ nhiều loại đối tượng vẽ, tất cả đều kế thừa từ lớp cơ sở `DrawingObject`:

| Loại Đối Tượng | Mô tả | Điểm Neo (Anchor Points) |
|---|---|---|
| `HorizontalLineObject` | Đường kẻ ngang theo mức giá | `Price` |
| `VerticalLineObject` | Đường kẻ dọc theo mốc thời gian | `Time` |
| `TrendLineObject` | Đường xu hướng nối hai điểm | `Start`, `End` |
| `RectangleObject` | Hình chữ nhật (vùng giá) | `TopLeft`, `BottomRight` |
| `TextObject` | Nhãn văn bản ghi chú | `Anchor` |
| `EmojiObject` | Biểu tượng cảm xúc (Emoji) | `Anchor` |
| `MeasurementObject` | Công cụ đo khoảng cách giá/thời gian | `Start`, `End` |
| `FibRetracementObject` | Các mức thoái lui Fibonacci | `Start`, `End` |

### Cấu Trúc DrawingAnchor

Các tọa độ trên biểu đồ được xác định bởi `DrawingAnchor`, đại diện cho tọa độ `(Time, Price)` chính xác:

```csharp
public struct DrawingAnchor
{
    public DateTime Time { get; set; }
    public decimal Price { get; set; }
}
```

## Vẽ Nhanh Qua Tiện Ích Mở Rộng (Convenience Methods)

Cách thuận tiện nhất để vẽ là dùng các phương thức mở rộng (extension methods). Các phương thức này tự động khởi tạo đối tượng, thêm vào trình quản lý và trả về ID duy nhất của đối tượng:

### Đường Ngang (Horizontal Line)

Vẽ một đường ngang tại một mức giá cụ thể (ví dụ: Hỗ trợ / Kháng cự):

```csharp
string id = _drawing.AddHorizontalLine(
    symbol: "BTC-USDT",
    tf: Timeframe.OneHour,
    price: 95000m,
    style: new DrawingStyle 
    { 
        Color = "#FF0000",   // Màu đỏ
        Width = 2.0,
        LineStyle = DrawingLineStyle.Dashed 
    });
```

### Đường Xu Hướng (Trend Line)

Vẽ đường nối hai điểm xác định:

```csharp
var start = new DrawingAnchor { Time = DateTime.UtcNow.AddDays(-1), Price = 90000m };
var end = new DrawingAnchor { Time = DateTime.UtcNow, Price = 95000m };

string id = _drawing.AddTrendLine(
    "BTC-USDT", Timeframe.OneHour, start, end,
    style: new DrawingStyle { Color = "#00FF00" });
```

### Văn Bản và Emoji

Vẽ nhãn văn bản hoặc emoji tại một tọa độ cụ thể:

```csharp
var anchor = new DrawingAnchor { Time = DateTime.UtcNow, Price = 96000m };

// Thêm văn bản
_drawing.AddText("BTC-USDT", Timeframe.OneHour, anchor, "Tín Hiệu Mua",
    style: new DrawingStyle { Color = "#FFFFFF" });

// Thêm emoji
_drawing.AddEmoji("BTC-USDT", Timeframe.OneHour, anchor, "🚀");
```

### Hình Chữ Nhật (Rectangle)

Vẽ hình chữ nhật để làm nổi bật một vùng giá (ví dụ: vùng Cung/Cầu - Supply/Demand):

```csharp
var topLeft = new DrawingAnchor { Time = DateTime.UtcNow.AddHours(-4), Price = 96000m };
var bottomRight = new DrawingAnchor { Time = DateTime.UtcNow, Price = 95000m };

_drawing.AddRectangle("BTC-USDT", Timeframe.OneHour, topLeft, bottomRight,
    style: new DrawingStyle 
    { 
        Color = "#FFFF00", 
        Fill = true, 
        FillColor = "#22FFFF00" // 22 là mã alpha hex tạo độ trong suốt
    });
```

## Quản Lý Đối Tượng Vẽ (CRUD)

### Khởi Tạo và Thêm Thủ Công

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

### Cập Nhật

Bạn có thể chỉnh sửa thuộc tính của một đối tượng vẽ đã tồn tại. Thao tác này sẽ tự động báo hiệu cho giao diện người dùng vẽ lại:

```csharp
_drawing.Update(id, obj =>
{
    if (obj is HorizontalLineObject hline)
    {
        hline.Price = 96500m;
        hline.Style.Color = "#00FF00"; // Đổi sang màu xanh lá
    }
});
```

### Xóa Đối Tượng

```csharp
// Xóa một đối tượng theo ID
_drawing.Remove(id);

// Xóa tất cả đối tượng của một cặp tiền cụ thể
_drawing.Clear("BTC-USDT");

// Xóa TOÀN BỘ đối tượng vẽ trên tất cả cặp tiền
_drawing.Clear();
```

## Tùy Chọn Kiểu Dáng (Styling Options)

Lớp `DrawingStyle` quy định diện mạo đồ họa của đối tượng:

```csharp
public class DrawingStyle
{
    public string Color { get; set; } = "#FFFFFF";       // Màu viền nét vẽ
    public double Width { get; set; } = 1.0;             // Độ dày nét vẽ
    public DrawingLineStyle LineStyle { get; set; }      // Nét liền (Solid), Nét đứt (Dashed), Nét chấm (Dotted)
    public double Opacity { get; set; } = 1.0;           // Độ mờ từ 0.0 đến 1.0
    public bool Fill { get; set; }                       // Bật chế độ tô nền
    public string FillColor { get; set; } = "#44FFFFFF"; // Màu nền tô
}
```

> [!TIP]
> Màu sắc được định dạng dưới dạng chuỗi hex chuẩn (`#RRGGBB` hoặc `#AARRGGBB` kèm kênh alpha trong suốt).

## Ví Dụ Thực Tế: Vẽ Đường Hỗ Trợ & Kháng Cự

Dưới đây là một ví dụ thực tế về chiến lược tự động vẽ các mức Hỗ trợ & Kháng cự động dựa trên đỉnh/đáy của 20 cây nến gần nhất:

```csharp
public async Task RunAsync(StrategyEventType eventType, IStrategyStateStore state, CancellationToken ct)
{
    if (eventType != StrategyEventType.Kline) return;

    var candles = await _client.Timeseries.CopySeries(startPos: 0, count: 20);
    if (candles.Length < 20) return;

    decimal highestHigh = candles.Max(c => c.High);
    decimal lowestLow = candles.Min(c => c.Low);

    // Xóa các đường vẽ cũ
    _drawing.Clear("BTC-USDT");

    // Vẽ đường Kháng cự (Màu đỏ)
    _drawing.AddHorizontalLine("BTC-USDT", Timeframe.OneHour, highestHigh, 
        new DrawingStyle { Color = "#FF4444", Width = 2, LineStyle = DrawingLineStyle.Dashed });

    // Vẽ đường Hỗ trợ (Màu xanh lá)
    _drawing.AddHorizontalLine("BTC-USDT", Timeframe.OneHour, lowestLow, 
        new DrawingStyle { Color = "#44FF44", Width = 2, LineStyle = DrawingLineStyle.Dashed });
        
    // Thêm nhãn chữ ghi chú
    var labelAnchor = new DrawingAnchor { Time = DateTime.UtcNow, Price = highestHigh };
    _drawing.AddText("BTC-USDT", Timeframe.OneHour, labelAnchor, "Kháng Cự R1", 
        new DrawingStyle { Color = "#FF4444" });
}
```

## Xem Thêm

- [IDrawingManager](xref:Pt.Okx.Sdk.Drawing.IDrawingManager) Tài Liệu API
- [Plugin Chiến Lược](../plugins/strategy/overview.md) — Tài liệu phát triển chiến lược
