"use client";

import { motion } from "framer-motion";

export default function CtaBanner() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: 508,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 115,
        paddingBottom: 300,
      }}
    >
      {/* ── Background gradient container ── */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: 508,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* Blob 1 — large violet→pink pill */}
        <div style={{
          position: "absolute", left: "50%", top: -387,
          transform: "translate(calc(-50% + 22.86px), 0) rotate(180deg)",
          width: 1279, height: 765, borderRadius: 1146,
          background: "linear-gradient(to bottom, rgba(118,12,217,0.75), rgba(217,12,183,0.75))",
          filter: "blur(92.75px)", opacity: 0.65,
        }} />
        {/* Blob 2 — color-dodge brightening layer */}
        <div style={{
          position: "absolute", left: "50%", top: -335,
          transform: "translate(calc(-50% + 22.86px), 0) rotate(180deg)",
          width: 1386, height: 447, borderRadius: 1146,
          background: "linear-gradient(to bottom, rgba(118,12,217,0.75), rgba(217,12,183,0.75))",
          filter: "blur(69.65px)", mixBlendMode: "color-dodge",
        }} />
        {/* Arc glow */}
        <div style={{ position: "absolute", left: 12, top: -54, width: 1369, height: 411, mixBlendMode: "plus-lighter" }}>
          <img src="/cta-glow-arc.svg" alt="" style={{
            position: "absolute", top: "-19.05%", right: "-5.72%", bottom: "-19.05%", left: "-5.72%",
            width: "auto", height: "auto", display: "block",
          }} />
        </div>
      </div>

      {/* ── "WE BELIEVE IN" ── */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          position: "relative", zIndex: 1,
          fontFamily: "var(--font-urbanist), sans-serif",
          fontWeight: 300, fontSize: 45, lineHeight: "43.931px",
          letterSpacing: "14.4px", textTransform: "uppercase",
          color: "#ffffff", textAlign: "center", margin: 0,
        }}
      >
        We believe in
      </motion.p>

      {/* ── "Constant learning" ── */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        style={{
          position: "relative", zIndex: 1,
          fontFamily: "var(--font-urbanist), sans-serif",
          fontWeight: 700, fontSize: "clamp(64px, 8.5vw, 112px)",
          lineHeight: 1, letterSpacing: "-2.24px",
          textAlign: "center", margin: "8px 0 0", color: "#ffffff",
        }}
      >
        Constant learning
      </motion.h2>

      {/* ── CTA button ── */}
      <motion.a
        href="#contact"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
        className="btn-gradient-border"
        style={{
          position: "relative", zIndex: 1,
          marginTop: 56, display: "inline-flex", alignItems: "center", gap: 8,
          padding: "12px 24px", borderRadius: 52, textDecoration: "none",
          fontSize: 14, fontWeight: 600, letterSpacing: "0.14px",
          color: "#ffffff", fontFamily: "var(--font-urbanist), sans-serif",
          whiteSpace: "nowrap",
        }}
      >
        Book a call
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 8.5L8.5 1.5M8.5 1.5H2.5M8.5 1.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  );
}
