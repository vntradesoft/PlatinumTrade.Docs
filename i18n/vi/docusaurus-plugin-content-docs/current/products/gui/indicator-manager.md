# Quản lý Plugin Chỉ báo (Indicator Plugin Manager)

Chức năng **Quản lý Plugin Chỉ báo** (Indicator Plugin Manager) cho phép người dùng nạp, gỡ bỏ, theo dõi và dọn dẹp các bộ plugin chỉ báo kỹ thuật custom (`.dll`) một cách linh hoạt.

---

## 1. Cách truy cập

Để mở hộp thoại Quản lý Plugin Chỉ báo:
- **Qua Menu chính:** Chọn **Tools** (Công cụ) -> **Indicator Plugin Manager**.

---

## 2. Giao diện và Các cột thông tin

Hộp thoại hiển thị danh sách tất cả các file DLL plugin chỉ báo được phát hiện trong thư mục nạp chỉ báo cục bộ của ứng dụng:

![Giao diện Quản lý Plugin Chỉ báo](/img/products/gui/indicator/indicator_manager.png)

- **Name (Tên):** Tên hiển thị thân thiện của plugin (hoặc tên file nếu plugin lỗi không nạp được).
- **Version (Phiên bản):** Phiên bản của bộ plugin (ví dụ: `1.0.0`).
- **Author (Tác giả):** Tác giả hoặc nhà phát triển của bộ plugin.
- **Description (Mô tả):** Giải thích ngắn gọn về chức năng của bộ chỉ báo.
- **Indicators (Chỉ báo):** Danh sách các tên chỉ báo cụ thể được đăng ký bên trong file DLL (một file DLL có thể đóng gói nhiều chỉ báo khác nhau).
- **Status (Trạng thái):** Thể hiện trạng thái vật lý thực tế của file DLL:
  - **Đang hoạt động (Active):** Plugin đã được nạp thành công và đang hoạt động bình thường.
  - **Chờ khởi động lại (Pending Restart):** Plugin đã được người dùng gỡ bỏ, nhưng file DLL vật lý đang bị tiến trình Windows khóa. File này sẽ được xóa hoàn toàn khi bạn khởi động lại ứng dụng.
  - **Lỗi nạp (Load Failed):** File DLL tồn tại trong thư mục nhưng không thể nạp (do lỗi cấu trúc plugin hoặc phiên bản SDK không tương thích).

---

## 3. Các Tính năng Thao tác

### A. Nạp / Import Plugin (📥)
- Bấm nút **Load Plugin** để chọn file DLL plugin chỉ báo đã được compile từ máy tính của bạn.
- **Xác minh (Validation):** Hệ thống sẽ tự động kiểm tra:
  1. File DLL có đúng chuẩn plugin chỉ báo tương thích hay không.
  2. Cấu trúc DLL có phù hợp với SDK hiện tại hay không.
- Sau khi xác minh thành công, file DLL sẽ được sao chép vào thư mục AppData cục bộ của ứng dụng và tự động kích hoạt.

### B. Gỡ bỏ / Xóa Plugin (🗑️)
- Click vào biểu tượng **Thùng rác (🗑️)** kế bên plugin để hủy đăng ký các chỉ báo khỏi menu biểu đồ và lập lịch xóa file DLL.
- **Xử lý khóa file trên Windows:**
  - Vì các file DLL trong C# khi đang chạy sẽ bị Windows khóa (lock) và không thể xóa trực tiếp ngay lập tức.
  - Ứng dụng sẽ đánh dấu file bằng một file `.deleted` bên cạnh và chuyển trạng thái sang **Chờ khởi động lại**. Nút xóa lúc này sẽ bị vô hiệu hóa để tránh các thao tác thừa.
  - File sẽ được dọn dẹp sạch sẽ hoàn toàn tự động ở lần khởi động ứng dụng tiếp theo.

### C. Mở Thư mục Plugin (📁)
- Mở trực tiếp thư mục lưu trữ các DLL plugin chỉ báo trong Windows Explorer.
- Tiện lợi cho người dùng nâng cao muốn kiểm tra, sao lưu hoặc tự tay xóa các file DLL.

### D. Làm mới (🔄)
- Quét lại thư mục lưu trữ và làm mới danh sách hiển thị, cập nhật trạng thái mới nhất của các file DLL.

---

## 4. Cảnh báo An toàn khi Nạp

Ứng dụng tích hợp cơ chế bảo vệ thông minh để tránh xung đột file khi import:

> [!WARNING]
> **Cảnh báo ghi đè file đang khóa:** Nếu bạn cố tình import hoặc ghi đè một DLL trùng tên với plugin đang hoạt động và bị khóa, hệ thống sẽ ngăn chặn việc sao chép và hiển thị thông báo hướng dẫn: *"Không thể ghi đè trực tiếp do bộ plugin cũ đang hoạt động và bị khóa bởi Windows. Vui lòng gỡ bỏ plugin hiện tại (Uninstall), khởi động lại ứng dụng rồi tiến hành nạp lại."*

> [!IMPORTANT]
> **Cảnh báo file chờ gỡ bỏ:** Nếu bạn import một DLL trùng tên với file đang có trạng thái **Chờ khởi động lại**, import sẽ bị chặn với cảnh báo: *"Bộ plugin này đang ở trạng thái chờ gỡ bỏ để giải phóng hoàn toàn. Vui lòng khởi động lại ứng dụng trước khi nạp lại hoặc ghi đè bộ plugin này."*
