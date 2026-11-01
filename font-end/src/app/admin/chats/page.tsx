import { AdminChatsView } from "@/feature/admin/chats/AdminChatsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trung Tâm Hỗ Trợ Đa Kênh & Telegram | AutoTool Admin",
};

export default function AdminChatsPage() {
  return <AdminChatsView />;
}

