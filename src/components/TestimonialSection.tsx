"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "framer-motion";

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

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      {direction === "left"
        ? <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      }
    </svg>
  );
}

function NavButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 44, height: 44,
        borderRadius: "50%",
        border: `1px solid ${hovered ? "#d90cb7" : "rgba(255,255,255,0.18)"}`,
        background: hovered ? "rgba(217,12,183,0.08)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        color: hovered ? "#d90cb7" : "rgba(255,255,255,0.6)",
        transition: "border-color 0.25s ease, background 0.25s ease, color 0.25s ease",
        flexShrink: 0,
      }}
    >
      <Arrow direction={direction} />
    </button>
  );
}

export default function TestimonialSection() {
  const [current, setCurrent]           = useState(0);
  const [revealProgress, setRevealProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "start 0.2"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 18, restDelta: 0.001 });

  // Store 0–1 progress so any testimonial can use it
  useMotionValueEvent(smoothProgress, "change", (v) => {
    setRevealProgress(v);
  });

  const goTo = (index: number) => setCurrent(index);
  const goPrev = () => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goNext = () => goTo((current + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];
  const words = t.quote.split(" ");
  const revealedCount = Math.round(revealProgress * words.length);

  const quoteBase: React.CSSProperties = {
    margin: 0,
    fontFamily: "var(--font-urbanist), sans-serif",
    fontWeight: 500,
    fontSize: "clamp(28px, 3.5vw, 50px)",
    lineHeight: 1.176,
    letterSpacing: "-0.01em",
  };

  return (
    <section ref={sectionRef} style={{ padding: "120px 40px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", display: "flex", flexDirection: "column", gap: 96 }}>

        {/* Quote — always word-by-word, fades when switching slides */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={quoteBase}
          >
            {words.map((word, i) => (
              <span
                key={i}
                style={{
                  color: i < revealedCount ? "#ffffff" : "rgba(255,255,255,0.18)",
                  transition: "color 0.2s ease",
                }}
              >
                {word}{i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </motion.p>
        </AnimatePresence>

        {/* Author row */}
        <div className="testimonial-author-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>

          {/* Author */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="testimonial-author"
              style={{ display: "flex", alignItems: "center", gap: 52 }}
            >
              <img
                src={t.photo}
                alt={t.name}
                className="testimonial-photo"
                style={{
                  width: 131, height: 126,
                  borderRadius: 16,
                  border: "1px solid #242323",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <p className="testimonial-name" style={{
                  margin: 0,
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontWeight: 400, fontSize: 29,
                  color: "#ffffff", lineHeight: "43.931px",
                }}>
                  {t.name}
                </p>
                <p className="testimonial-title" style={{
                  margin: 0,
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontWeight: 400, fontSize: 29,
                  color: "#888888", lineHeight: "43.931px",
                }}>
                  {t.title}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls: arrows + pagination dots */}
          <div className="testimonial-controls" style={{ display: "flex", gap: 16, alignItems: "center", flexShrink: 0 }}>
            <NavButton direction="left" onClick={goPrev} />

            <div className="testimonial-dots" style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {TESTIMONIALS.map((_, i) => (
                <div
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    height: 4,
                    width: i === current ? 76 : 8,
                    borderRadius: 45,
                    background: i === current ? "#ffffff" : "rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    transition: "width 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            <NavButton direction="right" onClick={goNext} />
          </div>

        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 768px) {
          .testimonial-author-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 28px !important;
          }
          .testimonial-author {
            gap: 20px !important;
          }
          .testimonial-photo {
            width: 72px !important;
            height: 68px !important;
          }
          .testimonial-name,
          .testimonial-title {
            font-size: 18px !important;
            line-height: 1.4 !important;
          }
          .testimonial-controls {
            width: 100% !important;
            justify-content: space-between !important;
            flex-shrink: 0 !important;
          }
          .testimonial-dots {
            flex: 1 !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
