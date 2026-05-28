"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, useInView, type MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ACCENT = "#d90cb7";

type Project = {
  client: string;
  title: string;
  highlight: string;
  tags: string[];
  image: string;
  href: string;
  imageStyle?: React.CSSProperties;
};

const projects: Project[] = [
  {
    client: "DAZN",
    title: "Premium Sports Platform Redesign",
    highlight: "World's #1 dedicated live sports streamer — 8M+ paid subscribers in 200+ countries",
    tags: ["Web Design & Development", "App Design", "TV App", "Brand Design"],
    image: "/work/dazn.png",
    href: "/work/dazn",
    imageStyle: { objectFit: "cover" as const, objectPosition: "center center" },
  },
  {
    client: "Down",
    title: "Dating App, 0→1 Product Design",
    highlight: "App Store top-ranked dating app · 10M+ downloads across iOS & Android",
    tags: ["Web Design & Development", "App Design"],
    image: "/work/down.png",
    href: "/work/down",
  },
  {
    client: "Cymbio",
    title: "B2B Sales Dashboard",
    highlight: "Enterprise dropship & marketplace platform powering 250+ global brands",
    tags: ["Web Design & Development"],
    image: "/work/cymbio.png",
    href: "/work/cymbio",
  },
  {
    client: "Designrr",
    title: "Engagement & Retention Overhaul",
    highlight: "Leading content-repurposing SaaS trusted by 100K+ creators & marketers",
    tags: ["Web Design & Development"],
    image: "/work/designrr.png",
    href: "/work/designrr",
  },
  {
    client: "JUSTT",
    title: "Chargeback Management SaaS",
    highlight: "AI chargeback automation platform · $70M+ raised · serving global merchants",
    tags: ["Web Design & Development"],
    image: "/work/justt.png",
    href: "/work/justt",
  },
];

