"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionH = sectionRef.current.offsetHeight;
        // 0 when top of section is at top of viewport, 1 when fully scrolled past
        const progress = Math.max(0, -rect.top / sectionH);
        setScrollY(progress);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parallax speeds — higher = moves faster on scroll
  const bgY = scrollY * 500;           // background moves slowest
  const headingY = scrollY * 900;      // heading moves medium
  const subtitleY = scrollY * 1100;    // subtitle moves a bit faster
  const ctaY = scrollY * 1300;         // CTA moves fastest
  const scrollIndY = scrollY * 1500;

  // Fade out as user scrolls
  const fadeOut = Math.max(0, 1 - scrollY * 3.5);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "0 24px",
        overflow: "hidden",
      }}
    >
      {/* Background with slowest parallax */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(-${bgY}px)`,
          willChange: "transform",
        }}
      >
        <HeroBackground />
      </div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.0, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 900,
          textAlign: "center",
          fontWeight: 600,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          color: "#ffffff",
          fontSize: "clamp(38px, 5.5vw, 78px)",
          transform: `translateY(-${headingY}px)`,
          opacity: fadeOut,
          willChange: "transform, opacity",
        }}
      >
        AI Can Generate a Design.
        <br />
        It Can&apos;t Tell You If It&apos;s the
        <br />
        Right One.
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.3, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: 36,
          maxWidth: "35em",
          textAlign: "center",
          fontSize: "clamp(0.875rem, 1.25vw, 1.25rem)",
          lineHeight: "1.5em",
          fontWeight: 300,
          fontFamily: "var(--font-geist), sans-serif",
          color: "#ffffff",
          transform: `translateY(-${subtitleY}px)`,
          opacity: fadeOut,
          willChange: "transform, opacity",
        }}
      >
        Our frameworks use psychology, behavior science, and user
        <br />
        triggers to increase conversions, adoption, and retention
      </motion.p>

      {/* CTA Button */}
      <motion.a
        href="#plan"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.5, ease: "easeOut" }}
        className="btn-gradient-border"
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: 40,
          display: "flex",
          alignItems: "center",
          gap: 4,
          borderRadius: 9999,
          padding: "0 24px",
          height: 48,
          fontSize: 14,
          fontWeight: 500,
          color: "#ffffff",
          textDecoration: "none",
          transform: `translateY(-${ctaY}px)`,
          opacity: fadeOut,
          willChange: "transform, opacity",
        }}
      >
        Free UX growth plan
        <svg
          width="15"
          height="15"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.a>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: Math.max(0, 1 - scrollY * 5) }}
        transition={{ duration: scrollY > 0 ? 0 : 0.8, delay: scrollY > 0 ? 0 : 2.0 }}
        style={{
          position: "absolute",
          zIndex: 1,
          bottom: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          transform: `translateY(-${scrollIndY}px)`,
          willChange: "transform, opacity",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase" as const,
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          Scroll down
        </span>
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 3V13M8 13L3 8M8 13L13 8"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
