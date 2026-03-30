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
  return <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.55)", padding: "5px 14px", borderRadius: 100, border: "1px solid rgba(56,56,56,0.9)", fontFamily: "var(--font-urbanist), sans-serif", whiteSpace: "nowrap" }}>{label}</span>;
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: "var(--font-urbanist), sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#d90cb7", margin: "0 0 20px" }}>{children}</p>;
}
function Divider() { return <div style={{ height: 1, background: "rgba(56,56,56,0.7)" }} />; }

function CaseCard({ client, title, tags, image, href, delay }: { client: string; title: string; tags: string[]; image: string; href: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => { if (!ref.current) return; const rect = ref.current.getBoundingClientRect(); setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top }); };
  const borderBg = hovered ? `radial-gradient(circle 320px at ${mouse.x}px ${mouse.y}px, #d90cb7 0%, rgba(56,56,56,0.62) 55%)` : "rgba(56,56,56,0.62)";
  const spotlightBg = `radial-gradient(circle 360px at ${mouse.x - 1}px ${mouse.y - 1}px, rgba(217,12,183,0.12) 0%, transparent 70%)`;
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} style={{ flex: "1 1 0" }}>
      <a ref={ref} href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onMouseMove={handleMouseMove} style={{ display: "block", padding: 1, borderRadius: 17, background: borderBg, transition: hovered ? "none" : "background 0.4s ease", textDecoration: "none" }}>
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

