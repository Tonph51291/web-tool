# Hướng Dẫn Chạy Frontend (FE) Dự Án Web Bán Tool

Tài liệu này hướng dẫn chi tiết từng bước để clone mã nguồn và khởi chạy riêng phần **Frontend (Next.js)** từ đầu.

---

## 1. Yêu Cầu Môi Trường (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:
- **Git**: [Tải Git tại đây](https://git-scm.com/)
- **Node.js**: Phiên bản **>= 18.18.0** hoặc **20.x LTS** ([Tải Node.js tại đây](https://nodejs.org/))
- **Trình quản lý gói**: `npm` (mặc định đi kèm Node.js) hoặc `yarn`/`pnpm`

Kiểm tra phiên bản bằng terminal:
```bash
node -v
npm -v
git --version
```

---

## 2. Các Bước Khởi Chạy Từng Bước

### Bước 1: Clone mã nguồn từ GitHub

Mở Terminal (hoặc PowerShell / Command Prompt / Git Bash) và chạy lệnh:

```bash
git clone https://github.com/Tonph51291/web-tool.git
```

Sau khi clone hoàn tất, di chuyển vào thư mục dự án vừa tải:

```bash
cd web-tool
```

---

### Bước 2: Di chuyển vào thư mục Frontend (`font-end`)

Chạy lệnh để chuyển vào đúng thư mục mã nguồn giao diện:

```bash
cd font-end
```

---

### Bước 3: Cài đặt các gói phụ thuộc (Dependencies)

Cài đặt đầy đủ các thư viện cần thiết (`react`, `next`, `tailwindcss`, `lucide-react`, ...):

```bash
npm install
```

> **Lưu ý**: Nếu gặp cảnh báo lỗi peer dependencies trong môi trường cụ thể, có thể dùng:
> ```bash
> npm install --legacy-peer-deps
> ```

---

### Bước 4: Cấu hình biến môi trường (`.env.local`)

Tạo file cấu hình môi trường từ file mẫu có sẵn:

- **Trên Windows (PowerShell):**
  ```powershell
  Copy-Item .env.local.example .env.local
  ```

- **Trên Git Bash / Linux / macOS:**
  ```bash
  cp .env.local.example .env.local
  ```

- **Hoặc tạo thủ công**: Tạo file tên `.env.local` nằm ngay trong thư mục `font-end` với nội dung sau:
  ```env
  # Địa chỉ Backend API (nếu có chạy Backend)
  NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
  NEXT_PUBLIC_APP_NAME="Packaged MMO Tools Store"
  ```

*(Nếu bạn chỉ muốn xem giao diện trước mà chưa bật backend, vẫn giữ nguyên cấu hình trên để giao diện hoạt động bình thường).*

---

### Bước 5: Khởi chạy ứng dụng (Development Mode)

Chạy lệnh dev server:

```bash
npm run dev
```

Sau khi terminal hiển thị:
```
  ▲ Next.js 14.2.24
  - Local:        http://localhost:3000
```

---

### Bước 6: Mở và trải nghiệm trên trình duyệt

Mở trình duyệt web (Chrome, Edge, Brave...) và truy cập:

- **Trang chủ (Khách hàng)**: [http://localhost:3000](http://localhost:3000)
- **Khu vực Admin**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Đăng nhập / Đăng ký**: [http://localhost:3000/auth/login](http://localhost:3000/auth/login)

---

## 3. Tổng Hợp Lệnh Nhanh (Cheat Sheet)

Nếu bạn đã quen thuộc, chỉ cần mở terminal và chạy lần lượt:

```bash
git clone https://github.com/Tonph51291/web-tool.git
cd web-tool/font-end
npm install
cp .env.local.example .env.local
npm run dev
```

---

## 4. Các Lệnh Bổ Sung Thường Dùng

- **Dừng server**: Nhấn tổ hợp phím `Ctrl + C` trên terminal.
- **Build phiên bản Production**:
  ```bash
  npm run build
  ```
- **Chạy phiên bản Production** (sau khi đã build):
  ```bash
  npm run start
  ```
- **Kiểm tra cú pháp và quy chuẩn code (Linting)**:
  ```bash
  npm run lint
  ```

---

## 5. Xử Lý Sự Cố Thường Gặp (Troubleshooting)

1. **Port 3000 bị chiếm dụng (Port in use)**:
   - Next.js sẽ tự động chuyển sang port tiếp theo như `http://localhost:3001`. Hãy chú ý link in ra trên terminal.
2. **Lỗi `node_modules` hoặc cache**:
   - Nếu gặp lỗi render hoặc build, xóa thư mục cache và cài lại:
     ```bash
     # Xóa cache Next.js và cài lại
     rm -rf .next node_modules package-lock.json
     npm install
     npm run dev
     ```
3. **Lỗi phiên bản Node**:
   - Dự án sử dụng Next.js 14, yêu cầu Node.js tối thiểu là **v18.17.0+**. Nếu đang dùng Node cũ (14, 16), vui lòng nâng cấp Node.js.

