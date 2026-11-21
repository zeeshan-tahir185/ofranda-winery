"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { wines } from "@/lib/content";
import Title from "./Title";
import { ArrowIcon, ChevronIcon } from "./Icons";

export default function Wines() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const start = useRef<number | null>(null);
  const total = wines.length;

  const go = (step: 1 | -1) => {
    setDir(step);
    setIndex((i) => (i + step + total) % total);
  };

  const wine = wines[index];

  return (
    <section className="wines paper" id="wines" data-tone="light">
      <div className="wines__head">
        <div>
          <p className="eyebrow" data-reveal>
            The collection
          </p>
          <Title lines={["The wines", "of Ofranda"]} className="title--xl" />
        </div>
        <p className="body wines__intro" data-reveal>
          Five wines, each from a single harvest and a single place. Made in small quantities, without haste, and
          only from our own organically grown grapes.
        </p>
      </div>

      <div
        className="showcase"
        data-reveal
        onPointerDown={(e) => (start.current = e.clientX)}
        onPointerUp={(e) => {
          if (start.current === null) return;
          const dx = e.clientX - start.current;
          start.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => (start.current = null)}
      >
        <div className="showcase__stage">
          <span className="showcase__ghost" aria-hidden="true" key={`g${index}`}>
            {wine.name}
          </span>
          <div className={`showcase__bottle dir-${dir === 1 ? "next" : "prev"}`} key={`b${index}`}>
            <Image src={wine.image} alt={`${wine.name} ${wine.vintage}`} fill sizes="(max-width: 900px) 80vw, 34vw" draggable={false} />
          </div>
        </div>

        <div className="showcase__info" key={`i${index}`}>
          <p className="showcase__count">
            <span>{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
          </p>
          <h3 className="showcase__name">{wine.name}</h3>
          <p className="showcase__style">
            {wine.style} · {wine.vintage}
          </p>
          <p className="showcase__grapes">{wine.grapes}</p>
          <p className="showcase__text">{wine.text}</p>
          <p className="showcase__cert">ECOCERT · MD-BIO-154</p>
          <a href="#wines" className="link">
            Discover more
            <ArrowIcon className="link__arrow" />
          </a>
        </div>

        <div className="showcase__nav">
          <button type="button" className="round" onClick={() => go(-1)} aria-label="Previous wine">
            <ChevronIcon className="flip" />
          </button>
          <div className="showcase__dots">
            {wines.map((w, i) => (
              <button
                key={w.name}
                type="button"
                className={i === index ? "is-active" : undefined}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={w.name}
              >
                <span>{w.name}</span>
              </button>
            ))}
          </div>
          <button type="button" className="round" onClick={() => go(1)} aria-label="Next wine">
            <ChevronIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
