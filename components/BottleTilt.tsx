"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function BottleTilt({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.closest<HTMLElement>("[data-tilt-host]");
    if (!el || !host) return;
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const set = (x: number, y: number) => {
      el.style.setProperty("--rx", `${(x * 12).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(-y * 5).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${(50 + x * 90).toFixed(1)}%`);
    };
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => set(x, y));
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      set(0, 0);
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="vp__bottle" ref={ref}>
      <span className="vp__floor" />
      <div className="vp__glass">
        <Image src={src} alt={alt} width={380} height={1400} priority sizes="(max-width: 767px) 150px, 240px" className="vp__img" />
        <span className="vp__sheen" style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }} />
        <span className="vp__glare" style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }} />
      </div>
    </div>
  );
}
