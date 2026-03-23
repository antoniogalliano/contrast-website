"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ACCENT = "#d90cb7";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function ContactSection() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDay(null);
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <section id="contact" style={{ padding: "120px 40px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "3.9px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 20,
              fontFamily: "var(--font-urbanist), sans-serif",
            }}
          >
            Let's Talk
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              margin: "0 auto 20px",
              maxWidth: 640,
            }}
          >
            Book a Free Strategy Call
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 1.2vw, 18px)",
              color: "#b0b0b0",
              fontFamily: "var(--font-geist), sans-serif",
              fontWeight: 300,
              lineHeight: 1.6,
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            30 minutes. No fluff. We&apos;ll identify your biggest UX growth opportunity and how to
            act on it.
          </p>
        </motion.div>

        {/* Booking card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            maxWidth: 860,
            margin: "0 auto",
            borderRadius: 20,
            border: "1px solid #383838",
            background: "#0a0a0a",
            overflow: "hidden",
            display: "flex",
          }}
          className="booking-card"
        >
          {/* Left panel */}
          <div
            style={{
              flex: "0 0 auto",
              width: 320,
              padding: "40px 36px",
              borderRight: "1px solid #383838",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
            className="booking-left"
          >
            {/* Logo */}
            <div>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  fontFamily: "var(--font-urbanist), sans-serif",
                }}
              >
                Contrast.
              </span>
            </div>

            <div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#ffffff",
                  margin: "0 0 8px",
                  fontFamily: "var(--font-urbanist), sans-serif",
                }}
              >
                UX Growth Strategy Call
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#b0b0b0",
                  lineHeight: 1.6,
                  margin: 0,
                  fontFamily: "var(--font-geist), sans-serif",
                  fontWeight: 300,
                }}
              >
                30 min · Video call
              </p>
            </div>

            <div style={{ height: 1, background: "#383838" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Identify your #1 UX growth lever",
                "See the Hero Framework in action",
                "Get a custom action plan — free",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: `rgba(217,12,183,0.15)`,
                      border: `1px solid ${ACCENT}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4L3.5 6L6.5 2"
                        stroke={ACCENT}
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      color: "#e8e8e8",
                      lineHeight: 1.5,
                      fontFamily: "var(--font-geist), sans-serif",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel — calendar */}
          <div style={{ flex: 1, padding: "40px 36px", display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Month nav */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button
                onClick={prevMonth}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "1px solid #383838",
                  background: "none",
                  color: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#ffffff",
                  fontFamily: "var(--font-urbanist), sans-serif",
                }}
              >
                {MONTHS[currentMonth]} {currentYear}
              </span>
              <button
                onClick={nextMonth}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "1px solid #383838",
                  background: "none",
                  color: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Day labels */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div
                  key={d}
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#888888",
                    padding: "4px 0",
                    fontFamily: "var(--font-urbanist), sans-serif",
                    letterSpacing: "0.5px",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
              {blanks.map((b) => (
                <div key={`blank-${b}`} />
              ))}
              {days.map((day) => {
                const isToday =
                  day === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear();
                const isSelected = selectedDay === day;
                const isPast =
                  new Date(currentYear, currentMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

                return (
                  <button
                    key={day}
                    onClick={() => !isPast && setSelectedDay(day)}
                    style={{
                      height: 38,
                      borderRadius: 8,
                      border: isSelected
                        ? `1px solid ${ACCENT}`
                        : isToday
                          ? "1px solid rgba(255,255,255,0.2)"
                          : "1px solid transparent",
                      background: isSelected
                        ? `rgba(217,12,183,0.15)`
                        : "none",
                      color: isPast ? "#444" : isSelected ? ACCENT : "#ffffff",
                      fontSize: 13,
                      fontWeight: isToday || isSelected ? 600 : 400,
                      fontFamily: "var(--font-urbanist), sans-serif",
                      cursor: isPast ? "default" : "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Timezone + confirm */}
            <div style={{ borderTop: "1px solid #383838", paddingTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="#888888" strokeWidth="1" />
                  <path d="M7 1.5C7 1.5 5 4 5 7C5 10 7 12.5 7 12.5" stroke="#888888" strokeWidth="1" />
                  <path d="M1.5 7H12.5" stroke="#888888" strokeWidth="1" />
                </svg>
                <span style={{ fontSize: 12, color: "#888888", fontFamily: "var(--font-geist), sans-serif" }}>
                  Your local time zone
                </span>
              </div>
              <a
                href="mailto:hello@contrastux.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 20px",
                  borderRadius: 9999,
                  background: ACCENT,
                  color: "#ffffff",
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: "var(--font-urbanist), sans-serif",
                  border: "none",
                }}
              >
                {selectedDay
                  ? `Book ${MONTHS[currentMonth].slice(0, 3)} ${selectedDay}`
                  : "Book a Call"}
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 700px) {
          .booking-card {
            flex-direction: column !important;
          }
          .booking-left {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid #383838 !important;
          }
        }
      `}</style>
    </section>
  );
}
