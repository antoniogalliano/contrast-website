"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Logotype from "./Logotype";
import { setLogoOrigin, shouldSkipIntro } from "@/lib/introState";

const navLinks = [
  { label: "The Hero Framework", href: "/#framework" },
  { label: "Work", href: "/#work" },
  { label: "Our services", href: "/#services" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/#contact" },
];

function handleNavClick(href: string, e: React.MouseEvent) {
  const hash = href.startsWith("/#") ? href.slice(2) : href.startsWith("#") ? href.slice(1) : null;
  if (!hash) return;
  e.preventDefault();
  const el = document.getElementById(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = href;
  }
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const introDelay =
    pathname === "/" && typeof window !== "undefined" && !shouldSkipIntro()
      ? 3.8
      : 0;

  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const measure = () => {
      if (!logoRef.current) return;
      const r = logoRef.current.getBoundingClientRect();
      setLogoOrigin({ cx: r.left + r.width / 2, cy: r.top + r.height / 2, width: r.width });
    };
    const id = requestAnimationFrame(measure);
    return () => {
      cancelAnimationFrame(id);
      setLogoOrigin(null);
    };
  }, []);

  return (
    <>
    <div
      className="header-outer"
      style={{
        position:       "fixed",
        top:            20,
        left:           0,
        right:          0,
        zIndex:         50,
        display:        "flex",
        justifyContent: "center",
        padding:        "0 40px",
        boxSizing:      "border-box",
        pointerEvents:  "none",
      }}
    >
      {/* position:relative so the dropdown is anchored to this container */}
      <div style={{ width: "100%", maxWidth: 1360, pointerEvents: "auto", position: "relative" }}>

        {/* Pill — always pill-shaped, never changes form */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: introDelay, ease: "easeOut" }}
          style={{
            width:                "100%",
            borderRadius:         9999,
            background:           "rgba(10, 10, 10, 0.55)",
            backdropFilter:       "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border:               "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow:            "0 8px 32px rgba(0, 0, 0, 0.4)",
            overflow:             "hidden",
          }}
        >
          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              padding:        "0 13px 0 28px",
              height:         68,
            }}
          >
            <a
              ref={logoRef}
              href="/"
              aria-label="Contrast home"
              style={{ display: "block", textDecoration: "none" }}
            >
              <Logotype width={110} />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex" style={{ alignItems: "center", gap: 36 }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, e)}
                  style={{
                    fontSize:       14,
                    fontWeight:     400,
                    color:          "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition:     "color 0.2s",
                    whiteSpace:     "nowrap",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <a
              href="https://app.usemotion.com/meet/sagi-shrieber/ux-strategy-call"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient-border hidden lg:flex"
              style={{
                alignItems:     "center",
                gap:            6,
                borderRadius:   9999,
                padding:        "0 20px",
                height:         42,
                fontSize:       13,
                fontWeight:     500,
                color:          "#ffffff",
                textDecoration: "none",
                whiteSpace:     "nowrap",
              }}
            >
              Book a call
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col lg:hidden"
              style={{ gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display:    "block",
                    height:     1.5,
                    width:      22,
                    background: "#fff",
                    transition: "transform 0.28s ease, opacity 0.2s ease",
                    transform:
                      i === 0 && mobileOpen ? "translateY(6.5px) rotate(45deg)"
                      : i === 2 && mobileOpen ? "translateY(-6.5px) rotate(-45deg)"
                      : "none",
                    opacity: i === 1 && mobileOpen ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </motion.header>

        {/* Mobile dropdown — separate panel below the pill, no shape morph */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              key="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              style={{
                position:             "absolute",
                top:                  "calc(100% + 8px)",
                left:                 0,
                right:                0,
                borderRadius:         20,
                background:           "rgba(10, 10, 10, 0.82)",
                backdropFilter:       "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border:               "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow:            "0 8px 32px rgba(0, 0, 0, 0.5)",
                overflow:             "hidden",
              }}
            >
              <div
                style={{
                  display:       "flex",
                  flexDirection: "column",
                  alignItems:    "center",
                  gap:           20,
                  padding:       "24px 28px 28px",
                }}
              >
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { setMobileOpen(false); handleNavClick(link.href, e); }}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, duration: 0.18, ease: "easeOut" }}
                    style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", textDecoration: "none" }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="https://app.usemotion.com/meet/sagi-shrieber/ux-strategy-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient-border"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + navLinks.length * 0.04, duration: 0.18, ease: "easeOut" }}
                  style={{
                    display:        "flex",
                    alignItems:     "center",
                    gap:            6,
                    borderRadius:   9999,
                    padding:        "0 20px",
                    height:         42,
                    fontSize:       13,
                    fontWeight:     500,
                    color:          "#ffffff",
                    textDecoration: "none",
                    marginTop:      4,
                  }}
                >
                  Book a call
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

      </div>
    </div>

    <style jsx global>{`
      @media (max-width: 640px) {
        .header-outer {
          padding: 0 20px !important;
        }
      }
    `}</style>
    </>
  );
}
