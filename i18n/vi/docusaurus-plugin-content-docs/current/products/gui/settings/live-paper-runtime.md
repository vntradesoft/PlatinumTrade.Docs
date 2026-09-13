---
id: products-gui-settings-live-paper-runtime
title: Giám Sát Thời Gian Chạy
sidebar_position: 8
description: Cấu hình theo dõi heartbeat thời gian thực, chu kỳ ghi log và các ngưỡng cảnh báo hiệu năng cho giao dịch Live và Paper
sidebar_label: Giám Sát Thời Gian Chạy
---

# Giám Sát Thời Gian Chạy

Phần này hướng dẫn cấu hình tính năng giám sát vận hành thời gian thực cho các phiên giao dịch trực tiếp (Live) và giao dịch mô phỏng (Paper). Hệ thống giám sát sẽ liên tục theo dõi nhịp tim (heartbeat), độ sâu hàng đợi, độ trễ thực thi và mức độ sử dụng bộ nhớ nhằm đảm bảo bot hoạt động ổn định và tin cậy.

## Cấu hình giám sát thời gian chạy

Các thiết lập điều khiển tần suất và cách thức ghi nhận trạng thái sức khỏe vận hành của động cơ giao dịch:

- **Bật giám sát thời gian chạy (Enable runtime monitor)**: Bật hoặc tắt chức năng thu thập dữ liệu đo kiểm vận hành trong lúc bot đang chạy. Khi tắt tùy chọn này, các chỉ số hiệu năng sẽ không được hiển thị trên bảng điều khiển Live Paper.
- **Khoảng thời gian ghi log (Log refresh interval)**: Tần suất (tính bằng giây) mà hệ thống monitor chụp ảnh trạng thái vận hành và ghi vào tệp nhật ký (mặc định: `30` giây).
- **Ngưỡng cảnh báo heartbeat (Heartbeat warning threshold)**: Thời gian tối đa (tính bằng mili giây) cho phép giữa hai lần cập nhật nhịp đập của vòng lặp giao dịch trước khi phát ra cảnh báo (mặc định: `10,000` ms). Nếu vượt quá ngưỡng này, khả năng cao vòng lặp giao dịch đang bị treo hoặc nghẽn luồng xử lý.

:::tip
Đối với các chiến lược giao dịch tần suất cao hoặc yêu cầu độ trễ thấp, khoảng thời gian ghi log từ 15 đến 30 giây là tối ưu để theo dõi sát sao mà không làm phát sinh quá nhiều dung lượng tệp log.
:::

## Ngưỡng cảnh báo hiệu năng

Thiết lập các mốc giới hạn cảnh báo để kịp thời phát hiện tình trạng suy giảm kết nối mạng, nghẽn cổ chai xử lý hoặc logic chiến lược chạy quá chậm:

- **Cảnh báo tỷ lệ kline bị drop (Kline drop rate warning)**: Tỷ lệ phần trăm dữ liệu nến/kline bị hàng đợi đầu vào loại bỏ vượt mức quy định (mặc định: `5.0%`). Tỷ lệ này tăng đột biến thường báo hiệu mạng chập chờn hoặc CPU quá tải không kịp xử lý dữ liệu thị trường theo thời gian thực.
- **Cảnh báo độ trễ chiến lược P99 (Strategy latency warning P99)**: Ngưỡng thời gian xử lý theo percentile 99 của hàm xử lý chiến lược (tính bằng mili giây, mặc định: `500.0` ms). Khi có từ 1% số lần tính toán vượt quá giới hạn này, cảnh báo sẽ được kích hoạt để giúp bạn phát hiện các chỉ báo hoặc thuật toán tùy biến gây chậm hệ thống.

:::warning
Nếu bạn liên tục nhận được cảnh báo độ trễ P99 trong lúc bot đang chạy Live, hãy kiểm tra lại thuật toán chỉ báo tùy biến và tuyệt đối tránh gọi các tác vụ I/O đồng bộ (synchronous file/network) hoặc phân bổ bộ nhớ quá mức bên trong các sự kiện `OnCandle` hay `OnTick`.
:::
