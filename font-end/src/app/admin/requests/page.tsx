import { AdminRequestsView } from "@/feature/admin/requests/AdminRequestsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yêu Cầu Làm Tool & Báo Giá | AutoTool Admin",
};

export default function AdminRequestsPage() {
  return <AdminRequestsView />;
}

