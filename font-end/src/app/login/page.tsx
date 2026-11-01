import { LoginForm } from "@/feature/auth";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Đăng Nhập Tài Khoản | AutoTool.dev",
  description: "Đăng nhập để xem License Key và quản lý đơn hàng phần mềm",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <Suspense fallback={<div className="text-slate-400 text-sm">Đang tải biểu mẫu...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
