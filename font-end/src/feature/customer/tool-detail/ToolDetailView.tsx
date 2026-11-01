"use client";

import React from "react";
import { MOCK_TOOLS } from "@/mocks/mockTools";
import { ToolHeader } from "./components/ToolHeader";
import { ToolGallery } from "./components/ToolGallery";
import { ToolSpecsTable } from "./components/ToolSpecsTable";
import { PackageSelector } from "./components/PackageSelector";
import { EmptyState } from "@/components/shared/EmptyState";
import { CheckCircle2, ShieldCheck, Download, Zap } from "lucide-react";
import Link from "next/link";

export function ToolDetailView({ slug }: { slug: string }) {
  const tool = MOCK_TOOLS.find((t) => t.slug === slug) || MOCK_TOOLS[0];

  if (!tool) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <EmptyState
          title="Không tìm thấy phần mềm yêu cầu"
          description="Công cụ này có thể đã được gỡ xuống hoặc đường dẫn không chính xác."
          actionLabel="Quay lại danh mục"
          onAction={() => (window.location.href = "/tools")}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* 1. Header Information */}
      <ToolHeader tool={tool} />

      {/* 2. Main 2-Column Section (Gallery + Specs VS Package Selector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col (8 cols): Gallery, Description, Features, Specs */}
        <div className="lg:col-span-8 space-y-8">
          {/* Gallery View */}
          <ToolGallery screenshotUrl={tool.screenshotUrl} galleryUrls={tool.galleryUrls} />

          {/* Description Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4">
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
              Tổng Quan & Tính Năng Nổi Bật
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {tool.description}
            </p>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-3">
                Danh Sách Tính Năng Cốt Lõi:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tool.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Specs Table */}
          <ToolSpecsTable specs={tool.techSpecs} />
        </div>

        {/* Right Col (4 cols): Sticky Package Selector */}
        <div className="lg:col-span-4">
          <PackageSelector
            packages={tool.packages}
            toolSlug={tool.slug}
            toolName={tool.name}
          />
        </div>
      </div>
    </div>
  );
}

