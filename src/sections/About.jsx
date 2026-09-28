import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal, { MediaReveal, RevealItem } from '../components/ui/Reveal';
import Button, { TextLink } from '../components/ui/Button';
import aboutVideo from '../assets/aboutv.mp4';
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
              <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] bg-navy-950 border border-white/10 shadow-2xl">
                <video
                  src={aboutVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="h-full w-full object-cover block"
                />
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
