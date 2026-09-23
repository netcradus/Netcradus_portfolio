import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal, { RevealItem } from '../components/ui/Reveal';
import { industries } from '../data/site';
import { EASE } from '../lib/animation';

/**
 * Industries / solutions — an editorial pill cluster with size variation and
 * staggered entrance instead of a grid of identical cards.
 */
const SIZES = [
  'text-[clamp(1.5rem,4.6vw,3.4rem)]',
  'text-[clamp(1.15rem,3vw,2.2rem)]',
  'text-[clamp(1.35rem,3.8vw,2.8rem)]',
  'text-[clamp(1.05rem,2.6vw,1.9rem)]',
  'text-[clamp(1.25rem,3.4vw,2.5rem)]',
  'text-[clamp(1rem,2.4vw,1.7rem)]',
  'text-[clamp(1.4rem,4vw,3rem)]',
  'text-[clamp(1.1rem,2.8vw,2.1rem)]',
];

export default function Solutions() {
  const reduced = useReducedMotion();

  return (
    <section
      id="solutions"
      className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40"
      aria-labelledby="solutions-title"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="min-w-0">
            <SectionHeading
              id="solutions-title"
              eyebrow="Industries & solutions"
              lines={[
                { text: 'BUILT FOR EVERY', accent: false },
                { text: 'STAGE OF GROWTH.', accent: true },
              ]}
            />
          </div>

          <Reveal delay={0.15} className="min-w-0 lg:pb-3">
            <p className="max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              From a founder's first release to an enterprise-wide platform, we
              adapt the process, team and architecture to the scale you operate at.
            </p>
          </Reveal>
        </div>

        {/* --------- pill cluster --------- */}
        <Reveal stagger className="mt-14 flex flex-wrap items-baseline gap-x-5 gap-y-4 sm:mt-20 sm:gap-x-8 sm:gap-y-6" amount={0.1}>
          {industries.map((item, i) => (
            <RevealItem key={item.id} className="inline-flex">
              <motion.a
                href="#contact"
                className={`group relative inline-flex items-baseline gap-2.5 font-display font-bold uppercase leading-[1] tracking-[-0.035em] text-ink/85 transition-colors duration-400 hover:text-transparent sm:gap-3 ${SIZES[i % SIZES.length]}`}
                whileHover={reduced ? undefined : { y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                aria-label={`Discuss a project for ${item.label}`}
              >
                {/* gradient fill on hover via clip */}
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-royal-600 via-violet-500 to-cyan-400 bg-clip-text text-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  {item.label}
                </span>
                <span className="relative transition-opacity duration-300 group-hover:opacity-0">
                  {item.label}
                </span>

                <span className="font-sans text-[0.62rem] font-semibold tracking-[0.2em] text-muted/55 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-royal-600 sm:text-[0.7rem]">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <ArrowUpRight
                  className="h-4 w-4 -translate-y-1 text-royal-600 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:h-5 sm:w-5"
                  aria-hidden="true"
                />
              </motion.a>
            </RevealItem>
          ))}
        </Reveal>

        {/* --------- footer note --------- */}
        <Reveal delay={0.25} className="mt-14 border-t border-ink/10 pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              Don't see your industry? We scope new domains quickly — tell us how
              your business runs and we'll map the software to it.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-royal-600 transition-colors hover:text-violet-600"
            >
              Start a conversation
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
