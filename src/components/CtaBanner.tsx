"use client";

import { motion } from "framer-motion";

// Small floating dots — drift in x+y
const DOTS = [
  { x: 5.2,  y: 12.4, r: 1.0 }, { x: 11.7, y: 38.1, r: 0.7 }, { x: 18.3, y: 7.6,  r: 0.9 },
  { x: 24.9, y: 55.2, r: 0.5 }, { x: 31.4, y: 22.8, r: 1.2 }, { x: 37.8, y: 71.3, r: 0.8 },
  { x: 44.1, y: 15.9, r: 0.6 }, { x: 50.6, y: 44.7, r: 1.0 }, { x: 57.2, y: 83.4, r: 0.7 },
  { x: 63.5, y: 30.1, r: 1.1 }, { x: 70.0, y: 61.8, r: 0.5 }, { x: 76.4, y: 9.3,  r: 0.9 },
  { x: 82.9, y: 48.5, r: 0.8 }, { x: 89.3, y: 27.6, r: 1.0 }, { x: 94.8, y: 67.2, r: 0.6 },
  { x: 8.6,  y: 79.5, r: 1.0 }, { x: 15.1, y: 52.3, r: 0.7 }, { x: 21.7, y: 91.6, r: 0.5 },
  { x: 28.2, y: 35.7, r: 1.1 }, { x: 34.6, y: 68.4, r: 0.8 }, { x: 41.3, y: 19.2, r: 0.9 },
  { x: 47.8, y: 87.1, r: 0.6 }, { x: 54.4, y: 42.9, r: 1.2 }, { x: 60.9, y: 74.6, r: 0.7 },
  { x: 67.5, y: 11.3, r: 1.0 }, { x: 74.0, y: 56.8, r: 0.5 }, { x: 80.6, y: 33.5, r: 1.1 },
  { x: 87.2, y: 88.9, r: 0.8 }, { x: 93.7, y: 21.4, r: 0.6 }, { x: 2.8,  y: 45.6, r: 0.9 },
  { x: 48.3, y: 3.7,  r: 0.7 }, { x: 72.9, y: 95.2, r: 0.5 }, { x: 16.4, y: 17.8, r: 1.1 },
  { x: 38.7, y: 93.1, r: 0.8 }, { x: 55.8, y: 28.4, r: 1.0 }, { x: 91.2, y: 51.7, r: 0.6 },
  { x: 3.5,  y: 64.2, r: 0.8 }, { x: 9.1,  y: 22.7, r: 0.5 }, { x: 19.8, y: 48.3, r: 1.1 },
  { x: 26.4, y: 76.9, r: 0.7 }, { x: 32.9, y: 5.1,  r: 0.9 }, { x: 43.6, y: 60.5, r: 0.6 },
  { x: 52.1, y: 25.8, r: 1.0 }, { x: 58.7, y: 92.4, r: 0.5 }, { x: 65.3, y: 47.1, r: 0.8 },
  { x: 71.8, y: 16.6, r: 1.2 }, { x: 78.4, y: 72.3, r: 0.7 }, { x: 85.0, y: 39.8, r: 0.9 },
  { x: 96.5, y: 85.4, r: 0.6 }, { x: 4.7,  y: 31.5, r: 1.0 }, { x: 33.2, y: 50.9, r: 0.8 },
  { x: 62.4, y: 8.7,  r: 0.5 }, { x: 79.8, y: 59.4, r: 1.1 }, { x: 97.3, y: 34.6, r: 0.7 },
];

// Glowing orbs — larger blurred circles that pulse
const ORBS = [
  { x: 12, y: 35, r: 3.5, color: "rgba(217,12,183,0.7)"   },
  { x: 45, y: 72, r: 2.8, color: "rgba(255,255,255,0.55)"  },
  { x: 73, y: 18, r: 4.0, color: "rgba(118,12,217,0.6)"   },
  { x: 88, y: 58, r: 2.5, color: "rgba(217,12,183,0.65)"  },
  { x: 30, y: 12, r: 3.0, color: "rgba(255,255,255,0.45)"  },
  { x: 60, y: 52, r: 3.8, color: "rgba(118,12,217,0.5)"   },
  { x: 20, y: 80, r: 2.2, color: "rgba(217,12,183,0.5)"   },
  { x: 92, y: 28, r: 3.2, color: "rgba(255,200,255,0.4)"  },
];

