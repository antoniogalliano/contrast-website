"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#d90cb7";
const S = 48.054; // isometric cube face size (matches Figma exactly)

/* ═══════════════════════════════════════════
   CARD 1 — Established Tech Companies
   Isometric cube grid with pink hero cube
═══════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════
   CARD 2 — Startups Building MVPs
   Pixel-perfect from Figma node 1:2623

   Default: 7 dashed #4e4e4e wireframe cubes + 3 gradient accent lines
   Hover:   7 solid #d90cb7 cubes with gradient fills + magenta aura + gather animation
═══════════════════════════════════════════ */

// Exact cube positions from Figma node tree (inset left→dtx, top→dty)
const MVP_CUBES = [
  { dtx: 55.05, dty: 122.97, htx: 41.61, hty: 96.11  }, // center-bottom  (1:2663 / 1:2764)
  { dtx: 55.05, dty:  61.48, htx: 41.61, hty: 48.05  }, // center-middle  (1:2667 / 1:2768)
  { dtx: 55.05, dty:   0,    htx: 41.61, hty:  0      }, // center-top     (1:2671 / 1:2772)
  { dtx:  0,    dty:  37.45, htx:  0,    hty: 24.02   }, // left-top       (1:2675 / 1:2776)
  { dtx:  0,    dty:  98.95, htx:  0,    hty: 72.08   }, // left-bottom    (1:2679 / 1:2780)
  { dtx: 110.1, dty:  37.45, htx: 83.23, hty: 24.02   }, // right-top      (1:2683 / 1:2784)
  { dtx: 110.1, dty:  98.94, htx: 83.23, hty: 72.07   }, // right-bottom   (1:2687 / 1:2788)
];

