"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

const ACCENT = "#d90cb7";

type Project = {
  client: string;
  title: string;
  tags: string[];
  result: string;
  image: string;
  imagePosition?: string;
  size: "large" | "medium";
  href?: string;
};

const projects: Project[] = [
  {
    client: "DAZN",
    title: "Premium Sports Platform Redesign",
    tags: ["Web Design & Development", "App Design", "TV App", "Brand Design"],
    result: "Full-stack redesign",
    image: "/work/dazn.png",
    imagePosition: "top center",
    size: "large",
    href: "/work/dazn",
  },
  {
    client: "Down",
    title: "Dating App — 0→1 Product Design",
    tags: ["Web Design & Development", "App Design"],
    result: "0→1 product design",
    image: "/work/down.png",
    imagePosition: "center center",
    size: "large",
    href: "/work/down",
  },
  {
    client: "Cymbio",
    title: "B2B Sales Dashboard",
    tags: ["Web Design & Development"],
    result: "B2B dashboard design",
    image: "/work/cymbio.png",
    imagePosition: "top center",
    size: "medium",
    href: "/work/cymbio",
  },
  {
    client: "Designrr",
    title: "Engagement & Retention Overhaul",
    tags: ["Web Design & Development"],
    result: "+97% engagement",
    image: "/work/designrr.png",
    imagePosition: "top center",
    size: "medium",
    href: "/work/designrr",
  },
  {
    client: "JUSTT",
    title: "Chargeback Management SaaS",
    tags: ["Web Design & Development"],
    result: "SaaS product design",
    image: "/work/justt.png",
    imagePosition: "top center",
    size: "medium",
    href: "/work/justt",
  },
];

function WorkCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const borderBg = hovered
    ? `radial-gradient(circle 320px at ${mouse.x}px ${mouse.y}px, #d90cb7 0%, rgba(56,56,56,0.62) 55%)`
    : "rgba(56,56,56,0.62)";

  const spotlightBg = `radial-gradient(circle 360px at ${mouse.x - 1}px ${mouse.y - 1}px, rgba(217,12,183,0.12) 0%, transparent 70%)`;

  const imageHeight = project.size === "large" ? 220 : 160;

  const Tag = project.href ? "a" : "div";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: "easeOut" }}
    >
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLAnchorElement>}
      {...(project.href ? { href: project.href } : {})}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove as React.MouseEventHandler}
      style={{
        display: "block",
        padding: 1,
        borderRadius: 17,
        background: borderBg,
        transition: hovered ? "none" : "background 0.4s ease",
        cursor: project.href ? "pointer" : "default",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          borderRadius: 16,
          background: "#0a0a0a",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Mouse-follow spotlight */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: hovered ? 1 : 0,
            transition: hovered ? "none" : "opacity 0.4s ease",
            background: spotlightBg,
            zIndex: 0,
          }}
        />

        {/* Image */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: imageHeight,
            borderRadius: 10,
            overflow: "hidden",
            flexShrink: 0,
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <img
            src={project.image}
            alt={project.client}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: project.imagePosition ?? "top center",
              display: "block",
              transition: "transform 0.5s ease",
              transform: hovered ? "scale(1.03)" : "scale(1)",
            }}
          />
          {/* Subtle gradient overlay at bottom for text readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.35) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Client + Title */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: 10,
              fontFamily: "var(--font-urbanist), sans-serif",
              margin: "0 0 10px",
            }}
          >
            {project.client}
          </p>
          <h3
            style={{
              fontSize: "clamp(18px, 1.5vw, 22px)",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.3,
              margin: 0,
              fontFamily: "var(--font-urbanist), sans-serif",
            }}
          >
            {project.title}
          </h3>
        </div>

        {/* Tags + Result */}
        <div style={{ position: "relative", zIndex: 1, marginTop: "auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.5)",
                  padding: "4px 12px",
                  borderRadius: 100,
                  border: "1px solid rgba(56,56,56,0.8)",
                  fontFamily: "var(--font-urbanist), sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 10,
              background: "rgba(217,12,183,0.06)",
              border: "1px solid rgba(217,12,183,0.2)",
              width: "fit-content",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: ACCENT,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: ACCENT,
                fontFamily: "var(--font-urbanist), sans-serif",
              }}
            >
              {project.result}
            </span>
          </div>
        </div>
      </div>
    </Tag>
    </motion.div>
  );
}

export default function SelectedWorkSection() {
  const row1 = projects.slice(0, 2);
  const row2 = projects.slice(2);

  return (
    <section style={{ padding: "120px 40px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 48,
            gap: 24,
          }}
          className="selected-work-header"
        >
          <h2
            style={{
              fontSize: "clamp(32px, 4.5vw, 64px)",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.17,
              letterSpacing: "-0.01em",
              margin: 0,
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
              padding: "12px 24px",
              borderRadius: 9999,
              fontSize: 14,
              fontWeight: 600,
              color: "#ffffff",
              textDecoration: "none",
              flexShrink: 0,
              fontFamily: "var(--font-urbanist), sans-serif",
            }}
          >
            View All Work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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

        {/* Row 1 — 2 large cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
          className="work-row-2"
        >
          {row1.map((p, i) => (
            <WorkCard key={p.client} project={p} index={i} />
          ))}
        </div>

        {/* Row 2 — 3 medium cards */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}
          className="work-row-3"
        >
          {row2.map((p, i) => (
            <WorkCard key={p.client} project={p} index={i + 2} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .work-row-2, .work-row-3 {
            grid-template-columns: 1fr !important;
          }
          .selected-work-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
