---
sidebar_position: 3
id: sdk-getting-started
title: Bắt Đầu Nhanh
description: Hướng dẫn sử dụng SDK để phát triển chỉ báo và chiến lược giao dịch
---

# Bắt Đầu Nhanh

Hướng dẫn này sẽ giúp bạn thiết lập một dự án và viết những dòng mã đầu tiên với `Pt.Okx.Sdk`.

## Yêu Cầu Cần Có

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) trở lên
- Visual Studio 2022 / Rider / VS Code
- Quyền truy cập NuGet feed nội bộ (nếu dùng private NuGet)

## Tạo Dự Án Plugin Chiến Lược

### 1. Cài đặt dotnet templates (Khuyên dùng)

Cách nhanh nhất để tạo khung dự án plugin mới là sử dụng dotnet templates chính thức. Cài đặt một lần từ mã nguồn repo:

```bash
# Từ thư mục gốc của repository:
dotnet new install ./templates/StrategyTemplate
dotnet new install ./templates/IndicatorTemplate
```

Sau đó tạo dự án mới chỉ trong vài giây:

```bash
# Plugin chiến lược (Strategy)
dotnet new pt-strategy -n MyTradingStrategy

# Plugin chỉ báo (Indicator)
dotnet new pt-indicator -n MyCustomIndicators
```

Dự án được tạo sẵn bao gồm:
- File `.csproj` chuẩn tham chiếu `Pt.Okx.Sdk`
- Cấu trúc mẫu triển khai `IStrategyPlugin`, `IStrategyImpl`, và `IStrategyInput` (hoặc `IIndicatorPlugin` / `CalcIndBase`)
- `Properties/launchSettings.json` có sẵn các hồ sơ khởi chạy **live** và **backtest** trỏ trực tiếp đến `PlatinumTrade.exe`

Mở dự án trong Visual Studio, chọn hồ sơ **live** hoặc **backtest** từ dropdown chạy và nhấn **F5** để khởi chạy PlatinumTrade ở chế độ tương ứng.

### 2. Tham chiếu Pt.Okx.Sdk (Cách thủ công)

Thêm project reference tới `Pt.Okx.Sdk`:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="..\Pt.Okx.Sdk\Pt.Okx.Sdk.csproj" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.DependencyInjection.Abstractions" />
  </ItemGroup>
</Project>
```

### 3. Triển Khai IStrategy

```csharp
using Pt.Okx.Sdk.Strategy;
using Pt.Okx.Sdk.Strategy.Events;

public class MyStrategy : IStrategy
{
    private readonly IOkxClient _client;
    private readonly IStrategyLogger _logger;

    public MyStrategy(IOkxClient client, IStrategyLogger logger)
    {
        _client = client;
        _logger = logger;
    }

    public async Task<bool> OnInitAsync(IStrategyStateStore state, CancellationToken ct)
    {
        _logger.LogInformation("Init", "Chiến lược đã khởi tạo");
        return true;
    }

    public async Task RunAsync(
        StrategyEventType eventType,
        IStrategyStateStore state,
        CancellationToken ct)
    {
        if (eventType == StrategyEventType.Kline)
        {
            var candle = await _client.Timeseries
                .GetCurrentCandleAsync(ct: ct);
            _logger.LogDebug("Tick",
                "Giá hiện tại: {Price}", candle.Close);
        }
    }

    public Task<bool> OnStopAsync(CancellationToken ct)
    {
        _logger.LogInformation("Stop", "Chiến lược đã dừng");
        return Task.FromResult(true);
    }
}
```

### 4. Đăng Ký Plugin

```csharp
using Microsoft.Extensions.DependencyInjection;
using Pt.Okx.Sdk.Strategy;
using Pt.Okx.Sdk.Strategy.Plugin;

public class MyStrategyPlugin : IStrategyPlugin, IStrategyPluginMetadata
{
    public string Name => "MyStrategy";
    public string PluginVersion => "1.0";
    public string Author => "Tên của bạn";
    public string Description => "Chiến lược giao dịch tùy chỉnh.";

    public void Register(IServiceCollection services)
    {
        services.AddSingleton<IStrategy, MyStrategy>();
    }

    public void RegisterForBacktest(IServiceCollection services)
    {
        services.AddTransient<IStrategy, MyStrategy>();
    }
}
```

Tính tương thích phiên bản sẽ được máy chủ tự động phát hiện từ phiên bản `Pt.Okx.Sdk` được tham chiếu trong assembly plugin của bạn.

> [!NOTE]
> Giao dịch Live sử dụng `AddSingleton` (một phiên bản duy nhất trong suốt vòng đời). Backtesting sử dụng `AddTransient` (tạo một phiên bản mới cho mỗi lần chạy mô phỏng).

## IOkxClient — Điểm Truy Cập Chính

`IOkxClient` là interface tổng hợp cung cấp quyền truy cập vào 4 sub-client:

```csharp
public interface IOkxClient
{
    ITimeSeriesClient Timeseries { get; init; }  // OHLCV, chỉ báo
    IInstrumentClient Instrument { get; init; }  // Thông tin cặp giao dịch
    IAccountClient Account { get; init; }        // Số dư, đòn bẩy
    ITradeClient Trade { get; init; }            // Lệnh, vị thế
}
```

Các chiến lược nhận `IOkxClient` thông qua Constructor Injection:

```csharp
// Đọc dữ liệu nến
var candle = await _client.Timeseries.GetLastClosedCandle();

// Kiểm tra số dư khả dụng
var balance = _client.Account.AvailableBalance;

// Đặt lệnh giao dịch
var result = await _client.Trade.PlaceOrderAsync(
    symbol: "BTC-USDT",
    side: OrderSide.Buy,
    type: OrderType.Market,
    quantity: 0.01m);
```

## Chạy Chiến Lược Của Bạn

Để chạy hoặc backtest chiến lược đã biên dịch, nạp tệp `.dll` trực tiếp vào giao diện **Platinum Trade App**:

1. Build dự án chiến lược để tạo file assembly DLL.
2. Tham khảo [Hướng Dẫn Cấu Hình Chiến Lược GUI](../../products/gui/strategy-config.md) để xem chi tiết các bước nạp DLL, điều chỉnh tham số đầu vào và chạy ở chế độ Live hoặc Backtest.

## Các Bước Tiếp Theo

- [Hướng Dẫn Debug](debugging.md) — Cách debug chiến lược với breakpoint trực tiếp
- [Mẫu ApiResult](api-result.md) — Cách xử lý lỗi chuẩn xác
- [Sử Dụng Trading Client](trading-client.md) — Đặt lệnh và hủy lệnh
- [Plugin Chiến Lược](../plugins/strategy/overview.md) — Chi tiết toàn diện về vòng đời chiến lược
