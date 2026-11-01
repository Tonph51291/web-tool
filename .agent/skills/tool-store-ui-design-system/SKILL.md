---
name: tool-store-ui-design-system
description: >-
  Quy chuẩn thiết kế giao diện UI/UX chuyên sâu, Responsive mọi thiết bị, Tối ưu 60fps
  không giật lag cho Sàn Bán Tool Đóng Gói (dựa trên thiết kế Stitch AutoTool.dev - Cybernetic Developer Hub).
---

# Kỹ Năng Thiết Kế Giao Diện UI/UX (Clean, Responsive & Zero-Lag)

Kỹ năng này định nghĩa toàn bộ quy chuẩn thiết kế giao diện người dùng (Design System), kiến trúc CSS/Tailwind, quy tắc tương thích mọi thiết bị (Responsive) và kỹ thuật tối ưu hóa hiệu năng render (Zero-Lag 60fps) cho sàn thương mại điện tử phần mềm tự động hóa & MMO đóng gói sẵn.

> **Thiết kế gốc tham chiếu:** [Stitch Project: 12315700603468627586 - AutoTool.dev / Cybernetic Developer Hub](https://stitch.withgoogle.com/projects/12315700603468627586)

---

## 1. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1. **Clean & High-Contrast Aesthetics:**
   - Kết hợp giữa phong cách hiện đại (Clean SaaS) và hơi hướng kỹ thuật chuyên sâu (Cybernetic Developer Tooling).
   - Tuyệt đối không sử dụng hiệu ứng màu sắc lòe loẹt, hỗn loạn. Mọi khoảng trống, đường viền (hairline border) và màu sắc đều phục vụ tính trực quan và khả năng đọc dữ liệu cao.
2. **True Responsive (Mobile-First to Ultrawide):**
   - Thiết kế đáp ứng mượt mà trên 4 dải thiết bị: Mobile Phone (< 640px), Tablet (640px - 1024px), Laptop/Desktop (1024px - 1440px) và Màn hình Ultrawide (> 1440px).
   - Mọi vùng chạm (Touch targets) trên thiết bị di động đều đạt chuẩn công thái học tối thiểu `44px x 44px`.
   - Tuyệt đối không gây ra lỗi tràn ngang màn hình (`horizontal scrollbar overflow-x`).
3. **Zero-Lag & 60FPS Performance Budget:**
   - Chỉ animate các thuộc tính GPU Composite: `transform` và `opacity`. Tuyệt đối không trigger reflow/repaint bằng cách animate `height`, `width`, `top`, `margin`, `padding`.
   - Giữ Cumulative Layout Shift (CLS) = 0: Luôn gán tỷ lệ khung hình cố định (`aspect-video`, `h-48`, `min-h-[...]`) cho hình ảnh và thẻ card trước khi dữ liệu được load xong.
   - Tối ưu danh sách lớn bằng kỹ thuật Debounce tìm kiếm (300ms) và phân trang / lazy loading.

---

## 2. BẢNG MÃ MÀU & DESIGN TOKENS

### 2.1. Palette Màu Sắc Chuẩn (Stitch Theme)

```css
:root {
  /* Surface & Canvas */
  --canvas-bg: #0b0f17;                /* Dark Void Canvas */
  --surface-elevated: #111827;         /* Container Surface */
  --surface-overlay: rgba(15, 23, 42, 0.75); /* Glassmorphic Card */
  
  /* Primary & Brand */
  --neon-cyan: #06b6d4;                /* Electric Cyan (Primary CTA & Focus) */
  --neon-sky: #38bdf8;                 /* Plasma Aura (Hover & Active state) */
  --brand-blue: #2563eb;               /* Enterprise Core Blue */
  
  /* Semantic Status */
  --status-active: #10b981;            /* Precision Emerald (Running, Verified) */
  --status-pending: #f59e0b;           /* Warm Amber (Submitted, Throttling) */
  --status-error: #ef4444;             /* Crimson Fault (Rejected, Failed) */
  
  /* Borders & Strokes */
  --border-subtle: #1e293b;            /* Hairline Border */
  --border-hover: #334155;             /* Border khi hover */
  --border-focus: #06b6d4;             /* Focus Border Highlight */
}
```

### 2.2. Quy Chuẩn Kiểu Chữ (Typography Hierarchy)

| Cấp Bậc | Font Family | Size / Line-Height | Tracking / Weight | Mục Đích Sử Dụng |
| :--- | :--- | :--- | :--- | :--- |
| **Headline XL** | Space Grotesk / Plus Jakarta Sans | `48px / 56px` (Mobile: `32px / 40px`) | `-0.03em / 800` | Banner Hero, Tiêu đề trang chính |
| **Headline LG** | Space Grotesk / Plus Jakarta Sans | `32px / 40px` (Mobile: `24px / 32px`) | `-0.02em / 700` | Tiêu đề danh mục, Tên Tool chi tiết |
| **Headline MD** | Space Grotesk / Plus Jakarta Sans | `20px / 28px` | `-0.01em / 600` | Tiêu đề Card, Tên modal |
| **Body LG/MD** | Geist / Inter | `15px / 24px` | `0 / 400 - 500` | Mô tả chi tiết tính năng, văn bản đọc |
| **Code / Telemetry** | JetBrains Mono | `12px - 14px / 20px` | `0.02em / 500` | License key, Mã đơn, Giá quy đổi USDT |
| **Chip / Badge** | JetBrains Mono | `10px - 11px / 14px` | `0.05em / 700` | Tag danh mục, Version tool, Status |

---

## 3. GIẢI PHÁP RESPONSIVE TOÀN DIỆN (FLUID & ADAPTIVE)

### 3.1. Hệ Thống Breakpoint Chuẩn

```text
- Mobile (sm):      < 640px    -> 1 Cột (Single Column Flow), Bottom Sheet / Full Width
- Tablet (md):      640px - 1024px -> 2 Cột (Dual Grid), Collapsible Sidebar
- Desktop (lg/xl):  1024px - 1440px -> 3 Cột (Triple Grid), 12-Column System, Container max-w-7xl
- Wide (2xl):       > 1440px   -> Khóa max-w-7xl hoặc max-w-[1400px], canh giữa hoàn hảo
```

### 3.2. Quy Tắc Chống Lỗi Tràn Màn Hình (No Overflow Bugs)
1. Luôn sử dụng `w-full min-w-0` trên các container flex/grid để ngăn text quá dài làm vỡ layout:
   ```tsx
   <div className="flex items-center gap-3 min-w-0">
     <h4 className="truncate font-semibold">{tool.name}</h4>
   </div>
   ```
2. Bảng dữ liệu (`Table`) bắt buộc bọc trong container có thanh cuộn riêng:
   ```tsx
   <div className="w-full overflow-x-auto rounded-xl border border-slate-800">
     <table className="w-full min-w-[650px]">...</table>
   </div>
   ```
3. Menu di động sử dụng Fixed Backdrop Drawer có hỗ trợ khóa cuộn màn hình (`overflow: hidden` trên `document.body`).

---

## 4. CHI TIẾT CẤU TRÚC COMPONENT CHUẨN (AUTO TOOL SPECIFICATION)

### 4.1. Card Công Cụ Đóng Gói (Packaged Tool Card)
Cấu trúc chuẩn theo thiết kế AutoTool:
- **Khung ảnh giao diện (Top 45% UI Screenshot Frame):** Chiều cao cố định `h-48`, ảnh `object-cover object-top`, hiệu ứng zoom nhẹ (`group-hover:scale-105 duration-300`).
- **Góc trên bên trái:** Badge danh mục (ví dụ: `CRAWL DATA`, `MARKETING`, `CRYPTO`).
- **Góc trên bên phải:** Phiên bản phát hành (ví dụ: `v3.2.0`).
- **Thân card:** Tên Tool (Headline font) + Đoạn mô tả ngắn (giới hạn 2 dòng `line-clamp-2`).
- **Feature Pills:** 3-4 nhãn tính năng nổi bật (Nền `bg-slate-800/80`, chữ `text-slate-300`).
- **Hệ điều hành hỗ trợ:** Icon kèm nhãn `Windows`, `macOS`, `VPS/Linux`.
- **Chân card (Footer):**
  - Giá VND đậm nét (`24px / 800`) + Chu kỳ thanh toán (`/tháng` hoặc `Vĩnh viễn`).
  - Giá quy đổi USDT ước tính (`≈ $16.50 USDT`).
  - Cặp nút hành động: **Chi Tiết** (Outline) và **Mua Ngay** (Primary Neon/Blue).

#### Code Mẫu Chuẩn Cho `ToolProductCard.tsx`:
```tsx
import React from "react";
import Link from "next/link";
import { formatVND } from "@/lib/utils";
import { Monitor, Laptop, ArrowRight } from "lucide-react";

interface ToolProductCardProps {
  id: string;
  name: string;
  slug: string;
  categoryName: string;
  version: string;
  description: string;
  screenshotUrl: string;
  features: string[];
  price: number;
  usdtPrice?: number;
  durationText?: string;
}

export function ToolProductCard({
  name,
  slug,
  categoryName,
  version,
  description,
  screenshotUrl,
  features,
  price,
  usdtPrice,
  durationText = "tháng",
}: ToolProductCardProps) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-cyan-500/50">
      {/* 1. Screenshot Frame (Top 45%) */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <img
          src={screenshotUrl}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Category Pill */}
        <span className="absolute top-3 left-3 rounded-md bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
          {categoryName}
        </span>

        {/* Version Pill */}
        <span className="absolute top-3 right-3 rounded-md bg-slate-900/80 backdrop-blur-md px-2 py-0.5 text-[11px] font-mono font-medium text-slate-300 border border-slate-700">
          {version}
        </span>
      </div>

      {/* 2. Body Information */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-400 line-clamp-1">
            <Link href={`/tools/${slug}`}>{name}</Link>
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Feature Badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {features.slice(0, 4).map((feat, index) => (
              <span
                key={index}
                className="rounded-md bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                {feat}
              </span>
            ))}
          </div>

          {/* Supported OS */}
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span className="font-medium">Hỗ trợ:</span>
            <span className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 border border-slate-200 dark:border-slate-700">
              <Monitor className="w-3.5 h-3.5 text-blue-500" /> Windows
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 border border-slate-200 dark:border-slate-700">
              <Laptop className="w-3.5 h-3.5 text-slate-400" /> macOS
            </span>
          </div>
        </div>

        {/* 3. Footer Pricing & Dual Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {formatVND(price)}
              </span>
              <span className="text-xs text-slate-400 ml-1">/{durationText}</span>
            </div>

            {usdtPrice && (
              <div className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                ≈ ${usdtPrice.toFixed(2)} USDT
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/tools/${slug}`}
              className="py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors text-center inline-flex items-center justify-center gap-1"
            >
              Chi tiết
            </Link>
            <Link
              href={`/tools/${slug}`}
              className="py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-sm shadow-cyan-500/20 text-center inline-flex items-center justify-center gap-1"
            >
              Mua ngay <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 5. BẢO CHỨNG ZERO-LAG & TỐI ƯU HÓA HIỆU NĂNG (60FPS)

