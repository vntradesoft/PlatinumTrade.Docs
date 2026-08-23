---
sidebar_position: 1
id: sdk-intro
title: Giới Thiệu
description: Tổng quan về các thành phần, chỉ báo kỹ thuật và khung làm việc của Pt.Okx.Sdk
---

# Chào Mừng Đến Với Pt.Okx.Sdk

**Pt.Okx.Sdk** là thư viện hợp đồng (contracts library) cho nền tảng **Platinum Trading Platform (hỗ trợ hợp đồng tương lai và swaps sàn OKX)** — tầng thấp nhất trong giải pháp, định nghĩa toàn bộ interface, enum, model và mẫu kiến trúc được sử dụng bởi các dự án khác.

## SDK Này Cung Cấp Những Gì?

| Thành phần | Mô tả |
|---|---|
| **Client Interfaces** | `IOkxClient`, `ITradeClient`, `ITimeSeriesClient`, `IAccountClient`, `IInstrumentClient` — tầng trừu tượng bao bọc toàn bộ API sàn OKX |
| **Mẫu ApiResult** | Xử lý lỗi thống nhất qua `ApiResult<T>` — không sử dụng exception cho lỗi nghiệp vụ kinh doanh |
| **Chỉ Báo Kỹ Thuật (Indicators)** | Lớp cơ sở (`CalcIndBase`, `IIndicator`, `IIndicatorBuffer`) và hơn 20 chỉ báo tích hợp sẵn (MA, RSI, MACD, ATR, SuperTrend, Ichimoku, VWAP, …) |
| **Khung Chiến Lược (Strategy Framework)** | `IStrategy`, `IStrategyStateStore`, `IStrategyLogger` — vòng đời và quản lý trạng thái cho các chiến lược giao dịch tự động |
| **Hệ Thống Plugin** | `IStrategyPlugin`, `IIndicatorPlugin` — các interface plugin cho DLL chiến lược và chỉ báo tùy chỉnh |
| **API Vẽ Biểu Đồ (Drawing API)** | `IDrawingManager` — vẽ các đối tượng đồ họa (đường kẻ, hình khối, văn bản, Fibonacci) lên biểu đồ trực tiếp từ mã nguồn chiến lược |
| **Thông Báo (Notification)** | `ITelegramCommandExtension` — mở rộng xử lý lệnh tương tác hai chiều qua Telegram |
| **Lưu Trữ (Storage)** | `IStoragePathProvider` — lớp trừu tượng quản lý đường dẫn thư mục lưu trữ khi thực thi |

## Ai Sử Dụng SDK Này?

- **Nhà phát triển chiến lược (Strategy developers)** — xây dựng các plugin chiến lược giao dịch (ví dụ: `Pt.Example.Stgy.UpTrend`)
- **Nhà phát triển chỉ báo (Indicator developers)** — xây dựng các plugin chỉ báo tùy chỉnh (ví dụ: `Pt.Examples.Indicator`)
- **Core Engine** — hiện thực hóa các interface được định nghĩa trong SDK này
- **Ứng dụng GUI / Bot** (**Platinum Trade App**, **CLI Bot**) — sử dụng các dịch vụ thông qua cơ chế Dependency Injection (DI)

## Bắt Đầu Từ Đâu

- Mới tiếp cận dự án → [Kiến Trúc Tổng Quan](architecture.md)
- Sẵn sàng viết mã → [Bắt Đầu Nhanh](guides/getting-started.md)
- Xây dựng chiến lược → [Plugin Chiến Lược](plugins/strategy/overview.md)
- Xây dựng chỉ báo → [Plugin Chỉ Báo Tùy Chỉnh](plugins/indicator/overview.md)
- Vẽ biểu đồ từ code → [API Vẽ Biểu Đồ](guides/drawing-api.md)
- Tra cứu API chi tiết → [Tài Liệu API](pathname:///PlatinumTrade.Docs/sdk/api/index.html)
