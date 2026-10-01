import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import { processSteps } from '../data/site';
import { EASE } from '../lib/animation';
import bg5Img from '../assets/bg5.png';

/**
 * "FROM IDEA TO IMPACT." — scroll-driven vertical timeline.
 * The rail fills as the section passes through the viewport and each step
 * lights up as it becomes active.
 */
export default function Process() {
  const reduced = useReducedMotion();
  const railRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 65%', 'end 65%'],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="process" className="relative overflow-hidden bg-[#eef4f9] py-16 sm:py-24 lg:py-32" aria-labelledby="process-title">
      {/* Background Image: bg5.png extended vertically across full section height */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 overflow-hidden w-full lg:w-[40%] xl:w-[36%] flex items-stretch justify-end opacity-25 lg:opacity-95 select-none">
        <img
          src={bg5Img}
          alt="Development Process Roadmap Background"
          className="h-full w-full object-cover object-right select-none"
        />
        {/* Seamless edge blend gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#eef4f9]/30 via-transparent to-[#eef4f9]/30 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#eef4f9] to-transparent pointer-events-none" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 h-[24rem] w-[24rem] rounded-full opacity-35 blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(255,170,43,0.25), transparent 65%)' }}
      />

      <div className="container-page relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:max-w-[66%] xl:max-w-[68%]">
          {/* -------- sticky heading -------- */}
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="process-title"
              eyebrow="Development process"
              lines={[
                { text: 'FROM IDEA', accent: false },
                { text: 'TO IMPACT.', accent: true },
              ]}
              description="Seven disciplined stages that take a concept from a whiteboard to a production system — and keep improving it afterwards."
            />

            <Reveal delay={0.2} className="mt-9 hidden lg:block">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-5 py-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-royal-500 opacity-70" style={{ animation: 'pulse-ring 2.4s cubic-bezier(0.4,0,0.2,1) infinite' }} />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-royal-600" />
                </span>
                <span className="text-sm font-medium text-muted">
                  Transparent delivery · weekly checkpoints
                </span>
              </div>
            </Reveal>
          </div>

          {/* -------- timeline -------- */}
          <div ref={railRef} className="relative pl-8 sm:pl-16">
            {/* base rail */}
            <span
              aria-hidden="true"
              className="absolute left-2.5 top-2 h-[calc(100%-1rem)] w-px bg-ink/12 sm:left-6"
            />
            {/* animated fill */}
            <motion.span
              aria-hidden="true"
              className="absolute left-2.5 top-2 w-px bg-brand-gradient sm:left-6"
              style={reduced ? { height: '100%' } : { height: fillHeight }}
            />

            <ol className="flex flex-col gap-7 sm:gap-11">
              {processSteps.map((step) => (
                <li key={step.id}>
                  <Reveal delay={0.05} y={26} amount={0.5}>
                    <div className="group relative">
                      {/* node */}
                      <span
                        aria-hidden="true"
                        className="absolute -left-[2.1rem] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-ink/15 bg-white transition-all duration-500 group-hover:border-transparent group-hover:bg-brand-gradient sm:-left-[4.05rem] sm:h-7 sm:w-7"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-ink/30 transition-all duration-500 group-hover:bg-white" />
                      </span>

                      <div className="flex flex-col gap-2 rounded-2xl border border-transparent px-1 py-1 transition-all duration-500 group-hover:border-ink/8 group-hover:bg-white group-hover:px-5 group-hover:py-4 group-hover:shadow-[0_24px_50px_-34px_rgba(10,16,46,0.55)]">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <span className="font-mono text-xs tracking-[0.22em] text-royal-600">
                            {step.index}
                          </span>
                          <h3 className="font-display text-[clamp(1.3rem,3vw,2rem)] font-bold tracking-[-0.03em] text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                            {step.title}
                          </h3>
                        </div>
                        <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
