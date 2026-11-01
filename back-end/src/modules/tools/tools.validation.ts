import { z } from 'zod';

export const createPackageItemSchema = z.object({
  name: z.string().min(1, 'Tên gói không được để trống'),
  durationDays: z.number().int().positive().nullable().optional(),
  price: z.number().int().min(0, 'Giá gói không được âm'),
  currency: z.string().default('VND'),
});

export const createToolSchema = z.object({
  name: z.string().min(2, 'Tên tool phải có ít nhất 2 ký tự'),
  slug: z.string().min(2).optional(),
  shortDescription: z.string().min(5, 'Mô tả ngắn tối thiểu 5 ký tự'),
  description: z.string().min(10, 'Mô tả chi tiết tối thiểu 10 ký tự'),
  iconUrl: z.string().url('Icon URL không hợp lệ').optional().or(z.literal('')),
  packages: z.array(createPackageItemSchema).optional(),
});

export const updateToolSchema = z.object({
  name: z.string().min(2).optional(),
  slug: z.string().min(2).optional(),
  shortDescription: z.string().min(5).optional(),
  description: z.string().min(10).optional(),
  iconUrl: z.string().url().optional().or(z.literal('')),
  isActive: z.boolean().optional(),
});

export const createPackageSchema = z.object({
  toolId: z.string().uuid('ID tool không hợp lệ'),
  name: z.string().min(1, 'Tên gói không được để trống'),
  durationDays: z.number().int().positive().nullable().optional(),
  price: z.number().int().min(0, 'Giá gói không được âm'),
  currency: z.string().default('VND'),
});

export const updatePackageSchema = z.object({
  name: z.string().min(1).optional(),
  durationDays: z.number().int().positive().nullable().optional(),
  price: z.number().int().min(0).optional(),
  currency: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type CreateToolInput = z.infer<typeof createToolSchema>;
export type UpdateToolInput = z.infer<typeof updateToolSchema>;
export type CreatePackageInput = z.infer<typeof createPackageSchema>;
export type UpdatePackageInput = z.infer<typeof updatePackageSchema>;
