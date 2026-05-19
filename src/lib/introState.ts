/**
 * Shared mutable state between IntroAnimation, HeroBackground, and Header.
 *
 * Zero-overhead live bindings, no React context plumbing needed.
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

const INTRO_KEY = "contrast-intro";

/**
 * Returns true when the intro should be skipped, i.e. the user has already
 * seen it this session and the current navigation is NOT a hard reload.
 * Always returns false on the server.
 */
export function shouldSkipIntro(): boolean {
  if (typeof window === "undefined") return false;
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  const isReload = nav?.type === "reload";
  return sessionStorage.getItem(INTRO_KEY) === "1" && !isReload;
}

/** Mark the intro as played for this session. */
export function markIntroPlayed(): void {
  if (typeof window !== "undefined") sessionStorage.setItem(INTRO_KEY, "1");
}
