---
id: products-gui-strategy-config
title: Cấu Hình Chiến Thuật
sidebar_position: 8
description: Tải và cấu hình các plugin chiến thuật tùy chỉnh trong GUI
---

# Cấu Hình Chiến Thuật

Bảng điều khiển **Cấu Hình Chiến Thuật (Strategy Config)** cho phép bạn tải các plugin chiến thuật đã biên dịch (`.dll`), điều chỉnh các tham số giao dịch, và chạy mô phỏng (Backtest) hoặc thực thi lệnh trên OKX (Giao dịch Thực tế / Mô phỏng - Live/Paper Trading).

---

## 1. Thiết Lập Chiến Thuật

Để cấu hình và khởi chạy một chiến thuật tùy chỉnh:

1. Mở một tab **Strategy Workspace** trong giao diện chính.
2. Trong tab **Settings**, tìm trường **Strategy File**.
3. Nhấp vào nút duyệt (**`...`**) bên cạnh hộp văn bản và chọn tệp DLL plugin chiến thuật đã biên dịch của bạn (ví dụ: `MyStrategyPlugin.dll`).
4. Sau khi tải lên, ứng dụng sẽ xác thực thư viện và tự động điền các thông tin chi tiết. Nếu plugin đó có khai báo các tham số tùy chỉnh, chúng sẽ xuất hiện dưới tab **Input Parameters**.

---

## 2. Các Tham Số Cấu Hình

### Tab Settings (Cài đặt chung)

- **Mode (Chế độ):** Chọn **Live Trading** (Giao dịch Thực tế / Demo) hoặc **Backtest** (Mô phỏng lịch sử).
- **Strategy File (Tệp Chiến thuật):** Đường dẫn đến tệp `.dll` plugin chiến thuật của bạn. Nhấp vào biểu tượng thông tin (**ℹ️**) để xem siêu dữ liệu như Tên, Phiên bản, Tác giả và Khả năng tương thích SDK.
- **Symbol & Timeframe (Mã & Khung thời gian):** Chọn cặp giao dịch OKX (ví dụ: `BTC-USDT-SWAP`) và khoảng biểu đồ (ví dụ: `1m`, `5m`, `1h`).
- **Date Range (Chỉ dành cho Backtest):** Xác định ngày bắt đầu và ngày kết thúc cho luồng dữ liệu mô phỏng.
- **Price Data Type (Chỉ dành cho Backtest):** Chọn giữa mô phỏng giá theo từng tick (*Every Tick*) hoặc theo giá đóng/mở cửa (*Bar OHLC*).
- **Deposit & Leverage (Chỉ dành cho Backtest):** Đặt số vốn ảo ban đầu và đòn bẩy cho quá trình backtest.
- **Leverage (Chỉ dành cho Live Trading):** Chọn hệ số nhân đòn bẩy cho các giao dịch thực tế/mô phỏng.
- **Telegram Bot (Chỉ dành cho Live Trading):** Gắn một Bot Telegram đã đăng ký để nhận thông tin cập nhật trạng thái tự động và cảnh báo thực thi lệnh.
- **OKX Account (Chỉ dành cho Live Trading):** Chọn cấu hình tài khoản API sẽ sử dụng để đặt lệnh.
- **Include Funding Fee (Chỉ dành cho Backtest):** Bật/tắt việc tính phí tài trợ (funding fee) hợp đồng vĩnh cửu trong quá trình mô phỏng.

### Tab Input Parameters (Tham số đầu vào)

Tab này tự động đọc sơ đồ tham số đầu vào được khai báo bên trong plugin chiến thuật của bạn (sử dụng các thuộc tính `[InputParam]` trong code C#):
- Điều chỉnh các khoảng chu kỳ, ngưỡng kích hoạt, danh sách mã trắng hoặc đường dẫn tệp.
- Nhấp chuột phải vào tab để **Export Input Parameters** (Xuất tham số) ra tệp JSON hoặc **Import Input Parameters** (Nhập tham số) từ cấu hình đã lưu trước đó.

---

## 3. Khởi Chạy Chiến Thuật

Sau khi tất cả các cài đặt và tham số đầu vào đã được cấu hình xong:
- Nhấp vào nút **Start Trading** (hoặc **Start Backtest**) ở góc dưới cùng bên phải.
- Theo dõi các bản ghi nhật ký (logs) ở bảng điều khiển đầu ra và biểu đồ thời gian thực trên dashboard để giám sát quá trình thực thi.
