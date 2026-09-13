---
id: products-gui-settings-chart
title: Cấu Hình Biểu Đồ
sidebar_position: 6
description: Tùy chọn hiển thị biểu đồ nến, đổi thứ tự chỉ báo khi Live, định dạng nhãn khối lượng và các bảng màu nến cài sẵn
sidebar_label: Biểu Đồ
---

# Biểu Đồ (Chart)

Phần này hướng dẫn cấu hình hiển thị biểu đồ, cho phép đổi thứ tự chỉ báo khi đang chạy Live, định dạng nhãn khối lượng và lựa chọn bảng màu nến.

![Cài đặt Biểu đồ](/img/products/gui/settings/chart-settings.png)

## Tùy chọn hiển thị (Display Options)

- **Hiển thị khối lượng (Show Volume)**: Bật hoặc tắt khung hiển thị biểu đồ cột (histogram) khối lượng giao dịch bên dưới biểu đồ giá.
- **Bật đổi thứ tự indicator trên biểu đồ Live (Enable indicator reorder on Live chart)**: Khi bật, các nút Lên / Xuống sẽ hiển thị trên thanh tiêu đề của từng chỉ báo trong chế độ giao dịch Live, cho phép bạn sắp xếp lại vị trí các khung chỉ báo ngay lập tức mà không cần dừng bot.

  :::warning Lưu ý về vẽ lại giao diện
  Việc đổi thứ tự các chỉ báo trong lúc bot đang chạy Live sẽ kích hoạt việc vẽ lại (redraw) khung biểu đồ trong khoảnh khắc ngắn. Thao tác này hoàn toàn là về mặt hiển thị và **không** gây ảnh hưởng đến việc khớp lệnh hay kết nối websocket, tuy nhiên bạn nên hạn chế thay đổi liên tục khi thị trường đang có biến động giá cực mạnh.
  :::

- **Định dạng nhãn khối lượng (Volume Label Format)**: Điều khiển cách thể hiện số liệu khối lượng trên nhãn header và tooltip của khung khối lượng:
  - `Rút gọn (K/M/B)`: Rút gọn các số lớn bằng chữ cái biểu thị độ lớn (ví dụ: `1.2M`, `450K`).
  - `Số đầy đủ`: Hiển thị số nguyên chi tiết đầy đủ (ví dụ: `1,234,567`).

## Bảng màu nến (Candle Colors)

Tùy biến phong cách đồ họa của hành động giá trên biểu đồ nến Nhật:

- **Bảng màu cài sẵn (Color Presets)**: Áp dụng nhanh các phong cách màu sắc chuẩn chuyên nghiệp:
  - `Solid Classic`: Phong cách TradingView phổ biến với nến tăng xanh lục ngọc (`#26A69A`) và nến giảm đỏ nhẹ (`#EF5350`).
  - `Traditional`: Phong cách tài chính cổ điển với nến tăng viền xanh lá rỗng thân và nến giảm thân xám nhạt viền đỏ.
  - `Blue / Orange`: Nến tăng màu xanh dương tương phản cao và nến giảm màu cam ấm.
  - `Monochrome`: Phong cách tối giản đen trắng và thang độ xám.
  - `MetaTrader 5`: Phong cách MetaTrader cổ điển với viền xanh lá và thân nến trong suốt ánh xám.
  - `Ghost`: Phong cách nến bóng mờ chỉ có đường viền nến, không tô màu đặc thân nến.
  - `Vivid`: Phong cách neon rực rỡ với xanh lục lam (cyan) và hồng cánh sen (magenta).
  - `Modern Solid`: Nến xanh lá và đỏ tươi nguyên khối độ bão hòa cao.
  - `Custom`: Mở khóa bảng màu tự do cho phép chỉnh từng thành phần.

- **Tùy chỉnh màu chi tiết (Custom Colors)**: Khi chọn chế độ `Custom`, bạn có thể bấm vào ô chọn màu để chỉnh:
  - **Màu nến tăng (Up Candle Color)**: Màu viền và râu nến tăng.
  - **Màu thân nến tăng (Up Body Color)**: Màu tô phần thân bên trong của nến tăng.
  - **Màu nến giảm (Down Candle Color)**: Màu viền và râu nến giảm.
  - **Màu thân nến giảm (Down Body Color)**: Màu tô phần thân bên trong của nến giảm.
