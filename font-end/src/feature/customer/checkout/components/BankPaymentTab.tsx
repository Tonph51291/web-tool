"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, Building2 } from "lucide-react";
import { formatVND } from "@/lib/utils";
import { MOCK_PAYMENT_INFO } from "@/mocks/mockPayments";

export function BankPaymentTab({
  orderCode,
  amount,
}: {
  orderCode: string;
  amount: number;
}) {
  const [copied, setCopied] = useState<string | null>(null);
  const bank = MOCK_PAYMENT_INFO.bank;
  const transferContent = `${bank.transferPrefix} ${orderCode}`;

  // VietQR URL string format
  const vietQrData = `https://img.vietqr.io/image/MB-${bank.accountNumber}-${bank.qrTemplate}.png?amount=${amount}&addInfo=${encodeURIComponent(
    transferContent
  )}&accountName=${encodeURIComponent(bank.accountHolder)}`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* QR Code and Instructions */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
        <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 shrink-0">
          <img
            src={vietQrData}
            alt="VietQR MB Bank"
            className="w-44 h-44 object-contain"
          />
        </div>

        <div className="space-y-3 flex-1 text-sm w-full">
          <div className="flex justify-between items-center py-1 border-b border-slate-200 dark:border-slate-700">
            <span className="text-slate-500">Ngân hàng:</span>
            <span className="font-semibold text-slate-900 dark:text-white">{bank.bankName}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-200 dark:border-slate-700">
            <span className="text-slate-500">Số tài khoản:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-base text-slate-900 dark:text-white">
                {bank.accountNumber}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(bank.accountNumber, "stk")}
                className="p-1 hover:text-blue-600 text-slate-400"
                title="Sao chép số tài khoản"
              >
                {copied === "stk" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-200 dark:border-slate-700">
            <span className="text-slate-500">Chủ tài khoản:</span>
            <span className="font-semibold uppercase text-slate-900 dark:text-white">{bank.accountHolder}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-200 dark:border-slate-700">
            <span className="text-slate-500">Số tiền chuyển:</span>
            <span className="font-bold text-blue-600 dark:text-cyan-400 text-base">{formatVND(amount)}</span>
          </div>

          <div className="flex justify-between items-center p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <span className="text-amber-800 dark:text-amber-300 font-semibold text-xs">
              Nội dung chuyển khoản (Bắt buộc):
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-amber-900 dark:text-amber-200">
                {transferContent}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(transferContent, "syntax")}
                className="p-1 text-amber-700 hover:text-amber-900"
                title="Sao chép nội dung"
              >
                {copied === "syntax" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

