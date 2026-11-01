"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessagesSquare,
  Copy,
  Download,
  Eye,
  PlayCircle,
  Plus,
  Zap,
  Send,
  ExternalLink,
  Ban,
  FileSpreadsheet,
  Monitor,
  Container,
  Table as TableIcon,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuoteItem {
  id: string;
  title: string;
  description: string;
  price: number;
}

export function AdminRequestsView() {
  const [activeVersion, setActiveVersion] = useState<"v1" | "v2" | "v3">("v2");

  const [lineItems, setLineItems] = useState<QuoteItem[]>([
    {
      id: "01",
      title: "Module Crawler Đa Luồng & Bóc Tách DOM Sàn TMĐT",
      description: "Bóc tách 15.000 SKU từ Shopee & Lazada, hỗ trợ 50 worker song song tối ưu RAM/CPU.",
      price: 4500000,
    },
    {
      id: "02",
      title: "Module Bypass Cloudflare Turnstile & Xoay Proxy Dân Cư",
      description: "Tự động nhận diện thử thách bot, giải mã token ẩn, cơ chế pool xoay vòng IP dân cư khi chạm giới hạn tần suất.",
      price: 3500000,
    },
    {
      id: "03",
      title: "Tích Hợp Google Sheets API & Webhook Dispatcher",
      description: "Đồng bộ realtime lịch chạy 30 phút/lần, gửi alert Telegram ngay khi phát hiện giảm giá sốc >20%.",
      price: 2500000,
    },
    {
      id: "04",
      title: "Gói Triển Khai Docker VPS Ubuntu & Bàn Giao Hướng Dẫn",
      description: "Đóng gói Docker Compose, cấu hình Cronjob, cung cấp video hướng dẫn thao tác và hỗ trợ cài đặt Ultraview 1-1.",
      price: 1500000,
    },
  ]);

  const totalAmount = lineItems.reduce((acc, item) => acc + item.price, 0);

  const handlePriceChange = (index: number, newPrice: number) => {
    const updated = [...lineItems];
    updated[index].price = newPrice;
    setLineItems(updated);
  };

  const handleSendQuote = () => {
    alert(`Đã gửi thành công Báo giá ${activeVersion.toUpperCase()} (Tổng: ${totalAmount.toLocaleString("vi-VN")} đ) trực tiếp vào bot Telegram của khách Lê Hoàng Long (@long_mkt)!`);
  };

  return (
    <div className="w-full flex-1 p-6 pb-20 space-y-6">
      {/* 1. TOP NAVIGATION & ACTION CONTEXT BAR */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80">
        <div className="space-y-1">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
            <Link href="/admin" className="hover:text-[#004ac6] transition-colors">
              Admin Hub
            </Link>
            <span>/</span>
            <Link href="/admin/requests" className="hover:text-[#004ac6] transition-colors">
              Yêu cầu làm Tool & Báo giá
            </Link>
            <span>/</span>
            <span className="text-[#004ac6] font-bold">#REQ-8902</span>
          </div>

          {/* Main Title & Status Badge */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <h1 className="font-heading text-xl font-extrabold text-slate-900 tracking-tight">
              Yêu Cầu Làm Tool: Tool Cào Dữ Liệu Sàn TMĐT Đa Luồng & Bắn Google Sheets
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#004ac6] font-mono text-[10px] font-bold border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-[#004ac6] animate-pulse"></span>
              ĐANG BÁO GIÁ (QUOTING)
            </div>
          </div>
        </div>

        {/* Quick Actions Group */}
        <div className="flex items-center flex-wrap gap-2.5">
          <Link
            href="/admin/chats"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors text-xs font-semibold shadow-xs"
          >
            <MessagesSquare className="w-4 h-4 text-[#004ac6]" />
            <span>Mở chat làm rõ yêu cầu (@long_mkt)</span>
            <span className="font-mono text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              Telegram Synced
            </span>
          </Link>

          <button
            type="button"
            onClick={() => {
              if (confirm("Xác nhận từ chối yêu cầu này?")) {
                alert("Đã từ chối yêu cầu #REQ-8902.");
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors shadow-xs"
          >
            <Ban className="w-3.5 h-3.5" />
            <span>Từ chối (Reject)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Đã sao chép link yêu cầu #REQ-8902!");
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold transition-colors shadow-xs"
            title="Sao chép link chia sẻ yêu cầu"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Sao chép link</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN ASYMMETRIC 2-COLUMN CONTENT LAYOUT (40% - 60%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUMN A: 40% (Client Original Request & Specs) (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 space-y-5">
            {/* Section: Client Profile */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  Khách Hàng (Client Profile)
                </span>
                <span className="font-mono text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Xác thực DN
                </span>
              </div>

              <div className="flex items-start gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                <div className="w-11 h-11 rounded-full bg-[#004ac6] flex items-center justify-center text-white font-heading font-extrabold text-base shrink-0 shadow-xs">
                  L
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-heading font-bold text-xs text-slate-900 truncate">
                      Lê Hoàng Long
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">2 giờ trước</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    E-commerce Lead • GrowthRetail JSC
                  </span>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-slate-600 font-mono text-[11px]">
                      <span>long.le@growthretail.vn</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-[#004ac6] font-mono text-[11px] font-bold">
                        <Send className="w-3 h-3" />
                        <span>@long_mkt</span>
                      </div>
                      <a
                        href="https://t.me/long_mkt"
                        target="_blank"
                        className="text-[#004ac6] hover:underline font-mono text-[10px] font-bold flex items-center gap-0.5"
                      >
                        <span>Chat Telegram</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Technical Requirements & Constraints */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                Mục Tiêu Bài Toán & Kỹ Thuật
              </span>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-3">
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  “Cần phần mềm tự động hóa theo dõi biến động giá và tồn kho của{" "}
                  <strong className="text-[#004ac6] font-bold not-italic">15.000 sản phẩm</strong> trên
                  Shopee & Lazada. Tự động bypass Cloudflare/Turnstile, xoay vòng Proxy dân cư, chạy ngầm định kỳ 30 phút/lần và đồng bộ dữ liệu vào Google Sheets & Webhook nội bộ.”
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                    <span className="font-mono text-[10px] text-slate-400 block">Ngân sách dự kiến</span>
                    <span className="font-mono text-xs font-bold text-emerald-600">8M – 15M VNĐ</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                    <span className="font-mono text-[10px] text-slate-400 block">Hạn chót mong muốn</span>
                    <div className="flex items-center gap-1 mt-0.5 font-mono text-[10px] font-bold text-slate-800">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>28/10/2026 (10 ngày)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Tags */}
              <div>
                <span className="font-mono text-[10px] text-slate-400 block mb-2 font-bold uppercase">
                  Nền tảng mong muốn bàn giao:
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-mono text-[11px] font-medium border border-slate-200">
                    <Monitor className="w-3.5 h-3.5 text-[#004ac6]" />
                    Windows Executable (.exe)
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-mono text-[11px] font-medium border border-slate-200">
                    <Container className="w-3.5 h-3.5 text-emerald-600" />
                    Docker Container (Ubuntu VPS)
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-mono text-[11px] font-medium border border-slate-200">
                    <TableIcon className="w-3.5 h-3.5 text-blue-600" />
                    Google Sheets Add-on
                  </span>
                </div>
              </div>
            </div>

            {/* Section: Attached Raw Files */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  Tài Liệu Đính Kèm (3 files)
                </span>
                <span className="font-mono text-[10px] text-slate-400">custom_request_files</span>
              </div>

              <div className="space-y-2">
                {/* File 1: Excel */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-slate-900 truncate">
                        danh_sach_15000_sku_mau.xlsx
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        1.4 MB • Excel Raw SKU Dataset
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Đang tải xuống danh sách 15.000 SKU mẫu...")}
                    className="p-1.5 rounded-md hover:bg-white text-slate-500 hover:text-[#004ac6] transition-colors"
                    title="Tải xuống tập tin"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                {/* File 2: Screenshot Captcha */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded bg-blue-100 text-[#004ac6] flex items-center justify-center shrink-0">
                      <Eye className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-slate-900 truncate">
                        luong_block_turnstile_screenshot.png
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        850 KB • Bằng chứng lỗi Challenge Turnstile
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Đang mở xem trước ảnh lỗi Turnstile Challenge...")}
                    className="p-1.5 rounded-md hover:bg-white text-slate-500 hover:text-[#004ac6] transition-colors"
                    title="Xem trước ảnh"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* File 3: Video Demo */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <PlayCircle className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-slate-900 truncate">
                        video_thao_tac_tay_hien_tai.mp4
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        14.2 MB • Video demo quy trình hiện tại
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Đang mở trình phát video quy trình thao tác tay...")}
                    className="p-1.5 rounded-md hover:bg-white text-slate-500 hover:text-purple-600 transition-colors"
                    title="Xem video"
                  >
                    <PlayCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Connect CTA */}
            <div className="pt-2">
              <Link
                href="/admin/chats"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#004ac6] text-white font-heading text-xs font-bold shadow-xs hover:bg-[#2563eb] transition-colors"
              >
                <MessagesSquare className="w-4 h-4" />
                <span>Mở Chat Trao Đổi Kỹ Thuật Với Khách</span>
              </Link>
            </div>
          </div>
        </div>

        {/* COLUMN B: 60% (Quotes Multi-Version Engine) (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 space-y-5">
            {/* Multi-version Tab Selector Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/60">
                {/* Tab 1: v1.0 Expired */}
                <button
                  type="button"
                  onClick={() => setActiveVersion("v1")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg font-heading text-xs font-medium flex items-center gap-1.5 transition-all",
                    activeVersion === "v1"
                      ? "bg-white text-slate-900 shadow-xs font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  <span>v1.0 (8.5M)</span>
                  <span className="font-mono text-[9px] px-1 rounded bg-slate-200 text-slate-600">
                    Hết hạn
                  </span>
                </button>

                {/* Tab 2: v2.0 Active */}
                <button
                  type="button"
                  onClick={() => setActiveVersion("v2")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg font-heading text-xs font-medium flex items-center gap-1.5 transition-all",
                    activeVersion === "v2"
                      ? "bg-white text-[#004ac6] shadow-xs font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  <span className="w-2 h-2 rounded-full bg-[#004ac6]"></span>
                  <span>v2.0 (12.0M)</span>
                  <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-blue-100 text-[#004ac6] font-bold">
                    Hiện tại
                  </span>
                </button>
              </div>

              {/* Action Draft v3.0 */}
              <button
                type="button"
                onClick={() => alert("Đã tạo bản nháp Báo giá v3.0 dựa trên v2.0!")}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#004ac6] text-xs font-bold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tạo phiên bản v3.0 (Draft)</span>
              </button>
            </div>

            {/* Notice Alert for Active Client Session */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-slate-800 gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <Eye className="w-4 h-4 text-[#004ac6] shrink-0" />
                <span className="text-xs">
                  Khách hàng <strong className="text-[#004ac6]">Lê Hoàng Long</strong> đã mở xem báo giá v2.0 qua Telegram lúc <span className="font-mono font-bold">11:20 (hôm nay)</span>.
                </span>
              </div>
              <button
                type="button"
                onClick={() => alert("Đã chuyển yêu cầu #REQ-8902 thành Dự án chính thức trong module Dự án & Tiến độ!")}
                className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-heading text-xs font-bold shadow-xs transition-colors"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Chuyển thành Dự án</span>
              </button>
            </div>

            {/* Detailed Work Scope Line Items Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Bảng Hạng Mục Báo Giá Chi Tiết
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200">
                    {lineItems.length} hạng mục
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newItem: QuoteItem = {
                      id: `0${lineItems.length + 1}`,
                      title: "Hạng mục công việc bổ sung",
                      description: "Mô tả chi tiết giải pháp kỹ thuật...",
                      price: 1000000,
                    };
                    setLineItems([...lineItems, newItem]);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#004ac6] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm hạng mục công việc</span>
                </button>
              </div>

              {/* Line Items List */}
              <div className="space-y-2.5">
                {lineItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/60 transition-colors space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[#004ac6] font-bold">
                            #{item.id}
                          </span>
                          <input
                            type="text"
                            defaultValue={item.title}
                            className="font-heading font-bold text-xs text-slate-900 bg-transparent outline-none w-full focus:bg-white focus:px-2 rounded"
                          />
                        </div>
                        <p className="mt-1 text-[11px] text-slate-500">
                          {item.description}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 justify-end">
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => handlePriceChange(idx, Number(e.target.value))}
                            className="w-28 text-right font-mono text-xs font-bold text-slate-900 bg-white border border-slate-200 px-2 py-1 rounded outline-none focus:border-[#004ac6]"
                          />
                          <span className="font-mono text-xs text-slate-500">đ</span>
                        </div>
                        <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                          SL: 1 × {item.price.toLocaleString("vi-VN")} đ
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Parameters & Summary Card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-3 border-b border-slate-200 text-xs">
                <div>
                  <span className="font-mono text-[10px] text-slate-400 block font-bold uppercase">
                    Thời gian bàn giao
                  </span>
                  <span className="font-heading font-bold text-slate-900">
                    7 ngày làm việc
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-400 block font-bold uppercase">
                    Chính sách thanh toán
                  </span>
                  <span className="font-mono text-slate-700">
                    50% cọc • 50% nghiệm thu
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-400 block font-bold uppercase">
                    Thời hạn hiệu lực
                  </span>
                  <span className="font-mono text-slate-700">
                    15 ngày kể từ ngày gửi
                  </span>
                </div>
              </div>

              {/* Total & Action row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 block">Tổng chi phí dự án (Trọn gói):</span>
                  <div className="font-mono text-2xl font-extrabold text-[#004ac6]">
                    {totalAmount.toLocaleString("vi-VN")} <span className="text-xs font-normal text-slate-400">VNĐ</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert("Đã lưu bản nháp báo giá v2.0!")}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 shadow-xs transition-colors"
                  >
                    Lưu Bản Nháp
                  </button>
                  <button
                    type="button"
                    onClick={handleSendQuote}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-heading text-xs font-bold text-white bg-[#004ac6] hover:bg-[#2563eb] shadow-xs transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi Báo Giá Ngay (Sync Telegram Bot)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
