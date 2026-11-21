import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Jost, Marcellus } from "next/font/google";
import { locales, type Locale } from "@/lib/content";
import "../globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const mark = Marcellus({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-mark",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crama Ofranda — An offering of the land",
  description:
    "Certified organic winery in the Republic of Moldova, on the path to biodynamic winemaking.",
};

export const viewport: Viewport = {
  themeColor: "#f3ede3",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const gateScript = `try{var a=localStorage.getItem("ofranda-age");if(a&&+a>Date.now())document.documentElement.dataset.age="ok"}catch(e){}`;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable} ${mark.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: gateScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