// 4-pointed sparkle crosses — appear, rotate, vanish
const SPARKLES = [
  { x: 8,  y: 20, size: 5, dur: 3.8, delay: 0    },
  { x: 25, y: 65, size: 4, dur: 5.2, delay: -1.4  },
  { x: 42, y: 10, size: 6, dur: 4.5, delay: -0.7  },
  { x: 58, y: 78, size: 4, dur: 6.1, delay: -2.9  },
  { x: 75, y: 32, size: 5, dur: 4.0, delay: -1.8  },
  { x: 92, y: 55, size: 7, dur: 5.7, delay: -0.3  },
  { x: 35, y: 47, size: 4, dur: 3.5, delay: -2.1  },
  { x: 65, y: 14, size: 5, dur: 6.4, delay: -4.0  },
  { x: 14, y: 55, size: 4, dur: 4.8, delay: -3.3  },
  { x: 84, y: 82, size: 6, dur: 5.0, delay: -1.1  },
];

function sparklePath(s: number) {
  const q = s * 0.2;
  return `M0,${-s} Q${q},${-q} ${s},0 Q${q},${q} 0,${s} Q${-q},${q} ${-s},0 Q${-q},${-q} 0,${-s}Z`;
}

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
      {/* ── Background gradient + particle container ── */}
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
        {/* Blob 1 */}
        <div style={{
          position: "absolute", left: "50%", top: -387,
          transform: "translate(calc(-50% + 22.86px), 0) rotate(180deg)",
          width: 1279, height: 765, borderRadius: 1146,
          background: "linear-gradient(to bottom, rgba(118,12,217,0.75), rgba(217,12,183,0.75))",
          filter: "blur(92.75px)", opacity: 0.65,
        }} />
        {/* Blob 2 — color-dodge */}
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

        {/* ── Glowing orbs ── */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
          {ORBS.map((o, i) => {
            const dur   = 4.5 + (i % 5) * 1.1;
            const delay = -(i * 0.9 % dur);
            return (
              <circle key={i} cx={`${o.x}%`} cy={`${o.y}%`} r={o.r} fill={o.color}
                style={{
                  filter: `blur(${o.r * 1.5}px)`,
                  animation: `orb-pulse ${dur}s ${delay}s ease-in-out infinite`,
                  transformOrigin: `${o.x}% ${o.y}%`,
                }}
              />
            );
          })}
        </svg>

        {/* ── Floating dots ── */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
          {DOTS.map((s, i) => {
            const anim  = ["star-drift-a","star-drift-b","star-drift-c","star-drift-d"][i % 4];
            const dur   = 4.5 + (i % 8) * 0.55;
            const delay = -(i * 0.47 % dur);
            return (
              <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="rgba(255,255,255,0.85)"
                style={{
                  animation: `${anim} ${dur}s ${delay}s ease-in-out infinite`,
                  transformOrigin: `${s.x}% ${s.y}%`,
                }}
              />
            );
          })}
        </svg>

        {/* ── Sparkle crosses (absolutely positioned divs for clean % placement) ── */}
        {SPARKLES.map((sp, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${sp.x}%`,
              top: `${sp.y}%`,
              width: sp.size * 2,
              height: sp.size * 2,
              marginLeft: -sp.size,
              marginTop: -sp.size,
              animation: `sparkle-twinkle ${sp.dur}s ${sp.delay}s ease-in-out infinite`,
            }}
          >
            <svg width={sp.size * 2} height={sp.size * 2}
              viewBox={`${-sp.size} ${-sp.size} ${sp.size * 2} ${sp.size * 2}`}
            >
              <path d={sparklePath(sp.size)} fill="white" />
            </svg>
          </div>
        ))}
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
