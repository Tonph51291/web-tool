"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  RefreshCw,
  Plus,
  Send,
  Paperclip,
  Smile,
  FileSpreadsheet,
  PlayCircle,
  ExternalLink,
  Download,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "customer" | "admin" | "system";
  channel: "web" | "telegram" | "system";
  text: string;
  time: string;
  attachment?: {
    type: "excel" | "video";
    name: string;
    size: string;
  };
}

export function AdminChatsView() {
  const [activeChannelTab, setActiveChannelTab] = useState("all");
  const [selectedChatId, setSelectedChatId] = useState("chat-1");
  const [inputText, setInputText] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-0",
      sender: "system",
      channel: "system",
      text: "Yêu cầu đặt làm tool #REQ-8902 được gửi từ Web lúc 10:15",
      time: "10:15",
    },
    {
      id: "m-1",
      sender: "customer",
      channel: "web",
      text: "Chào team, bên mình cần một tool cào dữ liệu sản phẩm, doanh số bán và đánh giá của 15.000 SKU trên sàn Shopee và TikTok Shop. Cần vượt được Turnstile Captcha và xuất file Google Sheets tự động mỗi 6 giờ.\n\nMình có đính kèm file danh sách link sản phẩm mẫu dưới đây, team kiểm tra và báo giá giúp mình nhé:",
      time: "10:18 • Gửi từ Web LiveChat",
      attachment: {
        type: "excel",
        name: "danh_sach_15000_sku_mau.xlsx",
        size: "1.4 MB • Excel Spreadsheet",
      },
    },
    {
      id: "m-2",
      sender: "admin",
      channel: "web",
      text: "Chào anh Long, team AutoTool đã nhận spec 15.000 SKU. Em đang soạn Báo giá v2.0 bổ sung module giải Captcha Turnstile và worker đa luồng để đáp ứng lịch quét 6 giờ/lần nhé anh!",
      time: "10:45 • Admin Portal",
    },
    {
      id: "m-3",
      sender: "admin",
      channel: "telegram",
      text: "Báo giá v2.0 đã được gửi trực tiếp vào bot Telegram của anh lúc 11:20 rồi nhé! Tổng chi phí hoàn thiện trọn gói là 12.000.000đ, bàn giao mã nguồn sau 7 ngày làm việc. Anh check mục File PDF xem qua giúp em nhé!",
      time: "11:20 • Đồng bộ qua Telegram Bot",
    },
    {
      id: "m-4",
      sender: "customer",
      channel: "telegram",
      text: "Dạ em xem rồi anh ơi, giá 12tr ok ạ! Em vừa quay video demo lỗi luồng gửi qua Telegram cho anh xem rồi nhé. Anh xem flow thao tác tay trên web TikTok này:",
      time: "11:35 • Telegram Message",
      attachment: {
        type: "video",
        name: "video_thao_tac_tay_hien_tai.mp4",
        size: "14.2 MB • Video demo quy trình",
      },
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: "admin",
      channel: "web",
      text: inputText,
      time: "Vừa xong • Admin Portal",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  return (
    <div className="w-full flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      {/* 1. TOP NAVIGATION & SYNC STATUS MICRO-BAR */}
      <div className="flex items-center justify-between px-6 py-2 bg-white border-b border-slate-200/80 shadow-2xs shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-mono text-[10px] font-bold border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>GATEWAY MULTI-CHANNEL RUNNING</span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-600 flex items-center gap-1 font-medium">
            <RefreshCw className="w-3.5 h-3.5 text-[#004ac6]" />
            2-Way Sync: WebSockets + Telegram Bot API v7.4
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            Active Agents: <strong className="text-slate-900">3 Online</strong>
          </span>
          <button
            type="button"
            onClick={() => alert("Mở cấu hình định tuyến tin nhắn Telegram / Webhook...")}
            className="flex items-center gap-1 px-2.5 py-1 text-slate-600 hover:text-[#004ac6] hover:bg-slate-100 rounded text-xs font-semibold transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Cấu hình định tuyến</span>
          </button>
        </div>
      </div>

      {/* 2. 3-COLUMN CHAT ARCHITECTURE */}
      <div className="grid grid-cols-12 gap-0 flex-1 min-h-0 bg-white">
        {/* ========================================== */}
        {/* COLUMN 1: CONVERSATION LIST (25% ~ col-3)  */}
        {/* ========================================== */}
        <section className="col-span-3 flex flex-col h-full bg-white border-r border-slate-200/80 overflow-hidden">
          {/* Header */}
          <div className="p-4 pb-3 border-b border-slate-100 shrink-0 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-sm font-bold text-slate-900 tracking-tight">
                  Hội thoại đa kênh
                </h2>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-[#004ac6] font-bold">
                  18
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="p-1 text-slate-400 hover:text-[#004ac6] hover:bg-slate-100 rounded-lg transition-colors"
                  title="Làm mới"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="p-1 bg-[#004ac6] text-white hover:bg-[#2563eb] rounded-lg transition-colors"
                  title="Cuộc trò chuyện mới"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm tên khách, #ORD, #REQ, email..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs rounded-lg outline-none focus:bg-white focus:border-[#004ac6] transition-all"
              />
            </div>

            {/* Filter segments */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveChannelTab("all")}
                className={cn(
                  "px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 transition-all",
                  activeChannelTab === "all"
                    ? "bg-[#004ac6] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                Tất cả (18)
              </button>
              <button
                type="button"
                onClick={() => setActiveChannelTab("unread")}
                className={cn(
                  "px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 transition-all flex items-center gap-1",
                  activeChannelTab === "unread"
                    ? "bg-rose-600 text-white"
                    : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                Chưa đọc (5)
              </button>
              <button
                type="button"
                onClick={() => setActiveChannelTab("order")}
                className={cn(
                  "px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 transition-all",
                  activeChannelTab === "order"
                    ? "bg-[#004ac6] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                ORDER (8)
              </button>
            </div>
          </div>

          {/* Conversations Scroll Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {/* Conversation 1: Lê Hoàng Long (Selected) */}
            <div
              onClick={() => setSelectedChatId("chat-1")}
              className={cn(
                "p-3.5 cursor-pointer transition-colors relative border-l-4",
                selectedChatId === "chat-1"
                  ? "bg-blue-50/70 border-l-[#004ac6]"
                  : "hover:bg-slate-50 border-l-transparent"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-[#004ac6] flex items-center justify-center text-white font-heading font-bold text-xs shadow-xs">
                    L
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-xs border border-slate-200">
                    <span title="Telegram Synced">
                      <Send className="w-2.5 h-2.5 text-[#004ac6]" />
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-heading font-bold text-xs text-slate-900 truncate">
                      Lê Hoàng Long
                    </span>
                    <span className="font-mono text-[10px] text-[#004ac6] font-bold">
                      Vừa xong
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-1.5 py-0.2 rounded font-mono text-[9px] bg-blue-100 text-[#004ac6] font-bold">
                      #REQ-8902
                    </span>
                    <span className="text-[10px] text-slate-500 truncate">
                      Tool Cào Sàn TMĐT
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-700 font-medium truncate mb-1">
                    Anh ơi em vừa nộp video demo thao tác tay qua Telegram rồi...
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      @long_mkt
                    </span>
                    <span className="w-4 h-4 rounded-full bg-[#004ac6] text-white text-[9px] font-mono font-bold flex items-center justify-center">
                      2
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversation 2: Nguyễn Văn Đức */}
            <div
              onClick={() => setSelectedChatId("chat-2")}
              className={cn(
                "p-3.5 cursor-pointer transition-colors relative border-l-4",
                selectedChatId === "chat-2"
                  ? "bg-blue-50/70 border-l-[#004ac6]"
                  : "hover:bg-slate-50 border-l-transparent"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-heading font-bold text-xs flex items-center justify-center shrink-0">
                  Đ
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-heading font-bold text-xs text-slate-900 truncate">
                      Nguyễn Văn Đức
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">8p trước</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-1.5 py-0.2 rounded font-mono text-[9px] bg-slate-200 text-slate-700 font-medium">
                      #ORD-88294
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-rose-100 text-rose-800 font-bold">
                      Chờ duyệt bill
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mb-1">
                    Em đã chuyển khoản 499.000 VNĐ qua MB Bank rồi ạ
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">Gói 30 ngày Scraper</span>
                    <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-mono font-bold flex items-center justify-center">
                      1
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* COLUMN 2: REALTIME CHAT STREAM (50% ~ col-6) */}
        {/* ========================================== */}
        <section className="col-span-6 flex flex-col h-full bg-slate-50/50 border-r border-slate-200/80 overflow-hidden">
          {/* Thread Header */}
          <div className="px-5 py-3 bg-white border-b border-slate-200/80 flex items-center justify-between shrink-0 shadow-2xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full bg-[#004ac6] flex items-center justify-center text-white font-heading font-bold text-xs shadow-xs">
                  L
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-xs text-slate-900 truncate">
                    Lê Hoàng Long
                  </h3>
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                    GrowthRetail JSC
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Online
                  </span>
                  <span>•</span>
                  <span className="font-mono text-[#004ac6] font-medium">
                    Web LiveChat ⇄ Telegram (@long_mkt)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Link Badge to #REQ-8902 */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/admin/requests"
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-[#004ac6] font-mono text-[11px] font-bold border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <span>#REQ-8902 (12.000.000đ)</span>
              </Link>
            </div>
          </div>

          {/* Message History Stream Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Day Divider */}
            <div className="flex items-center justify-center">
              <span className="px-3 py-1 rounded-full bg-slate-200/80 text-slate-600 font-mono text-[10px] font-medium">
                Hôm nay, 18 Tháng 10, 2026
              </span>
            </div>

            {/* System Event Pill */}
            <div className="flex justify-center">
              <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 font-mono text-[10px] shadow-2xs">
                Yêu cầu đặt làm tool <strong className="text-slate-800">#REQ-8902</strong> được gửi từ Web lúc 10:15
              </div>
            </div>

            {/* Message List */}
            {messages.map((msg) => {
              if (msg.sender === "system") return null;

              if (msg.sender === "customer") {
                return (
                  <div key={msg.id} className="flex items-start gap-2.5 max-w-lg">
                    <div className="w-7 h-7 rounded-full bg-[#004ac6] text-white font-heading font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      L
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-[11px] text-slate-800">
                          Lê Hoàng Long
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">{msg.time}</span>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-3.5 text-slate-800 text-xs leading-relaxed shadow-xs space-y-2.5">
                        <p className="whitespace-pre-line">{msg.text}</p>

                        {/* File preview attachment */}
                        {msg.attachment && msg.attachment.type === "excel" && (
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                <FileSpreadsheet className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <span className="font-heading font-bold text-xs text-slate-900 block truncate">
                                  {msg.attachment.name}
                                </span>
                                <span className="font-mono text-[10px] text-slate-400 block">
                                  {msg.attachment.size}
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => alert("Đang tải xuống tệp Excel đính kèm...")}
                              className="p-1.5 text-slate-400 hover:text-[#004ac6] transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {msg.attachment && msg.attachment.type === "video" && (
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50 border border-purple-200">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-purple-200 text-purple-700 flex items-center justify-center shrink-0">
                                <PlayCircle className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <span className="font-heading font-bold text-xs text-slate-900 block truncate">
                                  {msg.attachment.name}
                                </span>
                                <span className="font-mono text-[10px] text-purple-700 block">
                                  {msg.attachment.size}
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => alert("Đang phát video demo lỗi quy trình...")}
                              className="p-1.5 text-purple-600 hover:text-purple-800 transition-colors"
                            >
                              <PlayCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              // Admin Messages
              return (
                <div key={msg.id} className="flex flex-col items-end max-w-lg ml-auto space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-400">{msg.time}</span>
                    <span className="font-heading font-bold text-[11px] text-[#004ac6]">
                      Alex Dev (Quản trị viên)
                    </span>
                  </div>

                  <div
                    className={cn(
                      "rounded-2xl rounded-tr-xs p-3.5 text-xs leading-relaxed shadow-xs",
                      msg.channel === "telegram"
                        ? "bg-slate-900 text-white border border-slate-800"
                        : "bg-[#004ac6] text-white"
                    )}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input & Toolbar */}
          <div className="p-4 bg-white border-t border-slate-200">
            <form onSubmit={handleSendMessage} className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400 pb-1">
                <button
                  type="button"
                  className="p-1.5 hover:text-[#004ac6] hover:bg-slate-100 rounded transition-colors"
                  title="Đính kèm tài liệu"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 hover:text-[#004ac6] hover:bg-slate-100 rounded transition-colors"
                  title="Chèn biểu tượng cảm xúc"
                >
                  <Smile className="w-4 h-4" />
                </button>
                <span className="text-slate-300">|</span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Kênh gửi: <strong className="text-[#004ac6]">Web LiveChat & Telegram Sync</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Nhập nội dung phản hồi khách hàng... (Enter để gửi)"
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl outline-none focus:bg-white focus:border-[#004ac6] transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#004ac6] hover:bg-[#2563eb] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* ========================================== */}
        {/* COLUMN 3: CRM CONTEXT & CLIENT DETAILS (25% ~ col-3) */}
        {/* ========================================== */}
        <section className="col-span-3 flex flex-col h-full bg-white overflow-y-auto p-5 space-y-5">
          <div className="pb-3 border-b border-slate-100">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-2">
              Thông Tin Khách Hàng (CRM Context)
            </span>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#004ac6] text-white font-heading font-extrabold text-sm flex items-center justify-center shadow-xs">
                L
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-slate-900">
                  Lê Hoàng Long
                </h4>
                <span className="text-[11px] text-slate-500">
                  GrowthRetail JSC
                </span>
              </div>
            </div>

            <div className="mt-3 space-y-1.5 text-xs">
              <div className="text-slate-600 font-mono text-[11px]">long.le@growthretail.vn</div>
              <div className="flex items-center gap-1 font-mono text-[11px] text-[#004ac6] font-bold">
                <Send className="w-3 h-3" />
                <span>@long_mkt</span>
              </div>
            </div>
          </div>

          {/* Active Request Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
              Yêu cầu đang xử lý
            </span>
            <div className="font-heading font-bold text-xs text-slate-900">
              #REQ-8902: Tool Cào Sàn TMĐT
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Báo giá v2.0:</span>
              <strong className="font-mono text-[#004ac6]">12.000.000 đ</strong>
            </div>
            <Link
              href="/admin/requests"
              className="text-xs font-semibold text-[#004ac6] hover:underline flex items-center gap-1 pt-1"
            >
              <span>Xem chi tiết báo giá</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Internal Notes */}
          <div className="space-y-1.5">
            <label className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
              Ghi Chú Kỹ Thuật Nội Bộ (Admin Notes)
            </label>
            <textarea
              rows={4}
              defaultValue="Khách cần ưu tiên tính năng bypass Turnstile của sàn Shopee trước, sau đó mới đến TikTok Shop. Đã chuẩn bị pool 50 Proxy dân cư."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 outline-none focus:bg-white focus:border-[#004ac6]"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
