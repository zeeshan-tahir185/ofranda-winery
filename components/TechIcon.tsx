const paths: Record<string, string> = {
  alcohol: "M12 4c-1.5 0-2 1.5-1.2 2.6M9 8.5a1.6 1.6 0 1 0 0 .1M12 8.5a1.6 1.6 0 1 0 0 .1M15 8.5a1.6 1.6 0 1 0 0 .1M10.5 11.5a1.6 1.6 0 1 0 0 .1M13.5 11.5a1.6 1.6 0 1 0 0 .1M12 14.5a1.6 1.6 0 1 0 0 .1",
  volume: "M10 3.5h4M10.5 3.5v4.5c-2 1-3 2.6-3 4.6v7.9h9v-7.9c0-2-1-3.6-3-4.6V3.5",
  altitude: "M3 19.5 9.5 8l3.5 6 2.5-4 5.5 9.5ZM8 10.5l1.5 1.5 1.5-1.5",
  yield: "M3 9c4-2 8 2 12 0s5-2 6-1M3 13c4-2 8 2 12 0s5-2 6-1M3 17c4-2 8 2 12 0s5-2 6-1",
  vinification: "M4 15c2 0 4 1 6 1s4-1 4-2.5S12 12 10 12H7M4 19h10c3 0 6-3 7-5-1-1-3 0-5 1M14 6.5c1-1.5 3-2 4-1.5-.5 1.5-2 2.5-4 2.5Z",
  fermentation: "M6 5.5h12v13H6ZM6 9.5h12M6 14.5h12M9.5 5.5c-1 4.3-1 8.7 0 13M14.5 5.5c1 4.3 1 8.7 0 13",
  ageing: "M7 3.5h10M7 20.5h10M8 3.5c0 4 4 5 4 8.5s-4 4.5-4 8.5M16 3.5c0 4-4 5-4 8.5s4 4.5 4 8.5",
  filtration: "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17ZM6 18 18 6M12 7.5c-1.8 2.4-2.8 4-2.8 5.3a2.8 2.8 0 0 0 5.6 0c0-1.3-1-2.9-2.8-5.3Z",
  grapes: "M12 4c-1.5 0-2 1.5-1.2 2.6M9 8.5a1.6 1.6 0 1 0 0 .1M12 8.5a1.6 1.6 0 1 0 0 .1M15 8.5a1.6 1.6 0 1 0 0 .1M10.5 11.5a1.6 1.6 0 1 0 0 .1M13.5 11.5a1.6 1.6 0 1 0 0 .1M12 14.5a1.6 1.6 0 1 0 0 .1",
  percent: "M7 17 17 7M8.5 10a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM15.5 17.6a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z",
  extraction: "M12 3.5v8.5M8.8 8.8 12 12l3.2-3.2M12 14.8c-1.6 2.1-2.4 3.2-2.4 4.1a2.4 2.4 0 0 0 4.8 0c0-.9-.8-2-2.4-4.1Z",
  origin: "M12 20.5s-6-5.6-6-10.2a6 6 0 0 1 12 0c0 4.6-6 10.2-6 10.2ZM12 12.3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  exposure: "M3 18.5h18M6.5 18.5a5.5 5.5 0 0 1 11 0M12 7.5V5M6.7 9.7 5 8M17.3 9.7 19 8M4 14H2.5M21.5 14H20",
  soil: "M3 8.5h18M3 13h18M3 17.5h18M7 10.8h.1M12.5 10.8h.1M17.5 10.8h.1M9.5 15.3h.1M15 15.3h.1M5.5 5.5c1.5-1.4 3.5-1.4 5 0s3.5 1.4 5 0 3-1.4 3 0",
  glass: "M8 3.5h8c0 4.2-1.2 7-4 7s-4-2.8-4-7ZM12 10.5v8M8.5 20.5h7M8.2 6.5h7.6",
  bottles: "M5.5 20.5v-7.2c0-1.1.7-1.9 1.4-2.4V7h1.6v3.9c.7.5 1.4 1.3 1.4 2.4v7.2ZM14.1 20.5v-7.2c0-1.1.7-1.9 1.4-2.4V7h1.6v3.9c.7.5 1.4 1.3 1.4 2.4v7.2Z",
  lot: "M3.5 12V4.5H11l9.5 9.5-7 7ZM7.8 8.8a1 1 0 1 0 0-.1",
  calendar: "M4.5 6.5h15v13h-15ZM4.5 10.5h15M8.5 4v4M15.5 4v4M8 14h2M11 14h2M14 14h2M8 17h2M11 17h2",
  temperature: "M10 14.4V5a2 2 0 0 1 4 0v9.4a3.6 3.6 0 1 1-4 0ZM12 9v7.6M16 6.5h2.5M16 9.5h2.5",
  decant: "M10 3.5h4M10.5 3.5v5l-4.6 7.2c-1.2 2 .4 4.8 2.8 4.8h6.6c2.4 0 4-2.8 2.8-4.8l-4.6-7.2v-5M7.2 14.5h9.6",
};

export default function TechIcon({ name, className = "tech__icon" }: { name: string; className?: string }) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const warnings = [
  "M8.2 14.5V9.5l-1 .8M10.6 11.9h2.6M11.9 10.6v2.6M15 9.5c-1.2 0-1.6.7-1.6 1.3 0 .6.5 1 1.6 1s1.7.5 1.7 1.3-.6 1.4-1.7 1.4-1.7-.6-1.7-1.4M15 9.5c1 0 1.5.6 1.5 1.2",
  "M12.4 6.4a1.3 1.3 0 1 0 0 .1M11.5 8.6c-1.4.4-2 1.6-2 3l1.2.3.6 4.8M12 9c1.6.4 3 1.8 2.8 4-.2 1.6-1.6 2.4-3 2.2",
  "M7.5 13.5h9l-1-3.5c-.2-.6-.7-1-1.3-1h-4.4c-.6 0-1.1.4-1.3 1Zm0 0v2.5h1.6v-1M16.5 13.5v2.5h-1.6v-1M9 12h.1M15 12h.1",
];

export function WarningIcon({ kind, className = "warnings__icon" }: { kind: number; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      {kind === 0 ? (
        <text x="12" y="14.6" textAnchor="middle" fontSize="7.5" fontFamily="Arial, sans-serif" fill="currentColor" stroke="none">
          18+
        </text>
      ) : (
        <path d={warnings[kind]} />
      )}
      {kind > 0 && <path d="M5.3 18.7 18.7 5.3" />}
    </svg>
  );
}
