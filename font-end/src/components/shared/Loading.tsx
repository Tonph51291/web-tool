import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingSpinner({ className, text }: { className?: string; text?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 gap-3 text-slate-500", className)}>
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      {text && <p className="text-sm font-medium">{text}</p>}
    </div>
  );
}

export function PageLoading({ text = "Đang tải dữ liệu..." }: { text?: string }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <LoadingSpinner text={text} />
    </div>
  );
}

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200 dark:bg-slate-800", className)}
      {...props}
    />
  );
}

