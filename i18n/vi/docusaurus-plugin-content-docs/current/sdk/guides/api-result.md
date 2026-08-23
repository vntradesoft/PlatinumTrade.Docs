---
sidebar_position: 6
id: sdk-api-result
title: Mẫu Thiết Kế ApiResult
description: Xử lý lỗi thống nhất không sử dụng exception
---

# Mẫu Thiết Kế ApiResult

`ApiResult` / `ApiResult<T>` là mẫu xử lý lỗi chính trong Pt.Okx.Sdk. Thay vì ném ra các exception cho các lỗi logic nghiệp vụ, SDK sử dụng một mẫu trả về kết quả rõ ràng (result pattern) để phía gọi có thể xử lý các trường hợp thất bại một cách minh bạch.

## Khi Nào Nên Dùng Cái Gì

| Tình huống | Nên Dùng |
|---|---|
| Gọi API thất bại (mất mạng, vượt hạn mức rate limit, không đủ số dư) | `ApiResult<T>` |
| Lỗi dữ liệu đầu vào không hợp lệ (sai mã cặp coin, sai số lượng) | `ApiResult<T>` |
| Lỗi lập trình (null reference, vượt quá chỉ mục mảng) | Exception |
| Lỗi cấu hình hệ thống (thiếu API key) | Exception |
| Lỗi hạ tầng nghiêm trọng | Exception |

> [!TIP]
> **Nguyên tắc ngón tay cái:** Nếu lỗi có thể dự đoán trước được và xảy ra trong luồng nghiệp vụ thông thường → dùng `ApiResult`. Nếu lỗi là lỗi mã nguồn (bug) hoặc sự cố hạ tầng hệ thống → ném ngoại lệ (throw exception).

## Cấu Trúc Phân Cấp Lớp

```csharp
// Non-generic: dùng cho các thao tác không cần trả về dữ liệu
public class ApiResult
{
    public bool Success { get; }
    public ApiError? Error { get; }

    // Tự động chuyển đổi kiểu bool ngầm định
    public static implicit operator bool(ApiResult result) => result.Success;
}

// Generic: dùng cho các thao tác có trả về dữ liệu cụ thể
public class ApiResult<T> : ApiResult
{
    public T Data { get; }
}
```

## Khởi Tạo Kết Quả

Sử dụng lớp tĩnh `ApiResultFactory`:

```csharp
// Thành công
var ok = ApiResultFactory.Ok(data);         // ApiResult<T>
var ok = ApiResultFactory.Ok();             // ApiResult (non-generic)

// Thất bại
var fail = ApiResultFactory.Fail<T>(error); // ApiResult<T>
var fail = ApiResultFactory.Fail(error);    // ApiResult (non-generic)
```

## Cách Sử Dụng Kết Quả

### Mẫu 1: GetResultOrError (Khuyên dùng)

```csharp
var result = await client.Trade.PlaceOrderAsync(
    "BTC-USDT", OrderSide.Buy, OrderType.Market, 0.01m);

if (result.GetResultOrError(out var order, out var error))
{
    // ✅ Thành công — biến order đảm bảo không bao giờ bị null
    logger.LogSuccess("Order Placed", "Mã lệnh: {Id}", order.OrderId);
}
else
{
    // ❌ Thất bại — biến error đảm bảo không bao giờ bị null
    logger.LogError(new Exception(error.Message), "Đặt lệnh thất bại",
        "[{Code}] {Msg}", error.Code, error.Message);
}
```

### Mẫu 2: Chuyển Đổi Bool Ngầm Định

```csharp
var result = await client.Account.LoadBalanceAsync();

if (result)
{
    var balance = result.Data;
}
else
{
    logger.LogWarning("Nạp số dư thất bại", result.Error!.Message);
}
```

### Mẫu 3: Phân Rã (Deconstruct)

```csharp
var (success, data, error) = await client.Trade.GetOrderAsync("BTC-USDT");

if (success)
    Console.WriteLine($"Mã lệnh: {data!.OrderId}");
else
    Console.WriteLine($"Lỗi: {error!.Message}");
```

### Mẫu 4: Map — Biến Đổi Kiểu Dữ Liệu

Chuyển đổi kiểu dữ liệu khi thành công và bảo toàn nguyên vẹn lỗi khi thất bại:

```csharp
ApiResult<OrderSummary> summary = result.Map(order => new OrderSummary
{
    Id = order.OrderId,
    Symbol = order.Symbol,
    Status = order.Status
});
```

### Mẫu 5: AsError — Truyền Tiếp Kiểu Lỗi

Sao chép lỗi sang một kiểu generic khác khi bạn chỉ muốn chuyển tiếp thất bại lên tầng trên:

```csharp
public async Task<ApiResult<Position>> OpenPosition(...)
{
    var orderResult = await client.Trade.PlaceOrderAsync(...);

    if (!orderResult)
        return orderResult.AsError<Position>();

    // ... tiếp tục xử lý logic vị thế
    return ApiResultFactory.Ok(position);
}
```

## ApiError

`ApiError` chứa thông tin chi tiết về nguyên nhân thất bại:

```csharp
public class ApiError
{
    public string Message { get; }           // Thông điệp dễ đọc cho người dùng
    public string? Code { get; }             // Mã lỗi từ sàn OKX (ví dụ: "50001")
    public HttpStatusCode? HttpStatusCode { get; }  // Mã trạng thái HTTP
    public ApiErrorType ErrorType { get; }   // Danh mục phân loại lỗi
}
```

### Các Loại Lỗi (ApiErrorType)

| ApiErrorType | Mô tả |
|---|---|
| `Unknown` | Lỗi chưa phân loại |
| `Network` | Lỗi mạng (timeout, từ chối kết nối) |
| `RateLimit` | Bị sàn OKX giới hạn tần suất gọi API |
| `Authentication` | Sai API key / secret / passphrase |
| `InsufficientBalance` | Không đủ số dư tài khoản |
| `InvalidParameter` | Tham số truyền vào không hợp lệ |
| `OrderNotFound` | Lệnh không tồn tại trên hệ thống |
| `Exchange` | Lỗi phát sinh từ phía máy chủ sàn giao dịch |

## Thực Hành Tốt Nhất (Best Practices)

> [!WARNING]
> **Tuyệt đối không ghi thông tin nhạy cảm** vào thông điệp log. `ApiError` có thể chứa mã lỗi OKX nhưng **không bao giờ** được chứa API key, secret hoặc passphrase.

1. **Luôn kiểm tra kết quả** trước khi truy cập vào thuộc tính `.Data`.
2. **Ưu tiên sử dụng `GetResultOrError`** thay vì kiểm tra `.Success` rồi gọi `.Data`.
3. **Nối chuỗi xử lý** bằng hàm `Map` thay vì khai báo nhiều biến tạm.
4. **Lan truyền lỗi** với `AsError<T>()` thay vì khởi tạo lại một đối tượng `ApiError` mới khi chuyển tiếp lỗi.

## Xem Thêm

- [ApiResult](xref:Pt.Okx.Sdk.Common.ApiResult) Tài Liệu API
- [ApiError](xref:Pt.Okx.Sdk.Common.ApiError) Tài Liệu API
- [Sử Dụng Trading Client](trading-client.md) — Các ví dụ thực tế kết hợp với ApiResult
