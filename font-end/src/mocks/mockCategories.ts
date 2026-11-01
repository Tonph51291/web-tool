export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  count: number;
  iconName: string;
}

export const MOCK_CATEGORIES: CategoryItem[] = [
  { id: "all", name: "Tất cả công cụ", slug: "all", count: 18, iconName: "inventory_2" },
  { id: "automation", name: "Automation & Bot", slug: "automation", count: 8, iconName: "smart_toy" },
  { id: "crawler", name: "Crawl Data & Scraper", slug: "crawler", count: 6, iconName: "data_thresholding" },
  { id: "marketing", name: "Marketing & Social Tool", slug: "marketing", count: 5, iconName: "campaign" },
  { id: "crypto", name: "Crypto & Trading Bot", slug: "crypto", count: 4, iconName: "currency_bitcoin" },
  { id: "dev", name: "Tiện ích Dev & Văn phòng", slug: "dev", count: 3, iconName: "terminal" },
];

