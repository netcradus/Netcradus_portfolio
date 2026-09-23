/**
 * ---------------------------------------------------------------------------
 * REUSABLE FRAMER MOTION PRESETS
 * ---------------------------------------------------------------------------
 * Every animation in the site comes from here so easing, duration and
 * behaviour stay consistent. All consumers must also honour reduced motion
 * (handled by <Reveal /> / useReducedMotion).
 * ---------------------------------------------------------------------------
 */

export const EASE = [0.16, 1, 0.3, 1]; // out-expo
export const EASE_SOFT = [0.4, 0, 0.2, 1];

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
};

/** Generic "fade up and in" — the workhorse reveal. */
export const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE } },
};

/** Parent that staggers direct children using `fadeUp`. */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

/** Child used inside a stagger container. */
export const staggerItem = fadeUp;

/** Large media / card reveal: slight scale + fade (image scale reveal). */
export const scaleReveal = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

/** Per-line masked text reveal (parent supplies overflow-hidden). */
export const lineReveal = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 0.85, ease: EASE },
  },
};

/** Per-word masked reveal. */
export const wordReveal = {
  hidden: { y: '105%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

/** Slide in from the side — used by service rows. */
export const slideX = (direction = 'left') => ({
  hidden: { opacity: 0, x: direction === 'left' ? -28 : 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
});

/** Viewport defaults — trigger once, fairly early so content is never late. */
export const viewportOnce = { once: true, margin: '-80px 0px -80px 0px' };
export const viewportEarly = { once: true, margin: '0px 0px -120px 0px' };

/** Reduced-motion aware variant swap. */
export function motionVariants(reduced, variants) {
  if (!reduced) return variants;
  return {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  };
}