Mọi lập trình viên giao diện khi làm việc trong dự án bắt buộc tuân thủ 6 quy tắc tối ưu hóa sau:

1. **GPU Hardware Acceleration Only:**
   ```css
   /* Đúng chuẩn 60fps */
   .hover-card {
     transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
   }
   .hover-card:hover {
     transform: translateY(-4px);
   }

   /* SAI - Gây giật lag (Trigger Layout Recalculation): */
   /* .hover-card:hover { top: -4px; margin-top: -4px; } */
   ```

2. **Cắt giảm DOM Depth & Tránh Nesting dư thừa:**
   - Hạn chế bọc quá nhiều thẻ `div` vô nghĩa (`div wrapper hell`). Giữ độ sâu component cây DOM dưới 12 tầng.

3. **Content Visibility cho Danh Sách Dài:**
   - Đối với trang danh mục hoặc kho sản phẩm có từ 20 sản phẩm trở lên, bổ sung CSS:
     ```css
     .tool-grid-item {
       content-visibility: auto;
       contain-intrinsic-size: 0 450px;
     }
     ```
   - Trình duyệt sẽ bỏ qua việc tính toán vẽ các card nằm ngoài khung nhìn (viewport), giảm 70% thời gian render ban đầu.

4. **Debounced Search Inputs:**
   - Mọi ô input tìm kiếm/bộ lọc phải được debounce tối thiểu `250ms - 300ms` trước khi cập nhật state hoặc gọi API:
     ```tsx
     const debouncedSearch = useDebounce(keyword, 300);
     ```

