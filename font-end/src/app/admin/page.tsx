import { AdminDashboardView } from "@/feature/admin/dashboard/AdminDashboardView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tổng Quan Dashboard | AutoTool Admin",
};

export default function AdminDashboardPage() {
  return <AdminDashboardView />;
}

