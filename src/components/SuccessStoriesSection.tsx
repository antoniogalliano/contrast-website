"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ACCENT = "#d90cb7";

function AnimatedCounter({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return (
    <span
      ref={ref}
      style={{
        fontSize: "clamp(64px, 8vw, 96px)",
        fontWeight: 200,
        fontFamily: "var(--font-urbanist), sans-serif",
        color: "#ffffff",
        lineHeight: 1,
        letterSpacing: "2px",
      }}
    >
      {count}
    </span>
  );
}

const stats = [
  {
    client: "Fiverr",
    metric: "increase in feature adoption",
    value: 10,
    suffix: "%",
    description: "12% increase in feature adoption through targeted UX optimization.",
  },
  {
    client: "Viably",
    metric: "conversion rate boost",
    value: 5,
    suffix: "x",
    description: "5x conversion rate boost — from 4.2% to 20.4% in 90 days.",
  },
  {
    client: "Designrr",
    metric: "increase in engagement",
    value: 97,
    suffix: "%",
    description: "97% increase in engagement after Hero Framework implementation.",
  },
];

export default function SuccessStoriesSection() {
  return (
    <section id="work" style={{ padding: "120px 40px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ marginBottom: 64, textAlign: "center" }}
        >
          <h2
            style={{
              fontSize: "clamp(32px, 4.5vw, 64px)",
              fontWeight: 600,
              lineHeight: 1.17,
              letterSpacing: "-0.01em",
              margin: "0 auto",
            }}
          >
            <span style={{ color: "#888888" }}>Success Stories: </span>
            <span style={{ color: "#ffffff" }}>Real UX Wins</span>
          </h2>
        </motion.div>

        {/* Stat cards */}
        <div
          className="stats-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.client}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              style={{
                padding: "40px 36px",
                borderRadius: 16,
                border: `1px solid ${ACCENT}`,
                background: "rgba(10,10,10,0)",
                backdropFilter: "blur(26.7px)",
                WebkitBackdropFilter: "blur(26.7px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background gradient glow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at 50% 110%, rgba(118,12,217,0.25) 0%, rgba(217,12,183,0.12) 40%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Client label */}
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    color: ACCENT,
                    marginBottom: 24,
                    fontFamily: "var(--font-urbanist), sans-serif",
                  }}
                >
                  {stat.client}
                </p>

                {/* Counter */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 8 }}>
                  <AnimatedCounter target={stat.value} />
                  <span
                    style={{
                      fontSize: "clamp(40px, 5vw, 60px)",
                      fontWeight: 200,
                      color: "#ffffff",
                      lineHeight: 1.1,
                      fontFamily: "var(--font-urbanist), sans-serif",
                      letterSpacing: "1px",
                    }}
                  >
                    {stat.suffix}
                  </span>
                </div>

                {/* Metric label */}
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    letterSpacing: "0.84px",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: 20,
                    fontFamily: "var(--font-geist), sans-serif",
                  }}
                >
                  {stat.metric}
                </p>

                {/* Divider */}
                <div
                  style={{ height: 1, background: "rgba(56,56,56,0.62)", marginBottom: 20 }}
                />

                {/* Description */}
                <p
                  style={{
                    fontSize: 14,
                    color: "#b0b0b0",
                    lineHeight: 1.7,
                    fontFamily: "var(--font-geist), sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
