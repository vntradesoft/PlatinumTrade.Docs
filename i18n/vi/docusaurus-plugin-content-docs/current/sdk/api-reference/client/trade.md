---
id: sdk-trade-client
title: Trade API
sidebar_label: Trade
sidebar_position: 3
---

# Trade API

Trade API (`Context.Trade`) quản lý việc đặt lệnh, sửa đổi, hủy lệnh, đóng vị thế và truy vấn dữ liệu giao dịch thời gian thực hoặc lịch sử.

Interface `ITradeClient` cung cấp quyền truy cập vào:

- Đặt và quản lý lệnh tiêu chuẩn (Limit, Market, Reduce-Only)
- Quản lý và đóng vị thế
- Lịch sử lệnh, khớp lệnh và vị thế đóng
- Lệnh điều kiện Algo (Take Profit, Stop Loss, Trailing Stop)
- Kiểm tra tiền giao dịch (Pre-trade order check)

:::info[Lưu ý]
Hiện tại, chỉ hỗ trợ hợp đồng hoán đổi vĩnh cửu ký quỹ USDT (USDT-margined perpetual swap) của OKX. Spot, Futures, Options và các loại công cụ khác chưa được hỗ trợ.
:::

---

## Đặt & Quản lý Lệnh

### `PlaceOrderAsync`
Đặt một lệnh giao dịch tiêu chuẩn mới (Limit, Market...).

**Cú pháp**

```csharp
Task<ApiResult<OrderPlaceResponse>> PlaceOrderAsync(string symbol, OrderSide side, OrderType type, decimal quantity, decimal? price = null, AttachedAlgoOrder? attachedAlgoOrder = null, bool? reduceOnly = null, string? tag = null, CancellationToken ct = default);
```

**Tham số**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Mã giao dịch (ví dụ `"BTC-USDT-SWAP"`). |
| `side` | `OrderSide` | Mua (`Buy`) hoặc Bán (`Sell`). |
| `type` | `OrderType` | Loại lệnh (`Limit`, `Market`...). |
| `quantity` | `decimal` | Khối lượng đặt lệnh. |
| `price` | `decimal?` | Mức giá đặt (bắt buộc đối với lệnh Limit). |
| `attachedAlgoOrder` | `AttachedAlgoOrder?` | Lệnh Algo TP/SL đính kèm tùy chọn. |
| `reduceOnly` | `bool?` | Nếu `true`, lệnh chỉ dùng để giảm vị thế. |
| `tag` | `string?` | Tag tùy chỉnh để nhận diện lệnh. |
| `ct` | `CancellationToken` | Token hủy tác vụ. |

**Giá trị trả về**

