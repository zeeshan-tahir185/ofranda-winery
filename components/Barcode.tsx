const L = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
const G = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];
const R = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];
const PARITY = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];

const encode = (code: string) => {
  const d = code.split("").map(Number);
  const parity = PARITY[d[0]];
  const left = d.slice(1, 7).map((n, i) => (parity[i] === "L" ? L[n] : G[n])).join("");
  const right = d.slice(7).map((n) => R[n]).join("");
  return `101${left}01010${right}101`;
};

const isGuard = (i: number) => i < 3 || (i >= 45 && i < 50) || i >= 92;

export default function Barcode({ code, label, className = "" }: { code: string; label: string; className?: string }) {
  const digits = code.replace(/\D/g, "");
  if (digits.length !== 13) return null;
  const bits = encode(digits);
  const x0 = 11;
  const bars: { x: number; w: number; guard: boolean }[] = [];
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] !== "1") continue;
    const last = bars[bars.length - 1];
    if (last && last.x + last.w === x0 + i && last.guard === isGuard(i)) last.w += 1;
    else bars.push({ x: x0 + i, w: 1, guard: isGuard(i) });
  }
  return (
    <svg className={className} viewBox="0 0 115 76" role="img" aria-label={`${label} ${digits}`}>
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y={0} width={b.w} height={b.guard ? 66 : 60} fill="currentColor" />
      ))}
      <g fontFamily="Arial, Helvetica, sans-serif" fontSize="9.5" fill="currentColor" textAnchor="middle">
        <text x={5} y={73}>
          {digits[0]}
        </text>
        <text x={x0 + 24} y={73} letterSpacing="1.6">
          {digits.slice(1, 7)}
        </text>
        <text x={x0 + 70} y={73} letterSpacing="1.6">
          {digits.slice(7)}
        </text>
        <text x={x0 + 99} y={73}>
          &gt;
        </text>
      </g>
    </svg>
  );
}
