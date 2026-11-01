"use client";

import React, { useState } from "react";
import { Upload, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function ProofUploadForm({
  selectedMethod,
  onSubmitSuccess,
}: {
  selectedMethod: "BANK_TRANSFER" | "USDT";
  onSubmitSuccess: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [txId, setTxId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess();
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
      <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
        Xác Nhận Sau Khi Chuyển Tiền
      </h4>

      {selectedMethod === "USDT" && (
        <Input
          label="Mã Giao Dịch TxID (TronScan):"
          placeholder="Dán chuỗi hash TxID 64 ký tự hex từ ví của bạn..."
          value={txId}
          onChange={(e) => setTxId(e.target.value)}
          required
        />
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Ảnh chụp màn hình biên lai giao dịch thành công:
        </label>
        <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-5 text-center hover:border-cyan-500 transition-colors cursor-pointer bg-slate-50/50 dark:bg-slate-800/40">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-slate-500">
            <Upload className="w-5 h-5 text-cyan-500 mb-1" />
            {file ? (
              <span className="font-semibold text-blue-600 dark:text-cyan-400">{file.name}</span>
            ) : (
              <>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Bấm để tải ảnh lên hoặc kéo thả vào đây
                </span>
                <span>Hỗ trợ JPG, PNG, WebP (Tối đa 5MB)</span>
              </>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full h-12 text-base font-bold bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white shadow-md gap-2"
      >
        <CheckCircle className="w-5 h-5" />
        Xác Nhận Đã Chuyển Tiền
      </Button>
    </form>
  );
}

