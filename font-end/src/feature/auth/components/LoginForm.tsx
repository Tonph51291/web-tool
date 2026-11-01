"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginSchema, LoginFormValues } from "../schemas/auth.schema";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { ErrorMessage } from "@/components/shared/ErrorMessage";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setServerError(null);
      await login(values);
      router.push(redirectUrl);
      router.refresh();
    } catch (err: any) {
      setServerError(err.response?.data?.message || err.message || "Đăng nhập không thành công");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Đăng Nhập Tài Khoản</CardTitle>
        <CardDescription>Nhập email và mật khẩu của bạn để truy cập hệ thống</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <ErrorMessage message={serverError || undefined} />

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
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Đăng Nhập
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-slate-500 py-4">
        Chưa có tài khoản?{" "}
        <Link href="/register" className="ml-1 text-blue-600 font-semibold hover:underline">
          Đăng ký ngay
        </Link>
      </CardFooter>
    </Card>
  );
}

