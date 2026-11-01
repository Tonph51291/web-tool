import { HomeView } from "@/feature/customer/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutoTool.dev - Cửa Hàng Phần Mềm & Tool Tự Động Hóa Đóng Gói Sẵn",
  description:
    "Cung cấp hơn 18+ phần mềm MMO, Crawler, Bot Telegram, Marketing đóng gói sẵn kèm License Key tức thì.",
};

export default function HomePage() {
  return <HomeView />;
}

