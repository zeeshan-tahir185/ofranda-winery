"use client";

import { useState } from "react";
import { PrintIcon, ShareIcon } from "./Icons";

export default function ShareBar({ title, t }: { title: string; t: { share: string; linkCopied: string; print: string } }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  return (
    <div className="sharebar">
      <button type="button" onClick={share}>
        <ShareIcon className="ico" />
        {copied ? t.linkCopied : t.share}
      </button>
      <button type="button" onClick={() => window.print()}>
        <PrintIcon className="ico" />
        {t.print}
      </button>
    </div>
  );
}
