"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#d90cb7";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ═══════════════════════════════════════════
   CARD 1 — Established Tech Companies
   Isometric cube with tower-grow hover
═══════════════════════════════════════════ */
function IllustrationCubes({ hovered }: { hovered: boolean }) {
  const S  = 56.965;
  const Sw = S * 0.866025; // 49.333
  const GRAY = "#4e4e4e";
  const px = 148, py = 0;
  const TALL = 320;

  // 6 gray wireframe cubes — matching Figma node 3:2089 exactly
  // columns: left = px-2Sw, center = px, right = px+2Sw
  // rows:    top = py+S,   mid = py+2S, mid2 = py+3S, low = py+4S
  const GRAY_CUBES = [
    { x: px - 2*Sw, y: py + S,     op: 1.0 },  // cube04 — left top
    { x: px,        y: py + 2*S,   op: 0.9 },  // cube06 — center
    { x: px + 2*Sw, y: py + S,     op: 1.0 },  // cube02 — right top
    { x: px - 2*Sw, y: py + 3*S,   op: 0.65 }, // cube03 — left bottom
    { x: px,        y: py + 4*S,   op: 0.55 }, // cube05 — center low
    { x: px + 2*Sw, y: py + 3*S,   op: 0.65 }, // cube01 — right bottom
  ];

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 296, margin: "0 auto" }}>
      <svg viewBox="-5 -5 310 380" style={{ width: "100%", height: "auto" }} fill="none" overflow="visible">
        <defs>
          <linearGradient id="c1-top" x1="1" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="c1-left" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="c1-right" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* 6 gray wireframe cubes — fade out on hover */}
        {GRAY_CUBES.map(({ x, y, op }, i) => (
          <motion.g
            key={i}
            animate={{ opacity: hovered ? 0 : op }}
            transition={{ duration: 0.35 }}
          >
            <rect width={S} height={S} transform={`matrix(0.866025 0.5 -0.866025 0.5 ${x} ${y})`}           fill="none" stroke={GRAY} strokeWidth={0.8} />
            <rect width={S} height={S} transform={`matrix(0.866025 0.5 0 1 ${x - Sw} ${y + S * 0.5})`}      fill="none" stroke={GRAY} strokeWidth={0.8} />
            <rect width={S} height={S} transform={`matrix(0.866025 -0.5 0 1 ${x} ${y + S})`}                fill="none" stroke={GRAY} strokeWidth={0.8} />
          </motion.g>
        ))}

        {/* Pink main cube */}
        <rect
          width={S} height={S}
          transform={`matrix(0.866025 0.5 -0.866025 0.5 ${px} ${py})`}
          fill="url(#c1-top)" stroke={ACCENT} strokeWidth={0.8}
        />
        <motion.rect
          width={S}
          initial={{ height: S }}
          animate={{ height: hovered ? TALL : S }}
          transform={`matrix(0.866025 0.5 0 1 ${px - Sw} ${py + S * 0.5})`}
          fill="url(#c1-left)" stroke={ACCENT} strokeWidth={0.8}
          transition={{ duration: 0.55, ease: EASE }}
        />
        <motion.rect
          width={S}
          initial={{ height: S }}
          animate={{ height: hovered ? TALL - 6 : S }}
          transform={`matrix(0.866025 -0.5 0 1 ${px} ${py + S})`}
          fill="url(#c1-right)" stroke={ACCENT} strokeWidth={0.8}
          transition={{ duration: 0.55, ease: EASE }}
        />
      </svg>

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: "-20%",
        width: "140%", height: "calc(35% + 60px)",
        background: "linear-gradient(to top, #0a0a0a 40%, transparent)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════
   CARD 3 — Scaling SaaS Companies
