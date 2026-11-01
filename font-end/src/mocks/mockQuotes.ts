export interface MockProjectQuote {
  quoteId: string;
  projectCode: string;
  projectTitle: string;
  clientName: string;
  clientEmail: string;
  status: "ESTIMATING" | "SENT_OFFER" | "ACCEPTED" | "IN_PROGRESS" | "COMPLETED";
  estimatedDays: number;
  totalCostVND: number;
  totalCostUSDT: number;
  createdAt: string;
  requirements: string[];
  deliverables: Array<{ title: string; desc: string; days: number }>;
}

export const MOCK_PROJECT_QUOTES: MockProjectQuote[] = [
  {
    quoteId: "quote-prj-2026",
    projectCode: "PRJ-2026",
    projectTitle: "Tool Tự Động Quét & Đặt Đơn Hàng Hạn Giờ (Flash Sale Bot)",
    clientName: "Phạm Hải Đăng",
    clientEmail: "haidang.corp@gmail.com",
    status: "SENT_OFFER",
    estimatedDays: 14,
    totalCostVND: 18500000,
    totalCostUSDT: 725,
    createdAt: "2026-10-30T10:00:00Z",
    requirements: [
      "Quét sản phẩm giảm giá flash sale theo mili-giây",
      "Vượt mã Captcha trượt và OTP SMS tự động",
      "Hỗ trợ đa luồng trên 50 tài khoản độc lập",
      "Đóng gói file cài đặt desktop kèm HWID License"
    ],
    deliverables: [
      { title: "Giai đoạn 1: Core Automation Engine", desc: "Xây dựng lõi kết nối socket và giả lập hành vi người dùng", days: 5 },
      { title: "Giai đoạn 2: Bypass Captcha & Multi-Account", desc: "Tích hợp module giải mã captcha và quản lý proxy xoay", days: 5 },
      { title: "Giai đoạn 3: UI Desktop & Bàn Giao", desc: "Đóng gói phần mềm, cài đặt license và hướng dẫn vận hành", days: 4 }
    ]
  }
];

