"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Receipt,
  FileQuestion,
  MessagesSquare,
  Users,
  History,
  Settings,
  Search,
  Bell,
  ExternalLink,
  LogOut,
  RefreshCw,
  FolderGit2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard tổng quan",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/admin/tools",
      label: "Quản lý Tool & Media",
      icon: Package,
    },
    {
      href: "/admin/orders",
      label: "Đơn hàng & Duyệt",
      icon: Receipt,
      badge: "3 chờ duyệt",
      badgeColor: "bg-blue-100 text-blue-700 font-semibold",
    },
    {
      href: "/admin/requests",
      label: "Yêu cầu & Báo giá",
      icon: FileQuestion,
      badge: "2 mới",
      badgeColor: "bg-emerald-100 text-emerald-800 font-semibold",
    },
    {
      href: "/admin/requests?tab=projects",
      label: "Dự án & Tiến độ",
      icon: FolderGit2,
    },
    {
      href: "/admin/chats",
      label: "Chat Realtime",
      icon: MessagesSquare,
      badge: "5",
      badgeColor: "bg-blue-600 text-white font-bold",
    },
    {
      href: "/admin/customers",
      label: "Khách hàng & Hội thoại",
      icon: Users,
    },
    {
      href: "/admin/logs",
      label: "Nhật ký (Audit Logs)",
      icon: History,
    },
    {
      href: "/admin/settings",
      label: "Cấu hình & Telegram",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-800 flex antialiased">
      {/* 1. FIXED LEFT SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200/80 z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo & Status Brand Header */}
          <div className="p-4 bg-white border-b border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-[#004ac6] flex items-center justify-center text-white font-heading text-sm font-extrabold shadow-sm">
                  A
                </div>
                <span className="font-heading text-sm font-bold tracking-tight text-slate-900">
                  AutoTool Admin
                </span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium border border-slate-200">
                v2.6 Enterprise
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] text-emerald-600 font-medium">
                Telegram Bot Connected
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-2.5 py-3 space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href.split("?")[0]));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group",
                    isActive
                      ? "bg-blue-50 text-[#004ac6] font-semibold shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-colors",
                        isActive
                          ? "text-[#004ac6]"
                          : "text-slate-400 group-hover:text-slate-600"
                      )}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={cn(
                        "font-mono text-[10px] px-1.5 py-0.5 rounded-full",
                        item.badgeColor
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Logout Bottom Bar */}
        <div className="p-3 bg-slate-50 m-2 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#004ac6] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                A
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-heading text-xs font-bold text-slate-900 truncate">
                    Alex Dev
                  </span>
                  <span title="Telegram Synced">
                    <RefreshCw className="w-3 h-3 text-emerald-600" />
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-500 truncate uppercase">
                  ADMIN & FOUNDER
                </span>
              </div>
            </div>

            <button
              type="button"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-colors"
              title="Đăng xuất quản trị"
              onClick={() => {
                if (confirm("Bạn có muốn đăng xuất khỏi trang Admin?")) {
                  window.location.href = "/login";
                }
              }}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTAINER (Shifted by 64px = 16rem for sidebar) */}
      <div className="pl-64 flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Fixed Top Header */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 z-40 flex items-center justify-between px-6 shadow-xs">
          {/* Center-Left Search Omnibar */}
          <div className="flex-1 max-w-lg">
            <div className="relative flex items-center w-full">
              <Search className="w-4 h-4 absolute left-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm đơn hàng, license key, yêu cầu, mã giao dịch... (Ctrl+K)"
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs rounded-lg outline-none focus:bg-white focus:border-[#004ac6] focus:ring-1 focus:ring-[#004ac6] transition-all"
              />
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-4">
            {/* System Webhook Telemetry */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 font-mono text-[11px] text-slate-600 border border-slate-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Webhook 200 OK</span>
              <span className="text-slate-300">|</span>
              <span>Latency: 24ms</span>
            </div>

            {/* Notification Bell */}
            <button
              type="button"
              className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Thông báo hệ thống"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </button>

            {/* External Live Store View Link */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#004ac6] hover:bg-[#2563eb] text-white rounded-lg font-heading text-xs font-semibold shadow-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Xem Web Khách Hàng (Live Store)</span>
            </Link>

            {/* Avatar Pill */}
            <div className="w-8 h-8 rounded-full bg-[#004ac6] text-white font-bold text-xs flex items-center justify-center ring-2 ring-blue-100">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="w-full pt-16 flex-1 bg-[#f8f9ff] flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
