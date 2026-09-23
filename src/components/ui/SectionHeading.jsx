import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/animation';

/**
 * Standard section header: eyebrow + oversized heading (+ optional copy).
 *
 * IMPORTANT: the masked line wrapper (overflow-hidden) is the element that
 * receives `whileInView`. Triggering from a clipped *child* would never fire
 * because IntersectionObserver reports clipped descendants as invisible.
 */
export default function SectionHeading({
  eyebrow,
  lines,
  align = 'left',
  theme = 'light',
  description,
  className = '',
  /** Full Tailwind class overriding the h2 max-width (e.g. `max-w-[24ch]`). */
  headingMaxWidth,
  id,
}) {
  const reduced = useReducedMotion();
  const isDark = theme === 'dark';
  const maxW =
    headingMaxWidth ?? (align === 'center' ? 'max-w-[20ch]' : 'max-w-[16ch]');
  const alignCls =
    align === 'center'
      ? 'items-center text-center mx-auto'
      : align === 'right'
        ? 'items-end text-right ml-auto'
        : 'items-start text-left';

  const lineArr = Array.isArray(lines) ? lines : [lines];

  return (
    <div className={`flex flex-col gap-6 ${alignCls} ${className}`}>
      {eyebrow && (
        <motion.span
          className={`eyebrow ${isDark ? 'text-white/55' : ''}`}
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
        >
          <span className="eyebrow-dot" aria-hidden="true" />
          {eyebrow}
        </motion.span>
      )}

      <h2
        id={id}
        className={`${maxW} text-display-lg leading-[0.94] ${
          isDark ? 'text-white' : 'text-ink'
        }`}
        aria-label={lineArr.map((l) => (typeof l === 'object' ? l.text : l)).join(' ')}
      >
        {lineArr.map((line, i) => {
          const isAccent = typeof line === 'object' && line.accent;
          const text = typeof line === 'object' ? line.text : line;

          return (
            <span
              key={`${text}-${i}`}
              className="block overflow-hidden pb-[0.08em] -mb-[0.06em]"
              aria-hidden="true"
            >
              {/* mask wrapper = trigger (it is visible in the viewport) */}
              <motion.span
                className="block"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={{
                  hidden: { y: 0 },
                  visible: { y: 0 },
                }}
                transition={{ duration: 0 }}
              >
                {/* actual moving line */}
                <motion.span
                  className={`block ${
                    isAccent ? (isDark ? 'text-gradient-dark' : 'text-gradient-brand') : ''
                  }`}
                  variants={{
                    hidden: reduced ? { y: 0 } : { y: '108%' },
                    visible: {
                      y: '0%',
                      transition: reduced
                        ? { duration: 0 }
                        : { duration: 0.8, ease: EASE, delay: 0.06 + i * 0.08 },
                    },
                  }}
                >
                  {text}
                </motion.span>
              </motion.span>
            </span>
          );
        })}
      </h2>

      {description && (
        <motion.p
          className={`max-w-2xl text-base leading-relaxed sm:text-lg ${
            isDark ? 'text-muted-dark' : 'text-muted'
          }`}
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduced ? 0 : 0.6, ease: EASE, delay: 0.18 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
