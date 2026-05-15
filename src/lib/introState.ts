/**
 * Shared mutable state between IntroAnimation, HeroBackground, and Header.
 *
 * Zero-overhead live bindings — no React context plumbing needed.
 */

/** Position of the "." dot when the intro exits (read by HeroBackground each frame). */
export let dotOrigin: { x: number; y: number } | null = null;
export function setDotOrigin(pos: { x: number; y: number } | null): void {
  dotOrigin = pos;
}

/** Center + width of the header Logotype (read by IntroAnimation at transition time). */
export let logoOrigin: { cx: number; cy: number; width: number } | null = null;
export function setLogoOrigin(pos: { cx: number; cy: number; width: number } | null): void {
  logoOrigin = pos;
}
