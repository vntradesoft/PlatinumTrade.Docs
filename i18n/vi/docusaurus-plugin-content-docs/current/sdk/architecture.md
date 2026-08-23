---
sidebar_position: 2
id: sdk-architecture
title: Kiến Trúc Tổng Quan
description: Thiết kế kiến trúc SDK và tương tác giữa các thành phần
---

# Kiến Trúc

Trang này mô tả kiến trúc tổng thể của giải pháp Platinum Trading Platform (hỗ trợ futures & swaps sàn OKX) và vai trò của thư viện `Pt.Okx.Sdk` trong toàn bộ hệ thống.

## Cấu Trúc Giải Pháp

```text
Pt.Okx.Sdk             ← Contracts: interfaces, enums, models, ApiResult
  ^
  |
Core Engine             ← Engine: OKX wrapper, indicators, socket, simulator, notifier
  ^        ^
  |        |
CLI Bot     Platinum Trade App
  ^
  |
Pt.Example.Stgy.UpTrend             ← Strategy plugin (ví dụ)

Pt.Examples.Indicator     → Pt.Okx.Sdk  ← Indicator plugin (ví dụ)
Unit Tests               → Core Engine + Pt.Okx.Sdk
```

## Mô Tả Các Dự Án

| Dự án | Target Framework | Mô tả |
|---|---|---|
| `Pt.Okx.Sdk` | `net8.0;net9.0;net10.0` | Thư viện hợp đồng (Contracts) — interfaces, enums, models, mẫu thiết kế |
| **Core Engine** | `net10.0` | Động cơ thực thi — OKX API wrapper, chỉ báo, WebSocket, mô phỏng (simulator), thông báo, nến lịch sử |
| **CLI Bot** | `net10.0` | Host console cho giao dịch thực tế (real / forward trading) |
| **Platinum Trade App** | `net10.0-windows` | Ứng dụng WPF — không gian làm việc, biểu đồ, bảng giá theo dõi, cấu hình chiến lược, giao diện backtest |
| `Pt.Example.Stgy.UpTrend` | `net10.0` | Ví dụ plugin chiến lược — chiến lược giao dịch bám theo xu hướng |
| `Pt.Examples.Indicator` | `net10.0` | Ví dụ plugin chỉ báo — MA Crossover, Momentum, ExRSI |
| **Unit Tests** | `net10.0` | Kiểm thử NUnit cho core, simulator, indicator, nến lịch sử |

## Bản Đồ Namespace

```text
Pt.Okx.Sdk
├── Clients
│   ├── IOkxClient                    ← Interface tổng hợp
│   ├── Account
│   │   └── IAccountClient           ← Số dư tài khoản, đòn bẩy, ký quỹ
│   ├── Instruments
│   │   └── IInstrumentClient         ← Thông tin cặp giao dịch
│   ├── Market
│   │   └── ITimeSeriesClient         ← Dữ liệu OHLCV, chỉ báo, dữ liệu tick
│   └── Trading
│       └── ITradeClient              ← Đặt lệnh, vị thế, lệnh algo/trigger
├── Common
│   ├── ApiResult / ApiResult<T>      ← Mẫu kết quả thực thi thống nhất
│   └── ApiError                      ← Thông tin chi tiết mã lỗi
├── Enums
│   ├── Timeframe, OrderSide, OrderType
│   ├── InstrumentType, TradeMode
│   └── ApiErrorType, PtLogLevel
├── Indicators
│   ├── Base (IIndicator, CalcIndBase, IIndicatorBuffer)
│   ├── BuiltIn (IndicatorTrend, IndicatorOscillator, ...)
│   ├── Enums (AppliedPrice, MaMethod, IndicatorStyle, ...)
│   ├── Models (IndicatorConfig, IndicatorProperty, IndicatorValue, ...)
│   ├── Plugin (IIndicatorPlugin, IndicatorLoadedPlugin)
│   └── Services (IIndicatorFactory, IIndicatorManager)
├── Strategy
│   ├── IStrategy, StrategyBase, IStrategyLogger, IStrategyStateStore
│   ├── Events (TickPhase, StrategyEventType, StrategyEvent)
│   ├── Parameters (InputParameter, IInputParamManager, InputSchema)
│   ├── Plugin (IStrategyPlugin, IStrategyPluginMetadata, IStrategyPluginInputSchema)
│   └── Settings (StrategySettings, DateOption, PriceDataOption)
├── Drawing
│   └── IDrawingManager               ← Quản lý đối tượng vẽ biểu đồ
├── Notifier
│   └── ITelegramCommandExtension     ← Tùy biến xử lý lệnh Telegram
└── Storage
    └── IStoragePathProvider          ← Quản lý đường dẫn lưu trữ khi chạy
```

## Ngăn Xếp Công Nghệ (Technology Stack)

| Công nghệ | Mục đích sử dụng |
|---|---|
| C# / .NET 10 | Bật tính năng Nullable, implicit usings |
| WPF | `net10.0-windows` cho **Platinum Trade App** |
| Dependency Injection | `Microsoft.Extensions.DependencyInjection` / `Hosting` |
| Logging | `ILogger<T>` + serilog provider |
| Testing | NUnit + Moq |

## Xem Thêm

- [Bắt Đầu Nhanh](guides/getting-started.md) — Hướng dẫn tham chiếu SDK và viết dòng mã đầu tiên
- [Tài Liệu API](pathname:///PlatinumTrade.Docs/sdk/api/index.html) — Tài liệu chi tiết các lớp và hàm API
