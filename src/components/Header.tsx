"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Logotype from "./Logotype";

const navLinks = [
  { label: "The Hero Framework", href: "#framework" },
  { label: "Work", href: "#work" },
  { label: "Our services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 z-50 w-full"
      style={{
        background: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{ maxWidth: 1440, padding: "0 48px", height: 90 }}
      >
        {/* Logo */}
        <a href="/" aria-label="Contrast home" style={{ display: "block", textDecoration: "none" }}>
          <Logotype width={120} />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center lg:flex" style={{ gap: 40 }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: 15,
                fontWeight: 400,
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#ffffff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <a
          href="#plan"
          className="btn-gradient-border hidden lg:flex"
          style={{
            alignItems: "center",
            gap: 4,
            borderRadius: 9999,
            padding: "0 24px",
            height: 48,
            fontSize: 14,
            fontWeight: 500,
            color: "#ffffff",
            textDecoration: "none",
          }}
        >
          Book a call
          <svg
            width="14"
            height="14"
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
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col lg:hidden"
          style={{ gap: 8 }}
          aria-label="Toggle menu"
        >
          <span
            style={{
              display: "block",
              height: 2,
              width: 24,
              background: "#fff",
              transition: "all 0.3s",
              transform: mobileOpen
                ? "translateY(4px) rotate(45deg)"
                : "none",
            }}
          />
          <span
            style={{
              display: "block",
              height: 2,
              width: 24,
              background: "#fff",
              transition: "all 0.3s",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              height: 2,
              width: 24,
              background: "#fff",
              transition: "all 0.3s",
              transform: mobileOpen
                ? "translateY(-4px) rotate(-45deg)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center lg:hidden"
          style={{ gap: 24, background: "#000", paddingBottom: 32, paddingTop: 16 }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#plan"
            className="btn-gradient-border"
            style={{
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
            }}
          >
            Book a call
            <svg
              width="14"
              height="14"
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
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
