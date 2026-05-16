"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useRouter } from "next/navigation";

const ACCENT = "#d90cb7";

type Project = {
  client: string;
  title: string;
  tags: string[];
  image: string;
  href: string;
  imageStyle?: React.CSSProperties;
};

const projects: Project[] = [
  {
    client: "DAZN",
    title: "Premium Sports Platform Redesign",
    tags: ["Web Design & Development", "App Design", "TV App", "Brand Design"],
    image: "/work/dazn.png",
    href: "/work/dazn",
    imageStyle: { objectFit: "contain" as const, objectPosition: "center center" },
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

// ── Row ────────────────────────────────────────────────────────────────────────
function ProjectRow({
  project,
  num,
  index,
  isActive,
  onActivate,
  revealed,
}: {
  project: Project;
  num: string;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  revealed: boolean;
}) {
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (!("startViewTransition" in document)) {
      router.push(project.href);
      return;
    }
    // Tag the active fullscreen background image for the browser to morph
    const activeImg = document.querySelector("[data-case-hero]") as HTMLElement | null;
    activeImg?.style.setProperty("view-transition-name", "case-hero");
    (document as Document & { startViewTransition: (cb: () => void) => void })
      .startViewTransition(() => {
        flushSync(() => { router.push(project.href); });
      });
  };

  return (
    <motion.a
      href={project.href}
      onClick={handleNavigation}
      onMouseEnter={onActivate}
      initial={{ opacity: 0, y: 24 }}
      animate={revealed ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "clamp(18px, 2.4vh, 30px) 0",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        textDecoration: "none",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Number */}
      <span
        style={{
          fontFamily: "var(--font-urbanist), sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.18em",
          color: isActive ? ACCENT : "rgba(255,255,255,0.28)",
          minWidth: 36,
          flexShrink: 0,
          transition: "color 0.4s ease",
          paddingTop: 2,
          alignSelf: "flex-start",
        }}
      >
        {num}
      </span>

      {/* Client name + subtitle */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: "clamp(32px, 4.2vw, 72px)",
            fontWeight: 700,
            color: isActive ? "#ffffff" : "rgba(255,255,255,0.28)",
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            transition: "color 0.4s ease",
            marginBottom: 6,
          }}
        >
          {project.client}
        </div>
        <div
          style={{
            fontFamily: "var(--font-geist), sans-serif",
            fontSize: "clamp(12px, 1vw, 14px)",
            color: isActive ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.18)",
            transition: "color 0.4s ease",
            letterSpacing: "0.01em",
          }}
        >
          {project.title}
        </div>
      </div>

      {/* Arrow — top-right ↗ */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: `1px solid ${isActive ? ACCENT : "rgba(255,255,255,0.16)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isActive ? ACCENT : "rgba(255,255,255,0.22)",
          flexShrink: 0,
          transition: "border-color 0.4s ease, color 0.4s ease",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path
            d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </motion.a>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function SelectedWorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "#0a0a0a",
      }}
    >
      {/* ── Fullscreen background images ── */}
      {projects.map((p, i) => (
        <motion.div
          key={p.client}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
          animate={{ opacity: i === activeIndex ? 1 : 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={p.image}
            alt={p.client}
            // Active image is tagged for the view-transition morph on click
            {...(i === activeIndex ? { "data-case-hero": "active" } : {})}
            animate={{ scale: i === activeIndex ? 1 : 1.04 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              display: "block",
              transformOrigin: "center center",
              ...p.imageStyle,
            }}
          />
        </motion.div>
      ))}

      {/* ── Gradient overlays — keep text readable over any image ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.46) 40%, rgba(10,10,10,0.66) 100%)",
        }}
      />
      {/* Left-edge guard */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(to right, rgba(10,10,10,0.22) 0%, transparent 55%)",
        }}
      />

      {/* ── Content layer ── */}
      <div
        className="sw-content"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "calc(100% - 80px)",
          maxWidth: 1360,
          margin: "0 auto",
          padding: "0",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="sw-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "52px 0 0",
            gap: 24,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(13px, 1vw, 15px)",
              fontWeight: 600,
              color: "rgba(255,255,255,0.38)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: 0,
              fontFamily: "var(--font-urbanist), sans-serif",
            }}
          >
            Selected Work
          </h2>
          <a
            href="#contact"
            className="btn-gradient-border"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 22px",
              borderRadius: 9999,
              fontSize: 13,
              fontWeight: 600,
              color: "#ffffff",
              textDecoration: "none",
              flexShrink: 0,
              fontFamily: "var(--font-urbanist), sans-serif",
            }}
          >
            Start a Project
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>

        {/* Project list — vertically centered in remaining space */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "40px 0",
          }}
        >
          {/* Top divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={revealed ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: 1,
              background: "rgba(255,255,255,0.1)",
              transformOrigin: "left",
            }}
          />

          {projects.map((project, i) => (
            <ProjectRow
              key={project.client}
              project={project}
              num={`0${i + 1}`}
              index={i}
              isActive={activeIndex === i}
              onActivate={() => setActiveIndex(i)}
              revealed={revealed}
            />
          ))}
        </div>

        {/* Counter — bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0 0 48px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.22)",
            }}
          >
            {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;
            {String(projects.length).padStart(2, "0")}
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .sw-content { width: calc(100% - 48px) !important; }
          .sw-header { padding-top: 32px !important; }
        }
      `}</style>
    </section>
  );
}
