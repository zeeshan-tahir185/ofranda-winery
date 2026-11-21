type P = { className?: string };

export const Leaf = ({ className = "" }: P) => (
  <svg className={`art ${className}`} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path
      pathLength={1}
      d="M50 88C46 80 40 76 30 77 22 78 14 74 10 66 16 64 18 60 14 54 8 50 6 42 10 36 16 38 20 36 22 30 22 22 28 14 36 12 38 18 42 20 46 16 48 10 50 6 50 6S52 10 54 16C58 20 62 18 64 12 72 14 78 22 78 30 80 36 84 38 90 36 94 42 92 50 86 54 82 60 84 64 90 66 86 74 78 78 70 77 60 76 54 80 50 88Z"
    />
    <path pathLength={1} d="M50 88V20M50 58 24 40M50 58l26-18M50 72 24 68M50 72l26-4M50 88l3 10" />
  </svg>
);

export const Sprout = ({ className = "" }: P) => (
  <svg className={`art ${className}`} viewBox="0 0 120 160" fill="none" aria-hidden="true">
    <path pathLength={1} d="M10 92h100M24 100h72M38 108h44" />
    <path pathLength={1} d="M60 92V40" />
    <path pathLength={1} d="M60 62C48 62 36 54 32 40c14-2 26 6 28 22Z" />
    <path pathLength={1} d="M60 50c10 0 22-8 26-22-14-2-25 7-26 22Z" />
    <path pathLength={1} d="M60 92c-2 12-10 20-22 26M60 92c3 14 12 22 24 28M60 92v40M52 110c-6 8-16 12-26 12M70 116c6 6 14 10 22 10M60 120c-4 8-10 14-18 18M60 124c4 8 10 14 18 16" />
  </svg>
);

export const Roots = ({ className = "" }: P) => (
  <svg className={`art ${className}`} viewBox="0 0 120 160" fill="none" aria-hidden="true">
    <path pathLength={1} d="M60 14v66M60 30l-14-14M60 30l14-14M60 46 44 34M60 46l16-12" />
    <path pathLength={1} d="M8 80h104M8 96h104M8 112h104" />
    <path pathLength={1} d="M60 80v70M60 96l-20 30M60 96l20 30M60 112l-34 34M60 112l34 34M40 126l-8 22M80 126l8 22" />
  </svg>
);

export const Cycles = ({ className = "" }: P) => (
  <svg className={`art art--cycles ${className}`} viewBox="0 0 160 160" fill="none" aria-hidden="true">
    <circle pathLength={1} cx="80" cy="80" r="66" />
    <circle pathLength={1} cx="80" cy="80" r="44" />
    <circle pathLength={1} cx="80" cy="80" r="20" />
    <g className="art__orbit">
      <circle cx="80" cy="14" r="5" />
      <circle cx="146" cy="80" r="5" />
      <circle cx="80" cy="146" r="5" />
      <circle cx="14" cy="80" r="5" />
    </g>
    <path pathLength={1} d="M80 60c-6 6-6 14 0 20 6-6 6-14 0-20Z" />
  </svg>
);

export const Divider = ({ className = "" }: P) => (
  <svg className={`divider ${className}`} viewBox="0 0 200 20" fill="none" aria-hidden="true">
    <path pathLength={1} d="M0 10h84M116 10h84" />
    <path pathLength={1} d="M100 3c-4 3-4 11 0 14 4-3 4-11 0-14Z" />
    <circle cx="90" cy="10" r="1.4" fill="currentColor" />
    <circle cx="110" cy="10" r="1.4" fill="currentColor" />
  </svg>
);
