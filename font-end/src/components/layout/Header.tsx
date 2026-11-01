"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/Button";
import {
  Layers,
  ShoppingBag,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  FileText,
  Code2,
  ChevronRight,
  Globe,
  Coins,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<"VND" | "USDT">("VND");
  const [locale, setLocale] = useState<"VI" | "EN">("VI");

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    {
      href: "/tools",
      label: "Kho Tool đóng gói",
      badge: "18+ Tools",
    },
    { href: "/request-tool", label: "Đặt làm Tool riêng" },
    { href: "/orders", label: "Đơn mua & License", authRequired: false },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-200">
      <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                  AutoTool<span className="text-cyan-600 dark:text-cyan-400">.dev</span>
                </span>
              </div>
              <span className="font-mono text-[11px] font-semibold text-slate-500 tracking-tight">
                Packaged Store & Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              if (link.authRequired && !isAuthenticated) return null;
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "py-1 transition-colors flex items-center gap-1.5",
                    isActive
                      ? "text-blue-600 dark:text-cyan-400 font-semibold"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  )}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400 text-xs px-2 py-0.5 rounded-full font-semibold border border-blue-200/50 dark:border-cyan-800/50">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => setLocale(locale === "VI" ? "EN" : "VI")}
            className="hidden sm:inline-flex items-center px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors cursor-pointer select-none"
            title="Đổi ngôn ngữ VI / EN"
          >
            <span className="mr-1">{locale === "VI" ? "🇻🇳" : "🇬🇧"}</span>
            <span className="font-semibold text-blue-600 dark:text-cyan-400">{locale}</span>
          </button>

          {/* Currency Switcher */}
          <button
            type="button"
            onClick={() => setCurrency(currency === "VND" ? "USDT" : "VND")}
            className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors cursor-pointer select-none"
            title="Chuyển hiển thị tiền tệ"
          >
            <span className={currency === "VND" ? "text-emerald-600 font-bold mr-1" : "text-cyan-500 font-mono font-bold mr-1"}>
              {currency}
            </span>
          </button>

          {/* User Auth state */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="secondary" size="sm" className="hidden md:inline-flex gap-1.5 h-9">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    Admin
                  </Button>
                </Link>
              )}

              <Link
                href="/orders"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                <UserIcon className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>{user?.name || "Tài khoản"}</span>
              </Link>

              <Button variant="ghost" size="sm" onClick={() => logout()} title="Đăng xuất" className="h-9 px-2">
                <LogOut className="w-4 h-4 text-slate-400 hover:text-red-500" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 px-3 py-2"
              >
                Đăng nhập
              </Link>
            </div>
          )}

          {/* Primary CTA */}
          <Link href="/tools">
            <Button size="sm" className="gap-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-semibold shadow-sm h-10 px-4">
              <ShoppingBag className="w-4 h-4" />
              <span>Khám phá Tool</span>
            </Button>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800/60"
            >
              <span>{link.label}</span>
              {link.badge ? (
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                  {link.badge}
                </span>
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </Link>
          ))}

          <div className="pt-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLocale(locale === "VI" ? "EN" : "VI")}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
              >
                {locale === "VI" ? "🇻🇳 Tiếng Việt" : "🇬🇧 English"}
              </button>
              <button
                onClick={() => setCurrency(currency === "VND" ? "USDT" : "VND")}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono font-semibold"
              >
                {currency}
              </button>
            </div>

            {isAdmin && (
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-xs font-semibold text-amber-500 underline">Vào trang Admin</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
