"use client";

import { useState } from "react";
import TechIcon from "./TechIcon";

export type DossierTab = { title: string; rows: { icon: string; label: string; value: string; muted?: boolean }[] };

export default function Dossier({ tabs, label }: { tabs: DossierTab[]; label: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="dossier">
      <div className="dossier__tabs" role="tablist" aria-label={label}>
        {tabs.map((t, i) => (
          <button
            key={t.title}
            type="button"
            role="tab"
            id={`dossier-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`dossier-panel-${i}`}
            className={i === active ? "is-on" : undefined}
            onClick={() => setActive(i)}
          >
            {t.title}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <dl key={t.title} className="dossier__panel" role="tabpanel" id={`dossier-panel-${i}`} aria-labelledby={`dossier-tab-${i}`} hidden={i !== active}>
          {t.rows.map((r) => (
            <div key={r.label} className="dossier__row">
              <TechIcon name={r.icon} className="dossier__icon" />
              <dt>{r.label}</dt>
              <dd className={r.muted ? "is-muted" : undefined}>{r.value}</dd>
            </div>
          ))}
        </dl>
      ))}
    </div>
  );
}
