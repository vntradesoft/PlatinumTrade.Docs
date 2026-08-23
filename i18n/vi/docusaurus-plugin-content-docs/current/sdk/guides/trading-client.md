---
sidebar_position: 5
id: sdk-trading-client
title: Trading Client
description: Đặt lệnh, quản lý vị thế và số dư tài khoản
---

# Sử Dụng Trading Client

`ITradeClient` và `IAccountClient` cung cấp bộ tính năng hoàn chỉnh để thực hiện giao dịch và quản lý tài khoản trên sàn OKX.

## Tổng Quan Về ITradeClient

Truy cập `ITradeClient` thông qua thuộc tính `IOkxClient.Trade`:

```csharp
var trade = client.Trade;
```

### Các Nhóm Phương Thức Có Sẵn

| Nhóm Phương Thức | Mô tả |
|---|---|
| `PlaceOrderAsync` | Đặt lệnh Limit hoặc Market thông thường |
| `PlaceAlgoOrderAsync` | Đặt lệnh TP/SL, Trailing Stop hoặc Trigger Algo |
| `AmendOrderAsync` / `AmendAlgoOrderAsync` | Chỉnh sửa lệnh đang chờ khớp |
| `CancelOrderAsync` / `CancelAlgoOrderAsync` | Hủy lệnh |
| `GetOrderAsync` / `GetOrdersAsync` | Truy vấn chi tiết lệnh |
| `GetPositionsAsync` | Truy vấn danh sách vị thế đang mở |
| `GetHistoryOrdersAsync` | Lịch sử lệnh đã thực hiện (lên đến 7 ngày gần nhất) |
| `GetUserTradeAsync` | Lịch sử các lượt khớp lệnh (Fills) |
| `ClosePositionAsync` | Đóng toàn bộ hoặc một phần vị thế |
| `OrderCheckAsync` | Kiểm tra tính hợp lệ trước khi đặt lệnh (Dry Run) |

## Đặt Lệnh (Placing Orders)

### Lệnh Thị Trường (Market Order)

```csharp
var result = await client.Trade.PlaceOrderAsync(
    symbol: "BTC-USDT",
    side: OrderSide.Buy,
    type: OrderType.Market,
    quantity: 0.01m);

if (result.GetResultOrError(out var order, out var error))
{
    logger.LogEntry("BTC-USDT", OrderSide.Buy, 0.01m,
        order.Price, sl: 0, tp: 0);
}
else
{
    logger.LogError(new Exception(error.Message), "Đặt lệnh thất bại");
}
```

### Lệnh Giới Hạn (Limit Order)

```csharp
var result = await client.Trade.PlaceOrderAsync(
    symbol: "BTC-USDT",
    side: OrderSide.Buy,
    type: OrderType.Limit,
    quantity: 0.01m,
    price: 95000m);
```

### Lệnh Giới Hạn Kèm Chốt Lời / Cắt Lỗ (Attached TP/SL)

```csharp
var result = await client.Trade.PlaceOrderAsync(
    symbol: "BTC-USDT",
    side: OrderSide.Buy,
    type: OrderType.Limit,
    quantity: 0.01m,
    price: 95000m,
    attachedAlgoOrder: new AttachedAlgoOrder
    {
        TakeProfitTriggerPrice = 100000m,
        StopLossTriggerPrice = 93000m
    });
```

## Đặt Lệnh Điều Kiện (Algo Orders / TP & SL)

```csharp
// Cắt Lỗ (Stop Loss)
var slResult = await client.Trade.PlaceAlgoOrderAsync(
    symbol: "BTC-USDT",
    orderSide: OrderSide.Sell,
    algoOrderType: AlgoOrderType.StopLoss,
    quantity: 0.01m,
    slTriggerPrice: 93000m,
    slOrderPrice: -1m,  // Khớp theo giá thị trường
    reduceOnly: true);

// Chốt Lời (Take Profit)
var tpResult = await client.Trade.PlaceAlgoOrderAsync(
    symbol: "BTC-USDT",
    orderSide: OrderSide.Sell,
    algoOrderType: AlgoOrderType.TakeProfit,
    quantity: 0.01m,
    tpTriggerPrice: 100000m,
    tpOrderPrice: -1m,
    reduceOnly: true);
```

## Sửa Lệnh (Amending Orders)

```csharp
var result = await client.Trade.AmendOrderAsync(
    symbol: "BTC-USDT",
    orderId: 12345678L,
    newPrice: 96000m,
    newQuantity: 0.02m);
```

## Hủy Lệnh (Cancelling Orders)

### Hủy Một Lệnh Cụ Thể

```csharp
var result = await client.Trade.CancelOrderAsync(
    symbol: "BTC-USDT",
    orderId: 12345678L);
```

