"use client";

import { motion } from "framer-motion";

const services = [
  { label: "UX Strategy", highlight: false },
  { label: "Embedded Design Team", highlight: true },
  { label: "The Hero Framework Workshop", highlight: true },
  { label: "Product BI & Analytics", highlight: false },
  { label: "Product Design", highlight: false },
  { label: "Fractional UX Direction", highlight: false },
  { label: "Development", highlight: false },
  { label: "Team Training", highlight: false },
];

const ACCENT = "#d90cb7";

export default function ServicesSection() {
  return (
    <section style={{ padding: "0 40px 120px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        {/* Divider with label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 32,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "rgba(56,56,56,0.62)" }} />
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "3.9px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-urbanist), sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            Our Services
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(56,56,56,0.62)" }} />
        </div>

        {/* Services grid — 4 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
          className="services-grid"
        >
          {services.map((svc, i) => (
            <motion.div
              key={svc.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              style={{
                padding: "28px 28px",
                borderRadius: 12,
                border: svc.highlight
                  ? `1px solid ${ACCENT}`
                  : "1px solid #383838",
                background: svc.highlight
                  ? `rgba(217, 12, 183, 0.05)`
                  : "rgba(255,255,255,0.02)",
                display: "flex",
                alignItems: "center",
                gap: 12,
                transition: "border-color 0.3s, background 0.3s",
                cursor: "default",
              }}
            >
              {/* Dot indicator */}
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: svc.highlight ? ACCENT : "rgba(255,255,255,0.3)",
                }}
              />
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: svc.highlight ? "#ffffff" : "rgba(255,255,255,0.75)",
                  fontFamily: "var(--font-urbanist), sans-serif",
                  lineHeight: 1.3,
                }}
              >
                {svc.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          style={{ marginTop: 48, display: "flex", justifyContent: "center" }}
        >
          <a
            href="#contact"
            className="btn-gradient-border"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "12px 28px",
              borderRadius: 9999,
              fontSize: 14,
              fontWeight: 600,
              color: "#ffffff",
              textDecoration: "none",
              fontFamily: "var(--font-urbanist), sans-serif",
            }}
          >
            Find Your Fit
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

      <style jsx global>{`
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
