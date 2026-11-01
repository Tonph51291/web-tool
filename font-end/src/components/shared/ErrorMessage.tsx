import React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ErrorMessageProps {
  message?: string;
  className?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, className, onRetry }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/40 dark:border-red-900/60 text-red-800 dark:text-red-200 text-sm",
        className
      )}
    >
      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-medium">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-xs font-semibold text-red-700 dark:text-red-300 underline hover:no-underline"
          >
            Thử lại
          </button>
        )}
      </div>
    </div>
  );
}

