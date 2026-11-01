import React from "react";
import Link from "next/link";
import { Shield, Zap, RefreshCw, Key, Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-10 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Giao Key Nhanh Chóng</h5>
              <p className="text-xs text-slate-500 mt-1">Duyệt thanh toán và cấp license key bảo mật trực tiếp trong 3-5 phút.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Đóng Gói Chuẩn Hóa</h5>
              <p className="text-xs text-slate-500 mt-1">Mọi công cụ đều được kiểm thử mã độc và ổn định trước khi niêm yết.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 shrink-0">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Thanh Toán Linh Hoạt</h5>
              <p className="text-xs text-slate-500 mt-1">Hỗ trợ chuyển khoản ngân hàng nội địa (VietQR) và USDT TRC20 an toàn.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Hỗ Trợ Kỹ Thuật 24/7</h5>
              <p className="text-xs text-slate-500 mt-1">Cập nhật phần mềm định kỳ và hỗ trợ xử lý lỗi qua Telegram & Zalo.</p>
            </div>
          </div>
        </div>

        {/* Links Navigation Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-slate-900 dark:text-white">AutoTool.dev</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Nền tảng cung cấp giải pháp tự động hóa, scraper đa luồng và bot MMO đóng gói sẵn cho cá nhân & doanh nghiệp số.
            </p>
          </div>

          <div>
            <h6 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3">
              Kho Công Cụ
            </h6>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/tools?category=crawler" className="hover:text-blue-600 transition-colors">Crawl Data & Scraper</Link></li>
              <li><Link href="/tools?category=marketing" className="hover:text-blue-600 transition-colors">Marketing & Social Tool</Link></li>
              <li><Link href="/tools?category=crypto" className="hover:text-blue-600 transition-colors">Crypto Trading Bot</Link></li>
              <li><Link href="/tools?category=automation" className="hover:text-blue-600 transition-colors">E-Commerce Automation</Link></li>
            </ul>
          </div>

          <div>
            <h6 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3">
              Khách Hàng & Dịch Vụ
            </h6>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/orders" className="hover:text-blue-600 transition-colors">Kiểm Tra Đơn Hàng & License</Link></li>
              <li><Link href="/request-tool" className="hover:text-blue-600 transition-colors">Đặt Viết Tool Theo Yêu Cầu</Link></li>
              <li><Link href="/tools" className="hover:text-blue-600 transition-colors">Hướng Dẫn Cài Đặt</Link></li>
              <li><Link href="/tools" className="hover:text-blue-600 transition-colors">Chính Sách Hoàn Tiền 100%</Link></li>
            </ul>
          </div>

          <div>
            <h6 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3">
              Cổng Thanh Toán
            </h6>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">VietQR Chuyển Khoản</span>
                <span className="text-[11px] text-slate-500">Tự động nhận diện cú pháp đơn hàng</span>
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold text-emerald-600 block">USDT (TRC20 Network)</span>
                <span className="text-[11px] text-slate-500">Đối soát TronScan tự động</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom info */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AutoTool.dev - Packaged Software & Automation Hub. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/tools" className="hover:text-blue-600 transition-colors">Điều khoản dịch vụ</Link>
            <Link href="/tools" className="hover:text-blue-600 transition-colors">Bảo mật thông tin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
