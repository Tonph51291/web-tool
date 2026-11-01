import React from "react";
import Link from "next/link";
import { formatVND } from "@/lib/utils";
import { Monitor, Laptop, Terminal, ArrowRight, Box } from "lucide-react";
import { ToolItem } from "@/mocks/mockTools";

export function ToolProductCard({ tool }: { tool: ToolItem }) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-cyan-500/50 content-auto">
      {/* 1. Screenshot Frame (Top 45%) */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <img
          src={tool.screenshotUrl}
          alt={tool.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Category Pill */}
        <span className="absolute top-3 left-3 rounded-md bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-cyan-800">
          {tool.categoryName}
        </span>

        {/* Version Pill */}
        <span className="absolute top-3 right-3 rounded-md bg-slate-900/80 backdrop-blur-md px-2 py-0.5 text-[11px] font-mono font-medium text-slate-300 border border-slate-700">
          {tool.version}
        </span>
      </div>

      {/* 2. Body Information */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-mono text-[11px] text-slate-400">{tool.downloadsCount}+ lượt tải</span>
            <span className="font-mono text-[11px] text-amber-500 font-bold">★ {tool.rating}</span>
          </div>

          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-cyan-400 line-clamp-1">
            <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
          </h3>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {tool.shortDescription}
          </p>

          {/* Feature Badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tool.features.slice(0, 3).map((feat, index) => (
              <span
                key={index}
                className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                {feat}
              </span>
            ))}
          </div>

          {/* Supported OS */}
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span className="font-medium">Hỗ trợ:</span>
            {tool.supportedOs.includes("windows") && (
              <span className="inline-flex items-center gap-1 rounded bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 border border-slate-200 dark:border-slate-700">
                <Monitor className="w-3.5 h-3.5 text-blue-500" /> Windows
              </span>
            )}
            {tool.supportedOs.includes("macos") && (
              <span className="inline-flex items-center gap-1 rounded bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 border border-slate-200 dark:border-slate-700">
                <Laptop className="w-3.5 h-3.5 text-slate-400" /> macOS
              </span>
            )}
            {tool.supportedOs.includes("linux") && (
              <span className="inline-flex items-center gap-1 rounded bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 border border-slate-200 dark:border-slate-700">
                <Terminal className="w-3.5 h-3.5 text-amber-500" /> Linux
              </span>
            )}
          </div>
        </div>

        {/* 3. Footer Pricing & Dual Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {formatVND(tool.basePrice)}
              </span>
              <span className="text-xs text-slate-400 ml-1">/tháng</span>
            </div>

            <div className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              ≈ ${tool.baseUsdtPrice.toFixed(2)} USDT
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/tools/${tool.slug}`}
              className="py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors text-center inline-flex items-center justify-center gap-1"
            >
              Chi tiết
            </Link>
            <Link
              href={`/orders/new?tool=${tool.slug}`}
              className="py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-sm text-center inline-flex items-center justify-center gap-1"
            >
              Mua ngay <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

