---
sidebar_position: 2
id: sdk-indicator-registration
title: Đăng Ký & Tham Số
description: Đăng ký chỉ báo và quản lý các tham số đầu vào
status: published
visibility: public
---

# Đăng Ký & Tham Số

Phần này giải thích cách đăng ký các triển khai chỉ báo của bạn với hệ thống và định nghĩa các tham số cấu hình đầu vào.

## Đăng Ký Chỉ Báo

Trong triển khai `IIndicatorPlugin`, phương thức `RegisterIndicators` được dùng để móc nối các lớp chỉ báo của bạn. Bạn sử dụng `IIndicatorRegistrationContext` để định nghĩa logic khởi tạo (mẫu Factory).

```csharp
using Pt.Okx.Sdk.Indicators.Plugin;

public class MyIndicatorPlugin : IIndicatorPlugin
{
    // ... metadata properties ...

    public void RegisterIndicators(IIndicatorRegistrationContext context)
    {
        // Ví dụ: Đăng ký chỉ báo Simple Moving Average (SMA)
        context.Register(
            name: "MySMA",
            creator: (factory, manager, config, options) =>
            {
                // Đảm bảo các tham số mặc định tồn tại trong config trước khi tạo instance
                if (!config.Parameters.Contains("Period"))
                    config.SetParam("Period", null, 14);

                // Trả về đối tượng chỉ báo thực tế
                return new CalcIndMySMA(factory, manager, config, options);
            },
            // Định nghĩa tham số cho giao diện UI
            parameterDefs: new[]
            {
                new IndicatorParameterInfo(
                    Key: "Period",
                    DisplayName: "Chu Kỳ Đường Trung Bình (Period)",
                    ValueType: typeof(int),
                    DefaultValue: 14,
                    MinValue: 1,
                    MaxValue: 500)
            }
        );
    }
}
```

## Định Nghĩa Tham Số (Parameter Definitions)

Mảng `parameterDefs` chứa các đối tượng `IndicatorParameterInfo`.

> [!NOTE]
> Giao diện đồ họa (GUI) sử dụng các đối tượng này để tự động tạo hộp thoại thuộc tính trực quan cho người dùng khi họ thêm chỉ báo của bạn vào biểu đồ.

```csharp
public record IndicatorParameterInfo(
    string Key,           // Khóa cấu hình dùng để lấy giá trị
    string DisplayName,   // Tên hiển thị trong hộp thoại cài đặt UI
    Type ValueType,       // typeof(int), typeof(double), typeof(string), v.v.
    object DefaultValue,  // Giá trị mặc định
    object? MinValue,     // Tùy chọn: Giá trị nhỏ nhất cho phép (cho kiểu số)
    object? MaxValue);    // Tùy chọn: Giá trị lớn nhất cho phép (cho kiểu số)
```

## Đọc Tham Số Trong Chỉ Báo

Khi lớp chỉ báo tùy chỉnh của bạn (kế thừa từ `CalcIndBase`) được khởi tạo, bạn cần đọc các giá trị tham số do người dùng nhập để phương thức `OnCalculate` có thể sử dụng.

Bạn thực hiện việc này bên trong phương thức `CreateDefaultProperty()` bằng cách dùng `GetParameter<T>()`.

```csharp
using Pt.Okx.Sdk.Indicators.Base;
using Pt.Okx.Sdk.Indicators.Models;
using Pt.Okx.Sdk.Indicators.Services;

public class CalcIndMySMA : CalcIndBase
{
    private int _period;

    public CalcIndMySMA(
        IIndicatorFactory factory, 
        IIndicatorManager manager, 
        IndicatorConfig config, 
        Action<IndicatorProperty>? propertyOptions = null)
        : base(factory, manager, config, propertyOptions)
    {
    }

    protected override IndicatorProperty CreateDefaultProperty()
    {
        // 1. Đọc tham số do người dùng cấu hình (hoặc mặc định)
        _period = GetParameter<int>("Period");

        // 2. Trả về thuộc tính dựa trên tham số đó
        return new IndicatorProperty(
            name: $"MySMA({_period})",
            window: IndicatorWindow.Main, // Hiển thị đè lên biểu đồ giá chính
            buffers: 1,
            plots: 1
        )
        {
            // Thiết lập kiểu dáng tại đây...
        };
    }
}
```

> [!IMPORTANT]
> Phương thức `GetParameter<T>(key)` được cung cấp sẵn bởi lớp cơ sở `CalcIndBase`. Phương thức này đọc một cách an toàn từ từ điển tham số được truyền qua `IndicatorConfig`.

---

Tiếp theo, hãy chuyển sang trang **[Thuộc Tính & Buffer](properties-buffers.md)** để tìm hiểu cách cấu hình đầu ra đồ họa và mảng dữ liệu tính toán.
