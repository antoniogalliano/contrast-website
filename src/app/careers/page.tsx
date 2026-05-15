"use client";

import { useState } from "react";
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
    desc: "Work from wherever you do your best thinking. We're distributed by design — no mandatory check-ins, no location requirements.",
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
    desc: "Every project we take on is a chance to raise the bar. Our clients are leaders in their spaces — so the stakes are real.",
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
    desc: "Pixels matter here. We care deeply about quality — from system architecture down to hover states. No rush-and-ship.",
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
    desc: "Lead end-to-end product design for complex SaaS platforms — from discovery and system design to polished, production-ready UI. You'll work closely with our clients' product and engineering teams.",
    requirements: [
      "5+ years of product design experience",
      "Strong portfolio across web and mobile products",
      "Fluent in Figma, with component system experience",
      "Comfortable running discovery and user research",
      "Experience with B2B or SaaS products preferred",
    ],
  },
  {
    title: "Brand & Visual Designer",
    type: "Full-time",
    location: "Remote",
    tags: ["Brand", "Visual Design", "Motion"],
    desc: "Shape the visual identities of ambitious companies — building brand systems, campaign assets, and motion guidelines that turn heads. You'll define how our clients look and feel across every surface.",
    requirements: [
      "4+ years in brand or visual design",
      "Exceptional typography and layout skills",
      "Experience building full brand identities from scratch",
      "Motion design skills (After Effects or Rive) a plus",
      "Mastery of Figma and Adobe Creative Suite",
    ],
  },
  {
    title: "Frontend Developer",
    type: "Contract",
    location: "Remote",
    tags: ["React", "TypeScript", "Animation"],
    desc: "Turn pixel-perfect Figma designs into high-performance, accessible, and beautifully animated web experiences. You'll work on marketing sites and product interfaces for design-forward clients.",
    requirements: [
      "4+ years in frontend development",
      "Expert-level React and TypeScript",
      "Strong feel for animation (Framer Motion, GSAP)",
      "Eye for design — you care about the gap between spec and output",
      "Experience with Next.js and headless CMS platforms",
    ],
  },
];

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
      {/* Header row */}
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
              <span
                key={tag}
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  fontFamily: "var(--font-urbanist), sans-serif",
                  letterSpacing: "0.7px",
                  textTransform: "uppercase",
                  color: "#888888",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 4,
                  padding: "3px 8px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h3
            style={{
              margin: 0,
              fontSize: "clamp(18px, 2vw, 22px)",
              fontWeight: 600,
              fontFamily: "var(--font-urbanist), sans-serif",
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            {role.title}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 13, color: "#888888", fontFamily: "var(--font-geist), sans-serif" }}>
              {role.type}
            </span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#383838", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "#888888", fontFamily: "var(--font-geist), sans-serif" }}>
              {role.location}
            </span>
          </div>
        </div>

        {/* Expand chevron */}
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{
            flexShrink: 0,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(56,56,56,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: open ? "#d90cb7" : "#ffffff",
            transition: "color 0.25s ease, border-color 0.25s ease",
            borderColor: open ? "rgba(217,12,183,0.4)" : "rgba(56,56,56,0.8)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </button>

      {/* Expanded body */}
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
            <div
              style={{
                padding: "0 32px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 24,
                borderTop: "1px solid rgba(56,56,56,0.4)",
                marginTop: 0,
              }}
            >
              <p
                style={{
                  margin: "24px 0 0",
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "#b0b0b0",
                  fontFamily: "var(--font-geist), sans-serif",
                  maxWidth: 680,
                }}
              >
                {role.desc}
              </p>

              <div>
                <p
                  style={{
                    margin: "0 0 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.7px",
                    textTransform: "uppercase",
                    color: "#888888",
                    fontFamily: "var(--font-urbanist), sans-serif",
                  }}
                >
                  What we're looking for
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {role.requirements.map((req) => (
                    <li
                      key={req}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "#b0b0b0",
                        fontFamily: "var(--font-geist), sans-serif",
                      }}
                    >
                      <span
                        style={{
                          marginTop: 6,
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#d90cb7",
                          flexShrink: 0,
                        }}
                      />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`mailto:hello@contrast.studio?subject=Application: ${role.title}`}
                className="btn-gradient-border careers-apply-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0 24px",
                  height: 46,
                  borderRadius: 9999,
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "var(--font-urbanist), sans-serif",
                  color: "#ffffff",
                  textDecoration: "none",
                  width: "fit-content",
                }}
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
      <section
        style={{
          padding: "180px 40px 120px",
          maxWidth: 1360,
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          style={{ maxWidth: 800 }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 28,
              padding: "6px 14px",
              borderRadius: 9999,
              border: "1px solid rgba(217,12,183,0.35)",
              background: "rgba(217,12,183,0.06)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#d90cb7",
                display: "block",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.84px",
                textTransform: "uppercase",
                color: "#d90cb7",
                fontFamily: "var(--font-urbanist), sans-serif",
              }}
            >
              We&apos;re hiring
            </span>
          </div>

          <h1
            style={{
              margin: "0 0 24px",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              fontWeight: 700,
              fontFamily: "var(--font-urbanist), sans-serif",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "#888888" }}>Build the future of </span>
            <span style={{ color: "#ffffff" }}>digital design</span>
            <span style={{ color: "#888888" }}> with us.</span>
          </h1>

          <p
            style={{
              margin: "0 0 40px",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              lineHeight: 1.65,
              color: "#b0b0b0",
              fontFamily: "var(--font-geist), sans-serif",
              maxWidth: 600,
            }}
          >
            We&apos;re a small, senior team obsessed with craft. Every project we take on raises the bar — and we&apos;re looking for people who want to help raise it.
          </p>

          <a
            href="#open-roles"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 9999,
              background: "#ffffff",
              color: "#000000",
              textDecoration: "none",
              fontFamily: "var(--font-urbanist), sans-serif",
              fontWeight: 600,
              fontSize: 14,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            See open roles
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
        </motion.div>
      </section>

      {/* ── Divider ── */}
      <div style={{ padding: "0 40px" }}>
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
          50% { opacity: 0.5; transform: scale(0.85); }
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
