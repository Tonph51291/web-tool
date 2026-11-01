import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().trim().email('Địa chỉ email không hợp lệ').toLowerCase(),
  password: z
    .string()
    .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự')
    .max(100, 'Mật khẩu quá dài'),
  name: z.string().trim().min(2, 'Tên người dùng phải có ít nhất 2 ký tự').max(50),
});

export const loginSchema = z.object({
  email: z.string().trim().email('Địa chỉ email không hợp lệ').toLowerCase(),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
