"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Dict } from "@/lib/i18n";
import { isQrPage } from "./Analytics";
import { locales } from "@/lib/content";
import { Logo } from "./Logo";

const VALID_DAYS = 30;

type Stage = "ask" | "denied" | "leaving";

export default function AgeGate({ locale, t, langLabel }: { locale: string; t: Dict["gate"]; langLabel: string }) {
  const [stage, setStage] = useState<Stage>("ask");
  const pathname = usePathname();
  const qr = isQrPage(pathname);
  const rest = (pathname || "").replace(/^\/[a-z]{2}(?=\/|$)/, "");

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop(): void; start(): void } | null }).lenis;
    if (!qr && document.documentElement.dataset.age !== "ok") {
      lenis?.stop();
      document.documentElement.classList.add("gate-open");
    }
  }, [qr]);

  const accept = () => {
    try {
      localStorage.setItem("ofranda-age", String(Date.now() + VALID_DAYS * 864e5));
    } catch {}
    setStage("leaving");
    const root = document.documentElement;
    root.dataset.age = "ok";
    root.classList.remove("gate-open");
    const lenis = (window as unknown as { lenis?: { start(): void } | null }).lenis;
    lenis?.start();
  };

  if (qr) return null;

  return (
    <div className={`gate gate--${stage}`} role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="gate__veil" />
      <div className="gate__panel">
        <nav className="gate__langs" aria-label={langLabel}>
          {locales.map((l) => (
            <a key={l} href={`/${l}${rest}`} className={l === locale ? "is-active" : undefined} aria-current={l === locale ? "page" : undefined}>
              {l.toUpperCase()}
            </a>
          ))}
        </nav>
        <div className="gate__emblem">
          <Logo />
        </div>

        {stage !== "denied" ? (
          <div className="gate__body" key="ask">
            <h2 id="gate-title" className="gate__title">
              {t.title[0]} <em>{t.title[1]}</em>
            </h2>
            <p className="gate__text">{t.text}</p>
            <div className="gate__actions">
              <button type="button" className="btn btn--solid" onClick={accept}>
                {t.yes}
              </button>
              <button type="button" className="btn btn--line" onClick={() => setStage("denied")}>
                {t.no}
              </button>
            </div>
          </div>
        ) : (
          <div className="gate__body" key="denied">
            <h2 id="gate-title" className="gate__title">
              {t.deniedTitle[0]} <em>{t.deniedTitle[1]}</em>
            </h2>
            <p className="gate__text">{t.deniedText}</p>
            <div className="gate__actions">
              <button type="button" className="btn btn--line" onClick={() => setStage("ask")}>
                {t.close}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
