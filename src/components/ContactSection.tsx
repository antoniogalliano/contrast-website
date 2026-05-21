"use client";

import { motion } from "framer-motion";

const MOTION_URL = "https://app.usemotion.com/meet/sagi-shrieber/ux-strategy-call";

export default function ContactSection() {
  return (
    <section id="contact" style={{ padding: "120px 40px 300px", background: "radial-gradient(ellipse 900px 600px at 50% 40%, rgba(217,12,183,0.14) 0%, rgba(118,12,217,0.08) 45%, transparent 70%), #0a0a0a", overflow: "hidden" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", display: "flex", justifyContent: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="contact-wrapper"
          style={{ position: "relative", width: 800, display: "flex", flexDirection: "column", gap: 55, alignItems: "center" }}
        >
          {/* ── Heading ── */}
          <div className="contact-heading" style={{ width: 548, display: "flex", flexDirection: "column", gap: 19, alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
            <h2 style={{ margin: 0, fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: 35, color: "#ffffff", letterSpacing: "-0.35px", width: "100%", lineHeight: "normal" }}>
              30 Minutes. Real Clarity
            </h2>
            <p style={{ margin: 0, fontFamily: "var(--font-geist), sans-serif", fontWeight: 400, fontSize: 16, color: "#b0b0b0", opacity: 0.8, width: "100%", lineHeight: 1.5 }}>
              Book a call and let&apos;s talk. No pitch, just an honest conversation about your product and how we can help.
            </p>
          </div>

          {/* ── CTA Button ── */}
          <motion.a
            href={MOTION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient-border"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative", zIndex: 1,
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "16px 40px",
              borderRadius: 9999,
              textDecoration: "none",
              fontFamily: "var(--font-urbanist), sans-serif",
              fontWeight: 600, fontSize: 16,
              color: "#ffffff",
              whiteSpace: "nowrap",
            }}
          >
            Book a Call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .contact-wrapper { width: 100% !important; }
          .contact-heading { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
