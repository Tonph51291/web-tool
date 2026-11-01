import { RegisterForm } from "@/feature/auth";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Đăng Ký Tài Khoản | AutoTool.dev",
  description: "Tạo tài khoản để đặt mua và lưu trữ License Key tự động",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <Suspense fallback={<div className="text-slate-400 text-sm">Đang tải biểu mẫu...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
