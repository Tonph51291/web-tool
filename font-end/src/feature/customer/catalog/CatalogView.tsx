"use client";

import React, { useState, useMemo } from "react";
import { CatalogBreadcrumb } from "./components/CatalogBreadcrumb";
import { FilterSidebar, FilterState } from "./components/FilterSidebar";
import { SearchOmnibar } from "./components/SearchOmnibar";
import { ToolProductCard } from "./components/ToolProductCard";
import { MOCK_TOOLS } from "@/mocks/mockTools";
import { EmptyState } from "@/components/shared/EmptyState";

export function CatalogView() {
  const [filter, setFilter] = useState<FilterState>({
    categories: [],
    os: [],
    maxPrice: 10000000,
    licensePlan: "all",
  });

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [sort, setSort] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleResetFilter = () => {
    setFilter({
      categories: [],
      os: [],
      maxPrice: 10000000,
      licensePlan: "all",
    });
    setQuery("");
    setActiveTag("all");
  };

  // Filtered & Sorted Tools
  const filteredTools = useMemo(() => {
    return MOCK_TOOLS.filter((tool) => {
      // Query match
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchName = tool.name.toLowerCase().includes(q);
        const matchDesc = tool.shortDescription.toLowerCase().includes(q);
        if (!matchName && !matchDesc) return false;
      }

      // Categories
      if (filter.categories.length > 0 && !filter.categories.includes(tool.categoryId)) {
        return false;
      }

      // OS
      if (filter.os.length > 0) {
        const hasOs = filter.os.some((os) => tool.supportedOs.includes(os as any));
        if (!hasOs) return false;
      }

      // Price
      if (tool.basePrice > filter.maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sort === "popular") return b.downloadsCount - a.downloadsCount;
      if (sort === "price_asc") return a.basePrice - b.basePrice;
      if (sort === "price_desc") return b.basePrice - a.basePrice;
      return 0;
    });
  }, [query, filter, sort]);

  return (
    <div className="w-full flex flex-col">
      <CatalogBreadcrumb />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-700 dark:text-cyan-400 uppercase tracking-widest font-semibold bg-blue-50 dark:bg-cyan-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-cyan-800 mb-2">
            PACKAGED SOFTWARE STORE
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Kho Phần Mềm Tự Động Hóa & Tool Đóng Gói Sẵn
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Tuyển tập phần mềm chuyên dụng, kiểm thử bảo mật, cấp License Key kích hoạt tự động và cập nhật định kỳ. Tải bộ cài đặt ngay lập tức và sử dụng mà không cần biết viết mã.
          </p>
        </div>

        {/* 2-Column Grid Workstation (Filter Sidebar + Products) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <FilterSidebar filter={filter} onChange={setFilter} onReset={handleResetFilter} />
          </div>

          {/* Right Main Grid */}
          <div className="lg:col-span-9 space-y-6">
            <SearchOmnibar
              query={query}
              onQueryChange={setQuery}
              activeTag={activeTag}
              onTagChange={setActiveTag}
              sort={sort}
              onSortChange={setSort}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalResults={filteredTools.length}
            />

            {filteredTools.length === 0 ? (
              <EmptyState
                title="Không tìm thấy phần mềm phù hợp"
                description="Hãy thử thay đổi từ khóa tìm kiếm hoặc bấm đặt lại bộ lọc để xem toàn bộ công cụ."
                actionLabel="Đặt lại bộ lọc"
                onAction={handleResetFilter}
              />
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {filteredTools.map((tool) => (
                  <ToolProductCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
