---
name: tool-store-workflow-checklist
description: >-
  Kỹ năng quản lý tiến độ, quy trình 8 giai đoạn triển khai và kịch bản kiểm thử (QA Checklist)
  toàn diện cho dự án Sàn Bán Tool Đóng Gói (MVP).
---

# Quy Trình Triển Khai & Kịch Bản Kiểm Thử (QA Checklist)

Kỹ năng này đóng vai trò kim chỉ nam điều phối thứ tự thực hiện dự án theo 8 giai đoạn chuẩn và cung cấp bảng kiểm tra chất lượng (QA) trước khi release.

---

## 1. LỘ TRÌNH 8 GIAI ĐOẠN TRIỂN KHAI

### Giai đoạn 1: Khởi tạo Kiến trúc
- [ ] Khởi tạo repository, backend Express + TS, frontend Next.js App Router.
- [ ] Cấu hình biến môi trường `.env` và `.env.example`.
- [ ] Cấu hình Prisma Client singleton và kết nối PostgreSQL.

### Giai đoạn 2: Cơ sở dữ liệu & Migration
- [ ] Thiết kế `schema.prisma` với 9 bảng chuẩn: `users`, `categories`, `category_translations`, `tools`, `tool_translations`, `orders`, `order_items`, `payments`, `order_status_histories`.
- [ ] Chạy migration đồng bộ lên PostgreSQL.
- [ ] Viết script `seed.ts` nạp sẵn tài khoản Admin, các danh mục và công cụ mẫu.

### Giai đoạn 3: Module Xác thực (Auth)
- [ ] Backend: Đăng ký, đăng nhập JWT, hash bcrypt, middlewares `authMiddleware`, `requireRole('ADMIN')`.
- [ ] Frontend: `feature/auth/login`, `feature/auth/register`, `feature/auth/session` (Lưu token / cookie, bảo vệ route bằng Next.js Middleware).

### Giai đoạn 4: Quản trị Danh mục & Công cụ (Category & Tool)
- [ ] Backend: API công khai xem Tool/Category đa ngôn ngữ; API Admin CRUD Tool và upload ảnh WebP qua `sharp`.
- [ ] Frontend:
  - Khách: Trang chủ, danh sách tool có bộ lọc và tìm kiếm, trang chi tiết tool.
  - Admin: Bảng danh mục, form tạo/sửa tool, quản lý bản dịch VI/EN.

### Giai đoạn 5: Đặt hàng (Order Flow)
- [ ] Backend: Endpoint `POST /api/orders` tính tiền tự động từ DB, chụp snapshot tên và giá vào `order_items`.
- [ ] Frontend: `feature/customer/orders` (Modal hoặc trang Checkout, tóm tắt đơn, tạo đơn hàng).

### Giai đoạn 6: Thanh toán & Đối soát (Payment)
- [ ] Backend: Tạo Payment, lưu TxID, upload bill nén WebP, Admin duyệt/từ chối bằng Prisma Transaction.
- [ ] Frontend:
  - Khách: Hiển thị QR USDT TRC20, copy ví, form gửi TxID / upload hóa đơn ngân hàng.
  - Admin: Bảng đối soát giao dịch, nút duyệt/từ chối kèm ghi chú.

### Giai đoạn 7: Bàn giao License Key & Hướng Dẫn
- [ ] Backend: Endpoint Admin cập nhật License Key và hướng dẫn vào Order, chuyển trạng thái sang `COMPLETED`.
- [ ] Frontend: Giao diện Admin nhập key; Khách hàng xem key bản quyền trong chi tiết đơn hàng.

### Giai đoạn 8: Hoàn thiện & Đóng gói Production
- [ ] Tích hợp đa ngôn ngữ (i18n VI/EN).
- [ ] Chạy kiểm thử toàn bộ các kịch bản QA.
- [ ] Thiết lập Nginx reverse proxy, chứng chỉ SSL Let's Encrypt và cấu hình backup định kỳ database.

---

## 2. KỊCH BẢN KIỂM THỬ NGHIỆP VỤ (QA CHECKLIST)

### 2.1. Kiểm thử Xác thực & Phân quyền
- [ ] Đăng ký với email đã tồn tại -> Trả về lỗi 400 Email already registered.
- [ ] Đăng nhập với mật khẩu sai -> Trả về lỗi 401 Invalid credentials.
- [ ] Đăng nhập thành công -> Trả về Token hợp lệ và thông tin user (ẩn password).
- [ ] Gửi request đến `/api/admin/*` với token quyền `USER` -> Trả về 403 Forbidden.
- [ ] Truy cập endpoint bảo vệ mà không có token -> Trả về 401 Unauthorized.

### 2.2. Kiểm thử Danh mục & Công cụ
- [ ] Kiểm tra công cụ có cờ `is_active = false` -> Không xuất hiện ở danh sách công khai của khách.
- [ ] Tìm kiếm từ khóa và lọc theo category slug hoạt động chính xác.
- [ ] Lấy nội dung theo `locale=vi` và `locale=en` trả về đúng bản dịch tương ứng.

### 2.3. Kiểm thử Đặt hàng & Phòng chống Giả mạo Giá (Price Tampering)
- [ ] Client cố tình gửi `unit_price: 1` hoặc `total_amount: 10` trong body -> Backend bỏ qua giá client gửi, tự lấy giá gốc từ bảng `tools` để tính toán.
- [ ] Thử tạo đơn với tool đã bị tắt (`is_active = false`) -> Backend báo lỗi từ chối tạo đơn.
- [ ] Sau khi admin đổi giá của Tool, kiểm tra lại đơn hàng cũ -> Đơn giá snapshot trong `order_items` vẫn giữ nguyên giá cũ không đổi.
- [ ] User A cố tình gọi `GET /api/orders/:id` của User B -> Bị chặn với lỗi 403 Forbidden hoặc 404 Not Found.

### 2.4. Kiểm thử Thanh toán & Chống gian lận Blockchain
- [ ] Hiển thị đúng địa chỉ ví nhận USDT từ biến môi trường `USDT_TRON_RECEIVE_ADDRESS`.
- [ ] Mã QR render từ chuỗi địa chỉ ví quét chính xác trên app TronLink / Trust Wallet.
- [ ] Gửi TxID không đủ 64 ký tự hex (ví dụ chuỗi ngắn hoặc ký tự đặc biệt) -> Bị Zod schema chặn ngay lập tức.
- [ ] Gửi TxID đã từng được sử dụng trước đó cho đơn khác -> Backend từ chối với thông báo "Mã giao dịch đã tồn tại".
- [ ] Tải file giả mạo (ví dụ file exe đổi đuôi `.png`) làm minh chứng -> Thư viện `sharp` báo lỗi và từ chối xử lý.
- [ ] Admin duyệt đơn -> Cùng lúc cập nhật `payments.status = CONFIRMED`, `orders.status = PAID` và ghi vào `order_status_histories`.

### 2.5. Kiểm thử Giao Key & Hoàn tất
- [ ] Chỉ Admin mới có quyền gọi API nhập License Key.
- [ ] Khách hàng chỉ xem được License Key khi đơn hàng đã đạt trạng thái `COMPLETED`.
- [ ] Khách hàng không thể can thiệp sửa đổi nội dung Key hoặc hướng dẫn nhận được.
