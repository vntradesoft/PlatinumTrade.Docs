# Quản lý Kho Dữ liệu Lịch sử (History Manager)

Chức năng **Quản lý Lịch sử** (History Manager) giúp người dùng quản lý, theo dõi dung lượng đĩa, dọn dẹp và chẩn đoán chất lượng dữ liệu nến lịch sử đã tải về máy tính để phục vụ cho quá trình backtest hoặc chạy simulator.

---

## 1. Cách truy cập

Để mở hộp thoại Quản lý Lịch sử, bạn có thể thực hiện một trong hai cách sau:
- **Qua Menu chính:** Chọn **Tools** (Công cụ) -> **Quản lý Lịch sử** (History Manager).
- **Sử dụng Phím tắt:** Nhấn tổ hợp phím **Ctrl + Shift + H**.

---

## 2. Giao diện và Các Thông tin Hiển thị

Hộp thoại hiển thị thông tin trực quan dựa trên cấu hình môi trường hiện tại của hệ thống:

- **Môi trường hoạt động:** Tự động nhận diện theo cài đặt `IsTestnet`:
  - **Demo:** Dữ liệu được quét từ thư mục `%LocalAppData%\PlatinumTrade\Histories\demo`.
  - **Real (Mainnet):** Dữ liệu được quét từ thư mục `%LocalAppData%\PlatinumTrade\Histories\real`.
- **Tổng dung lượng (Total Size):** Hiển thị tổng kích thước (MB) của toàn bộ dữ liệu nến lịch sử đang lưu trên đĩa trong môi trường hiện tại.
- **Bảng dữ liệu danh sách Symbol:**
  - **Symbol:** Tên cặp giao dịch (Ví dụ: `BTC-USDT-SWAP`).
  - **Format:** Định dạng tệp lưu trữ (`bin` - Nhị phân hoặc `csv` - Văn bản). Định dạng nhị phân (`bin`) được khuyên dùng để có tốc độ đọc ghi tối ưu cho backtest.
  - **Data Range:** Khoảng thời gian dữ liệu thực tế hiện có (Ví dụ: `2025-01-01 -> 2026-06-30`).
  - **Files:** Số lượng file năm đã lưu trữ.
  - **Size:** Dung lượng đĩa thực tế của riêng symbol đó.

---

## 3. Các Tính năng Thao tác

Trên bảng danh sách, cột **Actions** cung cấp các công cụ thao tác nhanh:

### A. Mở Thư mục Lưu trữ (📁)
- Khi nhấn nút biểu tượng thư mục, ứng dụng sẽ mở trực tiếp thư mục lưu trữ của symbol đó trên Windows Explorer.
- Giúp bạn dễ dàng sao chép, chia sẻ hoặc kiểm tra trực tiếp các tệp tin năm (`2024.bin`, `2025.bin`, v.v.).

### B. Chẩn đoán Chất lượng Dữ liệu (🩺)
Tính năng chẩn đoán sẽ quét toàn bộ dữ liệu nến của symbol đã chọn từ đĩa để đánh giá sức khỏe của dữ liệu:
- **Phát hiện Khoảng trống (Gaps):** Tìm các khoảng trống dữ liệu bị thiếu (khoảng cách giữa hai nến liên tiếp lớn hơn 1 phút đối với dữ liệu nến 1m chuẩn).
- **Phát hiện Lỗi sắp xếp (Unsorted):** Kiểm tra xem có nến nào bị sắp xếp sai thứ tự thời gian hay không (Lỗi này rất nguy hiểm và có thể làm hỏng thuật toán backtest).
- **Phát hiện Dữ liệu không hợp lệ (Anomalies):** Tìm các nến có giá trị lỗi như Open, High, Low, Close nhỏ hơn hoặc bằng 0, hoặc khối lượng Volume âm, hoặc giá High thấp hơn Low.
- **Báo cáo kết quả:** Hệ thống hiển thị bảng chi tiết số lượng lỗi phát hiện kèm theo lời khuyên xử lý (Ví dụ: dữ liệu khỏe mạnh, khuyên dùng tải lại do có nhiều khoảng trống dữ liệu).

### C. Xóa Dữ liệu Lịch sử Symbol (🗑️)
- Cho phép bạn xóa toàn bộ các tệp tin lịch sử của symbol được chọn để giải phóng dung lượng đĩa.
- Hệ thống sẽ hiển thị một thông báo xác nhận để tránh việc xóa nhầm dữ liệu.

---

## 4. Các Thao tác Tổng thể (Footer Buttons)

Dưới chân hộp thoại cung cấp các tùy chọn điều khiển chung:
- **Quét lại (Refresh):** Tải lại toàn bộ cấu trúc thư mục và cập nhật nhanh các thông số dung lượng mới nhất.
- **Xóa tất cả (Clear All):** Xóa sạch toàn bộ dữ liệu lịch sử trong thư mục môi trường hiện tại (Demo hoặc Real). 
  > [!WARNING]
  > Hành động này sẽ xóa toàn bộ dữ liệu lịch sử của tất cả các symbol trong môi trường hiện tại. Bạn nên cân nhắc kỹ trước khi thực hiện.
- **Đóng (Close):** Tắt hộp thoại quản lý.
