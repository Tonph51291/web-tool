"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_TOOLS } from "@/mocks/mockTools";
import { formatVND } from "@/lib/utils";
import { ArrowRight, Monitor, Laptop, Box, Terminal } from "lucide-react";

export function FeaturedTools() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Tất cả (6)" },
    { id: "crawler", label: "Crawl Data" },
    { id: "marketing", label: "Marketing & Social" },
    { id: "crypto", label: "Crypto" },
    { id: "automation", label: "Automation" },
    { id: "dev", label: "Tiện ích Dev" },
  ];

  const filteredTools = selectedCategory === "all"
    ? MOCK_TOOLS
    : MOCK_TOOLS.filter((t) => t.categoryId === selectedCategory);

  return (
    <section className="w-full bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 py-20" id="tool-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-700 dark:text-cyan-400 uppercase tracking-widest font-semibold mb-2 bg-blue-50 dark:bg-cyan-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-cyan-800">
              <Box className="w-3.5 h-3.5 text-cyan-500" /> PHẦN MỀM ĐÓNG GÓI HOÀN CHỈNH
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              KHO CÔNG CỤ PHẦN MỀM ĐÓNG GÓI SẴN SÀNG VẬN HÀNH
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mt-2">
              Mỗi công cụ đều được kiểm thử kỹ lưỡng, đóng gói cài đặt chuẩn và cung cấp License Key sử dụng ngay lập tức mà không cần biết viết mã.
            </p>
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-cyan-400 hover:text-blue-700 transition-colors group shrink-0"
          >
            <span>Xem kho toàn bộ 18+ Tool</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-blue-600 dark:bg-cyan-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group hover:border-cyan-500/50"
            >
              {/* Top 45% UI Screenshot Frame */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950 border-b border-slate-100 dark:border-slate-800">
                <img
                  src={tool.screenshotUrl}
                  alt={tool.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-white/95 dark:bg-slate-900/90 backdrop-blur-md text-blue-700 dark:text-cyan-400 font-mono text-[11px] uppercase font-bold shadow-xs border border-white/50 dark:border-slate-700">
                  {tool.categoryName}
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-white font-mono text-[11px] font-semibold border border-slate-700">
                  {tool.version}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                    <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mt-2 leading-relaxed">
                    {tool.shortDescription}
                  </p>

                  {/* Feature Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {tool.features.slice(0, 3).map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Supported OS Icons */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-4">
                    <span className="font-medium">Hỗ trợ:</span>
                    {tool.supportedOs.includes("windows") && (
                      <span className="inline-flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        <Monitor className="w-3.5 h-3.5 text-blue-500" /> Windows
                      </span>
                    )}
                    {tool.supportedOs.includes("macos") && (
                      <span className="inline-flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        <Laptop className="w-3.5 h-3.5 text-slate-400" /> macOS
                      </span>
                    )}
                    {tool.supportedOs.includes("linux") && (
                      <span className="inline-flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        <Terminal className="w-3.5 h-3.5 text-amber-500" /> Linux
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer Pricing & Actions */}
                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                        {formatVND(tool.basePrice)}
                      </span>
                      <span className="text-xs text-slate-500 ml-1">/tháng</span>
                    </div>

                    <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      ≈ ${tool.baseUsdtPrice.toFixed(2)} USDT
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors text-center"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

