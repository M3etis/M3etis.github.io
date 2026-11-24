/**
 * Plays a looping, phase-based demo on an element: sets `data-phase="0…n-1"` on `root`, holding each
 * phase for `durations[i]` ms, and wraps around. CSS draws each phase; without JS (or with reduced
 * motion) the attribute is never set and the element shows its static, final state.
 * Runs only while at least `threshold` of the element is on screen and the tab is visible.
 */
export function sequence(
  root: HTMLElement,
  durations: number[],
  onPhase?: (phase: number) => void,
  threshold = 0.45,
): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  let phase = 0;
  let timer = 0;
  let inView = false;

  const set = (p: number) => {
    phase = p;
    root.dataset.phase = String(p);
    onPhase?.(p);
  };

  const tick = () => {
    timer = window.setTimeout(() => {
      set((phase + 1) % durations.length);
      tick();
    }, durations[phase]);
  };

  const sync = () => {
    window.clearTimeout(timer);
    if (inView && !document.hidden) tick();
  };

  set(0);

  new IntersectionObserver(
    ([e]) => {
      inView = e.isIntersecting;
      sync();
    },
    { threshold },
  ).observe(root);

  document.addEventListener('visibilitychange', sync);
}
