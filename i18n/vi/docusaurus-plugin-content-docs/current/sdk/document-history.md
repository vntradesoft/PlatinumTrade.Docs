---
sidebar_position: 99
id: sdk-document-history
title: Lịch Sử Tài Liệu SDK
description: Lịch sử chi tiết các phiên bản, hợp đồng API, kiểu dữ liệu và ví dụ mẫu của riêng SDK
---

# Lịch Sử Tài Liệu SDK

Trang này cung cấp nhật ký thay đổi chi tiết về các hợp đồng API công khai, các lớp cơ sở (base class), thuộc tính (attributes), thư viện phụ thuộc và mẫu dự án của **Bộ phát triển SDK Platinum Trade** (`Pt.Okx.Sdk`) cùng các **Ví Dụ Mẫu / Template Dự Án** chính thức.

---

### [0.12.0-beta.2] - 2026-09-13

#### Hợp Đồng Chiến Lược & Chỉ Báo
- **Khái Quát Hóa Chỉ Số Hiệu Năng & Lưu Trữ Trạng Thái:**
  - Chuẩn hóa việc đo lường hiệu năng bằng cách khái quát hóa `BacktestMetrics` thành `TradingMetrics`, cung cấp hợp đồng đánh giá thống kê nhất quán giữa các chế độ Backtest, Paper và Live.
  - Bổ sung hợp đồng chế độ theo dõi số dư (`BalanceTrackingMode`) hỗ trợ đánh giá PnL theo vốn khả dụng (equity) hoặc số dư tài khoản.
  - Làm rõ ranh giới kiến trúc giữa `IStrategyStateStore` (lưu trữ và phục hồi trạng thái key-value khi khởi động lại) và `IStoragePathProvider` (định tuyến đường dẫn tệp tin trên hệ thống).


#### Mẫu Dự Án & Công Cụ (Templates)
- **Template dotnet new:**
  - Đồng bộ các gói template `Pt.Templates.Strategy` (`dotnet new pt-strategy`) và `Pt.Templates.Indicator` (`dotnet new pt-indicator`) để tham chiếu trực tiếp đến `Pt.Okx.Sdk` phiên bản `0.12.0-beta.2`.
  - Cập nhật các ký hiệu cấu hình trong `template.json` theo chuẩn C# 13 và nền tảng .NET 10.0.

#### Tài Liệu & Hướng Dẫn Song Ngữ
- **Mở Rộng Hướng Dẫn SDK:**
  - Bổ sung các bài viết kiến trúc chuyên sâu về xử lý dữ liệu Đa khung thời gian (Multi-Timeframe), tích hợp engine Backtest, Lưu trữ trạng thái chiến lược và tích hợp bot Telegram điều khiển 2 chiều.
  - Cập nhật đồng bộ tài liệu tham chiếu Client API (`IAccountClient`, `IInstrumentClient`, `ITradeClient`, `ITimeseriesClient`) khớp chính xác với giao diện SDK hiện tại.
  - Hoàn thiện bản dịch song ngữ Anh - Việt cho toàn bộ danh mục chỉ báo tích hợp và hướng dẫn phát triển plugin.

---

### [0.12.0-beta.1] - 2026-08-21

#### Hợp Đồng API & Kiểu Dữ Liệu Công Khai
- **Siêu Dữ Liệu Plugin & Schema Tham Số:**
  - Nâng cấp `IStrategyPluginMetadata` và `IIndicatorPluginMetadata` với cơ chế kiểm tra tính tương thích phiên bản tại thời điểm chạy và thông tin tác giả.
  - Bổ sung `InputSchemaBuilder` và `InputSchemaMetadata` hỗ trợ tạo lược đồ tham số đầu vào động theo phương pháp khai báo.
  - Tinh chỉnh ràng buộc tham số `InputParamAttribute` với các kiểu dữ liệu chuyên biệt (`IntParameter`, `DoubleParameter`, `DecimalParameter`, `BoolParameter`, `StringParameter`, `EnumParameter`, `TimeSpanParameter`, `FilePathParameter`, `ListParameter<T>`).
- **Mô Hình Chỉ Báo & Thuộc Tính Đồ Họa:**
  - Bổ sung tính năng sao chép sâu (`Clone()`) cho `IndicatorProperty`, `IndicatorBuffer` và các bộ mô tả nét vẽ để đảm bảo an toàn đa luồng (thread-safety) giữa luồng tính toán ngầm và vòng lặp render UI.
  - Bổ sung enum `CalculationMode` (`OnBarClose`, `OnEveryTick`, `OnTimer`) cho phép chỉ báo định nghĩa tường minh tần suất tính toán lại.
