const line: Record<string, string> = {
  grapes:
    "M13 3.5c2.2-.6 4 .4 4.6 2.2-1.9.7-3.7.1-4.6-2.2ZM12 4.5V7M9 9.8a2.3 2.3 0 1 0 0 .1M14 9.8a2.3 2.3 0 1 0 0 .1M6.6 14a2.3 2.3 0 1 0 0 .1M11.5 14a2.3 2.3 0 1 0 0 .1M16.4 14a2.3 2.3 0 1 0 0 .1M9 18.2a2.3 2.3 0 1 0 0 .1M14 18.2a2.3 2.3 0 1 0 0 .1",
  leaf: "M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19l9-9",
  flask: "M9.5 3.5h5M10.5 3.5v6L5 18.6c-.8 1.4.2 2.9 1.8 2.9h10.4c1.6 0 2.6-1.5 1.8-2.9L13.5 9.5v-6M7.6 15h8.8",
  document: "M6 3.5h9l3.5 3.5v13.5H6ZM9 10h6.5M9 13.5h6.5M9 17h4",
  glass: "M7.5 3.5h9c0 5-1.8 8-4.5 8s-4.5-3-4.5-8ZM12 11.5v8M8.5 20.5h7",
  factory: "M3.5 20.5v-9l5 3v-3l5 3v-3l5 3V4.5h2v16ZM7 17.5h2M11.5 17.5h2M16 17.5h2",
  book: "M12 6.5c-2-1.3-5-2-8.5-2v14c3.5 0 6.5.7 8.5 2 2-1.3 5-2 8.5-2v-14c-3.5 0-6.5.7-8.5 2ZM12 6.5v14M15.8 10.2v4.6M15.8 8.3v.1",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 10.8v5.6M12 7.8v.1",
};

export function LabelIcon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={line[name]} />
    </svg>
  );
}

const ban: Record<number, React.ReactNode> = {
  0: (
    <g fill="currentColor">
      <circle cx="31" cy="15.5" r="4.2" />
      <path d="M27.4 21.5h6.2c1.2 0 2 .7 2.3 1.8l1.1 4.4c2.8.9 5 3.6 5 7 0 3.6-2.5 6.4-5.9 7l-.4 9.3h-9.6l-.5-12.4-2.6-.2c-1.1-.1-1.7-1-1.5-2l2.4-11.7c.3-1.6 1.6-3.2 3.5-3.2Z" />
    </g>
  ),
  1: (
    <text x="32.5" y="41" textAnchor="middle" fontFamily="Arial Black, Arial, Helvetica, sans-serif" fontWeight="900" fontSize="25" letterSpacing="-1.5" fill="currentColor">
      18
    </text>
  ),
  2: (
    <g fill="currentColor">
      <path d="M20 31.5 23.2 23c.6-1.6 2.1-2.5 3.7-2.5h10.2c1.6 0 3.1.9 3.7 2.5l3.2 8.5c1.6.6 2.7 2.2 2.7 3.9v7.1c0 .8-.7 1.5-1.5 1.5h-1.9v2.7c0 .9-.7 1.6-1.6 1.6h-2.4c-.9 0-1.6-.7-1.6-1.6V44H26.3v2.7c0 .9-.7 1.6-1.6 1.6h-2.4c-.9 0-1.6-.7-1.6-1.6V44h-1.9c-.8 0-1.5-.7-1.5-1.5v-7.1c0-1.7 1.1-3.3 2.7-3.9Zm4.1-.4h15.8l-2.3-6.3c-.2-.6-.8-.9-1.4-.9h-8.4c-.6 0-1.2.3-1.4.9Zm-1 8.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Zm17.8 0a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" />
    </g>
  ),
};

export function BanIcon({ kind, className = "" }: { kind: number; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <g color="#111">{ban[kind]}</g>
      <circle cx="32" cy="32" r="27.5" fill="none" stroke="#d71920" strokeWidth="5" />
      <path d="M12.6 12.6 51.4 51.4" stroke="#d71920" strokeWidth="5" />
    </svg>
  );
}

export function RecycleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" fill="currentColor">
      <path d="M26.2 9.6c1.9-3.3 6.6-3.3 8.5 0l6.9 11.9 3.9-2.2-2.8 11.6-11.6-3.1 3.9-2.3-5.8-10c-.4-.7-1.3-.7-1.7 0l-3.4 5.9-8.2-4.7Z" />
      <path d="M55.6 39.4c1.9 3.3-.4 7.4-4.3 7.4H37.6v4.5l-8.6-8.3 8.6-8.4v4.6h11.5c.8 0 1.3-.9.9-1.6l-3.4-5.9 8.2-4.7Z" />
      <path d="M17.6 51.1c-3.8 0-6.2-4.1-4.3-7.4l6.9-11.9-3.9-2.3 11.5-3.3 3 11.6-3.9-2.3-5.8 10c-.4.7.1 1.6.9 1.6h6.8v9.4Z" />
    </svg>
  );
}

export function RecycleCode({ code, material, className = "" }: { code: string; material: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-label={`${code} ${material}`} role="img">
      <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round">
        <path d="M23 13.5 28.4 4.6h7.2L41 13.5" />
        <path d="m45.4 21.2 5 8.6-3.6 6.3H37" />
        <path d="M27 36.1H17.2l-3.6-6.3 5-8.6" />
      </g>
      <g fill="currentColor">
        <path d="m38.5 9.3 6.6 1.6-1.9 6.5Z" />
        <path d="m40.6 39.6-4.6-5 4.9-4.6Z" />
        <path d="m16.5 22.7 2.1-6.4 6.3 2.6Z" />
      </g>
      <text x="32" y="28" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="13" fill="currentColor">
        {code}
      </text>
      <text x="32" y="57" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="15" fill="currentColor">
        {material}
      </text>
    </svg>
  );
}
