---
id: sdk-api-reference
title: Tham Chiếu API
description: Cấu trúc interface SDK, mô hình dữ liệu và sơ đồ map API OKX.
status: stable
visibility: public
---

# Tham Chiếu API

SDK Platinum Trade cung cấp client hợp nhất `IOkxClient`, tích hợp các sub-client chuyên biệt để tương tác với sàn giao dịch OKX.

Phần này chứa các bảng ánh xạ chi tiết giữa các phương thức SDK, các hàm thư viện `OKX.Net` cơ sở và các REST API endpoint chính thức của OKX.

## Các SDK Client Sub-Interfaces

Chọn một client interface bên dưới để xem chi tiết các phương thức, ánh xạ hàm OKX.Net và API endpoint tương ứng:

*   **[Trading Client (ITradeClient)](./client/trade.md)**: Quản lý lệnh giao dịch, lệnh thuật toán (algo), vị thế (positions) và lịch sử khớp lệnh của tài khoản.
*   **[Account Client (IAccountClient)](./client/account.md)**: Tải số dư tài khoản, thiết lập đòn bẩy, chế độ vị thế (hedge mode) và phí giao dịch.
*   **[Instrument Client (IInstrumentClient)](./client/instrument.md)**: Truy vấn thông tin sản phẩm, giá ticker, sổ lệnh (order book), chênh lệch giá (spread) và các giới hạn vị thế.
*   **[Time Series Client (ITimeSeriesClient)](./client/timeseries-and-indicators/index.md)**: Truy xuất các chỉ báo kỹ thuật nội bộ (MA, RSI, v.v.) và bộ đệm lưu trữ dữ nến lịch sử.

---

## Mô Hình Dữ Liệu & Kiểu Liệt Kê (Models & Enums)

*   **[Models & Enums](./models.md)**: Chi tiết các mô hình dữ liệu cốt lõi (`ApiResult<T>`, `Order`, `Position`, `CandleData`) và kiểu liệt kê (`StrategyEventType`, `PtLogLevel`).
*   **[Mã Lỗi](./errors/errors.md)**: Danh mục phân loại mã lỗi hệ thống, lỗi giao dịch và hướng dẫn xử lý lỗi.
