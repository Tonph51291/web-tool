import { CustomRequestView } from "@/feature/customer/custom-request";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gửi Yêu Cầu Đặt Viết Tool & Báo Giá Dự Án | AutoTool.dev",
  description:
    "Dịch vụ phát triển phần mềm MMO, Crawler, Bot Telegram tự động hóa theo yêu cầu riêng của doanh nghiệp.",
};

export default function RequestToolPage() {
  return <CustomRequestView />;
}

