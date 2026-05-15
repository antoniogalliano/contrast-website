"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
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

// ── Individual project row ────────────────────────────────────────────────────
function ProjectRow({
  project, num, index, isActive, onActivate,
}: {
  project: Project;
  num: string;
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();

    if (!("startViewTransition" in document)) {
      router.push(project.href);
      return;
    }

    // Tag the currently active sticky panel image as "case-hero" so the browser
    // morphs it from its current position/size to the fullscreen case page hero.
    const activeImg = document.querySelector("[data-case-hero]") as HTMLElement | null;
    activeImg?.style.setProperty("view-transition-name", "case-hero");

    (document as Document & { startViewTransition: (cb: () => void) => void })
      .startViewTransition(() => {
        flushSync(() => { router.push(project.href); });
      });
  };

  return (
    <motion.a
      ref={ref}
      href={project.href}
      onClick={handleNavigation}
      onMouseEnter={onActivate}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "28px 0 28px 20px",
        borderBottom: "1px solid #1a1a1a",
        textDecoration: "none",
        cursor: "pointer",
        borderLeft: `2px solid ${isActive ? ACCENT : "transparent"}`,
        transition: "border-color 0.3s ease",
        position: "relative",
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily: "var(--font-urbanist), sans-serif",
        fontSize: 12, fontWeight: 500, letterSpacing: "0.12em",
        color: isActive ? ACCENT : "rgba(255,255,255,0.25)",
        minWidth: 28, flexShrink: 0,
        transition: "color 0.3s ease",
      }}>
        {num}
      </span>

      {/* Client name + project title */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "var(--font-urbanist), sans-serif",
          fontSize: "clamp(22px, 2.5vw, 40px)",
          fontWeight: 600,
          color: isActive ? "#ffffff" : "rgba(255,255,255,0.38)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          transition: "color 0.3s ease",
          marginBottom: 4,
        }}>
          {project.client}
        </div>
        <div style={{
          fontFamily: "var(--font-geist), sans-serif",
          fontSize: 13,
          color: isActive ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.18)",
          transition: "color 0.3s ease",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {project.title}
        </div>
      </div>

      {/* Tags — hidden on smaller screens */}
      <div className="sw-row-tags" style={{ display: "flex", gap: 6, flexShrink: 0 }}>
        {project.tags.slice(0, 2).map((tag) => (
          <span key={tag} style={{
            fontSize: 11, fontWeight: 500,
            color: isActive ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.16)",
            padding: "4px 10px", borderRadius: 9999,
            border: `1px solid ${isActive ? "rgba(255,255,255,0.14)" : "#1e1e1e"}`,
            fontFamily: "var(--font-urbanist), sans-serif",
            letterSpacing: "0.2px",
            whiteSpace: "nowrap",
            transition: "color 0.3s ease, border-color 0.3s ease",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow circle */}
      <div style={{
        width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
        border: `1px solid ${isActive ? ACCENT : "#222"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: isActive ? ACCENT : "rgba(255,255,255,0.18)",
        transition: "border-color 0.3s ease, color 0.3s ease",
      }}>
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
          <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.a>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function SelectedWorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="work" style={{ background: "#0a0a0a", paddingBottom: 120 }}>

      {/* ── Section header ── */}
      <div style={{ padding: "120px 56px 64px", maxWidth: 1440, margin: "0 auto" }}>
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

      {/* ── Two-column grid: list + sticky image ── */}
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 56px" }}>
        <div className="sw-grid" style={{ display: "grid", gridTemplateColumns: "1fr 42%", gap: "0 72px" }}>

          {/* LEFT — project list */}
          <div>
            <div style={{ height: 1, background: "#1a1a1a" }} />
            {projects.map((project, i) => (
              <ProjectRow
                key={project.client}
                project={project}
                num={`0${i + 1}`}
                index={i}
                isActive={activeIndex === i}
                onActivate={() => setActiveIndex(i)}
              />
            ))}
          </div>

          {/* RIGHT — sticky image panel */}
          <div>
            <div style={{ position: "sticky", top: "14vh" }}>

              {/* Image stack — all 5 stacked, only active one visible */}
              <div style={{
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                aspectRatio: "3 / 2",
                background: "#111",
              }}>
                {projects.map((p, i) => (
                  <motion.div
                    key={p.client}
                    style={{ position: "absolute", inset: 0 }}
                    animate={{ opacity: i === activeIndex ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={p.image}
                      alt={p.client}
                      // data-case-hero marks the active image for the view-transition morph
                      {...(i === activeIndex ? { "data-case-hero": "active" } : {})}
                      style={{
                        width: "100%", height: "100%",
                        objectFit: "cover", objectPosition: "center center",
                        display: "block",
                        ...p.imageStyle,
                      }}
                    />
                  </motion.div>
                ))}

                {/* Subtle top vignette */}
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "linear-gradient(to bottom, rgba(10,10,10,0.12) 0%, transparent 30%)",
                }} />
              </div>

              {/* Caption — crossfades with active project */}
              <div style={{
                marginTop: 16,
                display: "flex", alignItems: "flex-start", justifyContent: "space-between",
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <div style={{
                      fontFamily: "var(--font-urbanist), sans-serif",
                      fontSize: 13, fontWeight: 600, color: "#ffffff", marginBottom: 3,
                    }}>
                      {projects[activeIndex].client}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-geist), sans-serif",
                      fontSize: 12, color: "rgba(255,255,255,0.35)",
                    }}>
                      {projects[activeIndex].title}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Counter */}
                <div style={{
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: 11, letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.22)",
                  flexShrink: 0, paddingTop: 2,
                }}>
                  {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(projects.length).padStart(2, "0")}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 960px) {
          .sw-row-tags { display: none !important; }
        }
        @media (max-width: 768px) {
          .selected-work-header { flex-direction: column !important; align-items: flex-start !important; }
          .sw-grid { grid-template-columns: 1fr !important; }
          .sw-grid > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
