---
sidebar_position: 6
id: sdk-strategy-indicators
title: Chỉ Báo Trong Chiến Lược
description: Đăng ký và sử dụng các chỉ báo kỹ thuật trong chiến lược giao dịch
---

# Sử Dụng Chỉ Báo Trong Chiến Lược

Một chiến lược giao dịch định lượng vững chắc thường dựa vào các chỉ báo kỹ thuật. `Pt.Okx.Sdk` cung cấp một tập hợp đa dạng các chỉ báo tích hợp sẵn và hỗ trợ nạp động các chỉ báo tùy chỉnh được phát triển qua kiến trúc [Plugin Chỉ Báo](../indicator/overview.md).

## 1. Sử Dụng Các Chỉ Báo Tích Hợp Sẵn

Để sử dụng chỉ báo tích hợp sẵn, bạn gọi các phương thức `CreateIndicator...` từ thuộc tính `_client.Timeseries` trong giai đoạn `OnInitAsync` của chiến lược.

Khi bạn tạo chỉ báo theo cách này, nền tảng sẽ tự động đăng ký nó. Khi có nến hoặc tick mới đến, nền tảng sẽ tự động cấp dữ liệu vào chỉ báo để cập nhật giá trị. Hơn nữa, bất kỳ chỉ báo nào được tạo tại đây cũng sẽ **tự động được vẽ lên Biểu Đồ GUI**.

### Ví Dụ Khởi Tạo

```csharp
public class MyStrategy : StrategyBase
{
    private readonly IOkxClient _client;
    
    // Lưu tham chiếu để đọc giá trị sau này
    private IIndicatorSuperTrend _superTrend;
    private IIndicatorATR _atr;

    public MyStrategy(IOkxClient client)
    {
        _client = client;
    }

    public async Task<bool> OnInitAsync(IStrategyStateStore state, CancellationToken ct)
    {
        // 1. Tạo chỉ báo SuperTrend
        _superTrend = _client.Timeseries.CreateIndicatorSuperTrend(
            indicatorAlias: "SuperTrendMain", // Tên định danh duy nhất trên biểu đồ
            timeframe: Timeframe.M15,
            period: 14,
            multiplier: 3.0,
            propertyOptions: (o) => 
            { 
                o.Labels[0].Width = 1.5; 
                o.Labels[0].Color = IndicatorColor.DarkRed; 
            });

        // 2. Tạo chỉ báo ATR (ẩn khỏi biểu đồ)
        _atr = _client.Timeseries.CreateIndicatorATR(
             indicatorAlias: "ATRStoploss",
             period: 14,
             method: MaMethod.EMA,
             propertyOptions: o => { o.IsVisible = false; }); // Ẩn khỏi GUI

        return true;
    }
}
```

### Đọc Giá Trị Trong OnTickAsync

Sau khi được khởi tạo, các chỉ báo sẽ luôn tự động duy trì giá trị mới nhất. Bạn chỉ cần đọc thuộc tính của chúng khi có một cây nến mới đóng.

> [!IMPORTANT]
> Khi đọc giá trị của chỉ báo (ví dụ: `_atr.Value` hoặc `.FindValue(0)`), hệ thống luôn trả về giá trị được tính toán tại **cây nến đã đóng hoàn chỉnh gần nhất** (`shift: 0`). Hệ thống không hỗ trợ truy xuất giá trị chỉ báo cho cây nến đang hình thành (chưa đóng).

```csharp
public override async Task OnTickAsync(TickPhase tickPhase, CancellationToken ct)
{
    if (tickPhase == TickPhase.BarClose)
    {
        // Đọc giá trị tính toán mới nhất
        var currentTrend = _superTrend.Trend;
        var currentAtr = _atr.Value;

        if (currentTrend == SuperTrendDirection.Up)
        {
            // Thực hiện logic Mua (Long)...
        }
    }
}
```

## 2. Nạp Chỉ Báo Tùy Chỉnh Từ Plugin DLL

Nếu bạn đã phát triển các chỉ báo tùy chỉnh được biên dịch thành một tệp `.dll` bên ngoài, bạn có thể nạp động chúng vào chiến lược của mình.

### Inject Các Dịch Vụ Cần Thiết

Để nạp plugin, chiến lược cần dịch vụ `IIndicatorPluginLoader` và `IIndicatorFactory`:

```csharp
public class MyStrategy : StrategyBase
{
    private readonly IOkxClient _client;
    private readonly IIndicatorPluginLoader _indicatorPluginLoader;
    private readonly IIndicatorFactory _indicatorFactory;
    private readonly IStrategyLogger _logger;

    public MyStrategy(
        IOkxClient client,
        IIndicatorPluginLoader indicatorPluginLoader,
        IIndicatorFactory indicatorFactory,
        IStrategyLogger logger)
    {
        _client = client;
        _indicatorPluginLoader = indicatorPluginLoader;
        _indicatorFactory = indicatorFactory;
        _logger = logger;
    }
}
```

### Nạp Tệp DLL Plugin

Trong `OnInitAsync`, bạn yêu cầu `IIndicatorPluginLoader` quét và nạp file DLL chứa các chỉ báo tùy chỉnh:

```csharp
public async Task<bool> OnInitAsync(IStrategyStateStore state, CancellationToken ct)
{
    // Đường dẫn file DLL (thường được cấu hình qua InputParameters)
    string dllPath = @"C:\Trading\Plugins\MyCustomIndicators.dll";
    
    // 1. Nạp DLL
    _indicatorPluginLoader.LoadAll(dllPath);

    // Tùy chọn: Ghi log danh sách plugin đã nạp
    foreach (var p in _indicatorPluginLoader.LoadedPlugins)
    {
        _logger.LogInformation("Init", 
            $"Đã nạp plugin: {p.Name} v{p.Version} — danh sách chỉ báo: [{string.Join(", ", p.IndicatorNames)}]");
    }
    
    // 2. Khởi tạo các chỉ báo tùy chỉnh
    InitializeCustomIndicators();

    return true;
}
```

### Khởi Tạo Chỉ Báo Tùy Chỉnh

```csharp
private void InitializeCustomIndicators()
{
    // Kiểm tra xem plugin có đăng ký chỉ báo "MACrossover" hay không
    if (_indicatorFactory.IsCustomRegistered("MACrossover"))
    {
        _client.Timeseries.CreateCustomIndicator(
            customName: "MACrossover",       // Tên chính xác đã đăng ký trong plugin
            indicatorAlias: "MACrossover",   // Tên hiển thị trên biểu đồ
            parameters: new Dictionary<string, object>
            {
                // Truyền tham số động cho chỉ báo
                ["FastPeriod"] = 10,
                ["SlowPeriod"] = 20,
            },
            propertyOptions: o => 
            { 
                o.Labels[0].Width = 1.5; 
                o.Labels[1].Width = 1.5; 
            });
    }
}
```
