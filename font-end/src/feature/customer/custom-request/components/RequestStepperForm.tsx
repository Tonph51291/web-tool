"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Send, Upload, CheckCircle2 } from "lucide-react";
import { formatVND } from "@/lib/utils";

export function RequestStepperForm() {
  const [budget, setBudget] = useState(15000000);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div className="rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 p-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
          Yêu Cầu Của Bạn Đã Được Gửi!
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Đội ngũ kiến trúc sư giải pháp của AutoTool.dev sẽ phân tích nghiệp vụ và phản hồi kèm bảng báo giá chi tiết trong vòng 2 giờ làm việc.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
          Mô Tả Bài Toán Cần Viết Tool
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Cung cấp càng chi tiết các bước thao tác, chúng tôi sẽ báo giá càng nhanh và chính xác.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Họ và tên của bạn:" placeholder="Ví dụ: Nguyễn Văn A" required />
        <Input label="Số điện thoại / Zalo:" placeholder="0988.xxx.xxx" required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Email nhận báo giá:" type="email" placeholder="name@company.com" required />
        <Input label="Thời hạn mong muốn (Deadline):" placeholder="Ví dụ: 10 ngày tới" required />
      </div>

      <Textarea
        label="Chi tiết nghiệp vụ phần mềm cần xây dựng:"
        rows={5}
        placeholder="Mô tả cụ thể: Website cần cào dữ liệu, số luồng cần chạy, kịch bản tương tác người thật, hay các loại Captcha cần vượt qua..."
        required
      />

      {/* Budget Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm font-medium">
          <span className="text-slate-700 dark:text-slate-300">Ngân sách dự kiến:</span>
          <span className="font-heading font-extrabold text-lg text-blue-600 dark:text-cyan-400">
            {formatVND(budget)}
          </span>
        </div>
        <input
          type="range"
          min="5000000"
          max="50000000"
          step="1000000"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full accent-blue-600 dark:accent-cyan-500 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11px] font-mono text-slate-400">
          <span>5.000.000 VNĐ</span>
          <span>50.000.000 VNĐ</span>
        </div>
      </div>

      {/* File attachment */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Tài liệu mô tả yêu cầu / Ảnh minh họa (Tùy chọn):
        </label>
        <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center cursor-pointer hover:border-cyan-500 transition-colors">
          <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
          <span className="text-xs text-slate-500 block">Kéo thả file PDF, DOCX, ZIP hoặc ảnh chụp màn hình</span>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-bold bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white shadow-md gap-2"
      >
        <Send className="w-4 h-4" />
        Gửi Yêu Cầu Để Nhận Báo Giá Trong 2 Giờ
      </Button>
    </form>
  );
}

