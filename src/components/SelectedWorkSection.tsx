"use client";

import { motion } from "framer-motion";

const ACCENT = "#d90cb7";

const projects = [
  {
    client: "Fiverr",
    title: "Feature Adoption Redesign",
    tags: ["UX Strategy", "Product Design"],
    result: "+12% feature adoption",
    size: "large",
  },
  {
    client: "Viably",
    title: "Conversion Rate Optimization",
    tags: ["The Hero Framework", "UX Research"],
    result: "5x conversion boost",
    size: "large",
  },
  {
    client: "Designrr",
    title: "Engagement & Retention Overhaul",
    tags: ["Product Design", "Behavioral UX"],
    result: "+97% engagement",
    size: "medium",
  },
  {
    client: "SaaS Platform",
    title: "Onboarding Flow Redesign",
    tags: ["UX Strategy", "Development"],
    result: "-40% drop-off",
    size: "small",
  },
  {
    client: "FinTech Startup",
    title: "MVP UX Architecture",
    tags: ["Startups", "Embedded Design"],
    result: "Ship-ready in 6 weeks",
    size: "small",
  },
];

function WorkCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: "easeOut" }}
      style={{
        borderRadius: 16,
        border: "1px solid #383838",
        background: "#0a0a0a",
        padding: "36px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 24,
        minHeight: project.size === "large" ? 320 : 240,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.3s",
      }}
      whileHover={{ borderColor: "rgba(217,12,183,0.4)" }}
    >
      {/* Background hover glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(217,12,183,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Client */}
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: 12,
            fontFamily: "var(--font-urbanist), sans-serif",
          }}
        >
          {project.client}
        </p>

        {/* Title */}
        <h3
          style={{
            fontSize: "clamp(18px, 1.5vw, 22px)",
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {project.title}
        </h3>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Tags */}
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

        {/* Result */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            borderRadius: 10,
            background: `rgba(217,12,183,0.06)`,
            border: `1px solid rgba(217,12,183,0.2)`,
            width: "fit-content",
          }}
        >
          <span
            style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT, flexShrink: 0 }}
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
            <WorkCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* Row 2 — 3 smaller cards */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}
          className="work-row-3"
        >
          {row2.map((p, i) => (
            <WorkCard key={p.title} project={p} index={i + 2} />
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
