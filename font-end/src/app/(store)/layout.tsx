import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSupportWidget } from "@/components/shared/FloatingSupportWidget";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-400">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <FloatingSupportWidget />
    </div>
  );
}

