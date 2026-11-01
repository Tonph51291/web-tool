import React from "react";
import { ToolItem } from "@/mocks/mockTools";
import { Cpu, HardDrive, Network, Key, Code } from "lucide-react";

export function ToolSpecsTable({ specs }: { specs: ToolItem["techSpecs"] }) {
  const items = [
    { label: "Ngôn ngữ phát triển", val: specs.language, icon: Code },
    { label: "Yêu cầu phần cứng", val: specs.ramRequired, icon: Cpu },
    { label: "Khả năng đa luồng", val: specs.threadsSupported, icon: HardDrive },
    { label: "Giao thức Proxy", val: specs.proxySupport, icon: Network },
    { label: "Quy chuẩn bản quyền", val: specs.licenseType, icon: Key },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
      <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
        Thông Số Kỹ Thuật & Cấu Hình Máy
      </h3>

      <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
        {items.map((it, idx) => {
          const Icon = it.icon;
          return (
            <div key={idx} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                <Icon className="w-4 h-4 text-slate-400" />
                <span>{it.label}</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-slate-200 text-right">
                {it.val}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

