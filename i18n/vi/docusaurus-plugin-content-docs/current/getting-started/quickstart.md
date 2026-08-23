---
id: getting-started-quickstart
title: Khởi đầu nhanh
description: Cách nhanh nhất để cài đặt ứng dụng GUI, cấu hình API và sử dụng các tính năng Trading View, Backtest, Live Trade
---

# Khởi đầu nhanh

Hướng dẫn khởi đầu nhanh này cung cấp lộ trình thực tế ngắn nhất để cài đặt ứng dụng và sử dụng các chức năng cốt lõi: Trading View, Backtest và Giao dịch thực tế (Live Trade).

## 1. Tải về Platinum Trade

Tải xuống gói phát hành mới nhất từ [GitHub Releases](https://github.com/vntradesoft/PlatinumTrade.App/releases).

## 2. Cài đặt Ứng dụng & Thiết lập ban đầu

1. **Cài đặt Runtime**: Đảm bảo hệ thống của bạn đã cài đặt **.NET 10 Runtime**.
2. **Cài đặt Ứng dụng GUI**: Chạy trình cài đặt đã tải xuống và làm theo hướng dẫn trên màn hình để hoàn tất cài đặt.
3. **Khởi chạy**: Mở ứng dụng Platinum Trade từ Start Menu hoặc phím tắt trên Desktop.
4. **Cấu hình API**:
   - Truy cập **Tools** -> **Options** từ menu trên cùng.
   - Di chuyển tới phần **API Settings**, nhập API Key, Secret, Passphrase của tài khoản OKX và chọn môi trường (**Production** hoặc **Demo**).
   - Nhấn **Test Connection** để kiểm tra trạng thái kết nối, sau đó nhấn **Save** để lưu cấu hình.

## 3. Sử dụng Trading View & Biểu đồ

Giao diện chính được thiết kế để xem dữ liệu thị trường thời gian thực và thực hiện phân tích kỹ thuật.

![Giao diện chính Trading View](/img/overview/dashboard.png)

- **Market Watch**: Nằm ở bảng điều khiển bên trái. Tìm kiếm các cặp giao dịch mục tiêu của bạn (ví dụ: `BTC-USDT-SWAP`) và nhấp đúp để mở biểu đồ.
- **Khung thời gian & Loại biểu đồ**: Sử dụng thanh công cụ phía trên để chuyển đổi giữa các khung thời gian (ví dụ: 1m, 5m, 1h, 1d) và loại biểu đồ (Nến, Thanh, Đường).
- **Chỉ báo (Indicators)**: Nhấp vào biểu tượng **Indicators** trên thanh công cụ để thêm các chỉ báo có sẵn hoặc tải lên các plugin chỉ báo tùy chỉnh.
- **Công cụ vẽ**: Sử dụng thanh công cụ vẽ để đặt các đường xu hướng (Trend lines), đường ngang/dọc (Horizontal/Vertical lines), Fibonacci thoái lui và các hình vẽ khác trên biểu đồ đang hoạt động.

## 4. Kiểm tra chiến lược (Backtest)

Thử nghiệm các chiến lược giao dịch tùy chỉnh trên dữ liệu lịch sử trước khi đưa vào chạy thực tế.

<div style={{ display: 'flex', gap: '10px' }}>
  <div style={{ flex: 1 }}>
    ![Cấu hình Backtest](/img/overview/backtest1.png)
  </div>
  <div style={{ flex: 1 }}>
    ![Mô phỏng Backtest](/img/overview/backtest.png)
  </div>
</div>

1. **Dữ liệu lịch sử**: Mở **History Manager** để tải xuống hoặc nhập dữ liệu nến lịch sử. Khuyến nghị sử dụng định dạng `.bin` (Binary) để tối ưu hóa tốc độ đọc.
2. **Mở hộp thoại Backtest**: Truy cập **Tools** -> **Backtest Engine** hoặc nhấp vào biểu tượng Backtest.
3. **Chọn chiến lược**: Tải lên tệp assembly plugin chiến lược của bạn (tệp `.dll`) và cấu hình các tham số chiến lược trong bảng thuộc tính (properties panel).
4. **Chạy mô phỏng**: Chọn symbol, khung thời gian và khoảng thời gian lịch sử, sau đó nhấn nút **Run**. Sử dụng các nút điều khiển (🔍+, 🔍-, 🔄, ⏸️, ⏹️) để tua nhanh, tạm dừng hoặc dừng mô phỏng. Xem các chỉ số hiệu suất và nhật ký giao dịch ở các tab phía dưới.

## 5. Giao dịch thực tế (Live Trade & Paper Trading)

Sau khi đã xác thực chiến lược, bạn có thể triển khai chạy thực tế hoặc giao dịch mô phỏng (paper trading).

![Giao dịch thực tế Live Trade](/img/overview/livetrade.png)

- **Cấu hình môi trường**: Truy cập phần cài đặt để đảm bảo bạn đã cấu hình đúng API keys. Để chạy thử nghiệm không rủi ro, hãy chọn môi trường **Demo** cho Paper Trading.
- **Triển khai chiến lược**: Từ bảng quản lý chiến lược, tải chiến lược của bạn lên biểu đồ trực tiếp của symbol đã chọn.
- **Thiết lập kiểm soát rủi ro**: Định nghĩa kích thước vị thế (position sizing), cắt lỗ (stop-loss), chốt lời (take-profit) và cài đặt trượt giá tối đa (max slippage).
- **Kích hoạt giao dịch**: Nhấp **Start Trading** để kích hoạt bot tự động, hoặc đặt lệnh thủ công bằng bảng giao dịch. Theo dõi các lệnh đang hoạt động, các vị thế và thông báo trực tiếp từ thanh trạng thái và bảng nhật ký.

## Cảnh báo Rủi ro

Giao dịch tiền mã hóa đi kèm rủi ro đáng kể. Phần mềm này không phải là lời khuyên tài chính. Tuyệt đối không chạy giao dịch tự động trực tiếp nếu chưa thiết lập các hạn mức rủi ro và xác thực kỹ lưỡng.

## Trạng thái và Các bước tiếp theo

- Hướng dẫn chi tiết cho ứng dụng GUI nằm ở [Bắt đầu với GUI](../products/gui/getting-started.md).
- Thiết lập chi tiết cho CLI nằm ở [Bắt đầu với CLI](../products/bot-cli/getting-started.md).
- Khám phá các tính năng của SDK tại [Giới thiệu SDK](../sdk/intro.md).
