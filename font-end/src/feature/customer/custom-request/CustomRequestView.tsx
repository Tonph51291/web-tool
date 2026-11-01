"use client";

import React, { useState } from "react";
import { RequestStepperForm } from "./components/RequestStepperForm";
import { ProjectQuoteView } from "./components/ProjectQuoteView";
import { FileCode, Sparkles, Shield, Clock } from "lucide-react";

export function CustomRequestView() {
  const [activeTab, setActiveTab] = useState<"REQUEST" | "SAMPLE_QUOTE">("REQUEST");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-700 dark:text-cyan-400 uppercase tracking-widest font-semibold bg-blue-50 dark:bg-cyan-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-cyan-800">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500" /> DỊCH VỤ PHÁT TRIỂN PHẦN MỀM THEO YÊU CẦU
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
          Đặt Làm Tool Tự Động Hóa Chuyên Biệt
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Đội ngũ kỹ sư phần mềm giàu kinh nghiệm của AutoTool.dev trực tiếp thiết kế kiến trúc, tối ưu tốc độ đa luồng và bàn giao mã nguồn trọn gói.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-slate-200 dark:border-slate-800 pb-3 gap-2">
        <button
          onClick={() => setActiveTab("REQUEST")}
          className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "REQUEST"
              ? "bg-blue-600 dark:bg-cyan-600 text-white shadow-xs"
              : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
          }`}
        >
          1. Gửi Yêu Cầu Cần Viết Tool
        </button>

        <button
          onClick={() => setActiveTab("SAMPLE_QUOTE")}
          className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === "SAMPLE_QUOTE"
              ? "bg-purple-600 text-white shadow-xs"
              : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>2. Xem Mẫu Báo Giá Dự Án (#PRJ-2026)</span>
        </button>
      </div>

      {/* Tab views */}
      {activeTab === "REQUEST" ? <RequestStepperForm /> : <ProjectQuoteView />}
    </div>
  );
}

