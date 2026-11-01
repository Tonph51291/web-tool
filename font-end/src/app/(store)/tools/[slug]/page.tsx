import { ToolDetailView } from "@/feature/customer/tool-detail";
import { MOCK_TOOLS } from "@/mocks/mockTools";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tool = MOCK_TOOLS.find((t) => t.slug === params.slug) || MOCK_TOOLS[0];
  return {
    title: `${tool?.name || "Chi Tiết Phần Mềm"} | AutoTool.dev`,
    description: tool?.shortDescription || "Chi tiết phần mềm tự động hóa đóng gói sẵn",
  };
}

export default function ToolDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <ToolDetailView slug={params.slug} />;
}

