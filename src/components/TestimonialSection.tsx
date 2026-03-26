"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const SLIDE_DURATION = 5000;

const TESTIMONIALS = [
  {
    quote:
      "We appreciate the vision and creativity Contrast brought to our website, and the fact that they understood our approach and could help us shape the story. We look forward to building on the foundation we\u2019ve developed with Contrast!",
    name: "Benjamin Oakes",
    title: "Co-founder & CEO / Scribe Therapeutics",
    photo: "/testimonials/benjamin-oakes.jpg",
  },
  {
    quote:
      "Contrast didn\u2019t just redesign our product \u2014 they transformed the way our users experience it. The results speak for themselves: engagement up, drop-off down, and a team that finally feels proud of what they ship.",
    name: "Sarah Chen",
    title: "VP of Product / Viably",
    photo: "/testimonials/benjamin-oakes.jpg",
  },
  {
    quote:
      "Working with Contrast was the best investment we made in our product this year. Their Hero Framework gave us a clear roadmap and the design execution was flawless.",
    name: "David Miller",
    title: "CEO / Designrr",
    photo: "/testimonials/benjamin-oakes.jpg",
  },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const startRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress: 0 when section top hits 80% of viewport, 1 when it hits 20%
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "start 0.2"],
  });

  const quoteOpacity = useTransform(scrollYProgress, [0, 1], [0.18, 1]);

  // Once fully revealed, lock in and hand off to carousel
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v >= 0.98 && !revealed) setRevealed(true);
    });
  }, [scrollYProgress, revealed]);

  const goTo = (index: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setCurrent(index);
    setSlideProgress(0);
  };

  useEffect(() => {
    if (!revealed) return;
    startRef.current = performance.now();
    setSlideProgress(0);

    const tick = (now: number) => {
      const p = Math.min((now - startRef.current) / SLIDE_DURATION, 1);
      setSlideProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCurrent((c) => (c + 1) % TESTIMONIALS.length);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [current, revealed]);

  const t = TESTIMONIALS[current];

  const quoteStyle: React.CSSProperties = {
    margin: 0,
    fontFamily: "var(--font-urbanist), sans-serif",
    fontWeight: 500,
    fontSize: "clamp(28px, 3.5vw, 50px)",
    lineHeight: 1.176,
    letterSpacing: "-0.01em",
    color: "#ffffff",
  };

  return (
    <section ref={sectionRef} style={{ padding: "120px 40px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", display: "flex", flexDirection: "column", gap: 96 }}>

        {/* Quote — scroll-driven opacity until revealed, then carousel fades */}
        {!revealed ? (
          <motion.blockquote style={{ ...quoteStyle, opacity: quoteOpacity }}>
            {t.quote}
          </motion.blockquote>
        ) : (
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              initial={{ opacity: 0.18 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={quoteStyle}
            >
              {t.quote}
            </motion.blockquote>
          </AnimatePresence>
        )}

        {/* Author row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: revealed ? 0 : 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ display: "flex", alignItems: "center", gap: 52 }}
            >
              <img
                src={t.photo}
                alt={t.name}
                style={{
                  width: 131,
                  height: 126,
                  borderRadius: 16,
                  border: "1px solid #242323",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <p style={{
                  margin: 0,
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontWeight: 400,
                  fontSize: 29,
                  color: "#ffffff",
                  lineHeight: "43.931px",
                }}>
                  {t.name}
                </p>
                <p style={{
                  margin: 0,
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontWeight: 400,
                  fontSize: 29,
                  color: "#888888",
                  lineHeight: "43.931px",
                }}>
                  {t.title}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            {TESTIMONIALS.map((_, i) => (
              <div
                key={i}
                onClick={() => goTo(i)}
                style={{
                  position: "relative",
                  height: 4,
                  width: i === current ? 76 : 8,
                  borderRadius: 45,
                  background: "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  overflow: "hidden",
                  transition: "width 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  flexShrink: 0,
                }}
              >
                {i === current && revealed && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      width: `${slideProgress * 100}%`,
                      background: "#ffffff",
                      borderRadius: 45,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
