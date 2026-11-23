"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    const lenis = reduce ? null : new Lenis({ duration: 1.25, smoothWheel: true });
    (window as unknown as { lenis?: Lenis | null }).lenis = lenis;

    const onAnchor = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!link) return;
      const url = new URL(link.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      root.classList.remove("menu-open");
      if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -60 });
      else target.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", onAnchor);

    const revealer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => revealer.observe(el));

    const toneSections = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      root.classList.toggle("is-scrolled", window.scrollY > 40);

      let tone = "light";
      for (const section of toneSections) {
        const r = section.getBoundingClientRect();
        if (r.top <= 70 && r.bottom > 70) tone = section.dataset.tone || "light";
      }
      root.dataset.headerTone = tone;

      if (reduce) return;
      for (const el of parallax) {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const speed = parseFloat(el.dataset.parallax || "0.12");
        const progress = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = `translate3d(0, ${(-progress * speed * 100).toFixed(2)}%, 0)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    let raf = 0;
    if (lenis) {
      lenis.on("scroll", onScroll);
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(frame);
      lenis?.destroy();
      revealer.disconnect();
      document.removeEventListener("click", onAnchor);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
