import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Địa chỉ email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Họ và tên tối thiểu 2 ký tự"),
  email: z.string().trim().email("Địa chỉ email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

