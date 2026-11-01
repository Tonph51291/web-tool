export interface ToolPackageOption {
  id: string;
  name: string;
  durationDays: number | null; // null = Lifetime
  durationText: string;
  price: number;
  usdtPrice: number;
  discountBadge?: string;
  isPopular?: boolean;
}

export interface ToolItem {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  version: string;
  status: "ACTIVE" | "UPDATING" | "MAINTENANCE";
  shortDescription: string;
  description: string;
  screenshotUrl: string;
  galleryUrls: string[];
  features: string[];
  supportedOs: Array<"windows" | "macos" | "linux" | "web">;
  downloadsCount: number;
  rating: number;
  reviewsCount: number;
  basePrice: number;
  baseUsdtPrice: number;
  packages: ToolPackageOption[];
  techSpecs: {
    language: string;
    ramRequired: string;
    threadsSupported: string;
    proxySupport: string;
    licenseType: string;
  };
}

export const MOCK_TOOLS: ToolItem[] = [
  {
    id: "tool-01",
    name: "OmniData Scraper Pro",
    slug: "omnidata-scraper-pro",
    categoryId: "crawler",
    categoryName: "Crawl Data",
    version: "v3.2.0",
    status: "ACTIVE",
    shortDescription: "Cào dữ liệu đa luồng từ mọi website e-commerce, bypass Cloudflare & reCAPTCHA v3, xuất file Excel/CSV tự động.",
    description: `OmniData Scraper Pro là giải pháp trích xuất dữ liệu thương mại điện tử cấp độ công nghiệp được đóng gói hoàn chỉnh. Phần mềm cho phép bạn quét và phân tích hàng triệu sản phẩm từ Shopee, Lazada, TikTok Shop, Amazon mà không lo bị chặn IP nhờ thuật toán xoay vòng Proxy thông minh và mô-đun vượt tường lửa Cloudflare Turnstile tích hợp sẵn.
    
    Phần mềm cung cấp giao diện trực quan, bảng xem trước thời gian thực (Real-time Preview), tùy chọn xuất định dạng CSV, XLSX, JSON hoặc đẩy thẳng vào cơ sở dữ liệu MySQL / PostgreSQL qua Webhook.`,
    screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgSk-CLFX8TwjrCr2naK6v23aD3TvyWom4EpwZ6hyO5rZ4qBpS5tqx6CWQiipEet22zKZA6J1PoogauROiX6mF_9L0Hg7DZ6W7ql2yviT2S4ASQeWPN2KlLCLzn4_ciQ1dqZDulUBNXmroDNHAuA_hkGqcteo7cryKv4xYhsyWpefGwtp84FqejJ1gGlsTwazpnmLfMdH7VulMKzBiqXMWIGQiALOO8osKghxolD0Ux9Y8zbl141MRpQ",
    galleryUrls: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgSk-CLFX8TwjrCr2naK6v23aD3TvyWom4EpwZ6hyO5rZ4qBpS5tqx6CWQiipEet22zKZA6J1PoogauROiX6mF_9L0Hg7DZ6W7ql2yviT2S4ASQeWPN2KlLCLzn4_ciQ1dqZDulUBNXmroDNHAuA_hkGqcteo7cryKv4xYhsyWpefGwtp84FqejJ1gGlsTwazpnmLfMdH7VulMKzBiqXMWIGQiALOO8osKghxolD0Ux9Y8zbl141MRpQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBX93b3xKbfXa_HR6qq9WRnrfbZ-ARpdSdsMIbYyTRxV6nPVx3JpT12rk1TLYmaU8vFCe6gXleRkrL4nXvAAdM8dFRMHF-0g1ZDr2nuUi3bsHa_niPaieiFFt8EqwISN5sdqC59VCTuFEOVR8actP3MoWJPkLL-IQbSnHp15LV32lY81t7_pM81tNh30gRf6ZIaruIAw8YqEktdx6EJRR4itOgg8nULok8vfjlexjXS7rhSh_idtm_0Ow"
    ],
    features: [
      "Đa luồng không giới hạn (50-200 luồng đồng thời)",
      "Bypass Cloudflare v3 & hCaptcha",
      "Xoay vòng HTTP/Socks5 Proxy tự động",
      "Xuất file Excel, CSV, Google Sheets",
      "Hỗ trợ Webhook gửi dữ liệu về Server riêng"
    ],
    supportedOs: ["windows", "macos"],
    downloadsCount: 840,
    rating: 4.9,
    reviewsCount: 128,
    basePrice: 399000,
    baseUsdtPrice: 16.5,
    packages: [
      { id: "pkg-omni-1m", name: "Gói 1 Tháng (Monthly)", durationDays: 30, durationText: "30 ngày", price: 399000, usdtPrice: 16.5 },
      { id: "pkg-omni-1y", name: "Gói 1 Năm (Annual)", durationDays: 365, durationText: "1 năm", price: 2990000, usdtPrice: 120, discountBadge: "Tiết kiệm 38%", isPopular: true },
      { id: "pkg-omni-life", name: "Bản Quyền Vĩnh Viễn (Lifetime)", durationDays: null, durationText: "Trọn đời", price: 4990000, usdtPrice: 200, discountBadge: "Cập nhật vĩnh viễn" }
    ],
    techSpecs: {
      language: "Node.js / Chromium C++ Core",
      ramRequired: "Tối thiểu 4GB RAM (Khuyên dùng 8GB)",
      threadsSupported: "Tối đa 200 Threads",
      proxySupport: "HTTP, HTTPS, Socks5 có xác thực",
      licenseType: "Kích hoạt 1 máy tính / License Key"
    }
  },
  {
    id: "tool-02",
    name: "SocialMulti Suite",
    slug: "socialmulti-suite",
    categoryId: "marketing",
    categoryName: "Marketing & Social",
    version: "v2.4.1",
    status: "ACTIVE",
    shortDescription: "Tự động tương tác, nuôi nick, đăng bài chéo kênh FB/TikTok/Zalo, giải captcha và gửi tin nhắn chăm sóc khách hàng 24/7.",
    description: `SocialMulti Suite là bộ công cụ tối ưu cho các cá nhân và doanh nghiệp làm Marketing số, Affiliates và MMO. Hệ thống tích hợp trình duyệt Anti-detect Browser độc quyền, giả lập hàng trăm profile trình duyệt riêng biệt (fingerprint spoofing) giúp nuôi tài khoản an toàn tuyệt đối, không sợ bị khóa nick hàng loạt.
    
    Hỗ trợ kịch bản tương tác người thật: tự động lướt feed, like, comment, share, đăng bài theo lịch trình và phản hồi tin nhắn tự động thông minh.`,
    screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX93b3xKbfXa_HR6qq9WRnrfbZ-ARpdSdsMIbYyTRxV6nPVx3JpT12rk1TLYmaU8vFCe6gXleRkrL4nXvAAdM8dFRMHF-0g1ZDr2nuUi3bsHa_niPaieiFFt8EqwISN5sdqC59VCTuFEOVR8actP3MoWJPkLL-IQbSnHp15LV32lY81t7_pM81tNh30gRf6ZIaruIAw8YqEktdx6EJRR4itOgg8nULok8vfjlexjXS7rhSh_idtm_0Ow",
    galleryUrls: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBX93b3xKbfXa_HR6qq9WRnrfbZ-ARpdSdsMIbYyTRxV6nPVx3JpT12rk1TLYmaU8vFCe6gXleRkrL4nXvAAdM8dFRMHF-0g1ZDr2nuUi3bsHa_niPaieiFFt8EqwISN5sdqC59VCTuFEOVR8actP3MoWJPkLL-IQbSnHp15LV32lY81t7_pM81tNh30gRf6ZIaruIAw8YqEktdx6EJRR4itOgg8nULok8vfjlexjXS7rhSh_idtm_0Ow"
    ],
    features: [
      "Quản lý hơn 100+ Profile trình duyệt riêng biệt",
      "Anti-detect Canvas & WebGL Spoofing",
      "Nuôi nick kịch bản lướt xem tự nhiên",
      "Hẹn giờ đăng bài đa kênh tự động",
      "Auto inbox & gửi file báo giá tự động"
    ],
    supportedOs: ["windows"],
    downloadsCount: 1250,
    rating: 4.95,
    reviewsCount: 210,
    basePrice: 499000,
    baseUsdtPrice: 21.0,
    packages: [
      { id: "pkg-social-1m", name: "Gói 1 Tháng (Monthly)", durationDays: 30, durationText: "30 ngày", price: 499000, usdtPrice: 21.0 },
      { id: "pkg-social-1y", name: "Gói 1 Năm (Annual)", durationDays: 365, durationText: "1 năm", price: 3490000, usdtPrice: 140, discountBadge: "Hot", isPopular: true },
      { id: "pkg-social-life", name: "Gói Trọn Đời (Lifetime)", durationDays: null, durationText: "Trọn đời", price: 5990000, usdtPrice: 240, discountBadge: "VIP" }
    ],
    techSpecs: {
      language: "C# .NET 8 / Puppeteer Core",
      ramRequired: "Tối thiểu 8GB RAM",
      threadsSupported: "Tùy biến theo cấu hình máy",
      proxySupport: "TMProxy, TinProxy, ProxyXoay",
      licenseType: "Kích hoạt 1 máy tính / 1 License"
    }
  },
  {
    id: "tool-03",
    name: "TeleSignal Copier Bot",
    slug: "telesignal-copier-bot",
    categoryId: "crypto",
    categoryName: "Crypto Trading",
    version: "v4.1.0",
    status: "ACTIVE",
    shortDescription: "Tự động đọc tín hiệu từ nhóm Telegram VIP, khớp lệnh sàn Binance/Bybit qua API trong <100ms, Stoploss & TP đa tầng.",
    description: `TeleSignal Copier Bot là giải pháp tự động hóa khớp lệnh giao dịch tiền điện tử dành cho các nhà giao dịch chuyên nghiệp. Bot kết nối trực tiếp với tài khoản Telegram của bạn, lắng nghe tín hiệu từ các kênh VIP (Entry, Stoploss, Take Profit 1-2-3-4), tự động phân tích cấu trúc cú pháp và gửi lệnh trực tiếp vào sàn Binance hoặc Bybit qua REST/WebSocket API với độ trễ cực thấp dưới 100ms.
    
    Tích hợp quản lý vốn linh hoạt (% vốn, fixed USDT), Auto Trailing Stoploss, dời hòa tự động khi chạm TP1 và bảo mật khóa API bằng mã hóa chuẩn ngân hàng AES-256.`,
    screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT5QupT6AqSygICSyN9xUnhotvbX5eY3x2ioNG6pN570emf80FvPXbDH_trAM0z--Nhs9wOI6QoB2U16c2fwGxjacK8YZhS7sGWiG6RMZM-PBb66WXK_q8CNPTEhtFGx3-1kRIsUdlOVsngZfVnQEZooRgAgtILY2DC31JaCcVPrsd-llRnrAcU8dL_3cVpJ9Sh3foUS9oNx9FSPF1jKKTQuSjDRr8VO9shsUOAzfbrn3PxOqYiMHwBA",
    galleryUrls: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDT5QupT6AqSygICSyN9xUnhotvbX5eY3x2ioNG6pN570emf80FvPXbDH_trAM0z--Nhs9wOI6QoB2U16c2fwGxjacK8YZhS7sGWiG6RMZM-PBb66WXK_q8CNPTEhtFGx3-1kRIsUdlOVsngZfVnQEZooRgAgtILY2DC31JaCcVPrsd-llRnrAcU8dL_3cVpJ9Sh3foUS9oNx9FSPF1jKKTQuSjDRr8VO9shsUOAzfbrn3PxOqYiMHwBA"
    ],
    features: [
      "Tốc độ khớp lệnh siêu tốc < 80ms",
      "Đọc tín hiệu hơn 50+ định dạng cú pháp Telegram",
      "Bảo mật mã hóa khóa API chuẩn AES-256",
      "Quản lý vốn chia lệnh DCA & Trailing Stoploss",
      "Tương thích hoàn hảo sàn Binance Futures & Bybit V5"
    ],
    supportedOs: ["windows", "linux"],
    downloadsCount: 620,
    rating: 4.88,
    reviewsCount: 94,
    basePrice: 690000,
    baseUsdtPrice: 29.0,
    packages: [
      { id: "pkg-crypto-1m", name: "Gói 1 Tháng (Monthly)", durationDays: 30, durationText: "30 ngày", price: 690000, usdtPrice: 29.0 },
      { id: "pkg-crypto-1y", name: "Gói 1 Năm (Annual)", durationDays: 365, durationText: "1 năm", price: 4990000, usdtPrice: 200, discountBadge: "Tặng kèm Server VPS", isPopular: true },
      { id: "pkg-crypto-life", name: "Gói Vĩnh Viễn (Lifetime)", durationDays: null, durationText: "Trọn đời", price: 8900000, usdtPrice: 350, discountBadge: "Hỗ trợ 1-1" }
    ],
    techSpecs: {
      language: "Golang / Rust Engine",
      ramRequired: "Tối thiểu 1GB RAM (Chạy tốt trên VPS)",
      threadsSupported: "Xử lý hàng đợi tức thời",
      proxySupport: "Hỗ trợ HTTP/SOCKS5",
      licenseType: "Kích hoạt theo HWID hoặc Docker Container"
    }
  },
  {
    id: "tool-04",
    name: "Ecom Order AutoSync Pro",
    slug: "ecom-order-autosync-pro",
    categoryId: "automation",
    categoryName: "Automation",
    version: "v1.9.0",
    status: "ACTIVE",
    shortDescription: "Đồng bộ đơn hàng Shopee, TikTok Shop, Lazada về Google Sheets & phần mềm kho KiotViet trong 3 giây.",
    description: `Ecom Order AutoSync Pro là công cụ tự động hóa toàn diện cho các nhà bán hàng đa sàn thương mại điện tử. Hệ thống tự động thu thập đơn hàng mới từ các gian hàng Shopee, TikTok Shop, Lazada, đồng bộ về một bảng Google Sheets duy nhất hoặc phần mềm quản lý kho KiotViet / Sapo theo thời gian thực.
    
    Tự động in mã vận đơn hàng loạt chỉ với 1 click, cảnh báo sản phẩm sắp hết tồn kho qua tin nhắn Telegram/Zalo, và tự động tạo mã tracking gửi thông báo cho khách hàng.`,
    screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAbnLOb53Uvhv7m3RyPEzz9QUPKbHWaade6zoE85LQo6ZPtbsqUQEY_AZ0qYqcxbaT7C5SLA7Qv6tyR5Y9uy--ACRPKjcVYkGPVXuR--bEM2NR87_0X-GI_cgcKbYykjckld3rOWfIl0hN2z86XlD1Rfj4OQw2_HU8PIdtlEBR7TfT6XilvnchEGWCsGq-cbpdvqy5M0BarOlKZoTZZ0spON00jH2mPb-Ws6XSGz-6ZYdomSuEL1I7Qw",
    galleryUrls: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAbnLOb53Uvhv7m3RyPEzz9QUPKbHWaade6zoE85LQo6ZPtbsqUQEY_AZ0qYqcxbaT7C5SLA7Qv6tyR5Y9uy--ACRPKjcVYkGPVXuR--bEM2NR87_0X-GI_cgcKbYykjckld3rOWfIl0hN2z86XlD1Rfj4OQw2_HU8PIdtlEBR7TfT6XilvnchEGWCsGq-cbpdvqy5M0BarOlKZoTZZ0spON00jH2mPb-Ws6XSGz-6ZYdomSuEL1I7Qw"
    ],
    features: [
      "Đồng bộ Shopee, TikTok Shop, Lazada đa shop",
      "Tự động in tem vận chuyển 1-Click",
      "Cập nhật tồn kho tự động chống bán âm",
      "Thông báo đơn hàng qua Telegram tức thì",
      "Báo cáo doanh thu & tỷ lệ hoàn đơn"
    ],
    supportedOs: ["windows", "web"],
    downloadsCount: 540,
    rating: 4.85,
    reviewsCount: 78,
    basePrice: 350000,
    baseUsdtPrice: 14.5,
    packages: [
      { id: "pkg-ecom-1m", name: "Gói 1 Tháng (Monthly)", durationDays: 30, durationText: "30 ngày", price: 350000, usdtPrice: 14.5 },
      { id: "pkg-ecom-1y", name: "Gói 1 Năm (Annual)", durationDays: 365, durationText: "1 năm", price: 2500000, usdtPrice: 100, discountBadge: "Tiết kiệm 40%", isPopular: true },
      { id: "pkg-ecom-life", name: "Gói Vĩnh Viễn (Lifetime)", durationDays: null, durationText: "Trọn đời", price: 4500000, usdtPrice: 180 }
    ],
    techSpecs: {
      language: "Python / FastApi / Electron UI",
      ramRequired: "2GB RAM",
      threadsSupported: "Realtime Webhook Listener",
      proxySupport: "Không bắt buộc",
      licenseType: "Kích hoạt theo Email / License Key"
    }
  },
  {
    id: "tool-05",
    name: "AutoLead CRM Enriched",
    slug: "autolead-crm-enriched",
    categoryId: "crawler",
    categoryName: "Crawl Data",
    version: "v2.0.4",
    status: "ACTIVE",
    shortDescription: "Tự động quét số điện thoại, email, thông tin công ty từ Google Maps, LinkedIn và xuất bảng tính chuẩn xác.",
    description: `AutoLead CRM Enriched là vũ khí tìm kiếm khách hàng tiềm năng B2B đắc lực. Bạn chỉ cần nhập từ khóa (ví dụ: 'Nha khoa Hà Nội', 'Công ty xây dựng TP.HCM') và khu vực, phần mềm sẽ tự động quét danh sách trên Google Maps, lọc số điện thoại di động chính xác, email liên hệ, tên giám đốc và địa chỉ trang web.
    
    Tích hợp cơ chế xác thực email tự động (bỏ qua email rác/chết) và tự động đồng bộ danh sách khách hàng vào HubSpot, Pipedrive hoặc Google Sheets để đội ngũ Telesales gọi điện ngay.`,
    screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT5QupT6AqSygICSyN9xUnhotvbX5eY3x2ioNG6pN570emf80FvPXbDH_trAM0z--Nhs9wOI6QoB2U16c2fwGxjacK8YZhS7sGWiG6RMZM-PBb66WXK_q8CNPTEhtFGx3-1kRIsUdlOVsngZfVnQEZooRgAgtILY2DC31JaCcVPrsd-llRnrAcU8dL_3cVpJ9Sh3foUS9oNx9FSPF1jKKTQuSjDRr8VO9shsUOAzfbrn3PxOqYiMHwBA",
    galleryUrls: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDT5QupT6AqSygICSyN9xUnhotvbX5eY3x2ioNG6pN570emf80FvPXbDH_trAM0z--Nhs9wOI6QoB2U16c2fwGxjacK8YZhS7sGWiG6RMZM-PBb66WXK_q8CNPTEhtFGx3-1kRIsUdlOVsngZfVnQEZooRgAgtILY2DC31JaCcVPrsd-llRnrAcU8dL_3cVpJ9Sh3foUS9oNx9FSPF1jKKTQuSjDRr8VO9shsUOAzfbrn3PxOqYiMHwBA"
    ],
    features: [
      "Quét Google Maps không giới hạn theo từ khóa & địa lý",
      "Lọc chính xác số điện thoại di động & Email thật",
      "Tự động làm giàu thông tin công ty từ LinkedIn & Web",
      "Xuất file Excel phân loại theo ngành nghề",
      "Bypass chống cào dữ liệu Google Maps 100%"
    ],
    supportedOs: ["windows", "macos"],
    downloadsCount: 910,
    rating: 4.92,
    reviewsCount: 145,
    basePrice: 420000,
    baseUsdtPrice: 17.0,
    packages: [
      { id: "pkg-lead-1m", name: "Gói 1 Tháng (Monthly)", durationDays: 30, durationText: "30 ngày", price: 420000, usdtPrice: 17.0 },
      { id: "pkg-lead-1y", name: "Gói 1 Năm (Annual)", durationDays: 365, durationText: "1 năm", price: 2900000, usdtPrice: 115, discountBadge: "Phổ biến", isPopular: true },
      { id: "pkg-lead-life", name: "Gói Trọn Đời (Lifetime)", durationDays: null, durationText: "Trọn đời", price: 5200000, usdtPrice: 210 }
    ],
    techSpecs: {
      language: "TypeScript / Node.js Engine",
      ramRequired: "4GB RAM",
      threadsSupported: "20 Luồng đồng thời",
      proxySupport: "Hỗ trợ Proxy xoay tự động",
      licenseType: "Kích hoạt 1 máy / 1 Key"
    }
  },
  {
    id: "tool-06",
    name: "Cloudflare Turnstile Bypass Engine",
    slug: "cloudflare-turnstile-bypass-engine",
    categoryId: "dev",
    categoryName: "Tiện ích Dev",
    version: "v3.0.1",
    status: "ACTIVE",
    shortDescription: "Thư viện & Tiện ích giải quyết Captcha Cloudflare Turnstile, hCaptcha v2 với tỷ lệ thành công 99.8%.",
    description: `Cloudflare Turnstile Bypass Engine là giải pháp lập trình viên dành riêng cho các dự án Web Automation và Web Crawler phức tạp. Sử dụng thuật toán Patch nhân Chromium ở tầng C++, công cụ hoàn toàn vô hiệu hóa khả năng nhận diện bot của Cloudflare (Cloudflare Bot Management, Turnstile, Challenge JS).
    
    Cung cấp SDK đơn giản cho Python, Node.js, C# hoặc chạy dưới dạng một Local HTTP Proxy Service nhận request và tự động trả về token hợp lệ.`,
    screenshotUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX93b3xKbfXa_HR6qq9WRnrfbZ-ARpdSdsMIbYyTRxV6nPVx3JpT12rk1TLYmaU8vFCe6gXleRkrL4nXvAAdM8dFRMHF-0g1ZDr2nuUi3bsHa_niPaieiFFt8EqwISN5sdqC59VCTuFEOVR8actP3MoWJPkLL-IQbSnHp15LV32lY81t7_pM81tNh30gRf6ZIaruIAw8YqEktdx6EJRR4itOgg8nULok8vfjlexjXS7rhSh_idtm_0Ow",
    galleryUrls: [],
    features: [
      "Bypass Cloudflare Turnstile & Challenge 5s",
      "Tỷ lệ giải thành công 99.8%",
      "Cung cấp Local HTTP Proxy API",
      "SDK sẵn có cho Python, Node.js, C#",
      "Không tốn phí giải mã theo từng captcha"
    ],
    supportedOs: ["windows", "macos", "linux"],
    downloadsCount: 480,
    rating: 4.98,
    reviewsCount: 65,
    basePrice: 550000,
    baseUsdtPrice: 22.5,
    packages: [
      { id: "pkg-cf-1m", name: "Gói 1 Tháng (Monthly)", durationDays: 30, durationText: "30 ngày", price: 550000, usdtPrice: 22.5 },
      { id: "pkg-cf-1y", name: "Gói 1 Năm (Annual)", durationDays: 365, durationText: "1 năm", price: 3900000, usdtPrice: 155, isPopular: true },
      { id: "pkg-cf-life", name: "Gói Vĩnh Viễn (Lifetime)", durationDays: null, durationText: "Trọn đời", price: 6500000, usdtPrice: 260 }
    ],
    techSpecs: {
      language: "C++ Native / Node.js Addon",
      ramRequired: "2GB RAM",
      threadsSupported: "Không giới hạn",
      proxySupport: "HTTP/SOCKS5",
      licenseType: "API Key / Node Binding"
    }
  }
];

