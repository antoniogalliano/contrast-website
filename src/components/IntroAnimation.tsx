"use client";
import { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "Contrast"; // "." is handled separately so we can ref it

const STAGGER     = 0.07;
const START_DELAY = 0.15;
const L_DURATION  = 0.75;
// Dot is index 8 → delay = 0.15 + 8*0.07 = 0.71s, finishes at 1.46s
// Hold ~600ms → burst starts at 2050ms

const BURST_MS = 2700; // letters start fading + sphere starts expanding
const FADE_MS  = 3000; // overlay starts fading (300ms after burst)
const DONE_MS  = 3850; // unmount + restore scroll

export default function IntroAnimation() {
  const [show,   setShow]   = useState(true);
  const [phase,  setPhase]  = useState<"in" | "burst" | "fade">("in");
  const [sphere, setSphere] = useState<{ left: number; top: number; size: number } | null>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (sessionStorage.getItem("intro-seen")) {
      setShow(false);
      return;
    }
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => {
      // Measure the dot and compute a circle large enough to cover the viewport
      if (dotRef.current) {
        const r    = dotRef.current.getBoundingClientRect();
        const cx   = r.left + r.width  / 2;
        const cy   = r.top  + r.height / 2;
        const vw   = window.innerWidth;
        const vh   = window.innerHeight;
        // Radius = farthest viewport corner from the dot center
        const maxR = Math.max(
          Math.hypot(cx,      cy),
          Math.hypot(vw - cx, cy),
          Math.hypot(cx,      vh - cy),
          Math.hypot(vw - cx, vh - cy),
        );
        const size = (maxR + 80) * 2; // diameter, +80px safety margin
        setSphere({ left: cx - size / 2, top: cy - size / 2, size });
      }
      setPhase("burst");
    }, BURST_MS);

    const t2 = setTimeout(() => setPhase("fade"), FADE_MS);

    const t3 = setTimeout(() => {
      document.body.style.overflow = "";
      setShow(false);
      sessionStorage.setItem("intro-seen", "1");
    }, DONE_MS);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          animate={phase === "fade" ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* ── Expanding pink sphere ── */}
          {sphere && phase !== "in" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                left:   sphere.left,
                top:    sphere.top,
                width:  sphere.size,
                height: sphere.size,
                borderRadius: "50%",
                background: `radial-gradient(
                  circle at center,
                  rgba(118, 12, 217, 0.95) 0%,
                  #d90cb7 28%,
                  rgba(217, 12, 183, 0.5) 55%,
                  transparent 72%
                )`,
                filter: "blur(48px)",
              }}
            />
          )}

          {/* ── Letters ── */}
          <motion.div
            animate={phase !== "in" ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeIn" }}
            style={{
              display: "flex",
              alignItems: "baseline",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* "Contrast" */}
            {LETTERS.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: L_DURATION,
                  delay: START_DELAY + i * STAGGER,
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
                {char}
              </motion.span>
            ))}

            {/* "." — pink, with a soft glow */}
            <motion.span
              ref={dotRef}
              initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: L_DURATION,
                delay: START_DELAY + 8 * STAGGER,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-urbanist), sans-serif",
                fontSize: "clamp(52px, 9vw, 128px)",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "#d90cb7",
                textShadow:
                  "0 0 24px rgba(217,12,183,0.9), 0 0 60px rgba(217,12,183,0.5), 0 0 100px rgba(118,12,217,0.3)",
              }}
            >
              .
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
