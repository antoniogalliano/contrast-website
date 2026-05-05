/**
 * Shared mutable state between IntroAnimation and HeroBackground.
 *
 * IntroAnimation writes the viewport position of the "." dot at the moment
 * the sphere transition begins. HeroBackground reads it every animation frame
 * to use as the origin point for particle convergence.
 *
 * Using a module-level variable gives a zero-overhead live binding without
 * requiring React context plumbing across unrelated component trees.
 */
export let dotOrigin: { x: number; y: number } | null = null;

export function setDotOrigin(pos: { x: number; y: number } | null): void {
  dotOrigin = pos;
}
