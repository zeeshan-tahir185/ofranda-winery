type Props = {
  lines: readonly string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  italicFrom?: number;
};

export default function Title({ lines, as: Tag = "h2", className = "", italicFrom = 1 }: Props) {
  return (
    <Tag className={`title ${className}`} data-reveal>
      {lines.map((line, i) => (
        <span className="title__line" key={i}>
          <span style={{ transitionDelay: `${i * 0.12}s` }}>{i >= italicFrom ? <em>{line}</em> : line}</span>
        </span>
      ))}
    </Tag>
  );
}
