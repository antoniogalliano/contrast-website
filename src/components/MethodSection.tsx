"use client";

import { motion } from "framer-motion";

const ACCENT = "#d90cb7";

function DesignTriggersIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" style={{ width: "100%", maxWidth: 180, height: "auto" }}>
      {/* Concentric rounded shapes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={10 + i * 18}
          y={8 + i * 12}
          width={180 - i * 36}
          height={144 - i * 24}
          rx={16 - i * 2}
          stroke={i === 2 ? ACCENT : `rgba(255,255,255,${0.06 + i * 0.04})`}
          strokeWidth={i === 2 ? 1.5 : 0.8}
          fill="none"
        />
      ))}
      {/* Center dot */}
      <circle cx={100} cy={80} r={6} fill={ACCENT} opacity={0.8} />
      <circle cx={100} cy={80} r={12} stroke={ACCENT} strokeWidth={0.8} fill="none" opacity={0.3} />
    </svg>
  );
}

function HeroFrameworkIllustration() {
  const pts = 6;
  const cx = 100, cy = 80, r = 55;
  const outerPts = Array.from({ length: pts }, (_, i) => {
    const a = (i / pts) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  });
  const innerPts = Array.from({ length: pts }, (_, i) => {
    const a = ((i + 0.5) / pts) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(a) * (r * 0.5), y: cy + Math.sin(a) * (r * 0.5) };
  });
  return (
    <svg viewBox="0 0 200 160" fill="none" style={{ width: "100%", maxWidth: 180, height: "auto" }}>
      {outerPts.map((p, i) => {
        const next = outerPts[(i + 1) % pts];
        return <line key={`o-${i}`} x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke="rgba(255,255,255,0.12)" strokeWidth={0.8} />;
      })}
      {innerPts.map((p, i) => (
        <line key={`ic-${i}`} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.12)" strokeWidth={0.8} />
      ))}
      <polygon
        points={`${outerPts[0].x},${outerPts[0].y} ${outerPts[2].x},${outerPts[2].y} ${outerPts[4].x},${outerPts[4].y}`}
        fill={`${ACCENT}18`}
        stroke={ACCENT}
        strokeWidth={1}
      />
      <polygon
        points={`${outerPts[1].x},${outerPts[1].y} ${outerPts[3].x},${outerPts[3].y} ${outerPts[5].x},${outerPts[5].y}`}
        fill={`${ACCENT}10`}
        stroke={ACCENT}
        strokeWidth={0.8}
        opacity={0.6}
      />
      {outerPts.map((p, i) => (
        <circle key={`n-${i}`} cx={p.x} cy={p.y} r={3} fill={i % 2 === 0 ? ACCENT : "rgba(255,255,255,0.3)"} />
      ))}
      <circle cx={cx} cy={cy} r={4} fill={ACCENT} />
    </svg>
  );
}

const featureCards = [
  {
    tag: "Behavioral Science",
    title: "Design Triggers",
    desc: "We apply proven psychological frameworks — anchoring, loss aversion, social proof — directly into your UI to drive measurable behavior change.",
    illustration: <DesignTriggersIllustration />,
  },
  {
    tag: "Proprietary Framework",
    title: "The Hero Framework",
    desc: "Our structured 5-phase system maps user journeys to conversion moments, ensuring every interaction is intentional and outcome-driven.",
    illustration: <HeroFrameworkIllustration />,
  },
];

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
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "3.9px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 20,
              fontFamily: "var(--font-urbanist), sans-serif",
            }}
          >
            Our Method
          </p>
          <h2
            style={{
              fontSize: "clamp(36px, 4.5vw, 64px)",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.17,
              letterSpacing: "-0.01em",
              margin: "0 auto 20px",
              maxWidth: 760,
            }}
          >
            The Method Behind Every Result
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 1.2vw, 18px)",
              color: "#b0b0b0",
              fontFamily: "var(--font-geist), sans-serif",
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            Behavioral Science + AI-Powered Design, working together.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div
          className="method-cards"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}
        >
          {featureCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
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
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 100,
                  border: `1px solid rgba(217,12,183,0.3)`,
                  background: "rgba(217,12,183,0.06)",
                  width: "fit-content",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: ACCENT,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: ACCENT,
                    fontFamily: "var(--font-urbanist), sans-serif",
                  }}
                >
                  {card.tag}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                {card.illustration}
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "clamp(20px, 1.6vw, 26px)",
                    fontWeight: 600,
                    color: "#ffffff",
                    margin: "0 0 12px",
                    lineHeight: 1.2,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: "#b0b0b0",
                    lineHeight: 1.7,
                    margin: 0,
                    fontFamily: "var(--font-geist), sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video breakdown card */}
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
          {/* Background gradient */}
          <div
            style={{
              position: "absolute",
              right: -80,
              top: "50%",
              transform: "translateY(-50%)",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(118,12,217,0.18) 0%, rgba(217,12,183,0.12) 50%, transparent 75%)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          {/* Left text */}
          <div style={{ flex: "0 0 auto", maxWidth: 420, position: "relative", zIndex: 1 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 16,
                fontFamily: "var(--font-urbanist), sans-serif",
              }}
            >
              Video
            </p>
            <h3
              style={{
                fontSize: "clamp(22px, 2vw, 32px)",
                fontWeight: 600,
                color: "#ffffff",
                lineHeight: 1.2,
                margin: "0 0 16px",
              }}
            >
              The 3-Minute Breakdown
            </h3>
            <p
              style={{
                fontSize: 15,
                color: "#b0b0b0",
                lineHeight: 1.7,
                margin: "0 0 32px",
                fontFamily: "var(--font-geist), sans-serif",
                fontWeight: 300,
              }}
            >
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
                <path
                  d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Right: video placeholder */}
          <div
            style={{
              flex: 1,
              minHeight: 220,
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
              overflow: "hidden",
            }}
          >
            {/* Purple glow blur */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 60% 40%, rgba(118,12,217,0.2) 0%, rgba(217,12,183,0.1) 50%, transparent 80%)",
                filter: "blur(20px)",
              }}
            />
            {/* Play button */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 2,
                cursor: "pointer",
                backdropFilter: "blur(8px)",
              }}
            >
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path d="M2 2L16 10L2 18V2Z" fill="white" fillOpacity={0.9} />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .method-cards {
            grid-template-columns: 1fr !important;
          }
          .method-video-card {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
