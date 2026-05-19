"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logotype from "./Logotype";
import { setLogoOrigin, shouldSkipIntro } from "@/lib/introState";

const navLinks = [
  { label: "The Hero Framework", href: "/#framework" },
  { label: "Work", href: "/#work" },
  { label: "Our services", href: "/#services" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [introDelay, setIntroDelay] = useState(3.8);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    if (shouldSkipIntro()) setIntroDelay(0);
  }, []);

  // Measure the logo's natural screen position so IntroAnimation can morph into it.
  // We use opacity-only entrance (no y-slide) so the logo is already at its true
  // layout position the moment it's mounted, no transform offset to compensate for.
  useEffect(() => {
    const measure = () => {
      if (!logoRef.current) return;
      const r = logoRef.current.getBoundingClientRect();
      setLogoOrigin({ cx: r.left + r.width / 2, cy: r.top + r.height / 2, width: r.width });
    };
    // rAF to let the browser finish the first paint
    const id = requestAnimationFrame(measure);
    return () => {
      cancelAnimationFrame(id);
      setLogoOrigin(null);
    };
  }, []);

  return (
    /*
      Positioning wrapper, plain div, Framer Motion never touches this element.
      Outer: full-width fixed flex shell (no transforms needed).
      Inner: width-capped slot the animated header fills.
    */
    <div
      style={{
        position:       "fixed",
        top:            20,
        left:           0,
        right:          0,
        zIndex:         50,
        display:        "flex",
        justifyContent: "center",
        pointerEvents:  "none",
      }}
    >
      <div className="header-shell" style={{ width: "calc(100% - 80px)", maxWidth: 1360, pointerEvents: "auto" }}>

        {/* Opacity-only entrance, no y-slide so logo sits at its true layout position from mount */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: introDelay, ease: "easeOut" }}
          style={{
            width:                "100%",
            borderRadius:         mobileOpen ? 24 : 9999,
            background:           "rgba(10, 10, 10, 0.55)",
            backdropFilter:       "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border:               "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow:            "0 8px 32px rgba(0, 0, 0, 0.4)",
            transition:           "border-radius 0.35s ease",
            overflow:             "hidden",
          }}
        >
          {/* Main bar */}
          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              padding:        "0 13px 0 28px",
              height:         68,
            }}
          >
            {/* Logo, ref lets IntroAnimation measure its exact position */}
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
              href="/#contact"
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
                    transition: "all 0.3s",
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

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.nav
                key="mobile-nav"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    display:       "flex",
                    flexDirection: "column",
                    alignItems:    "center",
                    gap:           20,
                    padding:       "16px 28px 28px",
                    borderTop:     "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", textDecoration: "none" }}
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="/#contact"
                    className="btn-gradient-border"
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
                  </a>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.header>

      </div>
    </div>

    <style>{`
      @media (max-width: 640px) {
        .header-shell {
          width: calc(100% - 40px) !important;
        }
      }
    `}</style>
  );
}
