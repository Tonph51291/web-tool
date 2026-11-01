import { AdminOrdersView } from "@/feature/admin/orders/AdminOrdersView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản Lý Đơn Hàng & Duyệt Thanh Toán | AutoTool Admin",
};

export default function AdminOrdersPage() {
  return <AdminOrdersView />;
}

