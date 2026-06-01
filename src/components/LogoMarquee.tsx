"use client";

const logos = [
  // Existing
  "/Logo_Cymbio.svg",
  "/Logo_DAZN.svg",
  "/Logo_Down.svg",
  "/Logo_Fiverr.svg",
  "/Logo_Post.svg",
  "/Logo_Similar.svg",
  // New
  "/Logo_SpeakingPal.png",
  "/Logo_8fig.png",
  "/Logo_FIDO.png",
  "/Logo_JUSTT.png",
  "/Logo_LaborIQ.png",
  "/Logo_Pillar.png",
  "/Logo_SafebooksAI.png",
  "/Logo_Spear.png",
  "/Logo_CymbioPng.png",
];

export default function LogoMarquee() {
  return (
    <section
      className="logo-marquee-section"
      style={{
        position: "relative",
        overflow: "hidden",
        height: 120,
        background: "#0a0a0a",
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "linear-gradient(to right, #0a0a0a 0%, transparent 8%, transparent 92%, #0a0a0a 100%)",
        }}
      />

      {/* Scrolling track */}
      <div
        style={{
          display: "flex",
          width: "max-content",
          height: "100%",
          animation: "marquee 65s linear infinite",
        }}
      >
        {/* Four copies for seamless loop on wide/ultrawide screens */}
        {[0, 1, 2, 3].map((copy) => (
          <div
            key={copy}
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            {logos.map((src, j) => (
              <div
                key={`${copy}-${j}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 48px",
                  height: "100%",
                  flexShrink: 0,
                }}
              >
                <img
                  src={src}
                  alt=""
                  className="logo-marquee-img"
                  style={{
                    height: 36,
                    width: "auto",
                    objectFit: "contain",
                    opacity: 0.85,
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @media (max-width: 768px) {
          .logo-marquee-section { height: 90px !important; }
          .logo-marquee-img     { height: 28px !important; }
        }
      `}</style>
    </section>
  );
}