- **Client & Trừu Tượng Dữ Liệu Thị Trường:**
  - Mở rộng các phương thức sao chép mảng trên `ITimeseriesClient`: `CopyBuffer`, `CopyTimes`, `CopyOpens`, `CopyHighs`, `CopyLows`, `CopyCloses`, `CopyVolumes`, `CopyPrices`.
  - Hỗ trợ đăng ký luồng nến đa khung thời gian và đồng bộ hóa phạm vi nến khởi động (warmup range).

#### Ví Dụ & Mẫu Dự Án
- **Pt.Example.Stgy.UpTrend:** Cập nhật chiến lược giao dịch mẫu tham khảo thể hiện:
  - Ràng buộc nhiều chỉ báo kỹ thuật (`SimpleMovingAverage`, `RelativeStrengthIndex`).
  - Cấu hình tham số động thông qua thuộc tính `[InputParam]`.
  - Đặt lệnh qua `PlaceOrderAsync` và theo dõi trạng thái vị thế trong hàm `OnTickAsync`.
  - Tự động lưu trữ và phục hồi trạng thái qua `IStrategyStateStore`.
- **Pt.Examples.Indicator:** Bổ sung các ví dụ chỉ báo tùy chỉnh minh họa việc cấp phát buffer riêng, kiểu vẽ biểu đồ và xuất nhiều đường đệm dữ liệu.
- **Project Templates:** Cập nhật template dự án `dotnet new pt-strategy` và `dotnet new pt-indicator` nhắm mục tiêu .NET 10.0 với cú pháp C# 13 hiện đại.

---

### [0.11.0-beta.1] - 2026-07-20

#### Hợp Đồng & Gói NuGet
- **Metadata Gói:** Đồng bộ metadata gói NuGet `Pt.Okx.Sdk`, các thư viện phụ thuộc và gói ký hiệu debug (`.snupkg`) với phiên bản nền tảng v0.11.0-beta.1.
- **Trừu Tượng Cấp Phép:** Hoàn thiện các hợp đồng kiểm tra phân hạng tính năng và quy trình xác thực quyền truy cập cho plugin tùy chỉnh.

---

### [0.10.0-beta.1] - 2026-07-19

#### Chỉ Báo & Engine Chuỗi Thời Gian
- **Xử Lý Nến Đang Mở (Open Candle):**
  - Hỗ trợ cập nhật nến mở thời gian thực (vị trí `shift 0`) trực tiếp trong các buffer tính toán chỉ báo.
  - Tự động đồng bộ độ dài mảng `IndicatorBuffer` theo chuỗi giá thực tế.
- **Kích Hoạt Tính Toán:**
  - Bổ sung cơ chế tính toán lại chỉ báo nến mở theo yêu cầu được kích hoạt trực tiếp từ mỗi tick thị trường.
- **Mô Hình Nến Tối Ưu:**
  - Tối ưu hóa struct `CompactCandle` và kiểu `PriceValue` để giảm thiểu cấp phát bộ nhớ khi gom dữ liệu tick.

---

### [0.9.3-beta.4] - 2026-07-15

#### Giao Diện Sub-Client & Ánh Xạ Endpoint
- **Phân Tách Sub-Client:**
  - Cấu trúc hệ thống sub-client module hóa trong namespace `Pt.Okx.Sdk.Clients`:
    - `IAccountClient`: Số dư tài khoản, vị thế, đòn bẩy và chế độ ký quỹ.
    - `IInstrumentClient`: Quy tắc mã giao dịch, ticker, kích thước hợp đồng, bước giá (tick size) và biểu phí.
    - `ITradeClient`: Đặt lệnh, đặt lệnh hàng loạt, hủy lệnh, sửa lệnh và lịch sử giao dịch.
    - `ITimeseriesClient`: Dữ liệu nến lịch sử và luồng nến trực tiếp.
- **Đặc Tả & Kiểu Trả Về:**
  - Bổ sung chú thích ánh xạ đầy đủ endpoint REST và kênh WebSocket OKX v5 trên toàn bộ phương thức client.
  - Chuẩn hóa kiểu phản hồi bao bọc bằng `ApiResult<T>`.

---

### [0.9.3-beta.3] - 2026-07-09

