---
sidebar_position: 4
id: sdk-market-data
title: Dữ Liệu Thị Trường & Chỉ Báo
description: Truy xuất dữ liệu thị trường lịch sử và thời gian thực
---

# Dữ Liệu Thị Trường & Chỉ Báo

`ITimeSeriesClient` cung cấp quyền truy cập vào dữ liệu nến OHLCV, dữ liệu tick và hệ thống chỉ báo kỹ thuật.

## Tổng Quan Về ITimeSeriesClient

Truy cập qua thuộc tính `IOkxClient.Timeseries`:

```csharp
var ts = client.Timeseries;
```

## Cấu Hình & Trạng Thái

```csharp
Timeframe tf    = ts.PeriodCurrent;        // Khung thời gian hiện tại
DateTime begin  = ts.BeginTime;            // Thời gian bắt đầu của chuỗi dữ liệu
DateTime? end   = ts.EndTime;             // Null khi đang chạy thời gian thực (real-time)
decimal price   = ts.CurrentTickPrice;     // Giá tick mới nhất
TickData tick   = ts.CurrentTick;          // Dữ liệu tick mới nhất
int total       = ts.Bars("BTC-USDT", Timeframe.OneHour);  // Tổng số nến khả dụng
int maxBars     = ts.MaxBars;              // Số lượng nến tối đa trong bộ nhớ cache
```

## Đọc Dữ Liệu OHLCV

### Nến Đã Đóng Gần Nhất & Nến Quá Khứ

```csharp
// Cây nến đóng gần nhất (shift = 0)
var lastClosed = ts.GetLastClosedCandle();

// Cây nến tại vị trí chỉ số xác định (0 = đóng gần nhất, 1 = cây nến liền trước, …)
var prev = await ts.GetOHCLVAsync(
    symbol: "BTC-USDT",
    timeframe: Timeframe.OneHour,
    shift: 1);
```

> [!IMPORTANT]
> Hệ thống **không hỗ trợ** truy vấn cây nến đang hình thành (chưa đóng).
> `shift = 0` luôn luôn đại diện cho **cây nến đã đóng nến hoàn chỉnh gần nhất**. Quy tắc này áp dụng đồng nhất cho cả dữ liệu OHLCV và giá trị của các chỉ báo (`GetValue(0)` trả về giá trị tại cây nến đã đóng gần nhất).

> [!NOTE]
> Các tham số `symbol` và `timeframe` là tùy chọn — khi bỏ qua, hệ thống sẽ tự động dùng giá trị mặc định từ cấu hình chiến lược.

### Thuộc Tính CandleData

```csharp
CandleData candle = ts.GetLastClosedCandle();

DateTime time   = candle.Time;
decimal open    = candle.Open;
decimal high    = candle.High;
decimal low     = candle.Low;
decimal close   = candle.Close;
decimal volume  = candle.Volume;
```

## Sao Chép Dữ Liệu Chuỗi Thời Gian (Copy Series Data)

Sao chép một mảng dữ liệu OHLCV — rất hữu ích cho các tác vụ phân tích hàng loạt:

### Theo Vị Trí & Số Lượng

```csharp
// Lấy 100 nến gần nhất
CandleData[] candles = await ts.CopySeries(
    symbol: null,           // symbol mặc định
    timeframe: null,        // timeframe mặc định
    startPos: 0,
    count: 100);
```

### Theo Khoảng Thời Gian

```csharp
CandleData[] candles = await ts.CopySeries(
    symbol: "BTC-USDT",
    timeframe: Timeframe.FifteenMinutes,
    startTime: DateTime.UtcNow.AddDays(-7),
    endTime: DateTime.UtcNow);
```

### Sao Chép Từng Thành Phần Riêng Biệt

