"use client";
import { useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINE1 = "Contrast.";
const LINE2 = "Product Design Agency";

// Letter timing
const L1_DELAY_START = 0.15;  // when first letter of "Contrast." begins
const L1_STAGGER     = 0.07;  // gap between each letter
const L1_DURATION    = 0.75;  // per-letter duration

const L2_DELAY_START = 0.85;  // when first letter of subtitle begins (after Contrast. is ~halfway in)
const L2_STAGGER     = 0.038; // tighter stagger for smaller text
const L2_DURATION    = 0.55;  // per-letter duration

// Last letter of LINE2 finishes at: L2_DELAY_START + (21-1)*L2_STAGGER + L2_DURATION ≈ 2.17s
// Hold for ~650ms after that → trigger exit at 2800ms
const EXIT_TRIGGER_MS = 2800;
const EXIT_DURATION   = 0.75; // overlay fade-out duration (seconds)

export default function IntroAnimation() {
  const [show, setShow] = useState(true);

  useLayoutEffect(() => {
    // Skip intro on subsequent visits within the same session
    if (sessionStorage.getItem("intro-seen")) {
      setShow(false);
      return;
    }

    // Lock scroll while intro is running
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("intro-seen", "1");
    }, EXIT_TRIGGER_MS);

    return () => clearTimeout(t);
  }, []);

  const handleExitComplete = () => {
    document.body.style.overflow = "";
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {show && (
        <motion.div
          key="intro-overlay"
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            pointerEvents: "none",
          }}
        >
          {/* ── "Contrast." ── */}
          <div
            aria-hidden="true"
            style={{ display: "flex", alignItems: "baseline" }}
          >
            {LINE1.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: L1_DURATION,
                  delay: L1_DELAY_START + i * L1_STAGGER,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "clamp(52px, 9vw, 128px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </div>

          {/* ── "Product Design Agency" ── */}
          <div
            aria-hidden="true"
            style={{ display: "flex", alignItems: "baseline" }}
          >
            {LINE2.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: L2_DURATION,
                  delay: L2_DELAY_START + i * L2_STAGGER,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "clamp(13px, 1.5vw, 20px)",
                  fontWeight: 300,
                  lineHeight: 1,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#888888",
                }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
