"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { locales } from "@/lib/content";

const VALID_DAYS = 30;

type Stage = "ask" | "denied" | "leaving";

export default function AgeGate() {
  const [stage, setStage] = useState<Stage>("ask");

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop(): void; start(): void } | null }).lenis;
    if (document.documentElement.dataset.age !== "ok") {
      lenis?.stop();
      document.documentElement.classList.add("gate-open");
    }
  }, []);

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

  return (
    <div className={`gate gate--${stage}`} role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="gate__veil" />
      <div className="gate__panel">
        <div className="gate__langs" aria-label="Language">
          {locales.map((l) => (
            <button key={l} type="button" className={l === "en" ? "is-active" : undefined}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="gate__emblem">
          <Image src="/media/emboss.jpg" alt="Crama Ofranda" width={893} height={893} priority />
        </div>

        {stage !== "denied" ? (
          <div className="gate__body" key="ask">
            <h2 id="gate-title" className="gate__title">
              Are you of legal drinking age <em>in your country?</em>
            </h2>
            <p className="gate__text">
              Please confirm that you meet the minimum legal age required in your country to access this
              website, which contains information about wine and alcoholic beverages.
            </p>
            <div className="gate__actions">
              <button type="button" className="btn btn--solid" onClick={accept}>
                Yes, I am
              </button>
              <button type="button" className="btn btn--line" onClick={() => setStage("denied")}>
                No, I am not
              </button>
            </div>
          </div>
        ) : (
          <div className="gate__body" key="denied">
            <h2 id="gate-title" className="gate__title">
              Access <em>restricted</em>
            </h2>
            <p className="gate__text">
              We are sorry, but you do not meet the minimum legal age requirement to access the Ofranda
              website in your country. Access to this website is therefore restricted.
            </p>
            <div className="gate__actions">
              <button type="button" className="btn btn--line" onClick={() => setStage("ask")}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
