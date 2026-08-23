---
id: products-gui-settings-api-credentials
title: Cấu Hình Khóa API
sidebar_position: 2
description: Đặc tả thiết lập API key trong App Platinum Trade và quy ước kiểm tra kết nối
sidebar_label: Khóa API
---

# Thiết Lập API Key

Tài liệu này mô tả thiết lập thông tin API trong App Platinum Trade theo ngữ cảnh kỹ thuật.

## Phạm Vi

- Chuẩn hóa dữ liệu đầu vào cho cấu hình API.
- Chuẩn hóa quy trình kiểm tra kết nối theo môi trường.
- Chuẩn hóa khuyến nghị bảo mật khi vận hành.

## Vị trí cấu hình

- Điều hướng: Tools -> Options.
- Phân hệ: API Credentials.
- Môi trường hỗ trợ: Demo và Production.

![Cấu hình API ban đầu](/img/products/gui/settings/api-credentials-settings-1.png)

## Dữ liệu cấu hình bắt buộc

- API Key
- Secret Key
- Passphrase

![Hộp thoại đăng ký tài khoản OKX](/img/products/gui/settings/api-credentials-settings-dialog-okx-account-settings.png)

## Quy ước môi trường

- Demo: sử dụng endpoint môi trường demo.
- Production: sử dụng endpoint môi trường live.
- Mỗi môi trường sử dụng bộ thông tin xác thực độc lập.

![Danh sách tài khoản đã đăng ký](/img/products/gui/settings/api-credentials-settings-2.png)

## Kiểm tra kết nối

- Thao tác: sử dụng nút Test Connection theo từng môi trường.
- Kết quả: trả về trạng thái thành công hoặc lỗi xác thực/kết nối.
- Mục tiêu: xác nhận bộ key hợp lệ trước khi sử dụng chức năng giao dịch liên quan tài khoản.

## Lưu trữ thông tin xác thực

> [!NOTE]
> 🔒 **Thông tin xác thực được bảo vệ cục bộ:**
> - Bộ key được mã hóa và lưu trữ trực tiếp trên thiết bị của bạn.
> - Phạm vi bảo vệ phụ thuộc hoàn toàn vào cơ chế bảo mật của tài khoản hệ điều hành hiện tại (Windows DPAPI).

## Khuyến nghị bảo mật

> [!WARNING]
> ⚠️ **Quy tắc an toàn tài khoản giao dịch:**
> - **Chỉ cấp quyền Giao dịch (Trade):** Tuyệt đối không bật quyền rút tiền (Withdraw) cho API Key.
> - **Xác thực trước:** Luôn thử nghiệm kết nối và chạy chiến lược trên môi trường Demo trước khi chuyển sang tài khoản thực (Production).
> - **Bảo mật thiết bị:** Hãy khóa màn hình khi rời máy và đặt mật khẩu mạnh cho tài khoản Windows để phòng ngừa rủi ro rò rỉ dữ liệu lưu trữ cục bộ.

## Tài Liệu Liên Quan

- [Bắt Đầu Nhanh](../getting-started.md)
- [Nền Tảng Giao Dịch](../trading-basics.md)
- [Giám Sát Mạng](../network-monitor.md)
