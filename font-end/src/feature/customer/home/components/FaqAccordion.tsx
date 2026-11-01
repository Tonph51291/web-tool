"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Phần mềm sau khi mua có được hỗ trợ cài đặt và hướng dẫn sử dụng không?",
      a: "Có 100%. Mọi công cụ đều đi kèm tài liệu hướng dẫn từng bước và video thao tác chi tiết. Đội ngũ kỹ thuật viên của AutoTool.dev hỗ trợ qua UltraView / TeamViewer hoặc Telegram 24/7 nếu bạn gặp khó khăn.",
    },
    {
      q: "Tôi có thể đổi máy tính sau khi kích hoạt License Key không?",
      a: "Hoàn toàn được. Mỗi License Key cho phép reset thiết bị tối đa 2 lần/tháng trực tiếp trong trang quản lý đơn hàng của bạn để chuyển sang máy tính mới hoặc VPS khác.",
    },
    {
      q: "Thanh toán bằng USDT TRC20 xử lý trong bao lâu?",
      a: "Giao dịch qua mạng TRC20 hoàn tất chỉ sau 30-60 giây trên blockchain. Sau khi bạn nhập mã TxID và bấm 'Xác nhận', hệ thống đối soát và kích hoạt đơn hàng trong 3-5 phút.",
    },
    {
      q: "Chính sách bảo hành và hoàn tiền của AutoTool.dev như thế nào?",
      a: "Chúng tôi cam kết hoàn tiền 100% trong vòng 24 giờ đầu tiên nếu công cụ bị lỗi kỹ thuật mà đội ngũ phát triển không thể khắc phục được cho bạn.",
    },
  ];

  return (
    <section className="w-full bg-slate-50 dark:bg-slate-900/60 py-20 border-b border-slate-200 dark:border-slate-800" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            CÂU HỎI THƯỜNG GẶP (FAQ)
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            Giải đáp mọi thắc mắc về cách kích hoạt bản quyền, bảo mật và chính sách hoàn tiền.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180 text-blue-600 dark:text-cyan-400"
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

