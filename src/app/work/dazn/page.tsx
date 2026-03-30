"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { MouseFollowCard } from "@/components/work/MouseFollowCard";
import Header from "@/components/Header";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

// ─── Shared animation preset ─────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

// ─── Tag pill ─────────────────────────────────────────────────────────────────
function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 500,
        color: "rgba(255,255,255,0.55)",
        padding: "5px 14px",
        borderRadius: 100,
        border: "1px solid rgba(56,56,56,0.9)",
        fontFamily: "var(--font-urbanist), sans-serif",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// ─── Section label (eyebrow) ──────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-urbanist), sans-serif",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "3px",
        textTransform: "uppercase",
        color: "#d90cb7",
        margin: "0 0 20px",
      }}
    >
      {children}
    </p>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider() {
  return <div style={{ height: 1, background: "rgba(56,56,56,0.7)", margin: "0" }} />;
}

// ─── Next Case Study Card (mouse-follow hover) ────────────────────────────────
function CaseCard({
  client,
  title,
  tags,
  image,
  href,
  delay,
}: {
  client: string;
  title: string;
  tags: string[];
  image: string;
  href: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const borderBg = hovered
    ? `radial-gradient(circle 320px at ${mouse.x}px ${mouse.y}px, #d90cb7 0%, rgba(56,56,56,0.62) 55%)`
    : "rgba(56,56,56,0.62)";

  const spotlightBg = `radial-gradient(circle 360px at ${mouse.x - 1}px ${mouse.y - 1}px, rgba(217,12,183,0.12) 0%, transparent 70%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ flex: "1 1 0" }}
    >
    <a
      ref={ref}
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        padding: 1,
        borderRadius: 17,
        background: borderBg,
        transition: hovered ? "none" : "background 0.4s ease",
        cursor: "pointer",
        textDecoration: "none",
        display: "block",
      }}
    >
      <div
        style={{
          borderRadius: 16,
          background: "#0a0a0a",
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Spotlight */}
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
            height: 180,
            borderRadius: 10,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={image}
            alt={client}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              transition: "transform 0.5s ease",
              transform: hovered ? "scale(1.03)" : "scale(1)",
            }}
          />
        </div>

        {/* Text */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              margin: "0 0 8px",
              fontFamily: "var(--font-urbanist), sans-serif",
            }}
          >
            {client}
          </p>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.3,
              margin: "0 0 16px",
              fontFamily: "var(--font-urbanist), sans-serif",
            }}
          >
            {title}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            right: 28,
            zIndex: 1,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid rgba(56,56,56,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.3s, background 0.3s",
            background: hovered ? "rgba(217,12,183,0.1)" : "transparent",
            borderColor: hovered ? "#d90cb7" : "rgba(56,56,56,0.9)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
              stroke={hovered ? "#d90cb7" : "rgba(255,255,255,0.5)"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "stroke 0.3s" }}
            />
          </svg>
        </div>
      </div>
    </a>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DAZNCaseStudy() {
  return (
    <main style={{ background: "#0a0a0a", color: "#ffffff" }}>
      <Header />

      {/* ════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════ */}
      <section style={{ paddingTop: 140, paddingBottom: 80, overflow: "hidden", background: "#0a0a0a" }}>
        <div
          className="case-hero-flex"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 80,
            paddingLeft: "max(40px, calc((100vw - 1360px) / 2 + 48px))",
          }}
        >
          {/* LEFT: tags + title + subtitle */}
          <motion.div
            className="case-hero-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            style={{ flex: "0 0 auto", maxWidth: 540 }}
          >
            <div style={{ marginBottom: 40 }}>
              <a
                href="/#work"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.5)", textDecoration: "none", fontFamily: "var(--font-urbanist), sans-serif", letterSpacing: "0.5px", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                All Work
              </a>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              {["Sports Streaming", "Web Design & Development", "App Design", "TV App", "Brand Design"].map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
            <h1 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 700, fontSize: "clamp(48px, 5.5vw, 84px)", lineHeight: 1.0, letterSpacing: "-0.03em", color: "#ffffff", margin: "0 0 28px" }}>DAZN</h1>
            <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: "clamp(16px, 1.4vw, 20px)", lineHeight: 1.65, color: "rgba(255,255,255,0.6)", margin: 0 }}>
              Redefining how millions of sports fans discover, watch, and experience premium live content — across web, mobile, and the living room.
            </p>
          </motion.div>

          {/* RIGHT: case image — 70% visible, 30% off-screen to the right */}
          <motion.div
            className="case-hero-right"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            style={{ flex: 1, minWidth: 0 }}
          >
            <div style={{ width: "143%", borderRadius: "20px 0 0 20px", overflow: "hidden", border: "1px solid rgba(56,56,56,0.6)", borderRight: "none" }}>
              <img src="/work/dazn.png" alt="DAZN platform redesign" style={{ width: "100%", height: 640, objectFit: "cover", objectPosition: "top center", display: "block" }} />
            </div>
          </motion.div>
        </div>
        <style jsx global>{`
          @media (max-width: 860px) {
            .case-hero-flex { flex-direction: column !important; gap: 48px !important; padding-left: 24px !important; }
            .case-hero-left { max-width: 100% !important; }
            .case-hero-right > div { width: 100% !important; border-radius: 20px !important; border-right: 1px solid rgba(56,56,56,0.6) !important; }
            .case-hero-right img { height: 280px !important; }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════
          OVERVIEW
      ════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              paddingTop: 64,
              alignItems: "start",
            }}
            className="dazn-overview-grid"
          >
            {/* Left — description */}
            <motion.div {...fadeUp(0)}>
              <Eyebrow>Overview</Eyebrow>
              <h2
                style={{
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(28px, 3vw, 42px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                  margin: "0 0 28px",
                }}
              >
                A global sports platform built for the&nbsp;modern fan
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-geist), sans-serif",
                  fontWeight: 300,
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.6)",
                  margin: "0 0 20px",
                }}
              >
                DAZN is one of the world&apos;s leading sports streaming
                platforms — delivering live and on-demand coverage of boxing,
                football, MMA, and more to subscribers across 200+ countries.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-geist), sans-serif",
                  fontWeight: 300,
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                }}
              >
                Contrast partnered with DAZN to unify the product experience
                across all surfaces — from the marketing site and web app to
                native mobile apps and the TV/living-room experience — while
                reinforcing a bolder, more confident brand identity.
              </p>
            </motion.div>

            {/* Right — meta grid */}
            <motion.div
              {...fadeUp(0.1)}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0",
                border: "1px solid rgba(56,56,56,0.7)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {[
                { label: "Client", value: "DAZN" },
                { label: "Industry", value: "Sports Streaming" },
                { label: "Year", value: "2024" },
                { label: "Duration", value: "8 months" },
                { label: "Our Role", value: "Lead Design Partner" },
                { label: "Team Size", value: "4 designers, 2 devs" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    padding: "28px 28px",
                    borderBottom:
                      i < 4 ? "1px solid rgba(56,56,56,0.7)" : "none",
                    borderRight:
                      i % 2 === 0 ? "1px solid rgba(56,56,56,0.7)" : "none",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-urbanist), sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)",
                      margin: "0 0 8px",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-urbanist), sans-serif",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#ffffff",
                      margin: 0,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 860px) {
            .dazn-overview-grid {
              grid-template-columns: 1fr !important;
              gap: 48px !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION WITH IMAGES
      ════════════════════════════════════════════════ */}
      <section style={{ padding: "0 40px 100px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div
            style={{
              paddingTop: 64,
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 16,
            }}
            className="dazn-img-grid"
          >
            {/* Large image */}
            <motion.div
              {...fadeUp(0)}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(56,56,56,0.6)",
              }}
            >
              <img
                src="/work/dazn.png"
                alt="DAZN hero experience"
                style={{
                  width: "100%",
                  height: 480,
                  objectFit: "cover",
                  objectPosition: "top left",
                  display: "block",
                }}
              />
            </motion.div>

            {/* Stack of two smaller images */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <motion.div
                {...fadeUp(0.08)}
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(56,56,56,0.6)",
                  flex: 1,
                }}
              >
                <img
                  src="/work/dazn.png"
                  alt="DAZN sports grid"
                  style={{
                    width: "100%",
                    height: 232,
                    objectFit: "cover",
                    objectPosition: "center right",
                    display: "block",
                  }}
                />
              </motion.div>
              <motion.div
                {...fadeUp(0.14)}
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(56,56,56,0.6)",
                  flex: 1,
                  background: "rgba(217,12,183,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 232,
                }}
              >
                <img
                  src="/work/dazn.png"
                  alt="DAZN content cards"
                  style={{
                    width: "100%",
                    height: 232,
                    objectFit: "cover",
                    objectPosition: "bottom center",
                    display: "block",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 860px) {
            .dazn-img-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════
          CORE PROBLEM
      ════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "100px 40px",
          background: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow blob */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(118,12,217,0.12) 0%, rgba(217,12,183,0.06) 50%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1360, margin: "0 auto", position: "relative" }}>
          <Divider />
          <div style={{ paddingTop: 64 }}>
            <motion.div {...fadeUp(0)} style={{ marginBottom: 64 }}>
              <Eyebrow>Core Problem</Eyebrow>
            </motion.div>

            {/* Large statement */}
            <motion.h2
              {...fadeUp(0.05)}
              style={{
                fontFamily: "var(--font-urbanist), sans-serif",
                fontWeight: 600,
                fontSize: "clamp(32px, 4.5vw, 60px)",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                margin: "0 0 40px",
                maxWidth: 900,
              }}
            >
              A fractured experience across every screen was costing DAZN
              subscribers — and trust.
            </motion.h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
              }}
              className="dazn-problem-grid"
            >
              {[
                {
                  number: "01",
                  title: "Inconsistent UI Systems",
                  desc: "Web, mobile, and TV apps had diverged over years of siloed development — no shared component library, no unified visual language.",
                },
                {
                  number: "02",
                  title: "High Drop-off at Discovery",
                  desc: "Users couldn't easily surface live events they cared about. Navigation was buried, content surfacing relied on manual browsing.",
                },
                {
                  number: "03",
                  title: "Weak Brand Expression",
                  desc: "The visual identity felt generic — it didn't communicate the premium, high-intensity sports experience DAZN was delivering.",
                },
              ].map((item, i) => (
                <MouseFollowCard key={item.number} delay={i * 0.1}>
                  <span
                    style={{
                      fontFamily: "var(--font-urbanist), sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#d90cb7",
                      letterSpacing: "1px",
                      display: "block",
                      marginBottom: 20,
                    }}
                  >
                    {item.number}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-urbanist), sans-serif",
                      fontWeight: 600,
                      fontSize: 18,
                      color: "#ffffff",
                      margin: "0 0 12px",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-geist), sans-serif",
                      fontWeight: 300,
                      fontSize: 14,
                      lineHeight: 1.75,
                      color: "rgba(255,255,255,0.55)",
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </MouseFollowCard>
              ))}
            </div>
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 860px) {
            .dazn-problem-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════
          EXPLORATION
      ════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div
            style={{
              paddingTop: 64,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "start",
            }}
            className="dazn-exploration-grid"
          >
            {/* Left — text */}
            <motion.div {...fadeUp(0)}>
              <Eyebrow>Exploration</Eyebrow>
              <h2
                style={{
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(28px, 3vw, 42px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                  margin: "0 0 28px",
                }}
              >
                Understanding the fan before designing for them
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-geist), sans-serif",
                  fontWeight: 300,
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.6)",
                  margin: "0 0 20px",
                }}
              >
                We ran deep discovery sessions with DAZN&apos;s product, tech,
                and marketing teams — supplemented by interviews with active
                subscribers across the UK, Germany, and Spain.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-geist), sans-serif",
                  fontWeight: 300,
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                }}
              >
                We mapped full user journeys from first visit to post-match
                replay, identified friction points in the discovery flow, and
                benchmarked against the best streaming experiences globally.
              </p>
            </motion.div>

            {/* Right — insight cards */}
            <motion.div
              {...fadeUp(0.1)}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              {[
                {
                  icon: "◎",
                  insight:
                    "72% of users couldn't name the next live event they wanted to watch when asked mid-session.",
                },
                {
                  icon: "◎",
                  insight:
                    "Mobile sessions were 2.4× longer than web — but conversion to subscription happened 60% more on desktop.",
                },
                {
                  icon: "◎",
                  insight:
                    "TV app usage peaked at evenings/weekends but had a 34% higher abandon rate than mobile.",
                },
                {
                  icon: "◎",
                  insight:
                    "Users associated competitors with \"their sport\" — DAZN was seen as a second screen, not the primary destination.",
                },
              ].map((item, i) => (
                <MouseFollowCard key={i} delay={0.05 + i * 0.07} padding="20px 24px">
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ color: "#d90cb7", fontSize: 14, marginTop: 1, flexShrink: 0 }}>{item.icon}</span>
                    <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: 0 }}>{item.insight}</p>
                  </div>
                </MouseFollowCard>
              ))}
            </motion.div>
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 860px) {
            .dazn-exploration-grid {
              grid-template-columns: 1fr !important;
              gap: 48px !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════
          WHAT WE DID
      ════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div style={{ paddingTop: 64 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: 80,
                alignItems: "start",
              }}
              className="dazn-whatwedid-grid"
            >
              {/* Left — heading */}
              <motion.div {...fadeUp(0)}>
                <Eyebrow>What We Did</Eyebrow>
                <h2
                  style={{
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(28px, 3vw, 42px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  Design at every layer — from pixels to platform
                </h2>
              </motion.div>

              {/* Right — deliverables */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 0,
                  border: "1px solid rgba(56,56,56,0.7)",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
                className="dazn-deliverables-grid"
              >
                {[
                  {
                    num: "01",
                    title: "Design System",
                    desc: "Built a unified component library and token system spanning web, iOS, Android, and TV — enabling consistent, scalable UI across all surfaces.",
                  },
                  {
                    num: "02",
                    title: "Web Redesign",
                    desc: "Overhauled the marketing site and web app — cleaner navigation, better content hierarchy, and a checkout flow that doubled trial sign-ups.",
                  },
                  {
                    num: "03",
                    title: "Mobile App",
                    desc: "Redesigned the native iOS and Android apps with personalised content feeds, improved live event surfacing, and smoother watch experiences.",
                  },
                  {
                    num: "04",
                    title: "TV App Design",
                    desc: "Created a purpose-built TV experience optimised for 10-foot viewing — simplified navigation, bold content cards, and remote-first interactions.",
                  },
                  {
                    num: "05",
                    title: "Brand Refresh",
                    desc: "Sharpened the visual identity with a refined type system, a bolder colour palette, and new brand motion guidelines for campaign assets.",
                  },
                  {
                    num: "06",
                    title: "UX Research",
                    desc: "Conducted subscriber interviews, usability testing, and competitor analysis — grounding every design decision in real user behaviour.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.num}
                    {...fadeUp(i * 0.07)}
                    style={{
                      padding: "32px 28px",
                      borderBottom:
                        i < 4 ? "1px solid rgba(56,56,56,0.7)" : "none",
                      borderRight:
                        i % 2 === 0 ? "1px solid rgba(56,56,56,0.7)" : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-urbanist), sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#d90cb7",
                        letterSpacing: "1.5px",
                        display: "block",
                        marginBottom: 12,
                      }}
                    >
                      {item.num}
                    </span>
                    <h4
                      style={{
                        fontFamily: "var(--font-urbanist), sans-serif",
                        fontWeight: 600,
                        fontSize: 16,
                        color: "#ffffff",
                        margin: "0 0 10px",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: "var(--font-geist), sans-serif",
                        fontWeight: 300,
                        fontSize: 13,
                        lineHeight: 1.75,
                        color: "rgba(255,255,255,0.5)",
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 860px) {
            .dazn-whatwedid-grid {
              grid-template-columns: 1fr !important;
              gap: 48px !important;
            }
            .dazn-deliverables-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION WITH BLOCKS + IMAGES
      ════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <motion.div {...fadeUp(0)} style={{ paddingTop: 64, marginBottom: 64 }}>
            <Eyebrow>Highlights</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-urbanist), sans-serif",
                fontWeight: 600,
                fontSize: "clamp(28px, 3vw, 42px)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: "#ffffff",
                margin: 0,
                maxWidth: 600,
              }}
            >
              From discovery to delivery — the work that moved the needle
            </h2>
          </motion.div>

          {/* Alternating image + text blocks */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                title: "A unified design system for every screen",
                desc: "We built a shared token and component library that became the single source of truth for DAZN's design teams. Colours, typography, spacing, and interaction patterns — all documented, versioned, and aligned to the four main surfaces. This alone cut design-to-dev handoff time by over 40%.",
                imagePos: "top left",
                reverse: false,
              },
              {
                title: "Content discovery that actually works",
                desc: "We reimagined the content discovery experience from the ground up — introducing a personalised 'My Sports' rail, surface-level event cards with countdown timers, and a persistent live banner that surfaced in-progress matches regardless of where users were in the app.",
                imagePos: "center right",
                reverse: true,
              },
              {
                title: "A TV app built for the living room",
                desc: "The redesigned TV app was purpose-built for lean-back viewing. We stripped unnecessary navigation layers, introduced bold event cards optimised for 10-foot reading distances, and rethought the remote control interaction model — resulting in a dramatically simpler, more satisfying experience.",
                imagePos: "bottom center",
                reverse: false,
              },
            ].map((block, i) => (
              <motion.div
                key={i}
                {...fadeUp(0)}
                style={{
                  display: "grid",
                  gridTemplateColumns: block.reverse ? "1fr 1.3fr" : "1.3fr 1fr",
                  gap: 0,
                  borderRadius: 20,
                  border: "1px solid rgba(56,56,56,0.6)",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.015)",
                  minHeight: 380,
                }}
                className="dazn-block-row"
              >
                {/* Image */}
                <div
                  style={{
                    order: block.reverse ? 1 : 0,
                    overflow: "hidden",
                    borderRight: block.reverse
                      ? "none"
                      : "1px solid rgba(56,56,56,0.6)",
                    borderLeft: block.reverse
                      ? "1px solid rgba(56,56,56,0.6)"
                      : "none",
                  }}
                >
                  <img
                    src="/work/dazn.png"
                    alt={block.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: block.imagePos,
                      display: "block",
                    }}
                  />
                </div>

                {/* Text */}
                <div
                  style={{
                    order: block.reverse ? 0 : 1,
                    padding: "56px 52px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 20,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-urbanist), sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#d90cb7",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-urbanist), sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(20px, 2vw, 28px)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                      color: "#ffffff",
                      margin: 0,
                    }}
                  >
                    {block.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-geist), sans-serif",
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.75,
                      color: "rgba(255,255,255,0.55)",
                      margin: 0,
                    }}
                  >
                    {block.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 860px) {
            .dazn-block-row {
              grid-template-columns: 1fr !important;
            }
            .dazn-block-row > *:first-child {
              order: 0 !important;
              min-height: 240px;
            }
            .dazn-block-row > *:last-child {
              order: 1 !important;
              border-left: none !important;
              border-right: none !important;
              border-top: 1px solid rgba(56,56,56,0.6) !important;
              padding: 36px 28px !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════
          MORE CASE STUDIES
      ════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div style={{ paddingTop: 64 }}>
            <motion.div
              {...fadeUp(0)}
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: 40,
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <div>
                <Eyebrow>More Work</Eyebrow>
                <h2
                  style={{
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(28px, 3vw, 42px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  More Case Studies
                </h2>
              </div>
              <a
                href="/#work"
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

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
              className="dazn-more-grid"
            >
              <CaseCard
                client="Down"
                title="Dating App — 0→1 Product Design"
                tags={["Web Design & Development", "App Design"]}
                image="/work/down.png"
                href="/work/down"
                delay={0}
              />
              <CaseCard
                client="Cymbio"
                title="B2B Sales Dashboard"
                tags={["Web Design & Development"]}
                image="/work/cymbio.png"
                href="/work/cymbio"
                delay={0.1}
              />
            </div>
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 700px) {
            .dazn-more-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════
          CTA BANNER + FOOTER
      ════════════════════════════════════════════════ */}
      <CtaBanner />
      <Footer />
    </main>
  );
}
