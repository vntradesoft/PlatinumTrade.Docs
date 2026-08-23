---
id: errors
title: Lỗi (Errors)
description: Danh mục mã lỗi và hướng dẫn xử lý lỗi.
status: stable
visibility: public
---

# Lỗi (Errors)

## Các Phân nhóm Lỗi (OkxErrorCode)

| Phạm vi mã | Phân loại |
|---|---|
| 1000-1099 | Lỗi máy chủ và hạ tầng hệ thống |
| 1100-1199 | Lỗi xác thực tham số yêu cầu (validation) |
| 2000-2099 | Lỗi đặt lệnh và thực thi giao dịch |

## Các Mẫu Xử lý Lỗi Thường gặp

| Trạng thái | Hành động Khuyến nghị |
|---|---|
| Lỗi xác thực Auth | Fail fast (Dừng ngay) — Kiểm tra lại cấu hình |
| Lỗi giới hạn tần suất (Rate limit) | Chờ (Backoff) + Thử lại kèm độ lệch ngẫu nhiên (jitter) |
| Lỗi hợp lệ hóa lệnh | Ghi log và bỏ qua — Kiểm tra lại tham số lệnh |
| Lỗi mất kết nối mạng | Thử lại với thời gian tăng dần (exponential backoff) |

## Tài Liệu Liên Quan

- [Tổng Quan SDK](../../intro.md)
- [Xử Lý Lỗi SDK](../../guides/api-result.md)
