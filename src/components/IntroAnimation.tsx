"use client";
import { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { setDotOrigin } from "@/lib/introState";

const LETTERS = "Contrast";
const STAGGER     = 0.07;
const START_DELAY = 0.15;
const L_DURATION  = 0.75;
// Dot (index 8): delay 0.71s, animation done at 1.46s

// ── Timeline ──────────────────────────────────────────────────────────────────
// 0 – 1460ms    letters animate in
// 1460 – 2700ms hold (~1240ms)
// 2700ms        "Contrast" fades (300ms); dot blurs out (350ms)
//               → dotOrigin is recorded; HeroBackground particles start
//                 streaming FROM the dot position toward the sphere
// 3050ms        overlay starts fading (1100ms)
// 4150ms        unmount / unlock scroll
const TRANSITION_MS = 2700; // start of exit
const FADE_MS       = 3050; // overlay begins fading
const DONE_MS       = 4150; // unmount

export default function IntroAnimation() {
  const [show,  setShow]  = useState(true);
  const [phase, setPhase] = useState<"in" | "out" | "fade">("in");
  const dotRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";

    // Record dot position + kick off particle animation
    const t1 = setTimeout(() => {
      if (dotRef.current) {
        const r = dotRef.current.getBoundingClientRect();
        setDotOrigin({
          x: r.left + r.width  / 2,
          y: r.top  + r.height / 2,
        });
      }
      setPhase("out");
    }, TRANSITION_MS);

    const t2 = setTimeout(() => setPhase("fade"), FADE_MS);

    const t3 = setTimeout(() => {
      document.body.style.overflow = "";
      setDotOrigin(null); // clean up
      setShow(false);
    }, DONE_MS);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const isOut  = phase === "out";
  const isFade = phase === "fade";
  const exiting = isOut || isFade;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          animate={isFade ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          style={{
            position:        "fixed",
            inset:           0,
            zIndex:          9999,
            background:      "#0a0a0a",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            pointerEvents:   "none",
          }}
        >
          {/* ── Text row ── */}
          <div style={{ display: "flex", alignItems: "baseline", position: "relative", zIndex: 2 }}>

            {/* "Contrast" — fades when exit begins */}
            <motion.div
              animate={exiting ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              style={{ display: "flex", alignItems: "baseline" }}
            >
              {LETTERS.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
                  transition={{
                    duration: L_DURATION,
                    delay:    START_DELAY + i * STAGGER,
                    ease:     [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    display:       "inline-block",
                    fontFamily:    "var(--font-urbanist), sans-serif",
                    fontSize:      "clamp(52px, 9vw, 128px)",
                    fontWeight:    700,
                    lineHeight:    1,
                    letterSpacing: "-0.02em",
                    color:         "#ffffff",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Pink "." — blurs out a touch slower so particles seem to emerge from it */}
            <motion.span
              ref={dotRef}
              initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
              animate={
                exiting
                  ? { opacity: 0, filter: "blur(20px)" }
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              transition={
                exiting
                  ? { duration: 0.35, ease: "easeIn" }
                  : {
                      duration: L_DURATION,
                      delay:    START_DELAY + 8 * STAGGER,
                      ease:     [0.22, 1, 0.36, 1],
                    }
              }
              style={{
                display:       "inline-block",
                fontFamily:    "var(--font-urbanist), sans-serif",
                fontSize:      "clamp(52px, 9vw, 128px)",
                fontWeight:    700,
                lineHeight:    1,
                letterSpacing: "-0.02em",
                color:         "#d90cb7",
                textShadow:
                  "0 0 20px rgba(217,12,183,0.95), 0 0 50px rgba(217,12,183,0.6), 0 0 100px rgba(118,12,217,0.4)",
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
