import React from "react";
import { ShoppingCart, QrCode, ShieldCheck, Key } from "lucide-react";

export function PaymentGuideSteps() {
  const steps = [
    {
      num: "01",
      icon: ShoppingCart,
      title: "Chọn Tool & Gói Bản Quyền",
      desc: "Lựa chọn phần mềm phù hợp với nhu cầu và gói thời hạn (1 tháng, 1 năm hoặc vĩnh viễn).",
      color: "blue",
    },
    {
      num: "02",
      icon: QrCode,
      title: "Thanh Toán VietQR / USDT",
      desc: "Quét mã QR chuyển khoản ngân hàng nội địa hoặc chuyển USDT TRC20 chính xác theo tỷ giá chốt.",
      color: "emerald",
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Đối Soát Tự Động & Thủ Công",
      desc: "Hệ thống và Admin kiểm tra mã giao dịch thực tế qua App ngân hàng hoặc TronScan trong 3-5 phút.",
      color: "amber",
    },
    {
      num: "04",
      icon: Key,
      title: "Nhận License Key & Cài Đặt",
      desc: "Key bản quyền và link tải bộ cài đặt xuất hiện tức thì trong tài khoản của bạn để sử dụng ngay.",
      color: "purple",
    },
  ];

  return (
    <section className="w-full bg-white dark:bg-slate-950 py-20 border-b border-slate-200 dark:border-slate-800" id="payment-process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-700 dark:text-emerald-400 uppercase tracking-widest font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 mb-3">
            QUY TRÌNH MINH BẠCH - NHANH CHÓNG
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            CÁCH THỨC MUA & NHẬN BẢN QUYỀN TRONG 4 BƯỚC
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Không cần chờ đợi lâu, quy trình đối soát an toàn bảo đảm bàn giao phần mềm chuẩn xác 100%.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative hover:border-cyan-500/50 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-300 dark:text-slate-700">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

