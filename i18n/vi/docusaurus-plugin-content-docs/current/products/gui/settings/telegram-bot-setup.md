---
id: products-gui-settings-telegram-bot-setup
title: Cấu Hình Telegram Bot
sidebar_position: 10
description: Hướng dẫn tạo bot Telegram và lấy Chat ID để nhận thông báo
status: published
visibility: public
---

# Hướng Dẫn Tạo Telegram Bot Và Lấy Chat ID

## 1. Tạo Telegram Bot

1. Mở ứng dụng Telegram và tìm kiếm tài khoản **@BotFather**.
2. Gửi lệnh:
   ```
   /newbot
   ```
3. Làm theo hướng dẫn của hệ thống để đặt tên cho bot.
4. Sau khi bot được tạo thành công, bạn sẽ nhận được một **Bot Token**.

Hãy lưu trữ mã này thật an toàn. Ví dụ: `123456:ABC-DEF...`

---

## 2. Lấy Chat ID của Bạn

### Bước 1: Gửi một tin nhắn đến bot của bạn

Mở đoạn chat với bot bạn vừa tạo và gửi một tin nhắn bất kỳ (Ví dụ: `hello`).

---

### Bước 2: Mở đường dẫn sau trên trình duyệt

Thay thế `<YOUR_BOT_TOKEN>` bằng mã token bạn vừa nhận được ở phần trước:

```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
```

Ví dụ:
```
https://api.telegram.org/bot123456:ABC-DEF/getUpdates
```

---

### Bước 3: Tìm Chat ID trong dữ liệu JSON

Trong kết quả hiển thị trên trình duyệt (ở định dạng JSON), tìm khóa `chat` và lấy giá trị của `id`:

```json
"chat": {
  "id": 123456789,
  ...
}
```
