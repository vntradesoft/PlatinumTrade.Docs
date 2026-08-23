---
id: products-bot-cli-run-on-windows
title: Chạy Trên Windows
description: Hướng dẫn triển khai chạy Bot CLI trên máy chủ Windows
---

# Chạy Trên Windows

Sử dụng trang này khi bạn triển khai Bot CLI trên máy chủ Windows với file thực thi `.exe` đã được phát hành.

## 1) Chuẩn Bị Tệp

1. Xuất bản (publish) hoặc giải nén bản phát hành Bot CLI vào thư mục đích.
2. Sao chép các tệp DLL chiến lược (strategy) của bạn vào một vị trí cố định.
3. Xác nhận tệp thực thi của Bot tồn tại, ví dụ:

```powershell
C:\PlatinumTrade\Pt.Okx.Bot.exe
```

## 2) Chuẩn Bị Cấu Hình Dùng Chung

1. Đảm bảo cấu hình ứng dụng dùng chung chứa:
- Tên định danh (alias) tài khoản OKX nếu bạn muốn giải quyết thông tin xác thực dựa trên alias.
- Alias bot Telegram nếu bạn muốn nhận thông báo qua Telegram dựa trên alias.
- Cài đặt proxy nếu lưu lượng mạng chiều ra cần đi qua proxy.
2. Tùy chọn: Chuẩn bị các giá trị dự phòng từ tệp `.env.example` ở thư mục gốc repo.

## 3) Lệnh Khởi Chạy

Ví dụ chạy môi trường Demo / Sandbox:

```powershell
.\Pt.Okx.Bot.exe `
  --sandbox `
  --okx_account_alias "okx_test" `
  --telegram_bot_alias "telebot" `
  --strategy "C:\PlatinumTrade\strategies\Stgy.UpTrend.dll" `
  --underlying BTC-USDT `
  --symbol BTC-USDT-SWAP `
  --timeframe 1h `
  --leverage 5 `
  --margin_mode Isolated `
  --notifier Telegram `
  --warmup_bars 10000
```

Ví dụ chạy môi trường Live (Thực tế):

```powershell
.\Pt.Okx.Bot.exe `
  --okx_account_alias "Default Live" `
  --telegram_bot_alias "tele_live" `
  --strategy "C:\PlatinumTrade\strategies\Stgy.UpTrend.dll" `
  --underlying BTC-USDT `
  --symbol BTC-USDT-SWAP `
  --timeframe 1h `
  --leverage 3 `
  --margin_mode Isolated `
  --notifier Telegram `
  --warmup_bars 10000
```

## 4) Biến Môi Trường Dự Phòng (Tùy Chọn)

Nếu không thể giải quyết thông tin từ alias hoặc cài đặt chung, Bot CLI có thể lấy dự phòng từ các biến môi trường:

- `API_KEY` / `API_SECRET` cho sandbox
- `API_KEY_R` / `API_SECRET_R` cho live
- `API_PASS`
- `TELEGRAM_TOKEN`
- `TELEGRAM_CHATID`
- `TEAMS_WEBHOOK`
- `HTTP_PROXY`

Trong PowerShell, một ví dụ thiết lập đơn giản trong phiên làm việc hiện tại:

```powershell
$env:API_KEY_R = "your-live-key"
$env:API_SECRET_R = "your-live-secret"
$env:API_PASS = "your-passphrase"
```

## 5) Tùy Chọn Ghi Log

- Thêm `--verbose` để xem log chi tiết của bot.
- Thêm `--api_log` để ghi nhận thêm log từ thư viện `OKX.Net`.

## 6) Chạy Tự Động Trên Windows

Các lựa chọn phổ biến:

- Sử dụng **Task Scheduler** để tự động khởi động và tự khởi động lại khi gặp sự cố.
- Sử dụng **NSSM** hoặc trình bao bọc Windows Service nếu bạn muốn chạy dưới dạng dịch vụ chạy ngầm.
- Tạo một script PowerShell khởi chạy chuyên dụng nếu bạn cần nạp sẵn các biến môi trường trước khi chạy.

## Lưu Ý

- Nếu alias giải quyết thành công thông tin xác thực, bạn không cần cài đặt các biến môi trường dự phòng.
- Nếu cài đặt proxy chưa có trong cấu hình chung, hãy đặt biến `HTTP_PROXY` và truyền tham số `--use_proxy`.
- CLI host chỉ chạy chế độ Real (Live/Sandbox); không truyền tham số chạy backtest vào đây.
- Sử dụng đường dẫn tuyệt đối cho DLL chiến lược trên Windows để tránh nhầm lẫn thư mục làm việc hiện tại.

## Tài Liệu Liên Quan

- [Thiết Lập API Key](./api-key-setup.md)
- [Chạy Trên Ubuntu](./run-on-ubuntu.md)
- [Hỏi Đáp Thường Gặp CLI](./faq.md)
