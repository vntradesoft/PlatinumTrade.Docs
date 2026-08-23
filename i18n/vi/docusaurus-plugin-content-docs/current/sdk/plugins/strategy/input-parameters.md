---
sidebar_position: 4
id: sdk-strategy-input-parameters
title: Tham Số Đầu Vào
description: Định nghĩa các tham số tùy biến và thuộc tính schema
---

# Hệ Thống InputParameter

Nền tảng sử dụng luồng làm việc dựa trên annotation (thuộc tính chú thích) cho các tham số của chiến lược.

Nhà phát triển plugin chỉ cần định nghĩa một lớp schema duy nhất với các attribute. Nền tảng sau đó sẽ tự động:

1. Xây dựng siêu dữ liệu `InputParameter` phục vụ hiển thị trên GUI và lưu trữ bền vững dạng JSON.
2. Tự động nạp các giá trị do người dùng chỉnh sửa từ tệp `<TênChiếnLược>.json`.
3. Tự động liên kết (bind) dữ liệu vào một đối tượng có định kiểu và inject vào chiến lược thông qua DI.

Bạn không cần phải tự tạo từ điển tham số thủ công hay viết lớp ánh xạ `GetValue<T>` phức tạp.

## Các Kiểu Thuộc Tính Được Hỗ Trợ

`InputSchemaBuilder` hỗ trợ các kiểu thuộc tính sau trong các lớp schema:

| Kiểu Thuộc Tính | Kiểu Parameter Tương Ứng |
|---|---|
| `int` | `IntParameter` |
| `double`, `float` | `DoubleParameter` |
| `decimal` | `DecimalParameter` |
| `bool` | `BoolParameter` |
| `string` | `StringParameter` |
| `TimeSpan` | `TimeSpanParameter` |
| `DateTime` | `DateTimeParameter` |
| `enum` | `EnumParameter` |
| `List<string>` | `ListParameter<string>` |
| `List<int>` | `ListParameter<int>` |
| `List<decimal>` | `ListParameter<decimal>` |
| `List<double>` | `ListParameter<double>` |
| `List<float>` | `ListParameter<float>` |
| `List<bool>` | `ListParameter<bool>` |
| `List<long>` | `ListParameter<long>` |

Sử dụng `[InputParamIgnore]` cho các thuộc tính tính toán nội bộ hoặc chỉ dùng trong runtime.

## Kiểu Dữ Liệu String Chuyên Biệt

Đối với thuộc tính `string`, bạn có thể chỉ định gợi ý kiểu dữ liệu qua `InputParam.DataType`.

Các gợi ý hiện được hỗ trợ:

| DataType | Kiểu Parameter Đầu Ra | Mục Đích Sử Dụng |
|---|---|---|
| `InputParamDataType.Auto` | `StringParameter` | Văn bản thông thường |
| `InputParamDataType.FilePath` | `FilePathParameter` | Chọn đường dẫn tệp và kiểm tra tính hợp lệ của đường dẫn |

## Tham Số Danh Sách (List Parameters)

### Tổng Quan

Sử dụng thuộc tính `List<T>` để lưu trữ các tập hợp giá trị nguyên thủy (primitive). Các kiểu phần tử được hỗ trợ:
string, int, decimal, double, float, bool, long.

Các tham số danh sách được tuần tự hóa dưới dạng các giá trị phân tách bằng dấu phẩy trong JSON và được phân tích cú pháp (parse) kèm kiểm tra tính hợp lệ trên từng phần tử.

### Ví Dụ: Danh Sách Cặp Coin Cho Phép & Mức Rủi Ro

```csharp
[InputParam(
    Section = 1,
    SectionTitle = "Giao Dịch",
    Order = 1,
    Description = "Danh sách symbol giao dịch (phân tách bởi dấu phẩy)")]
public List<string> AllowedSymbols { get; set; } = new()
{
    "BTC-USDT",
    "ETH-USDT",
    "SOL-USDT"
};

[InputParam(
    Section = 1,
    Order = 2,
    Description = "Các mức tỷ lệ Risk-Reward")]
public List<decimal> RiskRewardRatios { get; set; } = new()
{
    1.0m,
    1.5m,
    2.0m
};

[InputParam(
    Section = 1,
    Order = 3,
    Description = "Các khung giờ giao dịch (0-23)")]
public List<int> SessionHours { get; set; } = new() { 9, 10, 14, 16, 18 };
```

