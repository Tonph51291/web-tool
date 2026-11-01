---
name: tool-store-payment-crypto-bank
description: >-
  Kỹ năng và quy chuẩn triển khai module thanh toán: Chuyển khoản ngân hàng & USDT TRC20,
  sinh mã QR, chốt tỷ giá, xác thực mã TxID, xử lý ảnh bill qua Sharp WebP, quy trình Admin duyệt
  đơn và Transaction trong Database.
---

# Kỹ Năng Xử Lý Thanh Toán (Ngân Hàng & USDT TRC20)

Kỹ năng này cung cấp các hướng dẫn chi tiết về bảo mật, logic chốt giá và quy trình phê duyệt thanh toán cho hệ thống.

---

## 1. NGUYÊN TẮC BẢO MẬT THANH TOÁN

1. **Tuyệt đối không tin tưởng client:**
   - Số tiền cần chuyển (`amount`), loại tiền tệ (`currency`), và tỷ giá quy đổi (`exchange_rate`) được Backend chốt và ghi cố định tại thời điểm tạo bản ghi `Payment`.
   - Client không được phép tự ý thay đổi số tiền phải nộp.
2. **Chống trùng lặp mã giao dịch (TxID Deduplication):**
   - Một mã `transaction_reference` (TxID) chỉ được phép sử dụng cho duy nhất một bản ghi thanh toán.
   - Trước khi nhận TxID, Backend phải query kiểm tra trong cơ sở dữ liệu.
3. **An toàn xử lý hình ảnh biên lai chuyển khoản:**
   - Không lưu file gốc trực tiếp vào disk.
   - Sử dụng `multer` chế độ `memoryStorage()`, sau đó dùng `sharp` giải mã pixel và nén lại thành file định dạng `.webp`.
   - Đặt tên file ngẫu nhiên theo chuẩn UUIDv4, loại bỏ toàn bộ EXIF metadata nguy hại.

---

## 2. PHƯƠNG THỨC USDT TRC20

### 2.1. Cấu hình
- **Mạng:** TRON Mainnet (`TRC20`).
- **Địa chỉ ví nhận tiền:** Đọc từ biến môi trường `USDT_TRON_RECEIVE_ADDRESS`.
- **Mã QR:**
  - Chỉ mã hóa chuỗi địa chỉ ví nhận tiền: `value={receiveAddress}`.
  - Sử dụng thư viện `qrcode.react`:
    ```tsx
    import { QRCodeSVG } from "qrcode.react";

    <QRCodeSVG value={receiveAddress} size={220} level="M" />
    ```
  - Khách hàng tự quét và nhập số lượng USDT tương ứng vào ứng dụng ví cá nhân (Trust Wallet, TronLink, Binance,...).

### 2.2. Kiểm tra định dạng TxID (Backend Validator)
```typescript
const txIdRegex = /^[a-fA-F0-9]{64}$/;
if (!txIdRegex.test(txId)) {
  throw ApiError.badRequest("Mã giao dịch (TxID) TRON không đúng định dạng (phải là chuỗi hex 64 ký tự)");
}
```

---

## 3. QUY TRÌNH ADMIN ĐỐI SOÁT & PHÊ DUYỆT (DATABASE TRANSACTION)

Khi Admin kiểm tra trên App Ngân hàng hoặc TRONSCAN (`https://tronscan.org/#/transaction/<TxID>`):
- Nếu tiền đã về đúng số lượng và ví: Admin bấm **Xác nhận (CONFIRMED)**.
- Khi đó, Backend bắt buộc thực thi trong một `prisma.$transaction`:

```typescript
export class AdminPaymentService {
  static async confirmPayment(paymentId: string, adminId: string) {
    return await prisma.$transaction(async (tx) => {
      // 1. Khóa và lấy thông tin payment
      const payment = await tx.payment.findUnique({
        where: { id: paymentId },
        include: { order: true },
      });

      if (!payment) {
        throw ApiError.notFound("Không tìm thấy giao dịch thanh toán");
      }

      if (payment.status !== "SUBMITTED") {
        throw ApiError.badRequest("Chỉ có thể xác nhận các giao dịch ở trạng thái SUBMITTED");
      }

      // 2. Cập nhật Payment sang CONFIRMED
      const updatedPayment = await tx.payment.update({
        where: { id: paymentId },
        data: {
          status: "CONFIRMED",
          reviewedBy: adminId,
          reviewedAt: new Date(),
        },
      });

      // 3. Cập nhật Order sang PAID
      await tx.order.update({
        where: { id: payment.orderId },
        data: {
          status: "PAID",
          paidAt: new Date(),
        },
      });

      // 4. Ghi nhận log lịch sử
      await tx.orderStatusHistory.create({
        data: {
          orderId: payment.orderId,
          actorId: adminId,
          fromStatus: payment.order.status,
          toStatus: "PAID",
          note: `Admin xác nhận thanh toán qua ${payment.method} (Mã GD: ${payment.transactionReference || 'N/A'})`,
        },
      });

      return updatedPayment;
    });
  }
}
```

---

## 4. TỪ CHỐI GIAO DỊCH (REJECT PAYMENT)
- Nếu giao dịch không hợp lệ, Admin ghi rõ `rejection_reason` (ví dụ: *Chuyển thiếu tiền*, *Sai nội dung chuyển khoản*, *TxID không tìm thấy trên TRONSCAN*).
- Cập nhật Payment sang `REJECTED`.
- Trạng thái Order vẫn giữ nguyên `PENDING_PAYMENT` để khách có thể gửi lại TxID mới hoặc chuyển phương thức thanh toán khác.
