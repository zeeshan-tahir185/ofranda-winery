"use client";

import { usePathname } from "next/navigation";
import { contact, locales, nav, type NavKey } from "@/lib/content";
import { MailIcon, PhoneIcon } from "./Icons";
import { Logo } from "./Logo";

export function LangLinks({ locale, label, className = "langs" }: { locale: string; label: string; className?: string }) {
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  return (
    <nav className={className} aria-label={label}>
      {locales.map((l) => (
        <a key={l} href={`/${l}${rest}`} className={l === locale ? "is-active" : undefined} aria-current={l === locale ? "page" : undefined}>
          {l.toUpperCase()}
        </a>
      ))}
    </nav>
  );
}

export type HeaderText = {
  nav: Record<NavKey, string>;
  language: string;
  primary: string;
  secondary: string;
  homeLabel: string;
  menu: string;
};

export default function Header({ locale, t }: { locale: string; t: HeaderText }) {
  const toggle = () => document.documentElement.classList.toggle("menu-open");
  const link = (path: string) => `/${locale}${path}`;
  const items = [...nav.left, ...nav.right];

  return (
    <header className="header">
      <div className="header__utility">
        <div className="header__contacts">
          <a href={`mailto:${contact.email}`}>
            <MailIcon className="ico" />
            {contact.email}
          </a>
          <a href={`tel:${contact.phoneHref}`}>
            <PhoneIcon className="ico" />
            {contact.phone}
          </a>
        </div>
        <LangLinks locale={locale} label={t.language} />
      </div>

      <div className="header__bar">
        <nav className="header__nav header__nav--left" aria-label={t.primary}>
          {nav.left.map((n) => (
            <a key={n.href} href={link(n.href)}>
              {t.nav[n.key]}
            </a>
          ))}
        </nav>
        <a href={link("")} className="header__brand" aria-label={t.homeLabel}>
          <Logo className="header__logo" />
        </a>
        <nav className="header__nav header__nav--right" aria-label={t.secondary}>
          {nav.right.map((n) => (
            <a key={n.href} href={link(n.href)}>
              {t.nav[n.key]}
            </a>
          ))}
        </nav>
        <button type="button" className="burger" onClick={toggle} aria-label={t.menu}>
          <span />
          <span />
        </button>
      </div>

      <div className="menu">
        <nav className="menu__nav">
          {items.map((n, i) => (
            <a key={n.href} href={link(n.href)} style={{ transitionDelay: `${0.08 + i * 0.05}s` }}>
              <span className="menu__num">0{i + 1}</span>
              {t.nav[n.key]}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
          <LangLinks locale={locale} label={t.language} />
        </div>
      </div>
    </header>
  );
}
