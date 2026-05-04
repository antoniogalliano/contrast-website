"use client";
import { useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINE1 = "Contrast.";

// Letter timing
const L1_DELAY_START = 0.15;  // when first letter begins
const L1_STAGGER     = 0.07;  // gap between each letter
const L1_DURATION    = 0.75;  // per-letter duration

// Last letter finishes at: L1_DELAY_START + (9-1)*L1_STAGGER + L1_DURATION ≈ 1.46s
// Hold for ~650ms → trigger exit at 2100ms
const EXIT_TRIGGER_MS = 2100;
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
            alignItems: "center",
            justifyContent: "center",
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
