"use client";
import { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "Contrast"; // "." handled separately for independent animation

const STAGGER     = 0.07;
const START_DELAY = 0.15;
const L_DURATION  = 0.75;
// Last letter (index 7 "t"): delay = 0.15 + 7*0.07 = 0.64s, done at 1.39s
// Dot (index 8):             delay = 0.15 + 8*0.07 = 0.71s, done at 1.46s

// ── Timeline ─────────────────────────────────────────────────────────────────
// 0 – 1460ms   letters animate in
// 1460 – 2700ms  hold (text sits still, ~1.24s)
// 2700ms       "Contrast" letters fade out (300ms); dot stays + begins to grow
// 3000ms       dot glow is blooming; bloom div mounts at dot position
// 3200ms       overlay starts fading
// 4300ms       overlay gone, unmount, scroll unlocked
const LETTERS_FADE_MS = 2700;
const BLOOM_MS        = 3000; // bloom mounts (200ms after dot starts growing)
const FADE_MS         = 3200;
const DONE_MS         = 4300;

export default function IntroAnimation() {
  const [show,  setShow]  = useState(true);
  const [phase, setPhase] = useState<"in" | "burst" | "fade">("in");
  const [bloom, setBloom] = useState<{ left: number; top: number; size: number } | null>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";

    // Step 1: letters fade, dot starts growing
    const t1 = setTimeout(() => setPhase("burst"), LETTERS_FADE_MS);

    // Step 2: mount the bloom at dot's measured position
    const t2 = setTimeout(() => {
      if (dotRef.current) {
        const r  = dotRef.current.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const maxR = Math.max(
          Math.hypot(cx,      cy),
          Math.hypot(vw - cx, cy),
          Math.hypot(cx,      vh - cy),
          Math.hypot(vw - cx, vh - cy),
        );
        const size = (maxR + 80) * 2;
        setBloom({ left: cx - size / 2, top: cy - size / 2, size });
      }
    }, BLOOM_MS);

    // Step 3: overlay fades
    const t3 = setTimeout(() => setPhase("fade"), FADE_MS);

    // Step 4: unmount
    const t4 = setTimeout(() => {
      document.body.style.overflow = "";
      setShow(false);
    }, DONE_MS);

    return () => {
      clearTimeout(t1); clearTimeout(t2);
      clearTimeout(t3); clearTimeout(t4);
    };
  }, []);

  const isBurst = phase === "burst";
  const isFade  = phase === "fade";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          animate={isFade ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
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
          {/* ── Bloom: pink glow expands from dot position ── */}
          {bloom && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                left:         bloom.left,
                top:          bloom.top,
                width:        bloom.size,
                height:       bloom.size,
                borderRadius: "50%",
                background: `radial-gradient(
                  circle at center,
                  rgba(118, 12, 217, 0.85) 0%,
                  rgba(217, 12, 183, 0.65) 18%,
                  rgba(217, 12, 183, 0.28) 42%,
                  transparent 62%
                )`,
                filter: "blur(56px)",
              }}
            />
          )}

          {/* ── Layout row — letters + dot sit side by side ── */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* "Contrast" — fades out when burst starts */}
            <motion.div
              animate={isBurst || isFade ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              style={{ display: "flex", alignItems: "baseline" }}
            >
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
            </motion.div>

            {/* "." — pink, stays after letters, then grows into the bloom */}
            <motion.span
              ref={dotRef}
              initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
              animate={
                isBurst || isFade
                  ? { opacity: 0, scale: 4, filter: "blur(32px)" }
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              transition={
                isBurst || isFade
                  ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                  : {
                      duration: L_DURATION,
                      delay: START_DELAY + 8 * STAGGER,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              style={{
                display: "inline-block",
                fontFamily: "var(--font-urbanist), sans-serif",
                fontSize: "clamp(52px, 9vw, 128px)",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "#d90cb7",
                textShadow:
                  "0 0 24px rgba(217,12,183,0.95), 0 0 60px rgba(217,12,183,0.6), 0 0 120px rgba(118,12,217,0.4)",
              }}
            >
              .
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
