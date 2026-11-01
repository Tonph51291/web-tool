import React from "react";
import Link from "next/link";
import { Home, ShieldCheck, Zap } from "lucide-react";

export function CatalogBreadcrumb() {
  return (
    <section className="w-full bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-slate-500">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 font-medium">
            <Home className="w-3.5 h-3.5" />
            <span>Trang chủ</span>
          </Link>
          <span className="text-slate-300 dark:text-slate-700 select-none">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium">Kho Tool phần mềm đóng gói</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-cyan-950/60 text-blue-700 dark:text-cyan-400 font-mono text-[11px] font-semibold border border-blue-200/60 dark:border-cyan-800 ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            License Key Instant
          </span>
        </nav>

        <div className="flex items-center gap-4 font-mono text-[11px] text-slate-500">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            100% License Chính Hãng
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-slate-600 dark:text-slate-400">
            <Zap className="w-3.5 h-3.5 text-cyan-500" />
            Giao key tự động 3-5 phút
          </span>
        </div>
      </div>
    </section>
  );
}

