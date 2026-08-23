---
sidebar_position: 4
id: sdk-indicator-properties-buffers
title: Thuộc Tính & Buffer
description: Cấu hình thuộc tính hiển thị đồ họa và mảng dữ liệu
status: published
visibility: public
---

# Thuộc Tính & Buffer

Chỉ báo bao gồm các phép tính toán học áp dụng vào chuỗi giá. Để vẽ kết quả này lên biểu đồ, bạn phải cấu hình **Thuộc Tính (Properties)** (cách hiển thị) và cấp phát **Buffer** (nơi lưu trữ dữ liệu).

## IndicatorProperty

Phương thức `CreateDefaultProperty` trong chỉ báo định nghĩa siêu dữ liệu mà GUI cần để hiển thị chỉ báo chính xác.

```csharp
protected override IndicatorProperty CreateDefaultProperty()
{
    var property = new IndicatorProperty(
        name: $"MyMomentum({_period})",
        window: IndicatorWindow.Separate,  // Vị trí hiển thị
        buffers: 1,                        // Tổng số buffer
        plots: 1                           // Số lượng buffer được vẽ lên biểu đồ
    )
    {
        Labels = new Dictionary<int, IndicatorLabel>
        {
            {
                0, new IndicatorLabel // Cài đặt cho Buffer 0
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

### Cửa Sổ Hiển Thị (`IndicatorWindow`)

| Giá Trị | Mô tả | Ví Dụ |
|---|---|---|
| `IndicatorWindow.Main` | Vẽ đè trực tiếp lên các cây nến của biểu đồ giá chính. | SMA, EMA, Bollinger Bands |
| `IndicatorWindow.Separate` | Vẽ trong một khung panel phụ riêng biệt bên dưới biểu đồ giá. | RSI, MACD, Volume |

### Kiểu Vẽ (`IndicatorDrawType`)

| Giá Trị | Mô tả |
|---|---|
| `Line` | Đường kẻ liền nối các điểm dữ liệu. |
| `Histogram` | Các cột dọc thẳng đứng tính từ mức zero hoặc đáy. |
| `Arrow` | Các biểu tượng đánh dấu riêng lẻ (mũi tên/chấm tròn) tại các điểm cụ thể. |
| `Section` | Các đoạn đường không liên tục (không nối các điểm bị thiếu dữ liệu). |
| `None` | Buffer bị ẩn (dùng cho các phép tính toán trung gian). |

### Tính Năng Đặc Biệt (Special Features)

Bạn có thể áp dụng các đường giới hạn biên độ trực quan nâng cao cho `IndicatorProperty` qua thuộc tính `SpecialFeatures`. Điều này rất phổ biến đối với các bộ dao động như RSI.

```csharp
SpecialFeatures = new IndicatorSpecialFeatures
{
    ShowZeroLine = true,
    ZeroLineColor = IndicatorColor.Gray,
    ZeroLineWidth = 1.0,

    // Định nghĩa các đường ngưỡng cố định trên biểu đồ
    BoundLines = new[]
    {
        new BoundLine { Value = 70, Color = IndicatorColor.Red },
        new BoundLine { Value = 30, Color = IndicatorColor.Green }
    },

    // Tô màu nền giữa hai ngưỡng
    BoundFill = new BoundFill
    {
        UpperBound = 70,
        LowerBound = 30,
        FillColor = IndicatorColor.LightBlue,
        FillOpacity = 0.2
    }
}
```

## Cấp Phát Buffer (Buffer Allocation)

Sau khi thuộc tính được định nghĩa, nền tảng sẽ gọi hàm `OnInit()`. Tại đây, bạn phải cấp phát các mảng nội bộ để chứa dữ liệu đã tính toán.

```csharp
private IIndicatorBuffer? _rocBuffer;

public override bool OnInit()
{
    // BẮT BUỘC phải gọi triển khai cơ sở base!
    if (!base.OnInit())
        return false;

    // Buffer 0 dùng để chứa dữ liệu vẽ
    SetBuffer(0, IndicatorBufferType.Data);
    
    // Lấy đối tượng buffer
    _rocBuffer = GetBuffer(0);
    
    return true;
}
```

### Các Loại Buffer (`IndicatorBufferType`)

| Loại | Mô tả |
|---|---|
| `IndicatorBufferType.Data` | Buffer chứa dữ liệu để vẽ lên biểu đồ. Chỉ số của nó phải tương ứng với định nghĩa `IndicatorLabel` trong thuộc tính của bạn. |
| `IndicatorBufferType.ColorIndex` | Buffer chứa chỉ số màu sắc, cho phép bạn đổi màu động từng điểm hoặc thanh nến trên biểu đồ. |
| `IndicatorBufferType.Calculations` | Mảng tạm thời dùng để lưu trữ các phép tính trung gian. Buffer này không bao giờ được vẽ lên giao diện. |

> [!TIP]
> Luôn lưu các đối tượng `IIndicatorBuffer` vào các trường cấp lớp (field) trong hàm `OnInit()` để tránh chi phí tìm nạp lại trong quá trình tính toán tần suất cao.

---

Tiếp theo, hãy chuyển sang trang **[Luồng Tính Toán](calculation.md)** để tìm hiểu cách điền dữ liệu vào các buffer này một cách tối ưu bằng `OnCalculate`.
