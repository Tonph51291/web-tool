"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  CreditCard,
  Key,
  XCircle,
  Download,
  RotateCw,
  Eye,
  CheckCircle2,
  X,
  Copy,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderItem {
  code: string;
  customerName: string;
  customerEmail: string;
  telegram?: string;
  toolName: string;
  planName: string;
  amountVnd: number;
  paymentMethod: string;
  receiptStatus: "pending_audit" | "verified" | "auto_qr" | "failed";
  status: "PENDING" | "PAID" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  receiptImg?: string;
  licenseKey?: string;
}

const MOCK_ADMIN_ORDERS: OrderItem[] = [
  {
    code: "#ORD-88294",
    customerName: "Nguyễn Văn Đức",
    customerEmail: "ducdev@gmail.com",
    telegram: "@duc_automation",
    toolName: "OmniData Scraper Pro",
    planName: "Gói 365 Ngày (Single PC)",
    amountVnd: 499000,
    paymentMethod: "MB Bank",
    receiptStatus: "pending_audit",
    status: "PENDING",
    createdAt: "14:32 • Hôm nay",
    receiptImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKyvBfWnll1760jeSrGmfSYTdki5Ashf9vkITkc7RZc_2JPM8tCmXHNWdM8N6zefP0epdaioVBj2eD_reWECWELGIMtwS9HcDIRKpXHzy_yiIAShTJfnkD30hENYW-JhpTq4XojG15oqSkOfoulSh8Q7-BVYQ1Akgpcu7KYgabdy1wWEBqKnO2uwnLfmSbEYRF-rhBPmrihg6nL7kkQBUn6hyQCocjbQerOQvWonyAw2B8t83bbURPNA",
    licenseKey: "OMNI-PRO-2026-X892-KLA9",
  },
  {
    code: "#ORD-88291",
    customerName: "Trần Quốc Hùng",
    customerEmail: "hungcrypto@outlook.com",
    telegram: "@hung_crypto",
    toolName: "SocialMulti Suite",
    planName: "Vĩnh viễn (Lifetime Key)",
    amountVnd: 1250000,
    paymentMethod: "Vietcombank",
    receiptStatus: "verified",
    status: "PAID",
    createdAt: "13:10 • Hôm nay",
    licenseKey: "SOCIAL-LIFE-9981-VCB2-A87X",
  },
  {
    code: "#ORD-88290",
    customerName: "Lê Hoàng Long",
    customerEmail: "long.trading@gmail.com",
    telegram: "@long_scalper",
    toolName: "TeleSignal Copier Bot",
    planName: "30 Ngày (Hạn 18/11)",
    amountVnd: 299000,
    paymentMethod: "VietQR 247",
    receiptStatus: "auto_qr",
    status: "DELIVERED",
    createdAt: "12:05 • Hôm nay",
    licenseKey: "TELE-30D-88290-AUTO-PROX",
  },
  {
    code: "#ORD-88288",
    customerName: "Phạm Minh Tuấn",
    customerEmail: "tuanmmo@yahoo.com",
    toolName: "AutoCaptcha Module",
    planName: "API Package 100k Req",
    amountVnd: 650000,
    paymentMethod: "Chuyển khoản",
    receiptStatus: "failed",
    status: "CANCELLED",
    createdAt: "10:45 • Hôm nay",
  },
];

