import { CheckoutView } from "@/feature/customer/checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cổng Thanh Toán & Xác Nhận Đơn Hàng | AutoTool.dev",
  description: "Thanh toán VietQR MB Bank & USDT TRC20 nhận License Key tự động",
};

export default function OrderCheckoutPage({
  params,
}: {
  params: { orderCode: string };
}) {
  return <CheckoutView orderCode={params.orderCode} />;
}

