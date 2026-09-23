import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import { EASE } from '../lib/animation';

/**
 * Full-width gradient CTA band with subtle animated lines + parallax.
 */
export default function BigCTA() {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-40, 40]);
  const lineY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -60]);

  return (
    <section
      id="cta"
      ref={ref}
      className="relative isolate overflow-hidden bg-navy-900 py-24 text-white sm:py-32 lg:py-40"
      aria-labelledby="cta-title"
    >
      {/* animated gradient wash */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ y }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(115deg,#c93b00 0%,#e04300 38%,#ff5500 62%,#ffaa2b 105%)',
            backgroundSize: '180% 180%',
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(115deg,transparent 20%, rgba(255,170,43,0.45) 45%, transparent 75%)',
          }}
          animate={reduced ? undefined : { x: ['-15%', '15%', '-15%'] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.16) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      {/* drifting diagonal lines */}
      <motion.svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40"
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
        style={{ y: lineY }}
      >
        <g stroke="rgba(255,255,255,0.35)" strokeWidth="1">
          <line x1="-100" y1="500" x2="500" y2="-60" />
          <line x1="150" y1="560" x2="750" y2="-60" />
          <line x1="420" y1="600" x2="1020" y2="-60" />
          <line x1="700" y1="620" x2="1300" y2="-60" />
        </g>
      </motion.svg>

      <div className="container-page relative">
        <h2
          id="cta-title"
          className="max-w-[14ch] font-display text-[clamp(2.4rem,8vw,7rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em]"
          aria-label="Have an idea? Let's build something great."
        >
          {[
            { text: 'HAVE AN IDEA?', accent: false },
            { text: "LET'S BUILD", accent: false },
            { text: 'SOMETHING', accent: true },
            { text: 'GREAT.', accent: true },
          ].map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-[0.06em] -mb-[0.04em]" aria-hidden="true">
              {/* mask wrapper is the scroll trigger */}
              <motion.span
                className="block"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={{ hidden: { y: 0 }, visible: { y: 0 } }}
                transition={{ duration: 0 }}
              >
                <motion.span
                  className={`block ${line.accent ? 'text-white' : 'text-white/70'}`}
                  variants={{
                    hidden: reduced ? { y: 0 } : { y: '112%' },
                    visible: {
                      y: '0%',
                      transition: reduced
                        ? { duration: 0 }
                        : { duration: 0.9, ease: EASE, delay: i * 0.08 },
                    },
                  }}
                >
                  {line.text}
                </motion.span>
              </motion.span>
            </span>
          ))}
        </h2>

        <Reveal delay={0.3} className="mt-11 flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 self-start rounded-full bg-white px-8 py-4 font-display text-base font-bold uppercase tracking-[0.06em] text-navy-900 transition-all duration-400 hover:shadow-[0_24px_50px_-20px_rgba(255,255,255,0.55)] sm:text-lg"
          >
            Start a Project
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-white transition-transform duration-400 group-hover:translate-x-1.5">
              <ArrowRight className="h-4 w-4" strokeWidth={2.6} aria-hidden="true" />
            </span>
          </a>

          <p className="max-w-sm text-sm leading-relaxed text-white/75 sm:text-right">
            Tell us about your product, your users and your timeline — we'll come
            back with a clear plan.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
