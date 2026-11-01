import React from "react";
import Link from "next/link";
import { ArrowLeft, Star, Download, ShieldCheck, Zap } from "lucide-react";
import { ToolItem } from "@/mocks/mockTools";

export function ToolHeader({ tool }: { tool: ToolItem }) {
  return (
    <div className="space-y-4">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Quay lại kho công cụ</span>
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-cyan-950/60 text-blue-700 dark:text-cyan-400 font-mono text-xs font-bold uppercase border border-blue-200/60 dark:border-cyan-800">
              {tool.categoryName}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-medium">
              {tool.version}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 text-xs font-medium border border-emerald-200 dark:border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Đang phát hành
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight">
            {tool.name}
          </h1>
        </div>

        {/* Rating and Downloads Count */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1 text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold">{tool.rating}</span>
            <span className="text-slate-400">({tool.reviewsCount})</span>
          </div>

          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <Download className="w-4 h-4 text-blue-500" />
            <span>{tool.downloadsCount}+ lượt tải</span>
          </div>
        </div>
      </div>
    </div>
  );
}

