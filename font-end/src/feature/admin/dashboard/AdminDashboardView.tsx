"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  CreditCard,
  Clock,
  Terminal,
  MessagesSquare,
  Laptop,
  CheckCircle2,
  FileSpreadsheet,
  PlusCircle,
  ArrowRight,
  ShieldAlert,
  Send,
  Eye,
  Key,
  Flame,
} from "lucide-react";

export function AdminDashboardView() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "quarter">("7d");

  return (
    <div className="w-full flex-1 p-6 pb-20 space-y-6">
      {/* 1. DASHBOARD HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
              Tổng Quan Hệ Thống Quản Trị
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-semibold border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync: 3 giây trước
            </div>
            <span className="hidden sm:inline-block text-slate-300 font-mono text-xs">•</span>
            <span className="font-mono text-xs text-slate-400">NODE_ENV=production</span>
          </div>
          <p className="text-slate-500 text-xs max-w-3xl leading-relaxed">
            Giám sát doanh thu bản quyền tool, đối soát biên lai chuyển khoản ngân hàng, phê duyệt báo giá và điều phối bot tự động.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2 flex-wrap pt-2 lg:pt-0">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors shadow-xs"
            onClick={() => alert("Đang kết xuất báo cáo doanh thu .XLSX...")}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
            <span>Xuất báo cáo (.XLSX)</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Webhook Telegram</span>
            <span className="font-mono text-[10px] bg-emerald-200/60 px-1 rounded font-bold">
              100% Active
            </span>
          </div>

          <Link
            href="/admin/requests"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#004ac6] hover:bg-[#2563eb] text-white rounded-lg font-heading text-xs font-bold shadow-xs transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Tạo Đơn / Báo Giá Mới</span>
          </Link>
        </div>
      </div>

      {/* 2. 5 THẺ KPI TỔNG HỢP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Doanh thu thực nhận */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              Doanh thu thực nhận
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#004ac6]">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-xl font-extrabold text-slate-900 tracking-tight">
              48.950.000 <span className="text-xs font-normal text-slate-400">VNĐ</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-emerald-600 font-mono text-[11px] font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4%</span>
              <span className="text-slate-400 font-normal">so với tháng trước</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-400 font-mono text-[10px]">
            <span className="truncate max-w-[120px]" title="payments = 'PAID'">payments = 'PAID'</span>
            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-medium">38 GD thành công</span>
          </div>
        </div>

        {/* Card 2: Đơn chờ duyệt thanh toán */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              Chờ duyệt thanh toán
            </span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <div className="font-mono text-xl font-extrabold text-rose-600">
                03 <span className="text-xs font-normal text-slate-600">đơn</span>
              </div>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded font-mono text-[9px] bg-rose-100 text-rose-800 font-bold animate-pulse">
                Cần soát biên lai
              </span>
            </div>
            <div className="font-mono text-[11px] text-slate-500 mt-1">
              Treo: <span className="font-bold text-rose-600">1.497.000 VNĐ</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1 text-[11px] font-heading font-semibold text-[#004ac6] hover:underline"
            >
              <span>Xem 3 đơn chờ duyệt</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 3: Yêu cầu đặt Tool mới */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              Yêu cầu đặt Tool mới
            </span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <Terminal className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-xl font-extrabold text-slate-900">
              05 <span className="text-xs font-normal text-slate-500">yêu cầu</span>
            </div>
            <div className="font-mono text-[11px] text-slate-500 mt-1">
              <span className="text-[#004ac6] font-bold">2</span> Chờ giá • <span className="text-emerald-600 font-bold">3</span> Khảo sát DOM
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-400 font-mono text-[10px]">
            <span>custom_requests</span>
            <span className="w-2 h-2 rounded-full bg-[#004ac6] animate-ping"></span>
          </div>
        </div>

        {/* Card 4: Tin nhắn chưa đọc (Đa kênh) */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              Tin nhắn chưa đọc
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#004ac6]">
              <MessagesSquare className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-xl font-extrabold text-slate-900">
              07 <span className="text-xs font-normal text-slate-500">hội thoại</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
              <span>4 Web Chat</span>
              <span>•</span>
              <span className="text-[#004ac6] font-bold">3 Telegram Bot</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 font-mono text-[10px] font-semibold border border-rose-200">
              <Clock className="w-2.5 h-2.5" />
              <span>01 tin chờ &gt; 15p</span>
            </span>
          </div>
        </div>

        {/* Card 5: Dự án đang thực hiện */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
              Dự án đang làm
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Laptop className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <div className="font-mono text-xl font-extrabold text-slate-900">
                04 <span className="text-xs font-normal text-slate-500">dự án</span>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600">68% avg</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: "68%" }}></div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px]">
            <span className="truncate">1 bàn giao hôm nay</span>
            <Clock className="w-3.5 h-3.5 text-[#004ac6]" />
          </div>
        </div>
      </div>

      {/* 3. HÀNG BIỂU ĐỒ & ACTION CENTER (65% - 35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CỘT TRÁI: BIỂU ĐỒ DOANH THU & ĐƠN HÀNG 7 NGÀY (65% -> 8 cols) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div>
              <h2 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-wider">
                Doanh thu & Lưu lượng Đơn hàng
              </h2>
              <p className="text-slate-500 text-xs mt-0.5">
                Thống kê thanh toán đối soát tự động 7 ngày gần nhất
              </p>
            </div>

            {/* Time toggle */}
            <div className="inline-flex p-0.5 bg-slate-100 rounded-lg text-xs font-heading">
              <button
                type="button"
                onClick={() => setTimeRange("7d")}
                className={`px-3 py-1 rounded-md transition-all ${timeRange === "7d"
                  ? "bg-white text-[#004ac6] font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                7 ngày qua
              </button>
              <button
                type="button"
                onClick={() => setTimeRange("30d")}
                className={`px-3 py-1 rounded-md transition-all ${timeRange === "30d"
                  ? "bg-white text-[#004ac6] font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                30 ngày qua
              </button>
              <button
                type="button"
                onClick={() => setTimeRange("quarter")}
                className={`px-3 py-1 rounded-md transition-all ${timeRange === "quarter"
                  ? "bg-white text-[#004ac6] font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                Quý này
              </button>
            </div>
          </div>

          {/* Biểu đồ SVG kết hợp Bar + Line + Callout */}
          <div className="w-full bg-slate-50/50 rounded-xl p-4 border border-slate-100">
            <div className="relative w-full h-64">
              {/* Background Horizontal Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="w-full border-b border-dashed border-slate-300"></div>
                <div className="w-full border-b border-dashed border-slate-300"></div>
                <div className="w-full border-b border-dashed border-slate-300"></div>
                <div className="w-full border-b border-dashed border-slate-300"></div>
                <div className="w-full border-b border-slate-200"></div>
              </div>

              {/* SVG Chart Layer */}
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 240">
                <defs>
                  <linearGradient id="barGradPrimary" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#004ac6" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.25" />
                  </linearGradient>
                  <linearGradient id="lineGlow" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#006c49" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#006c49" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* BARS: 7 ngày (T2 -> CN) */}
                {/* T2: 4.8M */}
                <rect x="42" y="145" width="28" height="65" rx="4" fill="url(#barGradPrimary)" className="hover:opacity-80 transition-opacity cursor-pointer" />
                {/* T3: 6.2M */}
                <rect x="136" y="125" width="28" height="85" rx="4" fill="url(#barGradPrimary)" className="hover:opacity-80 transition-opacity cursor-pointer" />
                {/* T4: 5.4M */}
                <rect x="230" y="136" width="28" height="74" rx="4" fill="url(#barGradPrimary)" className="hover:opacity-80 transition-opacity cursor-pointer" />
                {/* T5: 9.1M */}
                <rect x="324" y="85" width="28" height="125" rx="4" fill="url(#barGradPrimary)" className="hover:opacity-80 transition-opacity cursor-pointer" />
                {/* T6: 12.8M (Peak) */}
                <rect x="418" y="32" width="28" height="178" rx="4" fill="#004ac6" className="hover:opacity-90 transition-opacity cursor-pointer" />
                {/* T7: 8.4M */}
                <rect x="512" y="95" width="28" height="115" rx="4" fill="url(#barGradPrimary)" className="hover:opacity-80 transition-opacity cursor-pointer" />
                {/* CN: 6.9M */}
                <rect x="606" y="116" width="28" height="94" rx="4" fill="url(#barGradPrimary)" className="hover:opacity-80 transition-opacity cursor-pointer" />

                {/* AREA UNDER LINE (Orders trend) */}
                <polygon points="56,150 150,120 244,135 338,70 432,25 526,90 620,105 620,210 56,210" fill="url(#lineGlow)" />

                {/* POLYLINE: Orders trend */}
                <polyline
                  points="56,150 150,120 244,135 338,70 432,25 526,90 620,105"
                  fill="none"
                  stroke="#006c49"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Dots on polyline */}
                <circle cx="56" cy="150" r="4" fill="#ffffff" stroke="#006c49" strokeWidth="2.5" />
                <circle cx="150" cy="120" r="4" fill="#ffffff" stroke="#006c49" strokeWidth="2.5" />
                <circle cx="244" cy="135" r="4" fill="#ffffff" stroke="#006c49" strokeWidth="2.5" />
                <circle cx="338" cy="70" r="4" fill="#ffffff" stroke="#006c49" strokeWidth="2.5" />
                <circle cx="432" cy="25" r="6" fill="#006c49" stroke="#ffffff" strokeWidth="2" />
                <circle cx="526" cy="90" r="4" fill="#ffffff" stroke="#006c49" strokeWidth="2.5" />
                <circle cx="620" cy="105" r="4" fill="#ffffff" stroke="#006c49" strokeWidth="2.5" />

                {/* Peak Callout Annotation */}
                <g transform="translate(390, 6)">
                  <rect x="-35" y="-14" width="145" height="24" rx="4" fill="#0f172a" opacity="0.95" />
                  <text x="37" y="2" fill="#ffffff" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" textAnchor="middle">
                    12.8M VNĐ • 14 đơn
                  </text>
                </g>
              </svg>
            </div>

            {/* X-Axis Labels */}
            <div className="grid grid-cols-7 text-center font-mono text-[11px] text-slate-500 pt-3 border-t border-slate-200">
              <div><span className="font-semibold text-slate-800">Thứ 2</span><div className="text-[10px] text-slate-400">14/10</div></div>
              <div><span className="font-semibold text-slate-800">Thứ 3</span><div className="text-[10px] text-slate-400">15/10</div></div>
              <div><span className="font-semibold text-slate-800">Thứ 4</span><div className="text-[10px] text-slate-400">16/10</div></div>
              <div><span className="font-semibold text-slate-800">Thứ 5</span><div className="text-[10px] text-slate-400">17/10</div></div>
              <div><span className="font-bold text-[#004ac6]">Thứ 6</span><div className="text-[10px] text-[#004ac6] font-bold">18/10 (Đỉnh)</div></div>
              <div><span className="font-semibold text-slate-800">Thứ 7</span><div className="text-[10px] text-slate-400">19/10</div></div>
              <div><span className="font-semibold text-slate-800">Chủ Nhật</span><div className="text-[10px] text-slate-400">20/10</div></div>
            </div>
          </div>

          {/* Legend & Summary Note */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#004ac6]"></span>
                <span className="text-slate-700 font-medium">Doanh thu thanh toán (VNĐ)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span className="text-slate-700 font-medium">Số đơn kích hoạt Tool</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                <span className="text-[#004ac6] font-bold">▲</span>
                <span>Yêu cầu custom (TB: 2/ngày)</span>
              </div>
            </div>

            <div className="font-mono text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              Kỷ lục tuần: <strong className="text-slate-900">Thứ 6 (12.800.000đ - 14 đơn)</strong>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: ACTION CENTER "CẦN XỬ LÝ NGAY" (35% -> 4 cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <h2 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-wider">
                Cần Xử Lý Ngay
              </h2>
            </div>
            <span className="font-mono text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
              4 tác vụ
            </span>
          </div>

          <div className="space-y-3">
            {/* Task 1: Duyệt biên lai đơn #ORD-88294 */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 hover:bg-slate-100/60 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-[#004ac6]">
                      #ORD-88294
                    </span>
                    <span className="font-mono text-[10px] bg-blue-100 px-1 rounded text-blue-800 font-semibold">
                      VIP 2
                    </span>
                  </div>
                  <div className="font-heading text-xs font-bold text-slate-900 mt-0.5">
                    Nguyễn Văn Đức
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    OmniData Scraper Pro (365 ngày)
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-[#004ac6]">
                    499.000đ
                  </span>
                  <div className="font-mono text-[10px] text-slate-400">
                    MB Bank • 2 phút trước
                  </div>
                </div>
              </div>

              {/* Thumbnail biên lai + Nút thao tác */}
              <div className="flex items-center gap-2.5 pt-1 border-t border-slate-200/60">
                <div
                  onClick={() => alert("Phóng to biên lai MB Bank giao dịch #ORD-88294 (499.000đ)")}
                  className="relative w-12 h-12 rounded-lg bg-slate-200 overflow-hidden shrink-0 cursor-pointer group border border-slate-300"
                  title="Bấm để xem ảnh biên lai MB Bank"
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKyvBfWnll1760jeSrGmfSYTdki5Ashf9vkITkc7RZc_2JPM8tCmXHNWdM8N6zefP0epdaioVBj2eD_reWECWELGIMtwS9HcDIRKpXHzy_yiIAShTJfnkD30hENYW-JhpTq4XojG15oqSkOfoulSh8Q7-BVYQ1Akgpcu7KYgabdy1wWEBqKnO2uwnLfmSbEYRF-rhBPmrihg6nL7kkQBUn6hyQCocjbQerOQvWonyAw2B8t83bbURPNA"
                    alt="MB Bank Receipt"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <Link
                    href="/admin/orders"
                    className="w-full py-1 px-2 bg-[#004ac6] hover:bg-[#2563eb] text-white rounded-md text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Duyệt & Cấp Key Ngay</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => alert("Đã mở chế độ đối soát chi tiết biên lai!")}
                    className="w-full py-0.5 px-2 bg-white hover:bg-slate-50 text-slate-600 rounded-md text-[10px] font-medium border border-slate-200 text-center transition-colors"
                  >
                    Soát lại biên lai
                  </button>
                </div>
              </div>
            </div>

            {/* Task 2: Cấp License Key đơn #ORD-88291 */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:bg-slate-100/60 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-slate-800">
                      #ORD-88291
                    </span>
                    <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 px-1 rounded font-semibold">
                      ĐÃ NHẬN TIỀN
                    </span>
                  </div>
                  <div className="font-heading text-xs font-bold text-slate-900 mt-0.5">
                    Trần Quốc Hùng
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    SocialMulti Suite (Vĩnh Viễn)
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-emerald-600">
                    1.250.000đ
                  </span>
                  <div className="font-mono text-[10px] text-slate-400">
                    VCB • 15 phút trước
                  </div>
                </div>
              </div>

              <Link
                href="/admin/orders"
                className="w-full py-1 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs transition-colors"
              >
                <Key className="w-3 h-3" />
                <span>Bàn Giao License Key</span>
              </Link>
            </div>

            {/* Task 3: Báo giá yêu cầu làm Tool #REQ-8902 */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:bg-slate-100/60 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-purple-700">
                      #REQ-8902
                    </span>
                    <span className="font-mono text-[10px] bg-purple-100 text-purple-800 px-1 rounded font-semibold">
                      15.000 SKU
                    </span>
                  </div>
                  <div className="font-heading text-xs font-bold text-slate-900 mt-0.5">
                    Lê Hoàng Long
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    Tool Cào Sàn TMĐT Shopee/Lazada
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-slate-900">
                    12.000.000đ
                  </span>
                  <div className="font-mono text-[10px] text-slate-400">
                    Báo giá v2.0
                  </div>
                </div>
              </div>

              <Link
                href="/admin/requests"
                className="w-full py-1 px-2 bg-slate-800 hover:bg-slate-900 text-white rounded-md text-[11px] font-bold flex items-center justify-center gap-1 shadow-xs transition-colors"
              >
                <Send className="w-3 h-3 text-cyan-400" />
                <span>Xem & Gửi Báo Giá Telegram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
