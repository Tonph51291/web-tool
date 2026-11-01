"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check } from "lucide-react";
import { MOCK_PAYMENT_INFO } from "@/mocks/mockPayments";

export function UsdtPaymentTab({
  amountUsdt,
}: {
  amountUsdt: number;
}) {
  const [copied, setCopied] = useState<string | null>(null);
  const usdt = MOCK_PAYMENT_INFO.usdt;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
        <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 shrink-0">
          <QRCodeSVG value={usdt.walletAddress} size={160} />
        </div>

        <div className="space-y-3 flex-1 text-sm w-full">
          <div className="flex justify-between items-center py-1 border-b border-slate-200 dark:border-slate-700">
            <span className="text-slate-500">Mạng lưới (Network):</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{usdt.network}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-200 dark:border-slate-700">
            <span className="text-slate-500">Số lượng cần chuyển:</span>
            <span className="font-mono font-extrabold text-base text-emerald-600 dark:text-emerald-400">
              {amountUsdt.toFixed(2)} USDT
            </span>
          </div>

          <div className="space-y-1 pt-1">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Địa chỉ ví nhận TRON (TRC20):</span>
              <button
                type="button"
                onClick={() => handleCopy(usdt.walletAddress, "wallet")}
                className="text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                {copied === "wallet" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Sao chép ví</span>
              </button>
            </div>
            <div className="font-mono text-xs break-all bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 select-all">
              {usdt.walletAddress}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

