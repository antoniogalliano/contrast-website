"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

type TeamMember = { src: string; name: string; role: string };

const TEAM_ROW_1: TeamMember[] = [
  { src: "/team/sagi-shrieber.png",        name: "Sagi Shrieber",        role: "Product Designer" },
  { src: "/team/tom-harnoy.png",           name: "Tom Harnoy",           role: "Product Designer" },
  { src: "/team/hila-yitzhak.png",         name: "Hila Yitzhak",         role: "Product Designer" },
  { src: "/team/omri-schul.png",           name: "Omri Schul",           role: "Product Designer" },
  { src: "/team/oran-ziv.png",             name: "Oran Ziv",             role: "Product Designer" },
  { src: "/team/yonatan-tize.png",         name: "Yonatan Tize",         role: "Product Designer" },
  { src: "/team/sarit.png",                name: "Sarit",                role: "Product Designer" },
  { src: "/team/ibrahim.png",              name: "Ibrahim",              role: "Product Designer" },
  { src: "/team/varant.png",               name: "Varant",               role: "Product Designer" },
  { src: "/team/nik.png",                  name: "Nik",                  role: "Product Designer" },
  { src: "/team/aleksandar.png",           name: "Aleksandar",           role: "Product Designer" },
  { src: "/team/ana-baloban.png",          name: "Ana Baloban",          role: "Product Designer" },
];

const TEAM_ROW_2: TeamMember[] = [
  { src: "/team/anton-holii.png",          name: "Anton Holii",          role: "Product Designer" },
  { src: "/team/beka-k.png",               name: "Beka K",               role: "Product Designer" },
  { src: "/team/den-klenkov.png",          name: "Den Klenkov",          role: "Product Designer" },
  { src: "/team/giorgi-labadze.png",       name: "Giorgi Labadze",       role: "Product Designer" },
  { src: "/team/ivan-k.png",               name: "Ivan K",               role: "Product Designer" },
  { src: "/team/keso-tchumburidze.png",    name: "Keso Tchumburidze",    role: "Product Designer" },
  { src: "/team/monika-adeishvilli.png",   name: "Monika Adeishvilli",   role: "Product Designer" },
  { src: "/team/natali-klimiashvilli.png", name: "Natali Klimiashvilli", role: "Product Designer" },
  { src: "/team/nena-mercep.png",          name: "Nena Mercep",          role: "Product Designer" },
  { src: "/team/veronika-rovniahina.png",  name: "Veronika Rovniahina",  role: "Product Designer" },
  { src: "/team/alona-g.png",              name: "Alona G.",             role: "Product Designer" },
];

// ─── Photo card ───────────────────────────────────────────────────────────────

function PhotoCard({ src, name, role, height }: TeamMember & { height: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        flexShrink: 0,
        width: Math.round(height * 0.72),
        height,
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid #1e1e1e",
        transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        cursor: "default",
      }}
    >
      <img
        src={src}
        alt={name}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "top center", display: "block",
          filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
          transition: "filter 0.4s ease",
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(10,10,10,0.88) 0%, transparent 55%)",
        display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "14px 16px",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", fontFamily: "var(--font-urbanist), sans-serif", letterSpacing: "0.1px", lineHeight: 1.3 }}>
          {name}
        </span>
        <span style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-urbanist), sans-serif", letterSpacing: "0.3px", marginTop: 2 }}>
          {role}
        </span>
      </div>
    </div>
  );
}

// ─── Marquee row ──────────────────────────────────────────────────────────────

function MarqueeRow({ photos, direction, height, duration }: {
  photos: TeamMember[];
  direction: "left" | "right";
  height: number;
  duration: number;
}) {
  const [paused, setPaused] = useState(false);
  const doubled = [...photos, ...photos];
  const animName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div
      style={{ overflow: "hidden", width: "100%", paddingTop: 16, marginTop: -16 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{
        display: "flex",
        gap: 10,
        width: "max-content",
        animation: `${animName} ${duration}s linear infinite`,
        animationPlayState: paused ? "paused" : "running",
      }}>
        {doubled.map((p, i) => (
          <PhotoCard key={i} src={p.src} name={p.name} role={p.role} height={height} />
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function TeamMarqueeSection() {
  return (
    <>
      <section style={{ padding: "120px 0 100px", background: "#0a0a0a" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ maxWidth: 1360, margin: "0 auto", padding: "0 40px", marginBottom: 56 }}
        >
          <span style={{
            display: "block",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.84px",
            textTransform: "uppercase",
            color: "#888888",
            fontFamily: "var(--font-urbanist), sans-serif",
            marginBottom: 16,
          }}>
            Our Team
          </span>
          <h2 style={{
            margin: 0,
            fontSize: "clamp(32px, 4.5vw, 64px)",
            fontWeight: 600,
            fontFamily: "var(--font-urbanist), sans-serif",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
          }}>
            <span style={{ color: "#888888" }}>People who make </span>
            <span style={{ color: "#ffffff" }}>great work happen.</span>
          </h2>
        </motion.div>

        {/* Marquee rows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ position: "relative" }}
        >
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 160, background: "linear-gradient(to right, #0a0a0a 20%, transparent)", zIndex: 10, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 160, background: "linear-gradient(to left, #0a0a0a 20%, transparent)", zIndex: 10, pointerEvents: "none" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <MarqueeRow photos={TEAM_ROW_1} direction="left"  height={300} duration={55} />
            <MarqueeRow photos={TEAM_ROW_2} direction="right" height={260} duration={45} />
          </div>
        </motion.div>
      </section>

      <style jsx global>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee-left"], [style*="marquee-right"] {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
