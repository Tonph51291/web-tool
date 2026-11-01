"use client";

import React from "react";
import { Search, LayoutGrid, List } from "lucide-react";

export function SearchOmnibar({
  query,
  onQueryChange,
  activeTag,
  onTagChange,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalResults,
}: {
  query: string;
  onQueryChange: (q: string) => void;
  activeTag: string;
  onTagChange: (tag: string) => void;
  sort: string;
  onSortChange: (sort: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (m: "grid" | "list") => void;
  totalResults: number;
}) {
  const quickTags = [
    { id: "all", label: "Tất cả" },
    { id: "bestseller", label: "🔥 Bán chạy nhất" },
    { id: "newest", label: "⚡ Mới cập nhật" },
    { id: "trial", label: "💡 Bản dùng thử Free" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      {/* Large Omnibar Search */}
      <div className="relative flex items-center">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Tìm kiếm công cụ tự động hóa, scraper, bot, tiện ích..."
          className="w-full pl-12 pr-28 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-600 dark:focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
        />
        <div className="absolute right-3.5 hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-400">
          <span>⌘</span>
          <span>K</span>
        </div>
      </div>

      {/* Quick Filter Tags & Layout Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        {/* Quick Tags */}
        <div className="flex flex-wrap items-center gap-2">
          {quickTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagChange(tag.id)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-colors ${
                activeTag === tag.id
                  ? "bg-blue-600 dark:bg-cyan-600 text-white"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Controls: Sort Dropdown & Grid/List Mode */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span className="hidden xl:inline-block font-mono text-[11px] text-slate-500">
            Hiển thị <span className="font-bold text-slate-900 dark:text-white">{totalResults}</span> công cụ
          </span>

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-600 cursor-pointer"
          >
            <option value="newest">Mới nhất</option>
            <option value="popular">Phổ biến nhất</option>
            <option value="price_asc">Giá tăng dần</option>
            <option value="price_desc">Giá giảm dần</option>
          </select>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-cyan-400 shadow-xs"
                  : "text-slate-400 hover:text-slate-700"
              }`}
              title="Xem dạng Lưới (Grid)"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "list"
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-cyan-400 shadow-xs"
                  : "text-slate-400 hover:text-slate-700"
              }`}
              title="Xem dạng Danh sách (List)"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

