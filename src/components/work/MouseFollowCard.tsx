"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

export function MouseFollowCard({
  children,
  delay = 0,
  padding = "36px 32px",
}: {
  children: React.ReactNode;
  delay?: number;
  padding?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const borderBg = hovered
    ? `radial-gradient(circle 280px at ${mouse.x}px ${mouse.y}px, #d90cb7 0%, rgba(56,56,56,0.62) 55%)`
    : "rgba(56,56,56,0.7)";

  const spotlightBg = `radial-gradient(circle 320px at ${mouse.x - 1}px ${mouse.y - 1}px, rgba(217,12,183,0.12) 0%, transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        padding: 1,
        borderRadius: 17,
        background: borderBg,
        transition: hovered ? "none" : "background 0.4s ease",
        cursor: "default",
      }}
    >
      <div
        style={{
          padding,
          borderRadius: 16,
          background: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Mouse-follow spotlight */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: hovered ? 1 : 0,
            transition: hovered ? "none" : "opacity 0.4s ease",
            background: spotlightBg,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </div>
    </motion.div>
  );
}
