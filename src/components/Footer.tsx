"use client";

// Arrow icon used in "Book a Call" button
function ArrowIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 8.5L8.5 1.5M8.5 1.5H2.5M8.5 1.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Social icons
function XIcon() {
  return (
    <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.743 11.857L27.677 0.5H25.275L16.685 10.343L9.828 0.5H2L12.429 15.464L2 27.5H4.402L13.488 17.098L20.713 27.5H28.541L17.743 11.857ZM14.697 15.6L13.629 14.074L5.258 2.284H8.675L15.647 12.025L16.714 13.551L25.276 25.793H21.859L14.697 15.6Z" fill="white"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.716 27.5H1.492V9.137H6.716V27.5ZM4.101 6.832C2.44 6.832 1.09 5.454 1.09 3.793C1.09 3.0 1.39 2.238 1.926 1.674C2.463 1.11 3.196 0.793 3.962 0.793H4.239C5.899 0.793 7.25 2.171 7.25 3.832C7.25 5.493 5.9 6.871 4.239 6.871L4.101 6.832ZM28.91 27.5H23.698V18.55C23.698 16.569 23.658 14.014 20.938 14.014C18.178 14.014 17.762 16.183 17.762 18.413V27.5H12.545V9.137H17.55V11.473H17.628C18.337 10.108 20.1 8.672 22.726 8.672C27.992 8.672 28.91 12.13 28.91 16.648V27.5Z" fill="white"/>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28.54 7.393C28.226 6.232 27.315 5.32 26.154 5.005C24.043 4.434 15.09 4.434 15.09 4.434C15.09 4.434 6.137 4.434 4.026 5.005C2.865 5.32 1.954 6.232 1.64 7.393C1.069 9.504 1.069 14 1.069 14C1.069 14 1.069 18.496 1.64 20.607C1.954 21.768 2.865 22.68 4.026 22.995C6.137 23.566 15.09 23.566 15.09 23.566C15.09 23.566 24.043 23.566 26.154 22.995C27.315 22.68 28.226 21.768 28.54 20.607C29.111 18.496 29.111 14 29.111 14C29.111 14 29.111 9.504 28.54 7.393ZM12.272 18.046V9.954L19.636 14L12.272 18.046Z" fill="white"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0a0a0a",
        padding: "0 40px 48px",
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {/* ── Top container: logo+social / nav+cta ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Row 1: Logo (left) + Social icons (right) */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo — CONTRAST. wordmark */}
            <a
              href="/"
              aria-label="Contrast home"
              style={{
                display: "block",
                textDecoration: "none",
                color: "#ffffff",
                fontFamily: "var(--font-urbanist), sans-serif",
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              CONTRAST.
            </a>

            {/* Social icons */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <a href="#" aria-label="X (Twitter)" style={{ display: "flex", opacity: 0.85, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
              >
                <XIcon />
              </a>
              <a href="#" aria-label="LinkedIn" style={{ display: "flex", opacity: 0.85, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
              >
                <LinkedInIcon />
              </a>
              <a href="#" aria-label="YouTube" style={{ display: "flex", opacity: 0.85, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Row 2: Nav links (left) + Book a Call button (right) */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Nav */}
            <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
              {["The Hero Framework", "Work", "Our services", "Contact"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: "0.28px",
                    color: "#ffffff",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "opacity 0.2s",
                    opacity: 0.8,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* "Book a Call" — white pill button */}
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                borderRadius: 52,
                background: "#ffffff",
                border: "1px solid rgba(10,10,10,0.01)",
                textDecoration: "none",
                fontFamily: "var(--font-urbanist), sans-serif",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.14px",
                color: "#000000",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Book a Call
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: "#383838" }} />

        {/* ── Legal row ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-urbanist), sans-serif",
              fontWeight: 500,
              fontSize: 15,
              lineHeight: 1.02,
              letterSpacing: "0.15px",
              textTransform: "uppercase",
              color: "#e8e8e8",
              width: 244,
            }}
          >
            © {new Date().getFullYear()} CONTRAST Studio
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-urbanist), sans-serif",
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: "0.14px",
              color: "#ffffff",
              whiteSpace: "pre",
            }}
          >
            {`Terms of use  •  Privacy policy`}
          </p>
        </div>
      </div>
    </footer>
  );
}
