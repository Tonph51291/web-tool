import { AdminToolsView } from "@/feature/admin/tools/AdminToolsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản Lý Kho Tool & Gói Giá | AutoTool Admin",
};

export default function AdminToolsPage() {
  return <AdminToolsView />;
}

