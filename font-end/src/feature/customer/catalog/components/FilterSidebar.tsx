"use client";

import React from "react";
import { SlidersHorizontal, RotateCcw, Monitor, Laptop, Terminal } from "lucide-react";
import { MOCK_CATEGORIES } from "@/mocks/mockCategories";

export interface FilterState {
  categories: string[];
  os: string[];
  maxPrice: number;
  licensePlan: string;
}

export function FilterSidebar({
  filter,
  onChange,
  onReset,
}: {
  filter: FilterState;
  onChange: (newFilter: FilterState) => void;
  onReset: () => void;
}) {
  const toggleCategory = (catId: string) => {
    const exists = filter.categories.includes(catId);
    const updated = exists
      ? filter.categories.filter((c) => c !== catId)
      : [...filter.categories, catId];
    onChange({ ...filter, categories: updated });
  };

  const toggleOs = (osVal: string) => {
    const exists = filter.os.includes(osVal);
    const updated = exists
      ? filter.os.filter((o) => o !== osVal)
      : [...filter.os, osVal];
    onChange({ ...filter, os: updated });
  };

  return (
    <aside className="w-full bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 sticky top-24">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
          <span className="font-heading text-sm font-bold text-slate-900 dark:text-white">Bộ lọc tìm kiếm</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-mono text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          type="button"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Đặt lại
        </button>
      </div>

      {/* Category Checkboxes */}
      <div className="space-y-3 pb-5 border-b border-slate-100 dark:border-slate-800">
        <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
          Phân loại danh mục
        </label>
        <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          {MOCK_CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
            const isChecked = filter.categories.includes(cat.id);
            return (
              <label
                key={cat.id}
                className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(cat.id)}
                    className="w-4 h-4 rounded text-blue-600 dark:text-cyan-500 focus:ring-blue-500 border-slate-300 dark:border-slate-700"
                  />
                  <span>{cat.name}</span>
                </span>
                <span className="font-mono text-[11px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded font-medium">
                  {cat.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Supported Platform */}
      <div className="space-y-3 pb-5 border-b border-slate-100 dark:border-slate-800">
        <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
          Nền tảng hỗ trợ (HĐH)
        </label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 cursor-pointer border border-slate-200/60 dark:border-slate-700">
            <input
              type="checkbox"
              checked={filter.os.includes("windows")}
              onChange={() => toggleOs("windows")}
              className="w-3.5 h-3.5 rounded text-blue-600 border-slate-300"
            />
            <Monitor className="w-3.5 h-3.5 text-blue-500" />
            <span>Windows</span>
          </label>

          <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 cursor-pointer border border-slate-200/60 dark:border-slate-700">
            <input
              type="checkbox"
              checked={filter.os.includes("macos")}
              onChange={() => toggleOs("macos")}
              className="w-3.5 h-3.5 rounded text-blue-600 border-slate-300"
            />
            <Laptop className="w-3.5 h-3.5 text-slate-400" />
            <span>macOS</span>
          </label>

          <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 cursor-pointer border border-slate-200/60 dark:border-slate-700 col-span-2">
            <input
              type="checkbox"
              checked={filter.os.includes("linux")}
              onChange={() => toggleOs("linux")}
              className="w-3.5 h-3.5 rounded text-blue-600 border-slate-300"
            />
            <Terminal className="w-3.5 h-3.5 text-amber-500" />
            <span>Linux / Docker CLI</span>
          </label>
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Khoảng giá tối đa
          </label>
          <span className="font-mono text-[11px] text-blue-600 dark:text-cyan-400 font-semibold">
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(filter.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="200000"
          max="10000000"
          step="200000"
          value={filter.maxPrice}
          onChange={(e) => onChange({ ...filter, maxPrice: Number(e.target.value) })}
          className="w-full accent-blue-600 dark:accent-cyan-500 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-400">
          <span>200k</span>
          <span>10 triệu VNĐ</span>
        </div>
      </div>

      {/* License Type */}
      <div className="space-y-3 pb-2">
        <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
          Hình thức bản quyền
        </label>
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <label className="flex items-center gap-2.5 cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800">
            <input
              type="radio"
              name="license_plan"
              checked={filter.licensePlan === "all"}
              onChange={() => onChange({ ...filter, licensePlan: "all" })}
              className="w-4 h-4 text-blue-600"
            />
            <span>Tất cả hình thức</span>
          </label>

          <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800">
            <span className="flex items-center gap-2.5">
              <input
                type="radio"
                name="license_plan"
                checked={filter.licensePlan === "annual"}
                onChange={() => onChange({ ...filter, licensePlan: "annual" })}
                className="w-4 h-4 text-blue-600"
              />
              <span>Gói 1 năm (Annual)</span>
            </span>
            <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
              -25%
            </span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800">
            <input
              type="radio"
              name="license_plan"
              checked={filter.licensePlan === "lifetime"}
              onChange={() => onChange({ ...filter, licensePlan: "lifetime" })}
              className="w-4 h-4 text-blue-600"
            />
            <span>Bản quyền vĩnh viễn</span>
          </label>
        </div>
      </div>

      {/* License Server Status Widget */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>LICENSE SERVER STATUS</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Hệ thống cấp License Key trực tuyến 24/7. Nhận mã trong 3-5 phút qua VietQR & USDT.
        </p>
      </div>
    </aside>
  );
}

