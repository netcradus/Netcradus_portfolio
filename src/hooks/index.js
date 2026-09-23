import { useEffect, useState, useCallback, useRef } from 'react';

/** Tracks the user's OS-level reduced-motion preference. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/** Locks body scroll while an overlay (menu, preloader) is open. */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    const prev = document.body.dataset.scrollLocked;
    document.body.dataset.scrollLocked = 'true';
    return () => {
      if (prev === undefined) delete document.body.dataset.scrollLocked;
      else document.body.dataset.scrollLocked = prev;
    };
  }, [active]);
}

/** Escapes a list of menus/dialogs on key press. */
export function useEscapeKey(active, onEscape) {
  useEffect(() => {
    if (!active) return undefined;
    const handler = (e) => {
      if (e.key === 'Escape') onEscape?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, onEscape]);
}

/** Simple media query hook (used for breakpoint-specific behaviour). */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/**
 * Counts a number up when it enters the viewport.
 * Returns the current (animated) value.
 */
export function useCountUp(target, { duration = 1800, start = false } = {}) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  const stop = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  }, []);

  useEffect(() => {
    if (!start || target == null) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return undefined;
    }

    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // out-expo easing
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(target * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return stop;
  }, [target, duration, start, stop]);

  return value;
}
