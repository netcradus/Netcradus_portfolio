import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import techBg from '../assets/tech2.png';
import { techGroups } from '../data/site';
import { EASE } from '../lib/animation';

const GROUP_STYLES = {
  frontend: 'border-cyan-500/35 bg-cyan-950/50 text-cyan-200 hover:border-cyan-400 hover:bg-cyan-900/60',
  backend: 'border-purple-500/35 bg-purple-950/50 text-purple-200 hover:border-purple-400 hover:bg-purple-900/60',
  mobile: 'border-pink-500/35 bg-pink-950/50 text-pink-200 hover:border-pink-400 hover:bg-pink-900/60',
  data: 'border-amber-500/35 bg-amber-950/50 text-amber-200 hover:border-amber-400 hover:bg-amber-900/60',
  devops: 'border-sky-500/35 bg-sky-950/50 text-sky-200 hover:border-sky-400 hover:bg-sky-900/60',
};

/**
 * Technology stack section with tech2.png neon laptop background
 * and categorized technology pills.
 */
export default function Technology() {
  const reduced = useReducedMotion();

  return (
    <section
      id="technology"
      className="relative isolate overflow-hidden bg-navy-950 py-24 text-white sm:py-32 lg:py-36 min-h-[640px] flex flex-col justify-center"
      aria-labelledby="tech-title"
    >
      {/* Background tech2.png */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={techBg}
          alt="Technology Stack Background"
          className="h-full w-full object-cover object-right select-none opacity-95"
        />
        {/* gradient wash on left so pills & text are crystal clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-transparent sm:via-navy-950/75 lg:w-[65%]" />
        <div className="absolute inset-0 bg-navy-950/25" />
      </div>

      <div className="container-page relative w-full">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="tech-title"
            eyebrow="Our stack"
            theme="dark"
            lines={['TECHNOLOGY THAT', { text: 'POWERS OUR WORK.', accent: true }]}
            className="max-w-2xl"
          />
          <Reveal delay={0.2} className="max-w-sm">
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">
              A modern, proven stack chosen per project — never a one-size-fits-all
              toolchain.
            </p>
          </Reveal>
        </div>

        {/* Tech rows */}
        <div className="relative mt-12 flex flex-col gap-5 sm:mt-16 sm:gap-6 lg:max-w-[62%]">
          {techGroups.map((group, i) => (
            <motion.div
              key={group.id}
              className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-5"
              initial={reduced ? { opacity: 1 } : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
            >
              {/* Category label with divider */}
              <div className="flex items-center gap-3 sm:w-28 sm:justify-end sm:border-r sm:border-white/15 sm:pr-4">
                <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.22em] text-white/50">
                  {group.label}
                </span>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs sm:text-[0.82rem] font-medium tracking-wide shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${
                      GROUP_STYLES[group.id] ||
                      'border-white/12 bg-white/5 text-white/80'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
