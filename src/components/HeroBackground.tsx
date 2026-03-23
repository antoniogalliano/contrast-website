"use client";

import { useEffect, useRef } from "react";

interface SphereParticle {
  sx: number;
  sy: number;
  sz: number;
  ox: number;
  oy: number;
  oz: number;
  displaceX: number;
  displaceY: number;
  size: number;
  brightness: number;
  pullWeight: number;
  // Intro animation: random start offset in 3D space
  introX: number;
  introY: number;
  introZ: number;
  introDelay: number; // stagger delay (0–1)
}

interface StreamParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  brightness: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const sphereRef = useRef<SphereParticle[]>([]);
  const streamRef = useRef<StreamParticle[]>([]);
  const animRef = useRef<number>(0);
  const rotationRef = useRef({ x: 0, y: 0 });
  const startTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let pw = 0;
    let ph = 0;

    const resize = () => {
      pw = Math.floor(window.innerWidth * dpr);
      ph = Math.floor(window.innerHeight * dpr);
      canvas.width = pw;
      canvas.height = ph;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 60000;
    const particles: SphereParticle[] = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const sx = Math.sin(phi) * Math.cos(theta);
      const sy = Math.sin(phi) * Math.sin(theta);
      const sz = Math.cos(phi);

      const scatter = Math.random() < 0.15
        ? Math.random() * 0.18 + 0.05
        : Math.random() * 0.06;
      const a1 = Math.random() * Math.PI * 2;
      const a2 = Math.random() * Math.PI * 2;

      // Random start position for intro — scattered outward from sphere
      const introAngle1 = Math.random() * Math.PI * 2;
      const introAngle2 = Math.random() * Math.PI * 2;
      const introDist = 2.5 + Math.random() * 3.5;

      particles.push({
        sx, sy, sz,
        ox: Math.cos(a1) * Math.sin(a2) * scatter,
        oy: Math.sin(a1) * Math.sin(a2) * scatter,
        oz: Math.cos(a2) * scatter,
        displaceX: 0,
        displaceY: 0,
        size: Math.random() * 1.1 + 0.3,
        brightness: Math.random() * 0.5 + 0.5,
        pullWeight: Math.random() * 0.6 + 0.4,
        introX: Math.cos(introAngle1) * Math.sin(introAngle2) * introDist,
        introY: Math.sin(introAngle1) * Math.sin(introAngle2) * introDist,
        introZ: Math.cos(introAngle2) * introDist,
        introDelay: Math.random() * 0.4,
      });
    }
    sphereRef.current = particles;
    startTimeRef.current = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const plotPixel = (
      data: Uint8ClampedArray,
      imgW: number,
      imgH: number,
      x: number,
      y: number,
      r: number,
      g: number,
      b: number,
      a: number
    ) => {
      const ix = Math.round(x);
      const iy = Math.round(y);
      if (ix < 0 || ix >= imgW || iy < 0 || iy >= imgH) return;
      const idx = (iy * imgW + ix) * 4;
      data[idx] = Math.min(255, data[idx] + (r * a) | 0);
      data[idx + 1] = Math.min(255, data[idx + 1] + (g * a) | 0);
      data[idx + 2] = Math.min(255, data[idx + 2] + (b * a) | 0);
      data[idx + 3] = Math.min(255, data[idx + 3] + (a * 255) | 0);
    };

    const plotDot = (
      data: Uint8ClampedArray,
      imgW: number,
      imgH: number,
      x: number,
      y: number,
      size: number,
      r: number,
      g: number,
      b: number,
      a: number
    ) => {
      if (size <= 1.2) {
        plotPixel(data, imgW, imgH, x, y, r, g, b, a);
      } else {
        const s = Math.ceil(size);
        for (let dy = -s; dy <= s; dy++) {
          for (let dx = -s; dx <= s; dx++) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= size) {
              const falloff = 1 - dist / size;
              plotPixel(data, imgW, imgH, x + dx, y + dy, r, g, b, a * falloff);
            }
          }
        }
      }
    };

    // Easing: smooth deceleration
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const INTRO_DURATION = 2200; // ms

    const animate = () => {
      if (!ctx || !canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const elapsed = performance.now() - startTimeRef.current;

      // Intro progress (0 to 1)
      const introRaw = Math.min(elapsed / INTRO_DURATION, 1);
      const introComplete = introRaw >= 1;

      smoothMouseRef.current.x = lerp(smoothMouseRef.current.x, mouseRef.current.x, 0.12);
      smoothMouseRef.current.y = lerp(smoothMouseRef.current.y, mouseRef.current.y, 0.12);

      // Continuous ambient rotation (always spinning slowly)
      const time = elapsed * 0.001;
      const autoRotX = Math.sin(time * 0.3) * 0.15;
      const autoRotY = time * 0.12;

      const targetRotY = (smoothMouseRef.current.x - 0.5) * 1.2;
      const targetRotX = (smoothMouseRef.current.y - 0.5) * 0.8;
      rotationRef.current.x = lerp(rotationRef.current.x, targetRotX, 0.05);
      rotationRef.current.y = lerp(rotationRef.current.y, targetRotY, 0.05);

      const rx = rotationRef.current.x + autoRotX;
      const ry = rotationRef.current.y + autoRotY;
      const cosRx = Math.cos(rx);
      const sinRx = Math.sin(rx);
      const cosRy = Math.cos(ry);
      const sinRy = Math.sin(ry);

      const imageData = ctx.createImageData(pw, ph);
      const data = imageData.data;

      const cx = w * dpr / 2;
      const cy = h * dpr / 2;
      const radius = Math.min(w, h) * 0.28 * dpr;

      // Scale factor so particle density looks the same across viewports
      // Reference: 1440px wide desktop
      const densityScale = Math.min(w, h) / 900;

      const mouseX = smoothMouseRef.current.x * w;
      const mouseY = smoothMouseRef.current.y * h;

      const pullDirX = mouseX - w / 2;
      const pullDirY = mouseY - h / 2;
      const pullDist = Math.sqrt(pullDirX * pullDirX + pullDirY * pullDirY);
      const pullNormX = pullDist > 0 ? pullDirX / pullDist : 0;
      const pullNormY = pullDist > 0 ? pullDirY / pullDist : 0;

      const radiusLogical = Math.min(w, h) * 0.28;
      const distFromEdge = Math.max(0, pullDist - radiusLogical * 0.5);
      const maxPullDist = radiusLogical * 3;
      const pullStrength = introComplete
        ? Math.min(distFromEdge / maxPullDist, 1) * 1.4
        : 0; // no cursor pull during intro

      const pull2dX = pullNormX;
      const pull2dY = pullNormY;

      // --- Sphere particles ---
      for (const p of sphereRef.current) {
        // Intro: interpolate from scattered position to sphere position
        let baseX: number, baseY: number, baseZ: number;
        let introAlpha = 1;

        if (!introComplete) {
          // Per-particle staggered progress
          const pProgress = Math.max(0, Math.min((introRaw - p.introDelay) / (1 - p.introDelay), 1));
          const eased = easeOutCubic(pProgress);

          baseX = lerp(p.introX, p.sx + p.ox, eased);
          baseY = lerp(p.introY, p.sy + p.oy, eased);
          baseZ = lerp(p.introZ, p.sz + p.oz, eased);

          // Fade in during first part of particle's journey
          introAlpha = Math.min(pProgress * 3, 1);
        } else {
          baseX = p.sx + p.ox;
          baseY = p.sy + p.oy;
          baseZ = p.sz + p.oz;
        }

        const rx1 = baseX * cosRy - baseZ * sinRy;
        const rz1 = baseX * sinRy + baseZ * cosRy;
        const ry1 = baseY * cosRx - rz1 * sinRx;
        const rz2 = baseY * sinRx + rz1 * cosRx;

        const mag2d = Math.sqrt(rx1 * rx1 + ry1 * ry1 + 0.001);
        const screenNormX = rx1 / mag2d;
        const screenNormY = ry1 / mag2d;
        const alignment = screenNormX * pull2dX + screenNormY * pull2dY;

        const facingFactor = Math.max(0, alignment);
        const ff = facingFactor * facingFactor;
        const pullFactor = ff * ff * pullStrength * p.pullWeight;

        const targetDispX = pull2dX * pullFactor;
        const targetDispY = pull2dY * pullFactor;

        const tX = Math.abs(targetDispX) > Math.abs(p.displaceX) ? 0.18 : 0.035;
        const tY = Math.abs(targetDispY) > Math.abs(p.displaceY) ? 0.18 : 0.035;

        p.displaceX += (targetDispX - p.displaceX) * tX;
        p.displaceY += (targetDispY - p.displaceY) * tY;

        const depth = (rz2 + 1.5) / 3;
        const px = cx + rx1 * radius + p.displaceX * radius * 1.2;
        const py = cy + ry1 * radius + p.displaceY * radius * 1.2;

        const dispSq = p.displaceX * p.displaceX + p.displaceY * p.displaceY;

        const alpha = depth * p.brightness * 0.9 * introAlpha;
        const size = p.size * (0.7 + depth * 1.2) * dpr * densityScale;

        const dispMag = Math.sqrt(dispSq);
        const dispTint = Math.min(dispMag * 0.5, 1);
        const r = 200 + (depth * 55) | 0;
        const g = Math.max(0, 20 + (depth * 40) | 0 - (dispTint * 15) | 0);
        const b = Math.min(255, 80 + (depth * 80) | 0 + (dispTint * 40) | 0);

        plotDot(data, pw, ph, px, py, size, r, g, b, alpha);

        // Spawn stream particles (only after intro)
        if (introComplete && dispSq > 0.000225 && Math.random() < dispMag * 1.8) {
          const startX = px / dpr + (Math.random() - 0.5) * 6;
          const startY = py / dpr + (Math.random() - 0.5) * 6;

          const dirX = w / 2 - startX;
          const dirY = h / 2 - startY;
          const dirLen = Math.sqrt(dirX * dirX + dirY * dirY);
          if (dirLen > 1) {
            const speed = 4.5 + Math.random() * 3.5;
            const vx = (dirX / dirLen + (Math.random() - 0.5) * 0.1) * speed;
            const vy = (dirY / dirLen + (Math.random() - 0.5) * 0.1) * speed;

            streamRef.current.push({
              x: startX,
              y: startY,
              vx, vy,
              life: 0,
              maxLife: (dirLen / speed) * (0.5 + Math.random() * 0.5),
              size: p.size * (0.5 + Math.random() * 0.5),
              brightness: p.brightness * (0.6 + Math.random() * 0.4),
            });
          }
        }
      }

      // --- Stream particles ---
      const alive: StreamParticle[] = [];

      for (const sp of streamRef.current) {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.life++;

        const progress = sp.life / sp.maxLife;
        if (progress >= 1) continue;

        const fadeIn = Math.min(sp.life / 6, 1);
        const fadeOut = 1 - progress;
        const alpha = fadeIn * fadeOut * sp.brightness * 0.7;

        const r = 210 + (progress * 45) | 0;
        const g = 25 + (progress * 30) | 0;
        const b = 100 + (progress * 60) | 0;

        const size = sp.size * (1.3 - progress * 0.5) * dpr * densityScale;

        plotDot(data, pw, ph, sp.x * dpr, sp.y * dpr, size, r, g, b, alpha);

        alive.push(sp);
      }

      if (alive.length > 8000) {
        streamRef.current = alive.slice(alive.length - 8000);
      } else {
        streamRef.current = alive;
      }

      ctx.putImageData(imageData, 0, 0);

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
