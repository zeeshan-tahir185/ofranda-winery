"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isQrPage } from "./Analytics";
import { PrivacyIcon } from "./Icons";
import type { Dict } from "@/lib/i18n";

type Choice = "all" | "essential" | "custom";

export default function CookieConsent({ t }: { t: Dict["consent"] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("ofranda-consent");
    } catch {}
    if (!stored) setOpen(true);

    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-cookie-settings]")) {
        e.preventDefault();
        setOpen(true);
        setSettings(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const save = (choice: Choice) => {
    const value =
      choice === "all"
        ? { analytics: true, marketing: true }
        : choice === "essential"
          ? { analytics: false, marketing: false }
          : prefs;
    try {
      localStorage.setItem("ofranda-consent", JSON.stringify({ ...value, at: Date.now(), version: 1 }));
    } catch {}
    window.dispatchEvent(new CustomEvent("ofranda-consent", { detail: value }));
    setOpen(false);
    setSettings(false);
  };

  if (isQrPage(pathname)) return null;

  return (
    <>
      <div className={`consent ${open ? "is-open" : ""}`} role="dialog" aria-label={t.label} aria-hidden={!open}>
        <p className="consent__title">{t.title}</p>
        <p className="consent__text">{t.text}</p>

        {settings && (
          <div className="consent__prefs">
            <label>
              <input type="checkbox" checked disabled />
              <span>{t.necessary}</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={prefs.analytics}
                onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
              />
              <span>{t.analytics}</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={prefs.marketing}
                onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
              />
              <span>{t.marketing}</span>
            </label>
          </div>
        )}

        <div className="consent__actions">
          <button type="button" className="btn btn--solid btn--sm" onClick={() => save("all")}>
            {t.acceptAll}
          </button>
          <button type="button" className="btn btn--line btn--sm" onClick={() => save("essential")}>
            {t.reject}
          </button>
          {settings ? (
            <button type="button" className="btn btn--text" onClick={() => save("custom")}>
              {t.save}
            </button>
          ) : (
            <button type="button" className="btn btn--text" onClick={() => setSettings(true)}>
              {t.settings}
            </button>
          )}
        </div>
      </div>

      <button
        type="button"
        className="privacy-fab"
        aria-label={t.fab}
        onClick={() => {
          setOpen(true);
          setSettings(true);
        }}
      >
        <PrivacyIcon />
      </button>
    </>
  );
}
