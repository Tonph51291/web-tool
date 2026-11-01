import { UserOrdersView } from "@/feature/customer/user-orders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đơn Mua Của Tôi & Kho License Key | AutoTool.dev",
  description: "Quản lý đơn hàng, sao chép mã License Key và tải file cài đặt phần mềm",
};

export default function OrdersPage() {
  return <UserOrdersView />;
}

