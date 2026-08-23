---
id: products-gui-faq
title: Câu Hỏi Thường Gặp (FAQ)
sidebar_position: 12
description: Các câu hỏi thường gặp về ứng dụng Platinum Trade GUI
---

# Câu Hỏi Thường Gặp (FAQ)

## Tại sao "Kiểm Tra Kết Nối" (Test Connection) thất bại?

- Kiểm tra kỹ API Key, Secret Key và Passphrase của bạn.
- Đảm bảo bạn đang kiểm tra đúng môi trường (Demo vs. Production).
- Nếu sử dụng proxy, hãy xác minh URL proxy và cài đặt cổng kết nối.

## Tôi có thể chạy ứng dụng mà không cần khóa API không?

Có. Một số tính năng công khai (như xem biểu đồ và theo dõi thị trường công khai) có thể truy cập mà không cần khóa API, nhưng bất kỳ thao tác nào liên quan đến tài khoản hoặc giao dịch đều yêu cầu thông tin xác thực API hợp lệ.

## Cài đặt ứng dụng được lưu trữ ở đâu?

Cấu hình ứng dụng được quản lý thông qua trình quản lý cấu hình và các trường thông tin nhạy cảm được mã hóa trước khi lưu trữ cục bộ.

## Làm cách nào để thêm chỉ báo tùy chỉnh?

Điều hướng đến Chèn -> Chỉ Báo -> Tùy Chỉnh và đảm bảo plugin chỉ báo tùy chỉnh của bạn tương thích với phiên bản SDK của ứng dụng.

## Tại sao một số tính năng bị khóa/vô hiệu hóa?

Một số tính năng nâng cao bị hạn chế tùy theo cấp độ giấy phép (ví dụ: yêu cầu giấy phép Pro).

## Thông báo Toast xuất hiện ở đâu và khi nào chúng biến mất?

Theo mặc định, thông báo toast xuất hiện ở góc trên bên phải màn hình. Chúng tự động đóng dựa trên loại: Thành công (3 giây), Thông tin (4 giây) và Cảnh báo (5 giây). Cảnh báo lỗi có thể yêu cầu đóng thủ công.

## Tài Liệu Liên Quan

- [Cài Đặt Khóa API](./settings/api-credentials.md)
- [Giao Dịch Cơ Bản](./trading-basics.md)
