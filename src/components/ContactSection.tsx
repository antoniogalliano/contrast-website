"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// ── Helpers ────────────────────────────────────────────────────────────────
const DAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y: number, m: number)    { return new Date(y, m, 1).getDay(); }

// ── Calendar ───────────────────────────────────────────────────────────────
function Calendar() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year,  setYear]  = useState(now.getFullYear());
  const [selected, setSelected] = useState<number | null>(null);

  const totalDays = getDaysInMonth(year, month);
  const startDay  = getFirstDay(year, month);

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y-1); } else setMonth(m => m-1); setSelected(null); };
  const nextMonth = () => { if (month === 11){ setMonth(0);  setYear(y => y+1); } else setMonth(m => m+1); setSelected(null); };

  // Build 7 columns
  const cols: (number | null)[][] = Array.from({ length: 7 }, () => []);
  let dayCount = 1;
  for (let row = 0; dayCount <= totalDays; row++) {
    for (let col = 0; col < 7; col++) {
      if (row === 0 && col < startDay) { cols[col].push(null); }
      else if (dayCount <= totalDays) { cols[col].push(dayCount++); }
    }
  }

  const todayNum  = now.getDate();
  const isThisMonth = month === now.getMonth() && year === now.getFullYear();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
      {/* Month nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <button onClick={prevMonth} style={{ all: "unset", cursor: "pointer", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/contact/prev.svg" alt="Previous" style={{ width: 38, height: 38 }} />
        </button>
        <span style={{ fontFamily: "var(--font-urbanist)", fontWeight: 400, fontSize: 16, color: "#ffffff", textAlign: "center", whiteSpace: "nowrap", lineHeight: 1.5 }}>
          {MONTHS[month]} {year}
        </span>
        <button onClick={nextMonth} style={{ all: "unset", cursor: "pointer", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/contact/next.svg" alt="Next" style={{ width: 38, height: 38 }} />
        </button>
      </div>

      {/* Days — 7 column layout */}
      <div className="cal-days-row" style={{ display: "flex", gap: 8, width: "100%", alignItems: "flex-start" }}>
        {cols.map((colDays, colIdx) => (
          <div key={colIdx} style={{ flex: "1 0 0", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
            {/* Day header */}
            <span className="cal-col-header" style={{ fontFamily: "var(--font-urbanist)", fontWeight: 400, fontSize: 12, color: "#ffffff", textTransform: "uppercase", lineHeight: "12px", textAlign: "center", width: 44 }}>
              {DAY_LABELS[colIdx]}
            </span>
            {/* Date buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              {colDays.map((d, i) => {
                if (d === null) return <div key={i} className="cal-day-cell" style={{ width: 44, height: 44 }} />;
                const isPast    = isThisMonth && d < todayNum;
                const isToday   = isThisMonth && d === todayNum;
                const isSel     = selected === d;
                const isAvail   = !isPast;
                return (
                  <button
                    key={i}
                    className="cal-day-cell"
                    onClick={() => isAvail && setSelected(d)}
                    style={{
                      all: "unset",
                      position: "relative",
                      width: 44,
                      height: 44,
                      borderRadius: 999,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: isAvail ? "pointer" : "default",
                      background: isSel
                        ? "rgba(217,12,183,0.18)"
                        : isToday
                          ? "rgba(217,12,183,0.08)"
                          : "transparent",
                      transition: "background 0.15s",
                    }}
                  >
                    {/* Dot for today */}
                    {isToday && (
                      <span style={{ position: "absolute", left: 20, top: 31.5, width: 4, height: 4, background: "rgba(255,255,255,0.61)", borderRadius: 2 }} />
                    )}
                    <span style={{
                      fontFamily: "var(--font-urbanist)",
                      fontWeight: isSel || isToday ? 700 : 400,
                      fontSize: 16,
                      color: isPast
                        ? "rgba(255,255,255,0.2)"
                        : isSel || isToday
                          ? "#d90cb7"
                          : "rgba(255,255,255,0.61)",
                      lineHeight: 1.5,
                      textAlign: "center",
                    }}>
                      {d}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ContactSection() {
  return (
    <section id="contact" style={{ padding: "120px 40px 300px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", display: "flex", justifyContent: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="contact-wrapper"
          style={{ position: "relative", width: 800, display: "flex", flexDirection: "column", gap: 55, alignItems: "center" }}
        >
          {/* ── Background glows ── */}
          <div style={{ position: "absolute", left: 132.5, bottom: 0, width: 535, height: 32, pointerEvents: "none", mixBlendMode: "plus-lighter", zIndex: 0 }}>
            <div style={{ width: "100%", height: "100%", borderRadius: 153.675, filter: "blur(28.8px)", background: "linear-gradient(to right, rgba(217,12,183,0.27), rgba(217,12,183,0.75) 53%, rgba(118,12,217,0.75))" }} />
          </div>
          <div style={{ position: "absolute", left: "50%", top: 237, transform: "translateX(-50%)", width: 769, height: 289, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", mixBlendMode: "plus-lighter", zIndex: 0 }}>
            <div style={{ flexShrink: 0, transform: "rotate(90deg)" }}>
              <div style={{ width: 289, height: 769, borderRadius: 607.666, filter: "blur(178.645px)", background: "linear-gradient(to bottom, rgba(217,12,183,0.27), rgba(217,12,183,0.75) 53.103%, rgba(118,12,217,0.75))" }} />
            </div>
          </div>

          {/* ── Heading ── */}
          <div className="contact-heading" style={{ width: 548, display: "flex", flexDirection: "column", gap: 19, alignItems: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
            <h2 style={{ margin: 0, fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: 35, color: "#ffffff", letterSpacing: "-0.35px", width: "100%", lineHeight: "normal" }}>
              30 Minutes. Real Clarity
            </h2>
            <p style={{ margin: 0, fontFamily: "var(--font-geist), sans-serif", fontWeight: 400, fontSize: 16, color: "#b0b0b0", opacity: 0.8, width: "100%", lineHeight: 1.5 }}>
              Book a call and let&apos;s talk. No pitch, just an honest conversation about your product and how we can help.
            </p>
          </div>

          {/* ── Booking card ── */}
          <div
            className="booking-card"
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: 592,
              borderRadius: 16,
              border: "1px solid #d90cb7",
              overflow: "hidden",
              boxShadow: "0px 1px 8px 0px rgba(0,0,0,0.08)",
              background: "rgb(10,10,10)",
            }}
          >
            {/* Vertical divider */}
            <div className="booking-divider" style={{ position: "absolute", left: 399, top: -1, width: 1, height: 592, background: "rgba(56,56,56,0.8)" }} />

            {/* Troubleshooting — plain text link, bottom-right of card */}
            <span className="booking-troubleshoot" style={{ position: "absolute", bottom: 23, right: 24, fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 400, fontSize: 14, color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap", lineHeight: 1.5, cursor: "pointer" }}>
              Troubleshooting
            </span>

            {/* ── LEFT PANEL ── */}
            <div className="booking-left" style={{ position: "absolute", left: 23, top: 23, width: 352, height: 544, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
              {/* Top */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
                {/* Title block */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 700, fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                    Contrast Studio
                  </span>
                  <span style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 700, fontSize: 28, color: "#ffffff", lineHeight: 1.5 }}>
                    UX Growth Strategy
                  </span>
                </div>
                {/* Details */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <img src="/contact/clock.svg" alt="" aria-hidden="true" style={{ width: 20, height: 20 }} />
                    <span style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 700, fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>30 min</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <img src="/contact/phone.svg" alt="" aria-hidden="true" style={{ width: 20, height: 20 }} />
                    <span style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 700, fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>Video call</span>
                  </div>
                </div>
                {/* Description */}
                <p style={{ margin: 0, fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 400, fontSize: 16, color: "#ffffff", lineHeight: 1.5, width: "100%" }}>
                  A focused 30-minute call to identify your biggest UX growth opportunity and walk away with a clear next step — no pitch, just real clarity.
                </p>
              </div>
              {/* Bottom links */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 400, fontSize: 14, width: "100%", whiteSpace: "nowrap" }}>
                <span style={{ color: "#d90cb7", lineHeight: 1.5, cursor: "pointer" }}>Cookie settings</span>
                <span style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.5, cursor: "pointer" }}>Report abuse</span>
              </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="booking-right" style={{ position: "absolute", left: 424, top: 23, width: 351, display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start" }}>
              {/* Calendar heading */}
              <span style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 700, fontSize: 20, color: "#ffffff", lineHeight: 1.5, width: "100%" }}>
                Select a Date &amp; Time
              </span>

              <Calendar />

              {/* Timezone */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
                <span style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 700, fontSize: 16, color: "#ffffff", lineHeight: 1.5 }}>Time zone</span>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <img src="/contact/globe.svg" alt="" aria-hidden="true" style={{ width: 14, height: 14 }} />
                  <span style={{ fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 400, fontSize: 14, color: "#ffffff", lineHeight: 1.5, whiteSpace: "nowrap" }}>
                    Your local time zone
                  </span>
                  <img src="/contact/chevron.svg" alt="" aria-hidden="true" style={{ width: 8, height: 8, marginLeft: 4 }} />
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
      <style jsx global>{`
        @media (max-width: 768px) {
          .contact-wrapper {
            width: 100% !important;
          }
          .contact-heading {
            width: 100% !important;
          }
          .booking-card {
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .booking-divider,
          .booking-troubleshoot {
            display: none !important;
          }
          .booking-left {
            position: static !important;
            width: auto !important;
            height: auto !important;
            padding: 24px !important;
            border-bottom: 1px solid rgba(56,56,56,0.8) !important;
            box-sizing: border-box !important;
          }
          .booking-right {
            position: static !important;
            width: auto !important;
            padding: 24px !important;
            box-sizing: border-box !important;
          }
          .cal-days-row {
            gap: 2px !important;
          }
          .cal-col-header {
            width: 34px !important;
            font-size: 10px !important;
          }
          .cal-day-cell {
            width: 34px !important;
            height: 34px !important;
          }
        }
      `}</style>
    </section>
  );
}