// ── Per-letter title animation ───────────────────────────────────────────────
function TitleChar({
  char, sp, rA, rB, xA, xB, isMobile,
}: {
  char: string;
  sp: MotionValue<number>;
  rA: number; rB: number;
  xA: number; xB: number;
  isMobile: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useMotionValueEvent(sp, "change", (latest) => {
    const el = ref.current;
    if (!el) return;
    const rP = rB > rA ? Math.max(0, Math.min(1, (latest - rA) / (rB - rA))) : latest >= rA ? 1 : 0;
    const xP = xB > xA ? Math.max(0, Math.min(1, (latest - xA) / (xB - xA))) : latest >= xA ? 1 : 0;
    const opacity = rP * (1 - xP);
    const y = (1 - rP) * 44 - xP * 32;
    el.style.opacity = String(opacity);
    el.style.transform = `translateY(${y}px)`;
    // filter:blur forces CPU rasterization every frame — skip on mobile
    if (!isMobile) {
      const blur = (1 - rP) * 40 + xP * 40;
      el.style.filter = blur > 0.5 ? `blur(${blur}px)` : "none";
    }
  });

  return (
    <span
      ref={ref}
      style={{
        display: "inline-block", opacity: 0, transform: "translateY(44px)",
        filter: isMobile ? "none" : "blur(40px)",
        willChange: "transform, opacity",
      }}
    >
      {char === " " ? " " : char}
    </span>
  );
}

// ── View Work button with hover ──────────────────────────────────────────────
function ViewWorkButton({ href, onClick }: { href: string; onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "9px 20px", borderRadius: 9999,
        fontFamily: "var(--font-urbanist), sans-serif",
        fontSize: 13, fontWeight: 600, letterSpacing: "0.04em",
        color: "#ffffff", textDecoration: "none",
        border: `1px solid ${hovered ? ACCENT : "rgba(255,255,255,0.22)"}`,
        background: hovered ? "rgba(217,12,183,0.12)" : "rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        transition: "border-color 0.3s ease, background 0.3s ease",
      }}
    >
      View Work
      <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
        <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

// ── Panel layer ──────────────────────────────────────────────────────────────
function PanelLayer({
  project, num, index, total, sp, isMobile,
}: {
  project: Project;
  num: string;
  index: number;
  total: number;
  sp: MotionValue<number>;
  isMobile: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isLast = index === total - 1;
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    router.push(project.href, { scroll: false });
  };

  const panelStart = index / total;
  const panelEnd   = (index + 1) / total;
  const lsp = useTransform(sp, [panelStart, panelEnd], [0, 1]);

  // Cross-fade opacity between panels
  const XFADE = 0.04;
  useMotionValueEvent(sp, "change", (latest) => {
    const el = wrapperRef.current;
    if (!el) return;
    let o: number;
    if (index === 0) {
      const out = (latest - (panelEnd - XFADE)) / (2 * XFADE);
      o = 1 - Math.max(0, Math.min(1, out));
    } else if (isLast) {
      const inn = (latest - (panelStart - XFADE)) / (2 * XFADE);
      o = Math.max(0, Math.min(1, inn));
    } else {
      const inn = (latest - (panelStart - XFADE)) / (2 * XFADE);
      const out = (latest - (panelEnd   - XFADE)) / (2 * XFADE);
      o = Math.max(0, Math.min(1, inn)) * (1 - Math.max(0, Math.min(1, out)));
    }
    el.style.opacity = String(o);
    el.style.pointerEvents = o > 0.3 ? "auto" : "none";
  });

  // Title travels bottom → top as panel scrolls
  const titleContainerYDesktop = useTransform(lsp, [0, 1], ["88vh", "10vh"]);
  const titleContainerYMobile  = useTransform(lsp, [0, 1], ["75vh", "32vh"]);
  const titleContainerY = isMobile ? titleContainerYMobile : titleContainerYDesktop;

  // First panel reveals immediately so it syncs with the section header scrolling off;
  // all subsequent panels keep the 0.05 lead-in gap.
  const REVEAL_START   = index === 0 ? 0 : 0.05;
  const REVEAL_STAGGER = 0.012;
  const REVEAL_DUR     = 0.10;
  const EXIT_START     = 0.82;
  const EXIT_STAGGER   = 0.008;
  const EXIT_DUR       = 0.07;
  const chars = project.client.split("");

  const subtitleOpacity = useTransform(
    lsp,
    [0, Math.max(0.001, REVEAL_START), REVEAL_START + REVEAL_DUR, EXIT_START, EXIT_START + EXIT_DUR, 1],
    [0, 0, 1, 1, 0, 0],
  );
  const numOpacity = useTransform(
    lsp,
    index === 0 ? [0, 0.08, 0.80, 0.92, 1] : [0, 0.04, 0.16, 0.80, 0.92, 1],
    index === 0 ? [0, 1,    1,    0,    0] : [0, 0,    1,    1,    0,    0],
  );

  // Image parallax (desktop only — parallax on mobile causes jank)
  const imageParallaxY = useTransform(lsp, [0, 1], [-50, 50]);

  // ── Mobile: full-screen image story ─────────────────────────────────────────
  if (isMobile) {
    return (
      <div
        ref={wrapperRef}
        style={{ position: "absolute", inset: 0, opacity: index === 0 ? 1 : 0, pointerEvents: index === 0 ? "auto" : "none" }}
      >
        {/* Full-bleed static image — no parallax on mobile */}
        <img
          src={project.image}
          alt={project.client}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            display: "block",
            ...project.imageStyle,
          }}
        />

        {/* Bottom gradient overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.82) 30%, rgba(10,10,10,0.45) 55%, transparent 75%)",
            pointerEvents: "none",
          }}
        />

        {/* Project counter — top right */}
        <motion.div
          style={{
            position: "absolute", top: 24, right: 24, zIndex: 5,
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: 12, fontWeight: 500, letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.55)",
            opacity: numOpacity,
          }}
        >
          {num} / 0{total}
        </motion.div>

        {/* Animated text overlay — travels up from bottom */}
        <motion.div
          style={{
            position: "absolute",
            left: 24, right: 24,
            y: titleContainerY,
            zIndex: 5,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: "clamp(36px, 10vw, 60px)",
              fontWeight: 600, color: "#ffffff",
              lineHeight: 1.0, letterSpacing: "-0.03em", margin: 0,
            }}
          >
            {chars.map((char, i) => (
              <TitleChar
                key={i} char={char} sp={lsp} isMobile={true}
                rA={REVEAL_START + i * REVEAL_STAGGER}
                rB={REVEAL_START + i * REVEAL_STAGGER + REVEAL_DUR}
                xA={EXIT_START + i * EXIT_STAGGER}
                xB={EXIT_START + i * EXIT_STAGGER + EXIT_DUR}
              />
            ))}
          </h3>

          <motion.div style={{ marginTop: 14, opacity: subtitleOpacity }}>
            <p
              style={{
                fontFamily: "var(--font-urbanist), sans-serif",
                fontSize: 15, fontWeight: 400,
                color: "rgba(255,255,255,0.75)",
                margin: "0 0 18px", lineHeight: 1.4,
              }}
            >
              {project.title}
            </p>
            <a
              href={project.href}
              onClick={handleNavigation}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "10px 22px", borderRadius: 9999,
                fontFamily: "var(--font-urbanist), sans-serif",
                fontSize: 13, fontWeight: 600, letterSpacing: "0.04em",
                color: "#ffffff", textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.28)",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
              }}
            >
              View Work
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ── Desktop: split left-text / right-image ───────────────────────────────────
  return (
    <div
      ref={wrapperRef}
      style={{ position: "absolute", inset: 0, opacity: index === 0 ? 1 : 0, pointerEvents: index === 0 ? "auto" : "none" }}
    >
      {/* Left panel: dark bg + animated text */}
      <div className="sw-left-panel" style={{ position: "absolute", left: 0, top: 0, width: "25%", height: "100%", background: "#0a0a0a" }}>

        <motion.div style={{
          position: "absolute", top: 44, left: 32, zIndex: 5,
          fontFamily: "var(--font-urbanist), sans-serif",
          fontSize: 13, fontWeight: 500, letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.38)",
          opacity: numOpacity,
        }}>
          {num} /
        </motion.div>

        <motion.div
          className="selected-work-title"
          style={{ position: "absolute", top: 0, left: 32, right: 24, y: titleContainerY, zIndex: 5 }}
        >
          <h3 style={{
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: "clamp(44px, 7vw, 100px)",
            fontWeight: 600, color: "#ffffff",
            lineHeight: 1.0, letterSpacing: "-0.03em", margin: 0,
          }}>
            {chars.map((char, i) => (
              <TitleChar
                key={i} char={char} sp={lsp} isMobile={false}
                rA={REVEAL_START + i * REVEAL_STAGGER}
                rB={REVEAL_START + i * REVEAL_STAGGER + REVEAL_DUR}
                xA={EXIT_START + i * EXIT_STAGGER}
                xB={EXIT_START + i * EXIT_STAGGER + EXIT_DUR}
              />
            ))}
          </h3>

          <motion.div style={{ marginTop: 20, opacity: subtitleOpacity }}>
            <p style={{
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: 17, fontWeight: 400,
              color: "rgba(255,255,255,0.72)",
              margin: "0 0 20px",
            }}>
              {project.title}
            </p>

            {/* Client highlight */}
            <div style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              marginBottom: 20,
            }}>
              <div style={{
                width: 2, alignSelf: "stretch",
                background: "linear-gradient(to bottom, #d90cb7, rgba(217,12,183,0.2))",
                borderRadius: 1, flexShrink: 0,
              }} />
              <p style={{
                margin: 0,
                fontSize: 12,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.42)",
                fontFamily: "var(--font-geist), sans-serif",
                letterSpacing: "0.15px",
              }}>
                {project.highlight}
              </p>
            </div>

            <ViewWorkButton href={project.href} onClick={handleNavigation} />
          </motion.div>
        </motion.div>
      </div>

      {/* Right panel: image with parallax */}
      <a
        href={project.href}
        onClick={handleNavigation}
        className="sw-right-panel"
        style={{
          display: "block",
          position: "absolute", right: 0, top: 0,
          width: "75%", height: "100%",
          padding: "24px 40px 24px 0",
          textDecoration: "none", cursor: "pointer",
        }}
      >
        <div style={{ height: "100%", borderRadius: 20, overflow: "hidden", position: "relative" }}>
          <motion.div
            style={{
              position: "absolute",
              top: -60, left: 0, right: 0,
              height: "calc(100% + 120px)",
              y: imageParallaxY,
            }}
          >
            <img
              src={project.image}
              alt={project.client}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center",
                display: "block",
                ...project.imageStyle,
              }}
            />
          </motion.div>
        </div>
      </a>
    </div>
  );
}

