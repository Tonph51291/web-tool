import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Shield, Key, Star } from "lucide-react";

export function HeroBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      {/* Background radial gradient & subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top, rgba(6, 182, 212, 0.15), transparent 70%), linear-gradient(to right, rgba(241, 245, 249, 0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(241, 245, 249, 0.6) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 4rem 4rem, 4rem 4rem",
        }}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 relative z-10 flex flex-col items-center text-center">
        {/* Glow Tag Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-950/60 border border-blue-200/80 dark:border-cyan-800/80 text-blue-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs animate-in fade-in duration-500">
          <Zap className="w-4 h-4 text-cyan-500 animate-pulse" />
          <span>NỀN TẢNG PHẦN MỀM ĐÓNG GÓI SẴN - BẢN QUYỀN CHÍNH THỨC</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white max-w-4xl tracking-tight leading-[1.15] mb-6">
          GIẢI PHÁP TỰ ĐỘNG HÓA VÀ CÔNG CỤ{" "}
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
            PHẦN MỀM ĐÓNG GÓI SẴN
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
          Cung cấp hơn 18+ phần mềm công cụ dựng sẵn chất lượng cao cho Crawl Data, Marketing Bot, Crypto Telegram Copier và Tiện ích vận hành tự động. Mua bản quyền nhận License Key tức thì.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all text-sm sm:text-base active:scale-98"
          >
            <span>Xem danh sách Tool</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/request-tool"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold shadow-sm transition-all text-sm sm:text-base"
          >
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            <span>Đặt Viết Tool Theo Yêu Cầu</span>
          </Link>
        </div>

        {/* Key Metrics Strip */}
        <div className="w-full max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-3 p-2 bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-heading font-bold text-slate-900 dark:text-white text-sm sm:text-base">18+ Công cụ</div>
              <div className="text-xs text-slate-500">Chuyên sâu dựng sẵn</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-heading font-bold text-slate-900 dark:text-white text-sm sm:text-base">99.9% Uptime</div>
              <div className="text-xs text-slate-500">Tương thích Win & Mac</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center shrink-0">
              <Key className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-heading font-bold text-slate-900 dark:text-white text-sm sm:text-base">Bàn giao tức thì</div>
              <div className="text-xs text-slate-500">License Key & Setup</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div className="text-left">
              <div className="font-heading font-bold text-slate-900 dark:text-white text-sm sm:text-base">4.9/5 Điểm</div>
              <div className="text-xs text-slate-500">Từ 1.200+ khách hàng</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

