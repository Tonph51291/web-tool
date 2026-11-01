"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Tổng Quan", icon: LayoutDashboard, exact: true },
    { href: "/admin/orders", label: "Quản Lý Đơn Hàng", icon: ShoppingBag },
    { href: "/admin/tools", label: "Quản Lý Sản Phẩm", icon: Package },
    { href: "/admin/payments", label: "Đối Soát Thanh Toán", icon: CreditCard },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3">
            Bảng Quản Trị
          </span>
          <nav className="mt-3 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại Cửa Hàng
        </Link>
      </div>
    </aside>
  );
}

