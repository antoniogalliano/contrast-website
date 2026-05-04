"use client";
import { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "Contrast";
const STAGGER     = 0.07;
const START_DELAY = 0.15;
const L_DURATION  = 0.75;
// Dot (index 8): delay = 0.71s, finishes at 1.46s

// ── Timeline ──────────────────────────────────────────────────────────────────
// 0 – 1460ms    letters animate in
// 1460 – 2700ms hold (~1240ms)
// 2700ms        "Contrast" fades (300ms); dot starts fading simultaneously
// 2700ms        sphere div appears at dot position and starts growing (1200ms)
// 3900ms        sphere div is at full hero-sphere size + position
// 3700ms        overlay starts fading (1100ms)  ← slight overlap for smoothness
// 4800ms        unmount / unlock scroll
const GROW_MS = 2700;
const FADE_MS = 3700;
const DONE_MS = 4800;

interface SphereGeom {
  // Dot centre in viewport px
  dotCX: number;
  dotCY: number;
  // Width of the "." character (start size of sphere div)
  dotW: number;
  // Translation to apply to reach hero-sphere centre
  tx: number;
  ty: number;
  // Scale factor: heroSphere diameter / dotW
  scale: number;
}

export default function IntroAnimation() {
  const [show,   setShow]   = useState(true);
  const [phase,  setPhase]  = useState<"in" | "grow" | "fade">("in");
  const [geom,   setGeom]   = useState<SphereGeom | null>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";

    // ── Step 1: start exit sequence ──────────────────────────────────────────
    const t1 = setTimeout(() => {
      if (dotRef.current) {
        const r  = dotRef.current.getBoundingClientRect();
        const dotCX = r.left + r.width  / 2;
        const dotCY = r.top  + r.height / 2;
        const dotW  = r.width;                         // ≈ period-character width

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Hero sphere: centred at viewport centre, radius = min(vw,vh) * 0.28
        const heroCX = vw / 2;
        const heroCY = vh / 2;
        const heroDiameter = Math.min(vw, vh) * 0.56;  // = radius * 2

        setGeom({
          dotCX, dotCY, dotW,
          tx: heroCX - dotCX,
          ty: heroCY - dotCY,
          scale: heroDiameter / dotW,
        });
      }
      setPhase("grow");
    }, GROW_MS);

    // ── Step 2: fade overlay ─────────────────────────────────────────────────
    const t2 = setTimeout(() => setPhase("fade"), FADE_MS);

    // ── Step 3: unmount ──────────────────────────────────────────────────────
    const t3 = setTimeout(() => {
      document.body.style.overflow = "";
      setShow(false);
    }, DONE_MS);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const isIn   = phase === "in";
  const isGrow = phase === "grow";
  const isFade = phase === "fade";

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
          {/* ── Sphere div ───────────────────────────────────────────────────
              Starts at dot size / dot position.
              Grows via scale + translate to match hero sphere exactly.
              Background gradient matches the canvas sphere's colour palette.
              Since background scales with the element, proportions are perfect.
          ─────────────────────────────────────────────────────────────────── */}
          {geom && (isGrow || isFade) && (
            <motion.div
              initial={{ scale: 1, x: 0, y: 0 }}
              animate={{
                scale: geom.scale,
                x:     geom.tx,
                y:     geom.ty,
              }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position:        "absolute",
                // Anchor top-left so centre sits exactly on the dot
                left:            geom.dotCX - geom.dotW / 2,
                top:             geom.dotCY - geom.dotW / 2,
                width:           geom.dotW,
                height:          geom.dotW,
                borderRadius:    "50%",
                transformOrigin: "center center",
                // Colours that approximate the particle sphere:
                // white-hot core → pink mid → deep purple glow → fade out
                background: `radial-gradient(
                  circle at center,
                  rgba(255, 248, 255, 1.0)  0%,
                  rgba(230,  80, 220, 0.9) 20%,
                  rgba(150,  20, 210, 0.75) 42%,
                  rgba(217,  12, 183, 0.45) 62%,
                  rgba(118,  12, 217, 0.2)  76%,
                  transparent               88%
                )`,
              }}
            />
          )}

          {/* ── Text row ─────────────────────────────────────────────────── */}
          <div
            style={{
              display:     "flex",
              alignItems:  "baseline",
              position:    "relative",
              zIndex:      2,
            }}
          >
            {/* "Contrast" — fades out when grow starts */}
            <motion.div
              animate={!isIn ? { opacity: 0 } : { opacity: 1 }}
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

            {/* Pink "." — fades and blurs out as sphere div takes its place */}
            <motion.span
              ref={dotRef}
              initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
              animate={
                !isIn
                  ? { opacity: 0, filter: "blur(16px)" }
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              transition={
                !isIn
                  ? { duration: 0.25, ease: "easeIn" }
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
