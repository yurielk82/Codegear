import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/siteConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteConfig.siteName} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: [
    "NPU",
    "반도체",
    "로봇 제어",
    "AI 가속기",
    "임베디드",
    "FPGA",
    "SoC",
    "스타트업",
    "천안",
  ],
  authors: [{ name: siteConfig.company.name }],
  creator: siteConfig.company.name,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://codegear.co.kr",
    title: `${siteConfig.siteName} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.siteName} - ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0f] text-gray-100`}
      >
        {/* Background Mesh */}
        <div className="mesh-gradient" />
        
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
