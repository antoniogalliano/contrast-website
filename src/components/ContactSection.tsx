"use client";

import { motion } from "framer-motion";

const MOTION_URL = "https://app.usemotion.com/meet/sagi-shrieber/fromcontrast";

export default function ContactSection() {
  return (
    <section id="contact" style={{ padding: "120px 40px 300px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", display: "flex", justifyContent: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ position: "relative", width: 800, display: "flex", flexDirection: "column", gap: 55, alignItems: "center" }}
        >
          {/* ── Background glows ── */}
          <div style={{ position: "absolute", left: 132.5, bottom: 0, width: 535, height: 32, pointerEvents: "none", mixBlendMode: "plus-lighter", zIndex: 0 }}>
            <div style={{ width: "100%", height: "100%", borderRadius: 153.675, filter: "blur(28.8px)", background: "linear-gradient(to right, rgba(217,12,183,0.27), rgba(217,12,183,0.75) 53%, rgba(118,12,217,0.75))" }} />
          </div>
          <div style={{ position: "absolute", left: "50%", top: 237, transform: "translateX(-50%)", width: 769, height: 289, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", mixBlendMode: "plus-lighter", zIndex: 0 }}>
            <div style={{ flexShrink: 0, transform: "rotate(90deg)" }}>
              <div style={{ width: 289, height: 769, borderRadius: 607.666, filter: "blur(178.645px)", background: "linear-gradient(to bottom, rgba(217,12,183,0.27), rgba(217,12,183,0.75) 53.103%, rgba(118,12,217,0.75))" }} />
            </div>
          </div>

          {/* ── Heading ── */}
          <div style={{ width: 548, display: "flex", flexDirection: "column", gap: 19, alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
            <h2 style={{ margin: 0, fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: 35, color: "#ffffff", letterSpacing: "-0.35px", width: "100%", lineHeight: "normal" }}>
              30 Minutes. Real Clarity
            </h2>
            <p style={{ margin: 0, fontFamily: "var(--font-geist), sans-serif", fontWeight: 400, fontSize: 16, color: "#b0b0b0", opacity: 0.8, width: "100%", lineHeight: 1.5 }}>
              Book a call and let&apos;s talk. No pitch, just an honest conversation about your product and how we can help.
            </p>
          </div>

          {/* ── Booking card ── */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              borderRadius: 16,
              border: "1px solid #d90cb7",
              overflow: "hidden",
              boxShadow: "0px 1px 8px 0px rgba(0,0,0,0.08)",
              background: "rgb(10,10,10)",
              display: "flex",
              minHeight: 620,
            }}
          >
            {/* ── LEFT PANEL ── */}
            <div style={{ width: 400, flexShrink: 0, padding: "23px 23px", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: "1px solid rgba(56,56,56,0.8)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 700, fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                    Contrast Studio
                  </span>
                  <span style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 700, fontSize: 28, color: "#ffffff", lineHeight: 1.5 }}>
                    UX Growth Strategy
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <img src="/contact/clock.svg" alt="" aria-hidden="true" style={{ width: 20, height: 20 }} />
                    <span style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 700, fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>30 min</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <img src="/contact/phone.svg" alt="" aria-hidden="true" style={{ width: 20, height: 20 }} />
                    <span style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 700, fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>Video call</span>
                  </div>
                </div>
                <p style={{ margin: 0, fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 400, fontSize: 16, color: "#ffffff", lineHeight: 1.5 }}>
                  A focused 30-minute call to identify your biggest UX growth opportunity and walk away with a clear next step — no pitch, just real clarity.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 400, fontSize: 14, whiteSpace: "nowrap", marginTop: 24 }}>
                <span style={{ color: "#d90cb7", lineHeight: 1.5, cursor: "pointer" }}>Cookie settings</span>
                <span style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.5, cursor: "pointer" }}>Report abuse</span>
              </div>
            </div>

            {/* ── RIGHT PANEL — Motion embed ── */}
            <div style={{ flex: 1, minHeight: 620, position: "relative" }}>
              <iframe
                src={MOTION_URL}
                title="Book a call with Contrast Studio"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                  colorScheme: "dark",
                }}
                loading="lazy"
              />
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
