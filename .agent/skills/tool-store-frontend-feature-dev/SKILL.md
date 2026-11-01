---
name: tool-store-frontend-feature-dev
description: >-
  Hướng dẫn và tiêu chuẩn phát triển Frontend Next.js theo Feature-based Architecture
  cho dự án Sàn Bán Tool Đóng Gói: phân chia feature/admin, feature/customer, feature/auth,
  React Hook Form, Zod validation, Axios client và cấu trúc app router.
---

# Kỹ Năng Phát Triển Frontend (Feature-based Architecture)

Kỹ năng này hướng dẫn quy chuẩn tổ chức mã nguồn giao diện cho website bán tool đóng gói sử dụng Next.js (App Router) + TypeScript + Tailwind CSS theo mô hình **Feature-based Architecture**.

---

## 1. NGUYÊN TẮC CỐT LÕI

1. **Phân tách 3 nhóm Feature độc lập:**
   - `src/feature/auth/`: Đăng nhập, đăng ký, phiên làm việc (`session`), đổi mật khẩu.
   - `src/feature/customer/`: Giao diện và nghiệp vụ dành cho khách hàng (`home`, `tools`, `categories`, `orders`, `payments`, `profile`).
   - `src/feature/admin/`: Nghiệp vụ quản trị dành cho Admin (`dashboard`, `tools`, `categories`, `orders`, `payments`, `users`).
2. **Vai trò của App Router (`src/app/`):**
   - Chỉ chịu trách nhiệm routing, layout cấp cao và metadata.
   - Tuyệt đối không viết logic nghiệp vụ lớn (như tính toán thanh toán, gọi API phức tạp) trực tiếp trong `page.tsx`.
   - File `page.tsx` chỉ đóng vai trò mount component chính từ `feature/`.
3. **Phạm vi Component & Service:**
   - Component / Hook / Service chỉ thuộc về một nghiệp vụ cụ thể -> đặt bên trong `feature/<nhóm>/<feature_name>/`.
   - Component tái sử dụng nhiều nơi toàn hệ thống -> đưa vào `src/components/ui/` hoặc `src/components/shared/`.

---

## 2. CẤU TRÚC THƯ MỤC CỦA MỘT FEATURE

Ví dụ với feature `tools` của khách hàng:

```text
src/feature/customer/tools/
├── components/
│   ├── ToolCard.tsx          # Card hiển thị công cụ
│   ├── ToolList.tsx          # Danh sách công cụ kèm phân trang
│   ├── ToolFilter.tsx        # Bộ lọc theo danh mục & mức giá
│   └── ToolSearch.tsx        # Thanh tìm kiếm từ khóa
├── hooks/
│   └── useTools.ts           # Hook quản lý fetch danh sách, debounce search, pagination
├── services/
│   └── tool.service.ts       # Axios gọi /api/tools
├── schemas/
│   └── tool.schema.ts        # Zod schema cho query params hoặc form
├── types/
│   └── tool.types.ts         # TypeScript interfaces (ITool, IToolFilter)
└── index.ts                  # Public exports
```

---

## 3. KẾT NỐI GIỮA APP ROUTER VÀ FEATURE

File route: `src/app/(store)/tools/page.tsx`
```tsx
import { ToolList } from "@/feature/customer/tools/components/ToolList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh sách công cụ phần mềm | Store",
  description: "Khám phá các phần mềm, công cụ MMO tự động hóa đóng gói sẵn",
};

export default function ToolsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tất Cả Công Cụ</h1>
      <ToolList />
    </main>
  );
}
```

---

## 4. QUY CHUẨN FORM VÀ VALIDATION (REACT HOOK FORM + ZOD)

Áp dụng cho mọi form (ví dụ Form nhập mã TxID thanh toán):

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const submitTxIdSchema = z.object({
  txId: z
    .string()
    .trim()
    .regex(/^[a-fA-F0-9]{64}$/, "Mã TxID TRON phải đúng 64 ký tự hex"),
});

type SubmitTxIdFormValues = z.infer<typeof submitTxIdSchema>;

export function SubmitTxIdForm({ paymentId, onSubmitSuccess }: { paymentId: string; onSubmitSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubmitTxIdFormValues>({
    resolver: zodResolver(submitTxIdSchema),
  });

  const onSubmit = async (data: SubmitTxIdFormValues) => {
    try {
      // Gọi service tương ứng
      // await paymentService.submitTxId(paymentId, data.txId);
      onSubmitSuccess();
    } catch (err: any) {
      alert(err.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Mã Giao Dịch (TxID):</label>
        <Input {...register("txId")} placeholder="Nhập chuỗi 64 ký tự hash từ ví của bạn..." />
        {errors.txId && <p className="text-red-500 text-xs mt-1">{errors.txId.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Đang gửi xác thực..." : "Xác Nhận Đã Chuyển Tiền"}
      </Button>
    </form>
  );
}
```

---

## 5. AXIOS INSTANCE CHUẨN (`src/lib/axios.ts`)
- Cấu hình `baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'`.
- Tự động đính kèm `withCredentials: true` (nếu dùng HttpOnly cookie) hoặc gắn token vào Authorization Header: `Bearer <token>`.
- Xử lý Global Response Interceptor: Tự động điều hướng về `/login` khi nhận status 401 Unauthorized.

