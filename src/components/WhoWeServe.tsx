"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#d90cb7";

/* ─────────────────────────────────────────────
   CARD 1 — Isometric cube grid
   Pink highlighted hero cube + surrounding dim cubes
───────────────────────────────────────────── */
function IsoCube({
  x, y, size, stroke, fill, tint = 0, strokeWidth = 0.8, delay = 0, hovered = false,
}: {
  x: number; y: number; size: number; stroke: string; fill?: string;
  tint?: number; strokeWidth?: number; delay?: number; hovered?: boolean;
}) {
  const s = size;
  const h = s * 0.577;
  const top   = `${x},${y - s} ${x + s},${y - s + h} ${x},${y + h * 2 - s} ${x - s},${y - s + h}`;
  const left  = `${x - s},${y - s + h} ${x},${y + h * 2 - s} ${x},${y + h} ${x - s},${y}`;
  const right = `${x},${y + h * 2 - s} ${x + s},${y - s + h} ${x + s},${y} ${x},${y + h}`;
  const pinkStroke = `rgba(217,12,183,${0.3 + tint * 0.5})`;
  const whiteStroke = "rgba(255,255,255,0.45)";
  const activeStroke = fill ? stroke : hovered ? (tint > 0.4 ? pinkStroke : whiteStroke) : stroke;
  const topFill   = fill ?? `rgba(217,12,183,${hovered ? tint * 0.35 : 0})`;
  const leftFill  = fill ? `${fill}cc` : `rgba(217,12,183,${hovered ? tint * 0.22 : 0})`;
  const rightFill = fill ? `${fill}99` : `rgba(217,12,183,${hovered ? tint * 0.13 : 0})`;
  const t = `stroke 0.55s ease ${delay}ms, fill 0.55s ease ${delay}ms`;
  return (
    <g>
      <polygon points={top}   fill={topFill}   stroke={activeStroke} strokeWidth={strokeWidth} style={{ transition: t }} />
      <polygon points={left}  fill={leftFill}  stroke={activeStroke} strokeWidth={strokeWidth} style={{ transition: t }} />
      <polygon points={right} fill={rightFill} stroke={activeStroke} strokeWidth={strokeWidth} style={{ transition: t }} />
    </g>
  );
}

