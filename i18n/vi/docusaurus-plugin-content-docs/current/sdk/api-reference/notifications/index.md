---
id: index
title: Notifications API
sidebar_position: 1
description: Notifications API cho phép bạn gửi cảnh báo, thông báo đẩy (push notifications) và email.
status: stable
visibility: public
sidebar_label: Thông Báo (Notifications)
---

# Notifications API

**Notifications API** (API Thông báo) cho phép các chiến lược của bạn đẩy các cảnh báo đến người dùng thông qua giao diện pop-up, Email, hoặc Telegram/Thông báo đẩy. Bạn có thể truy cập các phương thức này qua thuộc tính `Logger` trong chiến lược của mình, thuộc tính này sẽ tự động định tuyến thông báo đến các kênh đang hoạt động.

## NotifyTrace
Gửi một thông báo theo dõi (trace) bao gồm tin nhắn và cấp độ log cụ thể.

**Cú pháp**

```csharp
void NotifyTrace(Kiểu dữ liệu Tham số, string title, string message, PtLogLevel level);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `title` | `string` | Tiêu đề của thông báo. |
| `message` | `string` | Nội dung tin nhắn theo dõi. |
| `level` | [`PtLogLevel`](../enums.md#ptloglevel) | Cấp độ log (mặc định: Information). |

**Giá trị trả về**

void

**Lưu ý**

Phương thức này rất hữu ích để gửi các cảnh báo văn bản ngắn gọn tới người dùng, chẳng hạn như thông báo cho họ về một điều kiện thị trường vừa được đáp ứng, hoặc một cột mốc trong chiến lược.

**Ví dụ**

```csharp
Logger.NotifyTrace("Cảnh báo Thị trường", "Giá Bitcoin vừa vượt lên trên đường SMA 200.", PtLogLevel.Information);
```

---

## NotifyKeyValue
Gửi một thông báo có cấu trúc chứa các cặp khóa-giá trị (key-value).

**Cú pháp**

```csharp
void NotifyKeyValue(Kiểu dữ liệu Tham số, string title, (string, string)[] data);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `title` | `string` | Tiêu đề của thông báo. |
| `data` | `(string, string)[]` | Các cặp khóa-giá trị cần thông báo. |

**Giá trị trả về**

void

**Lưu ý**

Định dạng khóa-giá trị cung cấp một cách trình bày rõ ràng, theo dạng bảng trên Telegram hoặc thông báo giao diện UI, khiến nó trở nên lý tưởng cho các bản tóm tắt khớp lệnh giao dịch hoặc báo cáo chỉ số (metrics).

**Ví dụ**

```csharp
Logger.NotifyKeyValue("Đã đóng giao dịch",
    ("Symbol", "BTC-USDT"),
    ("PnL", "$150.00"),
    ("Lý do", "Chạm mức chốt lời (Take Profit)"));
```

---

## NotifyDocument
Gửi một thông báo kèm theo tệp đính kèm.

**Cú pháp**

```csharp
void NotifyDocument(Kiểu dữ liệu Tham số, string title, string filePath);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `title` | `string` | Tiêu đề của thông báo. |
| `filePath` | `string` | Đường dẫn đến tệp tài liệu trên ổ đĩa. |

**Giá trị trả về**

void

**Lưu ý**

Phương thức này chủ yếu được sử dụng để gửi các báo cáo tự động tạo, dữ liệu xuất CSV, hoặc ảnh chụp biểu đồ trực tiếp đến Telegram hoặc email của người dùng. Hãy đảm bảo rằng đường dẫn tệp tin có thể truy cập được bởi tiến trình host (host process).

**Ví dụ**

```csharp
string reportPath = Path.Combine(Storage.GetExportsRoot(), "monthly_report.csv");
Logger.NotifyDocument("Báo cáo Chiến lược Hàng tháng", reportPath);
```

---

## NotifyError
Gửi một thông báo cảnh báo lỗi chứa thông tin chi tiết về ngoại lệ (Exception).

**Cú pháp**

```csharp
void NotifyError(Kiểu dữ liệu Tham số, string title, Exception ex);
```

**Tham số**

| Tham số | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `title` | `string` | Tiêu đề của thông báo lỗi. |
| `ex` | `Exception` | Đối tượng ngoại lệ (Exception) cần thông báo. |

**Giá trị trả về**

void

**Lưu ý**

Hãy sử dụng phương thức này khi một lỗi nghiêm trọng xảy ra trong chiến lược của bạn (ví dụ: ngắt kết nối API, dữ liệu bị hỏng) và người dùng cần được thông báo ngay lập tức. Cảnh báo này thường được định tuyến (routed) dưới dạng tin nhắn có mức độ ưu tiên cao.

**Ví dụ**

```csharp
try
{
    // Logic tùy chỉnh có khả năng phát sinh lỗi
    ProcessExternalData();
}
catch (Exception ex)
{
    Logger.NotifyError("Lỗi Xử lý Dữ liệu", ex);
}
```

---
