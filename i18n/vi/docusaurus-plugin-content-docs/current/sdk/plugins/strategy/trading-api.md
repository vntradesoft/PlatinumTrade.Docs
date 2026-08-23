---
sidebar_position: 5
id: sdk-strategy-trading-api
title: Trading API Trong Chiến Lược
description: Đặt và quản lý lệnh từ logic chiến lược
---

# Trading API Trong Chiến Lược

Dịch vụ `IOkxClient.Trade` cung cấp đầy đủ các chức năng cần thiết để quản lý lệnh và vị thế trên sàn giao dịch.

## Truy Cập Client

Bạn truy cập API client bằng cách inject `IOkxClient` vào constructor của chiến lược:

```csharp
public class MyStrategy : StrategyBase
{
    private readonly IOkxClient _client;
    
    public MyStrategy(IOkxClient client)
    {
        _client = client;
    }
}
```

## Đặt Lệnh (Placing an Order)

Để vào một vị thế, bạn sử dụng `PlaceOrderAsync`:

```csharp
var result = await _client.Trade.PlaceOrderAsync(
    symbol: "BTC-USDT-SWAP",
    side: OrderSide.Buy,
    type: OrderType.Market,
    quantity: 0.1m,
    ct: ct
);

if (result.Success)
{
    long orderId = result.Data.OrderId;
    _logger.LogInformation("Entry", $"Lệnh {orderId} đã được đặt thành công.");
}
else
{
    _logger.LogError("Entry", $"Đặt lệnh thất bại: {result.Error}");
}
```

## Đặt Lệnh Điều Kiện (Chốt Lời TP & Cắt Lỗ SL)

Bạn có thể gắn kèm Take Profit và Stop Loss theo điều kiện bằng `PlaceAlgoOrderAsync`:

```csharp
var algoResult = await _client.Trade.PlaceAlgoOrderAsync(
    symbol: "BTC-USDT-SWAP",
    orderSide: OrderSide.Sell,           // Ngược hướng với lệnh vào (để đóng lệnh Mua)
    algoOrderType: AlgoOrderType.Conditional,
    reduceOnly: true,                    // Đảm bảo chỉ đóng vị thế, không mở thêm vị thế mới
    tpTriggerPrice: 95000m,
    tpOrderPrice: -1,                    // -1 nghĩa là khớp theo giá thị trường khi kích hoạt
    slTriggerPrice: 90000m,
    slOrderPrice: -1,
    ct: ct
);
```

## Đóng Vị Thế (Closing a Position)

Bạn có thể đóng toàn bộ vị thế đang mở mà không cần tính toán số lượng chính xác:

```csharp
var closeResult = await _client.Trade.ClosePositionAsync(
    symbol: "BTC-USDT-SWAP",
    positionSide: PositionSide.Net, // Hoặc Long/Short tùy thuộc vào Margin Mode
    autoCancel: true,               // Tự động hủy các lệnh chờ TP/SL liên quan
    ct: ct
);
```

## Chỉnh Sửa Lệnh (Trailing Stop)

Để triển khai Trailing Stop, bạn thường xuyên sửa lệnh Stop Loss hiện có khi giá dịch chuyển theo hướng có lợi:

```csharp
var amendResult = await _client.Trade.AmendAlgoOrderAsync(
    symbol: "BTC-USDT-SWAP",
    algoId: "existing_algo_order_id",
    newStopLossTriggerPrice: 92000m,   // Dời mức cắt lỗ lên cao hơn
    newStopLossOrderPrice: -1,
    ct: ct
);
```

## Lấy Dữ Liệu Thực Tế Khi Khởi Động

Trong khi `IStrategyStateStore` là nguồn nhanh nhất trong các callback, bạn thường cần lấy dữ liệu trực tiếp từ sàn trong hàm `OnInitAsync` để khôi phục trạng thái sau khi khởi động lại:

```csharp
// 1. Lấy vị thế thực tế
var positionsResult = await _client.Trade.GetPositionsAsync("BTC-USDT-SWAP");
if (positionsResult.Success)
{
    foreach (var pos in positionsResult.Data)
    {
        // ... xây dựng lại trạng thái nội bộ ...
    }
}

// 2. Lấy danh sách lệnh Limit đang chờ
var ordersResult = await _client.Trade.GetOrdersAsync("BTC-USDT-SWAP");

// 3. Lấy danh sách lệnh Algo (SL/TP) đang chờ
var algoOrdersResult = await _client.Trade.GetAlgoOrdersAsync(
    AlgoOrderType.Conditional, 
    symbol: "BTC-USDT-SWAP"
);
```

## Dữ Liệu Chuỗi Thời Gian & Nến (OHLCV)

Để lấy dữ liệu nến biểu đồ hoặc giá hiện tại, sử dụng `IOkxClient.Timeseries`.

### Lấy Dữ Liệu Nến

> [!IMPORTANT]
> Hệ thống **không hỗ trợ** truy vấn cây nến đang hình thành (chưa đóng) qua `shift`.
> - `shift = 0` đề cập đến **cây nến đã đóng nến hoàn chỉnh gần nhất**.
> - `shift = 1` đề cập đến cây nến đóng liền trước đó, và tiếp tục như vậy.
> - Quy tắc này cũng áp dụng khi đọc giá trị của các chỉ báo (`GetValue(0)` lấy giá trị chỉ báo tính tại cây nến đã đóng gần nhất).

```csharp
// Lấy cây nến đã đóng gần nhất (Shift 0)
var latestClosedCandle = await _client.Timeseries.GetOHCLVAsync("BTC-USDT-SWAP", Timeframe.M15, shift: 0, ct);

// Lấy cây nến đã đóng trước đó (Shift 1)
var previousClosedCandle = await _client.Timeseries.GetOHCLVAsync("BTC-USDT-SWAP", Timeframe.M15, shift: 1, ct);

// Truy cập các thuộc tính OHLCV
if (!latestClosedCandle.IsEmpty)
{
    decimal open = latestClosedCandle.Open;
    decimal high = latestClosedCandle.High;
    decimal low = latestClosedCandle.Low;
    decimal close = latestClosedCandle.Close;
    decimal vol = latestClosedCandle.Volume;
}
```

### Giá Thời Gian Thực & Dữ Liệu Tick

Để lấy giá hiện tại mà không cần đợi nến đóng:

```csharp
// Lấy giá tick gần nhất từ luồng dữ liệu thời gian thực
decimal currentPrice = _client.Timeseries.CurrentTickPrice;

// Lấy giá Mark (thường dùng cho các tính toán thanh lý / rủi ro)
var markPrice = await _client.Instrument.GetMarkPriceAsync("BTC-USDT-SWAP", ct);
```
