---
sidebar_position: 8
id: sdk-strategy-telegram-commands
title: Lệnh Telegram & Mở Rộng
description: Mở rộng chiến lược với các lệnh điều khiển Telegram tùy chỉnh
---

# Lệnh Telegram & Mở Rộng

Nền tảng giao dịch hỗ trợ tương tác, giám sát và điều khiển từ xa thông qua Telegram Bot. Khi người dùng gửi lệnh tới Bot Telegram, lệnh sẽ được dịch vụ `TelegramCommandHandler` trong `Core Engine` tiếp nhận, phân tích và điều phối tới chiến lược đang hoạt động.

Hướng dẫn này giải thích cơ chế hoạt động của hệ thống lệnh Telegram, liệt kê các lệnh tích hợp sẵn và minh họa cách mở rộng thêm các lệnh tùy chỉnh cho plugin chiến lược của bạn.

---

## Tổng Quan Kiến Trúc

Luồng xử lý một lệnh Telegram từ điện thoại người dùng tới chiến lược diễn ra như sau:

1. **Người dùng nhập lệnh:** Người dùng gửi lệnh (ví dụ: `/status` hoặc lệnh tùy biến `/setrisk 2.5`) tới Telegram Bot.
2. **Core phân tích cú pháp:** `TelegramCommandHandler` trong `Core Engine` nhận tin nhắn, xác thực Chat ID hợp lệ theo quyền hạn và phân tích chuỗi lệnh.
3. **Tạo đối tượng lệnh:** Nếu lệnh khớp với lệnh tích hợp sẵn hoặc được nhận diện bởi một phần mở rộng (extension) đã đăng ký, đối tượng `TradeCommand` sẽ được tạo.
4. **Host điều phối:** Ứng dụng host (GUI hoặc CLI) bắt đối tượng `TradeCommand` và gửi tới instance chiến lược đang chạy.
5. **Chiến lược thực thi:** Host gọi hàm `OnTradeCommandAsync(TradeCommand, CancellationToken)` trong chiến lược.
6. **Phản hồi người dùng:** Chiến lược sử dụng `IStrategyLogger` (ví dụ: `NotifyTrace`, `NotifyKeyValue`) để gửi thông báo kết quả thực thi về lại nhóm chat Telegram.

### Định Tuyến Lệnh Đa Bot (Multi-Bot Command Routing)

Vì nền tảng hỗ trợ nhiều Bot Telegram cùng lúc, việc định tuyến lệnh được quyết định dựa trên bot mà người dùng nhắn tin tới:
- Nếu người dùng nhắn tin tới **Bot A**, lệnh chỉ được gửi tới (các) chiến lược đang liên kết với **Bot A** (thông qua cấu hình `TelegramBotAlias`).
- Các chiến lược khác liên kết với **Bot B** hoặc chạy không có Telegram sẽ hoàn toàn không bị ảnh hưởng.

---

## Các Lệnh Tích Hợp Sẵn (Built-in Commands)

Nền tảng bao gồm sẵn nhiều lệnh được framework lõi xử lý và tự động ánh xạ sang enum `TradeAction`:

