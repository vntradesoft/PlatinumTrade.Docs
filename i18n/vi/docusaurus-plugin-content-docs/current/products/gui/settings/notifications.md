---
id: products-gui-settings-notifications
title: Thông báo
sidebar_position: 7
description: Tùy chỉnh cảnh báo âm thanh và thông báo trên màn hình
---

# Thông báo

Phần này chi tiết cách cấu hình thông báo đẩy, cảnh báo âm thanh và tin nhắn popup cho các sự kiện của ứng dụng.

![Thông báo Settings](/img/products/gui/settings/notifications-settings.png)

## Telegram Bots

Tích hợp bot giao dịch với Telegram để nhận các cảnh báo thực thi lệnh thời gian thực, tóm tắt hàng ngày và điều khiển bot từ xa.

- **Add Bot (Thêm Bot)**: Cấu hình một Telegram bot mới bằng cách cung cấp tên gợi nhớ (Alias) và `Chat ID` của bạn.
- Bạn có thể thêm nhiều bot và tùy chọn bật/tắt từng bot cụ thể.
- Sử dụng các nút **Edit** (Sửa) hoặc **Remove** (Xóa) để quản lý các bot hiện có.

Để biết hướng dẫn chi tiết từng bước về cách tạo bot và lấy Chat ID của bạn, hãy tham khảo [Hướng Dẫn Cấu Hình Telegram Bot](./telegram-bot-setup.md).

## Microsoft Teams

Gửi các thẻ cảnh báo có cấu trúc đến một kênh Microsoft Teams.

- **Enable Teams (Bật Teams)**: Bật hoặc tắt thông báo qua Teams.
- **Webhook URL**: Dán đường dẫn Webhook nhận tin (incoming Webhook URL) được tạo từ cấu hình kết nối kênh Teams của bạn.
- **Test Connection (Kiểm tra kết nối)**: Gửi một gói tin kiểm tra tới webhook đã cấu hình để xác minh khả năng kết nối.