═══════════════════════════════════════════ */
function IllustrationNested({ hovered }: { hovered: boolean }) {
  const RECTS = [
    { d: { x: 124.92, y:  97.88, w:  88.891, h:  88.891 }, h: { x: 111.75, y:  93.5, w: 115, h:  96 }, rx: 16.5, dOp: 0.9, hOp: 0.8 },
    { d: { x: 103.83, y:  76.79, w: 129.75,  h: 129.75  }, h: { x:  84.5,  y:  71.5, w: 168, h: 140 }, rx: 12.5, dOp: 0.8, hOp: 0.7 },
    { d: { x:  83.84, y:  56.80, w: 170.609, h: 170.609 }, h: { x:  57.5,  y:  49.5, w: 222, h: 184 }, rx:  6.5, dOp: 0.6, hOp: 0.5 },
    { d: { x:  59.40, y:  32.37, w: 219.641, h: 219.641 }, h: { x:  26.5,  y:  23.5, w: 285, h: 237 }, rx:  5.5, dOp: 0.4, hOp: 0.3 },
    { d: { x:  39.42, y:  11.27, w: 260.5,   h: 260.5   }, h: { x:   0.5,  y:   0.5, w: 338, h: 281 }, rx:    0, dOp: 0.2, hOp: 0.1 },
  ];

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const dur = 0.5;

  return (
    <svg viewBox="0 0 339 282" style={{ width: "100%", maxWidth: 360, height: "auto" }} fill="none">
      {RECTS.map((s, i) => (
        <motion.rect
          key={i}
          rx={s.rx}
          initial={{
            x:       hovered ? s.h.x : s.d.x,
            y:       hovered ? s.h.y : s.d.y,
            width:   hovered ? s.h.w : s.d.w,
            height:  hovered ? s.h.h : s.d.h,
            opacity: hovered ? s.hOp : s.dOp,
            stroke:  hovered ? "#d90cb7" : "#4e4e4e",
          }}
          animate={{
            x:       hovered ? s.h.x : s.d.x,
            y:       hovered ? s.h.y : s.d.y,
            width:   hovered ? s.h.w : s.d.w,
            height:  hovered ? s.h.h : s.d.h,
            opacity: hovered ? s.hOp : s.dOp,
            stroke:  hovered ? "#d90cb7" : "#4e4e4e",
          }}
          transition={{ duration: dur, ease }}
          fill="none"
          strokeWidth={0.8}
        />
      ))}
      <motion.circle
        cx="169.279" cy="142.24"
        initial={{
          r:      hovered ? 21.5291 : 19.9297,
          stroke: hovered ? "#d90cb7" : "#4e4e4e",
          fill:   hovered ? "#0a0a0a" : "none",
        }}
        animate={{
          r:      hovered ? 21.5291 : 19.9297,
          stroke: hovered ? "#d90cb7" : "#4e4e4e",
          fill:   hovered ? "#0a0a0a" : "none",
        }}
        strokeWidth={0.8}
        transition={{ duration: dur, ease }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   CARD 2 — Startups Building MVPs
═══════════════════════════════════════════ */
function IllustrationGrid({ hovered }: { hovered: boolean }) {
  const S  = 48.054;
  const Sw = S * 0.866025;

  const CUBES = [
    { x: 97.5312, y: 123.469, hx: 84.0977, hy:  96.6055 },
    { x: 97.5312, y:  61.984, hx: 84.0977, hy:  48.5508 },
    { x: 97.5312, y:   0.5,   hx: 84.0977, hy:   0.5    },
    { x: 42.4824, y:  37.953, hx: 42.4824, hy:  24.5234 },
    { x: 42.4824, y:  99.445, hx: 42.4824, hy:  72.5781 },
    { x: 152.58,  y:  37.953, hx: 125.715, hy:  24.5234 },
    { x: 152.58,  y:  99.438, hx: 125.715, hy:  72.5703 },
  ];

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const fillT = "fill-opacity 0.4s ease, stroke 0.4s ease, stroke-dasharray 0.4s ease";
  const CC = 13.432;

  const stagger = CUBES.map(({ x, y, hx, hy }) => {
    const dist = Math.hypot((hx + CC) - x, (hy + CC) - y);
    return Math.round((dist / 40) * 30);
  });

  return (
    <svg viewBox="0 0 196 221" style={{ width: "100%", maxWidth: 230, height: "auto" }} fill="none" overflow="visible">
      <defs>
        <linearGradient id="gt-top" x1="1" y1="0.5" x2="0" y2="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#d90cb7" stopOpacity="0" />
          <stop offset="100%" stopColor="#d90cb7" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="gt-side" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#d90cb7" stopOpacity="0" />
          <stop offset="100%" stopColor="#d90cb7" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="gt-ln-r" x1="154.552" y1="37.518" x2="194.442" y2="60.128" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d90cb7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#d90cb7" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gt-ln-l" x1="0.747" y1="61.155" x2="35.521" y2="40.818" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d90cb7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#d90cb7" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gt-ln-b" x1="33.247" y1="191.359" x2="7.790" y2="177.368" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d90cb7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#d90cb7" stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.g animate={{ opacity: hovered ? 0 : 1 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
        <line x1="193.801" y1="61.259" x2="153.911" y2="38.649" stroke="url(#gt-ln-r)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="36.177"  y1="41.941" x2="1.403"   y2="62.277" stroke="url(#gt-ln-l)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="8.417"   y1="176.229" x2="33.873"  y2="190.22" stroke="url(#gt-ln-b)" strokeWidth="1.6" strokeLinecap="round" />
      </motion.g>

      {CUBES.map(({ x, y, hx, hy }, i) => (
        <motion.g
          key={i}
          animate={{ x: hovered ? (hx - x) + CC : 0, y: hovered ? (hy - y) + CC : 0 }}
          transition={{ duration: 0.55, ease, delay: stagger[i] / 1000 }}
        >
          <rect width={S} height={S} transform={`matrix(0.866025 0.5 -0.866025 0.5 ${x} ${y})`}
            fill="url(#gt-top)" fillOpacity={hovered ? 1 : 0}
            stroke={hovered ? "#d90cb7" : "#4e4e4e"} strokeDasharray={hovered ? undefined : "2 2"}
            style={{ transition: fillT }} />
          <rect width={S} height={S} transform={`matrix(0.866025 0.5 0 1 ${x - Sw} ${y + S * 0.5})`}
            fill="url(#gt-side)" fillOpacity={hovered ? 1 : 0}
            stroke={hovered ? "#d90cb7" : "#4e4e4e"} strokeDasharray={hovered ? undefined : "2 2"}
            style={{ transition: fillT }} />
          <rect width={S} height={S} transform={`matrix(0.866025 -0.5 0 1 ${x} ${y + S})`}
            fill="url(#gt-side)" fillOpacity={hovered ? 1 : 0}
            stroke={hovered ? "#d90cb7" : "#4e4e4e"} strokeDasharray={hovered ? undefined : "2 2"}
            style={{ transition: fillT }} />
        </motion.g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Data
═══════════════════════════════════════════ */
const SIDE_CARDS = [
  {
    title: "Established Tech Companies",
    body: "Your product has proven itself. Now it's time to make it exceptional.",
    type: "cubes" as const,
  },
  {
    title: "Startups Building MVPs",
    body: "Ship fast and ship smart. Those aren't opposites.",
    type: "grid" as const,
  },
  {
    title: "Scaling SaaS Companies",
    body: "Growth is the goal. Great UX is how you accelerate it",
    type: "nested" as const,
  },
];

const TAB_CONTENT = [
  {
    title: "Trusted by the world's most innovative companies.",
    body: "Your product has proven itself in the market — now it's time to make it exceptional. We work with established tech teams to refine UX, optimise conversion funnels, and build design systems that scale alongside your organisation.\n\nWe bring the strategic design thinking your product needs to stay ahead, without disrupting the momentum you've already built.",
  },
  {
    title: "Ship fast and ship smart. Build something users love from day one.",
    body: "Speed matters at the MVP stage, but so does building the right thing. We help startups define their core UX, validate with real users quickly, and ship a product that's both functional and beautiful from the very first release.\n\nOur lean design process means you move quickly without cutting corners on the things that matter most to early adopters.",
  },
  {
    title: "Scale your SaaS with design that drives growth.",
    body: "At the scaling stage, UX becomes your competitive moat. We help SaaS companies improve onboarding, reduce churn, and increase feature adoption through intentional, data-informed design decisions.\n\nEvery design choice we make is tied to your key metrics — activation, retention, and expansion revenue.",
  },
];

/* ═══════════════════════════════════════════
   Expanded panel (Figma node 1-3321)
═══════════════════════════════════════════ */
function ExpandedPanel({
  activeTab,
  setActiveTab,
  onClose,
}: {
  activeTab: number;
  setActiveTab: (i: number) => void;
  onClose: () => void;
}) {
  const content = TAB_CONTENT[activeTab];

  return (
    <motion.div
      key="expanded"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: EASE }}
      style={{
        position: "relative",
        border: "1px solid #383838",
        borderRadius: 16,
        background: "#0a0a0a",
        overflow: "hidden",
        minHeight: 636,
        display: "flex",
      }}
    >
      {/* ── Top row: tabs + close button ── */}
      <div style={{
        position: "absolute",
        top: 31, left: 31, right: 31,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        zIndex: 10,
      }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {SIDE_CARDS.map((card, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: i === activeTab
                  ? "1px solid #d90cb7"
                  : "1px solid rgba(255,255,255,0.1)",
                background: i === activeTab
                  ? "rgba(217,12,183,0.08)"
                  : "rgba(255,255,255,0.03)",
                color: i === activeTab ? "#e8e8e8" : "#888888",
                fontSize: 13,
                fontWeight: i === activeTab ? 500 : 400,
                fontFamily: "var(--font-urbanist), sans-serif",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              {card.title}
            </button>
          ))}
        </div>

        {/* Close (×) button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            width: 40, height: 40, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(10,10,10,0.4)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* ── Left: illustration (~428px) ── */}
      <div style={{
        width: 428,
        flexShrink: 0,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* Pink glow ellipse */}
        <div style={{
          position: "absolute",
          width: 480, height: 480,
          left: "50%", top: "50%",
          transform: "translate(-50%, -30%)",
          borderRadius: "50%",
          background: "rgba(217,12,183,0.38)",
          filter: "blur(110px)",
          pointerEvents: "none",
        }} />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.82 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{
              position: "relative", zIndex: 3,
              width: activeTab === 0 ? "86%" : "72%",
              display: "flex",
              justifyContent: "center",
              transformOrigin: "center center",
            }}
          >
            {activeTab === 0 && <IllustrationCubes hovered={true} />}
            {activeTab === 1 && <IllustrationGrid  hovered={true} />}
            {activeTab === 2 && <IllustrationNested hovered={true} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Right: tab content ── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 96,
        paddingBottom: 60,
        paddingLeft: 64,
        paddingRight: 60,
        maxWidth: 542,
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <h3 style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#e8e8e8",
              fontFamily: "var(--font-urbanist), sans-serif",
              margin: "0 0 20px",
              lineHeight: 1.25,
              letterSpacing: "-0.32px",
            }}>
              {content.title}
            </h3>
            <p style={{
              fontSize: 16,
              color: "#b2b2b2",
              fontFamily: "var(--font-geist), sans-serif",
              lineHeight: 1.65,
              margin: 0,
              whiteSpace: "pre-line",
            }}>
              {content.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   AudienceCard — collapsed state
═══════════════════════════════════════════ */
function AudienceCard({
  card,
  index,
  onExpand,
}: {
  card: typeof SIDE_CARDS[0];
  index: number;
  onExpand: () => void;
}) {
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
        border: `1px solid ${hovered ? "#d90cb7" : "#383838"}`,
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
      {/* Blur bg */}
      <div style={{
        position: "absolute",
        width: "120%", height: 357,
        left: "-10%", top: 488,
        background: "#0A0A0A",
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 3,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
      }} />

      {/* Pink glow ellipse */}
      <div style={{
        position: "absolute",
        width: 508, height: 518,
        left: -39, top: 529,
        borderRadius: "50%",
        background: "rgba(217, 12, 183, 0.56)",
        filter: "blur(119px)",
        pointerEvents: "none",
        zIndex: 4,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.5s ease",
      }} />

      {/* Text block */}
      <div style={{ padding: "32px 28px 0", position: "relative", zIndex: 2 }}>
        <h3 style={{
          fontSize: 20, fontWeight: 600, color: "#e8e8e8",
          margin: "0 0 4px", lineHeight: 1.3,
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
        {card.type === "grid"   && <IllustrationGrid  hovered={hovered} />}
        {card.type === "nested" && <IllustrationNested hovered={hovered} />}
      </div>

      {/* Plus button — appears on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onExpand}
            aria-label={`Expand ${card.title}`}
            style={{
              position: "absolute", bottom: 27, right: 27, zIndex: 6,
              width: 40, height: 40, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(10,10,10,0.4)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1V13M1 7H13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Section
═══════════════════════════════════════════ */
export default function WhoWeServe() {
  const [expandedTab, setExpandedTab] = useState<number | null>(null);

  return (
    <section id="services" style={{ padding: "120px 40px 40px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* Heading */}
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

        {/* Cards / Expanded panel */}
        <AnimatePresence mode="wait">
          {expandedTab === null ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="audience-cards"
              style={{ display: "flex", gap: 24 }}
            >
              {SIDE_CARDS.map((card, i) => (
                <AudienceCard
                  key={card.type}
                  card={card}
                  index={i}
                  onExpand={() => setExpandedTab(i)}
                />
              ))}
            </motion.div>
          ) : (
            <ExpandedPanel
              activeTab={expandedTab}
              setActiveTab={setExpandedTab}
              onClose={() => setExpandedTab(null)}
            />
          )}
        </AnimatePresence>
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
        button {
          outline: none;
          appearance: none;
          -webkit-appearance: none;
        }
      `}</style>
    </section>
  );
}
