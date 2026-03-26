"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#d90cb7";
const S = 48.054; // isometric cube face size used in MVP illustration

function IllustrationCubes({ hovered }: { hovered: boolean }) {
  const S  = 56.965;
  const Sw = S * 0.866025;
  const GRAY = "#4e4e4e";
  const px = 148, py = 0;
  const TALL = 320; // tower height on hover

  const pngTop = `${(57 + 5) / 360 * 100}%`;
  const pngW   = `${98.667 / 310 * 100}%`;
  const png04L = `${(0   + 5) / 310 * 100}%`;
  const png02L = `${(198 + 5) / 310 * 100}%`;

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 296, margin: "0 auto" }}>
      <svg viewBox="-5 -5 310 360" style={{ width: "100%", height: "auto" }} fill="none" overflow="visible">
        <defs>
          {/* Top face — Figma: transparent→~44% at max visible point */}
          <linearGradient id="c1-top" x1="1" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.4" />
          </linearGradient>
          {/* Left face — Figma: transparent→~22% at max visible point */}
          <linearGradient id="c1-left" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.22" />
          </linearGradient>
          {/* Right face — Figma: transparent→~45% at max visible point */}
          <linearGradient id="c1-right" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Gray wireframes — fade out on hover */}
        <motion.g animate={{ opacity: hovered ? 0 : 1 }} transition={{ duration: 0.35 }}>
          {[
            { x: 148, y: 114 },
            { x: 49,  y: 171 },
            { x: 247, y: 171 },
            { x: 148, y: 228 },
          ].map(({ x, y }) => (
            <g key={`${x}-${y}`}>
              <rect width={S} height={S} transform={`matrix(0.866025 0.5 -0.866025 0.5 ${x} ${y})`} fill="none" stroke={GRAY} strokeWidth={0.8} />
              <rect width={S} height={S} transform={`matrix(0.866025 0.5 0 1 ${x - Sw} ${y + S * 0.5})`} fill="none" stroke={GRAY} strokeWidth={0.8} />
              <rect width={S} height={S} transform={`matrix(0.866025 -0.5 0 1 ${x} ${y + S})`} fill="none" stroke={GRAY} strokeWidth={0.8} />
            </g>
          ))}
        </motion.g>

        {/* Pink main cube — top face stays fixed */}
        <rect
          width={S} height={S}
          transform={`matrix(0.866025 0.5 -0.866025 0.5 ${px} ${py})`}
          fill="url(#c1-top)" stroke={ACCENT} strokeWidth={0.8}
        />
        {/* Left face — stretches tall on hover */}
        <motion.rect
          width={S}
          initial={{ height: S }}
          animate={{ height: hovered ? TALL : S }}
          transform={`matrix(0.866025 0.5 0 1 ${px - Sw} ${py + S * 0.5})`}
          fill="url(#c1-left)" stroke={ACCENT} strokeWidth={0.8}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Right face — stretches tall on hover */}
        <motion.rect
          width={S}
          initial={{ height: S }}
          animate={{ height: hovered ? TALL - 6 : S }}
          transform={`matrix(0.866025 -0.5 0 1 ${px} ${py + S})`}
          fill="url(#c1-right)" stroke={ACCENT} strokeWidth={0.8}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      {/* PNG cubes — fade out on hover */}
      <motion.img
        src="/cube04.png" alt=""
        initial={{ opacity: 1 }}
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ position: "absolute", left: png04L, top: pngTop, width: pngW, height: "auto" }}
      />
      <motion.img
        src="/cube02.png" alt=""
        initial={{ opacity: 1 }}
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ position: "absolute", left: png02L, top: pngTop, width: pngW, height: "auto" }}
      />

      {/* Bottom blur — always visible: hides cube bases in default, softens tower base in hover */}
      <div style={{
        position: "absolute", bottom: 0, left: "-20%",
        width: "140%", height: "30%",
        background: "#0a0a0a",
        filter: "blur(30px)",
        pointerEvents: "none",
      }} />
    </div>
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
  { dtx: 55.05, dty: 122.97, htx: 55.05, hty: 96.11  }, // center-bottom  (1:2663 / 1:2764)
  { dtx: 55.05, dty:  61.48, htx: 55.05, hty: 48.05  }, // center-middle  (1:2667 / 1:2768)
  { dtx: 55.05, dty:   0,    htx: 55.05, hty:  0      }, // center-top     (1:2671 / 1:2772)
  { dtx:  0,    dty:  37.45, htx: 13.44, hty: 24.02   }, // left-top       (1:2675 / 1:2776)
  { dtx:  0,    dty:  98.95, htx: 13.44, hty: 72.08   }, // left-bottom    (1:2679 / 1:2780)
  { dtx: 110.1, dty:  37.45, htx: 96.66, hty: 24.02   }, // right-top      (1:2683 / 1:2784)
  { dtx: 110.1, dty:  98.94, htx: 96.66, hty: 72.07   }, // right-bottom   (1:2687 / 1:2788)
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
      viewBox="-92 -10 295 260"
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
        {/* Decorative accent lines — attached to cube-edge vertices */}
        <linearGradient id="ln-r" x1="151.72" y1="61.48" x2="200" y2="61.48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0.85" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ln-l" x1="-41.62" y1="61.48" x2="-85" y2="61.48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0.85" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ln-b" x1="55.05" y1="219.08" x2="55.05" y2="245" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0.85" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── Decorative accent lines (Default only) — SVG lines using existing gradient defs ── */}
      <motion.g
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <line x1="151.72" y1="61.48" x2="200"   y2="61.48" stroke="url(#ln-r)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="-41.62" y1="61.48" x2="-85"   y2="61.48" stroke="url(#ln-l)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="55.05"  y1="219.08" x2="55.05" y2="245"  stroke="url(#ln-b)" strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>

      {/* ── Magenta aura ellipse (Hover only, under the cube cluster) ── */}
      <motion.ellipse
        cx={55.05} cy={218} rx={75} ry={18}
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
   Uses Figma asset (Group2147224057 PNG illustration)
═══════════════════════════════════════════ */
function IllustrationNested() {
  return (
    <img
      src="/saas-illustration.png"
      alt=""
      style={{ width: "100%", maxWidth: 331, height: "auto" }}
    />
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
        height: 636,
        background: "#0a0a0a",
        border: `1px solid ${hovered ? ACCENT : "#383838"}`,
        borderRadius: 16,
        overflow: "hidden",
        backdropFilter: "blur(8.5px)",
        WebkitBackdropFilter: "blur(8.5px)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
        boxShadow: hovered
          ? `0 0 40px rgba(217,12,183,0.12), inset 0 1px 0 rgba(217,12,183,0.18)`
          : "none",
        flex: "1 1 0",
        minWidth: 0,
        cursor: "default",
      }}
    >
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
          color: "#b0b0b0", lineHeight: "normal",
          fontFamily: "var(--font-geist), sans-serif",
        }}>
          Ship fast and ship smart. Those aren&apos;t opposites.
        </p>
      </div>

      {/* ── Globe / hemisphere — PNG asset from Figma (ellipse-glow), shifts left on hover ── */}
      <div style={{
        position: "absolute",
        width: 659, height: 514,
        top: 446,
        left: hovered ? -115 : "calc(50% - 329.5px + 2px)",
        transition: "left 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        zIndex: 1,
        pointerEvents: "none",
      }}>
        <img src="/ellipse-glow.png" alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      </div>

      {/* ── Blur effects wrapper — clip-path forces paint containment so filter:blur can't escape card boundary ── */}
      <div style={{
        position: "absolute", inset: 0,
        clipPath: "inset(0 round 15px)",
        pointerEvents: "none", zIndex: 4,
      }}>
        {/* Blur bg — dark overlay softens bottom on hover */}
        <div style={{
          position: "absolute",
          width: "120%", height: 357,
          left: "-10%", top: 488,
          background: "#0A0A0A",
          filter: "blur(60px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }} />
        {/* Ellipse 21975 — blurred pink glow strip under cubes (Figma: 261×55px at 84,438) */}
        <div style={{
          position: "absolute",
          width: 261, height: 55,
          left: 84, top: 438,
          borderRadius: "50%",
          background: "rgba(217, 12, 183, 0.56)",
          filter: "blur(48px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }} />
      </div>

      {/* ── Bottom fade — covers globe PNG bright arc before card clip boundary ── */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0, height: 220,
        background: "linear-gradient(to bottom, transparent, #0a0a0a 70%)",
        pointerEvents: "none",
        zIndex: 9,
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
      {/* Blur bg — dark #0A0A0A blurred div, softens tower base (Figma z-index 3) */}
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

      {/* Ellipse 21975 — blurred pink circle from Figma hover (508×518px, blur 119px) */}
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

      {/* Text block — 32px top, 28px sides */}
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
        {card.type === "nested" && <IllustrationNested />}
      </div>

      {/* Plus button — appears on hover, matches Card 2 */}
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
   Section
═══════════════════════════════════════════ */
export default function WhoWeServe() {
  return (
    <section id="services" style={{ padding: "120px 40px 40px", background: "#0a0a0a" }}>
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
