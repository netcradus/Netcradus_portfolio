import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Logo from '../ui/Logo';

/**
 * Full-screen page loading animation.
 * - Shows the wordmark + a determinate progress bar.
 * - Automatically dismisses (min 900ms, max 2600ms).
 * - Skips instantly when the user prefers reduced motion.
 */
export default function Preloader({ onDone }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) {
      onDone?.();
      return undefined;
    }

    const start = performance.now();
    const minDuration = 1100;
    let raf;

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / minDuration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => onDone?.(), 260);
      }
    };
    raf = requestAnimationFrame(tick);

    // Hard safety net — never trap the user behind the loader.
    const failsafe = setTimeout(() => onDone?.(), 2600);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, [onDone, reduced]);

  if (reduced) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
      aria-hidden="true"
      data-testid="preloader"
    >
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" />
      <div
        className="pointer-events-none absolute h-[42rem] w-[42rem] rounded-full opacity-40 blur-[130px]"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(255,85,0,0.55), transparent 60%), radial-gradient(circle at 70% 70%, rgba(255,123,0,0.45), transparent 60%)',
        }}
      />

      <motion.div
        className="relative flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Logo theme="dark" className="!text-3xl" />
        <div className="h-[3px] w-56 overflow-hidden rounded-full bg-white/12">
          <div
            className="h-full bg-brand-gradient transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-white/40">
          {String(Math.round(progress)).padStart(3, '0')}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function PreloaderGate({ children }) {
  const [done, setDone] = useState(false);
  return (
    <>
      <AnimatePresence>{!done && <Preloader onDone={() => setDone(true)} />}</AnimatePresence>
      {children}
    </>
  );
}