```csharp
decimal[] closes  = await ts.CopyCloses(null, null, 0, 100);
decimal[] highs   = await ts.CopyHighs(null, null, 0, 100);
decimal[] lows    = await ts.CopyLows(null, null, 0, 100);
decimal[] opens   = await ts.CopyOpens(null, null, 0, 100);
decimal[] volumes = await ts.CopyVolumes(null, null, 0, 100);
DateTime[] times  = await ts.CopyTimes(null, null, 0, 100);
```

### Sao Chép Giá Theo AppliedPrice

```csharp
// Sử dụng enum AppliedPrice để trích xuất loại giá mong muốn
var prices = await ts.CopyPrices(
    AppliedPrice.Close, null, null, startPos: 0, count: 50);

// Hoặc từ một khoảng thời gian
var prices = await ts.CopyPrices(
    AppliedPrice.Typical,   // (H + L + C) / 3
    "BTC-USDT",
    Timeframe.OneHour,
    start: DateTime.UtcNow.AddDays(-1),
    endTime: DateTime.UtcNow);
```

## Các Chỉ Báo Kỹ Thuật Tích Hợp Sẵn

`ITimeSeriesClient` cung cấp các phương thức khởi tạo sẵn chỉ báo kỹ thuật. Tất cả các chỉ báo đều:

- **Tính toán lũy tiến (Incremental)** — được cập nhật tự động khi có nến mới
- **Có thể đặt lại (Resettable)** — tương thích hoàn toàn cho cả Live Trading và Backtest
- **Hỗ trợ đa cặp tiền / đa khung thời gian** — có thể khởi tạo trên bất kỳ symbol / timeframe nào

### Chỉ Báo Xu Hướng (Trend)

```csharp
var ma   = ts.CreateIndicatorMA(period: 20, method: MaMethod.EMA, appliedPrice: AppliedPrice.Close);
var st   = ts.CreateIndicatorSuperTrend(period: 10, multiplier: 3.0);
var ichi = ts.CreateIndicatorIchimoku(tenkanPeriod: 9, kijunPeriod: 26, senkouBPeriod: 52);
var gator = ts.CreateIndicatorAlligator();
```

### Dao Động (Oscillators)

```csharp
var rsi   = ts.CreateIndicatorRSI(period: 14);
var macd  = ts.CreateIndicatorMACD(fastPeriod: 12, slowPeriod: 26, signalPeriod: 9);
var stoch = ts.CreateIndicatorStochastic(kPeriod: 14, dPeriod: 3, kSlow: 3);
var wpr   = ts.CreateIndicatorWPR(period: 14);
var dm    = ts.CreateIndicatorDeMarker(period: 14);
```

### Biến Động (Volatility)

```csharp
var atr    = ts.CreateIndicatorATR(period: 14);
var bwmfi  = ts.CreateIndicatorBWMFI();
var stddev = ts.CreateIndicatorStdDev(period: 20);
```

### Khối Lượng (Volume)

```csharp
var vwap   = ts.CreateIndicatorVWAP(resetDaily: true);
var obv    = ts.CreateIndicatorOBV();
var ad     = ts.CreateIndicatorAD();
var vspike = ts.CreateIndicatorVolumeSpike(period: 20, spikeThreshold: 2.0);
```

### Bill Williams

```csharp
var ac        = ts.CreateIndicatorAC();
var ao        = ts.CreateIndicatorAO();
var alligator = ts.CreateIndicatorAlligator();
var gator     = ts.CreateIndicatorGator();
```

### Đa Cặp Tiền & Đa Khung Thời Gian (Multi-Symbol / Multi-Timeframe)

```csharp
// RSI trên khung thời gian khác
var rsi4h = ts.CreateIndicatorRSI(
    symbol: "BTC-USDT", timeframe: Timeframe.FourHours,
    period: 14, indicatorAlias: "RSI_4H");

// MA trên cặp tiền khác
var ethMa = ts.CreateIndicatorMA(
    symbol: "ETH-USDT", timeframe: Timeframe.OneHour,
    period: 50, indicatorAlias: "ETH_MA50");
```

