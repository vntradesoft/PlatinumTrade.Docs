---
id: products-gui-settings-backtest
title: Cài Đặt Backtest
sidebar_position: 4
description: Cấu hình các tham số mặc định cho công cụ kiểm thử lịch sử (backtesting)
sidebar_label: Backtest
---

# Backtest

Phần này mô tả cách cấu hình các thiết lập môi trường backtest, giới hạn của công cụ và các hành vi mặc định.

![Backtest Settings](/img/products/gui/settings/backtest-settings.png)

## Simulation Parameters (Tham số giả lập)

- **Warmup Bars (Số nến khởi động)**: Số lượng nến lịch sử cần tải trước khi quá trình backtest chính thức bắt đầu. Điều này đảm bảo các chỉ báo kỹ thuật có chu kỳ xem xét dữ liệu cũ (ví dụ: EMA 200) có đủ thời gian để ổn định trị số.
- **Max Bars In Chart (Số nến tối đa trên biểu đồ)**: Giới hạn số lượng nến tối đa được vẽ trên biểu đồ tại một thời điểm để duy trì hiệu năng mượt mà của giao diện trong các lượt backtest dài.
- **Ticks Per Candle (Số tick mỗi nến)**: Định nghĩa độ chi tiết của việc giả lập giá trong một cây nến. Giá trị càng cao sẽ tạo ra chuyển động giá trong nến thực tế hơn nhưng sẽ làm tăng thời gian chạy giả lập.

## Logs (Nhật ký)

- **Log Store Directory (Thư mục lưu log)**: Đường dẫn đến thư mục nơi công cụ backtest lưu trữ các tệp nhật ký thực thi và báo cáo giao dịch.
- **Log Editor Path (Đường dẫn trình biên tập log)**: Đường dẫn thực thi đến trình chỉnh sửa văn bản ưu thích của bạn (ví dụ: Notepad++, VS Code) được sử dụng khi mở các tệp log từ giao diện ứng dụng.
