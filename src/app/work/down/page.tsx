"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { MouseFollowCard } from "@/components/work/MouseFollowCard";
import Header from "@/components/Header";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

function Tag({ label }: { label: string }) {
  return (
    <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.55)", padding: "5px 14px", borderRadius: 100, border: "1px solid rgba(56,56,56,0.9)", fontFamily: "var(--font-urbanist), sans-serif", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "var(--font-urbanist), sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#d90cb7", margin: "0 0 20px" }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(56,56,56,0.7)" }} />;
}

function CaseCard({ client, title, tags, image, href, delay }: { client: string; title: string; tags: string[]; image: string; href: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const borderBg = hovered ? `radial-gradient(circle 320px at ${mouse.x}px ${mouse.y}px, #d90cb7 0%, rgba(56,56,56,0.62) 55%)` : "rgba(56,56,56,0.62)";
  const spotlightBg = `radial-gradient(circle 360px at ${mouse.x - 1}px ${mouse.y - 1}px, rgba(217,12,183,0.12) 0%, transparent 70%)`;

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} style={{ flex: "1 1 0" }}>
      <a ref={ref} href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onMouseMove={handleMouseMove}
        style={{ display: "block", padding: 1, borderRadius: 17, background: borderBg, transition: hovered ? "none" : "background 0.4s ease", textDecoration: "none" }}>
        <div style={{ borderRadius: 16, background: "#0a0a0a", padding: 28, display: "flex", flexDirection: "column", gap: 20, position: "relative", overflow: "hidden", height: "100%" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: hovered ? 1 : 0, transition: hovered ? "none" : "opacity 0.4s ease", background: spotlightBg, zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1, width: "100%", height: 180, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
            <img src={image} alt={client} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", transition: "transform 0.5s ease", transform: hovered ? "scale(1.03)" : "scale(1)" }} />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: "0 0 8px", fontFamily: "var(--font-urbanist), sans-serif" }}>{client}</p>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "#ffffff", lineHeight: 1.3, margin: "0 0 16px", fontFamily: "var(--font-urbanist), sans-serif" }}>{title}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{tags.map(t => <Tag key={t} label={t} />)}</div>
          </div>
          <div style={{ position: "absolute", bottom: 28, right: 28, zIndex: 1, width: 36, height: 36, borderRadius: "50%", border: `1px solid ${hovered ? "#d90cb7" : "rgba(56,56,56,0.9)"}`, display: "flex", alignItems: "center", justifyContent: "center", background: hovered ? "rgba(217,12,183,0.1)" : "transparent", transition: "all 0.3s" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke={hovered ? "#d90cb7" : "rgba(255,255,255,0.5)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function DownCaseStudy() {
  return (
    <main style={{ background: "#0a0a0a", color: "#ffffff" }}>
      <Header />

      {/* HERO */}
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
                onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                All Work
              </a>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              <Tag label="Social / Dating" />
              <Tag label="Full Product Design" />
              <Tag label="App Design" />
            </div>
            <h1 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 700, fontSize: "clamp(48px, 5.5vw, 84px)", lineHeight: 1.0, letterSpacing: "-0.03em", color: "#ffffff", margin: "0 0 28px" }}>Down</h1>
            <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: "clamp(16px, 1.4vw, 20px)", lineHeight: 1.65, color: "rgba(255,255,255,0.6)", margin: 0 }}>
              Building a dating app from zero — a product that authentically serves the modern generation&apos;s approach to relationships, connection, and self-expression.
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
              <img src="/work/down.png" alt="Down app design" style={{ width: "100%", height: 640, objectFit: "cover", objectPosition: "center center", display: "block" }} />
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

      {/* OVERVIEW */}
      <section style={{ padding: "100px 40px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, paddingTop: 64, alignItems: "start" }} className="case-overview-grid">
            <motion.div {...fadeUp(0)}>
              <Eyebrow>Overview</Eyebrow>
              <h2 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "#ffffff", margin: "0 0 28px" }}>
                A dating app designed for how Gen Z actually connects
              </h2>
              <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: "0 0 20px" }}>
                Down set out to redefine the dating app space — moving away from the swipe-fatigue of incumbents and toward a more intentional, personality-first approach to connection.
              </p>
              <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                Contrast owned the full product design — from brand identity and onboarding flows through to the core matching experience, profile system, and marketing site — delivering a polished, launch-ready product.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.1)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid rgba(56,56,56,0.7)", borderRadius: 16, overflow: "hidden" }}>
              {[{ label: "Client", value: "Down" }, { label: "Industry", value: "Social / Dating" }, { label: "Year", value: "2024" }, { label: "Duration", value: "6 months" }, { label: "Our Role", value: "Full Product Design" }, { label: "Platforms", value: "iOS, Android, Web" }].map((item, i) => (
                <div key={item.label} style={{ padding: "28px 28px", borderBottom: i < 4 ? "1px solid rgba(56,56,56,0.7)" : "none", borderRight: i % 2 === 0 ? "1px solid rgba(56,56,56,0.7)" : "none" }}>
                  <p style={{ fontFamily: "var(--font-urbanist), sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 8px" }}>{item.label}</p>
                  <p style={{ fontFamily: "var(--font-urbanist), sans-serif", fontSize: 16, fontWeight: 600, color: "#ffffff", margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <style jsx global>{`.case-overview-grid { } @media (max-width: 860px) { .case-overview-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
      </section>

      {/* SECTION WITH IMAGES */}
      <section style={{ padding: "0 40px 100px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div style={{ paddingTop: 64, display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16 }} className="case-img-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <motion.div {...fadeUp(0)} style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(56,56,56,0.6)", flex: 1 }}>
                <img src="/work/down.png" alt="Down onboarding" style={{ width: "100%", height: 232, objectFit: "cover", objectPosition: "top center", display: "block" }} />
              </motion.div>
              <motion.div {...fadeUp(0.08)} style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(56,56,56,0.6)", flex: 1 }}>
                <img src="/work/down.png" alt="Down profile" style={{ width: "100%", height: 232, objectFit: "cover", objectPosition: "bottom center", display: "block" }} />
              </motion.div>
            </div>
            <motion.div {...fadeUp(0.06)} style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(56,56,56,0.6)" }}>
              <img src="/work/down.png" alt="Down matching" style={{ width: "100%", height: 480, objectFit: "cover", objectPosition: "center center", display: "block" }} />
            </motion.div>
          </div>
        </div>
        <style jsx global>{`@media (max-width: 860px) { .case-img-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* CORE PROBLEM */}
      <section style={{ padding: "100px 40px", background: "#0a0a0a", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(118,12,217,0.12) 0%, rgba(217,12,183,0.06) 50%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1360, margin: "0 auto", position: "relative" }}>
          <Divider />
          <div style={{ paddingTop: 64 }}>
            <motion.div {...fadeUp(0)} style={{ marginBottom: 64 }}><Eyebrow>Core Problem</Eyebrow></motion.div>
            <motion.h2 {...fadeUp(0.05)} style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: "clamp(32px, 4.5vw, 60px)", lineHeight: 1.12, letterSpacing: "-0.02em", color: "#ffffff", margin: "0 0 40px", maxWidth: 900 }}>
              Dating apps had become a chore — not a genuine path to connection.
            </motion.h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }} className="case-problem-grid">
              {[
                { number: "01", title: "Swipe-Loop Fatigue", desc: "Users were exhausted by infinite low-quality matching. The experience felt like a game with no real outcome — high volume, low intent." },
                { number: "02", title: "Identity Over Authenticity", desc: "Existing profiles were shallow — a photo and a bio. There was no mechanism to surface genuine personality, interests, or compatibility signals." },
                { number: "03", title: "Onboarding Drop-off", desc: "Most dating apps lose 60%+ of sign-ups during onboarding. The process needed to feel fast, personal, and valuable from the very first screen." },
              ].map((item, i) => (
                <MouseFollowCard key={item.number} delay={i * 0.1}>
                  <span style={{ fontFamily: "var(--font-urbanist), sans-serif", fontSize: 13, fontWeight: 700, color: "#d90cb7", letterSpacing: "1px", display: "block", marginBottom: 20 }}>{item.number}</span>
                  <h3 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: 18, color: "#ffffff", margin: "0 0 12px", lineHeight: 1.3 }}>{item.title}</h3>
                  <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", margin: 0 }}>{item.desc}</p>
                </MouseFollowCard>
              ))}
            </div>
          </div>
        </div>
        <style jsx global>{`@media (max-width: 860px) { .case-problem-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* EXPLORATION */}
      <section style={{ padding: "100px 40px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div style={{ paddingTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="case-exploration-grid">
            <motion.div {...fadeUp(0)}>
              <Eyebrow>Exploration</Eyebrow>
              <h2 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "#ffffff", margin: "0 0 28px" }}>Mapping how a generation actually wants to meet people</h2>
              <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: "0 0 20px" }}>
                We conducted extensive discovery — behavioural interviews with 18–28 year-olds across four markets, competitive audits of Hinge, Bumble, and Tinder, and a full taxonomy of what makes a &quot;match&quot; feel meaningful.
              </p>
              <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                We mapped the full emotional journey from app download to first date — identifying the exact moments where anxiety, decision fatigue, and boredom caused users to disengage.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.1)} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { insight: "Users aged 22–26 reported spending an average of 47 minutes per day on dating apps — but initiating fewer than 3 real conversations per week." },
                { insight: "83% said they&apos;d continue using an app if it helped them \"feel like themselves\" during the experience — vs. performing a curated version." },
                { insight: "Onboarding completion increased by 2.3× when users were shown real matches during sign-up, before finishing setup." },
                { insight: "The most-trusted signal of compatibility wasn&apos;t looks or location — it was shared &quot;vibe&quot;, typically expressed through music, humour, and lifestyle content." },
              ].map((item, i) => (
                <MouseFollowCard key={i} delay={0.05 + i * 0.07} padding="20px 24px">
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ color: "#d90cb7", fontSize: 14, marginTop: 1, flexShrink: 0 }}>◎</span>
                    <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: 0 }} dangerouslySetInnerHTML={{ __html: item.insight }} />
                  </div>
                </MouseFollowCard>
              ))}
            </motion.div>
          </div>
        </div>
        <style jsx global>{`@media (max-width: 860px) { .case-exploration-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
      </section>

      {/* WHAT WE DID */}
      <section style={{ padding: "100px 40px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div style={{ paddingTop: 64 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }} className="case-whatwedid-grid">
              <motion.div {...fadeUp(0)}>
                <Eyebrow>What We Did</Eyebrow>
                <h2 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "#ffffff", margin: 0 }}>End-to-end product design for a category-defining app</h2>
              </motion.div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid rgba(56,56,56,0.7)", borderRadius: 16, overflow: "hidden" }} className="case-deliverables-grid">
                {[
                  { num: "01", title: "Brand Identity", desc: "Created Down's full visual identity — logo, colour palette, typography system, and tone of voice — built to feel warm, playful, and distinctly non-corporate." },
                  { num: "02", title: "Onboarding Flow", desc: "Designed a 5-step onboarding that surfaces real matches before completion — reducing drop-off and building excitement from the first interaction." },
                  { num: "03", title: "Matching Experience", desc: "Replaced the standard swipe paradigm with intent-based cards — giving users more context before matching and reducing low-quality connections." },
                  { num: "04", title: "Profile System", desc: "Built a multi-layered profile architecture — photos, prompts, vibe tags, and audio snippets — giving personality the room to come through." },
                  { num: "05", title: "iOS & Android Apps", desc: "Delivered production-ready native designs for both platforms — with full design specs, component documentation, and handoff assets." },
                  { num: "06", title: "Marketing Site", desc: "Designed and developed the Down marketing site — conveying the brand vision and converting curious visitors into app downloads." },
                ].map((item, i) => (
                  <motion.div key={item.num} {...fadeUp(i * 0.07)} style={{ padding: "32px 28px", borderBottom: i < 4 ? "1px solid rgba(56,56,56,0.7)" : "none", borderRight: i % 2 === 0 ? "1px solid rgba(56,56,56,0.7)" : "none" }}>
                    <span style={{ fontFamily: "var(--font-urbanist), sans-serif", fontSize: 11, fontWeight: 700, color: "#d90cb7", letterSpacing: "1.5px", display: "block", marginBottom: 12 }}>{item.num}</span>
                    <h4 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: 16, color: "#ffffff", margin: "0 0 10px", lineHeight: 1.3 }}>{item.title}</h4>
                    <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,0.5)", margin: 0 }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`@media (max-width: 860px) { .case-whatwedid-grid { grid-template-columns: 1fr !important; gap: 48px !important; } .case-deliverables-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* HIGHLIGHTS */}
      <section style={{ padding: "100px 40px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <motion.div {...fadeUp(0)} style={{ paddingTop: 64, marginBottom: 64 }}>
            <Eyebrow>Highlights</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "#ffffff", margin: 0, maxWidth: 600 }}>
              Designing for feeling, not just function
            </h2>
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { title: "An onboarding that builds anticipation", desc: "Instead of asking users to fill out a profile before seeing any value, we flipped the flow — showing curated potential matches during sign-up. By the time users finished, they already had a reason to care. Completion rates exceeded benchmarks by 2.3×.", imagePos: "top center", reverse: false },
              { title: "Profiles that show who you actually are", desc: "We replaced the photo-and-bio template with a multi-layer profile system. Users could add personality prompts, vibe tags, and optional audio snippets — giving matches genuine signals about compatibility, not just appearances.", imagePos: "center center", reverse: true },
              { title: "A brand that feels like the users it serves", desc: "Down's visual identity was built to feel warm, irreverent, and real. A bold typographic system, a vibrant-but-refined colour palette, and motion guidelines that make the app feel alive — without ever feeling try-hard.", imagePos: "bottom center", reverse: false },
            ].map((block, i) => (
              <motion.div key={i} {...fadeUp(0)} style={{ display: "grid", gridTemplateColumns: block.reverse ? "1fr 1.3fr" : "1.3fr 1fr", gap: 0, borderRadius: 20, border: "1px solid rgba(56,56,56,0.6)", overflow: "hidden", background: "rgba(255,255,255,0.015)", minHeight: 380 }} className="case-block-row">
                <div style={{ order: block.reverse ? 1 : 0, overflow: "hidden", borderRight: block.reverse ? "none" : "1px solid rgba(56,56,56,0.6)", borderLeft: block.reverse ? "1px solid rgba(56,56,56,0.6)" : "none" }}>
                  <img src="/work/down.png" alt={block.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: block.imagePos, display: "block" }} />
                </div>
                <div style={{ order: block.reverse ? 0 : 1, padding: "56px 52px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
                  <span style={{ fontFamily: "var(--font-urbanist), sans-serif", fontSize: 11, fontWeight: 700, color: "#d90cb7", letterSpacing: "2px", textTransform: "uppercase" }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: "clamp(20px, 2vw, 28px)", lineHeight: 1.2, letterSpacing: "-0.01em", color: "#ffffff", margin: 0 }}>{block.title}</h3>
                  <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", margin: 0 }}>{block.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <style jsx global>{`@media (max-width: 860px) { .case-block-row { grid-template-columns: 1fr !important; } .case-block-row > *:first-child { order: 0 !important; min-height: 240px; } .case-block-row > *:last-child { order: 1 !important; border-left: none !important; border-right: none !important; border-top: 1px solid rgba(56,56,56,0.6) !important; padding: 36px 28px !important; } }`}</style>
      </section>

      {/* MORE CASE STUDIES */}
      <section style={{ padding: "100px 40px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div style={{ paddingTop: 64 }}>
            <motion.div {...fadeUp(0)} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, gap: 24, flexWrap: "wrap" }}>
              <div>
                <Eyebrow>More Work</Eyebrow>
                <h2 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "#ffffff", margin: 0 }}>More Case Studies</h2>
              </div>
              <a href="/#work" className="btn-gradient-border" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "12px 24px", borderRadius: 9999, fontSize: 14, fontWeight: 600, color: "#ffffff", textDecoration: "none", flexShrink: 0, fontFamily: "var(--font-urbanist), sans-serif" }}>
                View All Work
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="case-more-grid">
              <CaseCard client="Cymbio" title="B2B Sales Dashboard" tags={["Web Design & Development"]} image="/work/cymbio.png" href="/work/cymbio" delay={0} />
              <CaseCard client="Designrr" title="Engagement & Retention Overhaul" tags={["Web Design & Development"]} image="/work/designrr.png" href="/work/designrr" delay={0.1} />
            </div>
          </div>
        </div>
        <style jsx global>{`@media (max-width: 700px) { .case-more-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
