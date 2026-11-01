# Backend Base API - Sàn Thương Mại Điện Tử Bán Tool Đóng Gói (MVP)

Backend REST API chuyên biệt cho dự án bán phần mềm/tool đóng gói sẵn, xây dựng theo kiến trúc phân tầng (Layered Architecture) với độ bảo mật cao.

---

## 🛠 Tech Stack
- **Runtime & Language:** Node.js (v22+), TypeScript (ES2022, NodeNext), `tsx` (development runner)
- **Framework:** Express.js
- **Database & ORM:** PostgreSQL + Prisma ORM
- **Security & Middlewares:**
  - `helmet`: Thiết lập các header HTTP bảo mật.
  - `cors`: Cấu hình truy cập từ Next.js frontend (`http://localhost:3000`), hỗ trợ credentials.
  - `cookie-parser`: Đọc và gửi HTTP-only Cookies.
  - `express-rate-limit`: Chống fuzzing scan, brute-force đăng nhập và spam tải ảnh.
  - `jsonwebtoken` & `bcryptjs`: Xác thực JWT và băm mật khẩu chuẩn Salt 10 vòng.
  - `zod`: Kiểm định schema dữ liệu đầu vào.
- **Xử lý Tệp Tin:**
  - `multer` (chế độ `memoryStorage`): Không lưu trực tiếp tệp tạm thời chưa qua kiểm duyệt.
  - `sharp`: Giải mã và tái mã hóa toàn bộ pixel sang chuẩn WebP, đổi tên UUID, triệt tiêu mã độc đính kèm (Polyglot payloads).

---

## 📁 Cấu Trúc Dự Án (Layered Architecture)

```text
d:/web-ban-tool/back-end/
├── prisma/
│   ├── schema.prisma        # Mô hình CSDL: User, Tool, ToolPackage, Order, PaymentProof
│   └── seed.ts              # Script tạo tài khoản Admin và dữ liệu mẫu
├── src/
│   ├── @types/
│   │   └── express.d.ts     # Mở rộng Express.Request (req.user)
│   ├── config/
│   │   ├── env.ts           # Validate biến môi trường bằng Zod (Fail-fast)
│   │   └── database.ts      # Prisma Client Singleton
│   ├── constants/
│   │   ├── orderStatus.ts   # Enums trạng thái đơn hàng & phương thức thanh toán
│   │   └── roles.ts         # Quyền hạn người dùng (ADMIN, USER)
│   ├── middlewares/
│   │   ├── auth.middleware.ts     # Xác thực JWT & phân quyền Role
│   │   ├── error.middleware.ts    # Bắt lỗi tập trung (Zod, Prisma, Multer, ApiError)
│   │   ├── rateLimiter.ts         # Rate limiter chống brute-force và DDoS
│   │   ├── upload.middleware.ts   # Multer memory storage + lọc Mime-type
│   │   └── validate.middleware.ts # Generic Zod request validator
│   ├── modules/
│   │   ├── auth/            # Đăng ký, đăng nhập, hồ sơ cá nhân
│   │   ├── tools/           # Quản lý tool và gói bản quyền
│   │   ├── orders/          # Tạo đơn (giá lấy từ DB), đối soát đơn hàng
│   │   └── payments/        # Hướng dẫn thanh toán, upload bill WebP, duyệt bill
│   ├── utils/
│   │   ├── apiError.ts      # Lớp lỗi chuẩn hóa có HTTP StatusCode
│   │   ├── apiResponse.ts   # Chuẩn hóa định dạng JSON phản hồi
│   │   ├── fileUpload.ts    # Sharp WebP encoder & sanitize path
│   │   └── jwt.ts           # Ký và xác thực JWT
│   ├── app.ts               # Khởi tạo Express pipeline
│   └── server.ts            # Entrypoint & Graceful Shutdown
├── uploads/
│   └── proofs/              # Thư mục lưu ảnh bill (chỉ phục vụ nội bộ Admin)
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Cài đặt Dependencies
```bash
npm install
```

### 2. Cấu hình Biến Môi Trường
Sao chép `.env.example` thành `.env` và cập nhật thông số kết nối PostgreSQL:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/web_ban_tool?schema=public
JWT_SECRET=super_secret_jwt_key_at_least_32_characters_long_12345
JWT_EXPIRES_IN=7d
MAX_FILE_SIZE_MB=5
UPLOAD_DIR=uploads/proofs
```

### 3. Đồng bộ Database & Sinh Prisma Client
```bash
# Đẩy schema lên cơ sở dữ liệu
npm run prisma:generate
npx prisma db push

# (Tùy chọn) Chạy seed dữ liệu mẫu (Tạo Admin và 2 tool mẫu kèm gói bản quyền)
npm run prisma:seed
```

