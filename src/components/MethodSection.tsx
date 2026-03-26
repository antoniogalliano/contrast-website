"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const ACCENT = "#d90cb7";
const YT_ID = "dXev23xFw4A";

// ── VideoPlayer ───────────────────────────────────────────────────────────────
function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      style={{
        flex: 1,
        aspectRatio: "16/9",
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
        background: "#000",
        cursor: playing ? "default" : "pointer",
      }}
      onClick={() => !playing && setPlaying(true)}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0`}
          title="The 3-Minute Breakdown"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        />
      ) : (
        <>
          <img
            src={`https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`}
            alt="The 3-Minute Breakdown"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 60% 40%, rgba(118,12,217,0.25) 0%, rgba(217,12,183,0.12) 50%, transparent 80%)",
            filter: "blur(20px)",
          }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(8px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "transform 0.2s, background 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1.1)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.12)";
              }}
            >
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                <path d="M2 2L18 11L2 20V2Z" fill="white" fillOpacity={0.95} />
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Brain SVG — gray default, pink on active ──────────────────────────────────
// CSS filter converts dark gray → #d90cb7 pink on hover
const PINK_FILTER =
  "brightness(0) saturate(100%) invert(18%) sepia(89%) saturate(6000%) hue-rotate(283deg) brightness(0.93)";

function BrainSVG({ active }: { active: boolean }) {
  return (
    <div style={{ position: "relative", width: 221, height: 179 }}>
      {/* Gray base layer */}
      <img
        src="/method/design-triggers.svg"
        width={221}
        height={179}
        alt=""
        style={{ display: "block" }}
      />
      {/* Pink overlay — fades in on hover/expand */}
      <img
        src="/method/design-triggers.svg"
        width={221}
        height={179}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          opacity: active ? 1 : 0,
          transition: "opacity 0.4s ease",
          filter: PINK_FILTER,
        }}
      />
    </div>
  );
}

// ── Design Triggers Card — 3 states: Default / Hover / Clicked Plus ───────────
function DesignTriggersCard({ delay }: { delay: number }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const active = hovered || expanded;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 16,
        border: `1px solid ${active ? ACCENT : "#383838"}`,
        background: "#0a0a0a",
        backdropFilter: "blur(8.5px)",
        WebkitBackdropFilter: "blur(8.5px)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.35s ease",
        cursor: "default",
      }}
    >
      {/* ── Dot grid texture — visible on hover/expanded ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          opacity: active ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Large purple/pink gradient glow (card-relative, bleeds into text area) ── */}
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: "50%",
          transform: "translateX(-50%)",
          width: 650,
          height: 306,
          borderRadius: "50%",
          background: "linear-gradient(to bottom, rgba(118,12,217,0.75), rgba(217,12,183,0.75))",
          filter: "blur(70px)",
          opacity: active ? 0.65 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ── Color-dodge bright glow ── */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          width: 415,
          height: 128,
          borderRadius: "50%",
          background: "linear-gradient(to bottom, rgba(118,12,217,0.75), rgba(217,12,183,0.75))",
          filter: "blur(33px)",
          mixBlendMode: "color-dodge" as React.CSSProperties["mixBlendMode"],
          opacity: active ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      {/* ── Brain SVG — centered at top:95 within the 304px illustration space ── */}
      <div
        style={{
          position: "absolute",
          top: 95,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 4,
        }}
      >
        <BrainSVG active={active} />
      </div>

      {/* ── Spacer — reserves the 304px illustration area ── */}
      <div style={{ height: 304, flexShrink: 0 }} />

      {/* ── Text panel ── */}
      <div
        style={{
          padding: 32,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 11,
          flexShrink: 0,
          width: "100%",
          boxSizing: "border-box",
          zIndex: 5,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-urbanist), sans-serif",
            fontWeight: 600,
            fontSize: 20,
            color: "#e8e8e8",
            margin: 0,
            lineHeight: "normal",
          }}
        >
          Design Triggers
        </p>
        <p
          style={{
            fontFamily: "var(--font-geist), sans-serif",
            fontWeight: 400,
            fontSize: 16,
            color: active ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.65)",
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: "normal",
            transition: "color 0.35s ease",
          }}
        >
          Leverages decision-making psychology to drive engagement.
        </p>

        {/* Plus / Close button */}
        <button
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "Close" : "Learn more"}
          style={{
            position: "absolute",
            right: 40,
            top: 40,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.4)",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: active ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <path
              d="M8 2V14M2 8H14"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* ── Expanded text overlay (Clicked Plus state) ── */}
      <div
        style={{
          position: "absolute",
          left: 31,
          top: 31,
          right: 31,
          fontFamily: "var(--font-urbanist), sans-serif",
          fontSize: 19,
          lineHeight: "27px",
          color: "#ffffff",
          zIndex: 10,
          opacity: expanded ? 1 : 0,
          transition: "opacity 0.35s ease",
          pointerEvents: expanded ? "auto" : "none",
        }}
      >
        <span style={{ fontWeight: 300 }}>
          Understanding how users think is the foundation of great design.{" "}
        </span>
        <span style={{ fontWeight: 700 }}>
          With Design Triggers, we apply behavioral psychology and cognitive principles
        </span>
        <span style={{ fontWeight: 300 }}>
          {" "}to craft experiences that naturally guide users toward action. From
          micro-interactions to information hierarchy, every element is built to
          reduce friction and inspire engagement.
        </span>
      </div>
    </motion.div>
  );
}

// ── Hero Framework illustration ───────────────────────────────────────────────
function HeroFrameworkIllustration() {
  const cx = 160, cy = 110, r = 78;
  return (
    <svg viewBox="0 0 320 220" fill="none" style={{ width: "100%", height: "auto" }}>
      <circle cx={cx} cy={cy} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={0.8} />
      <circle cx={cx} cy={cy} r={r * 0.75} stroke="rgba(255,255,255,0.07)" strokeWidth={0.8} />
      <circle cx={cx} cy={cy} r={r * 0.618} stroke="rgba(255,255,255,0.09)" strokeWidth={0.8} />
      <circle cx={cx} cy={cy} r={r * 0.382} stroke={ACCENT} strokeWidth={1.4} opacity={0.5} />
      <circle cx={cx} cy={cy} r={r * 0.2} stroke="rgba(255,255,255,0.12)" strokeWidth={0.8} />
      <line x1={cx - r - 12} y1={cy} x2={cx + r + 12} y2={cy} stroke="rgba(255,255,255,0.05)" strokeWidth={0.8} />
      <line x1={cx} y1={cy - r - 12} x2={cx} y2={cy + r + 12} stroke="rgba(255,255,255,0.05)" strokeWidth={0.8} />
      <line x1={cx - r * 0.72} y1={cy - r * 0.72} x2={cx + r * 0.72} y2={cy + r * 0.72} stroke="rgba(255,255,255,0.04)" strokeWidth={0.8} />
      <line x1={cx + r * 0.72} y1={cy - r * 0.72} x2={cx - r * 0.72} y2={cy + r * 0.72} stroke="rgba(255,255,255,0.04)" strokeWidth={0.8} />
      <polygon
        points={`${cx},${cy - r * 0.52} ${cx - 5},${cy} ${cx},${cy + r * 0.26} ${cx + 5},${cy}`}
        fill={ACCENT} opacity={0.75}
      />
      {[0, 90, 180, 270].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return (
          <line key={deg}
            x1={cx + Math.cos(a - Math.PI / 2) * (r - 6)} y1={cy + Math.sin(a - Math.PI / 2) * (r - 6)}
            x2={cx + Math.cos(a - Math.PI / 2) * (r + 6)} y2={cy + Math.sin(a - Math.PI / 2) * (r + 6)}
            stroke="rgba(255,255,255,0.2)" strokeWidth={1.2}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={4} fill={ACCENT} />
    </svg>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function MethodSection() {
  return (
    <section id="framework" style={{ padding: "120px 40px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ marginBottom: 64, textAlign: "center" }}
        >
          <p style={{
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "3.9px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 20,
            fontFamily: "var(--font-urbanist), sans-serif",
          }}>
            Our Method
          </p>
          <h2 style={{
            fontSize: "clamp(36px, 4.5vw, 64px)",
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 1.17,
            letterSpacing: "-0.01em",
            margin: "0 auto 20px",
            whiteSpace: "nowrap",
          }}>
            The Method Behind Every Result
          </h2>
          <p style={{
            fontSize: "clamp(15px, 1.2vw, 18px)",
            color: "#b0b0b0",
            fontFamily: "var(--font-geist), sans-serif",
            fontWeight: 300,
            lineHeight: 1.6,
          }}>
            Behavioral Science + AI-Powered Design, working together.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div
          className="method-cards"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}
        >
          {/* Design Triggers — full interactive 3-state card */}
          <DesignTriggersCard delay={0} />

          {/* Hero Framework */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            style={{
              padding: "40px",
              borderRadius: 16,
              border: "1px solid #383838",
              background: "#0a0a0a",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <HeroFrameworkIllustration />
            </div>
            <div>
              <h3 style={{
                fontSize: "clamp(20px, 1.6vw, 26px)",
                fontWeight: 600,
                color: "#ffffff",
                margin: "0 0 12px",
                lineHeight: 1.2,
              }}>
                The Hero Framework
              </h3>
              <p style={{
                fontSize: 15,
                color: "#b0b0b0",
                lineHeight: 1.7,
                margin: 0,
                fontFamily: "var(--font-geist), sans-serif",
                fontWeight: 300,
              }}>
                Your product story mapped to what users actually need.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Video card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          style={{
            padding: "48px",
            borderRadius: 16,
            border: "1px solid #383838",
            background: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            gap: 48,
            position: "relative",
            overflow: "hidden",
          }}
          className="method-video-card"
        >
          <div style={{
            position: "absolute",
            right: -80,
            top: "50%",
            transform: "translateY(-50%)",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(118,12,217,0.18) 0%, rgba(217,12,183,0.12) 50%, transparent 75%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }} />

          <div style={{ flex: "0 0 auto", maxWidth: 420, position: "relative", zIndex: 1 }}>
            <p style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 16,
              fontFamily: "var(--font-urbanist), sans-serif",
            }}>
              Video
            </p>
            <h3 style={{
              fontSize: "clamp(22px, 2vw, 32px)",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.2,
              margin: "0 0 16px",
            }}>
              The 3-Minute Breakdown
            </h3>
            <p style={{
              fontSize: 15,
              color: "#b0b0b0",
              lineHeight: 1.7,
              margin: "0 0 32px",
              fontFamily: "var(--font-geist), sans-serif",
              fontWeight: 300,
            }}>
              See how the Hero Framework transforms product metrics in under 3 minutes. Real results, real clients, real methodology.
            </p>
            <a
              href="#"
              className="btn-gradient-border"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 600,
                color: "#ffffff",
                textDecoration: "none",
                fontFamily: "var(--font-urbanist), sans-serif",
              }}
            >
              Watch Now
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <VideoPlayer />
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .method-cards { grid-template-columns: 1fr !important; }
          .method-video-card { flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}
