---
id: sdk-timeseries-client
title: Timeseries API
sidebar_label: Timeseries
sidebar_position: 1
---

# Timeseries API

Timeseries API (`Context.Timeseries`) cung cấp các phương thức và thuộc tính để truy vấn dữ liệu thị trường theo thời gian thực và lịch sử (nến OHLCV, tick) cũng như quản lý các chỉ báo kỹ thuật.

---

## Thuộc tính & Trạng thái

### `PeriodCurrent`
Lấy khung thời gian (Timeframe/Kline interval) chính đang được chiến lược sử dụng.

```csharp
Timeframe PeriodCurrent { get; }
```

---

### `BeginTime`
Lấy mốc thời gian bắt đầu của giai đoạn nạp dữ liệu đệm (warmup period).

```csharp
DateTime BeginTime { get; }
```

**Ghi chú**

Mốc thời gian này sớm hơn `StartTime` và được dùng để tải đủ số lượng nến lịch sử cho các chỉ báo trước khi chiến lược bắt đầu xử lý logic giao dịch.

---

### `StartTime`
Lấy mốc thời gian thực tế mà chiến lược bắt đầu xử lý logic giao dịch sau khi hoàn tất giai đoạn warmup.

```csharp
DateTime? StartTime { get; }
```

---

### `EndTime`
Lấy mốc thời gian kết thúc phiên (trả về `null` khi đang chạy chế độ giao dịch thời gian thực).

```csharp
DateTime? EndTime { get; }
```

---

### `MaxBars`
Lấy số lượng nến tối đa được lưu trữ trong bộ nhớ đệm cache.

```csharp
int MaxBars { get; }
```

---

### `CurrentTickPrice`
Lấy mức giá tick mới nhất của tài sản chính từ luồng dữ liệu thị trường.

```csharp
decimal CurrentTickPrice { get; }
```

---

### `CurrentTick`
Lấy toàn bộ cấu trúc dữ liệu của tick gần nhất (`TickData`).

```csharp
TickData CurrentTick { get; }
```

---

### `Indicator`
Lấy interface quản lý (`IIndicatorManager`) các chỉ báo kỹ thuật đã đăng ký.

```csharp
IIndicatorManager Indicator { get; }
```

---

### `SymbolsTimeframes`
Lấy danh sách tập hợp các cặp symbol và timeframe thuộc phạm vi của phiên chiến lược này.

```csharp
HashSet<(string Symbol, Timeframe Timeframe)> SymbolsTimeframes { get; }
```

---

## Truy vấn Số lượng Nến & Thời gian

### `Bars`
Trả về tổng số lượng nến khả dụng cho symbol và khung thời gian chỉ định.

**Cú pháp**

```csharp
int Bars(string? symbol = null, Timeframe? timeframe = null);
```

**Tham số**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | Mã giao dịch (ví dụ `"BTC-USDT-SWAP"`). Nếu là `null`, sử dụng symbol chính. |
| `timeframe` | `Timeframe?` | Khung thời gian (ví dụ `Timeframe.OneHour`). Nếu là `null`, sử dụng timeframe chính. |

**Giá trị trả về**

Tổng số lượng nến khả dụng dạng `int`.

**Ví dụ**

```csharp
int totalBars = Context.Timeseries.Bars("BTC-USDT-SWAP", Timeframe.OneHour);
Context.Logger.LogInformation("Bars", $"Tổng số nến 1H: {totalBars}");
```

---

### `BarsCalculated`
Đếm số lượng nến đã được tính toán cho một chỉ báo cụ thể.

**Cú pháp**

```csharp
int BarsCalculated(string indicatorId);
```

**Tham số**

| Parameter | Type | Description |
|---|---|---|
| `indicatorId` | `string` | ID định danh duy nhất của chỉ báo. |

**Giá trị trả về**

Số lượng nến đã tính dạng `int`.

**Ví dụ**

```csharp
var rsi = Context.Timeseries.CreateIndicatorRSI(period: 14);
int calculated = Context.Timeseries.BarsCalculated(rsi.Id);
```

---

### `GetCurrentCandleTime`
Lấy thời gian mở của nến hiện tại cho khung thời gian chỉ định.

**Cú pháp**

```csharp
DateTime GetCurrentCandleTime(Timeframe timeframe = Timeframe.OneMinute);
```

---

### `GetCurrentTime`
Lấy thời gian hệ thống hiện tại (hoặc thời gian mô phỏng trong chế độ backtest).

