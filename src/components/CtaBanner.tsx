"use client";

import { motion } from "framer-motion";

// Star field — static positions seeded so they don't shift on re-render
const STARS = [
  { x: 5.2, y: 12.4, r: 1.2 }, { x: 11.7, y: 38.1, r: 0.8 }, { x: 18.3, y: 7.6, r: 1.0 },
  { x: 24.9, y: 55.2, r: 0.6 }, { x: 31.4, y: 22.8, r: 1.4 }, { x: 37.8, y: 71.3, r: 0.9 },
  { x: 44.1, y: 15.9, r: 0.7 }, { x: 50.6, y: 44.7, r: 1.1 }, { x: 57.2, y: 83.4, r: 0.8 },
  { x: 63.5, y: 30.1, r: 1.3 }, { x: 70.0, y: 61.8, r: 0.6 }, { x: 76.4, y: 9.3, r: 1.0 },
  { x: 82.9, y: 48.5, r: 0.9 }, { x: 89.3, y: 27.6, r: 1.2 }, { x: 94.8, y: 67.2, r: 0.7 },
  { x: 8.6, y: 79.5, r: 1.1 }, { x: 15.1, y: 52.3, r: 0.8 }, { x: 21.7, y: 91.6, r: 0.6 },
  { x: 28.2, y: 35.7, r: 1.3 }, { x: 34.6, y: 68.4, r: 0.9 }, { x: 41.3, y: 19.2, r: 1.0 },
  { x: 47.8, y: 87.1, r: 0.7 }, { x: 54.4, y: 42.9, r: 1.4 }, { x: 60.9, y: 74.6, r: 0.8 },
  { x: 67.5, y: 11.3, r: 1.1 }, { x: 74.0, y: 56.8, r: 0.6 }, { x: 80.6, y: 33.5, r: 1.2 },
  { x: 87.2, y: 88.9, r: 0.9 }, { x: 93.7, y: 21.4, r: 0.7 }, { x: 2.8, y: 45.6, r: 1.0 },
  { x: 48.3, y: 3.7, r: 0.8 }, { x: 72.9, y: 95.2, r: 0.6 }, { x: 16.4, y: 17.8, r: 1.3 },
  { x: 38.7, y: 93.1, r: 0.9 }, { x: 55.8, y: 28.4, r: 1.1 }, { x: 91.2, y: 51.7, r: 0.7 },
];

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
        // NO overflow:hidden here — that was clipping the "g" descender
      }}
    >
      {/* ── Background gradient container — clips blobs independently of text ── */}
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
        {/* Blob 1 — large violet→pink pill, mostly above section top (opacity 65%) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: -387,
            transform: "translate(calc(-50% + 22.86px), 0) rotate(180deg)",
            width: 1279,
            height: 765,
            borderRadius: 1146,
            background: "linear-gradient(to bottom, rgba(118,12,217,0.75), rgba(217,12,183,0.75))",
            filter: "blur(92.75px)",
            opacity: 0.65,
          }}
        />
        {/* Blob 2 — color-dodge brightening layer */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: -335,
            transform: "translate(calc(-50% + 22.86px), 0) rotate(180deg)",
            width: 1386,
            height: 447,
            borderRadius: 1146,
            background: "linear-gradient(to bottom, rgba(118,12,217,0.75), rgba(217,12,183,0.75))",
            filter: "blur(69.65px)",
            mixBlendMode: "color-dodge",
          }}
        />
        {/* Vector804 — plus-lighter arc/arch that shapes the bowl glow (Figma node 52:1874) */}
        <div
          style={{
            position: "absolute",
            left: 12,
            top: -54,
            width: 1369,
            height: 411,
            mixBlendMode: "plus-lighter",
          }}
        >
          <img
            src="/cta-glow-arc.svg"
            alt=""
            style={{
              position: "absolute",
              top: "-19.05%",
              right: "-5.72%",
              bottom: "-19.05%",
              left: "-5.72%",
              width: "auto",
              height: "auto",
              display: "block",
            }}
          />
        </div>

        {/* ── Star field — floating animated dots ── */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          preserveAspectRatio="xMidYMid slice"
        >
          {STARS.map((s, i) => {
            const duration = 3.5 + (i % 7) * 0.6;
            const delay = -(i * 0.43 % duration);
            const floatAmt = 3 + (i % 4);
            return (
              <circle
                key={i}
                cx={`${s.x}%`}
                cy={`${s.y}%`}
                r={s.r}
                fill="rgba(255,255,255,0.7)"
                style={{
                  animation: `star-float-${i % 4} ${duration}s ${delay}s ease-in-out infinite`,
                  transformOrigin: `${s.x}% ${s.y}%`,
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* ── "WE BELIEVE IN" ── */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: "var(--font-urbanist), sans-serif",
          fontWeight: 300,
          fontSize: 45,
          lineHeight: "43.931px",
          letterSpacing: "14.4px",
          textTransform: "uppercase",
          color: "#ffffff",
          textAlign: "center",
          margin: 0,
        }}
      >
        We believe in
      </motion.p>

      {/* ── "Constant learning" — gradient-masked large text ── */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: "var(--font-urbanist), sans-serif",
          fontWeight: 700,
          fontSize: "clamp(64px, 8.5vw, 112px)",
          lineHeight: 1,
          letterSpacing: "-2.24px",
          textAlign: "center",
          margin: "8px 0 0",
          color: "#ffffff",
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
          position: "relative",
          zIndex: 1,
          marginTop: 56,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 24px",
          borderRadius: 52,
          textDecoration: "none",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.14px",
          color: "#ffffff",
          fontFamily: "var(--font-urbanist), sans-serif",
          whiteSpace: "nowrap",
        }}
      >
        Book a call
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 8.5L8.5 1.5M8.5 1.5H2.5M8.5 1.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>

    <style jsx global>{`
      @keyframes star-float-0 {
        0%, 100% { transform: translateY(0px);   opacity: 0.55; }
        50%       { transform: translateY(-5px);  opacity: 1;    }
      }
      @keyframes star-float-1 {
        0%, 100% { transform: translateY(0px);   opacity: 0.4;  }
        50%       { transform: translateY(-7px);  opacity: 0.9;  }
      }
      @keyframes star-float-2 {
        0%, 100% { transform: translateY(0px);   opacity: 0.65; }
        50%       { transform: translateY(-4px);  opacity: 1;    }
      }
      @keyframes star-float-3 {
        0%, 100% { transform: translateY(0px);   opacity: 0.35; }
        50%       { transform: translateY(-6px);  opacity: 0.85; }
      }
    `}</style>
  );
}
