import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import letBg from '../assets/let.png';
import { EASE } from '../lib/animation';

/**
 * Full-width CTA band using let.png graphic background.
 */
export default function BigCTA() {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  return (
    <section
      id="cta"
      ref={ref}
      className="relative isolate overflow-hidden bg-navy-950 py-16 text-white sm:py-24 lg:py-32 min-h-[420px] sm:min-h-[520px] lg:min-h-[620px] flex items-center"
      aria-labelledby="cta-title"
    >
      {/* background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={letBg}
          alt="Have an idea"
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent sm:hidden" />
      </div>

      <div className="container-page relative w-full">
        <div className="max-w-2xl">
          <h2
            id="cta-title"
            className="font-display text-[clamp(1.95rem,6.4vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.04em] text-white"
            aria-label="Have an idea? Let's build something great."
          >
            {[
              { text: 'HAVE AN IDEA?' },
              { text: "LET'S BUILD" },
              { text: 'SOMETHING' },
              { text: 'GREAT.' },
            ].map((line, i) => (
              <span key={line.text} className="block overflow-hidden pb-[0.04em] -mb-[0.04em]" aria-hidden="true">
                <motion.span
                  className="block"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  variants={{ hidden: { y: 0 }, visible: { y: 0 } }}
                  transition={{ duration: 0 }}
                >
                  <motion.span
                    className="block text-white"
                    variants={{
                      hidden: reduced ? { y: 0 } : { y: '112%' },
                      visible: {
                        y: '0%',
                        transition: reduced
                          ? { duration: 0 }
                          : { duration: 0.85, ease: EASE, delay: i * 0.08 },
                      },
                    }}
                  >
                    {line.text}
                  </motion.span>
                </motion.span>
              </span>
            ))}
          </h2>

          <Reveal delay={0.35} className="mt-8 sm:mt-10">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 sm:px-7 sm:py-3.5 font-display text-sm sm:text-base font-bold uppercase tracking-[0.06em] text-navy-950 shadow-xl transition-all duration-300 hover:shadow-[0_20px_45px_-15px_rgba(255,255,255,0.6)] hover:scale-[1.02]"
            >
              Start a Project
              <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-navy-950 text-white transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.8} aria-hidden="true" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
