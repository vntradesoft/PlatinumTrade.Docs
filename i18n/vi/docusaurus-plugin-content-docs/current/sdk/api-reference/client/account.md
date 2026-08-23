---
id: sdk-account-client
title: Account API
sidebar_label: Account
sidebar_position: 2
---

# Account API

Account API (`Context.Account`) cung cấp các phương thức và thuộc tính để truy xuất số dư, quản lý rủi ro ký quỹ và cấu hình chế độ giao dịch.

Interface `IAccountClient` cung cấp quyền truy cập vào:

- Thông tin số dư và vốn tài khoản (Equity, Wallet, Available, PnL)
- Cấu hình đòn bẩy giao dịch
- Chế độ vị thế (Hedge Mode vs Netting Mode)
- Cấu trúc phí và cấp độ VIP

:::info[Lưu ý]
Hiện tại, chỉ hỗ trợ tài khoản hợp đồng hoán đổi vĩnh cửu ký quỹ USDT (USDT-margined perpetual swap) của OKX. Spot, Futures, Options và các loại công cụ khác chưa được hỗ trợ.
:::

---

## Số dư & Tài sản (Balances & Assets)

### `WalletBalance`
Lấy tổng số dư ví, không bao gồm lợi nhuận và thua lỗ chưa chốt (Unrealized PnL).

**Cú pháp**

```csharp
decimal WalletBalance { get; }
```

**Tham số**

Không có.

**Giá trị trả về**

Tổng số dư ví dạng `decimal`.

**Ghi chú**

Đây là số dư thực tế không tính biến động PnL của các lệnh đang mở. Dùng để xem vốn gốc cơ sở.

**Ví dụ**

```csharp
decimal walletBalance = Context.Account.WalletBalance;
Context.Logger.LogInformation("Balance", $"Số dư ví: {walletBalance}");
```

---

### `AvailableBalance`
Lấy số dư khả dụng để mở thêm vị thế mới.

**Cú pháp**

```csharp
decimal AvailableBalance { get; }
```

**Tham số**

Không có.

**Giá trị trả về**

Số dư khả dụng dạng `decimal`.

**Ghi chú**

Số dư này đã trừ đi phần ký quỹ được phân bổ cho các vị thế đang mở.

**Ví dụ**

```csharp
decimal available = Context.Account.AvailableBalance;
if (available > 1000m)
{
    // Đủ ký quỹ để mở thêm vị thế mới
}
```

---

### `Equity`
Lấy giá trị vốn tài khoản hiện tại, bao gồm cả lợi nhuận và thua lỗ chưa chốt.

**Cú pháp**

```csharp
decimal Equity { get; }
```

**Tham số**

Không có.

**Giá trị trả về**

Tổng vốn tài khoản dạng `decimal`.

**Ghi chú**

Equity = `WalletBalance + UnrealizedPnL`. Đây là tổng giá trị thực tế của tài khoản theo thời gian thực.

**Ví dụ**

```csharp
decimal equity = Context.Account.Equity;
decimal pnl = Context.Account.Equity - Context.Account.WalletBalance;
```

---

### `UnrealizedPnL`
Lấy tổng lợi nhuận/thua lỗ chưa chốt của tất cả các vị thế đang mở.

**Cú pháp**

```csharp
decimal UnrealizedPnL { get; }
```

**Tham số**

Không có.

**Giá trị trả về**

Tổng PnL chưa chốt dạng `decimal`.

**Ghi chú**

Giá trị này thay đổi liên tục theo biến động giá thị trường của các vị thế đang nắm giữ.

**Ví dụ**

```csharp
decimal unrealizedPnL = Context.Account.UnrealizedPnL;
if (unrealizedPnL > 0)
{
    Context.Logger.LogInformation("Profit", $"Đang lãi: {unrealizedPnL}");
}
```

---

### `InitialMargin`
Lấy tổng số ký quỹ ban đầu đang được sử dụng.

