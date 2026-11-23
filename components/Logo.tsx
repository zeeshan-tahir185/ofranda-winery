import { logoPath, logoViewBox, rosePath, roseViewBox } from "@/lib/logo";

export function Logo({ className = "", title = "Crama Ofranda" }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox={logoViewBox} role="img" aria-label={title}>
      <path fill="currentColor" fillRule="evenodd" d={logoPath} />
    </svg>
  );
}

export function Rose({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox={roseViewBox} aria-hidden="true">
      <path fill="currentColor" fillRule="evenodd" d={rosePath} />
    </svg>
  );
}

export function EcocertMark({ className = "" }: { className?: string }) {
  return <img src="/media/logos/ecocert.svg" alt="ECOCERT" width={1728} height={1206} className={className} />;
}

export function EuLeaf({ className = "", code }: { className?: string; code?: string }) {
  return (
    <span className={`eu-leaf ${className}`}>
      <img src="/media/logos/eu-organic.svg" alt="EU organic" width={1920} height={1288} />
      {code && <span className="eu-leaf__code">{code}</span>}
    </span>
  );
}

export function BiodyvinMark({ className = "" }: { className?: string }) {
  return <img src="/media/logos/biodyvin.svg" alt="BIODYVIN" width={1401} height={1449} className={className} />;
}
