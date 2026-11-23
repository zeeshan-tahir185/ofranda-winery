import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Bodoni_Moda, Cormorant_Garamond, Jost, Marcellus } from "next/font/google";
import { locales, site, type Locale } from "@/lib/content";
import { alternates, getDict } from "@/lib/i18n";
import Motion from "@/components/Motion";
import AgeGate from "@/components/AgeGate";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
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

const display = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const mark = Marcellus({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-mark",
  display: "swap",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  const brand = t.meta.title.split(" — ")[0];
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s — ${brand}` },
    description: t.meta.description,
    alternates: alternates(locale),
    openGraph: {
      type: "website",
      siteName: brand,
      locale,
      images: [{ url: "/media/hero-poster.jpg", width: 1920, height: 1080 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

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
  const t = getDict(locale);
  const headerText = { nav: t.nav, language: t.ui.language, primary: t.ui.primary, secondary: t.ui.secondary, homeLabel: t.ui.homeLabel, menu: t.ui.menu };

  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable} ${mark.variable} ${display.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: gateScript }} />
      </head>
      <body>
        <Motion />
        <AgeGate locale={locale} t={t.gate} langLabel={t.ui.language} />
        <Header locale={locale} t={headerText} />
        <main>{children}</main>
        <Footer locale={locale} />
        <CookieConsent t={t.consent} />
        <Analytics />
      </body>
    </html>
  );
}