#### Bảo Trì
- **Phiên Bản Gói:** Đồng bộ phiên bản gói `Pt.Okx.Sdk` lên `0.9.3-beta.3`.
- **Kiểm Tra Tính Tương Thích:** Xác nhận khả năng tương thích nhị phân ngược cho các assembly chiến lược đã biên dịch trước đó.

---

### [0.9.3-beta.2] - 2026-07-08

#### Thư Viện Phụ Thuộc
- **Exchange Adapter:** Nâng cấp thư viện lõi `JK.OKX.Net` lên phiên bản `5.0.2` bên trong các adapter kết nối của SDK.

---

### [0.9.3-beta.1] - 2026-07-08

#### Thông Báo Chiến Lược
- **Tích Hợp Telegram:** Nâng cấp gói `Telegram.Bot` lên `22.10.1.1` trong `Pt.Okx.Sdk.Notifier` phục vụ gửi cảnh báo từ chiến lược và xử lý lệnh tương tác 2 chiều.

---

### [0.9.0-beta.5] - 2026-07-08

#### Chuẩn Hóa Vòng Đời Chiến Lược & Chỉ Báo
- **Vòng Đời Chiến Lược:**
  - Chuẩn hóa các hợp đồng phương thức vòng đời:
    - `Task OnInitAsync()`: Khởi tạo bất đồng bộ, đăng ký chỉ báo và xác thực tham số.
    - `Task OnStopAsync()`: Dọn dẹp tài nguyên an toàn, hủy các lệnh chờ và giải phóng đối tượng.
    - `Task OnTickAsync(TickEventArgs e)`: Trình xử lý sự kiện tick thị trường.
    - `Task OnOrderUpdateAsync(OrderEventArgs e)`: Thông báo cập nhật khớp lệnh và trạng thái lệnh.
- **Tổ Chức Dự Án Ví Dụ:**
  - Đổi tên các dự án mẫu chính thức thành `Pt.Examples.Indicator` và `Pt.Example.Stgy.UpTrend`.

---

### [0.9.0-beta.4] - 2026-07-08

#### Bảo Trì
- **Đồng Bộ Phiên Bản:** Đồng bộ phiên bản hợp đồng SDK với phiên bản ứng dụng v0.9.0-beta.4.

---

### [0.9.0-beta.3] - 2026-07-08

#### Template Dự Án & Kiến Trúc
- **Template dotnet new:**
  - Phát hành gói template `Pt.Templates.Strategy` (`dotnet new pt-strategy`).
  - Phát hành gói template `Pt.Templates.Indicator` (`dotnet new pt-indicator`).
- **Hiện Đại Hóa Vòng Đời:**
  - Chuyển đổi toàn diện các phương thức cũ `InitializeAsync` / `StopAsync` sang giao diện bất đồng bộ `OnInitAsync` / `OnStopAsync`.

---

### [0.9.0-beta.2] - 2026-07-06

#### Lớp Trừu Tượng Cốt Lõi
- **Kiến Trúc Plugin:** Giới thiệu các giao diện `IStrategyPlugin`, `IIndicatorPlugin` và `IInputParamManager`.
- **Lưu Trữ Trạng Thái:** Giới thiệu giao diện `IStrategyStateStore` hỗ trợ chiến lược tự động lưu trữ và phục hồi trạng thái key-value sau sự cố hoặc khởi động lại.

---

### [0.9.0-beta.1] - 2026-07-05

#### Bản Phát Hành Thử Nghiệm Đầu Tiên
- **Gói NuGet Pt.Okx.Sdk:** Bản phát hành đầu tiên dành cho các nhà phát triển .NET 10.0.
- **Nền Tảng Chiến Lược & Chỉ Báo:**
  - `StrategyBase`: Lớp cơ sở xây dựng chiến lược giao dịch tự động.
  - `IndicatorBase`: Lớp cơ sở tạo các chỉ báo kỹ thuật và mô hình toán học tùy chỉnh.
  - `IOkxClient` / `ITradingClient`: Giao diện client hợp nhất giao tiếp với sàn giao dịch.
- **Chỉ Báo Tích Hợp Sẵn:** Danh mục các chỉ báo kỹ thuật có sẵn (Trend, Oscillators, Volumes, Bill Williams).
- **API Vẽ Biểu Đồ:** Giới thiệu `IDrawingClient` và các đối tượng vẽ đồ họa cơ bản (Đường thẳng, Hình chữ nhật, Văn bản, Fibonacci Retracement).
