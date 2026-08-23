---
id: products-gui-settings-debug
title: Cài Đặt Gỡ Lỗi
sidebar_position: 5
description: Tùy chọn nhà phát triển và gỡ lỗi sự cố
sidebar_label: Gỡ Lỗi
---

# Gỡ lỗi

Phần này chi tiết cách kích hoạt ghi nhật ký nâng cao và chế độ gỡ lỗi dành cho nhà phát triển để khắc phục sự cố.

![Gỡ lỗi Settings](/img/products/gui/settings/debug-settings.png)

## Logging (Ghi nhật ký)

- **Library Logs (Log của thư viện)**: Kích hoạt nhật ký gỡ lỗi chi tiết từ các thư viện cốt lõi bên dưới (ví dụ: OKX SDK).
- **Performance Logs (Log hiệu năng)**: Xuất các thông số về thời gian thực thi, mức sử dụng bộ nhớ và độ trễ để phân tích hiệu năng hệ thống.
- **Developer Mode (Chế độ nhà phát triển)**: Vô hiệu hóa các kiểm soát chính sách lựa chọn giao diện và truyền trực tiếp tất cả các log Debug/Trace cấp thấp tới giao diện người dùng. Chỉ nên sử dụng khi đang chủ động khắc phục lỗi logic plugin hoặc lỗi hệ thống.

## Advanced Data (Dữ liệu nâng cao)

- **Library Raw Logging (Ghi dữ liệu thô thư viện)**: Khi được bật, ứng dụng sẽ xuất dữ liệu JSON gốc, chưa qua xử lý nhận được trực tiếp từ các cổng kết nối WebSocket và REST API của OKX.
