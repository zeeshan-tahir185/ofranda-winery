const paths: Record<string, string> = {
  alcohol: "M12 4c-1.5 0-2 1.5-1.2 2.6M9 8.5a1.6 1.6 0 1 0 0 .1M12 8.5a1.6 1.6 0 1 0 0 .1M15 8.5a1.6 1.6 0 1 0 0 .1M10.5 11.5a1.6 1.6 0 1 0 0 .1M13.5 11.5a1.6 1.6 0 1 0 0 .1M12 14.5a1.6 1.6 0 1 0 0 .1",
  volume: "M10 3.5h4M10.5 3.5v4.5c-2 1-3 2.6-3 4.6v7.9h9v-7.9c0-2-1-3.6-3-4.6V3.5",
  altitude: "M3 19.5 9.5 8l3.5 6 2.5-4 5.5 9.5ZM8 10.5l1.5 1.5 1.5-1.5",
  yield: "M3 9c4-2 8 2 12 0s5-2 6-1M3 13c4-2 8 2 12 0s5-2 6-1M3 17c4-2 8 2 12 0s5-2 6-1",
  vinification: "M4 15c2 0 4 1 6 1s4-1 4-2.5S12 12 10 12H7M4 19h10c3 0 6-3 7-5-1-1-3 0-5 1M14 6.5c1-1.5 3-2 4-1.5-.5 1.5-2 2.5-4 2.5Z",
  fermentation: "M6 5.5h12v13H6ZM6 9.5h12M6 14.5h12M9.5 5.5c-1 4.3-1 8.7 0 13M14.5 5.5c1 4.3 1 8.7 0 13",
  ageing: "M7 3.5h10M7 20.5h10M8 3.5c0 4 4 5 4 8.5s-4 4.5-4 8.5M16 3.5c0 4-4 5-4 8.5s4 4.5 4 8.5",
  filtration: "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17ZM6 18 18 6M12 7.5c-1.8 2.4-2.8 4-2.8 5.3a2.8 2.8 0 0 0 5.6 0c0-1.3-1-2.9-2.8-5.3Z",
};

export default function TechIcon({ name }: { name: string }) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg className="tech__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const warnings = [
  "M8.2 14.5V9.5l-1 .8M10.6 11.9h2.6M11.9 10.6v2.6M15 9.5c-1.2 0-1.6.7-1.6 1.3 0 .6.5 1 1.6 1s1.7.5 1.7 1.3-.6 1.4-1.7 1.4-1.7-.6-1.7-1.4M15 9.5c1 0 1.5.6 1.5 1.2",
  "M12.4 6.4a1.3 1.3 0 1 0 0 .1M11.5 8.6c-1.4.4-2 1.6-2 3l1.2.3.6 4.8M12 9c1.6.4 3 1.8 2.8 4-.2 1.6-1.6 2.4-3 2.2",
  "M7.5 13.5h9l-1-3.5c-.2-.6-.7-1-1.3-1h-4.4c-.6 0-1.1.4-1.3 1Zm0 0v2.5h1.6v-1M16.5 13.5v2.5h-1.6v-1M9 12h.1M15 12h.1",
];

export function WarningIcon({ kind }: { kind: number }) {
  return (
    <svg className="warnings__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
