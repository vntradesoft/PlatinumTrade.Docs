---
sidebar_position: 2
id: sdk-strategy-events
title: Sự Kiện Chiến Lược
description: Xử lý các sự kiện khớp lệnh, cập nhật giá tick và đóng nến
---

# Các Hàm Xử Lý Sự Kiện (Event Handlers)

Chiến lược giao dịch của bạn hoàn toàn hoạt động theo hướng sự kiện (event-driven). Host engine nhận các sự kiện thô và điều phối chúng tới các hàm callback trong chiến lược.

## Các Callback Trong Chiến Lược

Bạn triển khai callback bắt buộc xử lý thị trường và các hàm xử lý có định kiểu tùy chọn để phản hồi các sự kiện:

| Hàm Xử Lý | Thời Điểm Được Gọi |
|---|---|
| `OnTickAsync(TickPhase.BarClose, ...)` | Khi cây nến đóng lại. Đây là nơi hầu hết các logic tính toán dựa trên chỉ báo được thực thi. |
| `OnTickAsync(TickPhase.Tick, ...)` | Trên mỗi cập nhật giá diễn ra trong nến (intra-bar). Dùng cho trailing stop hoặc kiểm tra rủi ro tần suất cao. |
| `OnOrderAsync(...)` | Khi trạng thái lệnh thay đổi (đã gửi, khớp một phần, bị hủy, khớp toàn bộ). |
| `OnAlgoOrderAsync(...)` | Khi lệnh điều kiện (TP/SL) được kích hoạt hoặc bị hủy. |
| `OnPositionAsync(...)` | Khi vị thế được mở, đóng hoặc khi lời lỗ PnL / ký quỹ thay đổi. |
| `OnBalanceAsync(...)` | Khi số dư tài khoản thay đổi (nạp rút tiền, phí giao dịch, PnL thực nhận). |
| `OnTransactionAsync(...)` | Khi có một giao dịch khớp lệnh thực tế (Fill). |
| `OnTradeCommandAsync(...)` | Khi người dùng gửi lệnh điều khiển từ Telegram hoặc giao diện GUI. |

```csharp
public sealed class MyStrategy : StrategyBase
{
    public override async Task OnTickAsync(TickPhase tickPhase, CancellationToken ct)
    {
        if (tickPhase == TickPhase.BarClose)
        {
            await EvaluateEntryExitAsync(ct);
        }

        if (tickPhase == TickPhase.Tick)
        {
            await UpdateIntrabarProtectionAsync(ct);
        }
    }

    public override Task OnOrderAsync(IReadOnlyList<Order> orders, CancellationToken ct)
    {
        // Xử lý cập nhật lệnh (tùy chọn)
        return Task.CompletedTask;
    }
}
```

## IStrategyStateStore — Truy Cập Trạng Thái

`IStrategyStateStore` là vùng chứa trạng thái runtime nội bộ thuộc sở hữu của host. Nền tảng tự động cập nhật nó qua WebSocket và snapshot.

```csharp
public interface IStrategyStateStore
{
    // Danh sách Snapshot
    Order[] Orders { get; }              // Các lệnh đang mở (Limit, Market, v.v.)
    AlgoOrder[] AlgoOrders { get; }      // Các lệnh điều kiện đang chờ (TP / SL)
    Position[] Positions { get; }        // Các vị thế đang mở
    AccountBalance[] Balances { get; }   // Số dư tài khoản
    Transaction[] Transactions { get; }  // Các giao dịch khớp lệnh gần nhất
    
    // Kích hoạt từ bên ngoài
    TradeCommand TradeCommand { get; }   // Lệnh của người dùng từ bên ngoài (nếu có)
    CandleData? LastKline { get; }       // Cây nến đã đóng gần nhất
    
    // Thuộc tính tiện ích
    bool HasOpenPosition { get; }
    bool HasOpenOrders { get; }
    bool HasProtectiveAlgoOrders { get; }
    int OpenOrderCount { get; }
    int AlgoOrderCount { get; }
}
```

### Khi Nào Truy Vấn Trực Tiếp API vs Sử Dụng `IStrategyStateStore`?

- **Sử dụng API `IOkxClient` trực tiếp** trong hàm `OnInitAsync` để khôi phục trạng thái và kiểm tra khởi động.
- **Sử dụng các handler có định kiểu tùy chọn** cho các luồng xử lý theo sự kiện (`OnOrderAsync`, `OnPositionAsync`, v.v.).
- Giữ `OnTickAsync(TickPhase, ...)` tập trung hoàn toàn vào các quyết định theo nhịp thị trường.

## Thực Hành Hàm Xử Lý Sự Kiện

Một mô hình phổ biến là giữ cho `OnTickAsync` ngắn gọn và ủy thác công việc theo từng pha:

```csharp
public override async Task OnTickAsync(TickPhase tickPhase, CancellationToken ct)
{
    switch (tickPhase)
    {
        case TickPhase.BarClose:
            await OnBarCloseAsync(ct);
            break;

        case TickPhase.Tick:
            await OnIntrabarTickAsync(ct);
            break;
    }
}
```