## Đọc Giá Trị Chỉ Báo

### Sử Dụng Typed Interface

Mỗi chỉ báo tích hợp trả về một interface có định kiểu với các phương thức tiện ích:

```csharp
var rsi = ts.CreateIndicatorRSI(period: 14);

IndicatorValue val = rsi.FindValue(0);   // 0 = nến đã đóng gần nhất
if (!val.IsEmpty)
{
    decimal rsiValue = (decimal)val.Value;
    logger.LogDebug("RSI", "Giá trị hiện tại: {V}", rsiValue);
}

bool overbought = rsi.IsOverbought();   // RSI > 70
bool oversold   = rsi.IsOversold();     // RSI < 30
```

### Sử Dụng CopyBuffer

Sao chép một mảng giá trị của chỉ báo:

```csharp
var macd = ts.CreateIndicatorMACD();
string handle = macd.GetIndicatorId();

// Sao chép đường MACD (buffer 0) — 50 giá trị gần nhất
int copied = ts.CopyBuffer(handle, bufferNumber: 0,
    startIndex: 0, count: 50, out var macdLine);

// Sao chép đường Signal (buffer 1)
ts.CopyBuffer(handle, bufferNumber: 1,
    startIndex: 0, count: 50, out var signalLine);

// Sao chép Histogram (buffer 2)
ts.CopyBuffer(handle, bufferNumber: 2,
    startIndex: 0, count: 50, out var histogram);
```

## Ví Dụ: Chiến Lược Sử Dụng Chỉ Báo

```csharp
public class TrendStrategy : StrategyBase
{
    private readonly IOkxClient _client;
    private IIndicatorMA? _ma50;
    private IIndicatorRSI? _rsi;
    private IIndicatorATR? _atr;

    public TrendStrategy(IOkxClient client) => _client = client;

    public override Task<bool> OnInitAsync(IStrategyStateStore state, CancellationToken ct)
    {
        var ts = _client.Timeseries;
        _ma50 = ts.CreateIndicatorMA(period: 50, method: MaMethod.EMA);
        _rsi  = ts.CreateIndicatorRSI(period: 14);
        _atr  = ts.CreateIndicatorATR(period: 14);
        return Task.FromResult(true);
    }

    public override async Task OnTickAsync(TickPhase tickPhase, CancellationToken ct)
    {
        if (tickPhase != TickPhase.BarClose) return;

        var candle = _client.Timeseries.GetLastClosedCandle();
        var maVal  = _ma50!.FindValue(0); // 0 = nến đã đóng gần nhất
        var rsiVal = _rsi!.FindValue(0);
        var atrVal = _atr!.FindValue(0);

        if (maVal.IsEmpty || rsiVal.IsEmpty || atrVal.IsEmpty) return;

        bool aboveMa = candle.Close > (decimal)maVal.Value;
        bool rsiOk   = rsiVal.Value > 40 && rsiVal.Value < 70;

        if (aboveMa && rsiOk && !State.HasOpenPosition)
        {
            await _client.Trade.PlaceOrderAsync(
                "BTC-USDT", OrderSide.Buy, OrderType.Market, 0.01m);
        }
    }

    public override Task<bool> OnStopAsync(CancellationToken ct) => Task.FromResult(true);
}
```

## Xem Thêm

- [ITimeSeriesClient](xref:Pt.Okx.Sdk.Clients.Market.ITimeSeriesClient) Tài Liệu API
- [API Vẽ Biểu Đồ](drawing-api.md) — Vẽ các đối tượng đồ họa lên biểu đồ từ mã nguồn
- [Plugin Chỉ Báo Tùy Chỉnh](../plugins/indicator/overview.md) — Xây dựng chỉ báo của riêng bạn
- [Plugin Chiến Lược](../plugins/strategy/overview.md) — Sử dụng chỉ báo trong chiến lược giao dịch