### 4. Khởi chạy Server
```bash
# Môi trường phát triển (Hot reload với tsx watch)
npm run dev

# Môi trường sản xuất
npm run build
npm start
```

---

## 🔒 Quy Tắc Bảo Mật & Luồng Nghiệp Vụ MVP

1. **Khách Hàng Tạo Đơn (Strict Backend Pricing):**
   - Client chỉ gửi `{ "toolId": "...", "packageId": "..." }`.
   - Backend Service trực tiếp truy vấn bảng `ToolPackage` để lấy giá chính thức (`amount = pkg.price`). Khách hàng không thể can thiệp hoặc thay đổi giá đơn hàng.
2. **Khách Hàng Tải Bill Thanh Toán (Secure Upload):**
   - Endpoint `POST /api/v1/payments/proof` nhận `multipart/form-data` gồm file `proofImage`.
   - Tệp được đưa vào RAM (`memoryStorage`), thư viện `sharp` giải mã ma trận điểm ảnh, resize tối đa `1920x1920`, ép mã hóa lại thành `.webp` với tên `${crypto.randomUUID()}.webp`.
   - Lưu trữ ngoài thư mục public tại `uploads/proofs/`.
3. **Admin Đối Soát & Duyệt Tiền (Admin Role Only):**
   - Ảnh bill được xem qua endpoint bảo vệ: `GET /api/v1/payments/proofs/view/:fileName` (chỉ tài khoản `ADMIN` có token hợp lệ mới được xem, có chống tấn công Path Traversal).
   - Admin duyệt đơn qua `PATCH /api/v1/payments/proofs/:id/review`: Cập nhật trạng thái bill `VERIFIED` và tự động chuyển trạng thái đơn hàng sang `PAID` bằng Prisma Transaction nguyên tử.
   - Admin cập nhật mã bản quyền và đổi trạng thái đơn sang `COMPLETED` qua `PATCH /api/v1/orders/:id/status`.

---

## 📡 Danh Sách Endpoints Chính

| Module | Method | Endpoint | Quyền | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/v1/auth/register` | Public | Đăng ký tài khoản (tài khoản đầu tiên tự động cấp ADMIN) |
| **Auth** | `POST` | `/api/v1/auth/login` | Public | Đăng nhập nhận JWT & Set Cookie |
| **Auth** | `POST` | `/api/v1/auth/logout` | Public | Đăng xuất |
| **Auth** | `GET` | `/api/v1/auth/me` | User / Admin | Lấy thông tin tài khoản hiện tại |
| **Tools** | `GET` | `/api/v1/tools` | Public | Danh sách tool kèm các gói giá active |
| **Tools** | `GET` | `/api/v1/tools/:idOrSlug` | Public | Chi tiết tool theo ID hoặc Slug |
| **Tools** | `POST` | `/api/v1/tools` | Admin | Tạo mới tool |
| **Tools** | `PUT` | `/api/v1/tools/:id` | Admin | Chỉnh sửa tool |
| **Tools** | `DELETE`| `/api/v1/tools/:id` | Admin | Xóa tool |
| **Tools** | `POST` | `/api/v1/tools/packages` | Admin | Tạo gói bản quyền mới cho tool |
| **Orders**| `POST` | `/api/v1/orders` | User / Admin | Tạo đơn hàng mới (Service tự tính giá từ DB) |
| **Orders**| `GET` | `/api/v1/orders/my` | User / Admin | Xem lịch sử đơn hàng của bản thân |
| **Orders**| `GET` | `/api/v1/orders` | Admin | Quản trị xem toàn bộ đơn hàng hệ thống |
| **Orders**| `GET` | `/api/v1/orders/:id` | Owner / Admin| Xem chi tiết đơn hàng |
| **Orders**| `PATCH`| `/api/v1/orders/:id/status`| Admin | Cập nhật trạng thái (`PAID`, `COMPLETED`, `CANCELLED`) & key |
| **Payments**| `GET` | `/api/v1/payments/info` | Public | Thông tin tài khoản Ngân hàng (VietQR) và ví USDT |
| **Payments**| `POST` | `/api/v1/payments/proof` | User / Admin | Tải ảnh bill chuyển khoản (Multer memory -> Sharp WebP) |
| **Payments**| `GET` | `/api/v1/payments/proofs/view/:fileName` | Admin | Xem ảnh bill đối soát an toàn |
| **Payments**| `PATCH`| `/api/v1/payments/proofs/:id/review` | Admin | Duyệt đối soát bill (`VERIFIED` / `REJECTED`) |
