"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToolPackageOption } from "@/mocks/mockTools";
import { formatVND } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, ShieldCheck, CheckCircle2, Zap } from "lucide-react";

export function PackageSelector({
  packages,
  toolSlug,
  toolName,
}: {
  packages: ToolPackageOption[];
  toolSlug: string;
  toolName: string;
}) {
  const router = useRouter();
  const [selectedPkg, setSelectedPkg] = useState<ToolPackageOption>(packages[0] || null);

  const handleBuyNow = () => {
    // Direct link to checkout page with mock order code
    const orderCode = `TOOL-${Math.floor(10000 + Math.random() * 90000)}`;
    router.push(`/orders/${orderCode}?pkg=${selectedPkg.id}&tool=${toolSlug}`);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6 sticky top-24">
      <div>
        <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
          CHỌN GÓI BẢN QUYỀN
        </span>
        <h3 className="text-xl font-heading font-extrabold text-slate-900 dark:text-white">
          Kích Hoạt License Key
        </h3>
      </div>

      {/* Package options list */}
      <div className="space-y-3">
        {packages.map((pkg) => {
          const isSelected = selectedPkg?.id === pkg.id;
          return (
            <div
              key={pkg.id}
              onClick={() => setSelectedPkg(pkg)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? "border-blue-600 dark:border-cyan-400 bg-blue-50/50 dark:bg-slate-800/80 shadow-xs"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      isSelected ? "text-blue-600 dark:text-cyan-400" : "text-slate-300 dark:text-slate-700"
                    }`}
                  />
                  <span className="font-semibold text-sm text-slate-900 dark:text-white">{pkg.name}</span>
                </div>

                {pkg.discountBadge && (
                  <span className="font-mono text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                    {pkg.discountBadge}
                  </span>
                )}
              </div>

              <div className="flex items-baseline justify-between mt-2 pl-6">
                <span className="text-xs text-slate-500">Thời hạn: {pkg.durationText}</span>
                <span className="font-heading font-extrabold text-base text-blue-600 dark:text-cyan-400">
                  {formatVND(pkg.price)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Price Summary & Checkout Action */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-400">Tổng thanh toán:</span>
          <div className="text-right">
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {formatVND(selectedPkg.price)}
            </div>
            <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              ≈ ${selectedPkg.usdtPrice.toFixed(2)} USDT (TRC20)
            </div>
          </div>
        </div>

        <Button
          onClick={handleBuyNow}
          className="w-full h-12 text-base font-bold bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white shadow-md gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Tiến Hành Thanh Toán
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Cam kết hoàn tiền 100% trong 24 giờ đầu</span>
        </div>
      </div>
    </div>
  );
}

