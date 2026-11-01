import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AutoTool.dev - Cửa Hàng Phần Mềm & Tool Tự Động Hóa Đóng Gói Sẵn",
  description:
    "Sàn thương mại điện tử chuyên cung cấp các phần mềm MMO, Crawler, Bot Telegram đóng gói sẵn kèm License Key tức thì.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-cyan-500/20 selection:text-cyan-400`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
