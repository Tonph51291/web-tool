---
name: tool-store-backend-dev
description: >-
  Hướng dẫn và tiêu chuẩn phát triển Backend API cho dự án Sàn Bán Tool Đóng Gói
  theo kiến trúc Modular Monolith: Routes, Controller, Service, Zod Schema, Prisma Transactions,
  Zero-Trust pricing và Audit Logging.
---

# Kỹ Năng Phát Triển Module Backend (Modular Monolith)

Kỹ năng này hướng dẫn các quy chuẩn và mẫu code bắt buộc khi xây dựng các module backend cho dự án Sàn Bán Tool Đóng Gói (`back-end/`).

---

## 1. NGUYÊN TẮC CỐT LÕI
1. **Phân tầng trách nhiệm nghiêm ngặt:**
   - **Routes:** Định nghĩa HTTP method, path, middleware xác thực (`authMiddleware`), phân quyền (`requireRole`), rate limit và validator.
   - **Controller:** Tiếp nhận `req`, trích xuất params/query/body (đã validate), gọi `Service`, trả về `ApiResponse.success()`. Không viết logic nghiệp vụ trong controller.
   - **Service:** Chịu trách nhiệm toàn bộ nghiệp vụ, truy vấn Database qua `prisma`, tính toán tiền tệ, xử lý transaction và bắn `ApiError` khi có lỗi.
   - **Schema:** Khai báo Zod schema để validate dữ liệu đầu vào.
   - **Types:** Định nghĩa TypeScript interfaces/types cho đầu vào và đầu ra của service.
2. **Zero-Trust Client Pricing:** Tuyệt đối không tin cậy giá tiền gửi từ frontend. Mọi đơn giá phải được tra cứu từ database và tính toán tại Backend.
3. **Database Transactions:** Mọi thao tác ghi dữ liệu liên quan từ 2 bảng trở lên (ví dụ: tạo đơn hàng + chi tiết đơn + log lịch sử) bắt buộc phải dùng `prisma.$transaction`.

---

## 2. CẤU TRÚC CHUẨN CỦA MỘT MODULE

```text
src/modules/<module_name>/
├── <module_name>.routes.ts       # Định nghĩa endpoints
├── <module_name>.controller.ts   # Xử lý Request/Response
├── <module_name>.service.ts      # Nghiệp vụ & Prisma queries
├── <module_name>.schema.ts       # Zod schemas validate
└── <module_name>.types.ts        # Type definitions
```

---

## 3. MẪU CODE CHUẨN THEO TỪNG TẦNG

### 3.1. Zod Schema (`<module>.schema.ts`)
```typescript
import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    toolId: z.string().uuid("Tool ID không hợp lệ"),
    quantity: z.number().int().positive("Số lượng phải lớn hơn 0").default(1),
    note: z.string().max(500).optional(),
  }),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>["body"];
```

### 3.2. Service (`<module>.service.ts`)
```typescript
import { prisma } from "../../config/database";
import { ApiError } from "../../utils/apiError";
import { CreateOrderInput } from "./order.schema";

export class OrderService {
  static async createOrder(userId: string, input: CreateOrderInput) {
    // 1. Kiểm tra sản phẩm tồn tại và đang hoạt động
    const tool = await prisma.tool.findUnique({
      where: { id: input.toolId },
      include: { translations: true }
    });

    if (!tool || !tool.isActive) {
      throw ApiError.badRequest("Công cụ không tồn tại hoặc đã ngừng kinh doanh");
    }

    // 2. Tính toán giá tại Backend (Zero-Trust)
    const unitPrice = tool.price;
    const lineTotal = Number(unitPrice) * input.quantity;
    const orderCode = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 3. Thực thi Transaction ghi đồng thời Order, OrderItem và Lịch sử
    return await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          orderCode,
          userId,
          status: "PENDING_PAYMENT",
          totalAmount: lineTotal,
          currency: tool.currency,
          items: {
            create: {
              toolId: tool.id,
              toolNameSnapshot: tool.translations[0]?.name || "Tool",
              unitPrice: unitPrice,
              quantity: input.quantity,
              lineTotal: lineTotal,
            },
          },
          statusHistories: {
            create: {
              actorId: userId,
              fromStatus: null,
              toStatus: "PENDING_PAYMENT",
              note: "Khởi tạo đơn hàng mới",
            },
          },
        },
        include: {
          items: true,
        },
      });

      return order;
    });
  }
}
```

### 3.3. Controller (`<module>.controller.ts`)
```typescript
import { Request, Response, NextFunction } from "express";
import { OrderService } from "./order.service";
import { ApiResponse } from "../../utils/apiResponse";

export class OrderController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const result = await OrderService.createOrder(userId, req.body);
      return ApiResponse.created(res, result, "Tạo đơn hàng thành công");
    } catch (error) {
      next(error);
    }
  }
}
```

### 3.4. Routes (`<module>.routes.ts`)
```typescript
import { Router } from "express";
import { OrderController } from "./order.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createOrderSchema } from "./order.schema";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createOrderSchema),
  OrderController.create
);

export default router;
```

---

## 4. XỬ LÝ LỖI VÀ BẢO MẬT
- Luôn truyền lỗi phát sinh vào `next(error)` để Middleware xử lý lỗi tập trung (`error.middleware.ts`) tiếp nhận.
- Dùng `ApiError.badRequest()`, `ApiError.unauthorized()`, `ApiError.forbidden()`, `ApiError.notFound()`.
- Tuyệt đối không để lộ thông tin stack trace hoặc chi tiết SQL raw ra response của client.

