"use client";

import { motion } from "framer-motion";

export default function TestimonialSection() {
  return (
    <section style={{ padding: "120px 40px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Stars */}
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 36 }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 1L11.09 6.26L17 7.27L13 11.14L14.18 17L9 14.27L3.82 17L5 11.14L1 7.27L6.91 6.26L9 1Z"
                  fill="#d90cb7"
                  stroke="#d90cb7"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <blockquote
            style={{
              fontSize: "clamp(16px, 1.5vw, 20px)",
              fontWeight: 300,
              color: "#e8e8e8",
              lineHeight: 1.75,
              fontFamily: "var(--font-geist), sans-serif",
              margin: "0 0 40px",
              fontStyle: "normal",
            }}
          >
            &ldquo;We appreciate the vision and creativity Contrast brought to our website, and the
            fact that they understood our approach and could help us shape the story. We look
            forward to building on the foundation we&rsquo;ve developed with Contrast!&rdquo;
          </blockquote>

          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "rgba(217,12,183,0.15)",
                border: "1px solid rgba(217,12,183,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#d90cb7",
                  fontFamily: "var(--font-urbanist), sans-serif",
                }}
              >
                C
              </span>
            </div>
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#ffffff",
                  margin: 0,
                  fontFamily: "var(--font-urbanist), sans-serif",
                }}
              >
                Client Partner
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "#888888",
                  margin: 0,
                  fontFamily: "var(--font-geist), sans-serif",
                }}
              >
                CRISPR Engineering Company
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
