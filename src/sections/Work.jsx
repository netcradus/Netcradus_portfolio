import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Link2 } from 'lucide-react';
import { useRef } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal, { MediaReveal } from '../components/ui/Reveal';
import { projects } from '../data/site';
import {
  BrowserMockup,
  PhoneMockup,
  Blob,
} from '../components/visuals/Visuals';

const MEDIA_BG = {
  erp: 'linear-gradient(135deg,#0b0c10 0%,#e04300 55%,#ff7b00 100%)',
  crm: 'linear-gradient(135deg,#0b0c10 0%,#ff5500 50%,#ffaa2b 100%)',
  mobile: 'linear-gradient(135deg,#0b0c10 0%,#c93b00 55%,#ff7b00 100%)',
  web: 'linear-gradient(135deg,#0b0c10 0%,#ff6a00 50%,#ffaa2b 100%)',
};

export default function Work() {
  return (
    <section id="work" className="relative overflow-hidden bg-surface py-24 sm:py-32 lg:py-40" aria-labelledby="work-title">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="work-title"
            eyebrow="Case studies"
            lines={['SELECTED WORK']}
            className="max-w-3xl"
          />
          <Reveal delay={0.15} className="max-w-md">
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              A sample of the platforms we design and engineer.
              <span className="mt-2 block text-xs uppercase tracking-[0.16em] text-muted/70">
                ⚠ All projects below are placeholders — replace in{' '}
                <code className="rounded bg-ink/5 px-1.5 py-0.5">src/data/site.js</code>
              </span>
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-8 sm:mt-20 sm:gap-14">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function ProjectCard({ project }) {
  const reduced = useReducedMotion();
  const cardRef = useRef(null);
  const isRight = project.layout === 'right';

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-26, 26]);
  const mediaScale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1.06, 1.02, 1.06]);

  return (
    <article
      ref={cardRef}
      className="group relative grid min-w-0 items-center gap-7 lg:grid-cols-2 lg:gap-16"
    >
      {/* ---------------- media ---------------- */}
      <MediaReveal
        amount={0.15}
        className={`relative ${isRight ? 'lg:order-2' : ''}`}
      >
        <div
          className="relative aspect-[4/3.1] w-full overflow-hidden rounded-[1.75rem] shadow-[0_40px_90px_-50px_rgba(10,16,46,0.75)] sm:aspect-[4/3] sm:rounded-[2.5rem] lg:aspect-[4/3.4]"
          style={{ background: MEDIA_BG[project.visual] ?? MEDIA_BG.web }}
        >
          <div className="bg-grid-dark absolute inset-0 opacity-45" aria-hidden="true" />
          <Blob className="-left-16 -top-16 h-56 w-56" from="#ffaa2b" to="#ff5500" opacity={0.45} />

          {/* parallax inner */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-6 sm:p-12"
            style={reduced ? undefined : { y: mediaY, scale: mediaScale }}
          >
            <div className="w-full max-w-[30rem] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]">
              {project.visual === 'mobile' ? (
                 <div className="flex justify-center">
                   <PhoneMockup className="animate-float" />
                 </div>
              ) : (
                <BrowserMockup
                  variant={
                    project.visual === 'erp'
                      ? 'analytics'
                      : project.visual === 'crm'
                        ? 'pipeline'
                        : 'dashboard'
                  }
                  accent={
                    project.visual === 'erp'
                      ? '#ffaa2b'
                      : project.visual === 'crm'
                        ? '#ff7b00'
                        : '#ff5500'
                  }
                />
              )}
            </div>
          </motion.div>

          {/* big index watermark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 right-5 font-display text-[clamp(3.5rem,9vw,7rem)] font-bold leading-none tracking-tighter text-white/12"
          >
            {project.index}
          </span>

          {project.isPlaceholder && (
            <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur sm:left-6 sm:top-6">
              Placeholder
            </span>
          )}
        </div>
      </MediaReveal>

      {/* ---------------- copy ---------------- */}
      <Reveal
        delay={0.1}
        className={`relative flex flex-col gap-5 ${isRight ? 'lg:order-1 lg:items-end lg:text-right' : ''}`}
      >
        <span className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-[0.24em] text-royal-600">{project.index}</span>
          <span className="h-px w-10 bg-ink/15" aria-hidden="true" />
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
            {project.category}
          </span>
        </span>

        <h3 className="font-display text-[clamp(1.65rem,3.4vw,2.75rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink transition-colors duration-500 group-hover:text-royal-700">
          {project.title}
        </h3>

        <p className={`max-w-lg text-sm leading-relaxed text-muted sm:text-base ${isRight ? 'lg:ml-auto' : ''}`}>
          {project.description}
        </p>

        <ul className={`flex flex-wrap gap-2 ${isRight ? 'lg:justify-end' : ''}`}>
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-ink/12 bg-white px-3 py-1.5 text-[0.72rem] font-medium tracking-wide text-muted transition-colors duration-300 group-hover:border-royal-600/30 group-hover:text-ink"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* CTA: real link only when a URL exists */}
        {project.url ? (
          <a
            href={project.url}
            className={`mt-1 inline-flex items-center gap-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:text-royal-600 ${
              isRight ? 'lg:ml-auto' : ''
            }`}
          >
            View Project
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 transition-all duration-300 group-hover:border-royal-600 group-hover:bg-royal-600 group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        ) : (
          <span
            className={`mt-1 inline-flex items-center gap-2.5 text-sm font-medium text-muted/70 ${
              isRight ? 'lg:ml-auto' : ''
            }`}
            title="Add a real project URL in src/data/site.js"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-ink/20">
              <Link2 className="h-4 w-4" aria-hidden="true" />
            </span>
            Case study link — placeholder
          </span>
        )}
      </Reveal>
    </article>
  );
}
