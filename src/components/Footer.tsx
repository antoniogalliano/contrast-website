"use client";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Our Services", href: "#services" },
  { label: "The Hero Framework", href: "#framework" },
  { label: "Contact", href: "#contact" },
];

const legalLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export default function Footer() {
  return (
    <footer
      style={{
        padding: "48px 40px",
        background: "#0a0a0a",
        borderTop: "1px solid #383838",
      }}
    >
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 40,
            gap: 24,
          }}
          className="footer-top"
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#ffffff",
              textDecoration: "none",
              fontFamily: "var(--font-urbanist), sans-serif",
            }}
          >
            Contrast.
          </a>

          {/* Nav */}
          <nav style={{ display: "flex", gap: 32 }} className="footer-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  fontFamily: "var(--font-urbanist), sans-serif",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {/* LinkedIn */}
            <a
              href="#"
              style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a
              href="#"
              style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#383838", marginBottom: 24 }} />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
          className="footer-bottom"
        >
          <p
            style={{
              fontSize: 13,
              color: "#888888",
              margin: 0,
              fontFamily: "var(--font-geist), sans-serif",
            }}
          >
            &copy; {new Date().getFullYear()} Contrast. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: 13,
                  color: "#888888",
                  textDecoration: "none",
                  fontFamily: "var(--font-geist), sans-serif",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .footer-top {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .footer-nav {
            flex-wrap: wrap !important;
            gap: 16px !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}
