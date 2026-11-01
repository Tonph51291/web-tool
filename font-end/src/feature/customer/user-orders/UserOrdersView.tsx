"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_ORDERS, MockOrder } from "@/mocks/mockOrders";
import { LicenseKeyReveal } from "./components/LicenseKeyReveal";
import { formatVND, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ShoppingBag, ArrowRight, Clock, CheckCircle2, XCircle, Key } from "lucide-react";

export function UserOrdersView() {
  const [activeTab, setActiveTab] = useState<"ALL" | "COMPLETED" | "PENDING">("ALL");

  const filteredOrders = MOCK_ORDERS.filter((ord) => {
    if (activeTab === "COMPLETED") return ord.status === "COMPLETED";
    if (activeTab === "PENDING") return ord.status === "PENDING_PAYMENT" || ord.status === "PAID";
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
            TÀI KHOẢN CỦA TÔI
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Kho Bản Quyền & Lịch Sử Đơn Mua
          </h1>
        </div>

        <Link href="/tools">
          <Button variant="outline" size="sm" className="gap-2">
            <ShoppingBag className="w-4 h-4 text-cyan-500" />
            <span>Mua Thêm Công Cụ</span>
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab("ALL")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "ALL"
              ? "bg-blue-600 dark:bg-cyan-600 text-white shadow-xs"
              : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
          }`}
        >
          Tất cả đơn ({MOCK_ORDERS.length})
        </button>

        <button
          onClick={() => setActiveTab("COMPLETED")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "COMPLETED"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
          }`}
        >
          Đã có License Key (
          {MOCK_ORDERS.filter((o) => o.status === "COMPLETED").length}
          )
        </button>

        <button
          onClick={() => setActiveTab("PENDING")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeTab === "PENDING"
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
          }`}
        >
          Chờ thanh toán & đối soát (
          {MOCK_ORDERS.filter((o) => o.status === "PENDING_PAYMENT" || o.status === "PAID").length}
          )
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-extrabold text-blue-600 dark:text-cyan-400">
                  #{order.orderCode}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Ngày mua: {formatDate(order.createdAt)}
                </span>
              </div>

              <div>
                {order.status === "COMPLETED" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Hoàn tất - Đã cấp Key
                  </span>
                )}
                {order.status === "PAID" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-800">
                    <Clock className="w-3.5 h-3.5 animate-spin" /> Đã nhận tiền - Đang tạo Key
                  </span>
                )}
                {order.status === "PENDING_PAYMENT" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-semibold border border-amber-200 dark:border-amber-800">
                    <Clock className="w-3.5 h-3.5" /> Chờ chuyển khoản
                  </span>
                )}
              </div>
            </div>

            {/* Tool & Package summary row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                  <Link href={`/tools/${order.toolSlug}`} className="hover:text-blue-600 transition-colors">
                    {order.toolName}
                  </Link>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Gói mua: <span className="font-medium text-slate-700 dark:text-slate-300">{order.packageName}</span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                    {formatVND(order.amount)}
                  </div>
                  <div className="font-mono text-xs text-slate-400">
                    {order.paymentMethod === "USDT" ? "USDT (TRC20)" : "VietQR Chuyển khoản"}
                  </div>
                </div>

                {order.status === "PENDING_PAYMENT" && (
                  <Link href={`/orders/${order.orderCode}`}>
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold gap-1">
                      Thanh toán ngay <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* License Key Reveal if Completed */}
            {order.status === "COMPLETED" && order.licenseKey && (
              <LicenseKeyReveal
                toolName={order.toolName}
                licenseKey={order.licenseKey}
                downloadUrl={order.downloadUrl}
                durationText={order.durationText}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