5. **Ngăn chặn Layout Shift (CLS = 0):**
   - Mọi hình ảnh phải có kích thước khung chứa cố định hoặc class `aspect-[16/9]` / `aspect-video`.
   - Sử dụng Skeleton Loader có cùng kích thước hình học chính xác với component thực tế.

6. **Tối ưu Glassmorphism & Backdrop Blur:**
   - Chỉ sử dụng `backdrop-blur-md` (8px - 12px) trên thanh Navbar dính (`Header`) và Modal Overlay.
   - Không áp dụng `backdrop-blur` trên hàng loạt hàng trăm item trong danh sách cuộn vì gây nghẽn GPU trên các máy tính cấu hình yếu hoặc thiết bị di động.

---

## 6. QUY TRÌNH KIỂM TRA TRƯỚC KHI BÀN GIAO (UI AUDIT CHECKLIST)

Trước khi submit bất kỳ màn hình hoặc component mới nào:
- [ ] **Mobile Check:** Test kích thước màn hình `375px` (iPhone SE/Mini) và `390px` (iPhone tiêu chuẩn) – Không bị tràn thanh cuộn ngang.
- [ ] **Touch Target:** Tất cả các icon button, nút phân trang, switch đều đạt kích thước tối thiểu 44x44px.
- [ ] **Contrast Ratio:** Văn bản chữ thường đạt tỷ lệ tương phản tối thiểu `4.5:1` so với nền (chuẩn WCAG AA).
- [ ] **Theme Coherence:** Đúng các mã màu `#06b6d4`, `#0b0f17`, `#111827`, font chữ phân chia chuẩn giữa `Space Grotesk` (tiêu đề) và `JetBrains Mono` (dữ liệu/code/giá).
- [ ] **60FPS Scroll:** Cuộn chuột nhanh trên màn hình 120Hz/60Hz không có hiện tượng drop-frame hoặc giật lag.

