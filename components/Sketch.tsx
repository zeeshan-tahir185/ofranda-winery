import type { ReactNode } from "react";

type Kind = "earth" | "cycles" | "terroir";

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg className="sketch" viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <g filter="url(#pencil)">{children}</g>
    </svg>
  );
}

export function SketchDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="pencil" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
        </filter>
      </defs>
    </svg>
  );
}

const Earth = () => (
  <Frame>
    <g className="sketch__lines">
      <path pathLength={1} d="M24 128c30-4 60 3 84-1s46-2 68 2" />
      <path pathLength={1} d="M40 142c24-3 48 2 70-1s34 0 50 3" />
      <path pathLength={1} d="M62 156c18-2 34 1 50-1s22 0 30 2" />
      <path pathLength={1} d="M100 128c-1-20 1-42 0-64" />
      <path pathLength={1} d="M100 128c-4 14-14 26-28 34M100 128c3 16 12 28 26 36M100 132c0 14-2 28 0 44M88 150c-8 6-16 8-26 8M112 154c8 4 16 6 24 5" />
    </g>
    <g className="sketch__sway">
      <path className="sketch__fill" pathLength={1} d="M100 96c-16 0-30-10-34-28 18-2 32 10 34 28Z" />
      <path className="sketch__fill" pathLength={1} d="M100 80c12 0 26-10 30-26-16-2-29 8-30 26Z" />
      <path pathLength={1} d="M100 96 74 74M100 80l22-20" />
    </g>
  </Frame>
);

const Cycles = () => (
  <Frame>
    <g className="sketch__lines">
      <circle pathLength={1} cx="100" cy="100" r="74" />
      <circle pathLength={1} cx="100" cy="100" r="50" />
      <circle pathLength={1} cx="100" cy="100" r="24" />
      <path pathLength={1} d="M100 82c-8 8-8 28 0 36 12-4 16-28 0-36Z" />
    </g>
    <g className="sketch__orbit">
      <circle className="sketch__dot" cx="100" cy="26" r="6" />
      <circle className="sketch__dot" cx="174" cy="100" r="6" />
      <circle className="sketch__dot" cx="100" cy="174" r="6" />
      <circle className="sketch__dot" cx="26" cy="100" r="6" />
    </g>
    <g className="sketch__orbit sketch__orbit--inner">
      <circle className="sketch__dot sketch__dot--sm" cx="150" cy="100" r="3.5" />
      <circle className="sketch__dot sketch__dot--sm" cx="50" cy="100" r="3.5" />
    </g>
  </Frame>
);

const Terroir = () => (
  <Frame>
    <g className="sketch__sun">
      <circle className="sketch__fill" pathLength={1} cx="138" cy="62" r="16" />
    </g>
    <g className="sketch__lines">
      <path pathLength={1} d="M14 132c26-26 52-34 84-22s58 4 88-16" />
      <path pathLength={1} d="M14 156c30-14 62-18 96-8s52 4 76-6" />
      <path pathLength={1} d="M40 124l4 10M56 117l4 11M72 113l3 12M88 112l3 12M104 114l2 12M120 117l2 12M136 115l2 12M152 110l1 12M168 103l1 12" />
      <path pathLength={1} d="M30 150l3 9M48 145l3 10M66 142l3 10M84 142l2 10M102 144l2 10M120 146l2 10M138 145l1 10M156 141l1 10" />
      <path pathLength={1} d="M58 58c4-3 8-3 11 0 3-3 7-3 10 0M84 46c3-2 6-2 8 0 2-2 5-2 7 0" />
    </g>
  </Frame>
);

export default function Sketch({ kind }: { kind: Kind }) {
  return (
    <span className="sketch-wrap">
      <span className="sketch__wash" />
      {kind === "earth" ? <Earth /> : kind === "cycles" ? <Cycles /> : <Terroir />}
    </span>
  );
}
