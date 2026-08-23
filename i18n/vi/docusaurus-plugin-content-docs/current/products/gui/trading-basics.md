---
id: products-gui-trading-basics
title: Nguyên Tắc Giao Dịch Cơ Bản
sidebar_position: 7
description: Các luồng công việc cơ bản để giao dịch dựa trên biểu đồ trong Platinum Trade GUI App
sidebar_label: Giao Dịch Cơ Bản
---

# Nguyên Tắc Giao Dịch Cơ Bản

Mục này tập trung vào các luồng công việc giao dịch thực tế và vận hành nền tảng, thay vì lý thuyết chiến thuật giao dịch.

## Luồng Khởi Tạo An Toàn

1. Cấu hình và xác minh thông tin đăng nhập Demo API của bạn.
2. Thêm cặp giao dịch mục tiêu vào bảng Market Watch.
3. Mở biểu đồ và chọn khung thời gian phân tích của bạn.
4. Thêm các chỉ báo kỹ thuật mong muốn.
5. Xác thực hành vi chiến thuật trong giao dịch mô phỏng (paper trading) trước khi triển khai thực tế (live production).

### Lộ Trình Chuyển Đổi: Từ Mô Phỏng sang Thực Tế

```mermaid
graph TD
    A[Cấu hình Demo API] --> B[Xác thực Giao dịch Mô phỏng]
    B --> C{Chiến thuật Hợp lệ?}
    C -- Không --> D[Tối ưu hóa Chiến thuật]
    D --> B
    C -- Có --> E[Cấu hình Live API]
    E --> F[Giao dịch Thực tế (Production)]
```

## Khái Niệm Nền Tảng Cốt Lõi

- **Các Tab Trading View:** Quản lý không gian làm việc biểu đồ, các chỉ báo và khung thời gian đang hoạt động.
- **Market Watch:** Quản lý danh sách theo dõi và hỗ trợ chuyển đổi nhanh bối cảnh mã giao dịch.
- **Backtesting & Simulation:** Các công cụ tích hợp sẵn để mô phỏng và kiểm thử lịch sử đối với logic chiến thuật.

## Khuyến Nghị Vận Hành

- Bắt đầu với một số lượng nhỏ mã giao dịch để giảm tải lượng thông tin xử lý.
- Duy trì một khung thời gian phân tích chính và một khung thời gian xác nhận phụ.
- Lưu cài đặt ngay lập tức sau khi sửa đổi API key hoặc cấu hình proxy.
- Xác minh các kênh thông báo (ví dụ: Telegram notifier) trước khi phụ thuộc vào các kích hoạt cảnh báo tự động.

## Cảnh Báo Rủi Ro

Giao dịch các công cụ tài chính đi kèm rủi ro cao và có thể dẫn đến mất toàn bộ vốn đầu tư. Phần mềm này không đảm bảo khả năng sinh lời.

## Tài Liệu Liên Quan

- [Market Watch](./market-watch.md)
- [Công Cụ Vẽ](./drawing-tools.md)
- [FAQ](./faq.md)
