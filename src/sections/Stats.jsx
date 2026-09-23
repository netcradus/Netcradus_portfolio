import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import Counter from '../components/ui/Counter';
import Reveal, { RevealItem } from '../components/ui/Reveal';
import { stats } from '../data/site';
import { EASE } from '../lib/animation';

/**
 * Animated statistics band.
 * ⚠ Values come from src/data/site.js and are PLACEHOLDERS (null → "XX").
 * The count-up only runs once a real number is supplied.
 */
export default function Stats() {
  const reduced = useReducedMotion();

  return (
    <section
      id="stats"
      className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-24 lg:py-28"
      aria-labelledby="stats-title"
    >
      <div className="bg-grid-dark absolute inset-0 opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full opacity-45 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(255,85,0,0.6), transparent 62%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(255,123,0,0.55), transparent 62%)' }}
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="stats-title"
            eyebrow="By the numbers"
            theme="dark"
            lines={['MEASURED IN OUTCOMES.']}
            className="max-w-3xl"
          />
          <Reveal delay={0.15}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/60">
              ⚠ Placeholder figures — replace in src/data/site.js
            </span>
          </Reveal>
        </div>

        <Reveal
          stagger
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4"
          amount={0.2}
        >
          {stats.map((stat) => (
            <RevealItem key={stat.id} className="h-full">
              <motion.div
                className="group flex h-full flex-col justify-between gap-6 bg-navy-900 p-6 transition-colors duration-500 hover:bg-navy-800 sm:p-8"
                whileHover={reduced ? undefined : { y: -4 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <span className="font-display text-[clamp(2.6rem,7vw,4.5rem)] font-bold leading-none tracking-[-0.05em] text-white">
                  <Counter value={stat.value} suffix={stat.suffix} placeholder={stat.isPlaceholder} />
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
                    {stat.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-white/20 transition-all duration-500 group-hover:w-16 group-hover:bg-brand-gradient"
                  />
                </span>
              </motion.div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
