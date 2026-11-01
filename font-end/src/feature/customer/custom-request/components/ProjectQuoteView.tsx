"use client";

import React, { useState } from "react";
import { MOCK_PROJECT_QUOTES } from "@/mocks/mockQuotes";
import { formatVND } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ShieldCheck, Clock, FileCode, Check } from "lucide-react";

export function ProjectQuoteView() {
  const quote = MOCK_PROJECT_QUOTES[0];
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-8 shadow-sm">
      {/* Quote Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded">
              DỰ ÁN #{quote.projectCode}
            </span>
            <span className="text-xs text-slate-400 font-mono">Báo giá ngày 30/10/2026</span>
          </div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
            {quote.projectTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-1">Khách hàng: {quote.clientName} ({quote.clientEmail})</p>
        </div>

        <div className="text-right">
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {formatVND(quote.totalCostVND)}
          </div>
          <div className="font-mono text-xs text-emerald-600 font-bold">
            ≈ ${quote.totalCostUSDT} USDT (Tỷ giá chốt)
          </div>
        </div>
      </div>

      {/* Scope Requirements */}
      <div className="space-y-3">
        <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
          Yêu Cầu Nghiệp Vụ Đã Thống Nhất:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {quote.requirements.map((req, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
              <span>{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverable Milestones Timeline */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
          Lộ Trình Bàn Giao (Tổng thời gian: {quote.estimatedDays} ngày):
        </h3>
        <div className="space-y-3">
          {quote.deliverables.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm"
            >
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{item.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
              </div>
              <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-cyan-400 shrink-0">
                {item.days} ngày làm việc
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Cam kết bảo hành mã nguồn 6 tháng & sửa lỗi miễn phí</span>
        </div>

        {isAccepted ? (
          <div className="px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-sm flex items-center gap-2">
            <Check className="w-4 h-4" /> Đã chấp thuận báo giá! Kỹ thuật viên sẽ liên hệ trong 30 phút.
          </div>
        ) : (
          <Button
            onClick={() => setIsAccepted(true)}
            className="w-full sm:w-auto h-12 px-8 font-bold bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white shadow-md gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Chấp Thuận Báo Giá & Đặt Cọc 50%
          </Button>
        )}
      </div>
    </div>
  );
}

