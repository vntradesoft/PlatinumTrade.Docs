---
id: products-gui-settings-updates
title: Cập Nhật Ứng Dụng
sidebar_position: 9
description: Cấu hình tự động kiểm tra, tải về ngầm, chính sách khởi động lại và lựa chọn kênh phát hành qua Velopack
sidebar_label: Cập Nhật Ứng Dụng
---

# Cập Nhật Ứng Dụng

Platinum Trade tích hợp hệ thống cập nhật phần mềm hiện đại và an toàn dựa trên công nghệ [Velopack](https://velopack.io). Tab **Cập nhật** cho phép bạn tùy chỉnh cách thức và thời điểm ứng dụng phát hiện, tải về cũng như cài đặt các phiên bản mới.

## Cấu hình cập nhật

Tùy chỉnh vòng đời cập nhật tự động phù hợp với quy trình giao dịch của bạn:

- **Tự động kiểm tra cập nhật (Automatically check for updates)**: Khi bật, ứng dụng sẽ định kỳ tìm kiếm các bản phát hành mới trên feed phát hành chạy ngầm ngay khi ứng dụng khởi động.
- **Tự động tải về bản cập nhật (Automatically download updates)**: Khi bật, gói cài đặt mới sẽ được tải xuống âm thầm trong nền mà không làm gián đoạn biểu đồ hoặc các phiên bot đang chạy.
- **Tự động khởi động lại sau khi cài đặt (Automatically restart to apply update)**: Khi bật, ứng dụng sẽ tự động khởi động lại ngay lập tức để áp dụng bản cập nhật vừa tải xong mà không hiện hộp thoại hỏi xác nhận.

  :::tip Lời khuyên cho nhà giao dịch Live
  Nếu bạn đang chạy các chiến lược giao dịch tự động dài hạn với tiền thật, bạn nên tắt tùy chọn **Tự động khởi động lại sau khi cài đặt** (`false`). Điều này giúp tránh việc bot tự khởi động lại ngắt quãng giữa chừng khi đang có vị thế mở, giúp bạn chủ động chọn thời điểm thị trường êm dịu để khởi động lại.
  :::

- **Kênh cập nhật (Update Channel)**: Lựa chọn kênh phát hành mà ứng dụng sẽ đăng ký nhận bản cập nhật:
  - `Stable`: Kênh chính thức, đã được kiểm thử toàn diện và ổn định cao, khuyến nghị cho tài khoản giao dịch thực tế.
  - `Beta`: Kênh thử nghiệm, nhận sớm các tính năng mới nhất, cải tiến chỉ báo và các bản sửa lỗi trước khi phát hành rộng rãi.

## Cơ chế hoạt động của bản cập nhật

1. **Phát hiện**: Trình kiểm tra chạy ngầm sẽ truy vấn feed phát hành GitHub tương ứng với kênh bạn đã chọn (`Stable` hoặc `Beta`).
2. **Tải vi sai (Delta Update)**: Velopack sử dụng cơ chế vá nhị phân vi sai, nghĩa là bạn chỉ cần tải về các tệp có sự thay đổi thay vì phải tải lại toàn bộ gói cài đặt dung lượng lớn.
3. **Áp dụng**: Sau khi tải xong, bản cập nhật được kiểm tra chữ ký toàn vẹn và áp dụng nguyên khối (atomic) trong lần khởi động lại kế tiếp, bảo toàn tuyệt đối toàn bộ cấu hình cá nhân, khóa API và bộ nhớ đệm dữ liệu lịch sử của bạn.
