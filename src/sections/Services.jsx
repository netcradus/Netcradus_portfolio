import { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import { services } from '../data/site';
import { EASE } from '../lib/animation';
import { BrowserMockup, PhoneMockup } from '../components/visuals/Visuals';

const GRADIENTS = {
  royal: 'linear-gradient(120deg,#ff5500,#ff7b00)',
  violet: 'linear-gradient(120deg,#ff7b00,#ffaa2b)',
  cyan: 'linear-gradient(120deg,#ffaa2b,#ff5500)',
};

/**
 * "WHAT WE DO" — large interactive service rows.
 * Hover (or keyboard focus) tints the row, animates the arrow, expands the
 * capability list and reveals a floating product visual that follows the cursor.
 */
export default function Services() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(null);
  const wrapRef = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 90, damping: 22, mass: 0.5 });

  const onMove = (e) => {
    if (reduced || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const selectService = (id) => {
    // Pre-select the service in the contact form (same-tab custom event).
    window.dispatchEvent(new CustomEvent('cyberhaxs:select-service', { detail: id }));
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-32 lg:py-40"
      aria-labelledby="services-title"
    >
      <div className="bg-grid-dark absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full opacity-40 blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.5), transparent 62%)' }}
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="services-title"
            eyebrow="Capabilities"
            theme="dark"
            lines={['WHAT WE DO', 'FOR BUSINESS.']}
            className="max-w-3xl"
          />
          <Reveal delay={0.2} className="max-w-sm">
            <p className="text-sm leading-relaxed text-white/55 sm:text-base">
              Four core practices, one engineering standard. Every engagement is
              scoped, designed and built around your operating reality.
            </p>
          </Reveal>
        </div>

        {/* ---------------- service rows ---------------- */}
        <div
          className="relative mt-14 border-t border-white/12 sm:mt-20"
          ref={wrapRef}
          onMouseMove={onMove}
          onMouseLeave={() => setActive(null)}
        >
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.05} amount={0.15}>
              <article
                className="group relative border-b border-white/12"
                onMouseEnter={() => setActive(service.id)}
                onFocus={() => setActive(service.id)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setActive(null);
                }}
              >
                {/* hover tint */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-within:scale-x-100"
                  style={{ background: GRADIENTS[service.gradient], opacity: 0.14 }}
                />

                <a
                  href="#contact"
                  onClick={() => selectService(service.id)}
                  className="relative flex flex-col gap-5 py-8 outline-none transition-[padding] duration-500 sm:py-10 lg:flex-row lg:items-center lg:gap-10 lg:group-hover:pl-4"
                  aria-label={`${service.title} — start a project`}
                >
                  {/* index */}
                  <span className="font-mono text-xs tracking-[0.2em] text-cyan-300/80 lg:w-16 lg:flex-none">
                    {service.index}
                  </span>

                  {/* title */}
                  <h3 className="font-display text-[clamp(1.7rem,5vw,3.4rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:w-[9.5em] lg:group-hover:translate-x-1">
                    {service.title}
                  </h3>

                  {/* summary + capabilities */}
                  <div className="flex-1 lg:min-w-0">
                    <p className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                      {service.summary}
                    </p>

                    {/* capabilities: always visible on mobile, hover reveal on desktop */}
                    <div className="mt-4 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-[600ms] lg:ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:max-h-40 lg:group-hover:opacity-100 lg:group-focus-within:max-h-40 lg:group-focus-within:opacity-100">
                      <ul className="flex flex-wrap gap-2">
                        {service.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[0.72rem] font-medium tracking-wide text-white/75 transition-colors duration-300 hover:border-cyan-300/50 hover:text-white"
                          >
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* arrow */}
                  <span className="hidden h-14 w-14 flex-none items-center justify-center rounded-full border border-white/20 text-white transition-all duration-500 group-hover:border-transparent group-hover:bg-brand-gradient lg:flex">
                    <ArrowUpRight
                      className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </article>
            </Reveal>
          ))}

          {/* floating cursor visual (desktop only) */}
          <AnimatePresence>
            {active && !reduced && (
              <motion.div
                key={active}
                className="pointer-events-none absolute z-20 hidden lg:block"
                style={{ left: sx, top: sy, x: '-50%', y: '-50%' }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: EASE }}
                aria-hidden="true"
              >
                <div className="w-[19rem] rotate-[-4deg]">
                  {active === 'app-development' ? (
                    <div className="flex justify-center">
                      <PhoneMockup className="!w-[130px] scale-95" accent="#ffaa2b" />
                    </div>
                  ) : (
                    <BrowserMockup
                      variant={
                        active === 'erp-solutions'
                          ? 'analytics'
                          : active === 'crm-solutions'
                            ? 'pipeline'
                            : 'dashboard'
                      }
                      accent={
                        active === 'erp-solutions' ? '#ffaa2b' : active === 'crm-solutions' ? '#ff7b00' : '#ff5500'
                      }
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