| Lệnh | Kiểu Hành Động (`TradeAction`) | Tham Số Truyền Vào | Mô tả |
|---|---|---|---|
| `/status` | `TradeAction.Status` | Không | Truy vấn trạng thái hoạt động hiện tại của chiến lược. |
| `/balance` | `TradeAction.Balance` | Không | Truy vấn chi tiết số dư tài khoản từ sàn giao dịch. |
| `/metric` | `TradeAction.Metrics` | Không | Truy vấn các chỉ số hiệu suất của chiến lược (tỷ lệ thắng, PnL). |
| `/details` | `TradeAction.Details` | Không | Truy vấn chi tiết các vị thế đang mở, mức TP và SL. |
| `/pause` | `TradeAction.PauseTrading` | Không | Tạm dừng mở các vị thế mới trong chiến lược. |
| `/resume` | `TradeAction.ResumeTrading` | Không | Tiếp tục giao dịch và mở vị thế bình thường. |
| `/config` | `TradeAction.Configure` | Không | Truy vấn các tham số cấu hình hiện tại của chiến lược. |
| `/close [SYMBOL]` | `TradeAction.Close` | `Symbol` = mã cặp viết hoa | Yêu cầu đóng ngay lập tức toàn bộ vị thế và hủy lệnh đang chờ của symbol (ví dụ: `/close BTC`). |
| `/shutdown` | `TradeAction.Shutdown` | Không | Dừng chiến lược. Để tránh vô tình dừng bot, hệ thống yêu cầu gõ xác nhận: `/shutdown confirm` trong vòng 30 giây. |
| `/logs [COUNT]` | `TradeAction.Logs` | `Amount` = số dòng | Lấy các dòng log gần nhất. Tham số `COUNT` tùy chọn (mặc định là 10, giới hạn từ 1 đến 1000). |
| `/uploadlog [YYYYMMDD]` | `TradeAction.UploadLogs` | `Symbol` = chuỗi ngày | Yêu cầu bot tải trực tiếp tệp log của ngày xác định (định dạng `YYYYMMDD`) lên chat Telegram. |

---

## Mở Rộng Lệnh Telegram Tùy Chỉnh (Custom Extensions)

Các plugin chiến lược có thể khai báo các lệnh tùy chỉnh để người dùng tương tác với logic riêng biệt của chiến lược (ví dụ: điều chỉnh mức rủi ro, reset chỉ số theo dõi hoặc can thiệp thủ công).

Để thêm lệnh tùy chỉnh, bạn cần:
1. Triển khai interface `ITelegramCommandExtension` trong plugin của bạn.
2. Đăng ký extension này vào vùng chứa Dependency Injection của plugin.
3. Xử lý hành động `TradeAction.Custom` trong hàm `OnTradeCommandAsync` của chiến lược.

### Interface `ITelegramCommandExtension`

Interface `ITelegramCommandExtension` nằm trong namespace `Pt.Okx.Sdk.Notifier`:

```csharp
namespace Pt.Okx.Sdk.Notifier
{
    public interface ITelegramCommandExtension
    {
        // Khối văn bản trợ giúp hiển thị khi người dùng gõ /help
        string? HelpText { get; }

        // Phân tích cú pháp lệnh Telegram. Trả về null nếu lệnh không thuộc extension này.
        TradeCommand? TryParse(string action, string[] args);
    }
}
```

---

## Hướng Dẫn Triển Khai Từng Bước

Dưới đây là ví dụ đầy đủ về việc triển khai và xử lý hai lệnh tùy chỉnh: `/setrisk [giá_trị]` và `/resetdrawdown`.

### Bước 1: Tạo Lớp Mở Rộng Lệnh (Command Extension)

```csharp
using Pt.Okx.Sdk.Notifier;
using Pt.Okx.Sdk.Notifier.Enums;
using Pt.Okx.Sdk.Notifier.Models;

namespace MyCustomStrategy.Command
{
    public sealed class MyStrategyCommandExtension : ITelegramCommandExtension
    {
        // Văn bản này tự động xuất hiện khi người dùng gõ /help trong Telegram
        public string? HelpText => """
            *Lệnh Chiến Lược Tùy Chỉnh:*
            /setrisk [GIÁ_TRỊ] — Cài đặt mức rủi ro cho mỗi lệnh (%) (ví dụ: /setrisk 2.5)
            /resetdrawdown — Đặt lại bộ theo dõi mức sụt giảm tài khoản lớn nhất (drawdown)
            """;

        public TradeCommand? TryParse(string action, string[] args)
        {
            return action switch
            {
                "setrisk" => CreateSetRiskCommand(args),
                "resetdrawdown" => new TradeCommand
                {
                    Action = TradeAction.Custom,
                    CommandTag = "resetdrawdown"
                },
                _ => null // Trả về null để các extension khác hoặc lệnh mặc định xử lý
            };
        }

        private static TradeCommand CreateSetRiskCommand(string[] args)
        {
            var cmd = new TradeCommand
            {
                Action = TradeAction.Custom,
                CommandTag = "setrisk"
            };

            if (args.Length >= 1)
            {
                cmd.Params["value"] = args[0];
            }

            return cmd;
        }
    }
}
```

