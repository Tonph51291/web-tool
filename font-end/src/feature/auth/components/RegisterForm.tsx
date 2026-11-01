"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerSchema, RegisterFormValues } from "../schemas/auth.schema";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { ErrorMessage } from "@/components/shared/ErrorMessage";

export function RegisterForm() {
  const router = useRouter();
  const { register: registerAuth } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setServerError(null);
      await registerAuth(values);
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setServerError(err.response?.data?.message || err.message || "Đăng ký không thành công");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Đăng Ký Tài Khoản</CardTitle>
        <CardDescription>Tạo tài khoản để đặt mua và lưu trữ license key phần mềm</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <ErrorMessage message={serverError || undefined} />

          <Input
            label="Họ và tên"
            placeholder="Nguyễn Văn A"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Email"
            type="email"
            placeholder="name@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Mật khẩu"
            type="password"
            placeholder="Tối thiểu 6 ký tự"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Tạo Tài Khoản
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-slate-500 py-4">
        Đã có tài khoản?{" "}
        <Link href="/login" className="ml-1 text-blue-600 font-semibold hover:underline">
          Đăng nhập ngay
        </Link>
      </CardFooter>
    </Card>
  );
}

