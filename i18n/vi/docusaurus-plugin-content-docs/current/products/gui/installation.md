---
id: products-gui-installation
title: Cài Đặt
sidebar_position: 2
description: Hướng dẫn cài đặt từng bước và các thao tác trong Setup Wizard cho lần đầu chạy App Platinum Trade GUI
---

# Cài Đặt

Tài liệu này hướng dẫn bạn các bước tải xuống, cài đặt và chạy ứng dụng Platinum Trade GUI lần đầu tiên, bao gồm cấu hình giao diện cài đặt ban đầu (Setup Wizard).

---

## 1. Yêu Cầu Hệ Thống

- **Hệ điều hành:** Windows 10 hoặc Windows 11 (64-bit).
- **Dung lượng đĩa:** Tối thiểu 200 MB cho cài đặt ứng dụng, cộng thêm dung lượng tải dữ liệu nến lịch sử (khoảng 50-100 MB cho mỗi cặp giao dịch/năm).
- **Mạng:** Kết nối Internet ổn định để truyền dữ liệu thị trường theo thời gian thực và thực thi lệnh API.

---

## 2. Tải Xuống Ứng Dụng

Bạn có thể tải xuống bộ cài đặt chính thức mới nhất trực tiếp từ trang GitHub Releases của chúng tôi:

