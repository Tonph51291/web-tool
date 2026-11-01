"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { OrderInvoiceCard } from "./components/OrderInvoiceCard";
import { BankPaymentTab } from "./components/BankPaymentTab";
import { UsdtPaymentTab } from "./components/UsdtPaymentTab";
import { ProofUploadForm } from "./components/ProofUploadForm";
import { Building2, Coins, Clock, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CheckoutView({
  orderCode = "TOOL-98421",
}: {
  orderCode?: string;
}) {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<"BANK_TRANSFER" | "USDT">("BANK_TRANSFER");
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock order details
  const amount = 2990000;
  const amountUsdt = 120;
  const toolName = "OmniData Scraper Pro";
  const packageName = "Gói 1 Năm (Annual License)";
  const durationText = "1 năm (365 ngày)";

  const handleProofSubmitted = () => {
    setIsSuccess(true);
    setTimeout(() => {
      router.push("/orders");
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Hủy & quay lại xem sản phẩm khác</span>
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold block">
            CỔNG THANH TOÁN
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Thanh Toán Đơn Hàng #{orderCode}
          </h1>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-mono font-semibold border border-amber-200 dark:border-amber-800">
          <Clock className="w-4 h-4 animate-spin text-amber-500" />
          <span>Thời gian giữ đơn: 14:52</span>
        </div>
      </div>

      {isSuccess ? (
        <div className="p-12 text-center rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 space-y-4 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            Đã Gửi Biên Lai Thành Công!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Admin đang tiến hành đối soát giao dịch thực tế. Hệ thống đang tự động chuyển hướng bạn đến trang Quản lý License Key...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Payment Gateway Tabs (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
            {/* Method Tabs */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedMethod("BANK_TRANSFER")}
                className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-medium text-sm transition-all ${
                  selectedMethod === "BANK_TRANSFER"
                    ? "border-blue-600 dark:border-cyan-400 bg-blue-50/60 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 font-bold shadow-xs"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>VietQR Chuyển Khoản</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod("USDT")}
                className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 font-medium text-sm transition-all ${
                  selectedMethod === "USDT"
                    ? "border-emerald-600 dark:border-emerald-400 bg-emerald-50/60 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                }`}
              >
                <Coins className="w-4 h-4" />
                <span>USDT (TRC20)</span>
              </button>
            </div>

            {/* Gateway View */}
            {selectedMethod === "BANK_TRANSFER" ? (
              <BankPaymentTab orderCode={orderCode} amount={amount} />
            ) : (
              <UsdtPaymentTab amountUsdt={amountUsdt} />
            )}

            {/* Confirmation & Proof Upload */}
            <ProofUploadForm
              selectedMethod={selectedMethod}
              onSubmitSuccess={handleProofSubmitted}
            />
          </div>

          {/* Right Column: Order Invoice (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <OrderInvoiceCard
              orderCode={orderCode}
              toolName={toolName}
              packageName={packageName}
              durationText={durationText}
              amount={amount}
              amountUsdt={amountUsdt}
            />
          </div>
        </div>
      )}
    </div>
  );
}

