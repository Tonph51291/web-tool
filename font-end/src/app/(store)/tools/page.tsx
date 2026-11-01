import { CatalogView } from "@/feature/customer/catalog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kho Phần Mềm Tự Động Hóa & Tool Đóng Gói Sẵn | AutoTool.dev",
  description:
    "Danh mục hơn 18+ phần mềm MMO, Scraper, Bot tự động hóa có sẵn kèm License Key tức thì.",
};

export default function ToolsCatalogPage() {
  return <CatalogView />;
}

