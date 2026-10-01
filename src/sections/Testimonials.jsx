import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import { testimonials } from '../data/site';
import { EASE } from '../lib/animation';
import netLogo from '../assets/net.png';
import aauraaLogo from '../assets/aauraa.png';
import ayurvedaLogo from '../assets/ayurveda.png';
import whatVideo from '../assets/whatv.mp4';

const testimonialLogos = {
  't-1': netLogo,
  't-2': ayurvedaLogo,
  't-3': aauraaLogo,
};

/**
 * Elegant testimonial slider.
 * Fully keyboard accessible: arrows, dots and arrow-key navigation.
 */
export default function Testimonials() {
  const reduced = useReducedMotion();
  const [[index, direction], setState] = useState([0, 0]);
  const count = testimonials.length;

  const go = useCallback(
    (dir) => setState(([i]) => [(i + dir + count) % count, dir]),
    [count]
  );

  /**
   * Arrow keys work only while the slider itself has focus, so page-level
   * keyboard scrolling is never hijacked.
   */
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    }
  };

  const current = testimonials[index];

  const variants = {
    enter: (dir) => (reduced ? { opacity: 0 } : { opacity: 0, x: dir > 0 ? 64 : -64 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => (reduced ? { opacity: 0 } : { opacity: 0, x: dir > 0 ? -64 : 64 }),
  };

  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden bg-surface py-16 sm:py-24 lg:py-32"
      aria-labelledby="testimonials-title"
    >
      {/* ---------- background video layer ---------- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video
          src={whatVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-center"
        />
        {/* Subtle gradient edges for seamless section transitions without washing out the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/30 via-transparent to-surface/40 pointer-events-none" />
      </div>

      <div className="container-page relative z-10">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="testimonials-title"
            eyebrow="Testimonials"
            lines={['WHAT CLIENTS SAY']}
            theme="dark"
            className="max-w-2xl [&_.eyebrow]:text-white"
          />

          {/* controls */}
          <Reveal delay={0.15} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur-md text-white transition-all duration-300 hover:border-transparent hover:bg-brand-gradient hover:text-white cursor-pointer shadow-sm"
            >
              <ArrowLeft className="h-4.5 w-4.5 sm:h-5 sm:w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur-md text-white transition-all duration-300 hover:border-transparent hover:bg-brand-gradient hover:text-white cursor-pointer shadow-sm"
            >
              <ArrowRight className="h-4.5 w-4.5 sm:h-5 sm:w-5" aria-hidden="true" />
            </button>
          </Reveal>
        </div>

        {/* slide */}
        <Reveal delay={0.1} className="mt-10 sm:mt-16">
          <div
            className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white/92 backdrop-blur-xl p-5 sm:p-10 lg:p-16 shadow-[0_40px_90px_-60px_rgba(10,16,46,0.6)] sm:rounded-[2.5rem]"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            aria-live="polite"
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-45 blur-[110px]"
              style={{ background: 'radial-gradient(circle, rgba(255,123,0,0.4), transparent 62%)' }}
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={current.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
                className="relative"
              >
                <div className="mb-5 sm:mb-6 flex items-center justify-between gap-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 sm:px-3.5 py-1 sm:py-1.5 text-[0.62rem] sm:text-[0.64rem] font-bold uppercase tracking-[0.18em] ${current.isPlaceholder
                        ? 'border-violet-500/30 bg-violet-500/10 text-violet-600'
                        : 'border-brand-orange/30 bg-brand-orange/10 text-brand-orange'
                      }`}
                  >
                    {current.isPlaceholder ? 'Placeholder testimonial' : 'Client Review'}
                  </span>
                  <Quote className="h-8 w-8 text-royal-600/25 sm:h-12 sm:w-12" aria-hidden="true" />
                </div>

                <p className="font-display text-[clamp(1.1rem,2.4vw,2.1rem)] font-medium leading-[1.35] tracking-[-0.02em] text-ink">
                  “{current.quote}”
                </p>

                <footer className="mt-8 flex items-center gap-4 border-t border-ink/10 pt-7">
                  {testimonialLogos[current.id] ? (
                    <span
                      aria-hidden="true"
                      className="flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-full bg-black p-1 border border-ink/10 shadow-sm"
                    >
                      <img
                        src={testimonialLogos[current.id]}
                        alt={current.name}
                        className="h-full w-full object-contain"
                      />
                    </span>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand-gradient font-display text-sm font-bold text-white"
                    >
                      {current.name
                        .split(' ')
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join('')}
                    </span>
                  )}
                  <span className="flex flex-col">
                    <cite className="not-italic font-display text-base font-bold text-ink">
                      {current.name}
                    </cite>
                    <span className="text-sm text-muted">{current.role}</span>
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            {/* dots */}
            <div className="mt-8 flex items-center gap-2.5" role="tablist" aria-label="Choose testimonial">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1} of ${count}`}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  className={`h-1.5 rounded-full transition-all duration-400 ${i === index ? 'w-9 bg-brand-gradient' : 'w-4 bg-ink/15 hover:bg-ink/30'
                    }`}
                />
              ))}
              <span className="ml-auto font-mono text-xs tabular-nums text-muted/70">
                {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
