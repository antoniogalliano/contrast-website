"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PINK = "#ec4899";

/* ── Isometric cube helper ── */
function IsoCube({
  x,
  y,
  size,
  stroke,
  fill,
  tint = 0,
  strokeWidth = 0.8,
  delay = 0,
  hovered = false,
}: {
  x: number;
  y: number;
  size: number;
  stroke: string;
  fill?: string;
  tint?: number;       // 0–1: pink proximity tint for grid cubes
  strokeWidth?: number;
  delay?: number;
  hovered?: boolean;
}) {
  const s = size;
  const h = s * 0.577;
  const top = `${x},${y - s} ${x + s},${y - s + h} ${x},${y + h * 2 - s} ${x - s},${y - s + h}`;
  const left = `${x - s},${y - s + h} ${x},${y + h * 2 - s} ${x},${y + h} ${x - s},${y}`;
  const right = `${x},${y + h * 2 - s} ${x + s},${y - s + h} ${x + s},${y} ${x},${y + h}`;

  // Stroke: brightens to white or pink-white on hover
  const pinkStroke = `rgba(236,72,153,${0.3 + tint * 0.5})`;
  const whiteStroke = "rgba(255,255,255,0.45)";
  const activeStroke = fill
    ? stroke                           // pink cube: keep its own stroke
    : hovered
      ? tint > 0.4 ? pinkStroke : whiteStroke
      : stroke;

  // Fill: pink tint ripple for grid cubes; use fill prop for the hero cube
  const topFill = fill ?? `rgba(236,72,153,${hovered ? tint * 0.35 : 0})`;
  const leftFill = fill ? `${fill}cc` : `rgba(236,72,153,${hovered ? tint * 0.22 : 0})`;
  const rightFill = fill ? `${fill}99` : `rgba(236,72,153,${hovered ? tint * 0.13 : 0})`;

  const t = `stroke 0.55s ease ${delay}ms, fill 0.55s ease ${delay}ms`;

  return (
    <g>
      <polygon points={top} fill={topFill} stroke={activeStroke} strokeWidth={strokeWidth} style={{ transition: t }} />
      <polygon points={left} fill={leftFill} stroke={activeStroke} strokeWidth={strokeWidth} style={{ transition: t }} />
      <polygon points={right} fill={rightFill} stroke={activeStroke} strokeWidth={strokeWidth} style={{ transition: t }} />
    </g>
  );
}

