import { z } from 'zod';
import { PaymentMethod, PaymentStatus } from '@prisma/client';

export const submitProofSchema = z.object({
  orderId: z.string().uuid('ID đơn hàng không hợp lệ'),
  paymentMethod: z.nativeEnum(PaymentMethod, {
    errorMap: () => ({ message: 'Phương thức thanh toán phải là BANK_TRANSFER hoặc USDT' }),
  }),
  transactionRef: z.string().trim().max(100).optional(),
  amountReported: z.coerce.number().int().positive().optional(),
});

export const reviewProofSchema = z.object({
  status: z.enum([PaymentStatus.VERIFIED, PaymentStatus.REJECTED], {
    errorMap: () => ({ message: 'Trạng thái đối soát phải là VERIFIED hoặc REJECTED' }),
  }),
  adminNote: z.string().trim().max(1000).optional(),
});

export type SubmitProofInput = z.infer<typeof submitProofSchema>;
export type ReviewProofInput = z.infer<typeof reviewProofSchema>;