function IllustrationMVP({ hovered }: { hovered: boolean }) {
  // Stagger: cubes closest to center animate first
  const centerX = 79, centerY = 80;
  const stagger = MVP_CUBES.map(({ dtx, dty }) => {
    const dist = Math.hypot(dtx - centerX, dty - centerY);
    return Math.round((dist / 120) * 80); // 0–80ms stagger
  });

  return (
    <svg
      viewBox="-50 -10 295 260"
      style={{ width: "100%", maxWidth: 210, height: "auto" }}
      fill="none"
      overflow="visible"
    >
      <defs>
        {/* Top face: right→left pink gradient (Figma Gradient A: -89.5°) */}
        <linearGradient id="mvp-top" x1="1" y1="0.5" x2="0" y2="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="1" />
        </linearGradient>
        {/* Side faces: top→bottom pink gradient (Figma Gradient B: 187°) */}
        <linearGradient id="mvp-side" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0.9" />
        </linearGradient>
        {/* Decorative accent lines — pink fading to transparent */}
        <linearGradient id="ln-r" x1="153" y1="38" x2="200" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0.85" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ln-l" x1="10" y1="43" x2="-40" y2="43" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0.85" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ln-b" x1="17" y1="176" x2="17" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0.85" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── Decorative accent lines (Default only, fade out on hover) ──
          Figma: Line276 rotate:-150.46°, Line277 rotate:149.68°, Line278 rotate:28.79° */}
      <motion.g
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {/* Line276 — upper-right, from (173, 48) outward */}
        <line
          x1="153" y1="38" x2="197" y2="15"
          stroke={`url(#ln-r)`} strokeWidth="1.6" strokeLinecap="round"
        />
        {/* Line277 — upper-left, from (10, 43) outward */}
        <line
          x1="10" y1="43" x2="-32" y2="62"
          stroke={`url(#ln-l)`} strokeWidth="1.6" strokeLinecap="round"
        />
        {/* Line278 — lower-left, from (15, 182) outward */}
        <line
          x1="15" y1="182" x2="32" y2="205"
          stroke={`url(#ln-b)`} strokeWidth="1.6" strokeLinecap="round"
        />
      </motion.g>

      {/* ── Magenta aura ellipse (Hover only, under the cube cluster) ──
          Figma node 1:2702: 261×55px at left:84, top:438 (relative to card)
          In SVG coords, this sits just below the bottom cube */}
      <motion.ellipse
        cx={79} cy={218} rx={75} ry={18}
        fill={ACCENT}
        animate={{ opacity: hovered ? 0.55 : 0, scaleX: hovered ? 1 : 0.6 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{ transformOrigin: "79px 218px" }}
      />

      {/* ── 7 isometric cubes ──
          Each cube: 3 rects (top, left, right) with matrix transforms
          Animate from default position → hover position via parent motion.g */}
      {MVP_CUBES.map(({ dtx, dty, htx, hty }, i) => {
        const dx = htx - dtx;
        const dy = hty - dty;
        const ltx = dtx - S * 0.866025;
        const lty = dty + S * 0.5;
        const rty = dty + S;
        const stroke = hovered ? ACCENT : "#4e4e4e";
        const dash = hovered ? undefined : "2 2";
        const fillTransition = "fill-opacity 0.4s ease, stroke 0.4s ease, stroke-dasharray 0.4s ease";

        return (
          <motion.g
            key={i}
            animate={{ x: hovered ? dx : 0, y: hovered ? dy : 0 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: stagger[i] / 1000,
            }}
          >
            {/* Top face */}
            <rect
              width={S} height={S}
              transform={`matrix(0.866025 0.5 -0.866025 0.5 ${dtx} ${dty})`}
              fill="url(#mvp-top)"
              fillOpacity={hovered ? 1 : 0}
              stroke={stroke}
              strokeDasharray={dash}
              style={{ transition: fillTransition }}
            />
            {/* Left face */}
            <rect
              width={S} height={S}
              transform={`matrix(0.866025 0.5 0 1 ${ltx} ${lty})`}
              fill="url(#mvp-side)"
              fillOpacity={hovered ? 0.85 : 0}
              stroke={stroke}
              strokeDasharray={dash}
              style={{ transition: fillTransition }}
            />
            {/* Right face */}
            <rect
              width={S} height={S}
              transform={`matrix(0.866025 -0.5 0 1 ${dtx} ${rty})`}
              fill="url(#mvp-side)"
              fillOpacity={hovered ? 0.7 : 0}
              stroke={stroke}
              strokeDasharray={dash}
              style={{ transition: fillTransition }}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   CARD 3 — Scaling SaaS Companies
   Concentric rounded rects + accent ring + center circle
═══════════════════════════════════════════ */
function IllustrationNested() {
  return (
    <svg viewBox="0 0 331 331" style={{ width: "100%", maxWidth: 280, height: "auto" }} fill="none">
      <rect x="2"  y="2"  width="327" height="327" rx="40" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <rect x="28" y="28" width="275" height="275" rx="30" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <rect x="55" y="55" width="221" height="221" rx="22" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
      <rect x="83" y="83" width="165" height="165" rx="28" stroke={ACCENT} strokeWidth="1.2" fill="none" />
      <rect x="83" y="83" width="165" height="165" rx="28" fill={ACCENT} fillOpacity="0.04" />
      <circle cx="165" cy="165" r="32" stroke={ACCENT} strokeWidth="1.2" fill="none" />
      <circle cx="165" cy="165" r="32" fill={ACCENT} fillOpacity="0.06" />
      <circle cx="165" cy="165" r="5.5" fill={ACCENT} opacity="0.75" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Startup card — dedicated component
   Pixel-perfect to Figma node 1:2623
   Default ↔ Hover smart animation via Framer Motion
═══════════════════════════════════════════ */
function StartupCard({ index }: { index: number }) {
  const [hovered, setHovered] = useState(false);

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
        height: 661,
        background: "#0a0a0a",
        borderRadius: 16,
        overflow: "hidden",
        backdropFilter: "blur(8.5px)",
        WebkitBackdropFilter: "blur(8.5px)",
        flex: "1 1 0",
        minWidth: 0,
        cursor: "default",
      }}
    >
      {/* ── Border: animates #383838 → #d90cb7 ── */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute", inset: 0, borderRadius: 16,
          border: "1px solid #383838", pointerEvents: "none", zIndex: 10,
        }}
      />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute", inset: 0, borderRadius: 16,
          border: `1px solid ${ACCENT}`,
          boxShadow: `0 0 40px rgba(217,12,183,0.12), inset 0 1px 0 rgba(217,12,183,0.18)`,
          pointerEvents: "none", zIndex: 10,
        }}
      />

      {/* ── Header text — absolute, left:28 top:31 width:341 (Figma exact) ── */}
      <div style={{
        position: "absolute", left: 28, top: 31, width: 341, zIndex: 5,
        display: "flex", flexDirection: "column", gap: 4,
      }}>
        <p style={{
          margin: 0, fontSize: 20, fontWeight: 600,
          color: "#e8e8e8", lineHeight: "normal",
          fontFamily: "var(--font-urbanist), sans-serif",
        }}>
          Startups Building MVPs
        </p>
        <p style={{
          margin: 0, fontSize: 14, fontWeight: 400,
          color: "#848484", lineHeight: "normal",
          fontFamily: "var(--font-geist), sans-serif",
        }}>
          Ship fast and ship smart. Those aren&apos;t opposites.
        </p>
      </div>

      {/* ── Globe / hemisphere — large dark radial gradient at the bottom ──
          Figma: 659×514px, Default centered, Hover left:-115px
          We approximate with a radial gradient div */}
      <div style={{
        position: "absolute",
        width: 659, height: 514,
        top: 446,
        left: "calc(50% - 329.5px + 2px)", // centered (both states nearly identical)
        zIndex: 1,
        pointerEvents: "none",
      }}>
        {/* Globe: large dark ellipse, fades up from bottom */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 35%, rgba(20,20,20,0.0) 0%, rgba(10,10,10,0.7) 45%, #0a0a0a 70%)",
          borderRadius: "50%",
        }} />
      </div>

      {/* ── Subtract / bottom glow layer (Hover only, mix-blend-mode: plus-lighter) ── */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          width: 659, height: 260,
          left: -115, top: 446,
          mixBlendMode: "plus-lighter",
          background: "radial-gradient(ellipse at 50% 100%, rgba(217,12,183,0.45) 0%, rgba(140,0,160,0.18) 45%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ── Blur overlay at very bottom (both states, matches Figma blur rect) ── */}
      <div style={{
        position: "absolute",
        width: 532, height: 97,
        left: -75, top: 558,
        background: "#0a0a0a",
        filter: "blur(25px)",
        pointerEvents: "none",
        zIndex: 4,
      }} />

      {/* ── SVG illustration — centered in card ── */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 220,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3,
      }}>
        <IllustrationMVP hovered={hovered} />
      </div>

      {/* ── Plus button (Hover only) — bottom:27 right:27, 40×40px ──
          Figma node 1:2326: rounded-full, border rgba(255,255,255,0.2), "+" icon rotate 45° → "×" */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "absolute", bottom: 27, right: 27, zIndex: 6,
              width: 40, height: 40, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(10,10,10,0.4)",
              backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {/* The Figma icon is a "+" rotated 45° — renders as "×" */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1V13M1 7H13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Cards 1 & 3 — generic AudienceCard
═══════════════════════════════════════════ */
const SIDE_CARDS = [
  {
    title: "Established Tech Companies",
    body: "Your product has proven itself. Now it's time to make it exceptional.",
    type: "cubes" as const,
  },
  {
    title: "Scaling SaaS Companies",
    body: "Growth is the goal. Great UX is how you accelerate it",
    type: "nested" as const,
  },
];

function AudienceCard({ card, index }: { card: typeof SIDE_CARDS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

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

      {/* Text block — 32px top, 28px sides */}
      <div style={{ padding: "32px 28px 0", position: "relative", zIndex: 2 }}>
        <h3 style={{
          fontSize: 20, fontWeight: 600, color: "#e8e8e8",
          margin: "0 0 12px", lineHeight: 1.3,
          fontFamily: "var(--font-urbanist), sans-serif",
        }}>
          {card.title}
        </h3>
        <p style={{
          fontSize: 14, fontWeight: 400, color: "#b0b0b0",
          margin: 0, lineHeight: 1.6,
          fontFamily: "var(--font-geist), sans-serif",
        }}>
          {card.body}
        </p>
      </div>

      {/* Illustration */}
      <div style={{
        flex: 1, display: "flex",
        alignItems: "center", justifyContent: "center",
        padding: "32px 28px 32px",
        position: "relative", zIndex: 2,
      }}>
        {card.type === "cubes"  && <IllustrationCubes hovered={hovered} />}
        {card.type === "nested" && <IllustrationNested />}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Section
═══════════════════════════════════════════ */
export default function WhoWeServe() {
  return (
    <section id="services" style={{ padding: "120px 40px 0", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* Heading — Figma: Urbanist SemiBold 64px, -0.64px letter-spacing, centered */}
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

        {/* 3-card row — gap 24px (Figma exact) */}
        <div className="audience-cards" style={{ display: "flex", gap: 24 }}>
          <AudienceCard card={SIDE_CARDS[0]} index={0} />
          <StartupCard index={1} />
          <AudienceCard card={SIDE_CARDS[1]} index={2} />
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