**Cú pháp**

```csharp
decimal InitialMargin { get; }
```

**Tham số**

Không có.

**Giá trị trả về**

Tổng ký quỹ ban đầu dạng `decimal`.

**Ghi chú**

Mức ký quỹ tối thiểu cần thiết để duy trì các vị thế mở. Vị thế có thể bị thanh lý nếu Equity giảm xuống dưới mức ký quỹ duy trì (Maintenance Margin).

**Ví dụ**

```csharp
decimal initialMargin = Context.Account.InitialMargin;
decimal marginUsagePercent = (initialMargin / Context.Account.Equity) * 100;
```

---

### `MarginRatio`
Lấy tỷ lệ ký quỹ hiện tại của tài khoản.

**Cú pháp**

```csharp
decimal MarginRatio { get; }
```

**Tham số**

Không có.

**Giá trị trả về**

Tỷ lệ ký quỹ dạng `decimal`.

**Ghi chú**

Vị thế có thể bị thanh lý nếu tỷ lệ này chạm ngưỡng thanh lý của sàn giao dịch.

**Ví dụ**

```csharp
decimal ratio = Context.Account.MarginRatio;
if (ratio > 0.8m)
{
    Context.Logger.LogWarning("Liquidation Risk", "Tỷ lệ ký quỹ vượt quá 80%!");
}
```

---

### `GetBalanceUsdtAsync`
Truy xuất thông tin số dư tài khoản USDT mới nhất từ sàn giao dịch.

**Cú pháp**

```csharp
Task<ApiResult<AccountBalance>> GetBalanceUsdtAsync(CancellationToken ct = default);
```

**Tham số**

| Parameter | Type | Description |
|---|---|---|
| `ct` | `CancellationToken` | Token hủy tác vụ. |

**Giá trị trả về**

