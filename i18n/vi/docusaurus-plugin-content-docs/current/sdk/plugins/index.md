---
id: sdk-plugins
title: Tổng Quan Kiến Trúc Plugin
sidebar_label: Tổng Quan
sidebar_position: 4
description: Phát triển plugin Strategy và Indicator tùy chỉnh cho nền tảng Platinum Trade.
---

# Plugins

Nền tảng Platinum Trade sử dụng kiến trúc plugin. Plugin Strategy và Indicator là các DLL .NET chỉ tham chiếu `Pt.Okx.Sdk` và được nạp tại thời điểm chạy.

| Loại Plugin | Mô tả | Bắt đầu |
|---|---|---|
| [Strategy Plugin](strategy/overview.md) | Xây dựng chiến lược giao dịch tự động với quản lý lifecycle, xử lý sự kiện, lưu trạng thái và tích hợp Telegram | [Tổng quan & Thiết lập →](strategy/overview.md) |
| [Indicator Plugin](indicator/overview.md) | Tạo chỉ báo kỹ thuật tùy chỉnh với hỗ trợ nhiều buffer, khả năng vẽ và đăng ký tham số | [Tổng quan & Thiết lập →](indicator/overview.md) |

## Kiến trúc Plugin

- Plugin chỉ tham chiếu **duy nhất** `Pt.Okx.Sdk` (thư viện hợp đồng)
- Được nạp tại runtime bởi Core engine thông qua reflection
- Mỗi plugin tự đăng ký qua interface metadata (`IStrategyPlugin` hoặc `IIndicatorPlugin`)
- Plugin không truy cập OKX API trực tiếp — sử dụng các abstraction của SDK
