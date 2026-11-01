export interface MockOrder {
  id: string;
  orderCode: string;
  toolId: string;
  toolName: string;
  toolSlug: string;
  packageName: string;
  durationText: string;
  amount: number;
  amountUsdt: number;
  status: "PENDING_PAYMENT" | "PAID" | "COMPLETED" | "CANCELLED";
  customerName: string;
  customerEmail: string;
  createdAt: string;
  licenseKey?: string;
  downloadUrl?: string;
  transactionRef?: string;
  paymentMethod?: "BANK_TRANSFER" | "USDT";
}

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "ord-001",
    orderCode: "TOOL-98421",
    toolId: "tool-01",
    toolName: "OmniData Scraper Pro",
    toolSlug: "omnidata-scraper-pro",
    packageName: "Gói 1 Năm (Annual)",
    durationText: "1 năm",
    amount: 2990000,
    amountUsdt: 120,
    status: "COMPLETED",
    customerName: "Nguyễn Tuấn Anh",
    customerEmail: "tuananh.dev@gmail.com",
    createdAt: "2026-10-31T14:20:00Z",
    licenseKey: "OMNI-PRO-2026-X89K-49F2-MN77-LK90",
    downloadUrl: "https://download.autotool.dev/releases/OmniData-v3.2.0-Setup.exe",
    transactionRef: "FT2630588912304",
    paymentMethod: "BANK_TRANSFER"
  },
  {
    id: "ord-002",
    orderCode: "TOOL-77124",
    toolId: "tool-02",
    toolName: "SocialMulti Suite",
    toolSlug: "socialmulti-suite",
    packageName: "Gói 1 Tháng (Monthly)",
    durationText: "30 ngày",
    amount: 499000,
    amountUsdt: 21.0,
    status: "PAID",
    customerName: "Trần Minh Quang",
    customerEmail: "quang.mkt@yahoo.com",
    createdAt: "2026-11-01T06:15:00Z",
    paymentMethod: "BANK_TRANSFER",
    transactionRef: "MB992140120"
  },
  {
    id: "ord-003",
    orderCode: "TOOL-55109",
    toolId: "tool-03",
    toolName: "TeleSignal Copier Bot",
    toolSlug: "telesignal-copier-bot",
    packageName: "Gói Vĩnh Viễn (Lifetime)",
    durationText: "Trọn đời",
    amount: 8900000,
    amountUsdt: 350,
    status: "PENDING_PAYMENT",
    customerName: "Lê Hoàng Long",
    customerEmail: "long.crypto@outlook.com",
    createdAt: "2026-11-01T08:00:00Z",
    paymentMethod: "USDT"
  },
  {
    id: "ord-004",
    orderCode: "TOOL-33120",
    toolId: "tool-04",
    toolName: "Ecom Order AutoSync Pro",
    toolSlug: "ecom-order-autosync-pro",
    packageName: "Gói 1 Năm (Annual)",
    durationText: "1 năm",
    amount: 2500000,
    amountUsdt: 100,
    status: "COMPLETED",
    customerName: "Đặng Thị Mai",
    customerEmail: "mai.shopee@gmail.com",
    createdAt: "2026-10-28T09:40:00Z",
    licenseKey: "ECOM-SYNC-2026-88F4-YY21-PP09-ZZ44",
    downloadUrl: "https://download.autotool.dev/releases/EcomSync-v1.9.0-Win.exe",
    transactionRef: "b7e9238f88214156acdf8821049c001294821a73fbc9102834710293481230fa",
    paymentMethod: "USDT"
  }
];

