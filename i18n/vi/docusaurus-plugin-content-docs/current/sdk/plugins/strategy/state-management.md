---
sidebar_position: 7
id: sdk-strategy-state-management
title: Quản Lý & Lưu Trữ Trạng Thái
description: Lưu trữ biến trạng thái qua các lần khởi động bot và chu kỳ backtest
---

# Quản Lý & Lưu Trữ Trạng Thái (State Management & Persistence)

Quản lý trạng thái là khía cạnh quan trọng nhất khi viết một chiến lược giao dịch tự động vững chắc. Bạn phải đảm bảo chiến lược xử lý việc khởi động lại bot một cách sạch sẽ, không làm rò rỉ dữ liệu giữa các lần chạy backtest và lưu trữ dữ liệu quan trọng xuống đĩa một cách an toàn.

## 1. Tránh Sử Dụng Trạng Thái Mutable Dạng Static

> [!CAUTION]
> **Tuyệt đối không dùng biến `static` để lưu trạng thái của chiến lược.**

Nền tảng có thể chạy nhiều instance của chiến lược đồng thời (ví dụ: giao dịch các symbol khác nhau trên các tài khoản khác nhau hoặc chạy nhiều backtest song song). Việc sử dụng biến static sẽ gây xung đột dữ liệu và phá hỏng tính chính xác của backtesting.

Trạng thái phải được đóng gói bên trong các lớp quản lý/dịch vụ chuyên dụng được inject qua vùng chứa DI.

## 2. Sử Dụng State Managers

Chúng tôi khuyến nghị phân tách trạng thái thành các lớp quản lý riêng biệt, tương tự như trong plugin ví dụ `Pt.Example.Stgy.UpTrend`:

- **`BotStateManager`**: Theo dõi trạng thái tổng quan của bot (`Idle`, `PositionOpen`, `Recovery`, `Blocked`).
- **`RiskManager`**: Theo dõi hiệu suất lịch sử (chuỗi thắng/thua, drawdown) trong phiên để áp dụng các quy tắc rủi ro toàn cục.

Đăng ký các lớp này trong triển khai `IStrategyPlugin`:

```csharp
public void Register(IServiceCollection services)
{
    services.AddSingleton<BotStateManager>();
    services.AddSingleton<RiskManager>();
    services.AddSingleton<IStrategy, MyStrategy>();
}

public void RegisterForBacktest(IServiceCollection services)
{
    // QUAN TRỌNG: Dùng Transient cho Backtesting để đảm bảo trạng thái luôn mới ở mỗi lần chạy
    services.AddTransient<BotStateManager>();
    services.AddTransient<RiskManager>();
    services.AddTransient<IStrategy, MyStrategy>();
}
```

## 3. Lưu Trữ & Ghi Đĩa (Storage and Persistence)

Đối với dữ liệu cần tồn tại qua các lần khởi động lại bot (như số lệnh thua liên tiếp hoặc mức drawdown tùy chỉnh trong ngày), hãy sử dụng `IStoragePathProvider` để lấy các đường dẫn thư mục an toàn phục vụ ghi tệp I/O.

```csharp
var storage = serviceProvider.GetRequiredService<IStoragePathProvider>();

string stateDir   = storage.GetPath(StoragePathScope.State);
string logsDir    = storage.GetPath(StoragePathScope.BacktestLogs);
```

### Các Phạm Vi Lưu Trữ (Storage Scopes)

| Scope | Mô tả |
|---|---|
| `State` | Các tệp trạng thái chiến lược cần lưu bền vững (ví dụ: `risk_state.json`) |
| `Cache` | Các tệp bộ đệm tạm thời |
| `LiveLogs` | Nhật ký log và các tệp đính kèm dành riêng cho phiên giao dịch Live |
| `BacktestLogs` | Nhật ký log và tệp kết quả dành riêng cho lượt chạy Backtest |
| `Exports` | Các báo cáo và dữ liệu người dùng xuất ra |

### Ví Dụ: Lưu Trữ Trạng Thái Quản Lý Rủi Ro

Trong `Pt.Example.Stgy.UpTrend`, lớp `RiskManager` lưu trạng thái của nó vào một tệp JSON mỗi khi một giao dịch đóng:

```csharp
var stateFile = Path.Combine(storage.GetPath(StoragePathScope.State), "risk_state.json");
var json = JsonSerializer.Serialize(_riskState);
await File.WriteAllTextAsync(stateFile, json);
```

> [!WARNING]
> **Tắt ghi tệp đĩa trong chế độ Backtest.** Khi đăng ký dịch vụ trong `RegisterForBacktest`, hãy đảm bảo bạn tắt tính năng lưu tệp (ví dụ: `AllowSave = false`) để tránh làm giảm tốc độ mô phỏng nhiều năm với khối lượng hàng triệu nến.

## 4. Tính Xác Định Trong Backtesting (Deterministic Backtesting)

Backtest bắt buộc phải có tính xác định (deterministic). Điều này có nghĩa là khi chạy cùng một bộ tham số trên cùng một khoảng thời gian thì kết quả thu được phải giống hệt nhau 100% trong mọi lần chạy.

**Quy Tắc Cho Tính Xác Định:**
- **Không bao giờ dùng `DateTime.Now` hay `DateTime.UtcNow`.** Luôn hỏi client về thời gian hiện tại: `_client.Instrument.GetCurrentTime()`. Khi giao dịch live, hàm này trả về thời gian thực; khi backtest, nó trả về thời gian mô phỏng giả lập.
- **Không bao giờ dùng `Task.Delay` hoặc dựa vào thời gian chạy của Thread.** Thời gian chỉ trôi khi động cơ backtest cấp nến hoặc tick mới.
- **Không gọi API mạng bên ngoài bên trong logic chiến lược.** Mọi lệnh gọi `IOkxClient.Trade` đều được động cơ mô phỏng tự động chặn và xử lý, nhưng các lệnh gọi API bên ngoài sẽ làm sai lệch dòng thời gian mô phỏng.

## 5. Mở Rộng Lệnh Telegram Tùy Chỉnh

Bạn có thể cho phép người dùng tương tác với chiến lược từ xa qua Telegram bằng cách triển khai `ITelegramCommandExtension` và xử lý `TradeAction.Custom` trong hàm `OnTradeCommandAsync`.

Xem chi tiết hướng dẫn trong bài viết [Lệnh Telegram & Mở Rộng](telegram-commands.md).