Đối tượng [`ApiResult`](../models.md#apiresult) bao bọc [`OrderPlaceResponse`](../models.md#orderplaceresponse) chứa Order ID.

**Ghi chú**

Khối lượng và giá được hệ thống tự động chuẩn hóa theo quy tắc sàn trước khi gửi đi.

**Ví dụ**

```csharp
var res = await Context.Trade.PlaceOrderAsync(
    "BTC-USDT-SWAP",
    OrderSide.Buy,
    OrderType.Market,
    quantity: 1.5m
);
if (res.Success)
{
    Context.Logger.LogInformation("Order", $"Đã đặt lệnh ID: {res.Data.OrderId}");
}
```

**Exchange API Mapping**

| **Endpoint** | [`POST /api/v5/trade/order`](https://www.okx.com/docs-v5/en/#order-book-trading-trade-place-order) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Trading.PlaceOrderAsync`](https://github.com/JKorf/OKX.Net) |

---

### `OrderCheckAsync`
Thực hiện kiểm tra tính hợp lệ và ký quỹ trước khi giao dịch mà không thực sự đặt lệnh.

**Cú pháp**

```csharp
Task<ApiResult<CheckOrderResponse>> OrderCheckAsync(string symbol, OrderSide side, OrderType type, decimal quantity, decimal? price = null, PositionSide? positionSide = null, TradeMode? tradeMode = null, decimal? takeProfitTriggerPrice = null, decimal? stopLossTriggerPrice = null, decimal? takeProfitOrderPrice = null, decimal? stopLossOrderPrice = null, TriggerPriceType? takeProfitTriggerPriceType = null, TriggerPriceType? stopLossTriggerPriceType = null, QuantityAsset? quantityAsset = null, bool? reduceOnly = null, CancellationToken ct = default);
```

**Ví dụ**

```csharp
var check = await Context.Trade.OrderCheckAsync(
    "BTC-USDT-SWAP",
    OrderSide.Buy,
    OrderType.Market,
    quantity: 1.5m
);
if (check.Success)
{
    Context.Logger.LogInformation("Pre-trade check hợp lệ, đủ ký quỹ");
}
```

---

### `AmendOrderAsync`
Sửa đổi thông số của một lệnh đang chờ khớp (thay đổi giá, khối lượng hoặc TP/SL).

**Cú pháp**

```csharp
Task<ApiResult<OrderAmendResponse>> AmendOrderAsync(string symbol, long? orderId = null, string? clientOrderId = null, string? requestId = null, bool? cancelOnFail = null, decimal? newQuantity = null, decimal? newPrice = null, decimal? newTriggerPrice = null, decimal? newTakeProfitTriggerPrice = null, decimal? newStopLossTriggerPrice = null, decimal? newTakeProfitOrderPrice = null, decimal? newStopLossOrderPrice = null, TriggerPriceType? newTakeProfitPriceTriggerType = null, TriggerPriceType? newStopLossPriceTriggerType = null, CancellationToken ct = default);
```

**Ví dụ**

```csharp
var res = await Context.Trade.AmendOrderAsync(
    "BTC-USDT-SWAP",
    orderId: 123456789L,
    newPrice: 65000m
);
```

---

### `CancelOrderAsync`
Hủy một lệnh đang chờ khớp cụ thể.

**Cú pháp**

```csharp
Task<ApiResult<OrderCancelResponse>> CancelOrderAsync(string symbol, long? orderId = null, string? origClientOrderId = null, CancellationToken ct = default);
```

**Ví dụ**

```csharp
var cancelRes = await Context.Trade.CancelOrderAsync("BTC-USDT-SWAP", orderId: 123456789L);
```

---

### `CancelMultipleOrdersAsync`
Hủy hàng loạt nhiều lệnh đang mở cùng một lúc.

**Cú pháp**

```csharp
Task<ApiResult<OrderCancelResponse[]>> CancelMultipleOrdersAsync(IEnumerable<OrderCancelRequest> orders, CancellationToken ct = default);
```

---

### `GetOrderAsync`
Lấy thông tin chi tiết trạng thái của một lệnh đơn lẻ.

**Cú pháp**

```csharp
Task<ApiResult<Order>> GetOrderAsync(string symbol, long? orderId = null, string? origClientOrderId = null, CancellationToken ct = default);
```

---

### `GetOrdersAsync`
Lấy danh sách tất cả các lệnh đang mở (chờ khớp hoặc khớp một phần).

**Cú pháp**

```csharp
Task<ApiResult<Order[]>> GetOrdersAsync(string? symbol = null, string? underlying = null, OrderType? orderType = null, OrderStatus? state = null, string? instrumentFamily = null, CancellationToken ct = default);
```

---

## Quản lý Vị thế (Positions)

### `GetPositionsAsync`
Lấy danh sách các vị thế đang mở hiện tại.

**Cú pháp**

```csharp
Task<ApiResult<Position[]>> GetPositionsAsync(string? symbol = null, string? positionId = null, CancellationToken ct = default);
```

**Ví dụ**

```csharp
var posRes = await Context.Trade.GetPositionsAsync("BTC-USDT-SWAP");
if (posRes.Success)
{
    foreach (var pos in posRes.Data)
    {
        Context.Logger.LogInformation("Pos", $"Side: {pos.PositionSide}, Size: {pos.PositionQuantity}, PnL: {pos.UnrealizedPnl}");
    }
}
```

---

### `ClosePositionAsync`
Đóng toàn bộ vị thế đang mở bằng lệnh Market.

**Cú pháp**

```csharp
Task<ApiResult<ClosePositionResponse>> ClosePositionAsync(string symbol, PositionSide? positionSide = null, string? asset = null, bool? autoCancel = null, string? clientOrderId = null, CancellationToken ct = default);
```

**Ví dụ**

```csharp
var closeRes = await Context.Trade.ClosePositionAsync("BTC-USDT-SWAP", PositionSide.Long);
```

---

## Lệnh Điều kiện Algo (Take Profit, Stop Loss, Trailing Stop)

### `PlaceAlgoOrderAsync`
Đặt lệnh Algo (Chốt lời, Cắt lỗ, Trailing Stop, Lệnh kích hoạt...).

**Cú pháp**

```csharp
Task<ApiResult<AlgoOrderResponse>> PlaceAlgoOrderAsync(string symbol, OrderSide orderSide, AlgoOrderType algoOrderType, decimal? quantity = null, bool? reduceOnly = null, PositionSide? positionSide = null, AlgoPriceType? tpTriggerPxType = null, decimal? tpTriggerPrice = null, decimal? tpOrderPrice = null, AlgoPriceType? slTriggerPxType = null, decimal? slTriggerPrice = null, decimal? slOrderPrice = null, decimal? closeFraction = null, bool? cancelOnClose = null, string? tag = null, CancellationToken ct = default);
```

**Ví dụ**

```csharp
var algoRes = await Context.Trade.PlaceAlgoOrderAsync(
    symbol: "BTC-USDT-SWAP",
    orderSide: OrderSide.Sell,
    algoOrderType: AlgoOrderType.TakeProfitStopLoss,
    quantity: 1.0m,
    tpTriggerPrice: 70000m,
    slTriggerPrice: 62000m
);
```

---

### `AmendAlgoOrderAsync`
Sửa đổi thông số lệnh Algo đang chờ kích hoạt.

```csharp
Task<ApiResult<AlgoOrderAmendResponse>> AmendAlgoOrderAsync(string symbol, string? algoId = null, string? clientAlgoId = null, string? requestId = null, bool? cancelOnFail = null, decimal? newQuantity = null, decimal? newTakeProfitTriggerPrice = null, decimal? newStopLossTriggerPrice = null, decimal? newTakeProfitOrderPrice = null, decimal? newStopLossOrderPrice = null, TriggerPriceType? newTakeProfitPriceTriggerType = null, TriggerPriceType? newStopLossPriceTriggerType = null, CancellationToken ct = default);
```

---

### `CancelAlgoOrderAsync`
Hủy một hoặc nhiều lệnh Algo.

```csharp
Task<ApiResult<AlgoOrderResponse>> CancelAlgoOrderAsync(IEnumerable<AlgoOrderRequest> orders, CancellationToken ct = default);
```

---

### `GetAlgoOrdersAsync`
Lấy danh sách các lệnh Algo đang chờ kích hoạt.

```csharp
Task<ApiResult<AlgoOrder[]>> GetAlgoOrdersAsync(AlgoOrderType algoOrderType, string? algoId = null, string? symbol = null, DateTime? startTime = null, DateTime? endTime = null, CancellationToken ct = default);
```

---

### `GetAlgoOrderAsync`
Lấy chi tiết một lệnh Algo cụ thể.

```csharp
Task<ApiResult<AlgoOrder>> GetAlgoOrderAsync(string? algoId = null, string? clientAlgoId = null, CancellationToken ct = default);
```

---

## Truy vấn Lịch sử (History & Archives)

### `GetHistoryOrdersAsync`
Lấy lịch sử các lệnh đã đóng hoặc đã hủy trong vòng 7 ngày gần nhất.

```csharp
Task<ApiResult<Order[]>> GetHistoryOrdersAsync(string? symbol = null, string? underlying = null, OrderType? orderType = null, OrderStatus? state = null, DateTime? startTime = null, DateTime? endTime = null, CancellationToken ct = default);
```

---

### `GetOrdersArchiveAsync`
Lấy lịch sử các lệnh đã đóng/hủy từ kho lưu trữ (dành cho khoảng thời gian trên 3 tháng).

```csharp
Task<ApiResult<Order[]>> GetOrdersArchiveAsync(string? symbol = null, string? underlying = null, OrderType? orderType = null, OrderStatus? state = null, DateTime? startTime = null, DateTime? endTime = null, CancellationToken ct = default);
```

---

### `GetClosePositionsAsync`
Lấy lịch sử các vị thế đã đóng (lên đến 3 tháng).

```csharp
Task<ApiResult<ClosingPosition[]>> GetClosePositionsAsync(string? symbol = null, MarginMode? marginMode = null, ClosingPositionType? type = null, string? positionId = null, DateTime? endTime = null, DateTime? startTime = null, CancellationToken ct = default);
```

---

### `GetUserTradesAsync`
Lấy lịch sử các giao dịch khớp lệnh thực tế (fills).

```csharp
Task<ApiResult<Transaction[]>> GetUserTradesAsync(string? symbol = null, string? underlying = null, long? orderId = null, DateTime? startTime = null, DateTime? endTime = null, CancellationToken ct = default);
```

---

### `GetUserTradesArchiveAsync`
Lấy lịch sử giao dịch khớp lệnh từ kho lưu trữ (archive).

```csharp
Task<ApiResult<Transaction[]>> GetUserTradesArchiveAsync(string? symbol = null, string? underlying = null, long? orderId = null, DateTime? startTime = null, DateTime? endTime = null, CancellationToken ct = default);
```

---

## Cấu hình Bổ sung (Configuration)

### `SetOrderSourceIdPrefix`
Thiết lập tiền tố nguồn định danh mặc định cho client order ID (`clOrdId`).

```csharp
(bool Success, string ErrorMsg) SetOrderSourceIdPrefix(string sourceIdPrefix);
```

---

### `DisableLogApiEndPoint`
Tắt ghi log chi tiết cho các endpoint API có tần suất gọi cao để tránh tràn log.

```csharp
void DisableLogApiEndPoint(IEnumerable<ApiName> apiNames);
```
