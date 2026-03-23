"use client";

import { motion } from "framer-motion";

const ACCENT = "#d90cb7";

export default function CtaBanner() {
  return (
    <section
      style={{
        padding: "100px 40px",
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Star field background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.4)",
              opacity: Math.random() * 0.6 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Gradient backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(118,12,217,0.2) 0%, rgba(217,12,183,0.1) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Stars row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 32 }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1L9.85 5.78L15 6.64L11.5 10.04L12.36 15L8 12.77L3.64 15L4.5 10.04L1 6.64L6.15 5.78L8 1Z"
                  fill={ACCENT}
                />
              </svg>
            ))}
          </div>

          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              margin: "0 0 24px",
            }}
          >
            Ready to Turn Your Product into a Growth Engine?
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 1.2vw, 18px)",
              color: "#b0b0b0",
              lineHeight: 1.7,
              fontFamily: "var(--font-geist), sans-serif",
              fontWeight: 300,
              margin: "0 0 40px",
            }}
          >
            Join the teams who&apos;ve used behavioral science + AI-powered design to break through
            their growth plateaus.
          </p>
          <a
            href="#contact"
            className="btn-gradient-border"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 32px",
              borderRadius: 9999,
              fontSize: 15,
              fontWeight: 600,
              color: "#ffffff",
              textDecoration: "none",
              fontFamily: "var(--font-urbanist), sans-serif",
            }}
          >
            Start Growing
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
      </div>
    </section>
  );
}