Đối tượng [`ApiResult`](../models.md#apiresult) bao bọc [`AccountBalance`](../models.md#accountbalance).

**Ghi chú**

Gọi hàm này khi bạn cần làm mới cưỡng bức số dư từ máy chủ.

**Ví dụ**

```csharp
var balanceRes = await Context.Account.GetBalanceUsdtAsync();
if (balanceRes.Success)
{
    var balance = balanceRes.Data;
    Context.Logger.LogInformation("Balance", $"Khả dụng: {balance.Available}, Vốn: {balance.Equity}");
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/account/balance`](https://www.okx.com/docs-v5/en/#trading-account-api-get-balance) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Account.GetAccountBalanceAsync`](https://github.com/JKorf/OKX.Net) |

---

## Cấu hình Giao dịch (Trading Configuration)

### `GetLeverage`
Lấy mức đòn bẩy đã được cấu hình cho mã giao dịch chỉ định.

**Cú pháp**

```csharp
decimal GetLeverage(string symbol);
```

**Tham số**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Mã giao dịch. |

**Giá trị trả về**

Mức đòn bẩy dạng `decimal`.

**Ví dụ**

```csharp
decimal leverage = Context.Account.GetLeverage("BTC-USDT-SWAP");
Context.Logger.LogInformation("Leverage", $"Đòn bẩy hiện tại: {leverage}x");
```

---

### `SetInitialLeverageAsync`
Cài đặt mức đòn bẩy cho mã giao dịch chỉ định.

**Cú pháp**

```csharp
Task<bool> SetInitialLeverageAsync(string symbol, int leverage, CancellationToken ct = default);
```

**Tham số**

| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Mã giao dịch. |
| `leverage` | `int` | Mức đòn bẩy cần đặt (ví dụ: 10, 20). |
| `ct` | `CancellationToken` | Token hủy tác vụ. |

**Giá trị trả về**

`true` nếu thành công; ngược lại `false`.

**Ghi chú**

Thay đổi đòn bẩy khi đang có vị thế mở có thể làm thay đổi giá thanh lý và yêu cầu ký quỹ.

**Ví dụ**

```csharp
bool success = await Context.Account.SetInitialLeverageAsync("BTC-USDT-SWAP", 10);
if (success)
{
    Context.Logger.LogInformation("Leverage", "Cập nhật đòn bẩy thành 10x thành công.");
}
```

**Exchange API Mapping**

| **Endpoint** | [`POST /api/v5/account/set-leverage`](https://www.okx.com/docs-v5/en/#trading-account-api-set-leverage) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Account.SetLeverageAsync`](https://github.com/JKorf/OKX.Net) |

---

### `IsHedgeMode`
Kiểm tra xem tài khoản có đang hoạt động ở chế độ Hedge Mode (hai chiều độc lập) hay không.

**Cú pháp**

```csharp
bool IsHedgeMode { get; }
```

**Tham số**

Không có.

**Giá trị trả về**

`true` nếu ở chế độ Hedge Mode; `false` nếu ở chế độ Netting Mode.

**Ghi chú**

- **Hedge Mode**: Cho phép mở độc lập vị thế Long và Short cùng lúc trên cùng 1 symbol.
- **Netting Mode**: Gộp các lệnh Long và Short lại thành một vị thế ròng duy nhất.

**Ví dụ**

```csharp
if (Context.Account.IsHedgeMode)
{
    Context.Logger.LogInformation("Mode", "Đang ở chế độ Hedge Mode");
}
```

---

### `SetHedgeModeAsync`
Cài đặt chế độ vị thế cho tài khoản.

**Cú pháp**

```csharp
Task<(bool Success, string? Error)> SetHedgeModeAsync(bool hedge, CancellationToken ct = default);
```

**Tham số**

| Parameter | Type | Description |
|---|---|---|
| `hedge` | `bool` | `true` cho Hedge Mode; `false` cho Netting Mode. |
| `ct` | `CancellationToken` | Token hủy tác vụ. |

**Giá trị trả về**

Một tuple bao gồm:
- `Success`: `true` nếu chuyển chế độ thành công; ngược lại `false`.
- `Error`: Chuỗi thông báo lỗi nếu thất bại.

**Ghi chú**

Không thể thay đổi chế độ vị thế khi đang có vị thế mở hoặc lệnh chờ.

**Ví dụ**

```csharp
var (success, error) = await Context.Account.SetHedgeModeAsync(true);
if (success)
{
    Context.Logger.LogInformation("Mode", "Đã chuyển sang Hedge Mode");
}
else
{
    Context.Logger.LogError(null, $"Lỗi chuyển chế độ: {error}");
}
```

**Exchange API Mapping**

| **Endpoint** | [`POST /api/v5/account/set-position-mode`](https://www.okx.com/docs-v5/en/#trading-account-api-set-position-mode) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Account.SetPositionModeAsync`](https://github.com/JKorf/OKX.Net) |

---

### `GetFeeLevelAsync`
Lấy cấp độ phí VIP hiện tại của tài khoản.

**Cú pháp**

```csharp
Task<ApiResult<FeeVipLevel>> GetFeeLevelAsync();
```

**Tham số**

Không có.

**Giá trị trả về**

Đối tượng [`ApiResult`](../models.md#apiresult) bao bọc giá trị enum [`FeeVipLevel`](../enums.md#feeviplevel).

**Ví dụ**

```csharp
var feeRes = await Context.Account.GetFeeLevelAsync();
if (feeRes.Success)
{
    FeeVipLevel vipLevel = feeRes.Data;
    Context.Logger.LogInformation("Fee", $"Cấp độ VIP hiện tại: {vipLevel}");
}
```

**Exchange API Mapping**

| **Endpoint** | [`GET /api/v5/account/config`](https://www.okx.com/docs-v5/en/#trading-account-api-get-account-configuration) |
| :--- | :--- |
| **OKX.Net** | [`UnifiedApi.Account.GetAccountConfigurationAsync`](https://github.com/JKorf/OKX.Net) |
