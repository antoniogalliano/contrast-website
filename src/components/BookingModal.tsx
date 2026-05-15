"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MONTHS    = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const MOTION_BASE = "https://app.usemotion.com/meet/sagi-shrieber/ux-strategy-call";

interface SelectedDate { day: number; month: number; year: number; }
interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: SelectedDate | null;
  selectedSlot: string | null;
}

// Build the Motion URL with the selected date pre-filled
function buildMotionUrl(date: SelectedDate | null) {
  if (!date) return MOTION_BASE;
  const mm = String(date.month + 1).padStart(2, "0");
  const dd = String(date.day).padStart(2, "0");
  return `${MOTION_BASE}?selectedDate=${date.year}-${mm}-${dd}`;
}

// ── Styled field ───────────────────────────────────────────────────────────────
function Field({
  label, name, value, onChange, required = false,
  type = "text", placeholder = "", multiline = false,
}: {
  label: string; name: string; value: string;
  onChange: (v: string) => void; required?: boolean;
  type?: string; placeholder?: string; multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  const base: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${focused ? "#d90cb7" : "rgba(56,56,56,0.9)"}`,
    borderRadius: 8,
    fontFamily: "var(--font-geist), sans-serif",
    fontSize: 14,
    color: "#ffffff",
    outline: "none",
    transition: "border-color 0.18s",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={{
        fontFamily: "var(--font-urbanist), sans-serif",
        fontWeight: 500, fontSize: 13,
        color: "rgba(255,255,255,0.65)",
        letterSpacing: "0.01em",
      }}>
        {label}
        {required && <span style={{ color: "#d90cb7", marginLeft: 3 }}>*</span>}
      </label>

      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          rows={4}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...base, padding: "12px 14px", resize: "vertical", minHeight: 100, lineHeight: 1.55 }}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...base, height: 46, padding: "0 14px" }}
        />
      )}
    </div>
  );
}

// ── Success view ───────────────────────────────────────────────────────────────
function SuccessView({ firstName, dateLabel, motionUrl, onClose }: {
  firstName: string; dateLabel: string; motionUrl: string; onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "12px 0 8px", textAlign: "center" }}
    >
      {/* Checkmark */}
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: "rgba(217,12,183,0.12)",
        border: "1.5px solid rgba(217,12,183,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M6 14l6 6 10-12" stroke="#d90cb7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h3 style={{ margin: 0, fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 700, fontSize: 22, color: "#ffffff" }}>
          Almost there, {firstName}!
        </h3>
        <p style={{ margin: 0, fontFamily: "var(--font-geist), sans-serif", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
          We&apos;ve got your details. A booking page just opened in a new tab
          so you can confirm your slot for&nbsp;
          <span style={{ color: "rgba(255,255,255,0.85)" }}>{dateLabel}</span>
          &nbsp;and receive the calendar invite.
        </p>
      </div>

      {/* Fallback — if popup was blocked */}
      <a
        href={motionUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gradient-border"
        style={{
          display: "flex", alignItems: "center", gap: 6,
          borderRadius: 9999, padding: "0 24px", height: 44,
          fontSize: 14, fontWeight: 600,
          color: "#ffffff", textDecoration: "none",
          fontFamily: "var(--font-urbanist), sans-serif",
        }}
      >
        Open booking page
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      <button
        onClick={onClose}
        style={{
          all: "unset", cursor: "pointer",
          fontFamily: "var(--font-urbanist), sans-serif",
          fontSize: 13, color: "rgba(255,255,255,0.3)",
          transition: "color 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
      >
        Close
      </button>
    </motion.div>
  );
}

// ── Main modal ─────────────────────────────────────────────────────────────────
export default function BookingModal({ isOpen, onClose, selectedDate, selectedSlot }: Props) {
  const [form, setForm] = useState({
    name: "", email: "", startup: "", challenge: "", revenue: "", resource: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done,       setDone]       = useState(false);
  const [err,        setErr]        = useState<string | null>(null);
  const [motionUrl,  setMotionUrl]  = useState(MOTION_BASE);

  useEffect(() => {
    if (isOpen) {
      setForm({ name: "", email: "", startup: "", challenge: "", revenue: "", resource: "" });
      setDone(false);
      setErr(null);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const set = (key: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [key]: v }));

  const dateLabel = selectedDate
    ? `${DAY_NAMES[new Date(selectedDate.year, selectedDate.month, selectedDate.day).getDay()]}, ${MONTHS[selectedDate.month]} ${selectedDate.day}`
    : "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);

    // Build Motion URL so user can confirm and get the real calendar invite
    const url = buildMotionUrl(selectedDate);
    setMotionUrl(url);

    // Open Motion in new tab immediately (before any async work so popup isn't blocked)
    const motionWindow = window.open(url, "_blank", "noopener,noreferrer");

    // Fire-and-forget email notification — don't block UX on it
    fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, slot: selectedSlot, date: selectedDate }),
    }).catch(() => {/* silent — email is bonus, not critical path */});

    // Small delay so user sees the spinner transition
    await new Promise(r => setTimeout(r, 600));

    if (!motionWindow) {
      // Popup was blocked — show the fallback link clearly
      setErr("Popup was blocked — click the button below to open the booking page.");
    }

    setSubmitting(false);
    setDone(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.78)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 10000,
            }}
          />

          {/* Modal shell */}
          <div style={{
            position: "fixed", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 10001, padding: "20px",
            pointerEvents: "none",
          }}>
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                pointerEvents: "auto",
                width: "100%", maxWidth: 520,
                maxHeight: "90vh", overflowY: "auto",
                background: "#0a0a0a",
                border: "1px solid rgba(217,12,183,0.55)",
                borderRadius: 20,
                boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(217,12,183,0.08)",
                padding: "28px 28px 32px",
                display: "flex", flexDirection: "column",
              }}
            >
              {done ? (
                <SuccessView
                  firstName={form.name.split(" ")[0] || "there"}
                  dateLabel={dateLabel + (selectedSlot ? ` at ${selectedSlot}` : "")}
                  motionUrl={motionUrl}
                  onClose={onClose}
                />
              ) : (
                <>
                  {/* ── Header ── */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <h2 style={{ margin: 0, fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 700, fontSize: 20, color: "#ffffff", lineHeight: 1.3 }}>
                        UX Growth Strategy Call
                      </h2>
                      <p style={{ margin: 0, fontFamily: "var(--font-geist), sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                        {dateLabel}
                        {selectedSlot && <> &nbsp;·&nbsp; {selectedSlot}</>}
                        &nbsp;·&nbsp; 30 min &nbsp;·&nbsp; Video call
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      style={{
                        all: "unset", cursor: "pointer", flexShrink: 0,
                        width: 32, height: 32, borderRadius: 8,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(255,255,255,0.06)", transition: "background 0.15s",
                        marginLeft: 12, marginTop: 2,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1l12 12M13 1L1 13" stroke="rgba(255,255,255,0.55)" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: "rgba(56,56,56,0.8)", marginBottom: 24 }} />

                  {/* ── Form ── */}
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <Field label="Name" name="name" value={form.name} onChange={set("name")} required placeholder="Your name" />
                      <Field label="Email" name="email" type="email" value={form.email} onChange={set("email")} required placeholder="you@company.com" />
                    </div>

                    <Field
                      label="What's the name of your startup?"
                      name="startup" value={form.startup} onChange={set("startup")}
                      required placeholder="Company name"
                    />

                    <Field
                      label="Your biggest UX challenge right now?"
                      name="challenge" value={form.challenge} onChange={set("challenge")}
                      required multiline
                      placeholder="Tell us what's blocking growth or what you're trying to solve..."
                    />

                    <Field
                      label="Current revenue or funding stage?"
                      name="revenue" value={form.revenue} onChange={set("revenue")}
                      required placeholder="e.g. Pre-revenue, $50K MRR, Series A..."
                    />

                    <Field
                      label="One resource we should check before the call?"
                      name="resource" value={form.resource} onChange={set("resource")}
                      placeholder="App, website, deck, Loom — anything helpful (optional)"
                    />

                    {err && (
                      <p style={{ margin: 0, fontFamily: "var(--font-geist), sans-serif", fontSize: 13, color: "#ff8c8c" }}>
                        {err}
                      </p>
                    )}

                    {/* Actions */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12, marginTop: 6 }}>
                      <button
                        type="button"
                        onClick={onClose}
                        style={{
                          all: "unset", cursor: "pointer",
                          fontFamily: "var(--font-urbanist), sans-serif",
                          fontSize: 14, fontWeight: 500,
                          color: "rgba(255,255,255,0.5)",
                          padding: "0 16px", height: 44,
                          borderRadius: 9999, transition: "color 0.15s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-gradient-border"
                        style={{
                          display: "flex", alignItems: "center", gap: 8,
                          borderRadius: 9999, padding: "0 24px", height: 44,
                          fontSize: 14, fontWeight: 600,
                          color: submitting ? "rgba(255,255,255,0.5)" : "#ffffff",
                          cursor: submitting ? "default" : "pointer",
                          fontFamily: "var(--font-urbanist), sans-serif",
                        }}
                      >
                        {submitting ? (
                          <>
                            <span style={{
                              display: "inline-block", width: 14, height: 14,
                              border: "2px solid rgba(255,255,255,0.2)",
                              borderTopColor: "#ffffff", borderRadius: "50%",
                              animation: "spin 0.7s linear infinite",
                            }} />
                            Opening…
                          </>
                        ) : (
                          <>
                            Schedule Call
                            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                              <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>

          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </>
      )}
    </AnimatePresence>
  );
}
