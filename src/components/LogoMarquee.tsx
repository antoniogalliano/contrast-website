"use client";

const logos = [
  "/Logo_Cymbio.svg",
  "/Logo_DAZN.svg",
  "/Logo_Down.svg",
  "/Logo_Fiverr.svg",
  "/Logo_Post.svg",
  "/Logo_Similar.svg",
];

export default function LogoMarquee() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        marginTop: -80,
        padding: "64px 0",
        background: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
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
            "linear-gradient(to right, #000 0%, transparent 12%, transparent 88%, #000 100%)",
        }}
      />

      {/* Scrolling track */}
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "marquee 30s linear infinite",
        }}
      >
        {/* Two copies for seamless loop */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              paddingRight: 32,
            }}
          >
            {logos.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                style={{
                  height: 160,
                  width: "auto",
                  opacity: 0.85,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
