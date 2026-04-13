"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, useInView, type MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ACCENT = "#d90cb7";

type Project = {
  client: string;
  title: string;
  tags: string[];
  image: string;
  href: string;
};

const projects: Project[] = [
  {
    client: "DAZN",
    title: "Premium Sports Platform Redesign",
    tags: ["Web Design & Development", "App Design", "TV App", "Brand Design"],
    image: "/work/dazn.png",
    href: "/work/dazn",
  },
  {
    client: "Down",
    title: "Dating App — 0→1 Product Design",
    tags: ["Web Design & Development", "App Design"],
    image: "/work/down.png",
    href: "/work/down",
  },
  {
    client: "Cymbio",
    title: "B2B Sales Dashboard",
    tags: ["Web Design & Development"],
    image: "/work/cymbio.png",
    href: "/work/cymbio",
  },
  {
    client: "Designrr",
    title: "Engagement & Retention Overhaul",
    tags: ["Web Design & Development"],
    image: "/work/designrr.png",
    href: "/work/designrr",
  },
  {
    client: "JUSTT",
    title: "Chargeback Management SaaS",
    tags: ["Web Design & Development"],
    image: "/work/justt.png",
    href: "/work/justt",
  },
];

// Per-letter animation via imperative DOM updates — bypasses Framer Motion v12 WAAPI path.
function TitleChar({
  char, sp, rA, rB, xA, xB,
}: {
  char: string;
  sp: MotionValue<number>;
  rA: number; rB: number;
  xA: number; xB: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useMotionValueEvent(sp, "change", (latest) => {
    const el = ref.current;
    if (!el) return;
    const rP = rB > rA ? Math.max(0, Math.min(1, (latest - rA) / (rB - rA))) : latest >= rA ? 1 : 0;
    const xP = xB > xA ? Math.max(0, Math.min(1, (latest - xA) / (xB - xA))) : latest >= xA ? 1 : 0;
    const opacity = rP * (1 - xP);
    const y = (1 - rP) * 44 - xP * 32;
    const blur = (1 - rP) * 40 + xP * 40;
    el.style.opacity = String(opacity);
    el.style.transform = `translateY(${y}px)`;
    el.style.filter = blur > 0.5 ? `blur(${blur}px)` : "none";
  });

  return (
    <span
      ref={ref}
      style={{ display: "inline-block", opacity: 0, transform: "translateY(44px)", filter: "blur(40px)", willChange: "transform, opacity, filter" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  );
}

// Each panel is absolutely positioned inside one shared sticky container.
// sp = global scroll progress [0,1] over the full scroll container.
// lsp = local progress [0,1] remapped to this panel's window.
// panelOpacity crossfades panels: imperative DOM updates bypass WAAPI entirely.
function PanelLayer({
  project, num, index, total, sp,
}: {
  project: Project;
  num: string;
  index: number;
  total: number;
  sp: MotionValue<number>;
}) {
  const [hovered, setHovered] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isLast = index === total - 1;

  const panelStart = index / total;
  const panelEnd   = (index + 1) / total;

  // Local [0,1] for this panel — clamped, so no extrapolation leaks
  const lsp = useTransform(sp, [panelStart, panelEnd], [0, 1]);

  // Crossfade opacity — computed imperatively to avoid WAAPI mount errors.
  const XFADE = 0.04;
  useMotionValueEvent(sp, "change", (latest) => {
    const el = wrapperRef.current;
    if (!el) return;
    let o: number;
    if (index === 0) {
      // First panel: always opaque until its end crossfade
      const out = (latest - (panelEnd - XFADE)) / (2 * XFADE);
      o = 1 - Math.max(0, Math.min(1, out));
    } else if (isLast) {
      // Last panel: crossfade in, stay opaque forever after
      const inn = (latest - (panelStart - XFADE)) / (2 * XFADE);
      o = Math.max(0, Math.min(1, inn));
    } else {
      const inn = (latest - (panelStart - XFADE)) / (2 * XFADE);
      const out = (latest - (panelEnd   - XFADE)) / (2 * XFADE);
      o = Math.max(0, Math.min(1, inn)) * (1 - Math.max(0, Math.min(1, out)));
    }
    el.style.opacity = String(o);
  });

  // Parallax — driven by local progress
  const imageY = useTransform(lsp, [0, 1], ["-10%", "10%"]);

  // Title starts at the very bottom of the viewport and travels to near-top
  const titleContainerY = useTransform(lsp, [0, 1], ["92vh", "8vh"]);

  // Per-letter reveal starts at 5% into the panel's scroll window.
  // Exit fires late so letters fade out just before reaching the header bar.
  const REVEAL_START   = 0.05;
  const REVEAL_STAGGER = 0.012;
  const REVEAL_DUR     = 0.10;
  const EXIT_START     = 0.82;
  const EXIT_STAGGER   = 0.008;
  const EXIT_DUR       = 0.07;
  const chars = project.client.split("");

  // Bottom elements appear only after the title has traveled above them (~30% in).
  // lsp 0.30 = title has cleared the bottom description/button zone.
  const BOTTOM_IN     = 0.30;
  const BOTTOM_IN_END = 0.44;
  const BOTTOM_OUT    = 0.78;
  const BOTTOM_OUT_END = 0.90;
  const bottomY       = useTransform(lsp, [0, BOTTOM_IN, BOTTOM_IN_END, BOTTOM_OUT, BOTTOM_OUT_END, 1], ["1.4rem", "1.4rem", "0rem", "0rem", "-1.4rem", "-1.4rem"]);
  const bottomOpacity = useTransform(lsp, [0, BOTTOM_IN, BOTTOM_IN_END, BOTTOM_OUT, BOTTOM_OUT_END, 1], [0, 0, 1, 1, 0, 0]);
  const descY         = bottomY;
  const descOpacity   = bottomOpacity;
  const numOpacity    = useTransform(lsp, [0, 0.04, 0.16, 0.80, 0.92, 1], [0, 0, 1, 1, 0, 0]);

  return (
    <div ref={wrapperRef} style={{ position: "absolute", inset: 0, opacity: index === 0 ? 1 : 0 }}>
      <a
        href={project.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: "block", position: "absolute", inset: 0, overflow: "hidden", cursor: "pointer", textDecoration: "none" }}
      >
        {/* Parallax image */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <motion.div
            style={{ y: imageY, position: "absolute", inset: "-15% 0", willChange: "transform" }}
          >
            <img
              src={project.image}
              alt={project.client}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", display: "block" }}
            />
          </motion.div>
        </div>

        {/* Gradient overlays — bottom fade + full edge vignette to mask image borders */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(10,10,10,0.18) 0%, rgba(10,10,10,0.22) 35%, rgba(10,10,10,0.88) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right, rgba(10,10,10,0.6) 0%, transparent 18%, transparent 82%, rgba(10,10,10,0.6) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, transparent 14%)" }} />

        {/* Number — top left */}
        <motion.div style={{
          position: "absolute", top: 44, left: 56, zIndex: 5,
          fontFamily: "var(--font-urbanist), sans-serif",
          fontSize: 13, fontWeight: 500, letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.38)",
          opacity: numOpacity,
        }}>
          {num} /
        </motion.div>

        {/* Title — travels bottom to top */}
        <motion.div style={{ position: "absolute", top: 0, left: 56, right: 56, y: titleContainerY, zIndex: 5 }}>
          <h3 style={{
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: "clamp(56px, 10vw, 140px)",
            fontWeight: 600, color: "#ffffff",
            lineHeight: 1.0, letterSpacing: "-0.03em", margin: 0,
          }}>
            {chars.map((char, i) => (
              <TitleChar
                key={i} char={char} sp={lsp}
                rA={REVEAL_START + i * REVEAL_STAGGER}
                rB={REVEAL_START + i * REVEAL_STAGGER + REVEAL_DUR}
                xA={EXIT_START + i * EXIT_STAGGER}
                xB={EXIT_START + i * EXIT_STAGGER + EXIT_DUR}
              />
            ))}
          </h3>
        </motion.div>

        {/* Bottom row */}
        <div
          className="work-panel-bottom"
          style={{ position: "absolute", bottom: 52, left: 56, right: 56, zIndex: 5, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32 }}
        >
          <div>
            <div style={{ overflow: "hidden", marginBottom: 18 }}>
              <motion.p style={{
                fontFamily: "var(--font-urbanist), sans-serif",
                fontSize: 17, fontWeight: 400, color: "rgba(255,255,255,0.72)",
                margin: 0, y: descY, opacity: descOpacity,
              }}>
                {project.title}
              </motion.p>
            </div>
            <motion.div style={{ marginTop: 18, y: bottomY, opacity: bottomOpacity }}>
              <button
                type="button"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "9px 20px", borderRadius: 9999,
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: 13, fontWeight: 600, letterSpacing: "0.04em",
                  color: "#ffffff", cursor: "pointer",
                  border: `1px solid ${hovered ? ACCENT : "rgba(255,255,255,0.22)"}`,
                  background: hovered ? "rgba(217,12,183,0.12)" : "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                  transition: "border-color 0.35s ease, background 0.35s ease",
                }}
              >
                View Work
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </motion.div>
          </div>

        </div>
      </a>
    </div>
  );
}