### Đọc Tham Số Trong Chiến Lược

```csharp
using Pt.Okx.Sdk.Strategy.Parameters;

internal sealed class MyStrategyInput
{
    [InputParam(
        Section = 1,
        SectionTitle = "Chỉ Báo",
        Order = 1,
        Min = 1,
        Max = 500,
        Description = "Chu kỳ MA Nhanh")]
    public int FastPeriod { get; set; } = 10;

    [InputParam(
        Section = 1,
        Order = 2,
        Min = 0.1,
        Max = 10,
        Description = "Mức rủi ro mỗi lệnh (%)")]
    public decimal RiskPercent { get; set; } = 2.0m;

    [InputParam(
        Section = 1,
        Order = 3,
        Description = "Thời gian nghỉ giữa các lần vào lệnh")]
    public TimeSpan EntryCooldown { get; set; } = TimeSpan.FromMinutes(15);

    [InputParam(
        Section = 2,
        SectionTitle = "Thực Thi",
        Order = 1,
        Description = "Bật Trailing Stop")]
    public bool EnableTrailing { get; set; } = true;

    [InputParam(
        Section = 2,
        Order = 2,
        DataType = InputParamDataType.FilePath,
        Description = "Đường dẫn đến DLL chỉ báo tùy chỉnh")]
    public string CustomIndicatorDllPath { get; set; } = string.Empty;

    [InputParam(
        Section = 2,
        Order = 3,
        Description = "Danh sách cặp giao dịch cho phép")]
    public List<string> AllowedSymbols { get; set; } = new() { "BTC-USDT", "ETH-USDT" };

    [InputParam(
        Section = 2,
        Order = 4,
        Description = "Các mức tỷ lệ Risk-Reward")]
    public List<decimal> RiskRewardLevels { get; set; } = new() { 0.5m, 1.0m, 2.0m };

    [InputParamIgnore]
    public List<string> RuntimeCache { get; set; } = new();
}
```

## Khai Báo Kiểu Schema Trong Plugin

```csharp
using Pt.Okx.Sdk.Strategy.Plugin;

public class MyStrategyPlugin : IStrategyPlugin, IStrategyPluginMetadata, IStrategyPluginInputSchema
{
    public Type GetInputSchemaType() => typeof(MyStrategyInput);
}
```

## Đọc Tham Số Trong Chiến Lược Qua DI

Inject lớp schema trực tiếp vào constructor của chiến lược:

```csharp
public class MyStrategy : StrategyBase
{
    private readonly MyStrategyInput _input;

    public MyStrategy(MyStrategyInput input)
    {
        _input = input;
    }
}
```

Đối tượng schema được inject chỉ chứa các giá trị cụ thể, giúp mã nguồn thực thi ngắn gọn và rõ ràng:

```csharp
var riskPercent = _input.RiskPercent;
```

## Đăng Ký Schema Cho DI

```csharp
public void Register(IServiceCollection services)
{
    services.AddSingleton(sp =>
    {
        var manager = sp.GetRequiredService<IInputParamManager>();
        return manager.BindSchema<MyStrategyInput>();
    });

    services.AddSingleton<IStrategy, MyStrategy>();
}
```

## Tiện Ích Ghi Log Tích Hợp Sẵn

SDK cung cấp phương thức mở rộng logger tiện lợi cho đối tượng schema:

```csharp
_strategyLogger.LogInputParams(_input);
```

Phương thức này ghi log toàn bộ thuộc tính công khai trừ những thuộc tính được đánh dấu `[InputParamIgnore]`.

## Truy Cập Siêu Dữ Liệu (Min/Max, Description, Key)

Để truy cập siêu dữ liệu một cách an toàn tại thời điểm biên dịch, sử dụng `InputSchemaMetadata` kèm biểu thức thuộc tính:

```csharp
var metadata = InputSchemaMetadata.Get<MyStrategyInput, decimal>(x => x.RiskPercent);
var range = InputSchemaMetadata.GetRange<MyStrategyInput, decimal>(x => x.RiskPercent);

Console.WriteLine(metadata.Key);        // riskPercent
Console.WriteLine(range.Min);           // 0.1
Console.WriteLine(range.Max);           // 10
```