// ── Sticky container ─────────────────────────────────────────────────────────
function StickyPanels({ projects, N, sp, isMobile }: { projects: Project[]; N: number; sp: MotionValue<number>; isMobile: boolean }) {
  const stickyRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stickyRef, { once: true, amount: 0.01 });

  return (
    <div
      ref={stickyRef}
      style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        opacity: isMobile ? 1 : (inView ? 1 : 0),
        transition: isMobile ? undefined : "opacity 0.8s ease",
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
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}

export default function SelectedWorkSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress: sp } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const N = projects.length;

  return (
    <section id="work" style={{ background: "#0a0a0a" }}>
      {/* Header */}
      <div className="selected-work-outer" style={{ padding: "120px 56px 72px", maxWidth: 1440, margin: "0 auto" }}>
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

      {/* Scroll container */}
      <div ref={scrollRef} style={{ height: `${N * 220}vh`, position: "relative" }}>
        <StickyPanels projects={projects} N={N} sp={sp} isMobile={isMobile} />
      </div>

      <div style={{ height: 120 }} />

      <style jsx global>{`
        @media (max-width: 768px) {
          .selected-work-header { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 640px) {
          .selected-work-outer { padding: 60px 20px 40px !important; }
          #work { padding-left: 0 !important; padding-right: 0 !important; }
        }
      `}</style>
    </section>
  );
}