export default function DesignrrCaseStudy() {
  return (
    <main style={{ background: "#0a0a0a", color: "#ffffff" }}>
      <Header />

      {/* HERO */}
      <section style={{ paddingTop: 140, paddingBottom: 80, overflow: "hidden" }}>
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
              <Tag label="SaaS / Content" />
              <Tag label="UX & Product Design" />
              <Tag label="Web Design & Development" />
            </div>
            <h1 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 700, fontSize: "clamp(48px, 5.5vw, 84px)", lineHeight: 1.0, letterSpacing: "-0.03em", color: "#ffffff", margin: "0 0 28px" }}>Designrr</h1>
            <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: "clamp(16px, 1.4vw, 20px)", lineHeight: 1.65, color: "rgba(255,255,255,0.6)", margin: 0 }}>
              A deep UX overhaul that turned a complex content creation tool into an experience users genuinely enjoy — driving a 97% increase in engagement.
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
              <img src="/work/designrr.png" alt="Designrr platform" style={{ width: "100%", height: 640, objectFit: "cover", objectPosition: "top center", display: "block" }} />
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
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, paddingTop: 64, alignItems: "start" }} className="case-overview-grid">
            <motion.div {...fadeUp(0)}>
              <Eyebrow>Overview</Eyebrow>
              <h2 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "#ffffff", margin: "0 0 28px" }}>Turning a powerful tool into a product people love using</h2>
              <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: "0 0 20px" }}>
                Designrr is a content creation platform that lets marketers, authors, and course creators turn existing content into beautiful eBooks, lead magnets, and digital products — fast.
              </p>
              <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                Despite having powerful features, users weren&apos;t experiencing the &quot;aha moment&quot; fast enough — and many were churning before completing their first project. Contrast applied the Hero Framework to redesign the onboarding and core editor experience, resulting in a 97% lift in engagement.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.1)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid rgba(56,56,56,0.7)", borderRadius: 16, overflow: "hidden" }}>
              {[{ label: "Client", value: "Designrr" }, { label: "Industry", value: "SaaS / Content" }, { label: "Year", value: "2023" }, { label: "Duration", value: "4 months" }, { label: "Our Role", value: "UX & Product Design" }, { label: "Result", value: "+97% engagement" }].map((item, i) => (
                <div key={item.label} style={{ padding: "28px 28px", borderBottom: i < 4 ? "1px solid rgba(56,56,56,0.7)" : "none", borderRight: i % 2 === 0 ? "1px solid rgba(56,56,56,0.7)" : "none" }}>
                  <p style={{ fontFamily: "var(--font-urbanist), sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 8px" }}>{item.label}</p>
                  <p style={{ fontFamily: "var(--font-urbanist), sans-serif", fontSize: 16, fontWeight: 600, color: item.label === "Result" ? "#d90cb7" : "#ffffff", margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <style jsx global>{`@media (max-width: 860px) { .case-overview-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
      </section>

      {/* SECTION WITH IMAGES */}
      <section style={{ padding: "0 40px 100px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div style={{ paddingTop: 64, display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16 }} className="case-img-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <motion.div {...fadeUp(0)} style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(56,56,56,0.6)", flex: 1 }}>
                <img src="/work/designrr.png" alt="Designrr layout chooser" style={{ width: "100%", height: 232, objectFit: "cover", objectPosition: "top center", display: "block" }} />
              </motion.div>
              <motion.div {...fadeUp(0.08)} style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(56,56,56,0.6)", flex: 1 }}>
                <img src="/work/designrr.png" alt="Designrr template" style={{ width: "100%", height: 232, objectFit: "cover", objectPosition: "bottom center", display: "block" }} />
              </motion.div>
            </div>
            <motion.div {...fadeUp(0.06)} style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(56,56,56,0.6)" }}>
              <img src="/work/designrr.png" alt="Designrr editor" style={{ width: "100%", height: 480, objectFit: "cover", objectPosition: "center center", display: "block" }} />
            </motion.div>
          </div>
        </div>
        <style jsx global>{`@media (max-width: 860px) { .case-img-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* CORE PROBLEM */}
      <section style={{ padding: "100px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(118,12,217,0.12) 0%, rgba(217,12,183,0.06) 50%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1360, margin: "0 auto", position: "relative" }}>
          <Divider />
          <div style={{ paddingTop: 64 }}>
            <motion.div {...fadeUp(0)} style={{ marginBottom: 64 }}><Eyebrow>Core Problem</Eyebrow></motion.div>
            <motion.h2 {...fadeUp(0.05)} style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: "clamp(32px, 4.5vw, 60px)", lineHeight: 1.12, letterSpacing: "-0.02em", color: "#ffffff", margin: "0 0 40px", maxWidth: 900 }}>
              Users couldn&apos;t find the value fast enough — and left before they ever did.
            </motion.h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }} className="case-problem-grid">
              {[
                { number: "01", title: "Delayed Aha Moment", desc: "Users had to navigate a complex setup flow and make a series of unfamiliar decisions before producing anything. Most churned before ever completing a project." },
                { number: "02", title: "Editor Overwhelm", desc: "The editor offered enormous capability — but without progressive disclosure, new users were confronted with a dense interface that felt intimidating rather than empowering." },
                { number: "03", title: "Weak Retention Loop", desc: "There was no mechanism pulling users back after their first session. No saved progress notifications, no social sharing moments, no achievement signals that made them want to return." },
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
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div style={{ paddingTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="case-exploration-grid">
            <motion.div {...fadeUp(0)}>
              <Eyebrow>Exploration</Eyebrow>
              <h2 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "#ffffff", margin: "0 0 28px" }}>Mapping the gap between what users wanted and what they experienced</h2>
              <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: "0 0 20px" }}>
                We applied the Hero Framework — conducting motivation-based research to understand what users were truly trying to accomplish when they signed up for Designrr. Their goal wasn&apos;t to &quot;use a tool&quot; — it was to feel like a professional creator.
              </p>
              <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                We analysed session recordings, exit surveys, and funnel data — pinpointing exactly which screens caused users to abandon, and what they were trying to do when they gave up.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.1)} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "68% of trial users who churned had never completed a single project — they gave up before reaching the export screen.",
                "The layout selection screen had the highest abandonment rate in the funnel — users didn't understand what they were choosing or how to change it later.",
                "Users who reached the \"first export\" moment had a 3.8× higher 30-day retention rate than those who didn't.",
                "In exit surveys, the #1 reason given for cancellation was \"it felt too complicated\" — not price, not missing features.",
              ].map((insight, i) => (
                <MouseFollowCard key={i} delay={0.05 + i * 0.07} padding="20px 24px">
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ color: "#d90cb7", fontSize: 14, marginTop: 1, flexShrink: 0 }}>◎</span>
                    <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: 0 }}>{insight}</p>
                  </div>
                </MouseFollowCard>
              ))}
            </motion.div>
          </div>
        </div>
        <style jsx global>{`@media (max-width: 860px) { .case-exploration-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
      </section>

      {/* WHAT WE DID */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div style={{ paddingTop: 64 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }} className="case-whatwedid-grid">
              <motion.div {...fadeUp(0)}>
                <Eyebrow>What We Did</Eyebrow>
                <h2 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "#ffffff", margin: 0 }}>Redesigning for the moment of magic</h2>
              </motion.div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid rgba(56,56,56,0.7)", borderRadius: 16, overflow: "hidden" }} className="case-deliverables-grid">
                {[
                  { num: "01", title: "Onboarding Redesign", desc: "Rebuilt the onboarding flow to surface a finished, beautiful template immediately — letting users experience the product's value before they'd invested any effort." },
                  { num: "02", title: "Editor UX Simplification", desc: "Implemented progressive disclosure across the editor — hiding advanced tools behind contextual panels, and surfacing only what was relevant to the current task." },
                  { num: "03", title: "Layout Selection UX", desc: "Replaced the static layout picker with a live preview system — users could see exactly what their content would look like in each template before committing." },
                  { num: "04", title: "First-Project Momentum", desc: "Designed a guided first-project flow with smart defaults, contextual hints, and a clear progress indicator — reducing time-to-first-export by over 60%." },
                  { num: "05", title: "Retention Triggers", desc: "Introduced milestone moments — first export, first share, first download — with celebratory micro-interactions that reinforced the user&apos;s identity as a creator." },
                  { num: "06", title: "Hero Framework Application", desc: "Used the Hero Framework throughout — framing every interaction around the user&apos;s desired transformation, not the tool's feature set." },
                ].map((item, i) => (
                  <motion.div key={item.num} {...fadeUp(i * 0.07)} style={{ padding: "32px 28px", borderBottom: i < 4 ? "1px solid rgba(56,56,56,0.7)" : "none", borderRight: i % 2 === 0 ? "1px solid rgba(56,56,56,0.7)" : "none" }}>
                    <span style={{ fontFamily: "var(--font-urbanist), sans-serif", fontSize: 11, fontWeight: 700, color: "#d90cb7", letterSpacing: "1.5px", display: "block", marginBottom: 12 }}>{item.num}</span>
                    <h4 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: 16, color: "#ffffff", margin: "0 0 10px", lineHeight: 1.3 }}>{item.title}</h4>
                    <p style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 300, fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,0.5)", margin: 0 }} dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`@media (max-width: 860px) { .case-whatwedid-grid { grid-template-columns: 1fr !important; gap: 48px !important; } .case-deliverables-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* HIGHLIGHTS */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <motion.div {...fadeUp(0)} style={{ paddingTop: 64, marginBottom: 64 }}>
            <Eyebrow>Highlights</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "#ffffff", margin: 0, maxWidth: 600 }}>+97% engagement — by designing for the transformation, not the tool</h2>
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { title: "Onboarding that builds momentum, not friction", desc: "We rebuilt the onboarding flow around a single principle: get the user to a finished, beautiful output as fast as possible. By surfacing a pre-populated template immediately and using smart defaults, users reached their first completed project in under 4 minutes — down from an average of 18.", imagePos: "top center", reverse: false },
              { title: "An editor that reveals itself at the right pace", desc: "The redesigned editor uses progressive disclosure to show only what's relevant to the current task. Advanced formatting, media tools, and export options are available — but they don't compete for attention until they're needed. The result: less overwhelm, more momentum.", imagePos: "center left", reverse: true },
              { title: "Moments that make users feel like creators", desc: "We introduced milestone micro-interactions at key moments — first layout applied, first section added, first project exported. These brief, celebratory signals reaffirmed the user's identity as a creator and meaningfully increased day-7 and day-30 retention.", imagePos: "bottom center", reverse: false },
            ].map((block, i) => (
              <motion.div key={i} {...fadeUp(0)} style={{ display: "grid", gridTemplateColumns: block.reverse ? "1fr 1.3fr" : "1.3fr 1fr", gap: 0, borderRadius: 20, border: "1px solid rgba(56,56,56,0.6)", overflow: "hidden", background: "rgba(255,255,255,0.015)", minHeight: 380 }} className="case-block-row">
                <div style={{ order: block.reverse ? 1 : 0, overflow: "hidden", borderRight: block.reverse ? "none" : "1px solid rgba(56,56,56,0.6)", borderLeft: block.reverse ? "1px solid rgba(56,56,56,0.6)" : "none" }}>
                  <img src="/work/designrr.png" alt={block.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: block.imagePos, display: "block" }} />
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
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div style={{ paddingTop: 64 }}>
            <motion.div {...fadeUp(0)} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, gap: 24, flexWrap: "wrap" }}>
              <div><Eyebrow>More Work</Eyebrow><h2 style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "#ffffff", margin: 0 }}>More Case Studies</h2></div>
              <a href="/#work" className="btn-gradient-border" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "12px 24px", borderRadius: 9999, fontSize: 14, fontWeight: 600, color: "#ffffff", textDecoration: "none", flexShrink: 0, fontFamily: "var(--font-urbanist), sans-serif" }}>
                View All Work
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="case-more-grid">
              <CaseCard client="JUSTT" title="Chargeback Management SaaS" tags={["Web Design & Development"]} image="/work/justt.png" href="/work/justt" delay={0} />
              <CaseCard client="DAZN" title="Premium Sports Platform Redesign" tags={["Web Design & Development", "App Design", "TV App", "Brand Design"]} image="/work/dazn.png" href="/work/dazn" delay={0.1} />
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