function IllustrationCubes({ hovered }: { hovered: boolean }) {
  const stroke = "rgba(78,78,78,0.8)";
  const pinkX = 200, pinkY = 100;
  const rawCubes = [
    { x: 160, y: 120 }, { x: 240, y: 120 },
    { x: 120, y: 160 }, { x: 200, y: 160 }, { x: 280, y: 160 },
    { x: 80,  y: 200 }, { x: 160, y: 200 }, { x: 240, y: 200 }, { x: 320, y: 200 },
    { x: 120, y: 240 }, { x: 200, y: 240 }, { x: 280, y: 240 },
    { x: 160, y: 280 }, { x: 240, y: 280 },
  ];
  const dists = rawCubes.map(c => Math.hypot(c.x - pinkX, c.y - pinkY));
  const maxD = Math.max(...dists), minD = Math.min(...dists);
  const cubes = rawCubes.map((c, i) => {
    const prox = (maxD - dists[i]) / (maxD - minD);
    return { ...c, prox, lift: prox * 10, tint: prox, delay: Math.round((1 - prox) * 280) };
  });
  return (
    <svg viewBox="0 0 400 340" style={{ width: "100%", height: "auto" }} fill="none">
      <motion.ellipse cx={200} cy={130} rx={120} ry={60} fill={ACCENT}
        animate={{ opacity: hovered ? 0.12 : 0 }} transition={{ duration: 0.5 }} />
      <motion.ellipse cx={200} cy={108} rx={54} ry={26} fill={ACCENT}
        animate={{ opacity: hovered ? 0.45 : 0 }} transition={{ duration: 0.4 }} />
      {cubes.map(({ x, y, lift, tint, delay }, i) => (
        <motion.g key={i} animate={{ y: hovered ? -lift : 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: delay / 1000 }}>
          <IsoCube x={x} y={y} size={40} stroke={stroke} tint={tint} hovered={hovered} delay={delay} />
        </motion.g>
      ))}
      <motion.g animate={{ y: hovered ? -14 : 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
        <motion.g
          animate={hovered ? { scale: [1, 1.07, 1] } : { scale: 1 }}
          transition={hovered ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
          style={{ transformOrigin: `${pinkX}px ${pinkY}px` }}>
          <IsoCube x={pinkX} y={pinkY} size={46} stroke={ACCENT}
            fill={hovered ? `${ACCENT}65` : `${ACCENT}28`}
            strokeWidth={hovered ? 1.6 : 1} />
        </motion.g>
      </motion.g>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   CARD 2 — Dashed wireframe cubes
───────────────────────────────────────────── */
function IllustrationMVP({ hovered }: { hovered: boolean }) {
  const S = 48.0538;
  const cubeData = [
    { dtx: 97.5305, dty: 123.469, htx: 84.0972, hty: 96.6055 },
    { dtx: 97.5305, dty: 61.9844, htx: 84.0972, hty: 48.5508 },
    { dtx: 97.5305, dty: 0.5,     htx: 84.0972, hty: 0.5      },
    { dtx: 42.4817, dty: 37.9531, htx: 42.4819, hty: 24.5234  },
    { dtx: 42.4817, dty: 99.4453, htx: 42.4819, hty: 72.5781  },
    { dtx: 152.579, dty: 37.9531, htx: 125.714, hty: 24.5234  },
    { dtx: 152.579, dty: 99.4375, htx: 125.714, hty: 72.5703  },
  ];
  return (
    <svg viewBox="0 0 196 221" style={{ width: "100%", maxWidth: 170, height: "auto" }} fill="none">
      <defs>
        <linearGradient id="mvp-top-g2" x1="1" y1="0" x2="0" y2="0" gradientUnits="objectBoundingBox">
          <stop stopColor={ACCENT} stopOpacity="0" /><stop offset="1" stopColor={ACCENT} />
        </linearGradient>
        <linearGradient id="mvp-side-g2" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor={ACCENT} stopOpacity="0" /><stop offset="1" stopColor={ACCENT} />
        </linearGradient>
        <linearGradient id="mvp-ln0b" x1="154.552" y1="37.518" x2="194.441" y2="60.128" gradientUnits="userSpaceOnUse">
          <stop stopColor={ACCENT} /><stop offset="1" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mvp-ln1b" x1="0.746" y1="61.155" x2="35.52" y2="40.818" gradientUnits="userSpaceOnUse">
          <stop stopColor={ACCENT} /><stop offset="1" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mvp-ln2b" x1="33.246" y1="191.359" x2="7.79" y2="177.368" gradientUnits="userSpaceOnUse">
          <stop stopColor={ACCENT} /><stop offset="1" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.ellipse cx={90} cy={212} rx={68} ry={13} fill={ACCENT}
        animate={{ opacity: hovered ? 0.55 : 0 }} transition={{ duration: 0.5 }} />
      <motion.g animate={{ opacity: hovered ? 0 : 1 }} transition={{ duration: 0.3 }}>
        <line x1="193.8"  y1="61.2585" x2="153.911" y2="38.6493" stroke="url(#mvp-ln0b)" strokeWidth="1.6" />
        <line x1="36.177" y1="41.941"  x2="1.402"   y2="62.277"  stroke="url(#mvp-ln1b)" strokeWidth="1.6" />
        <line x1="8.416"  y1="176.229" x2="33.872"  y2="190.22"  stroke="url(#mvp-ln2b)" strokeWidth="1.6" />
      </motion.g>
      {cubeData.map(({ dtx, dty, htx, hty }, i) => {
        const dx = htx - dtx, dy = hty - dty;
        const ltx = dtx - S * 0.866025, lty = dty + S * 0.5, rty = dty + S;
        const stroke = hovered ? ACCENT : "#4e4e4e";
        const dash = hovered ? undefined : "2 2";
        const t = "stroke 0.45s ease, fill-opacity 0.45s ease";
        return (
          <motion.g key={i} animate={{ x: hovered ? dx : 0, y: hovered ? dy : 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            <rect width={S} height={S} transform={`matrix(0.866025 0.5 -0.866025 0.5 ${dtx} ${dty})`}
              fill="url(#mvp-top-g2)" fillOpacity={hovered ? 1 : 0} stroke={stroke} strokeDasharray={dash} style={{ transition: t }} />
            <rect width={S} height={S} transform={`matrix(0.866025 0.5 0 1 ${ltx} ${lty})`}
              fill="url(#mvp-side-g2)" fillOpacity={hovered ? 1 : 0} stroke={stroke} strokeDasharray={dash} style={{ transition: t }} />
            <rect width={S} height={S} transform={`matrix(0.866025 -0.5 0 1 ${dtx} ${rty})`}
              fill="url(#mvp-side-g2)" fillOpacity={hovered ? 1 : 0} stroke={stroke} strokeDasharray={dash} style={{ transition: t }} />
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   CARD 3 — Concentric rounded rects + accent ring + center circle
   Matches Figma node 1:1077 exactly
───────────────────────────────────────────── */
function IllustrationNested() {
  return (
    <svg viewBox="0 0 331 331" style={{ width: "100%", maxWidth: 280, height: "auto" }} fill="none">
      {/* Outer dim frames */}
      <rect x="2"   y="2"   width="327" height="327" rx="40" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <rect x="28"  y="28"  width="275" height="275" rx="30" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="55"  y="55"  width="221" height="221" rx="22" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
      {/* Accent inner frame — #d90cb7 */}
      <rect x="83"  y="83"  width="165" height="165" rx="28" stroke={ACCENT} strokeWidth="1.2" fill="none" />
      {/* Soft glow inside accent frame */}
      <rect x="83"  y="83"  width="165" height="165" rx="28" fill={ACCENT} fillOpacity="0.04" />
      {/* Center circle — accent */}
      <circle cx="165" cy="165" r="32" stroke={ACCENT} strokeWidth="1.2" fill="none" />
      <circle cx="165" cy="165" r="32" fill={ACCENT} fillOpacity="0.06" />
      {/* Center dot */}
      <circle cx="165" cy="165" r="5.5" fill={ACCENT} opacity="0.75" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Card data — Figma exact copy
───────────────────────────────────────────── */
const cards = [
  {
    title: "Established Tech Companies",
    body: "Your product has proven itself. Now it's time to make it exceptional.",
    type: "cubes" as const,
  },
  {
    title: "Startups Building MVPs",
    body: "Ship fast and ship smart. Those aren't opposites.",
    type: "mvp" as const,
  },
  {
    title: "Scaling SaaS Companies",
    body: "Growth is the goal. Great UX is how you accelerate it",
    type: "nested" as const,
  },
];

/* ─────────────────────────────────────────────
   Single card — exact Figma specs:
   437–438px × 661px, pad 28px h / 32px top, gap 42px flex
───────────────────────────────────────────── */
function AudienceCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const isStartup = card.type === "mvp";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: 661,
        background: "#0a0a0a",
        border: `1px solid ${hovered ? "rgba(217,12,183,0.35)" : "#383838"}`,
        borderRadius: 16,
        overflow: "hidden",
        backdropFilter: "blur(8.5px)",
        WebkitBackdropFilter: "blur(8.5px)",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        boxShadow: hovered
          ? "0 0 48px rgba(217,12,183,0.1), inset 0 1px 0 rgba(217,12,183,0.15)"
          : "none",
        cursor: "default",
        flex: "1 1 0",
        minWidth: 0,
      }}
    >
      {/* Pink hover wash */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% -10%, rgba(217,12,183,0.14) 0%, rgba(217,12,183,0.04) 50%, transparent 72%)",
        opacity: hovered ? 1 : 0, transition: "opacity 0.45s ease",
      }} />

      {/* Text block — padding: 32px top, 28px sides */}
      <div style={{ padding: "32px 28px 0", position: "relative", zIndex: 2 }}>
        <h3 style={{
          fontSize: 20,
          fontWeight: 600,
          color: "#e8e8e8",
          margin: "0 0 12px",
          lineHeight: 1.3,
          fontFamily: "var(--font-urbanist), sans-serif",
        }}>
          {card.title}
        </h3>
        <p style={{
          fontSize: 14,
          fontWeight: 400,
          color: "#b0b0b0",
          margin: 0,
          lineHeight: 1.6,
          fontFamily: "var(--font-geist), sans-serif",
        }}>
          {card.body}
        </p>
      </div>

      {/* Illustration */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: isStartup ? "flex-end" : "center",
        justifyContent: "center",
        padding: isStartup ? "32px 28px 52px" : "32px 28px 32px",
        position: "relative",
        zIndex: 2,
      }}>
        {card.type === "cubes"  && <IllustrationCubes hovered={hovered} />}
        {card.type === "mvp"    && <IllustrationMVP   hovered={hovered} />}
        {card.type === "nested" && <IllustrationNested />}
      </div>

      {/* Startup: dome + glow */}
      {isStartup && (
        <>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.55 }}
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "55%",
              background: "radial-gradient(ellipse at 50% 100%, rgba(217,12,183,0.55) 0%, rgba(180,0,200,0.2) 38%, transparent 72%)",
              pointerEvents: "none", zIndex: 1,
            }}
          />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
            overflow: "hidden", pointerEvents: "none", zIndex: 3,
          }}>
            <div style={{
              position: "absolute", left: "-20%", width: "140%", bottom: 0, height: "250%",
              borderRadius: "50%",
              background: "radial-gradient(ellipse at 50% 15%, rgba(65,65,65,0.15) 0%, rgba(30,30,30,0.38) 15%, rgba(10,10,10,0.88) 35%, #0a0a0a 55%)",
              boxShadow: hovered ? "0 -8px 40px rgba(217,12,183,0.14)" : "none",
              transition: "box-shadow 0.5s ease",
            }} />
            <div style={{
              position: "absolute", left: "-20%", width: "140%", bottom: 0, height: "250%",
              borderRadius: "50%",
              border: `1px solid ${hovered ? "rgba(217,12,183,0.2)" : "rgba(255,255,255,0.04)"}`,
              transition: "border-color 0.5s ease", pointerEvents: "none",
            }} />
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Section export
───────────────────────────────────────────── */
export default function WhoWeServe() {
  return (
    <section id="services" style={{ padding: "120px 40px 0", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* Heading — Figma: 64px, SemiBold, -0.64px, centered */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            fontSize: "clamp(36px, 4.5vw, 64px)",
            fontWeight: 600,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "-0.64px",
            lineHeight: "normal",
            margin: "0 0 64px",
            fontFamily: "var(--font-urbanist), sans-serif",
            fontFeatureSettings: "'sinf' 1, 'numr' 1, 'dnom' 1",
          }}
        >
          Built for Teams Ready to Grow
        </motion.h2>

        {/* 3-card row — Figma gap: ~24px */}
        <div className="audience-cards" style={{ display: "flex", gap: 24 }}>
          {cards.map((card, i) => (
            <AudienceCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .audience-cards {
            flex-direction: column !important;
          }
          .audience-cards > div {
            height: auto !important;
            min-height: 480px !important;
          }
        }
      `}</style>
    </section>
  );
}
