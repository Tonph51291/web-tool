"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, PhoneCall, HelpCircle, Bot, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover dialog */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm">Hỗ Trợ Kỹ Thuật AutoTool</h4>
                <div className="flex items-center gap-1.5 text-xs text-blue-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Kỹ thuật viên đang online 24/7</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Support Channels */}
          <div className="p-4 space-y-2.5 text-sm">
            <p className="text-xs text-slate-500 pb-1">
              Chọn kênh kết nối trực tiếp với đội ngũ kỹ thuật để nhận hỗ trợ cài đặt hoặc giải đáp lỗi:
            </p>

            {/* Telegram Channel */}
            <a
              href="https://t.me/AutoToolSupportBot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-slate-800/80 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-500 flex items-center justify-center font-bold">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    Telegram Kỹ Thuật
                  </div>
                  <div className="text-xs text-slate-500">Phản hồi tức thì &lt; 2 phút</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors" />
            </a>

            {/* Zalo / Hotline */}
            <a
              href="https://zalo.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-800/80 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    Zalo Hỗ Trợ 24/7
                  </div>
                  <div className="text-xs text-slate-500">Hotline: 0988.xxx.xxx</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </a>

            {/* Custom Request Tool */}
            <a
              href="/request-tool"
              className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-slate-800/80 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    Đặt Làm Tool Theo Yêu Cầu
                  </div>
                  <div className="text-xs text-slate-500">Nhận báo giá dự án trong 2h</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </a>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
            Cam kết hoàn tiền 100% nếu phần mềm không hoạt động đúng mô tả.
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-3 rounded-full text-white font-medium shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 active:scale-95 group",
          isOpen ? "bg-slate-800 hover:bg-slate-700" : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
        )}
        aria-label="Mở khung hỗ trợ kỹ thuật"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900 animate-pulse" />
        </div>
        <span className="hidden sm:inline-block text-sm font-semibold">
          {isOpen ? "Đóng hỗ trợ" : "Hỗ trợ 24/7"}
        </span>
      </button>
    </div>
  );
}

