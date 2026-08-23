---
id: index
title: Storage API
sidebar_position: 3
description: Storage API cung cấp khả năng truy cập vào cấu trúc thư mục lưu trữ tại thời gian chạy, cho phép các chiến lược và thành phần hệ thống định vị và quản lý dữ liệu.
status: stable
visibility: public
sidebar_label: Lưu Trữ (Storage)
---

# Storage API

**Storage API** (API Lưu trữ) cung cấp một hệ thống tập trung để phân giải các đường dẫn logic thành các thư mục vật lý, dành cho các loại dữ liệu thời gian chạy (runtime) và dữ liệu cố định như: dữ liệu lịch sử (histories), nhật ký (logs), trạng thái (state) và bộ nhớ tạm (caches). Bằng cách trừu tượng hóa các đường dẫn theo phạm vi (scope) logic, Storage API đảm bảo chiến lược và ứng dụng của bạn luôn đọc/ghi file vào đúng môi trường.

## GetPath
Lấy đường dẫn lưu trữ dựa trên phạm vi (scope) logic.

**Cú pháp**

```csharp
void GetPath(Kiểu dữ liệu Tham số, StoragePathScope scope);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `scope` | [`StoragePathScope`](../enums.md#storagepathscope) | Phạm vi logic mục tiêu. Nếu bỏ trống, phương thức sẽ trả về thư mục gốc của dữ liệu thời gian chạy. |

**Giá trị trả về**

void

**Lưu ý**

Đây là phương thức chính được sử dụng để phân giải đường dẫn một cách động. Framework sẽ tự động chuyển hướng yêu cầu tới các phương thức truy cập nhanh (shortcut methods) tương ứng dựa trên scope được cung cấp.

**Ví dụ**

```csharp
string cacheFolder = Storage.GetPath(StoragePathScope.Cache);
string tempFile = Path.Combine(cacheFolder, "temp.json");
```

---

## GetRuntimeDataRoot
Lấy thư mục gốc được sử dụng cho tất cả dữ liệu thời gian chạy.

**Cú pháp**

```csharp
void GetRuntimeDataRoot();
```

**Tham số**

*(Không có)*

**Giá trị trả về**

void

**Lưu ý**

Tất cả các phạm vi lưu trữ khác (như Logs, Cache, Histories) thường được tạo dưới dạng thư mục con bên trong thư mục gốc này.

**Ví dụ**

```csharp
string root = Storage.GetRuntimeDataRoot();
// VD: "C:\Users\admin\AppData\Local\PlatinumTrade"
```

---

## GetHistoryRoot
Lấy thư mục gốc chứa dữ liệu lịch sử (history).

**Cú pháp**

```csharp
void GetHistoryRoot();
```

**Tham số**

*(Không có)*

**Giá trị trả về**

void

**Lưu ý**

Sử dụng thư mục này để tải hoặc lưu các file dữ liệu thị trường lịch sử (ví dụ: file CSV hoặc file định dạng nhị phân tùy chỉnh dùng cho backtest).

**Ví dụ**

```csharp
string historyFolder = Storage.GetHistoryRoot();
string btcData = Path.Combine(historyFolder, "BTC_USDT_1h.csv");
```

---

## GetLogsRoot
Lấy thư mục gốc chứa nhật ký (logs) của ứng dụng thời gian chạy.

**Cú pháp**

```csharp
void GetLogsRoot();
```

**Tham số**

*(Không có)*

**Giá trị trả về**

void

**Lưu ý**

Đường dẫn này dành riêng cho các log cốt lõi của ứng dụng (chẳng hạn như các file chuẩn đoán của Serilog). Nó không dành cho các log giao dịch riêng biệt của từng chiến lược hay theo từng chế độ (backtest/live).

**Ví dụ**

```csharp
var path = Context.Storage.GetLogsRoot();
Context.Logger.LogInformation("Storage", $"Path: {path}");
```

---

## GetStateRoot
Lấy thư mục gốc lưu trữ trạng thái (state).

**Cú pháp**

```csharp
void GetStateRoot();
```

**Tham số**

*(Không có)*

**Giá trị trả về**

void

**Lưu ý**

Lý tưởng để lưu giữ (persist) trạng thái nội bộ của chiến lược, trạng thái của các chỉ báo (indicators) tùy chỉnh, hoặc các biến theo dõi (tracking variables) cần giữ lại giữa các lần khởi động lại.

**Ví dụ**

```csharp
var path = Context.Storage.GetStateRoot();
Context.Logger.LogInformation("Storage", $"Path: {path}");
```

---

## GetCacheRoot
Lấy thư mục gốc chứa bộ nhớ tạm (cache).

**Cú pháp**

```csharp
void GetCacheRoot();
```

**Tham số**

*(Không có)*

**Giá trị trả về**

void

**Lưu ý**

Sử dụng thư mục này cho các dữ liệu tạm thời, không quan trọng, có thể bị xóa hoặc tạo lại một cách an toàn nếu bị mất.

**Ví dụ**

```csharp
var path = Context.Storage.GetCacheRoot();
Context.Logger.LogInformation("Storage", $"Path: {path}");
```

---

## GetExportsRoot
Lấy thư mục gốc lưu trữ các kết xuất (exports) kết quả.

**Cú pháp**

```csharp
void GetExportsRoot();
```

**Tham số**

*(Không có)*

**Giá trị trả về**

void

**Lưu ý**

Sử dụng thư mục này để lưu các kết quả xuất ra cho người dùng, chẳng hạn như báo cáo giao dịch CSV, hình ảnh biểu đồ được tạo, hoặc các tệp Excel.

**Ví dụ**

```csharp
var path = Context.Storage.GetExportsRoot();
Context.Logger.LogInformation("Storage", $"Path: {path}");
```

---

## Tùy chỉnh Cấu trúc Lưu trữ

Nếu môi trường của bạn yêu cầu một cấu trúc thư mục chuyên biệt, bạn có thể tùy chỉnh cấu trúc lưu trữ bằng cách tạo một provider riêng kế thừa từ `StoragePathProviderBase`.

```csharp
public class MyCustomStorageProvider : StoragePathProviderBase
{
    public override string GetRuntimeDataRoot()
    {
        return "/var/data/platinumtrade"; // Đường dẫn tùy chỉnh của bạn
    }
}
```

Đăng ký provider trong DI (Dependency Injection):

```csharp
services.UseStoragePathProvider<MyCustomStorageProvider>();
```
