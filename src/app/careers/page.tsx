"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Data ────────────────────────────────────────────────────────────────────

const benefits = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 8V12L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Async-first, remote forever",
    desc: "Work from wherever you do your best thinking. We're distributed by design, no mandatory check-ins, no location requirements.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Small, senior team",
    desc: "No layers of management. You'll work directly alongside experienced designers and engineers who take craft seriously.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Work that sets the standard",
    desc: "Every project we take on is a chance to raise the bar. Our clients are leaders in their spaces, so the stakes are real.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Craft-first culture",
    desc: "Pixels matter here. We care deeply about quality, from system architecture down to hover states. No rush-and-ship.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2V6M12 18V22M6.34 6.34L3.51 3.51M20.49 20.49L17.66 17.66M2 12H6M18 12H22M6.34 17.66L3.51 20.49M20.49 3.51L17.66 6.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Generous time off",
    desc: "Unlimited PTO with a real minimum. We close for two weeks every December. Rest is part of doing great work.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Equipment & learning budget",
    desc: "Top-spec MacBook, your choice of peripherals, and an annual budget for courses, conferences, and tools.",
  },
];

const roles = [
  {
    title: "Senior Product Designer",
    type: "Full-time",
    location: "Remote",
    tags: ["UX Design", "Product", "B2B"],
    about:
      "Lead end-to-end product design for complex SaaS platforms, from discovery and system design to polished, production-ready UI. You'll work closely with our clients' product and engineering teams, shaping experiences used by thousands of professionals every day.",
    requirements: [
      "5+ years of product design experience",
      "Strong portfolio across web and mobile products",
      "Fluent in Figma, with component system experience",
      "Comfortable running discovery and user research",
      "Experience with B2B or SaaS products preferred",
    ],
    duties: [
      "Own the full design lifecycle, from user research and discovery to pixel-perfect, production-ready screens",
      "Design and maintain scalable component systems and design tokens in Figma",
      "Lead design critiques, stakeholder walkthroughs, and discovery workshops",
      "Work closely with engineering to ensure implementation fidelity",
      "Translate ambiguous product problems into clear, intuitive UX solutions",
    ],
    whyThisRole:
      "This is a rare opportunity to work across a portfolio of ambitious, design-forward products with the autonomy to shape strategy, not just ship screens. You'll have a direct line to founders and product leaders who take design seriously, and your work will be seen by millions.",
  },
  {
    title: "Brand & Visual Designer",
    type: "Full-time",
    location: "Remote",
    tags: ["Brand", "Visual Design", "Motion"],
    about:
      "Shape the visual identities of ambitious companies, building brand systems, campaign assets, and motion guidelines that turn heads. You'll define how our clients look and feel across every surface, from product UI to global campaigns.",
    requirements: [
      "4+ years in brand or visual design",
      "Exceptional typography and layout skills",
      "Experience building full brand identities from scratch",
      "Motion design skills (After Effects or Rive) a plus",
      "Mastery of Figma and Adobe Creative Suite",
    ],
    duties: [
      "Build end-to-end brand systems, logos, typography, color palettes, and usage guidelines",
      "Create campaign assets, pitch decks, and marketing materials for client launches",
      "Develop motion and animation guidelines for digital brand expressions",
      "Collaborate with product designers to maintain visual coherence across touchpoints",
      "Present brand directions and rationale to senior stakeholders and founders",
    ],
    whyThisRole:
      "You'll have the rare opportunity to define how ambitious companies present themselves to the world, from zero to launch. Every identity you create here will be seen by millions. If you care deeply about craft and want your work to matter, this is the place.",
  },
  {
    title: "Frontend Developer",
    type: "Contract",
    location: "Remote",
    tags: ["React", "TypeScript", "Animation"],
    about:
      "Turn pixel-perfect Figma designs into high-performance, accessible, and beautifully animated web experiences. You'll work on marketing sites and product interfaces for design-forward clients who notice the difference between good and exceptional.",
    requirements: [
      "4+ years in frontend development",
      "Expert-level React and TypeScript",
      "Strong feel for animation (Framer Motion, GSAP)",
      "Eye for design, you care about the gap between spec and output",
      "Experience with Next.js and headless CMS platforms",
    ],
    duties: [
      "Implement high-fidelity designs with meticulous attention to spacing, animation, and interaction",
      "Build performant, accessible web applications using React and Next.js",
      "Create reusable component libraries and design system implementations",
      "Optimize Core Web Vitals and ensure smooth rendering across all devices and browsers",
      "Collaborate directly with designers to close the gap between Figma and production",
    ],
    whyThisRole:
      "You'll work with some of the most design-focused teams in the industry, on projects where front-end quality is a genuine priority, not an afterthought. If you lose sleep over animation curves and pixel-perfect spacing, you'll fit right in.",
  },
];

