"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronIcon } from "./Icons";

type Props = {
  children: ReactNode;
  className?: string;
  label: string;
  prevLabel?: string;
  nextLabel?: string;
  tone?: "dark" | "light";
  controls?: "top" | "none";
};

export default function Rail({ children, className = "", label, prevLabel = "Previous", nextLabel = "Next", tone = "dark", controls = "top" }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const check = () => {
      const max = el.scrollWidth - el.clientWidth - 2;
      setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max });
    };
    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const move = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(":scope > *");
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className={`rail rail--${tone} ${className}`}>
      <div className="rail__track" ref={track} role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
      {controls === "top" && (
        <div className="rail__controls">
          <button type="button" className="round" onClick={() => move(-1)} disabled={edge.start} aria-label={`${prevLabel} ${label}`}>
            <ChevronIcon className="flip" />
          </button>
          <button type="button" className="round" onClick={() => move(1)} disabled={edge.end} aria-label={`${nextLabel} ${label}`}>
            <ChevronIcon />
          </button>
        </div>
      )}
    </div>
  );
}
