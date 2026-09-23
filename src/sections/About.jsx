import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal, { MediaReveal, RevealItem } from '../components/ui/Reveal';
import Button, { TextLink } from '../components/ui/Button';
import { about } from '../data/site';
import { EASE } from '../lib/animation';

export default function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40" aria-labelledby="about-title">
      <div className="container-page">
        {/* heading spans full width so the two intended lines never rag-wrap */}
        <SectionHeading
          id="about-title"
          eyebrow={about.eyebrow}
          lines={about.titleLines}
          headingMaxWidth="max-w-[24ch]"
        />

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-2 lg:items-start lg:gap-20">
          {/* ---------------- copy ---------------- */}
          <div className="relative min-w-0">
            <Reveal className="flex flex-col gap-5" delay={0.1}>
              {about.body.map((p, i) => (
                <p key={i} className="max-w-xl text-base leading-relaxed text-muted sm:text-[1.05rem]">
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal className="mt-9 flex flex-wrap items-center gap-5" delay={0.2}>
              <Button href="#contact" withArrow>
                Work with us
              </Button>
              <TextLink href="#process">See our process</TextLink>
            </Reveal>

            {/* pillars — hairline list, not cards */}
            <Reveal stagger className="mt-12 grid gap-x-10 sm:grid-cols-2" amount={0.1}>
              {about.pillars.map((pillar, i) => (
                <RevealItem
                  key={pillar.title}
                  className="group flex gap-4 border-t border-ink/10 py-4"
                >
                  <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-royal-50 text-royal-600 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="flex items-baseline gap-2">
                      <span className="font-mono text-[0.68rem] text-muted/60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-[0.98rem] font-bold tracking-tight text-ink">
                        {pillar.title}
                      </h3>
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{pillar.text}</p>
                  </span>
                </RevealItem>
              ))}
            </Reveal>
          </div>

          {/* ---------------- visual ---------------- */}
          <div className="relative min-w-0 lg:sticky lg:top-28">
            <MediaReveal className="relative">
              <div className="relative aspect-[4/4.4] w-full overflow-hidden rounded-[2.5rem] bg-navy-900 sm:aspect-[4/3.6] lg:aspect-[4/4.4]">
                <div className="bg-grid-dark absolute inset-0 opacity-50" />
                <div
                  className="absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-[90px]"
                  style={{ background: 'radial-gradient(circle, rgba(255,85,0,0.7), transparent 62%)' }}
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-28 -right-16 h-80 w-80 rounded-full opacity-55 blur-[100px]"
                  style={{ background: 'radial-gradient(circle, rgba(255,123,0,0.6), transparent 62%)' }}
                  aria-hidden="true"
                />

                {/* layered UI composition */}
                <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
                  <div className="w-full space-y-4">
                    {/* window 1 */}
                    <motion.div
                      className="w-[86%] overflow-hidden rounded-2xl border border-white/10 bg-navy-800/90 shadow-2xl backdrop-blur"
                      initial={reduced ? {} : { y: 26, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
                    >
                      <div className="flex items-center gap-2 border-b border-white/8 px-3.5 py-2.5">
                        <span className="h-2 w-2 rounded-full bg-white/25" />
                        <span className="h-2 w-2 rounded-full bg-white/18" />
                        <span className="h-2 w-2 rounded-full bg-white/12" />
                        <span className="ml-2 text-[0.6rem] uppercase tracking-[0.2em] text-white/35">
                          architecture
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 p-3">
                        {['Clients', 'API', 'Services', 'Workers', 'Cache', 'Data'].map((t, i) => (
                          <div
                            key={t}
                            className="rounded-lg border border-white/8 px-2 py-2.5 text-center text-[0.62rem] font-semibold tracking-wide"
                            style={{
                              background: i === 4 ? 'linear-gradient(120deg,#ff5500,#ffaa2b)' : 'rgba(255,255,255,0.05)',
                              color: i === 4 ? '#fff' : 'rgba(255,255,255,0.7)',
                            }}
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* window 2 (offset) */}
                    <motion.div
                      className="ml-auto w-[74%] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-xl"
                      initial={reduced ? {} : { y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.32 }}
                    >
                      <div className="flex items-end gap-1.5">
                        {[46, 68, 52, 84, 61, 92, 74].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t"
                            style={{
                              height: `${h * 0.5}px`,
                              background:
                                i % 2 ? 'linear-gradient(180deg,#ffaa2b,#ff5500)' : 'rgba(255,255,255,0.22)',
                            }}
                          />
                        ))}
                      </div>
                      <p className="mt-2.5 text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
                        performance
                      </p>
                    </motion.div>

                    {/* badges */}
                    <div className="flex flex-wrap gap-2">
                      {['Scalable', 'Secure', 'Cloud-ready'].map((t, i) => (
                        <motion.span
                          key={t}
                          className="rounded-full border border-white/12 bg-white/[0.07] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/75 backdrop-blur"
                          initial={reduced ? {} : { opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, ease: EASE, delay: 0.5 + i * 0.1 }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </MediaReveal>

            {/* stat callout */}
            <Reveal
              className="absolute -bottom-7 left-4 max-w-[15rem] rounded-2xl border border-ink/8 bg-white p-5 shadow-[0_28px_60px_-30px_rgba(10,16,46,0.5)] sm:left-8"
              delay={0.35}
            >
              <p className="font-display text-xl font-bold tracking-tight text-ink">
                From Idea to Scale
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                One partner across strategy, design, engineering and long-term support.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
