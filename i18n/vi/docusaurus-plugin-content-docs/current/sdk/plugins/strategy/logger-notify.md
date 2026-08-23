---
sidebar_position: 9
id: sdk-strategy-logger-notify
title: Ghi Log và Thông Báo
description: Ghi log sự kiện và gửi thông báo qua Telegram
---

# Ghi Log & Thông Báo

Interface `IStrategyLogger` cung cấp tính năng ghi nhật ký log có cấu trúc được tích hợp chặt chẽ với các kênh thông báo bên ngoài (như Telegram hoặc MS Teams).

Khi phát triển plugin chiến lược, hãy inject `IStrategyLogger` vào các lớp của bạn thay vì dùng logger generic chuẩn, vì nó cung cấp cú pháp chuyên dụng cho giao dịch và tự động điều hướng thông báo ra các nền tảng bên ngoài.

## Các Mức Log Chuẩn (Standard Log Levels)

Ghi log chuẩn xử lý thông điệp dựa trên mức độ nghiêm trọng. Tùy thuộc vào cấu hình `PluginDisplayLogLevels` trong đăng ký plugin, chúng sẽ hiển thị trên GUI hoặc CLI:

```csharp
_logger.LogDebug("Title", "Template {Arg}", value);
_logger.LogInformation("Title", "Template {Arg}", value);
_logger.LogWarning("Title", "Template {Arg}", value);
_logger.LogError(exception, "Title", "Template {Arg}", value);
_logger.LogCritical("Title", "Template {Arg}", value);
_logger.LogSuccess("Title", "Template {Arg}", value);
```

## Ghi Log Dành Riêng Cho Giao Dịch

Nền tảng bao gồm các phương thức ghi log chuyên biệt giúp định dạng các hành động giao dịch trực quan trên console và báo cáo:

```csharp
// Ghi log lệnh vào (Entry)
_logger.LogEntry("BTC-USDT-SWAP", OrderSide.Buy,
    quantity: 0.01m, price: 95000m, sl: 93000m, tp: 100000m);

// Ghi log lệnh thoát vị thế (Exit)
_logger.LogExit("BTC-USDT-SWAP", reason: "Chạm TP", OrderSide.Sell,
    qtyFill: 0.01m, entryPrice: 95000m, exitPrice: 100000m, pnl: 50m);

// Ghi log tín hiệu nội bộ của chiến lược
_logger.LogSignal("MUA", "Giao cắt MA + RSI > 50");
```

## Thay Đổi Trạng Thái & Tự Động Gắn Emoji

Phương thức `LogStateChange` rất phù hợp để theo dõi vòng đời vĩ mô của chiến lược (ví dụ: từ Chờ sang Đang hoạt động). Phương thức này tự động thêm emoji dựa trên từ khóa trạng thái:

```csharp
_logger.LogStateChange("idle", "active", "Phát hiện tín hiệu vào lệnh");
_logger.LogStateChange("active", "stopped", "Đạt mức drawdown tối đa");
```

**Bảng Ánh Xạ Emoji:**

| Emoji | Từ Khóa |
|---|---|
| 🟢 | `active`, `idle`, `open`, `started`, `running`, `position_open` |
| 🔴 | `closed`, `stopped`, `ended`, `error`, `failed`, `blocked` |
| 🔄 | `pending`, `waiting`, `init`, `recovery`, `entry_pending`, `reversing_pending` |
| ➡️ | Bất kỳ trạng thái nào khác |

## Ghi Log Key-Value (Dạng Bảng Dữ Liệu)

```csharp
// Ghi log cấu hình chiến lược
_logger.LogConfig("Cấu Hình Chiến Lược",
    ("Symbol", "BTC-USDT"),
    ("KhungThờiGian", "1h"),
    ("ĐònBẩy", "10x"));

// Ghi log dữ liệu tùy ý (ví dụ: Trạng thái Vị thế)
_logger.LogKeyValues("Thông Tin Vị Thế", "Trạng thái hiện tại",
    ("Hướng", "Long"),
    ("GiáVào", "95000"),
    ("PnL", "+2.5%"));
```

### Ghi Log Schema Tham Số Đầu Vào Trực Tiếp

Nếu chiến lược của bạn sử dụng DI schema có định kiểu (`BindSchema<TSchema>()`), bạn có thể ghi log giá trị schema mà không cần viết hàm hiển thị tùy biến:

```csharp
_logger.LogInputParams(_input);
```

## Thông Báo Ra Kênh Ngoài (Telegram / Teams)

Dựa trên cấu hình `PluginNotifyLevels`, các log chuẩn (như `LogCritical`) có thể tự động gửi tới Telegram. Ngoài ra bạn có thể chủ động đẩy thông báo ra ngoài:

```csharp
// Gửi tin nhắn trực tiếp ra kênh bên ngoài
_logger.NotifyTrace("Trạng Thái Bot", "Chiến lược đang chạy bình thường");
_logger.NotifyError("Cảnh Báo", exception);

// Gửi dữ liệu có cấu trúc dạng bảng
_logger.NotifyKeyValue("Báo Cáo Hàng Ngày",
    ("PnL", "+150 USDT"),
    ("Số Lệnh", "5"),
    ("Tỷ Lệ Thắng", "80%"));

// Gửi một tệp tài liệu (ví dụ: Báo cáo HTML Backtest)
_logger.NotifyDocument("Kết Quả Backtest", "/path/to/report.html");
```

> [!NOTE]
> Mức log `Debug` và `Trace` **luôn luôn bị loại khỏi các thông báo ra bên ngoài**, bất kể cài đặt `PluginNotifyLevels`, nhằm tránh làm phiền điện thoại người dùng với tần suất tin nhắn quá dày đặc.

### Định Tuyến Đa Bot Telegram (Multi-Bot Routing)

Nền tảng hỗ trợ cấu hình đồng thời nhiều Bot Telegram khác nhau (mỗi bot có Token và Chat ID riêng, được quản lý trong mục Cài Đặt của GUI).

Khi bắt đầu phiên giao dịch Live, người dùng chọn Bot Telegram nào sẽ liên kết với chiến lược qua ô **Telegram Bot Alias**. Mọi thông báo do chiến lược gửi đi sẽ được định tuyến tự động và chính xác tới đúng kênh Telegram của bot đó.
