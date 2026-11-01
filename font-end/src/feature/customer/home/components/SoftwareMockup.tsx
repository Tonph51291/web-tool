import React from "react";
import { TrendingUp, Table, Check } from "lucide-react";

export function SoftwareMockup() {
  const tableData = [
    { sku: "SP-8834", name: "Tai nghe Sony WH-1000XM5 ANC", price: "7.490.000đ", stock: "89 pcs", platform: "Shopee Mall", status: "Exported ✓" },
    { sku: "SP-7712", name: "Bàn phím cơ Keychron K3 Pro QMK", price: "2.150.000đ", stock: "45 pcs", platform: "Lazada Mall", status: "Exported ✓" },
    { sku: "SP-2005", name: "Màn hình LG UltraFine 27UP850 4K", price: "8.990.000đ", stock: "120 pcs", platform: "TikTok Shop", status: "Exported ✓" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 -mt-6 sm:-mt-10 mb-20 relative z-20">
      <div className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-left transition-all">
        {/* App Window Header Bar */}
        <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="font-heading font-semibold text-xs text-slate-700 dark:text-slate-300 ml-2">
              OmniData Studio Pro v3.2.0 - Active License
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>RUNNING (50 Threads Active)</span>
            </span>
          </div>
        </div>

        {/* Software UI Dashboard View */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white">
          {/* 4 Live Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700/80">
              <div className="text-xs font-medium text-slate-400">SKU Đã cào hôm nay</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">125,480</div>
              <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs hôm qua
              </div>
            </div>

            <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700/80">
              <div className="text-xs font-medium text-slate-400">Tốc độ trích xuất</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 mt-1">142 req/s</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">Độ trễ TB: 24ms</div>
            </div>

            <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700/80">
              <div className="text-xs font-medium text-slate-400">Tỷ lệ Bypass Captcha</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">99.8%</div>
              <div className="text-xs text-emerald-400 mt-1 font-mono">Cloudflare v3 Passed</div>
            </div>

            <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700/80">
              <div className="text-xs font-medium text-slate-400">Thời gian tiết kiệm</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400 mt-1">42 Giờ</div>
              <div className="text-xs text-purple-300 mt-1 font-mono">Quy đổi: 3 Nhân sự</div>
            </div>
          </div>

          {/* Data Preview Table & Live Progress Strip */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-800 gap-2">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-slate-200">
                  Bảng xem trước dữ liệu xuất bản Real-time (CSV / Excel / BigQuery)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Tiến độ cào: 84%</span>
                <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full w-[84%] rounded-full transition-all duration-1000" />
                </div>
              </div>
            </div>

            {/* Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-slate-300 min-w-[550px]">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800 bg-slate-900/50">
                    <th className="py-2 px-3">SKU</th>
                    <th className="py-2 px-3">TÊN SẢN PHẨM</th>
                    <th className="py-2 px-3">GIÁ SÀN</th>
                    <th className="py-2 px-3">TỒN KHO</th>
                    <th className="py-2 px-3">NGUỒN</th>
                    <th className="py-2 px-3 text-right">TRẠNG THÁI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {tableData.map((row) => (
                    <tr key={row.sku} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-2.5 px-3 text-cyan-400 font-bold">{row.sku}</td>
                      <td className="py-2.5 px-3 text-white font-sans font-medium">{row.name}</td>
                      <td className="py-2.5 px-3">{row.price}</td>
                      <td className="py-2.5 px-3">{row.stock}</td>
                      <td className="py-2.5 px-3">
                        <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px]">
                          {row.platform}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">
                        {row.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

