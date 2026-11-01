import React from "react";
import { formatVND } from "@/lib/utils";
import { ShoppingCart, ShieldCheck } from "lucide-react";

export function OrderInvoiceCard({
  orderCode,
  toolName,
  packageName,
  durationText,
  amount,
  amountUsdt,
}: {
  orderCode: string;
  toolName: string;
  packageName: string;
  durationText: string;
  amount: number;
  amountUsdt: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="font-mono text-xs uppercase text-slate-400 font-bold block">ĐƠN HÀNG</span>
          <span className="font-mono text-base font-bold text-blue-600 dark:text-cyan-400">#{orderCode}</span>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-semibold border border-amber-200 dark:border-amber-800">
          Chờ thanh toán
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between py-1">
          <span className="text-slate-500">Phần mềm:</span>
          <span className="font-semibold text-slate-900 dark:text-white text-right">{toolName}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-500">Gói bản quyền:</span>
          <span className="font-medium text-slate-800 dark:text-slate-200">{packageName}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-500">Thời hạn sử dụng:</span>
          <span className="font-medium text-slate-800 dark:text-slate-200">{durationText}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tổng thanh toán:</span>
        <div className="text-right">
          <div className="text-2xl font-extrabold text-blue-600 dark:text-cyan-400">
            {formatVND(amount)}
          </div>
          <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            ≈ ${amountUsdt.toFixed(2)} USDT (TRC20)
          </div>
        </div>
      </div>
    </div>
  );
}

