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
        height: 160,
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
          animation: "marquee 30s linear infinite",
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
              <img
                key={`${copy}-${j}`}
                src={src}
                alt=""
                style={{
                  width: 200,
                  height: 159,
                  flexShrink: 0,
                  opacity: 0.85,
                  display: "block",
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
            transform: translateX(-25%);
          }
        }
      `}</style>
    </section>
  );
}
