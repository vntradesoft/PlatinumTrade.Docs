---
id: products-gui-settings-backtest
title: Cấu Hình Backtest
sidebar_position: 4
description: Cấu hình tham số mô phỏng, giới hạn nến hiển thị và định dạng phông chữ nhật ký giao dịch cho engine backtest
sidebar_label: Backtest
---

# Kiểm thử chiến lược (Backtest)

Phần này hướng dẫn cấu hình các tham số môi trường backtest, giới hạn số nến hiển thị và định dạng phông chữ cho nhật ký giao dịch.

![Cài đặt Backtest](/img/products/gui/settings/backtest-settings.png)

## Tham số mô phỏng (Simulation Parameters)

- **Số nến làm ấm (Warmup Bars)**: Số lượng nến lịch sử được tải sẵn vào bộ nhớ trước khi chiến lược bắt đầu giao dịch. Điều này đảm bảo các chỉ báo kỹ thuật có chu kỳ nhìn lại dài (ví dụ: EMA 200) có đủ dữ liệu để tính toán giá trị chính xác trước khi mở lệnh đầu tiên.
- **Số nến tối đa trên biểu đồ (Max Bars in Chart)**: Giới hạn số lượng nến được vẽ tối đa trên biểu đồ tại một thời điểm nhằm duy trì hiệu năng giao diện mượt mà trong các đợt backtest dài hàng tháng hoặc hàng năm.
- **Số tick mỗi nến (Ticks per Candle)**: Độ chi tiết mô phỏng dao động giá bên trong một cây nến. Giá trị càng cao thì hành vi giá nội nến và khớp râu nến càng sát thực tế, nhưng thời gian chạy mô phỏng sẽ lâu hơn.

## Nhật ký & Định dạng hiển thị (Logs)

Cấu hình nơi lưu trữ và khả năng đọc của nhật ký thực thi chiến lược:

- **Thư mục lưu trữ log (Log Store Directory)**: Đường dẫn thư mục nơi engine backtest tự động lưu các tệp nhật ký thực thi và báo cáo giao dịch. Bấm nút duyệt (`...`) để chọn thư mục trên máy tính.
- **Đường dẫn trình sửa log (Log Editor Path)**: Đường dẫn tệp thực thi của trình soạn thảo văn bản bạn yêu thích (ví dụ: Notepad++, VS Code) được mở khi bạn bấm xem log từ giao diện.
- **Cỡ chữ log (Log Font Size)**: Điều chỉnh kích thước văn bản hiển thị trong cửa sổ nhật ký giao dịch (tùy chỉnh từ `6.0` đến `48.0` pt với bước nhảy `0.5` pt; mặc định: `10.0`).
- **Phông chữ log (Log Font Family)**: Lựa chọn phông chữ sử dụng cho nhật ký giao dịch (mặc định: `Consolas`). Các phông chữ đơn khoảng cách (monospace) như `Consolas`, `Cascadia Code` hoặc `Courier New` giúp các cột số liệu căn chỉnh thẳng hàng và dễ quan sát nhất.
