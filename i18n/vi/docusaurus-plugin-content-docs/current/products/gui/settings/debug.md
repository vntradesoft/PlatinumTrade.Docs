---
id: products-gui-settings-debug
title: Gỡ Lỗi (Debug)
sidebar_position: 5
description: Chẩn đoán cấp thấp dành cho nhà phát triển, đo hiệu năng, ghi nhận JSON raw và tạm dừng gắn debugger cho tiến trình con
sidebar_label: Gỡ Lỗi
---

# Gỡ Lỗi (Debug)

Tab **Gỡ lỗi (Debug)** cung cấp các công cụ chẩn đoán sâu, điều khiển mức độ chi tiết của nhật ký hệ thống và hỗ trợ gỡ lỗi dành cho lập trình viên phát triển chiến lược.

:::note Chế độ hiển thị
Trên các bản phát hành Production chính thức, tab Gỡ lỗi được ẩn đi đối với người dùng thông thường để tránh làm giảm hiệu năng hệ thống ngoài ý muốn. Tab này hiển thị tự động trên các bản build DEBUG hoặc khi kích hoạt cờ chẩn đoán dành cho nhà phát triển.
:::

![Cài đặt Debug](/img/products/gui/settings/debug-settings.png)

## Tùy chọn nhật ký (Logging)

- **Nhật ký thư viện (Library Logs)**: Bật tính năng ghi log chi tiết từ các thư viện cốt lõi tầng dưới (như `Pt.Okx.Sdk` và các driver kết nối socket).
- **Nhật ký hiệu năng (Performance Logs)**: Xuất các thông số chi tiết về thời gian thực thi, mức tiêu thụ bộ nhớ và độ trễ của các luồng xử lý nhằm phục vụ phân tích hiệu năng hệ thống.
- **Chế độ nhà phát triển (Developer Mode)**: Vô hiệu hóa bộ lọc log của giao diện, cho phép toàn bộ các sự kiện cấp thấp `Debug` và `Trace` được đẩy trực tiếp lên màn hình nhật ký theo thời gian thực. Sử dụng tùy chọn này khi cần điều tra lỗi logic trong plugin hoặc vòng đời chiến lược.
- **Debug Wait (chờ gắn debugger)**:

  :::tip Chỉ dành cho bản build DEBUG
  Khi được bật trên bản biên dịch DEBUG, tùy chọn này sẽ tự động gắn tham số `--debug-wait` vào mọi tiến trình con `strategy-host` (cả Backtest lẫn Live). Tiến trình con sẽ tạm dừng ngay tại điểm khởi đầu và hiển thị Process ID, giúp bạn có đủ thời gian để gắn trình gỡ lỗi (Visual Studio, JetBrains Rider hoặc `vsdbg`) trước khi mã nguồn chiến lược bắt đầu chạy.
  :::

## Dữ liệu thô (Advanced Data)

- **Ghi log dữ liệu thô (Library Raw Logging)**: Khi bật, ứng dụng sẽ xuất nguyên vẹn toàn bộ chuỗi JSON thô nhận được từ các kênh OKX WebSocket và các endpoint REST API trước khi phân tích cú pháp (parse). Tùy chọn này rất hữu ích khi cần kiểm tra định dạng dữ liệu sàn giao dịch trả về hoặc phát hiện sự thay đổi cấu trúc dữ liệu từ phía sàn.
