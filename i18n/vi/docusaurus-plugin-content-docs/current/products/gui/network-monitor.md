---
id: products-gui-network-monitor
title: Giám Sát Mạng
description: Đặc tả kỹ thuật các trạng thái network monitor và quy ước hiển thị
---

# Giám Sát Mạng

Tài liệu này mô tả đặc tả trạng thái của network monitor trong App Platinum Trade.

## Phạm Vi

- Chuẩn hóa ý nghĩa các trạng thái network.
- Chuẩn hóa quy ước màu và mức cột sóng.
- Thống nhất diễn giải giá trị hiển thị trên status bar.

## Giá Trị Trạng Thái

## `<latency> ms`

- Định nghĩa: đo độ trễ thành công tới endpoint.
- Format: số nguyên dương + hậu tố `ms`.
- Ví dụ: `87 ms`, `245 ms`.

## `ERR`

- Định nghĩa: request đo độ trễ trả về trạng thái lỗi (không thành công).
- Mục đích: biểu thị lỗi truy vấn latency trong chu kỳ đo.

## `N/A`

- Định nghĩa: phát sinh exception trong quá trình đo latency.
- Mục đích: phân biệt trạng thái lỗi runtime với lỗi phản hồi nghiệp vụ (`ERR`).

## `No API`

- Định nghĩa: không có API client khả dụng để thực hiện phép đo.
- Mục đích: biểu thị trạng thái chưa sẵn sàng của lớp kết nối.

## Quy Ước Mức Tín Hiệu

- `< 200 ms`: màu xanh lá, 4 cột sóng.
- `< 500 ms`: màu xanh nhạt, 3 cột sóng.
- `< 1000 ms`: màu vàng, 2 cột sóng.
- `>= 1000 ms`: màu đỏ, 1 cột sóng.

## Quy Ước Trạng Thái Lỗi/Không Khả Dụng

- `ERR`: màu xám, 0 cột sóng.
- `N/A`: màu xám, 0 cột sóng.
- `No API`: màu xám, 0 cột sóng.

## Hợp Đồng Hiển Thị

- `LatencyText`: hiển thị đúng theo một trong các giá trị trạng thái ở trên.
- `LatencyMs`: giá trị đo được khi thành công; trạng thái lỗi/unavailable dùng giá trị không dương.
- `NetworkStrengthColor`: tuân theo mapping theo latency hoặc mapping lỗi.
- `NetworkBars`: tuân theo mapping theo latency hoặc bằng `0` ở trạng thái lỗi/unavailable.

## Tài Liệu Liên Quan

- [API Key Setup](./settings/api-credentials.md)
- [Tổng Quan Giao Diện](./ui-overview.md)
