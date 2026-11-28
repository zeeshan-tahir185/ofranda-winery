"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { localeNames, locales } from "@/lib/content";

export default function LangMenu({ locale, label, className = "", up = false }: { locale: string; label: string; className?: string; up?: boolean }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const close = () => setOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", key);
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", key);
      window.removeEventListener("scroll", close);
    };
  }, [open]);

  return (
    <div ref={root} className={`lang ${up ? "lang--up" : ""} ${open ? "is-open" : ""} ${className}`}>
      <button type="button" className="lang__btn" aria-label={label} aria-haspopup="true" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <svg className="lang__globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.6 2.5 3.9 5.5 3.9 9s-1.3 6.5-3.9 9c-2.6-2.5-3.9-5.5-3.9-9S9.4 5.5 12 3Z" />
        </svg>
        <span>{locale.toUpperCase()}</span>
        <svg className="lang__chev" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
          <path d="m1 1 4 4 4-4" />
        </svg>
      </button>
      <ul className="lang__list" hidden={!open}>
        {locales.map((l) => (
          <li key={l}>
            <a href={`/${l}${rest}`} lang={l} hrefLang={l} aria-current={l === locale ? "page" : undefined}>
              <span>{localeNames[l]}</span>
              <small>{l.toUpperCase()}</small>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
