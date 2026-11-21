"use client";

import { contact, locales, nav } from "@/lib/content";
import { MailIcon, PhoneIcon } from "./Icons";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`}>
      <span className="wordmark__top">Crama</span>
      <span className="wordmark__main">Ofranda</span>
    </span>
  );
}

export default function Header() {
  const toggle = () => document.documentElement.classList.toggle("menu-open");

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
        <nav className="langs" aria-label="Language">
          {locales.map((l) => (
            <a key={l} href={`/${l}`} className={l === "en" ? "is-active" : undefined} aria-current={l === "en" ? "page" : undefined}>
              {l.toUpperCase()}
            </a>
          ))}
        </nav>
      </div>

      <div className="header__bar">
        <nav className="header__nav header__nav--left" aria-label="Primary">
          {nav.left.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#top" className="header__brand" aria-label="Crama Ofranda, home">
          <Wordmark />
        </a>
        <nav className="header__nav header__nav--right" aria-label="Secondary">
          {nav.right.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <button type="button" className="burger" onClick={toggle} aria-label="Menu">
          <span />
          <span />
        </button>
      </div>

      <div className="menu">
        <nav className="menu__nav">
          {[...nav.left, ...nav.right].map((n, i) => (
            <a key={n.href} href={n.href} style={{ transitionDelay: `${0.08 + i * 0.05}s` }}>
              <span className="menu__num">0{i + 1}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
          <div className="langs">
            {locales.map((l) => (
              <a key={l} href={`/${l}`} className={l === "en" ? "is-active" : undefined}>
                {l.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
