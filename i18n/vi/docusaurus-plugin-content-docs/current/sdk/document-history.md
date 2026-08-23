---
sidebar_position: 99
id: sdk-document-history
title: Lịch Sử Tài Liệu SDK
description: Lịch sử các phiên bản, hợp đồng API và cập nhật của riêng SDK và Examples
---

# Lịch Sử Tài Liệu SDK

Trang này theo dõi các thay đổi, cập nhật hợp đồng API và tính năng mới dành riêng cho **Bộ phát triển SDK Platinum Trade** (`Pt.Okx.Sdk`), các lớp trừu tượng công khai và các **Ví Dụ Mẫu / Project Templates**.

---

### [0.12.0-beta.1] - 2026-08-21

#### Tính Năng & Hợp Đồng SDK
- **sdk:** Tinh chỉnh hợp đồng metadata của plugin (`IStrategyPluginMetadata`, `InputParamAttribute`), cơ chế kiểm tra tính tương thích và tuần tự hóa tham số.
- **sdk:** Bổ sung chức năng sao chép sâu (deep copy) cho các mô hình chỉ báo và bộ thuộc tính (`IndicatorProperty`).

#### Ví Dụ & Mẫu Dự Án
- **examples:** Cập nhật chiến lược mẫu UpTrend (`Pt.Example.Stgy.UpTrend`) và các chỉ báo ví dụ.
- **templates:** Cập nhật các mẫu dự án `dotnet new` (`Pt.Templates.Strategy`, `Pt.Templates.Indicator`) nhắm mục tiêu .NET 10.0.

---

### [0.11.0-beta.1] - 2026-07-20

#### Hợp Đồng SDK
- **sdk:** Đồng bộ các hợp đồng SDK công khai và metadata gói NuGet với phiên bản nền tảng v0.11.0-beta.1.

---

### [0.10.0-beta.1] - 2026-07-19

#### Hợp Đồng & Chỉ Báo
- **sdk:** Bổ sung hỗ trợ chế độ tính toán và tối ưu hóa hợp đồng buffer chỉ báo cho các bản cập nhật nến mở (open candle).

---

### [0.9.3-beta.4] - 2026-07-15

#### Tính Năng SDK
- **sdk:** Đồng bộ các tham chiếu gói `Pt.Okx.Sdk` và cập nhật chú thích ánh xạ API cho các sub-client (`IAccountClient`, `IInstrumentClient`, `ITradeClient`).

---

### [0.9.3-beta.3] - 2026-07-09

#### Hợp Đồng SDK
- **sdk:** Đồng bộ phiên bản SDK với bản phát hành nền tảng v0.9.3-beta.3.

---

### [0.9.3-beta.2] - 2026-07-08

#### Thư Viện Phụ Thuộc
- **sdk:** Nâng cấp thư viện lõi `JK.OKX.Net` lên 5.0.2 trong các adapter client của SDK.

---

### [0.9.3-beta.1] - 2026-07-08

#### Thư Viện Phụ Thuộc
- **sdk:** Nâng cấp gói `Telegram.Bot` lên 22.10.1.1 phục vụ thông báo sự kiện Telegram trong chiến lược.

---

### [0.9.0-beta.5] - 2026-07-08

#### Hợp Đồng & Vòng Đời
- **sdk:** Chuẩn hóa hợp đồng phương thức vòng đời chiến lược (`OnInitAsync`, `OnStopAsync`).
- **examples:** Đổi tên các dự án ví dụ thành `Pt.Examples.Indicator` và `Pt.Example.Stgy.UpTrend`.

---

### [0.9.0-beta.4] - 2026-07-08

#### Hợp Đồng SDK
- **sdk:** Đồng bộ các hợp đồng SDK với phiên bản ứng dụng v0.9.0-beta.4.

---

### [0.9.0-beta.3] - 2026-07-08

#### Mẫu Dự Án & Vòng Đời
- **templates:** Thêm template dự án `dotnet new` cho plugin chiến lược và chỉ báo (`Pt.Templates.Strategy`, `Pt.Templates.Indicator`).
- **strategy:** Tái cấu trúc hợp đồng vòng đời chiến lược từ `InitializeAsync`/`StopAsync` sang `OnInitAsync`/`OnStopAsync`.

---

### [0.9.0-beta.2] - 2026-07-06

#### Hợp Đồng SDK
- **sdk:** Cập nhật các lớp trừu tượng cho giao diện chiến lược, plugin chỉ báo và hợp đồng backtest.

---

### [0.9.0-beta.1] - 2026-07-05

#### Bản Phát Hành Thử Nghiệm Đầu Tiên
- **sdk:** Phát hành gói NuGet `Pt.Okx.Sdk` phiên bản thử nghiệm đầu tiên (Initial Beta Release).
- **contracts:** Bề mặt hợp đồng công khai phục vụ phát triển chiến lược tùy chỉnh (`StrategyBase`) và chỉ báo kỹ thuật (`IndicatorBase`).
- **examples:** Các mã nguồn mẫu ban đầu hướng dẫn phát triển plugin chiến lược và chỉ báo.
