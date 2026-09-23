import { motion, useReducedMotion } from 'framer-motion';
import { statement } from '../data/site';
import { EASE } from '../lib/animation';

/**
 * Large typography-driven statement. Each line is revealed from a mask with a
 * deliberate stagger, plus a scroll-linked horizontal drift for depth.
 */
export default function Statement() {
  const reduced = useReducedMotion();

  return (
    <section
      id="statement"
      className="relative overflow-hidden bg-surface py-24 sm:py-32 lg:py-44"
      aria-labelledby="statement-title"
    >
      {/* soft accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-[26rem] w-[26rem] rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(255,85,0,0.22), transparent 65%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[24rem] w-[24rem] rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(255,123,0,0.2), transparent 65%)' }}
      />

      <div className="container-page relative">
        <motion.span
          className="eyebrow mb-10 inline-flex"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
        >
          <span className="eyebrow-dot" aria-hidden="true" />
          Our Philosophy
        </motion.span>

        <h2
          id="statement-title"
          className="font-display text-[clamp(2.1rem,7.2vw,6rem)] font-bold uppercase leading-[0.93] tracking-[-0.045em] text-ink"
          aria-label={statement.lines.map((l) => l.text).join(' ')}
        >
          {statement.lines.map((line, i) => (
            <span
              key={`${line.text}-${i}`}
              className="block overflow-hidden pb-[0.06em] -mb-[0.04em]"
              aria-hidden="true"
            >
              {/* trigger lives on the visible mask wrapper */}
              <motion.span
                className="block"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={{ hidden: { y: 0 }, visible: { y: 0 } }}
                transition={{ duration: 0 }}
              >
                <motion.span
                  className={`block ${
                    line.accent ? 'text-gradient-brand' : ''
                  } ${i === 1 ? 'text-ink/35' : ''}`}
                  variants={{
                    hidden: reduced ? { y: 0, opacity: 1 } : { y: '112%' },
                    visible: {
                      y: '0%',
                      transition: reduced
                        ? { duration: 0 }
                        : {
                            duration: 0.9,
                            ease: EASE,
                            delay: Math.min(i, 3) * 0.08,
                          },
                    },
                  }}
                >
                  {line.text}
                </motion.span>
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.div
          className="mt-14 flex flex-col gap-6 border-t border-ink/10 pt-8 sm:flex-row sm:items-start sm:justify-between"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: EASE, delay: 0.15 }}
        >
          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Strategy, design and engineering under one roof — so the product you
            imagine is the product that ships.
          </p>
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted/70">
            Est. for scale — CyberHaxs
          </span>
        </motion.div>
      </div>
    </section>
  );
}
