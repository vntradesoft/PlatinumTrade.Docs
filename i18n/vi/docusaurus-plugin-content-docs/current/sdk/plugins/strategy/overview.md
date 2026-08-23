---
sidebar_position: 1
id: sdk-strategy-overview
title: Tổng Quan Về Chiến Lược
description: Vòng đời, interface và kiến trúc của các chiến lược giao dịch
---

# Plugin Chiến Lược: Tổng Quan & Cài Đặt

Hướng dẫn này giải thích nền tảng phát triển plugin chiến lược giao dịch cho nền tảng Platinum Trading Platform. Hệ thống plugin được thiết kế để cùng một mã nguồn chiến lược có thể chạy mượt mà trên cả môi trường **Backtest** (Giao diện GUI) và **Live Trading** (Bot tự động) mà không cần chỉnh sửa mã nguồn.

## Bước 1: Tạo Dự Án

Một chiến lược tùy chỉnh được biên dịch thành một tệp `.dll` độc lập sử dụng thư viện .NET 10 Class Library chuẩn.

### Lựa chọn A — Sử dụng dotnet template (Khuyên dùng)

Cài đặt template một lần (từ thư mục gốc repo hoặc NuGet) và khởi tạo dự án:

```bash
dotnet new install ./templates/StrategyTemplate   # Cài đặt một lần
dotnet new pt-strategy -n MyStrategy
```