export function AdminOrdersView() {
  const [orders, setOrders] = useState<OrderItem[]>(MOCK_ADMIN_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [activeStatusTab, setActiveStatusTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toolFilter, setToolFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("OMNI-PRO-2026-X892-KLA9");

  const handleOpenAuditModal = (order: OrderItem) => {
    setSelectedOrder(order);
    setGeneratedKey(order.licenseKey || `TOOL-${Date.now().toString(36).toUpperCase()}-KEY9`);
    setIsModalOpen(true);
  };

  const handleApproveOrder = () => {
    if (!selectedOrder) return;
    setOrders((prev) =>
      prev.map((ord) =>
        ord.code === selectedOrder.code
          ? { ...ord, status: "DELIVERED", receiptStatus: "verified", licenseKey: generatedKey }
          : ord
      )
    );
    setIsModalOpen(false);
    alert(`Đã duyệt đơn hàng ${selectedOrder.code} và tự động gửi License Key: ${generatedKey} qua Telegram & Email khách!`);
  };

  const filteredOrders = orders.filter((ord) => {
    if (activeStatusTab === "pending" && ord.status !== "PENDING") return false;
    if (activeStatusTab === "paid" && ord.status !== "PAID") return false;
    if (activeStatusTab === "delivered" && ord.status !== "DELIVERED") return false;
    if (activeStatusTab === "cancelled" && ord.status !== "CANCELLED") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCode = ord.code.toLowerCase().includes(q);
      const matchName = ord.customerName.toLowerCase().includes(q);
      const matchEmail = ord.customerEmail.toLowerCase().includes(q);
      if (!matchCode && !matchName && !matchEmail) return false;
    }

    if (toolFilter && !ord.toolName.toLowerCase().includes(toolFilter.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <div className="w-full flex-1 p-6 pb-20 space-y-6">
      {/* 1. TOP CONTEXT BREADCRUMB & QUICK ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500 mb-1">
            <Link href="/admin" className="hover:text-[#004ac6] transition-colors">
              Admin Hub
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Đơn hàng & Duyệt thanh toán</span>
            <span className="px-1.5 py-0.5 rounded-full bg-blue-50 font-mono text-[10px] text-[#004ac6] font-bold border border-blue-200">
              /admin/orders
            </span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
            Quản lý Đơn hàng & Đối soát Chuyển khoản
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Kiểm tra biên lai ngân hàng, phê duyệt dòng tiền payments và bàn giao license key/mã nguồn tự động cho khách hàng.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={() => alert("Đang xuất danh sách đơn hàng sang file .CSV...")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold shadow-xs hover:bg-slate-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Xuất danh sách (.CSV)</span>
          </button>
          <button
            type="button"
            onClick={() => alert("Dữ liệu đơn hàng đã được đồng bộ mới nhất từ hệ thống!")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#004ac6] border border-blue-200 rounded-lg text-xs font-semibold shadow-xs hover:bg-blue-50 transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Làm mới realtime</span>
          </button>
        </div>
      </div>

      {/* 2. 5 KPI STATS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        {/* Stat 1: Tổng đơn */}
        <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Tổng đơn hàng</span>
            <ShoppingBag className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-extrabold text-slate-900">48</span>
            <span className="font-mono text-[11px] text-emerald-600 font-medium">Toàn hệ thống</span>
          </div>
        </div>

        {/* Stat 2: Chờ duyệt */}
        <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-600 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Chờ duyệt (PENDING)</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-2xl font-extrabold text-rose-600">
              3 <span className="text-xs font-normal text-slate-600">đơn</span>
            </span>
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
              1.497.000 đ
            </span>
          </div>
        </div>

        {/* Stat 3: Đã thanh toán */}
        <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Đã thanh toán (PAID)</span>
            <CreditCard className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-2xl font-extrabold text-slate-900">
              36 <span className="text-xs font-normal text-slate-600">đơn</span>
            </span>
            <span className="font-mono text-[11px] font-bold text-emerald-600">45.890.000 đ</span>
          </div>
        </div>

        {/* Stat 4: Đã bàn giao */}
        <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Đã bàn giao (KEY)</span>
            <Key className="w-4 h-4 text-[#004ac6]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-extrabold text-slate-900">34</span>
            <span className="font-mono text-[11px] text-[#004ac6] font-semibold">94.4% SLA</span>
          </div>
        </div>

        {/* Stat 5: Hủy/Từ chối */}
        <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Đơn hủy / Từ chối</span>
            <XCircle className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-extrabold text-slate-500">5</span>
            <span className="font-mono text-[11px] text-slate-400">Hết hạn</span>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE SEARCH & FILTER TOOLBAR */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 p-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
          <button
            type="button"
            onClick={() => setActiveStatusTab("all")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              activeStatusTab === "all"
                ? "bg-[#004ac6] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            Tất cả <span className="font-mono text-[10px] ml-1 opacity-90">48</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveStatusTab("pending")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5",
              activeStatusTab === "pending"
                ? "bg-[#004ac6] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <span>Chờ thanh toán</span>
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-bold animate-pulse">
              3
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveStatusTab("paid")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              activeStatusTab === "paid"
                ? "bg-[#004ac6] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            Đã thanh toán <span className="font-mono text-[10px] ml-1 opacity-70">5</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveStatusTab("delivered")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              activeStatusTab === "delivered"
                ? "bg-[#004ac6] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            Đã bàn giao <span className="font-mono text-[10px] ml-1 opacity-70">34</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveStatusTab("cancelled")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              activeStatusTab === "cancelled"
                ? "bg-[#004ac6] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            Đã hủy <span className="font-mono text-[10px] ml-1 opacity-70">6</span>
          </button>
        </div>

        {/* Search & Tool Select Filter */}
        <div className="flex items-center flex-wrap sm:flex-nowrap gap-2">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mã đơn ORD-*, tên khách, email..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs rounded-lg outline-none focus:bg-white focus:border-[#004ac6] transition-all"
            />
          </div>

          <select
            value={toolFilter}
            onChange={(e) => setToolFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs text-slate-700 py-1.5 px-3 rounded-lg outline-none cursor-pointer"
          >
            <option value="">Tất cả công cụ & Tool</option>
            <option value="omni">OmniData Scraper Pro</option>
            <option value="social">SocialMulti Suite</option>
            <option value="tele">TeleSignal Copier Bot</option>
            <option value="captcha">AutoCaptcha Module</option>
          </select>
        </div>
      </div>

      {/* 4. ORDERS DATA TABLE CONTAINER */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Mã đơn & Ngày tạo</th>
                <th className="py-3 px-4">Khách hàng / Liên hệ</th>
                <th className="py-3 px-4">Tool & Gói bản quyền</th>
                <th className="py-3 px-4 text-right">Tổng tiền (VNĐ)</th>
                <th className="py-3 px-4">Thanh toán (Receipt)</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-center">Thao tác xử lý</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredOrders.map((ord) => (
                <tr key={ord.code} className="hover:bg-slate-50/70 transition-colors">
                  {/* Code & Created */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-[#004ac6] border border-blue-200/60">
                        {ord.code}
                      </span>
                      {ord.status === "PENDING" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" title="Cần đối soát ngay"></span>
                      )}
                    </div>
                    <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                      {ord.createdAt}
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-4">
                    <div className="font-heading font-bold text-slate-900">
                      {ord.customerName}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
                      <span>{ord.customerEmail}</span>
                      {ord.telegram && (
                        <>
                          <span>•</span>
                          <span className="text-[#004ac6] font-semibold">{ord.telegram}</span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Tool & Plan */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{ord.toolName}</div>
                    <div className="font-mono text-[10px] text-slate-500">{ord.planName}</div>
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 px-4 text-right">
                    <span className={cn(
                      "font-mono text-sm font-bold",
                      ord.status === "CANCELLED" ? "text-slate-400 line-through" : "text-slate-900"
                    )}>
                      {ord.amountVnd.toLocaleString("vi-VN")} đ
                    </span>
                  </td>

                  {/* Receipt status badge */}
                  <td className="py-3.5 px-4">
                    {ord.receiptStatus === "pending_audit" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-mono text-[10px] font-semibold border border-rose-200">
                        Chờ duyệt biên lai MB
                      </span>
                    )}
                    {ord.receiptStatus === "verified" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-semibold border border-emerald-200">
                        Đã nhận tiền (VCB)
                      </span>
                    )}
                    {ord.receiptStatus === "auto_qr" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#004ac6] font-mono text-[10px] font-semibold border border-blue-200">
                        Auto VietQR 247
                      </span>
                    )}
                    {ord.receiptStatus === "failed" && (
                      <span className="font-mono text-[10px] text-slate-400">
                        Không nhận được bill
                      </span>
                    )}
                  </td>

                  {/* Order Status */}
                  <td className="py-3.5 px-4">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded font-mono text-[10px] font-bold",
                      ord.status === "PENDING" && "bg-rose-100 text-rose-800",
                      ord.status === "PAID" && "bg-blue-100 text-blue-800",
                      ord.status === "DELIVERED" && "bg-emerald-100 text-emerald-800",
                      ord.status === "CANCELLED" && "bg-slate-100 text-slate-500"
                    )}>
                      {ord.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-center">
                    {ord.status === "PENDING" && (
                      <button
                        type="button"
                        onClick={() => handleOpenAuditModal(ord)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#004ac6] hover:bg-[#2563eb] text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xử lý & Đối soát</span>
                      </button>
                    )}
                    {ord.status === "PAID" && (
                      <button
                        type="button"
                        onClick={() => handleOpenAuditModal(ord)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                      >
                        <Key className="w-3.5 h-3.5" />
                        <span>Bàn giao Key</span>
                      </button>
                    )}
                    {ord.status === "DELIVERED" && (
                      <button
                        type="button"
                        onClick={() => handleOpenAuditModal(ord)}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        Xem chi tiết
                      </button>
                    )}
                    {ord.status === "CANCELLED" && (
                      <span className="font-mono text-[10px] text-slate-400">Đã đóng</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Footer */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span className="font-mono text-[11px]">
            Hiển thị 4 trong tổng số 48 đơn hàng gần nhất
          </span>
          <div className="flex items-center gap-1 font-mono text-xs">
            <button type="button" className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
              Trước
            </button>
            <button type="button" className="px-2.5 py-1 rounded bg-[#004ac6] text-white font-bold">
              1
            </button>
            <button type="button" className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
              2
            </button>
            <button type="button" className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
              Tiếp
            </button>
          </div>
        </div>
      </div>

      {/* 5. SLIDE-OVER MODAL: CHI TIẾT & ĐỐI SOÁT THANH TOÁN */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#004ac6] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading text-base font-bold text-slate-900">
                      Đối soát & Bàn giao Đơn hàng {selectedOrder.code}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-mono text-[10px] font-bold">
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px] mt-0.5">
                    <span>Khách: {selectedOrder.customerName}</span>
                    <span>•</span>
                    <span>{selectedOrder.paymentMethod}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: 2 Columns */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Col Left: Receipt photo (5 cols) */}
              <div className="md:col-span-5 space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Ảnh Chụp Biên Lai Chuyển Khoản Ngân Hàng
                </span>
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs relative group">
                  <img
                    src={selectedOrder.receiptImg || "https://lh3.googleusercontent.com/aida-public/AB6AXuAKyvBfWnll1760jeSrGmfSYTdki5Ashf9vkITkc7RZc_2JPM8tCmXHNWdM8N6zefP0epdaioVBj2eD_reWECWELGIMtwS9HcDIRKpXHzy_yiIAShTJfnkD30hENYW-JhpTq4XojG15oqSkOfoulSh8Q7-BVYQ1Akgpcu7KYgabdy1wWEBqKnO2uwnLfmSbEYRF-rhBPmrihg6nL7kkQBUn6hyQCocjbQerOQvWonyAw2B8t83bbURPNA"}
                    alt="Biên lai chuyển khoản"
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-2.5 bg-slate-900 text-white font-mono text-[11px] space-y-1">
                    <div className="text-slate-300">Ngân hàng: <strong>MB Bank (Quân Đội)</strong></div>
                    <div>Số tiền nhận: <strong className="text-emerald-400">499.000 VNĐ</strong></div>
                    <div className="text-slate-400">Mã GD: MB88294X7K • 14:32:05</div>
                  </div>
                </div>
              </div>

              {/* Col Right: Metadata & Key delivery (7 cols) */}
              <div className="md:col-span-7 space-y-4">
                {/* Order metadata card */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-semibold text-slate-600">Sản phẩm phần mềm:</span>
                    <strong className="text-slate-900">{selectedOrder.toolName}</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-semibold text-slate-600">Gói bản quyền:</span>
                    <span className="font-mono text-slate-900">{selectedOrder.planName}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-semibold text-slate-600">Telegram khách hàng:</span>
                    {selectedOrder.telegram ? (
                      <a
                        href={`https://t.me/${selectedOrder.telegram.replace("@", "")}`}
                        target="_blank"
                        className="text-[#004ac6] font-mono font-bold hover:underline flex items-center gap-1"
                      >
                        <span>{selectedOrder.telegram}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-400">Chưa kết nối Telegram</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-600">Tổng tiền cần thanh toán:</span>
                    <strong className="font-mono text-base text-[#004ac6]">
                      {selectedOrder.amountVnd.toLocaleString("vi-VN")} đ
                    </strong>
                  </div>
                </div>

                {/* License Key Generator Box */}
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    License Key Kích Hoạt Cấp Cho Khách Hàng
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={generatedKey}
                      onChange={(e) => setGeneratedKey(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-blue-300 rounded-lg font-mono text-xs font-bold text-slate-900 outline-none focus:ring-1 focus:ring-[#004ac6]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedKey);
                        alert("Đã sao chép License Key vào clipboard!");
                      }}
                      className="p-2 bg-white hover:bg-slate-50 border border-blue-200 text-[#004ac6] rounded-lg transition-colors"
                      title="Sao chép key"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-mono text-[10px] text-blue-700">
                    * Key kích hoạt tự động ràng buộc theo số thiết bị của gói bản quyền tương ứng.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  if (confirm("Xác nhận từ chối biên lai này do không khớp số tiền/nội dung?")) {
                    alert("Đã từ chối đơn hàng và thông báo khách hàng!");
                    setIsModalOpen(false);
                  }
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
              >
                Từ chối biên lai & Đóng đơn
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={handleApproveOrder}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg font-heading text-xs font-bold text-white bg-[#004ac6] hover:bg-[#2563eb] shadow-xs transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Xác Nhận & Cấp Key Ngay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
