"use client";

import { useState, type ReactNode } from "react";

export default function NewsList({
  categories,
  label,
  items,
}: {
  categories: { key: string; label: string }[];
  label: string;
  items: { category: string; node: ReactNode }[];
}) {
  const [active, setActive] = useState("all");
  const shown = active === "all" ? items : items.filter((p) => p.category === active);

  return (
    <div className="newslist__inner">
      <div className="chips" role="tablist" aria-label={label}>
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            role="tab"
            aria-selected={active === c.key}
            className={active === c.key ? "chip is-active" : "chip"}
            onClick={() => setActive(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="newslist__grid">{shown.map((p) => p.node)}</div>
    </div>
  );
}
