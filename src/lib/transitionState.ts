// Module-level flag: set before startViewTransition, consumed once by the incoming page.
// This lets WorkCasePage know it arrived via a client-side view transition (not a direct URL load)
// so it can keep the hero invisible during the transition and reveal it after.

let _fromViewTransition = false;

export function markViewTransition() {
  _fromViewTransition = true;
}

export function consumeViewTransition(): boolean {
  const v = _fromViewTransition;
  _fromViewTransition = false;
  return v;
}
