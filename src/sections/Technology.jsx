import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import Marquee from '../components/ui/Marquee';
import Reveal from '../components/ui/Reveal';
import { techGroups } from '../data/site';
import { EASE } from '../lib/animation';

/**
 * Categorised technology marquee — five alternating rows that drift in
 * opposite directions. Pauses on hover. No logo dump.
 */
export default function Technology() {
  const reduced = useReducedMotion();

  return (
    <section
      id="technology"
      className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-32 lg:py-36"
      aria-labelledby="tech-title"
    >
      <div className="bg-grid-dark absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full opacity-40 blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(255,85,0,0.55), transparent 62%)' }}
        aria-hidden="true"
      />

      <div className="container-page relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="tech-title"
          eyebrow="Our stack"
          theme="dark"
          lines={['TECHNOLOGY THAT', { text: 'POWERS OUR WORK.', accent: true }]}
          className="max-w-3xl"
        />
        <Reveal delay={0.2} className="max-w-sm">
          <p className="text-sm leading-relaxed text-white/55 sm:text-base">
            A modern, proven stack chosen per project — never a one-size-fits-all
            toolchain.
          </p>
        </Reveal>
      </div>

      <div className="marquee-group relative mt-14 flex flex-col gap-4 sm:mt-20 sm:gap-5">
        {techGroups.map((group, i) => (
          <motion.div
            key={group.id}
            className="flex items-center gap-4 sm:gap-6"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduced ? 0 : 0.7, ease: EASE, delay: reduced ? 0 : i * 0.09 }}
          >
            {/* category label */}
            <span className="hidden w-28 flex-none border-r border-white/12 pr-5 text-right text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/40 sm:block lg:w-36">
              {group.label}
            </span>
            <div className="min-w-0 flex-1">
              <Marquee
                direction={group.direction}
                duration={48 + i * 6}
                fadeFrom="#0b0c10"
                fadeTo="#0b0c10"
                gap="gap-2.5"
                ariaLabel={`${group.label} technologies`}
              >
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className="flex whitespace-nowrap rounded-full border border-white/12 bg-white/[0.05] px-4 py-2.5 text-[0.8rem] font-medium tracking-wide text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-white/10 hover:text-white sm:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </Marquee>
            </div>
          </motion.div>
        ))}
      </div>

      {/* mobile category legend */}
      <div className="container-page mt-8 flex flex-wrap gap-x-5 gap-y-2 sm:hidden">
        {techGroups.map((g) => (
          <span key={g.id} className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/35">
            {g.label}
          </span>
        ))}
      </div>
    </section>
  );
}
