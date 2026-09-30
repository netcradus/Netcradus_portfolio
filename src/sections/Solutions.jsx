import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import { industries } from '../data/site';
import { GridPattern, Blob } from '../components/visuals/Visuals';
import buildImg from '../assets/build.png';

export default function Solutions() {
  const reduced = useReducedMotion();

  return (
    <section
      id="solutions"
      className="relative isolate overflow-hidden py-24 sm:py-32 lg:py-40"
      aria-labelledby="solutions-title"
    >
      {/* ---------- Background Image: build.png ---------- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src={buildImg}
          alt=""
          className="h-full w-full object-cover object-center scale-105"
          loading="lazy"
        />
        {/* Balanced translucent overlay ensuring build.png is distinctly visible with high text contrast */}
        <div className="absolute inset-0 bg-white/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/50 to-white/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white/90" />
      </div>

      <GridPattern size={64} className="pointer-events-none opacity-30 z-[1]" />
      <Blob className="pointer-events-none -right-32 top-20 h-[28rem] w-[28rem] z-[1]" from="#ff5500" to="#ffbe5c" opacity={0.12} />

      <div className="container-page relative z-10">
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

        {/* --------- Uniform Size Sliding Marquee (Left to Right) --------- */}
        <div className="relative mt-12 sm:mt-16 flex flex-col gap-5 sm:gap-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]">
          {/* Row 1: Startups, SMEs, Enterprises, Healthcare */}
          <div className="flex overflow-hidden py-1">
            <motion.div
              className="flex w-max gap-8 sm:gap-12 md:gap-16 items-baseline"
              animate={
                reduced
                  ? {}
                  : {
                      x: ['-50%', '0%'], // Slide Left to Right
                    }
              }
              transition={{
                ease: 'linear',
                duration: 22,
                repeat: Infinity,
              }}
            >
              {[
                ...industries.slice(0, 4),
                ...industries.slice(0, 4),
                ...industries.slice(0, 4),
                ...industries.slice(0, 4),
                ...industries.slice(0, 4),
                ...industries.slice(0, 4),
              ].map((item, idx) => (
                <a
                  key={`row1-${item.id}-${idx}`}
                  href="#contact"
                  className="group inline-flex items-baseline gap-2.5 sm:gap-3.5 shrink-0 font-display font-bold uppercase tracking-tight text-ink/90 transition-colors duration-300 hover:text-[#ff5500] select-none text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem]"
                  aria-label={`Discuss a project for ${item.label}`}
                >
                  <span className="transition-colors duration-300 group-hover:text-[#ff5500]">
                    {item.label}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 sm:h-5 sm:w-5 -translate-y-1 text-[#ff5500] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Row 2: Education, Retail, E-Commerce, Professional Services */}
          <div className="flex overflow-hidden py-1">
            <motion.div
              className="flex w-max gap-8 sm:gap-12 md:gap-16 items-baseline"
              animate={
                reduced
                  ? {}
                  : {
                      x: ['-50%', '0%'], // Slide Left to Right
                    }
              }
              transition={{
                ease: 'linear',
                duration: 26,
                repeat: Infinity,
              }}
            >
              {[
                ...industries.slice(4, 8),
                ...industries.slice(4, 8),
                ...industries.slice(4, 8),
                ...industries.slice(4, 8),
                ...industries.slice(4, 8),
                ...industries.slice(4, 8),
              ].map((item, idx) => (
                <a
                  key={`row2-${item.id}-${idx}`}
                  href="#contact"
                  className="group inline-flex items-baseline gap-2.5 sm:gap-3.5 shrink-0 font-display font-bold uppercase tracking-tight text-ink/90 transition-colors duration-300 hover:text-[#ff5500] select-none text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem]"
                  aria-label={`Discuss a project for ${item.label}`}
                >
                  <span className="transition-colors duration-300 group-hover:text-[#ff5500]">
                    {item.label}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 sm:h-5 sm:w-5 -translate-y-1 text-[#ff5500] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </motion.div>
          </div>
        </div>

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
