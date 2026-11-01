"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Table as TableIcon,
  LayoutGrid,
  ExternalLink,
  Edit3,
  MoreVertical,
  Check,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  UploadCloud,
  FileCode,
  Key,
  Layers,
  Sparkles,
} from "lucide-react";
import { MOCK_TOOLS, ToolItem } from "@/mocks/mockTools";
import { cn } from "@/lib/utils";

export function AdminToolsView() {
  const [tools] = useState<ToolItem[]>(MOCK_TOOLS);
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(MOCK_TOOLS[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"general" | "specs" | "pricing">("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Form state for current selected tool editing
  const [formData, setFormData] = useState({
    name: selectedTool?.name || "",
    version: selectedTool?.version || "v3.2.0",
    slug: selectedTool?.slug || "",
    categoryId: selectedTool?.categoryId || "crawler",
    shortDescription: selectedTool?.shortDescription || "",
    description: selectedTool?.description || "",
    isPublished: true,
  });

  const handleSelectTool = (tool: ToolItem) => {
    setSelectedTool(tool);
    setFormData({
      name: tool.name,
      version: tool.version,
      slug: tool.slug,
      categoryId: tool.categoryId,
      shortDescription: tool.shortDescription,
      description: tool.description,
      isPublished: true,
    });
    setIsDrawerOpen(true);
  };

  const handleAddNew = () => {
    const newToolTemplate: ToolItem = {
      id: `tool-${Date.now()}`,
      slug: "new-tool-automation",
      name: "Tool Tự Động Hóa Mới",
      version: "v1.0.0",
      categoryId: "crawler",
      categoryName: "Crawl Data",
      status: "ACTIVE",
      shortDescription: "Mô tả ngắn gọn về giải pháp tự động hóa này...",
      description: "### Tính Năng Nổi Bật\n- Tự động hóa 100% quy trình\n- Tối ưu hiệu năng cao",
      basePrice: 499000,
      baseUsdtPrice: 19.5,
      rating: 5.0,
      reviewsCount: 0,
      downloadsCount: 0,
      supportedOs: ["windows", "linux"],
      packages: [
        { id: "1m", name: "1 Tháng", durationDays: 30, durationText: "30 Ngày", price: 199000, usdtPrice: 8 },
        { id: "1y", name: "1 Năm", durationDays: 365, durationText: "365 Ngày", price: 499000, usdtPrice: 19.5, isPopular: true },
        { id: "life", name: "Vĩnh Viễn", durationDays: null, durationText: "Trọn Đời", price: 1499000, usdtPrice: 59 },
      ],
      screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQHlG2C1i_qqxgPcZZBl3OFJaLLNS1RivnXnqPeDrjWka9TwJMK7x2_A_j-5nkhWYwEbm03Fs3b1J-EAhZiZ-Wqj5IIF-jo2-wAz60nteQZ7kB3T0X_qlhYIEs2gLkUkvGyJAtACfMosfvsdw_TjLV7HXM8P64EyjKWxcWVx7pgeZ8e3akPXqNO9F36Y2TEK4_FxiFa10bDRYsaQGRbHI6b3RVmAt5-YpC_kcSzCTfCVBRbJF_TnyuVQ",
      galleryUrls: [],
      features: ["Auto Crawl", "Proxy Rotate"],
      techSpecs: {
        language: "Python / Node.js",
        ramRequired: "4GB RAM",
        threadsSupported: "50 Threads",
        proxySupport: "HTTP / Socks5",
        licenseType: "Single PC / VPS",
      },
    };
    setSelectedTool(newToolTemplate);
    setFormData({
      name: newToolTemplate.name,
      version: newToolTemplate.version,
      slug: newToolTemplate.slug,
      categoryId: newToolTemplate.categoryId,
      shortDescription: newToolTemplate.shortDescription,
      description: newToolTemplate.description,
      isPublished: false,
    });
    setIsDrawerOpen(true);
  };

  const handleSave = (publish: boolean) => {
    alert(`Đã lưu thành công phần mềm "${formData.name}" (Trạng thái: ${publish ? "PUBLISHED" : "DRAFT"})`);
  };

  return (
    <div className="w-full flex-1 p-6 pb-20">
      {/* 1. TOP BREADCRUMB & CONTEXT HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 mb-1">
            <Link href="/admin" className="hover:text-[#004ac6] transition-colors">
              Admin Hub
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Kho Công cụ</span>
            <span>/</span>
            <span className="text-[#004ac6] font-semibold">Quản lý & Đăng bán</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
            Quản lý & Đăng bán Công cụ
          </h1>
          <p className="text-slate-500 text-xs mt-0.5 max-w-2xl">
            Cấu hình danh mục tool tự động hóa, gói bản quyền linh hoạt, hình ảnh demo thực tế và xuất bản trực tiếp ra Live Store.
          </p>
        </div>

        {/* METRICS QUICK BAR */}
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl shadow-xs border border-slate-200">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg">
            <span className="text-xs text-slate-500">Tổng số:</span>
            <span className="font-mono text-base font-bold text-[#004ac6]">
              {tools.length + 6}
            </span>
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-1.5 px-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-slate-600 font-medium">9 Đang bán</span>
          </div>
          <div className="flex items-center gap-1.5 px-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-xs text-slate-600 font-medium">2 Bản nháp</span>
          </div>
          <div className="flex items-center gap-1.5 px-2">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span className="text-xs text-slate-600 font-medium">1 Đã ẩn</span>
          </div>
        </div>
      </div>

      {/* 2. TOOLBAR: SEARCH & FILTERS & ACTION */}
      <div className="bg-white rounded-xl p-3 shadow-xs border border-slate-200/80 mb-6 flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto flex-1">
          {/* Search box */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên tool, slug URL, ID..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 text-xs text-slate-900 rounded-lg border border-slate-200 outline-none focus:bg-white focus:border-[#004ac6] transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 py-1.5 px-3 rounded-lg border border-slate-200 outline-none cursor-pointer transition-colors"
          >
            <option value="all">Tất cả danh mục (5)</option>
            <option value="crawler">Web Automation & Crawler</option>
            <option value="marketing">Marketing & Social</option>
            <option value="crypto">Crypto & Trading</option>
            <option value="utilities">Developer Utilities</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 py-1.5 px-3 rounded-lg border border-slate-200 outline-none cursor-pointer transition-colors"
          >
            <option value="all">Trạng thái: Tất cả</option>
            <option value="published">PUBLISHED (9)</option>
            <option value="draft">DRAFT (2)</option>
            <option value="hidden">HIDDEN (1)</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={cn(
                "p-1.5 rounded transition-all",
                viewMode === "table" ? "bg-white text-[#004ac6] shadow-xs" : "text-slate-500 hover:text-slate-800"
              )}
              title="Xem dạng bảng"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded transition-all",
                viewMode === "grid" ? "bg-white text-[#004ac6] shadow-xs" : "text-slate-500 hover:text-slate-800"
              )}
              title="Xem dạng lưới"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Primary Create Action */}
        <button
          type="button"
          onClick={handleAddNew}
          className="w-full lg:w-auto inline-flex items-center justify-center gap-1.5 bg-[#004ac6] hover:bg-[#2563eb] text-white px-4 py-2 rounded-lg font-heading text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Thêm Tool Mới</span>
        </button>
      </div>

      {/* 3. DUAL-PANE WORKSPACE: TABLE LIST (LEFT) + PERSISTENT EDIT DRAWER (RIGHT) */}
      <div className="relative flex flex-col xl:flex-row gap-6 items-start">
        {/* LEFT: COMPREHENSIVE DATA TABLE */}
        <div className="w-full xl:flex-1 bg-white rounded-xl shadow-xs border border-slate-200/80 overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#004ac6]" />
              <span className="font-heading text-xs font-bold text-slate-800 uppercase tracking-wider">
                Danh Sách Công Cụ Đang Quản Trị
              </span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">
              Sắp xếp: Mới cập nhật
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Công Cụ & Bản Quyền</th>
                  <th className="py-3 px-3">Danh Mục</th>
                  <th className="py-3 px-3 text-center">Version</th>
                  <th className="py-3 px-3">Các Gói Giá</th>
                  <th className="py-3 px-3 text-right">Doanh Thu</th>
                  <th className="py-3 px-3 text-center">Trạng Thái</th>
                  <th className="py-3 px-4 text-right">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {tools.map((tool, idx) => {
                  const isSelected = selectedTool?.id === tool.id && isDrawerOpen;
                  const revenueMock = (tool.basePrice * (idx + 1) * 35).toLocaleString("vi-VN") + " đ";
                  const isDraft = idx === 3;

                  return (
                    <tr
                      key={tool.id}
                      onClick={() => handleSelectTool(tool)}
                      className={cn(
                        "hover:bg-blue-50/50 cursor-pointer transition-colors",
                        isSelected && "bg-blue-50/80"
                      )}
                    >
                      {/* Name & Thumb */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-9 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                            <img
                              src={tool.screenshotUrl}
                              alt={tool.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-heading font-bold text-slate-900 truncate">
                                {tool.name}
                              </span>
                              {idx === 0 && (
                                <span className="px-1.5 py-0.2 rounded bg-blue-100 text-[#004ac6] font-mono text-[10px] font-bold">
                                  HOT
                                </span>
                              )}
                            </div>
                            <div className="font-mono text-[10px] text-slate-400 truncate">
                              /tools/{tool.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px] border border-slate-200/60">
                          {tool.categoryName || tool.categoryId}
                        </span>
                      </td>

                      {/* Version */}
                      <td className="py-3 px-3 text-center font-mono text-[11px] font-semibold text-slate-700">
                        {tool.version}
                      </td>

                      {/* Packages Chips */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-600 font-medium">
                            1M
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-600 font-medium">
                            1Y
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-blue-100 font-mono text-[10px] text-[#004ac6] font-bold">
                            Life
                          </span>
                        </div>
                      </td>

                      {/* Revenue */}
                      <td className="py-3 px-3 text-right font-mono text-xs font-semibold text-slate-900">
                        {revenueMock}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 text-center">
                        {isDraft ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-mono text-[10px] font-semibold border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            DRAFT
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-semibold border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            PUBLISHED
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleSelectTool(tool)}
                            className="p-1.5 rounded hover:bg-slate-100 text-[#004ac6] transition-colors"
                            title="Chỉnh sửa chi tiết"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/tools/${tool.slug}`}
                            target="_blank"
                            className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                            title="Xem trên Live Store"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* PAGINATION / FOOTER INFO */}
          <div className="px-5 py-3 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono text-[11px]">
              Hiển thị 1 - {tools.length} trên tổng 12 sản phẩm công cụ
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                className="px-2 py-1 rounded bg-slate-100 text-slate-400 cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button type="button" className="px-2.5 py-0.5 rounded bg-[#004ac6] text-white font-mono text-xs font-semibold">
                1
              </button>
              <button type="button" className="px-2.5 py-0.5 rounded hover:bg-slate-100 text-slate-700 font-mono text-xs">
                2
              </button>
              <button type="button" className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: PERSISTENT SLIDE-OVER DRAWER WORKSPACE (760px) */}
        {isDrawerOpen && selectedTool && (
          <div className="w-full xl:w-[760px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col transition-all shrink-0">
            {/* DRAWER HEADER */}
            <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#004ac6] flex items-center justify-center font-bold shadow-xs">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading text-sm font-bold text-slate-900">
                      Chỉnh Sửa Tool: {formData.name || selectedTool.name}
                    </h2>
                    <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[10px] font-semibold">
                      ID: {selectedTool.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Cập nhật thông tin chi tiết, hình ảnh chụp màn hình và bảng giá kích hoạt tự động.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                title="Đóng bảng chỉnh sửa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* THREE TABS NAVIGATION */}
            <div className="flex items-center px-6 bg-white border-b border-slate-200 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={cn(
                  "px-4 py-3 font-heading text-xs font-semibold transition-all relative flex items-center gap-2",
                  activeTab === "general"
                    ? "text-[#004ac6] border-b-2 border-[#004ac6]"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Thông Tin Cơ Bản & Media</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("specs")}
                className={cn(
                  "px-4 py-3 font-heading text-xs font-semibold transition-all relative flex items-center gap-2",
                  activeTab === "specs"
                    ? "text-[#004ac6] border-b-2 border-[#004ac6]"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Tính Năng & Yêu Cầu (JSONB)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("pricing")}
                className={cn(
                  "px-4 py-3 font-heading text-xs font-semibold transition-all relative flex items-center gap-2",
                  activeTab === "pricing"
                    ? "text-[#004ac6] border-b-2 border-[#004ac6]"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                <Key className="w-3.5 h-3.5" />
                <span>Cấu Hình Gói Bản Quyền ({selectedTool.packages.length})</span>
              </button>
            </div>

            {/* TAB CONTENT SCROLLABLE BODY */}
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-18rem)] space-y-5">
              {activeTab === "general" && (
                <div className="space-y-4">
                  {/* Tool Name & Version */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tên Công Cụ *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:border-[#004ac6] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phiên Bản Phát Hành
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          value={formData.version}
                          onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-medium text-slate-900 focus:bg-white focus:border-[#004ac6] outline-none"
                        />
                        <span className="absolute right-2 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[9px] font-bold">
                          LATEST
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Slug URL */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Slug URL Công Cụ (Tự động định tuyến Store)
                    </label>
                    <div className="flex items-center">
                      <span className="px-3 py-2 bg-slate-100 text-slate-500 font-mono text-[11px] border border-r-0 border-slate-200 rounded-l-lg">
                        https://autotool.dev/tools/
                      </span>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-r-lg text-xs font-mono font-medium text-slate-900 focus:bg-white focus:border-[#004ac6] outline-none"
                      />
                    </div>
                  </div>

                  {/* System Category */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Danh Mục Hệ Thống
                    </label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:border-[#004ac6] outline-none cursor-pointer"
                    >
                      <option value="crawler">Web Automation & Crawler (Trích xuất dữ liệu web)</option>
                      <option value="social">Marketing & Social (Nuôi tài khoản, seeding tự động)</option>
                      <option value="crypto">Crypto & Trading Bot (Copy trade, signal scanner)</option>
                      <option value="ecom">E-Commerce & Đơn Hàng (Đồng bộ tồn kho đa kênh)</option>
                      <option value="utilities">Developer Utilities (Bypass Captcha, Proxy Pool)</option>
                    </select>
                  </div>

                  {/* Short Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Mô Tả Ngắn (Hiển thị tại card trang chủ Store)
                      </label>
                      <span className="font-mono text-[10px] text-slate-400">
                        {formData.shortDescription.length}/160 ký tự
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:border-[#004ac6] outline-none"
                    />
                  </div>

                  {/* Detailed Description with Markdown Toolbar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Mô Tả Chi Tiết & Hướng Dẫn Sử Dụng (Markdown)
                      </label>
                      <span className="font-mono text-[10px] text-slate-400">
                        Markdown Supported
                      </span>
                    </div>
                    {/* Markdown formatting bar */}
                    <div className="flex items-center gap-1 p-1 bg-slate-100 border border-b-0 border-slate-200 rounded-t-lg text-slate-600">
                      <button type="button" className="px-2 py-0.5 hover:bg-white rounded font-bold text-xs">B</button>
                      <button type="button" className="px-2 py-0.5 hover:bg-white rounded italic text-xs">I</button>
                      <button type="button" className="px-2 py-0.5 hover:bg-white rounded underline text-xs">U</button>
                      <span className="text-slate-300">|</span>
                      <button type="button" className="px-2 py-0.5 hover:bg-white rounded font-mono text-xs">&lt;&gt;</button>
                      <button type="button" className="px-2 py-0.5 hover:bg-white rounded text-xs">List</button>
                      <button type="button" className="px-2 py-0.5 hover:bg-white rounded text-xs">Link</button>
                    </div>
                    <textarea
                      rows={6}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-3 font-mono text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-b-lg focus:bg-white focus:border-[#004ac6] outline-none"
                    />
                  </div>

                  {/* Media Dropzone & Screenshot Previews */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Kho Media & Ảnh Chụp Màn Hình (tool_images)
                      </label>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-[#004ac6] font-bold">
                        4/8 files
                      </span>
                    </div>

                    <div className="border-2 border-dashed border-slate-300 hover:border-[#004ac6] bg-slate-50/60 hover:bg-blue-50/20 rounded-xl p-4 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-1.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-[#004ac6] flex items-center justify-center">
                        <UploadCloud className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">
                        Kéo thả ảnh demo / video vào ô này hoặc <span className="text-[#004ac6] underline">bấm để chọn file tải lên</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Hỗ trợ PNG, JPG, WebP, MP4 max 25MB (Khuyến nghị tỉ lệ 16:9)
                      </span>
                    </div>

                    {/* Image thumbnails */}
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      <div className="aspect-video rounded-lg overflow-hidden border border-slate-200 relative group">
                        <img src={selectedTool.screenshotUrl} alt="demo" className="w-full h-full object-cover" />
                        <span className="absolute top-1 left-1 bg-black/60 text-white font-mono text-[9px] px-1 rounded">
                          Cover
                        </span>
                      </div>
                      {selectedTool.galleryUrls?.slice(0, 3).map((shot: string, sIdx: number) => (
                        <div key={sIdx} className="aspect-video rounded-lg overflow-hidden border border-slate-200 relative">
                          <img src={shot} alt={`screenshot-${sIdx}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/80 text-xs text-blue-900 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#004ac6] shrink-0 mt-0.5" />
                    <span>
                      Dữ liệu tính năng kỹ thuật được lưu trữ dạng <strong>JSONB</strong> linh hoạt trong cơ sở dữ liệu PostgreSQL, cho phép render bảng thông số tùy biến không phụ thuộc schema cứng.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Ngôn ngữ / Framework
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedTool.techSpecs.language}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Yêu Cầu RAM Tối Thiểu
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedTool.techSpecs.ramRequired}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Hỗ Trợ Luồng (Threads)
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedTool.techSpecs.threadsSupported}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Chính Sách Bản Quyền
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedTool.techSpecs.licenseType}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "pricing" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Cấu hình 3 Gói Bản Quyền Kích Hoạt
                    </span>
                    <button
                      type="button"
                      className="text-xs font-semibold text-[#004ac6] hover:underline"
                    >
                      + Thêm gói tùy biến
                    </button>
                  </div>

                  <div className="space-y-3">
                    {selectedTool.packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-xs text-slate-900">
                              {pkg.name} ({pkg.durationText})
                            </span>
                            {pkg.isPopular && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-mono text-[9px] font-bold">
                                PHỔ BIẾN
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500">
                            Thời hạn: <strong>{pkg.durationDays ? `${pkg.durationDays} ngày` : "Vĩnh viễn"}</strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="font-mono text-sm font-bold text-[#004ac6]">
                              {pkg.price.toLocaleString("vi-VN")} đ
                            </span>
                            <div className="font-mono text-[10px] text-slate-400">
                              ≈ ${pkg.usdtPrice} USDT
                            </div>
                          </div>
                          <button
                            type="button"
                            className="px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100"
                          >
                            Sửa
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* DRAWER FOOTER / ACTION BAR */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Published Switch Toggle */}
              <label className="flex items-center gap-2 cursor-pointer self-start sm:self-auto">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 relative"></div>
                <span className="text-xs font-semibold text-slate-700">
                  Xuất bản ra Store (PUBLISHED)
                </span>
              </label>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(false)}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 shadow-xs transition-colors"
                >
                  Lưu Bản Nháp
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-heading text-xs font-bold text-white bg-[#004ac6] hover:bg-[#2563eb] shadow-xs transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Xuất Bản Ngay</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
