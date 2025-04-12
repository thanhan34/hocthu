import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PTE Intensive - Đăng ký học thử miễn phí",
  description: "Tư vấn lộ trình cá nhân hóa – Trải nghiệm lớp học thật – Học là đậu!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} ${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
