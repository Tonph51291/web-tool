"use client";

import React, { useState } from "react";
import { Key, Copy, Check, ShieldCheck, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function LicenseKeyReveal({
  toolName,
  licenseKey,
  downloadUrl,
  durationText,
}: {
  toolName: string;
  licenseKey: string;
  downloadUrl?: string;
  durationText: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Bản Quyền Chính Hãng Đã Được Cấp ({durationText})</span>
        </div>
        <span className="text-xs text-slate-500 font-mono">Trạng thái: Active (1/1 Device)</span>
      </div>

      <div>
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
          License Key Của Bạn:
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <code className="flex-1 p-3.5 rounded-xl bg-white dark:bg-slate-900 font-mono text-sm sm:text-base font-extrabold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 select-all tracking-wider shadow-inner">
            {licenseKey}
          </code>
          <Button
            type="button"
            onClick={handleCopy}
            className="h-12 px-5 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Đã sao chép!" : "Sao chép Key"}</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between pt-2 border-t border-emerald-200/60 dark:border-emerald-900/60 gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
          <span>Đổi máy tính kích hoạt: Còn 2 lần trong tháng</span>
        </div>

        {downloadUrl && (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
          >
            <Download className="w-4 h-4" />
            <span>Tải bộ cài đặt {toolName} (.exe)</span>
          </a>
        )}
      </div>
    </div>
  );
}

