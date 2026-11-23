"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EcocertMark } from "./Logo";
import { ArrowIcon } from "./Icons";

export type CellarItem = {
  slug: string;
  name: string;
  vintage: string;
  type: string;
  edition?: string;
  grapes: string;
  summary?: string;
  notes: string[];
  specs: { label: string; value: string }[];
  organic?: { label: string; code: string };
  href?: string;
  image: string;
  sample: boolean;
};

type Props = {
  items: CellarItem[];
  label: string;
  discover: string;
  soon: string;
};

const lines = (name: string) => {
  const words = name.toUpperCase().split(" ");
  const out: string[] = [];
  for (const w of words) {
    const last = out[out.length - 1];
    if (last && (last + " " + w).length <= 10) out[out.length - 1] = last + " " + w;
    else out.push(w);
  }
  return out;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function Cellar({ items, label, discover, soon }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = items.length;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      if (span <= 0) return;
      const p = Math.min(1, Math.max(0, -r.top / span));
      setActive(Math.min(n - 1, Math.floor(p * n)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [n]);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + (span * (i + 0.5)) / n;
    const lenis = (window as unknown as { lenis?: { scrollTo(y: number, o?: object): void } | null }).lenis;
    if (lenis) lenis.scrollTo(top, { duration: 1.4 });
    else window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="cellar" ref={track} style={{ ["--count" as string]: n }}>
      <div className="cellar__frame">
        {items.map((w, i) => {
          const name = lines(w.name);
          const longest = Math.max(...name.map((l) => l.length));
          return (
            <article key={w.slug} className="cellar__slide" data-slug={w.slug} data-on={i === active || undefined} aria-hidden={i !== active || undefined}>
              <div className="cellar__bg" />
              <p className="cellar__count">
                {pad(i + 1)}
                <span>{pad(n)}</span>
              </p>
              <h3 className="cellar__name" style={{ ["--fs" as string]: `${Math.min(16, 68 / (longest * 0.74)).toFixed(2)}vw` }}>
                {name.map((l, k) => (
                  <span key={l} className="cellar__line">
                    <span style={{ transitionDelay: `${0.08 * k}s` }}>{l}</span>
                  </span>
                ))}
              </h3>

              <div className="cellar__bottle">
                <span className="cellar__glow" />
                <Image src={w.image} alt={`${w.name} ${w.vintage}`} width={372} height={1418} sizes="(max-width: 767px) 140px, 240px" className="cellar__img" />
                {w.sample && (
                  <span className="cellar__label" aria-hidden="true">
                    <span className="cellar__label-name">{w.name}</span>
                    <span className="cellar__label-year">{w.vintage}</span>
                  </span>
                )}
              </div>

              <div className="cellar__info">
                <p className="cellar__type">
                  {w.type} <i>{w.vintage}</i>
                </p>
                {w.edition && <p className="cellar__edition">{w.edition}</p>}
                <p className="cellar__grapes">{w.grapes}</p>
                <p className={w.summary ? "cellar__summary" : "cellar__summary cellar__summary--soon"}>{w.summary || soon}</p>
                {w.href && (
                  <a href={w.href} className="cellar__more" tabIndex={i === active ? 0 : -1}>
                    <span>{discover}</span>
                    <ArrowIcon className="link__arrow" />
                  </a>
                )}
              </div>

              <div className="cellar__side">
                <dl className="cellar__specs">
                  {w.specs.map((s) => (
                    <div key={s.label}>
                      <dt>{s.label}</dt>
                      <dd>{s.value}</dd>
                    </div>
                  ))}
                </dl>
                {w.notes.length > 0 && (
                  <ul className="cellar__notes">
                    {w.notes.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                {w.organic && (
                  <p className="cellar__eco">
                    <EcocertMark className="cellar__eco-mark" />
                    <span>
                      {w.organic.label}
                      <b>{w.organic.code}</b>
                    </span>
                  </p>
                )}
              </div>
            </article>
          );
        })}

        <nav className="cellar__nav" aria-label={label}>
          {items.map((w, i) => (
            <button key={w.slug} type="button" onClick={() => go(i)} className={i === active ? "is-on" : undefined} aria-current={i === active || undefined}>
              <span className="cellar__nav-num">{pad(i + 1)}</span>
              <span className="cellar__nav-name">{w.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
