import React from "react";
import { Inbox } from "lucide-react";
import { Button } from "../ui/Button";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "Chưa có dữ liệu",
  description = "Hiện tại không có mục nào để hiển thị.",
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
        {icon || <Inbox className="w-7 h-7" />}
      </div>
      <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">{title}</h4>
      <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

