import { z } from 'zod';
import { OrderStatus } from '@prisma/client';

export const createOrderSchema = z
  .object({
    toolId: z.string().uuid('ID tool không hợp lệ'),
    packageId: z.string().uuid('ID gói không hợp lệ'),
    note: z.string().max(500, 'Ghi chú tối đa 500 ký tự').optional(),
  })
  .strict(); // Strict prevents any unwanted injected fields like amount or price

export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus, {
    errorMap: () => ({ message: 'Trạng thái đơn hàng không hợp lệ' }),
  }),
  keyDelivered: z.string().optional(),
  note: z.string().max(1000).optional(),
});

export const orderQuerySchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type OrderQueryInput = z.infer<typeof orderQuerySchema>;
