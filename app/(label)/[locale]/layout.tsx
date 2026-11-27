import type { Viewport } from "next";
import { notFound } from "next/navigation";
import { Bodoni_Moda, Jost } from "next/font/google";
import { locales, type Locale } from "@/lib/content";
import "./label.css";

const display = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function LabelLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <body className="el-body">{children}</body>
    </html>
  );
}