### Bước 2: Đăng Ký Extension Vào Plugin

```csharp
using Microsoft.Extensions.DependencyInjection;
using Pt.Okx.Sdk.Notifier;
using Pt.Okx.Sdk.Strategy.Plugin;
using MyCustomStrategy.Command;

namespace MyCustomStrategy
{
    public class MyStrategyPlugin : IStrategyPlugin, IStrategyPluginMetadata
    {
        public void Register(IServiceCollection services)
        {
            services.AddSingleton<IStrategy, MyStrategy>();

            // Đăng ký extension lệnh Telegram tùy chỉnh
            services.AddSingleton<ITelegramCommandExtension, MyStrategyCommandExtension>();
        }

        public void RegisterForBacktest(IServiceCollection services)
        {
            services.AddTransient<IStrategy, MyStrategy>();
        }
    }
}
```

### Bước 3: Xử Lý Lệnh Trong Chiến Lược

```csharp
using Pt.Okx.Sdk.Notifier.Enums;
using Pt.Okx.Sdk.Notifier.Models;
using Pt.Okx.Sdk.Strategy;

namespace MyCustomStrategy
{
    public class MyStrategy : StrategyBase
    {
        private readonly IStrategyLogger _logger;
        private decimal _riskPercent = 1.0m;
        private decimal _maxDrawdown = 0.0m;

        public MyStrategy(IStrategyLogger logger)
        {
            _logger = logger;
        }

        public override async Task OnTradeCommandAsync(TradeCommand command, CancellationToken ct)
        {
            _ = ct;
            await ProcessTelegramCommandAsync(command);
        }

        private async Task ProcessTelegramCommandAsync(TradeCommand command)
        {
            switch (command.Action)
            {
                case TradeAction.Status:
                    await SendStatusReportAsync();
                    break;

                // Xử lý các lệnh tùy chỉnh đăng ký qua MyStrategyCommandExtension
                case TradeAction.Custom:
                    await HandleCustomCommandAsync(command);
                    break;
            }
        }

        private async Task HandleCustomCommandAsync(TradeCommand command)
        {
            switch (command.CommandTag)
            {
                case "setrisk":
                    if (command.Params.TryGetValue("value", out var valueStr) && decimal.TryParse(valueStr, out var risk))
                    {
                        _riskPercent = risk;
                        _logger.LogSuccess("Risk Updated", "Mức rủi ro mỗi lệnh đã được cập nhật thành {0}%", risk);
                    }
                    else
                    {
                        _logger.LogError("Command Error", "Giá trị rủi ro không hợp lệ. Cách dùng: /setrisk [giá_trị]");
                    }
                    break;

                case "resetdrawdown":
                    _maxDrawdown = 0.0m;
                    _logger.LogSuccess("State Reset", "Bộ theo dõi Drawdown tối đa đã được đặt lại về 0%");
                    break;

                default:
                    _logger.LogWarning("Unknown Custom Command", "Thẻ lệnh tùy biến '{0}' không được nhận diện", command.CommandTag);
                    break;
            }
        }

        private async Task SendStatusReportAsync()
        {
            _logger.NotifyKeyValue("Trạng Thái Chiến Lược",
                ("Trạng Thái", "Đang chạy"),
                ("Mức Rủi Ro", $"{_riskPercent}%"),
                ("Drawdown Lớn Nhất", $"{_maxDrawdown}%")
            );
            await Task.CompletedTask;
        }
    }
}
```