// Sticky panel container — uses inView to trigger the first panel entrance fade
function StickyPanels({ projects, N, sp }: { projects: Project[]; N: number; sp: MotionValue<number> }) {
  const stickyRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stickyRef, { once: true, amount: 0.01 });

  return (
    <div
      ref={stickyRef}
      style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        opacity: inView ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      {projects.map((project, i) => (
        <PanelLayer
          key={project.client}
          project={project}
          num={`0${i + 1}`}
          index={i}
          total={N}
          sp={sp}
        />
      ))}
    </div>
  );
}

export default function SelectedWorkSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: sp } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const N = projects.length;

  return (
    <section id="work" style={{ background: "#0a0a0a" }}>
      {/* Header */}
      <div style={{ padding: "120px 56px 72px", maxWidth: 1440, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}
          className="selected-work-header"
        >
          <h2 style={{
            fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 600,
            color: "#ffffff", lineHeight: 1.05, letterSpacing: "-0.025em",
            margin: 0, fontFamily: "var(--font-urbanist), sans-serif",
          }}>
            Selected Work
          </h2>
          <a
            href="#contact"
            className="btn-gradient-border"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "12px 24px", borderRadius: 9999,
              fontSize: 14, fontWeight: 600, color: "#ffffff",
              textDecoration: "none", flexShrink: 0,
              fontFamily: "var(--font-urbanist), sans-serif",
            }}
          >
            Start a Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Single scroll container — all panels stack inside one sticky context */}
      <div ref={scrollRef} style={{ height: `${N * 220}vh`, position: "relative" }}>
        <StickyPanels projects={projects} N={N} sp={sp} />
      </div>

      <div style={{ height: 120 }} />

      <style jsx global>{`
        @media (max-width: 768px) {
          .selected-work-header { flex-direction: column !important; align-items: flex-start !important; }
          .work-panel-bottom { left: 24px !important; right: 24px !important; bottom: 36px !important; }
        }
      `}</style>
    </section>
  );
}