// ─── Hero stats ───────────────────────────────────────────────────────────────

const heroStats: { value: number; suffix: string; label: string; icon: (size: number) => React.ReactNode }[] = [
  {
    value: 20, suffix: "+", label: "people on the team",
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: 50, suffix: "+", label: "products shipped",
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: 100, suffix: "%", label: "remote-first",
    icon: (s) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function HeroStatCard({ stat, startDelay }: { stat: typeof heroStats[0]; startDelay: number }) {
  const [count, setCount] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * stat.value));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, startDelay);
    return () => clearTimeout(t);
  }, [stat.value, startDelay]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        padding: "32px 28px",
        borderRadius: 16,
        border: `1px solid ${hovered ? "rgba(217,12,183,0.5)" : "rgba(56,56,56,0.62)"}`,
        background: hovered ? "rgba(217,12,183,0.04)" : "rgba(255,255,255,0.02)",
        transition: "border-color 0.3s ease, background 0.3s ease",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Bottom accent line */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0, height: 1,
        background: hovered
          ? "linear-gradient(to right, transparent, rgba(217,12,183,0.55), transparent)"
          : "linear-gradient(to right, transparent, rgba(56,56,56,0.5), transparent)",
        transition: "background 0.3s ease",
      }} />

      {/* Hover glow */}
      <div style={{
        position: "absolute",
        bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", height: "50%",
        background: "radial-gradient(ellipse at 50% 100%, rgba(217,12,183,0.1) 0%, transparent 70%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }} />

      {/* Background watermark icon */}
      <div style={{
        position: "absolute",
        top: 20, right: 20,
        color: "#ffffff",
        opacity: hovered ? 0.1 : 0.06,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }}>
        {stat.icon(80)}
      </div>

      {/* Number */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
        <span style={{
          fontSize: "clamp(44px, 4.5vw, 64px)",
          fontWeight: 700,
          fontFamily: "var(--font-urbanist), sans-serif",
          color: "#ffffff",
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}>
          {count}
        </span>
        <span style={{
          fontSize: "clamp(32px, 3.2vw, 46px)",
          fontWeight: 700,
          fontFamily: "var(--font-urbanist), sans-serif",
          color: "#ffffff",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          paddingBottom: 3,
        }}>
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p style={{
        margin: 0,
        fontSize: 13,
        color: "#888888",
        fontFamily: "var(--font-geist), sans-serif",
        letterSpacing: "0.3px",
        lineHeight: 1.4,
      }}>
        {stat.label}
      </p>
    </div>
  );
}

// ─── Shared label style ───────────────────────────────────────────────────────
const sectionLabel: React.CSSProperties = {
  margin: "0 0 12px",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.84px",
  textTransform: "uppercase",
  color: "#888888",
  fontFamily: "var(--font-urbanist), sans-serif",
};

// ─── Bullet list used across multiple sections ────────────────────────────────
function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item) => (
        <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, lineHeight: 1.6, color: "#b0b0b0", fontFamily: "var(--font-geist), sans-serif" }}>
          <span style={{ marginTop: 6, width: 5, height: 5, borderRadius: "50%", background: "#d90cb7", flexShrink: 0 }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ─── Compact benefit pill used inside expanded card ───────────────────────────
function BenefitPill({ title }: { title: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "6px 14px", borderRadius: 9999,
      border: "1px solid rgba(56,56,56,0.7)",
      background: "rgba(255,255,255,0.03)",
      fontSize: 13, color: "#b0b0b0",
      fontFamily: "var(--font-urbanist), sans-serif",
      whiteSpace: "nowrap",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#d90cb7", flexShrink: 0 }} />
      {title}
    </span>
  );
}

// ─── Role Card ────────────────────────────────────────────────────────────────

function RoleCard({ role, i }: { role: typeof roles[0]; i: number }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
      style={{
        borderRadius: 16,
        border: `1px solid ${hovered || open ? "#d90cb7" : "rgba(56,56,56,0.62)"}`,
        background: open ? "rgba(217,12,183,0.04)" : "rgba(255,255,255,0.02)",
        transition: "border-color 0.3s ease, background 0.3s ease",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Collapsed header ── */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 32px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            {role.tags.map((tag) => (
              <span key={tag} style={{ fontSize: 11, fontWeight: 500, fontFamily: "var(--font-urbanist), sans-serif", letterSpacing: "0.7px", textTransform: "uppercase", color: "#888888", background: "rgba(255,255,255,0.05)", borderRadius: 4, padding: "3px 8px" }}>
                {tag}
              </span>
            ))}
          </div>
          <h3 style={{ margin: 0, fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 600, fontFamily: "var(--font-urbanist), sans-serif", color: "#ffffff", lineHeight: 1.2 }}>
            {role.title}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 13, color: "#888888", fontFamily: "var(--font-geist), sans-serif" }}>{role.type}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#383838", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "#888888", fontFamily: "var(--font-geist), sans-serif" }}>{role.location}</span>
          </div>
        </div>

        {/* Expand / collapse icon */}
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{
            flexShrink: 0, width: 40, height: 40, borderRadius: "50%",
            border: `1px solid ${open ? "rgba(217,12,183,0.4)" : "rgba(56,56,56,0.8)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: open ? "#d90cb7" : "#ffffff",
            transition: "color 0.25s ease, border-color 0.25s ease",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </button>

      {/* ── Expanded body ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ borderTop: "1px solid rgba(56,56,56,0.4)", padding: "32px 32px 36px", display: "flex", flexDirection: "column", gap: 32 }}>

              {/* 1, About the Job */}
              <div>
                <p style={sectionLabel}>About the Job</p>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "#b0b0b0", fontFamily: "var(--font-geist), sans-serif", maxWidth: 740 }}>
                  {role.about}
                </p>
              </div>

              {/* 2, Requirements */}
              <div>
                <p style={sectionLabel}>Requirements</p>
                <BulletList items={role.requirements} />
              </div>

              {/* 3, Duties & Opportunities */}
              <div>
                <p style={sectionLabel}>Duties &amp; Opportunities</p>
                <BulletList items={role.duties} />
              </div>

              {/* 4, Why this role */}
              <div>
                <p style={sectionLabel}>Why This Role</p>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "#b0b0b0", fontFamily: "var(--font-geist), sans-serif", maxWidth: 740 }}>
                  {role.whyThisRole}
                </p>
              </div>

              {/* 5, Benefits */}
              <div>
                <p style={sectionLabel}>Benefits</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {benefits.map((b) => <BenefitPill key={b.title} title={b.title} />)}
                </div>
              </div>

              {/* Apply CTA */}
              <a
                href="https://wkf.ms/4gE1ydY"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient-border"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 24px", height: 46, borderRadius: 9999, fontSize: 13, fontWeight: 500, fontFamily: "var(--font-urbanist), sans-serif", color: "#ffffff", textDecoration: "none", width: "fit-content" }}
              >
                Apply for this role
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CareersPage() {
  return (
    <main style={{ background: "#0a0a0a", color: "#ffffff", minHeight: "100vh" }}>
      <Header />

      {/* ── Hero ── */}
      <section className="careers-hero-section" style={{ padding: "130px 40px 0", background: "#0a0a0a" }}>

        {/* Text content */}
        <div className="careers-hero-inner" style={{ maxWidth: 1360, margin: "0 auto", marginBottom: 72 }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            style={{ marginBottom: 36 }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 9999, border: "1px solid rgba(217,12,183,0.35)", background: "rgba(217,12,183,0.06)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d90cb7", display: "block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.84px", textTransform: "uppercase", color: "#d90cb7", fontFamily: "var(--font-urbanist), sans-serif" }}>
                We&apos;re hiring
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ margin: "0 0 40px", fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 700, fontFamily: "var(--font-urbanist), sans-serif", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            <span style={{ color: "#888888" }}>Where great design</span><br />
            <span style={{ color: "#ffffff" }}>meets real impact.</span>
          </motion.h1>

          {/* Description + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 32 }}
          >
            <p style={{ margin: 0, maxWidth: 580, fontSize: "clamp(15px, 1.3vw, 18px)", lineHeight: 1.75, color: "#b0b0b0", fontFamily: "var(--font-geist), sans-serif" }}>
              We&apos;re nearly 20 designers, strategists, and engineers who believe craft and results aren&apos;t a trade-off. Every project raises the bar, and we&apos;re looking for people who want to help raise it.
            </p>
            <a
              href="#open-roles"
              className="btn-gradient-border"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 9999, color: "#ffffff", textDecoration: "none", fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" }}
            >
              See open roles
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          </motion.div>

          {/* Stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="careers-stats-row"
            style={{ display: "flex", gap: 16, marginTop: 56 }}
          >
            {heroStats.map((stat, i) => (
              <HeroStatCard key={stat.label} stat={stat} startDelay={600 + i * 150} />
            ))}
          </motion.div>
        </div>

      </section>

      {/* ── Divider ── */}
      <div style={{ padding: "0 40px", marginTop: 80 }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", height: 1, background: "#383838" }} />
      </div>

      {/* ── Benefits ── */}
      <section style={{ padding: "120px 40px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ marginBottom: 64 }}
          >
            <p
              style={{
                margin: "0 0 16px",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.84px",
                textTransform: "uppercase",
                color: "#888888",
                fontFamily: "var(--font-urbanist), sans-serif",
              }}
            >
              Why Contrast
            </p>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                fontFamily: "var(--font-urbanist), sans-serif",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ color: "#888888" }}>A place where </span>
              <span style={{ color: "#ffffff" }}>craft thrives.</span>
            </h2>
          </motion.div>

          <div className="careers-benefits-grid">
            {benefits.map((b, i) => (
              <BenefitCard key={b.title} benefit={b} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section id="open-roles" style={{ padding: "0 40px 120px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ marginBottom: 48 }}
          >
            <p
              style={{
                margin: "0 0 16px",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.84px",
                textTransform: "uppercase",
                color: "#888888",
                fontFamily: "var(--font-urbanist), sans-serif",
              }}
            >
              Open positions
            </p>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                fontFamily: "var(--font-urbanist), sans-serif",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ color: "#888888" }}>We&apos;re looking for </span>
              <span style={{ color: "#ffffff" }}>great people.</span>
            </h2>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {roles.map((role, i) => (
              <RoleCard key={role.title} role={role} i={i} />
            ))}
          </div>

          {/* General application */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            style={{
              marginTop: 32,
              padding: "40px 40px",
              borderRadius: 16,
              border: "1px solid rgba(56,56,56,0.62)",
              background: "rgba(255,255,255,0.015)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: 18,
                  fontWeight: 600,
                  fontFamily: "var(--font-urbanist), sans-serif",
                  color: "#ffffff",
                }}
              >
                Don&apos;t see the right role?
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "#888888",
                  fontFamily: "var(--font-geist), sans-serif",
                }}
              >
                We&apos;re always interested in hearing from exceptional people. Send us your work and tell us who you are.
              </p>
            </div>
            <a
              href="mailto:hello@contrast.studio?subject=General Application"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                borderRadius: 9999,
                border: "1px solid rgba(56,56,56,0.8)",
                background: "transparent",
                color: "#ffffff",
                textDecoration: "none",
                fontFamily: "var(--font-urbanist), sans-serif",
                fontWeight: 500,
                fontSize: 13,
                whiteSpace: "nowrap",
                transition: "border-color 0.25s ease, color 0.25s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#d90cb7";
                e.currentTarget.style.color = "#d90cb7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(56,56,56,0.8)";
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              Send us your work
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }

        @media (max-width: 768px) {
          .careers-stats-row {
            flex-direction: column !important;
            gap: 12px !important;
          }
        }

        @media (max-width: 640px) {
          .careers-hero-section {
            padding-top: 100px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .careers-hero-inner {
            margin-bottom: 40px !important;
          }
        }

        .careers-benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          border: 1px solid rgba(56, 56, 56, 0.62);
          border-radius: 16px;
          overflow: hidden;
        }

        .careers-apply-btn {
          align-self: flex-start;
        }

        @media (max-width: 900px) {
          .careers-benefits-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 600px) {
          .careers-benefits-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

// ─── Benefit Card ─────────────────────────────────────────────────────────────

function BenefitCard({ benefit, i }: { benefit: typeof benefits[0]; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "36px 32px",
        background: hovered ? "rgba(217,12,183,0.04)" : "transparent",
        transition: "background 0.3s ease",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        borderRight: "1px solid rgba(56,56,56,0.62)",
        borderBottom: "1px solid rgba(56,56,56,0.62)",
        marginRight: -1,
        marginBottom: -1,
      }}
    >
      <div
        style={{
          color: hovered ? "#d90cb7" : "#888888",
          transition: "color 0.3s ease",
        }}
      >
        {benefit.icon}
      </div>
      <h3
        style={{
          margin: 0,
          fontSize: 17,
          fontWeight: 600,
          fontFamily: "var(--font-urbanist), sans-serif",
          color: "#ffffff",
          lineHeight: 1.3,
        }}
      >
        {benefit.title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: 1.7,
          color: "#888888",
          fontFamily: "var(--font-geist), sans-serif",
        }}
      >
        {benefit.desc}
      </p>
    </motion.div>
  );
}