### Hủy Nhiều Lệnh Cùng Lúc

```csharp
var orders = new[]
{
    new OrderCancelRequest { Symbol = "BTC-USDT", OrderId = 111 },
    new OrderCancelRequest { Symbol = "BTC-USDT", OrderId = 222 },
};
var result = await client.Trade.CancelMultipleOrdersAsync(orders);
```

## Đóng Vị Thế (Closing a Position)

```csharp
var result = await client.Trade.ClosePositionAsync(
    symbol: "BTC-USDT",
    autoCancel: true);  // Tự động hủy các lệnh treo liên quan
```

## Truy Vấn Lệnh & Vị Thế

### Vị Thế Đang Mở

```csharp
var result = await client.Trade.GetPositionsAsync(symbol: "BTC-USDT");

if (result.GetResultOrError(out var positions, out var error))
{
    foreach (var pos in positions)
    {
        logger.LogDebug("Position",
            "Hướng={Side} KhốiLượng={Qty} LợiNhuậnChưaThựcHiện={Pnl}",
            pos.PositionSide, pos.Quantity, pos.UnrealizedPnl);
    }
}
```

### Lệnh Đang Chờ Khớp

```csharp
var result = await client.Trade.GetOrdersAsync(symbol: "BTC-USDT");
```

### Lịch Sử Lệnh

```csharp
// 7 ngày gần nhất
var recent = await client.Trade.GetHistoryOrdersAsync(
    symbol: "BTC-USDT",
    startTime: DateTime.UtcNow.AddDays(-7));

// Lưu trữ cũ hơn (> 3 tháng)
var archive = await client.Trade.GetOrdersArchiveAsync(
    symbol: "BTC-USDT");
```

## Kiểm Tra Hợp Lệ Trước Khi Đặt Lệnh (Pre-trade Check)

Kiểm tra tính khả thi của lệnh mà không thực sự gửi lệnh lên sàn:

```csharp
var check = await client.Trade.OrderCheckAsync(
    symbol: "BTC-USDT",
    side: OrderSide.Buy,
    type: OrderType.Limit,
    quantity: 0.01m,
    price: 95000m);

if (check)
    logger.LogDebug("Check", "Lệnh hợp lệ, sẵn sàng đặt");
else
    logger.LogWarning("Check", "Lệnh không hợp lệ: {Msg}", check.Error!.Message);
```

## Magic Number

Sử dụng Magic Number để phân biệt lệnh giữa các bot khác nhau chạy cùng tài khoản:

```csharp
var (success, errorMsg) = client.Trade.SetMagicNumber("BOT_A_001");
if (!success)
    logger.LogWarning("MagicNumber", errorMsg);
```

## Quản Lý Tài Khoản (IAccountClient)

Truy cập `IAccountClient` qua `IOkxClient.Account`:

```csharp
var account = client.Account;
```

### Thuộc Tính Số Dư

```csharp
decimal wallet    = account.WalletBalance;      // Số dư thực tế trong ví (chưa tính lời/lỗ vị thế)
decimal available = account.AvailableBalance;    // Số dư khả dụng để mở thêm vị thế mới
decimal equity    = account.Equity;              // Tài sản ròng = Wallet + Lời/Lỗ vị thế
decimal upnl      = account.UnrealizedPnL;       // Lời/lỗ chưa thực hiện hiện tại
decimal margin    = account.InitialMargin;       // Ký quỹ ban đầu đang sử dụng
```

### Đòn Bẩy & Chế Độ Vị Thế

```csharp
// Thiết lập mức đòn bẩy
await account.SetInitialLeverageAsync("BTC-USDT", leverage: 10);

// Đọc mức đòn bẩy hiện tại
decimal lev = account.GetLeverage("BTC-USDT");

// Thiết lập chế độ hai chiều (Hedge Mode)
await account.SetHedgeModeAsync(hedge: true);
bool isHedge = account.IsHedgeMode();
```

### Phân Tích Rủi Ro

```csharp
decimal equity      = account.GetCurrentEquity();
decimal equityPct   = account.GetEquityChangePercentage();
decimal marginRatio = account.GetMarginRatio();     // >= 100% → cảnh báo nguy cơ thanh lý
decimal drawdown    = account.GetCurrentDrawdown();
```

## Xem Thêm

- [ITradeClient](xref:Pt.Okx.Sdk.Clients.Trading.ITradeClient) Tài Liệu API
- [IAccountClient](xref:Pt.Okx.Sdk.Clients.Account.IAccountClient) Tài Liệu API
- [Mẫu ApiResult](api-result.md) — Xử lý lỗi cho các tác vụ giao dịch
- [Dữ Liệu Thị Trường & Chỉ Báo](market-data.md) — Đọc dữ liệu giá