👉 **[Tải Bộ Cài Đặt Platinum Trade GUI](https://github.com/vntradesoft/PlatinumTrade.App/releases)**

Chọn phiên bản mới nhất và tải xuống tệp cài đặt thực thi (`PlatinumTrade.Setup.exe`).

---

## 3. Quy Trình Cài Đặt

1. Tìm tệp cài đặt đã tải xuống (`PlatinumTrade.Setup.exe`) trên máy tính của bạn.
2. Nhấp đúp vào tệp để chạy trình hướng dẫn cài đặt.
3. Trình cài đặt sẽ tự động thiết lập các phím tắt (shortcut) cần thiết trên màn hình chính và khởi tạo các thư viện nền tảng.
4. Sau khi hoàn tất, ứng dụng sẽ tự động khởi chạy. Một biểu tượng shortcut có tên **Platinum Trade** sẽ được tạo trên Desktop và Start Menu để phục vụ cho các lần khởi chạy sau.

---

## 4. Hướng Dẫn Setup Wizard Khi Chạy Lần Đầu

Khi khởi chạy ứng dụng lần đầu tiên, cửa sổ **Setup Wizard** sẽ xuất hiện để hướng dẫn bạn thực hiện các bước cấu hình ban đầu, đảm bảo trải nghiệm suôn sẻ.

### Bước 1: Lựa chọn Ngôn ngữ (Language Selection)

Chọn ngôn ngữ giao diện ưa thích của bạn. Nền tảng hỗ trợ dịch thuật hoàn chỉnh.

- **Tùy chọn:** Tiếng Anh (English) hoặc Tiếng Việt.
- **Thao tác:** Chọn ngôn ngữ của bạn và nhấn **Next** để tiếp tục.

![(Bước 1: Chọn ngôn ngữ)](/img/products/gui/installation/installation-step-1.png)

### Bước 2: Điều Khoản Sử Dụng & Chính Sách Pháp Lý

Bạn phải đọc và chấp nhận các điều khoản pháp lý của nền tảng trước khi sử dụng bất kỳ công cụ giao dịch nào.

- **Thao tác:** Đọc các tài liệu pháp lý được liên kết, tích chọn ô **"I accept the terms and conditions"** (Tôi chấp nhận các điều khoản và điều kiện) và nhấn **Next**.
- **Tài liệu pháp lý tham chiếu:**
  - Hãy đọc [Điều khoản Sử dụng](../../legal/terms-of-use.md).
  - Đọc [Chính sách Bảo mật](../../legal/privacy-policy.md).
  - Hiểu rõ rủi ro trong bản [Cảnh báo Rủi ro](../../legal/risk-disclosure.md).

![(Bước 2: Chấp nhận điều khoản)](/img/products/gui/installation/installation-step-2.png)

### Bước 3: Nạp Dữ Liệu Nến Lịch Sử Ban Đầu (Historical Data Bootstrapping)

Để đảm bảo biểu đồ được tải ngay lập tức khi bạn mở ứng dụng, trình Setup Wizard sẽ tải về một bộ dữ liệu lịch sử mặc định (bao gồm dữ liệu nến 1 phút tiêu chuẩn cho các cặp giao dịch chính như `BTC-USDT-SWAP`).

- **Thao tác:** Nhấp vào **Download** để bắt đầu quá trình tải xuống. Bạn có thể theo dõi thanh tiến trình.

![(Bước 3: Tải dữ liệu lịch sử)](/img/products/gui/installation/installation-step-3.png)

#### Xử Lý Khi Tải Lỗi

Nếu quá trình tự động tải xuống thất bại do hạn chế mạng, cấu hình tường lửa/proxy hoặc hết thời gian chờ (timeout) của máy chủ:

1. **Thử lại (Retry Download):** Nhấp vào nút **Retry** hiển thị trên màn hình để thử tải lại.
2. **Bỏ qua & Tự động đồng bộ (Skip and Auto-Sync):** Bạn có thể nhấn **Skip** để bỏ qua bước này. Ứng dụng sẽ khởi chạy bình thường, và dịch vụ đồng bộ ngầm (`CandleSyncService`) sẽ tự động tải các tệp dữ liệu lịch sử cần thiết dưới nền khi bạn thêm các mã giao dịch vào bảng [Market Watch](./market-watch.md).
3. **Phương án tải thủ công (Manual Download Fallback):** Trình cài đặt sẽ hiển thị một hộp chẩn đoán chi tiết:
   - **Error Details (Chi tiết lỗi):** Lỗi ngoại lệ hoặc thông báo hệ thống giải thích nguyên nhân thất bại.
   - **Manifest URL (Đường dẫn manifest):** Đường dẫn HTTP/HTTPS trực tiếp đến tệp manifest khởi tạo.
   - **Manual Storage Path (Đường dẫn lưu trữ thủ công):** Thư mục cục bộ nơi bạn cần đặt các tệp đã tải xuống:
     ```
     %LocalAppData%\PlatinumTrade\Histories
     ```

### Bước 4: Cấu Hình Giao Diện (Theme Configuration)

Chọn chủ đề giao diện phù hợp với sở thích của bạn.

- **Tùy chọn:**
  - **Dark Mode (Chế độ Tối):** Giao diện màu chàm sâu tinh tế (khuyên dùng để giảm mỏi mắt).
  - **Light Mode (Chế độ Sáng):** Giao diện sáng, có độ tương phản cao, phong cách tối giản.
- **Thao tác:** Chọn chủ đề yêu thích và nhấn **Finish** để vào giao diện giao dịch chính.

![(Bước 4: Cấu hình giao diện)](/img/products/gui/installation/installation-step-4.png)

---

## 5. Hoàn Tất & Cấu Hình API

Sau khi nhấp **Finish** trong Setup Wizard:

1. Cửa sổ Setup Wizard sẽ đóng lại, giao diện ứng dụng giao dịch chính trên máy tính sẽ tải lên.
2. Để cấu hình kết nối API OKX và bắt đầu giao dịch, di chuyển đến **Tools** -> **Options** -> **API Credentials** trên thanh menu trên cùng.
3. Nhập thông tin xác thực OKX của bạn (API Key, Secret Key, Passphrase) và kiểm tra kết nối.

Để biết hướng dẫn chi tiết từng bước về cách thiết lập thông tin xác thực API, vui lòng tham khảo tài liệu tiếp theo:

➡️ **[Cấu Hình API Key](./settings/api-credentials.md)**
➡️ **[Bắt Đầu Nhanh](./getting-started.md)**
