"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

type Consent = { analytics: boolean; marketing: boolean };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const isQrPage = (pathname: string | null) => !!pathname && /^\/[a-z]{2}\/wines\//.test(pathname);

const toGoogle = (c: Consent) => ({
  analytics_storage: c.analytics ? "granted" : "denied",
  ad_storage: c.marketing ? "granted" : "denied",
  ad_user_data: c.marketing ? "granted" : "denied",
  ad_personalization: c.marketing ? "granted" : "denied",
});

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GTM_ID || isQrPage(pathname) || window.gtag) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    };

    let stored: Consent = { analytics: false, marketing: false };
    try {
      const raw = localStorage.getItem("ofranda-consent");
      if (raw) stored = JSON.parse(raw);
    } catch {}

    window.gtag("consent", "default", { ...toGoogle({ analytics: false, marketing: false }), wait_for_update: 500 });
    window.gtag("consent", "update", toGoogle(stored));
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);

    const onConsent = (e: Event) => window.gtag?.("consent", "update", toGoogle((e as CustomEvent<Consent>).detail));
    window.addEventListener("ofranda-consent", onConsent);
    return () => window.removeEventListener("ofranda-consent", onConsent);
  }, [pathname]);

  return null;
}
