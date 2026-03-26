/**
 * Logotype — CONTRAST. wordmark (Figma 1:3296)
 * 9 vector paths: C O N T R A S T + magenta dot
 * Original bounding box: 685 × 73.385px
 */

const VECTORS: { src: string; inset: string }[] = [
  { src: "/logo/letter-c.svg",  inset: "0% 89.91% 0% 0%" },
  { src: "/logo/letter-o.svg",  inset: "0% 76.43% 0% 12.12%" },
  { src: "/logo/letter-n.svg",  inset: "1.93% 63.63% 1.92% 26.57%" },
  { src: "/logo/letter-t2.svg", inset: "1.93% 51.85% 1.92% 38.92%" },
  { src: "/logo/letter-r.svg",  inset: "1.93% 39.8% 1.92% 50.71%" },
  { src: "/logo/letter-a.svg",  inset: "1.93% 26.19% 1.92% 61.84%" },
  { src: "/logo/letter-s2.svg", inset: "0% 15.71% 0% 75.39%" },
  { src: "/logo/letter-t.svg",  inset: "1.93% 4.78% 1.92% 86%" },
  { src: "/logo/dot.svg",       inset: "68.41% 0% 0.68% 96.64%" },
];

type LogotypeProps = {
  width?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function Logotype({ width = 685, className, style }: LogotypeProps) {
  const height = (width / 685) * 73.385;

  return (
    <div
      aria-label="CONTRAST."
      className={className}
      style={{ position: "relative", width, height, flexShrink: 0, ...style }}
    >
      {VECTORS.map(({ src, inset }, i) => (
        <div key={i} style={{ position: "absolute", inset }}>
          <img src={src} alt="" aria-hidden="true" style={{ display: "block", width: "100%", height: "100%" }} />
        </div>
      ))}
    </div>
  );
}
