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

const INTRO_KEY    = "contrast-intro";
const SOFT_NAV_KEY = "contrast-soft-nav-home";

/**
 * Call this immediately before any client-side navigation that lands on the
 * homepage (e.g. router.push("/#work")).  It sets a one-shot flag so that
 * shouldSkipIntro() returns true on the next homepage mount, preventing the
 * intro from replaying on soft navigations.
 */
export function markSoftNavToHome(): void {
  if (typeof window !== "undefined") sessionStorage.setItem(SOFT_NAV_KEY, "1");
}

/**
 * Returns true when the intro should be skipped.
 * — Soft navigation back to home:  flag is set  → skip
 * — First visit or hard reload:    no flag       → play
 * Always returns false on the server.
 */
export function shouldSkipIntro(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SOFT_NAV_KEY) === "1";
}

/** Consume the soft-nav flag after it has been read.  Call once per mount. */
export function clearSoftNavFlag(): void {
  if (typeof window !== "undefined") sessionStorage.removeItem(SOFT_NAV_KEY);
}

/** Mark the intro as played for this session (kept for backwards compat). */
export function markIntroPlayed(): void {
  if (typeof window !== "undefined") sessionStorage.setItem(INTRO_KEY, "1");
}
