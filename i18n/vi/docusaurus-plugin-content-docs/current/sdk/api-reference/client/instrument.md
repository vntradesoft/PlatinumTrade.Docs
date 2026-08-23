---
id: sdk-instrument-client
title: Instrument API
sidebar_label: Instrument
sidebar_position: 1
---
# Instrument API
Instrument API (`Context.Instrument`) cung cấp dữ liệu giá thị trường, quy tắc giao dịch, kích thước tick, và các tiện ích mã giao dịch.

## Danh sách thuộc tính
| Thuộc tính | Mô tả |
|---|---|
| [InstrumentType](#instrumenttype) | Lấy loại sản phẩm giao dịch mà client này xử lý. |

## Danh sách hàm
| Hàm | Mô tả |
|---|---|
| [IsSymbol](#issymbol) | Kiểm tra xem mã giao dịch có hợp lệ và đang được theo dõi hay không. |
| [TotalSymbols](#totalsymbols) | Lấy tổng số mã giao dịch đang được bot theo dõi. |
| [QuoteAsset](#quoteasset) | Lấy tài sản định giá (quote asset) của mã giao dịch. |
| [BaseAsset](#baseasset) | Lấy tài sản cơ sở (base asset) của mã giao dịch. |
| [Underlying](#underlying) | Lấy tài sản cơ sở tham chiếu của hợp đồng phái sinh. |
| [GetLastPriceAsync](#getlastpriceasync) | Lấy giá khớp lệnh gần nhất của mã giao dịch. |
| [GetBidAskSpreadAsync](#getbidaskspreadasync) | Lấy giá mua, bán và khoảng chênh lệch (spread) trong cùng một lời gọi API. |
| [GetLimitPriceAsync](#getlimitpriceasync) | Lấy giới hạn giá cao nhất/thấp nhất được phép đặt lệnh cho mã giao dịch. |
| [NormalizePrice](#normalizeprice) | Chuẩn hóa một mức giá theo quy tắc làm tròn và tick size của sàn. |
| [NormalizeLot](#normalizelot) | Chuẩn hóa khối lượng (quantity) theo quy tắc của sàn. |
| [GetTickPrice](#gettickprice) | Lấy kích thước bước nhảy giá tối thiểu (tick size) cho mã giao dịch. |
| [GetFeeTaker](#getfeetaker) | Lấy tỷ lệ phí giao dịch Taker của mã giao dịch. |
| [GetMaintMarginRateAsync](#getmaintmarginrateasync) | Lấy tỷ lệ ký quỹ duy trì cho một quy mô vị thế nhất định. |
| [ContractSize](#contractsize) | Lấy kích thước hợp đồng cho mã giao dịch phái sinh. |
| [GetCurrentTime](#getcurrenttime) | Lấy thời gian hệ thống hiện tại từ góc độ của bộ máy bot. |

## `InstrumentType`
Lấy loại sản phẩm giao dịch mà client này xử lý.

**Cú pháp**

```csharp
InstrumentType InstrumentType { get; }
```

**Tham số**

Không có.

**Giá trị trả về**

Giá trị enum `InstrumentType` (ví dụ: Futures, Spot).

**Lưu ý**

Hữu ích khi sử dụng chung logic cho nhiều bot.

**Ví dụ**

```csharp
if (Context.Instrument.InstrumentType == InstrumentType.Spot)
{
    // Xử lý logic riêng cho Spot
}
```

## `TotalSymbols`
Lấy tổng số mã giao dịch đang được bot theo dõi.

**Cú pháp**

```csharp
int TotalSymbols();
```

**Tham số**

Không có.

**Giá trị trả về**

Số lượng các mã được theo dõi.

**Lưu ý**

Thường là 1 với bot giao dịch 1 cặp, và lớn hơn với bot đa cặp.

**Ví dụ**

```csharp
int count = Context.Instrument.TotalSymbols();
Context.Logger.LogInformation("Symbols", $"Đang theo dõi {count} mã");
```

## `BaseAsset`
Lấy tài sản cơ sở (base asset) của mã giao dịch.

**Cú pháp**

```csharp
string BaseAsset(string symbol);
```

**Tham số**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Mã giao dịch. |

**Giá trị trả về**

Chuỗi tên tài sản (ví dụ: "BTC").

**Lưu ý**

Với BTC-USDT, tài sản cơ sở là BTC.

**Ví dụ**

```csharp
string baseAsset = Context.Instrument.BaseAsset("BTC-USDT");
```

## `GetFeeTaker`
Lấy tỷ lệ phí giao dịch Taker của mã giao dịch.

**Cú pháp**

```csharp
decimal GetFeeTaker(string symbol);
```

**Tham số**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Mã giao dịch. |

**Giá trị trả về**

Tỷ lệ phí dưới dạng decimal (ví dụ: 0.001 tức 0.1%).

**Lưu ý**

Áp dụng khi lệnh của bạn khớp ngay lập tức vào sổ lệnh.

**Ví dụ**

```csharp
decimal feeRate = Context.Instrument.GetFeeTaker("BTC-USDT");
decimal totalFee = orderValue * feeRate;
```

## `ContractSize`
Lấy kích thước hợp đồng cho mã giao dịch phái sinh.

**Cú pháp**

```csharp
decimal ContractSize(string symbol);
```

**Tham số**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Mã giao dịch. |

**Giá trị trả về**

Kích thước hợp đồng.

**Lưu ý**

Dùng để nhân với số lượng nhằm tính ra giá trị thực tế.

**Ví dụ**

```csharp
decimal size = Context.Instrument.ContractSize("BTC-USDT-SWAP");
```

Interface `IInstrumentClient` cung cấp giá ticker thị trường, độ chênh lệch giá mua/bán (spread), giới hạn đòn bẩy tỷ lệ ký quỹ và các giới hạn giá.

## `GetLastPriceAsync`
Lấy giá khớp lệnh gần nhất của mã giao dịch.

**Cú pháp**

```csharp
Task<ApiResult<decimal>> GetLastPriceAsync(string symbol, CancellationToken ct = default);
```

**Tham số**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Mã giao dịch. |
| `ct` | `CancellationToken` | Token hủy tác vụ. |

**Giá trị trả về**

Đối tượng [`ApiResult`](../models.md#apiresult) chứa giá gần nhất.

**Lưu ý**

Sử dụng để đánh giá điều kiện thị trường hiện tại.

**Ví dụ**

```csharp
var priceRes = await Context.Instrument.GetLastPriceAsync("BTC-USDT");
if (priceRes.Success)
{
    decimal lastPrice = priceRes.Data;
}
```

## `GetLimitPriceAsync`
Lấy giới hạn giá cao nhất/thấp nhất được phép đặt lệnh cho mã giao dịch.

**Cú pháp**

```csharp
Task<ApiResult<LimitPrice>> GetLimitPriceAsync(string symbol, CancellationToken ct = default);
```

**Tham số**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Mã giao dịch. |
| `ct` | `CancellationToken` | Token hủy tác vụ. |

**Giá trị trả về**

Đối tượng [`ApiResult`](../models.md#apiresult) chứa dữ liệu `LimitPrice`.

**Lưu ý**

Sàn giao dịch thường giới hạn khoảng giá đặt lệnh so với giá đánh dấu (mark price).

**Ví dụ**

```csharp
var limits = await Context.Instrument.GetLimitPriceAsync("BTC-USDT");
if (limits.Success)
{
    decimal maxBuy = limits.Data.BuyLimit;
}
```

## `GetCurrentTime`
Lấy thời gian hệ thống hiện tại từ góc độ của bộ máy bot.

**Cú pháp**

```csharp
DateTime GetCurrentTime();
```

**Tham số**

Không có.

**Giá trị trả về**

Thời gian hệ thống (`DateTime`).

**Lưu ý**

Trong lúc backtest, hàm này trả về thời gian giả lập chứ không phải giờ thực của máy tính.

**Ví dụ**

```csharp
DateTime now = Context.Instrument.GetCurrentTime();
if (now.Hour == 14) { /* xử lý logic lúc 2 giờ chiều */ }
```

## `NormalizePrice`
Chuẩn hóa một mức giá theo quy tắc làm tròn và tick size của sàn.

**Cú pháp**

```csharp
decimal NormalizePrice(string symbol, decimal price, bool roundUp = false);
```

**Tham số**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Mã giao dịch. |
| `price` | `decimal` | Giá thô chưa chuẩn hóa. |
| `roundUp` | `bool` | True để làm tròn lên; false để làm tròn xuống. |

**Giá trị trả về**

Giá đã được chuẩn hóa.

**Lưu ý**

Luôn gọi hàm này trước khi đặt lệnh để tránh lỗi sai số thập phân.

**Ví dụ**

```csharp
decimal rawTarget = 65123.4567m;
decimal validPrice = Context.Instrument.NormalizePrice("BTC-USDT", rawTarget);
// validPrice có thể thành 65123.4m
```

## `GetTickPrice`
Lấy kích thước bước nhảy giá tối thiểu (tick size) cho mã giao dịch.

**Cú pháp**

```csharp
decimal GetTickPrice(string symbol);
```

**Tham số**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Mã giao dịch. |

**Giá trị trả về**

Giá trị tick size.

**Lưu ý**

Hữu ích khi bạn muốn tịnh tiến giá theo từng nấc hợp lệ.

**Ví dụ**

```csharp
decimal tick = Context.Instrument.GetTickPrice("BTC-USDT");
decimal nextPrice = currentPrice + tick;
```

