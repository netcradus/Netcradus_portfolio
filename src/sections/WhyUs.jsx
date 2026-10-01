import {
  Code2,
  Layers,
  Sparkles,
  ShieldCheck,
  MonitorSmartphone,
  Cloud,
  Gauge,
  Headset,
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal, { RevealItem } from '../components/ui/Reveal';
import { whyUs } from '../data/site';
import whyUsQuestionImg from '../assets/download (2).jpg';

const ICONS = {
  custom: Code2,
  scalable: Layers,
  modern: Sparkles,
  security: ShieldCheck,
  responsive: MonitorSmartphone,
  cloud: Cloud,
  performance: Gauge,
  support: Headset,
};

/**
 * Blueprint-style bordered grid (not floating cards) with a gradient sweep,
 * icon morph and copy reveal on hover/focus.
 */
export default function WhyUs() {
  return (
    <section id="why" className="relative isolate overflow-hidden bg-white py-16 sm:py-24 lg:py-32" aria-labelledby="why-title">
      {/* 3D Question Mark Graphic on Top-Right — sharp & unblurred */}
      <div className="pointer-events-none absolute right-2 sm:right-8 md:right-14 lg:right-20 top-4 sm:top-8 lg:top-10 z-0">
        <img
          src={whyUsQuestionImg}
          alt="Why CyberHaxs"
          className="h-28 sm:h-48 md:h-64 lg:h-80 w-auto object-contain select-none opacity-40 sm:opacity-100"
        />
      </div>

      <div className="container-page relative z-10">
        <SectionHeading
          id="why-title"
          eyebrow="Why CyberHaxs"
          lines={[
            { text: 'WHY BUSINESSES', accent: false },
            { text: 'CHOOSE CYBERHAXS', accent: true },
          ]}
          description="Eight reasons engineering teams and business leaders keep CyberHaxs on speed dial."
          className="max-w-4xl"
        />

        <Reveal stagger className="mt-12 grid border-l border-t border-ink/15 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm" amount={0.05}>
          {whyUs.map((item, i) => {
            const Icon = ICONS[item.id] ?? Sparkles;
            return (
              <RevealItem key={item.id} className="h-full">
                <div className="group relative h-full overflow-hidden border-b border-r border-ink/15 bg-white/88 p-5 sm:p-7 transition-all duration-500 hover:bg-white backdrop-blur-md">
                  {/* gradient sweep */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-royal-600/8 to-violet-600/8 transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:h-full"
                  />

                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal-600 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:bg-brand-gradient group-hover:text-white group-hover:shadow-[0_14px_28px_-14px_rgba(37,99,235,0.9)]">
                        <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[0.68rem] tracking-[0.2em] text-muted/50 transition-colors group-hover:text-royal-600">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="font-display text-[1.05rem] font-bold leading-snug tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">{item.text}</p>

                    <span
                      aria-hidden="true"
                      className="mt-1 h-px w-0 bg-brand-gradient transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-16"
                    />
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
