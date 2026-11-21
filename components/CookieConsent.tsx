"use client";

import { useEffect, useState } from "react";
import { PrivacyIcon } from "./Icons";

type Choice = "all" | "essential" | "custom";

export default function CookieConsent() {
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
      localStorage.setItem("ofranda-consent", JSON.stringify({ ...value, at: Date.now() }));
    } catch {}
    setOpen(false);
    setSettings(false);
  };

  return (
    <>
      <div className={`consent ${open ? "is-open" : ""}`} role="dialog" aria-label="Cookie consent" aria-hidden={!open}>
        <p className="consent__title">Your privacy matters</p>
        <p className="consent__text">
          We use cookies to ensure the proper functioning of our website, improve your browsing experience and, with
          your consent, analyse website traffic and integrate social media content.
        </p>

        {settings && (
          <div className="consent__prefs">
            <label>
              <input type="checkbox" checked disabled />
              <span>Necessary</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={prefs.analytics}
                onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
              />
              <span>Analytics</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={prefs.marketing}
                onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
              />
              <span>Marketing</span>
            </label>
          </div>
        )}

        <div className="consent__actions">
          <button type="button" className="btn btn--solid btn--sm" onClick={() => save("all")}>
            Accept all
          </button>
          <button type="button" className="btn btn--line btn--sm" onClick={() => save("essential")}>
            Reject non-essential
          </button>
          {settings ? (
            <button type="button" className="btn btn--text" onClick={() => save("custom")}>
              Save choices
            </button>
          ) : (
            <button type="button" className="btn btn--text" onClick={() => setSettings(true)}>
              Cookie settings
            </button>
          )}
        </div>
      </div>

      <button
        type="button"
        className="privacy-fab"
        aria-label="Privacy settings"
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