Lệnh này tạo một dự án hoàn chỉnh với đầy đủ các tệp cần thiết và cấu hình sẵn `Properties/launchSettings.json` (xem thêm phần [Chạy Chiến Lược Của Bạn](#chạy-chiến-lược-của-bạn)).

### Lựa chọn B — Thiết lập thủ công

1. Mở terminal và tạo một class library mới:
   ```bash
   dotnet new classlib -n MyStrategy -f net10.0
   ```
2. Thêm project reference tới SDK (`Pt.Okx.Sdk.csproj`) hoặc cài đặt gói NuGet nếu bạn phát triển bên ngoài repo chính.
3. Tệp `.csproj` của bạn sẽ có dạng:
   ```xml
   <Project Sdk="Microsoft.NET.Sdk">
     <PropertyGroup>
       <TargetFramework>net10.0</TargetFramework>
       <ImplicitUsings>enable</ImplicitUsings>
       <Nullable>enable</Nullable>
     </PropertyGroup>

     <ItemGroup>
       <ProjectReference Include="..\Pt.Okx.Sdk\Pt.Okx.Sdk.csproj" />
     </ItemGroup>
   </Project>
   ```

## IStrategy — Vòng Đời Cốt Lõi

Mọi chiến lược đều tuân theo vòng đời `IStrategy`. Trong hầu hết trường hợp, hãy kế thừa từ `StrategyBase` và chỉ ghi đè các hàm xử lý bạn cần.

```csharp
public interface IStrategy
{
    // ① Khởi tạo — được gọi một lần duy nhất khi bot bắt đầu chạy
    Task<bool> OnInitAsync(IStrategyStateStore state, CancellationToken ct);

    // ② Callback nhịp thị trường — được gọi trên mỗi cập nhật thị trường
    Task OnTickAsync(TickPhase tickPhase, CancellationToken ct);

    // ③ Dọn dẹp — được gọi một lần khi bot dừng hoạt động
    Task<bool> OnStopAsync(CancellationToken ct);
}
```

Lớp cơ sở khuyên dùng `StrategyBase` cũng cung cấp các hàm xử lý sự kiện tùy chọn:

- `OnOrderAsync(...)`
- `OnAlgoOrderAsync(...)`
- `OnPositionAsync(...)`
- `OnTransactionAsync(...)`
- `OnBalanceAsync(...)`
- `OnTradeCommandAsync(...)`

Host engine sẽ điều phối các sự kiện nội bộ tới các hàm xử lý này.

### Sơ Đồ Vòng Đời

Quy trình thực thi của một chiến lược tuân theo mẫu sau:

```text
Khởi Động Bot
  │
  ├── OnInitAsync()         ← Cài đặt chỉ báo, nạp cấu hình, khôi phục trạng thái
  │
    ├── OnTickAsync(Tick)           ← Cập nhật trong nến (intra-bar)
    ├── OnTickAsync(BarClose)       ← Cập nhật khi đóng nến (candle close)
    ├── OnOrderAsync(...)           ← Cập nhật trạng thái lệnh
    ├── OnPositionAsync(...)        ← Cập nhật vị thế
    ├── OnBalanceAsync(...)         ← Biến động số dư tài khoản
    ├── OnAlgoOrderAsync(...)       ← Cập nhật lệnh điều kiện (Algo order)
    ├── OnTransactionAsync(...)     ← Sự kiện khớp lệnh giao dịch
    ├── OnTradeCommandAsync(...)    ← Lệnh điều khiển từ Telegram / GUI
  │   ... (lặp lại liên tục) ...
  │
  └── OnStopAsync()          ← Dọn dẹp, hủy lệnh chờ, đóng vị thế (tùy chọn)
```

## Quản Lý Trạng Thái

- Trạng thái khi thực thi được duy trì nội bộ bởi host engine.
- Các chiến lược nên xem trạng thái là mối quan tâm thuộc tầng hạ tầng, không phải là đầu vào callback công khai chính.
- Sử dụng `TickPhase` để phân biệt logic xử lý trong nến (intra-bar) và khi đóng nến (bar-close) trong hàm `OnTickAsync`.

## IStrategyPlugin — Đăng Ký DI

Để nền tảng có thể tự động nhận diện chiến lược của bạn, bạn cần cung cấp một điểm truy cập triển khai `IStrategyPlugin` và `IStrategyPluginMetadata`. Điểm truy cập này đăng ký chiến lược và các phụ thuộc của nó vào vùng chứa **Dependency Injection (DI)**.

```csharp
using Microsoft.Extensions.DependencyInjection;
using Pt.Okx.Sdk.Enums;
using Pt.Okx.Sdk.Strategy;
using Pt.Okx.Sdk.Strategy.Plugin;

public class MyStrategyPlugin : IStrategyPlugin, IStrategyPluginMetadata
{
    // --- Metadata ---
    public string Name => "MyStrategy";
    public string PluginVersion => "1.0.0";
    public string Author => "Tên của bạn";
    public string Description => "Mô tả về chiến lược giao dịch.";

    // Tùy chọn: tùy biến mức log hiển thị trên giao diện UI
    public IReadOnlyList<PtLogLevel>? PluginDisplayLogLevels => new[]
    {
        PtLogLevel.Debug,
        PtLogLevel.Information,
        PtLogLevel.Warning,
        PtLogLevel.Error,
        PtLogLevel.Critical
    };

    // Tùy chọn: tùy biến mức log kích hoạt thông báo ra bên ngoài (ví dụ: Telegram)
    public IReadOnlyList<PtLogLevel>? PluginNotifyLevels => new[]
    {
        PtLogLevel.Warning,
        PtLogLevel.Error,
        PtLogLevel.Critical,
        PtLogLevel.Success
    };

    // --- Đăng Ký Cho Giao Dịch Live ---
    public void Register(IServiceCollection services)
    {
        // Live trading — sử dụng Singleton
        services.AddSingleton<IStrategy, MyStrategy>();
        services.AddSingleton<MyRiskManager>();
    }

    // --- Đăng Ký Cho Backtest ---
    public void RegisterForBacktest(IServiceCollection services)
    {
        // Backtest — sử dụng Transient (một instance mới được tạo cho mỗi lần chạy mô phỏng)
        services.AddTransient<IStrategy, MyStrategy>();
        services.AddTransient<MyRiskManager>();
    }
}
```

> [!IMPORTANT]
> **Vòng đời Live vs Backtest:**
> - **Live (`Register`)**: Sử dụng `AddSingleton`. Trong giao dịch thực tế, bot chạy liên tục và instance của chiến lược phải được bảo toàn xuyên suốt các sự kiện.
> - **Backtest (`RegisterForBacktest`)**: Sử dụng `AddTransient`. Khi backtest hoặc tối ưu hóa tham số, engine có thể chạy nhiều mô phỏng tuần tự hoặc song song. Cơ chế Transient đảm bảo mỗi lần chạy sẽ có một instance mới hoàn toàn, ngăn chặn việc rò rỉ trạng thái giữa các lần chạy mô phỏng.