**Cú pháp**

```csharp
DateTime GetCurrentTime();
```

---

## Truy xuất Dữ liệu Nến

### `GetOHLCVAsync`
Lấy dữ liệu nến OHLCV tại vị trí shift cụ thể (0 = nến đang hình thành, 1 = nến đóng trước đó...).

**Cú pháp**

```csharp
Task<CandleData> GetOHLCVAsync(string? symbol = null, Timeframe? timeframe = null, int shift = 0, CancellationToken ct = default);
```

**Tham số**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string?` | Mã giao dịch. Khi `null`, dùng symbol chính. |
| `timeframe` | `Timeframe?` | Khung thời gian. Khi `null`, dùng timeframe chính. |
| `shift` | `int` | Chỉ số nến (0 = nến đang mở, 1 = nến vừa đóng). |
| `ct` | `CancellationToken` | Token hủy tác vụ. |

**Giá trị trả về**

Đối tượng [`CandleData`](../../models.md#candledata).

**Ví dụ**

```csharp
var candle = await Context.Timeseries.GetOHLCVAsync(shift: 1);
Context.Logger.LogInformation("Candle", $"Giá đóng nến trước: {candle.Close}");
```

---

### `GetLastClosedCandle` / `GetLastClosedCandleAsync`
Lấy nến đóng gần nhất đã được chốt giá.

**Cú pháp**

```csharp
// Bản đồng bộ
CandleData GetLastClosedCandle(string? symbol = null, Timeframe? timeframe = null);

// Bản bất đồng bộ
Task<CandleData> GetLastClosedCandleAsync(string? symbol = null, Timeframe? timeframe = null, CancellationToken ct = default);
```

**Ví dụ**

```csharp
CandleData lastClosed = Context.Timeseries.GetLastClosedCandle();
Context.Logger.LogInformation("Candle", $"Giá đóng: {lastClosed.Close}");
```

---

### `GetOpenCandle`
Lấy nến đang mở (đang hình thành).

**Cú pháp**

```csharp
CandleData GetOpenCandle(string? symbol = null, Timeframe? timeframe = null);
```

---

### `GetTime`
Lấy timestamp của nến tại chỉ số shift chỉ định.

**Cú pháp**

```csharp
DateTime GetTime(Timeframe timeframe, int shift);
```

---

### `UpdateOpenCandleIndicators`
Ép buộc tính toán lại tức thì các chỉ báo sử dụng giá tick của nến đang mở (forming candle).

**Cú pháp**

```csharp
void UpdateOpenCandleIndicators(string? symbol = null, Timeframe? timeframe = null);
```

**Ghi chú**

Mặc định, các chỉ báo chỉ được tính 1 lần duy nhất lúc mở nến để tối ưu CPU. Nếu chiến lược cần giá trị chỉ báo phản ánh giá tick ở giữa nến đang mở, hãy gọi `UpdateOpenCandleIndicators()` trước khi đọc buffer ở vị trí index 0.

---

## Các hàm Sao chép Dữ liệu Hàng loạt (CopySeries & Components)

### `CopySeries`
Sao chép mảng các đối tượng nến OHLCV theo khoảng thời gian, vị trí hoặc mốc bắt đầu.

**Cú pháp**

```csharp
// 1. Theo khoảng thời gian
Task<CandleData[]> CopySeries(string? symbol = null, Timeframe? timeframe = null, DateTime? startTime = null, DateTime? endTime = null);

// 2. Theo vị trí bắt đầu và số lượng
Task<CandleData[]> CopySeries(string? symbol = null, Timeframe? timeframe = null, int startPos = 0, int count = 1);