/* ── Card 1: Established Tech Companies ── */
function IllustrationCubes({ hovered }: { hovered: boolean }) {
  const stroke = "rgba(255,255,255,0.14)";

  // Pink cube position
  const pinkX = 200, pinkY = 100;

  const rawCubes = [
    { x: 160, y: 120 },
    { x: 240, y: 120 },
    { x: 120, y: 160 },
    { x: 200, y: 160 },
    { x: 280, y: 160 },
    { x: 80, y: 200 },
    { x: 160, y: 200 },
    { x: 240, y: 200 },
    { x: 320, y: 200 },
    { x: 120, y: 240 },
    { x: 200, y: 240 },
    { x: 280, y: 240 },
    { x: 160, y: 280 },
    { x: 240, y: 280 },
  ];

  // Compute proximity (1 = closest, 0 = farthest) and derive lift + tint + delay
  const dists = rawCubes.map(c => Math.hypot(c.x - pinkX, c.y - pinkY));
  const maxD = Math.max(...dists);
  const minD = Math.min(...dists);

  const cubes = rawCubes.map((c, i) => {
    const prox = (maxD - dists[i]) / (maxD - minD); // 0–1
    return {
      ...c,
      prox,
      lift: prox * 10,          // up to 10px lift for nearest cubes
      tint: prox,               // full proximity → full pink tint
      delay: Math.round((1 - prox) * 280), // nearest fires first
    };
  });

  return (
    <svg viewBox="0 0 400 350" style={{ width: "100%", height: "auto" }} fill="none">

      {/* ── Large diffuse pink glow (background) ── */}
      <motion.ellipse
        cx={200} cy={130} rx={120} ry={60}
        fill={PINK}
        animate={{ opacity: hovered ? 0.12 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* ── Tight bright glow directly behind pink cube ── */}
      <motion.ellipse
        cx={200} cy={108} rx={54} ry={26}
        fill={PINK}
        animate={{ opacity: hovered ? 0.45 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* ── Grid cubes — per-cube pink fill + float ── */}
      {cubes.map(({ x, y, prox, lift, tint, delay }, i) => (
        <motion.g
          key={i}
          animate={{ y: hovered ? -lift : 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: delay / 1000 }}
        >
          <IsoCube
            x={x} y={y} size={40}
            stroke={stroke}
            tint={tint}
            hovered={hovered}
            delay={delay}
          />
        </motion.g>
      ))}

      {/* ── Pink highlighted cube — float + pulse ── */}
      <motion.g
        animate={{ y: hovered ? -14 : 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <motion.g
          animate={hovered ? { scale: [1, 1.07, 1] } : { scale: 1 }}
          transition={
            hovered
              ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
          style={{ transformOrigin: `${pinkX}px ${pinkY}px` }}
        >
          <IsoCube
            x={pinkX} y={pinkY} size={46}
            stroke={hovered ? PINK : PINK}
            fill={hovered ? `${PINK}65` : `${PINK}28`}
            strokeWidth={hovered ? 1.6 : 1}
          />
        </motion.g>
      </motion.g>
    </svg>
  );
}

/* ── Card 2: Startups Building MVPs (smart-animate from SVG files) ── */
function IllustrationMVP({ hovered }: { hovered: boolean }) {
  const S = 48.0538; // cube size from source SVG files

  // 7 cubes matched between Default state.svg and Hover state.svg
  // Each entry: default top-face (TX, TY) → hover top-face (HTX, HTY)
  // Render order matches original SVG: center-bot first (behind), center-top last (front)
  const cubeData = [
    { dtx: 97.5305, dty: 123.469, htx: 84.0972, hty: 96.6055 }, // center-bot
    { dtx: 97.5305, dty: 61.9844, htx: 84.0972, hty: 48.5508 }, // center-mid
    { dtx: 97.5305, dty: 0.5, htx: 84.0972, hty: 0.5 }, // center-top
    { dtx: 42.4817, dty: 37.9531, htx: 42.4819, hty: 24.5234 }, // left-top
    { dtx: 42.4817, dty: 99.4453, htx: 42.4819, hty: 72.5781 }, // left-bot
    { dtx: 152.579, dty: 37.9531, htx: 125.714, hty: 24.5234 }, // right-top
    { dtx: 152.579, dty: 99.4375, htx: 125.714, hty: 72.5703 }, // right-bot
  ];

  return (
    <svg viewBox="0 0 196 221" style={{ width: "100%", maxWidth: 160, height: "auto" }} fill="none">
      <defs>
        {/* Top face: horizontal gradient — transparent right → pink left */}
        <linearGradient id="mvp-top-g" x1="1" y1="0" x2="0" y2="0" gradientUnits="objectBoundingBox">
          <stop stopColor="#D90CB7" stopOpacity="0" />
          <stop offset="1" stopColor="#D90CB7" />
        </linearGradient>
        {/* Side faces: vertical gradient — transparent top → pink bottom */}
        <linearGradient id="mvp-side-g" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#D90CB7" stopOpacity="0" />
          <stop offset="1" stopColor="#D90CB7" />
        </linearGradient>
        {/* Accent line gradients (exact from Default state.svg) */}
        <linearGradient id="mvp-ln0" x1="154.552" y1="37.518" x2="194.441" y2="60.128" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D90CB7" /><stop offset="1" stopColor="#D90CB7" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mvp-ln1" x1="0.746" y1="61.155" x2="35.52" y2="40.818" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D90CB7" /><stop offset="1" stopColor="#D90CB7" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mvp-ln2" x1="33.246" y1="191.359" x2="7.79" y2="177.368" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D90CB7" /><stop offset="1" stopColor="#D90CB7" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Floor glow — rendered behind cubes, fades in on hover */}
      <motion.ellipse
        cx={90} cy={212} rx={68} ry={13}
        fill="#D90CB7"
        animate={{ opacity: hovered ? 0.55 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Decorative accent lines — fade out when cubes gather */}
      <motion.g
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <line x1="193.8" y1="61.2585" x2="153.911" y2="38.6493" stroke="url(#mvp-ln0)" strokeWidth="1.6" />
        <line x1="36.177" y1="41.941" x2="1.402" y2="62.277" stroke="url(#mvp-ln1)" strokeWidth="1.6" />
        <line x1="8.416" y1="176.229" x2="33.872" y2="190.22" stroke="url(#mvp-ln2)" strokeWidth="1.6" />
      </motion.g>

      {/* 7 cubes: translate from default → hover positions on hover */}
      {cubeData.map(({ dtx, dty, htx, hty }, i) => {
        const dx = htx - dtx;
        const dy = hty - dty;
        const ltx = dtx - S * 0.866025; // left face TX
        const lty = dty + S * 0.5;       // left face TY
        const rty = dty + S;              // right face TY
        const stroke = hovered ? "#D90CB7" : "#4E4E4E";
        const dash = hovered ? undefined : "2 2";
        const t = "stroke 0.45s ease, fill-opacity 0.45s ease";

        return (
          <motion.g
            key={i}
            animate={{ x: hovered ? dx : 0, y: hovered ? dy : 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top face */}
            <rect
              width={S} height={S}
              transform={`matrix(0.866025 0.5 -0.866025 0.5 ${dtx} ${dty})`}
              fill="url(#mvp-top-g)" fillOpacity={hovered ? 1 : 0}
              stroke={stroke} strokeDasharray={dash}
              style={{ transition: t }}
            />
            {/* Left face */}
            <rect
              width={S} height={S}
              transform={`matrix(0.866025 0.5 0 1 ${ltx} ${lty})`}
              fill="url(#mvp-side-g)" fillOpacity={hovered ? 1 : 0}
              stroke={stroke} strokeDasharray={dash}
              style={{ transition: t }}
            />
            {/* Right face */}
            <rect
              width={S} height={S}
              transform={`matrix(0.866025 -0.5 0 1 ${dtx} ${rty})`}
              fill="url(#mvp-side-g)" fillOpacity={hovered ? 1 : 0}
              stroke={stroke} strokeDasharray={dash}
              style={{ transition: t }}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ── Card 3: Scaling SaaS Companies ── */
function IllustrationNested() {
  const stroke = "rgba(255,255,255,0.12)";
  return (
    <svg viewBox="0 0 300 220" style={{ width: "100%", height: "auto" }} fill="none">
      <rect x="30" y="20" width="240" height="180" rx="8" stroke={stroke} strokeWidth="0.8" />
      <rect x="55" y="40" width="190" height="150" rx="6" stroke={stroke} strokeWidth="0.8" />
      <rect x="80" y="60" width="140" height="120" rx="5" stroke={stroke} strokeWidth="0.8" />
      <rect x="105" y="80" width="90" height="90" rx="4" stroke={stroke} strokeWidth="0.8" />
      <rect x="125" y="100" width="50" height="50" rx="3" stroke={stroke} strokeWidth="0.8" />
    </svg>
  );
}

/* ── Card 4: Empowering AI-Driven Teams ── */
function IllustrationNetwork() {
  const stroke = "rgba(255,255,255,0.15)";
  const cx = 150, cy = 110, pts = 6, outerR = 80, innerR = 40;

  const outerPts = Array.from({ length: pts }, (_, i) => {
    const a = (i / pts) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(a) * outerR, y: cy + Math.sin(a) * outerR };
  });
  const innerPts = Array.from({ length: pts }, (_, i) => {
    const a = ((i + 0.5) / pts) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(a) * innerR, y: cy + Math.sin(a) * innerR };
  });

  return (
    <svg viewBox="0 0 300 220" style={{ width: "100%", height: "auto" }} fill="none">
      {outerPts.map((p, i) => {
        const next = outerPts[(i + 1) % pts];
        return <line key={`o-${i}`} x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke={stroke} strokeWidth="0.8" strokeDasharray="4 4" />;
      })}
      {innerPts.map((p, i) => (
        <line key={`ic-${i}`} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={stroke} strokeWidth="0.8" />
      ))}
      {outerPts.map((p, i) => (
        <line key={`x-${i}`} x1={p.x} y1={p.y} x2={innerPts[i].x} y2={innerPts[i].y} stroke={stroke} strokeWidth="0.6" />
      ))}
      <polygon points={`${outerPts[0].x},${outerPts[0].y} ${outerPts[2].x},${outerPts[2].y} ${outerPts[4].x},${outerPts[4].y}`} fill={`${PINK}15`} stroke={PINK} strokeWidth="1" />
      <polygon points={`${outerPts[1].x},${outerPts[1].y} ${outerPts[3].x},${outerPts[3].y} ${outerPts[5].x},${outerPts[5].y}`} fill={`${PINK}10`} stroke={PINK} strokeWidth="0.8" />
      {outerPts.map((p, i) => (
        <circle key={`n-${i}`} cx={p.x} cy={p.y} r="3" fill={i % 2 === 0 ? PINK : "rgba(255,255,255,0.3)"} />
      ))}
      <circle cx={cx} cy={cy} r="4" fill={PINK} />
    </svg>
  );
}

/* ── Illustration dispatcher ── */
function CardIllustration({ type, hovered }: { type: "cubes" | "startup" | "nested" | "network"; hovered: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {type === "cubes" && <IllustrationCubes hovered={hovered} />}
      {type === "startup" && <IllustrationMVP hovered={hovered} />}
      {type === "nested" && <IllustrationNested />}
      {type === "network" && <IllustrationNetwork />}
    </div>
  );
}

/* ── Card data ── */
const cards = [
  { title: "Established Tech Companies", subtitle: "Need to modernize UX without breaking their product", illustrationType: "cubes" as const, gridArea: "1 / 1 / 3 / 2" },
  { title: "Startups Building MVPs", subtitle: "Need validation & rapid go-to-market", illustrationType: "startup" as const, gridArea: "1 / 2 / 3 / 3" },
  { title: "Scaling SaaS Companies", subtitle: "Need UX optimization to scale growth", illustrationType: "nested" as const, gridArea: "1 / 3 / 2 / 4" },
  { title: "Empowering AI-Driven Teams", subtitle: "Need creative and technical AI support to grow", illustrationType: "network" as const, gridArea: "2 / 3 / 3 / 4" },
];

/* ── Individual card ── */
function WhoWeServeCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const isCubes = card.illustrationType === "cubes";
  const isStartup = card.illustrationType === "startup";
  const isPink = isCubes || isStartup;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridArea: card.gridArea,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: isPink && hovered
          ? "rgba(236,72,153,0.06)"
          : hovered
            ? "rgba(255,255,255,0.055)"
            : "rgba(255,255,255,0.03)",
        border: `1px solid ${isPink && hovered ? "rgba(236,72,153,0.35)" : hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 16,
        overflow: "hidden",
        minHeight: 0,
        transition: "background 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease",
        boxShadow: isPink && hovered
          ? "0 0 48px rgba(236,72,153,0.12), inset 0 1px 0 rgba(236,72,153,0.2)"
          : "none",
        cursor: "default",
      }}
    >
      {/* Pink radial gradient wash — cubes & startup cards */}
      {isPink && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isCubes
              ? "radial-gradient(ellipse at 50% -5%, rgba(236,72,153,0.22) 0%, rgba(236,72,153,0.06) 45%, transparent 70%)"
              : "radial-gradient(ellipse at 50% 110%, rgba(236,72,153,0.28) 0%, rgba(170,0,180,0.10) 40%, transparent 68%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      {/* Startup: floor reflection glow that radiates up from the bottom on hover */}
      {isStartup && (
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.55 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "55%",
            background: "radial-gradient(ellipse at 50% 100%, rgba(217,12,183,0.6) 0%, rgba(180,0,200,0.22) 38%, transparent 72%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      {/* Startup: dark dome/planet at bottom */}
      {isStartup && (
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "32%",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 2,
        }}>
          <div style={{
            position: "absolute",
            left: "-20%",
            width: "140%",
            bottom: 0,
            height: "250%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at 50% 15%, rgba(65,65,65,0.18) 0%, rgba(30,30,30,0.4) 15%, rgba(10,10,10,0.85) 35%, #000 55%)",
            boxShadow: hovered
              ? "0 -8px 40px rgba(217,12,183,0.15)"
              : "none",
            transition: "box-shadow 0.5s ease",
          }} />
          {/* Thin edge highlight on dome arc */}
          <div style={{
            position: "absolute",
            left: "-20%",
            width: "140%",
            bottom: 0,
            height: "250%",
            borderRadius: "50%",
            border: `1px solid ${hovered ? "rgba(217,12,183,0.2)" : "rgba(255,255,255,0.04)"}`,
            transition: "border-color 0.5s ease",
            pointerEvents: "none",
          }} />
          {/* Pink glow on dome surface — hover only */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              left: "5%",
              right: "5%",
              top: 0,
              height: "70%",
              background: "radial-gradient(ellipse at 50% 0%, rgba(217,12,183,0.4) 0%, rgba(180,0,200,0.12) 40%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </div>
      )}

      {/* Text */}
      <div style={{ padding: "32px 32px 0", position: "relative", zIndex: 1 }}>
        <h3 style={{ fontSize: 22, fontWeight: 600, color: "#ffffff", lineHeight: 1.3, margin: 0 }}>
          {card.title}
        </h3>
        <p style={{ fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, marginTop: 8 }}>
          {card.subtitle}
        </p>
      </div>

      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: "easeOut" }}
        style={{ flex: 1, display: "flex", alignItems: isStartup ? "flex-end" : "center", justifyContent: "center", padding: isStartup ? "24px 24px 48px" : "24px 24px 0", minHeight: 0, position: "relative", zIndex: 3 }}
      >
        <CardIllustration type={card.illustrationType} hovered={hovered} />
      </motion.div>

      {/* Startup: + expand button (hover) */}
      {isStartup && (
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            bottom: 24,
            right: 24,
            zIndex: 5,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.3)",
            cursor: "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V12M2 7H12" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      )}

      {/* Bottom vignette (non-startup cards — startup uses dome) */}
      {!isStartup && (
        <div style={{ position: "absolute", bottom: -40, left: "50%", transform: "translateX(-50%)", width: "150%", height: 260, borderRadius: "50%", background: "radial-gradient(ellipse at center, transparent 60%, rgba(112,112,112,0.15) 100%)", pointerEvents: "none" }} />
      )}
    </motion.div>
  );
}

/* ── Main Section ── */
export default function WhoWeServe() {
  return (
    <section style={{ padding: "100px 24px", background: "#000000" }}>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          maxWidth: 1280,
          margin: "0 auto 64px",
          fontSize: "clamp(32px, 4vw, 52px)",
          fontWeight: 600,
          color: "#ffffff",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          textAlign: "center" as const,
        }}
      >
        Is ContrastUX for you?
      </motion.h2>

      <div
        className="who-we-serve-grid"
        style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 16 }}
      >
        {cards.map((card, i) => (
          <WhoWeServeCard key={card.title} card={card} index={i} />
        ))}
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .who-we-serve-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .who-we-serve-grid > div {
            grid-area: auto !important;
            min-height: 400px !important;
          }
        }
      `}</style>
    </section>
  );
}