// 3. Theo mốc bắt đầu và số lượng
Task<CandleData[]> CopySeries(string? symbol = null, Timeframe? timeframe = null, DateTime? startTime = null, int count = 1);
```

**Ví dụ**

```csharp
CandleData[] candles = await Context.Timeseries.CopySeries(startPos: 1, count: 5);
foreach (var c in candles)
{
    Context.Logger.LogInformation("Bar", $"O: {c.Open}, H: {c.High}, L: {c.Low}, C: {c.Close}");
}
```

---

### Nhóm hàm Copy Thành phần Nến (`CopyTimes`, `CopyOpens`, `CopyHighs`, `CopyLows`, `CopyCloses`, `CopyVolumes`)

Trích xuất trực tiếp từng thành phần giá ra mảng kiểu nguyên thủy (`decimal[]`, `DateTime[]`) phục vụ tính toán vector hiệu năng cao.

Mỗi hàm cung cấp 3 overload tương tự `CopySeries`:
1. `(string? symbol, Timeframe? timeframe, int startPos, int count)`
2. `(string? symbol, Timeframe? timeframe, DateTime? startTime, int count)`
3. `(string? symbol, Timeframe? timeframe, DateTime? startTime, DateTime? endTime)`

```csharp
Task<DateTime[]> CopyTimes(string? symbol = null, Timeframe? timeframe = null, int startPos = 0, int count = 1);
Task<decimal[]>  CopyOpens(string? symbol = null, Timeframe? timeframe = null, int startPos = 0, int count = 1);
Task<decimal[]>  CopyHighs(string? symbol = null, Timeframe? timeframe = null, int startPos = 0, int count = 1);
Task<decimal[]>  CopyLows(string? symbol = null, Timeframe? timeframe = null, int startPos = 0, int count = 1);
Task<decimal[]>  CopyCloses(string? symbol = null, Timeframe? timeframe = null, int startPos = 0, int count = 1);
Task<decimal[]>  CopyVolumes(string? symbol = null, Timeframe? timeframe = null, int startPos = 0, int count = 1);
```

**Ví dụ**

```csharp
// Tìm đỉnh/đáy của 10 nến gần nhất nhanh chóng
decimal[] highs = await Context.Timeseries.CopyHighs(startPos: 1, count: 10);
decimal[] lows  = await Context.Timeseries.CopyLows(startPos: 1, count: 10);

decimal highest = highs.Max();
decimal lowest  = lows.Min();
```

---

## Sao chép Buffer Chỉ báo (`CopyBuffer`)

Sao chép giá trị đã tính toán từ buffer của chỉ báo kỹ thuật.

**Cú pháp**

```csharp
// 1. Theo vị trí bắt đầu và số lượng
int CopyBuffer(string indicatorHandle, int bufferNumber, int startPos, int count, out IEnumerable<IndicatorValue> buffers);

// 2. Theo mốc bắt đầu và số lượng
int CopyBuffer(string indicatorHandle, int bufferNumber, DateTime startTime, int count, out IEnumerable<IndicatorValue> buffers);

// 3. Theo khoảng thời gian
int CopyBuffer(string indicatorHandle, int bufferNumber, DateTime startTime, DateTime endTime, out IEnumerable<IndicatorValue> buffers);
```

**Ví dụ**

```csharp
var rsi = Context.Timeseries.CreateIndicatorRSI(period: 14);
int copied = Context.Timeseries.CopyBuffer(rsi.Id, 0, startPos: 1, count: 3, out var rsiValues);

foreach (var item in rsiValues)
{
    Context.Logger.LogInformation("RSI", $"Time: {item.Time}, Value: {item.Value}");
}
```

---

## Khởi tạo Chỉ báo Tích hợp

Các phương thức factory để tạo nhanh các chỉ báo tiêu chuẩn:

```csharp
IIndicatorMA   CreateIndicatorMA(string? symbol = null, Timeframe? timeframe = null, int? period = null, MaMethod? method = null, AppliedPrice? appliedPrice = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
IIndicatorRSI  CreateIndicatorRSI(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
IIndicatorMACD CreateIndicatorMACD(string? symbol = null, Timeframe? timeframe = null, int? fastPeriod = null, int? slowPeriod = null, int? signalPeriod = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
IIndicatorATR  CreateIndicatorATR(string? symbol = null, Timeframe? timeframe = null, int? period = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
IIndicatorBollingerBands CreateIndicatorBollingerBands(string? symbol = null, Timeframe? timeframe = null, int? period = null, double? deviations = null, AppliedPrice? appliedPrice = null, string? indicatorAlias = null, Action<IndicatorProperty>? propertyOptions = null);
```

**Ví dụ**

```csharp
// Đường EMA 20 tính theo giá Close
var ema20 = Context.Timeseries.CreateIndicatorMA(period: 20, method: MaMethod.Ema, appliedPrice: AppliedPrice.Close);

// Đọc giá trị tại nến vừa đóng (index 1)
double currentEma = ema20.GetValue(1);
```

---

## Chỉ báo Tùy biến (Custom Indicators)

```csharp
Task<T> GetCustomIndicatorAsync<T>(string indicatorName, string? symbol = null, Timeframe? timeframe = null, params object[] parameters) where T : class;
```
