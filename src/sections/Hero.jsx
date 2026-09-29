import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Button from '../components/ui/Button';
import Marquee from '../components/ui/Marquee';
import { BrowserMockup, PhoneMockup, FloatingChip, Blob, GridPattern, NetworkLines } from '../components/visuals/Visuals';
import web1Img from '../assets/web1.png';
import app1Img from '../assets/app1.png';
import bgVideo from '../assets/background-loop.mp4';
import { hero, services } from '../data/site';
import { EASE } from '../lib/animation';

const EYEBROW = 'Software Development · IT Services · Digital Solutions';

export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);

  /* -------- pointer parallax (desktop only) -------- */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 55, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 55, damping: 18, mass: 0.6 });

  const backX = useTransform(sx, (v) => v * -26);
  const backY = useTransform(sy, (v) => v * -18);
  const midX = useTransform(sx, (v) => v * 18);
  const midY = useTransform(sy, (v) => v * 14);
  const frontX = useTransform(sx, (v) => v * 34);
  const frontY = useTransform(sy, (v) => v * 24);

  const onPointerMove = (e) => {
    if (reduced) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  /* -------- scroll parallax -------- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -50]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0]);

  /* -------- scroll cue action -------- */
  const scrollToAbout = (e) => {
    e.preventDefault();
    const el = document.getElementById('about');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({
        top: Math.max(top, 0),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
      history.replaceState(null, '', '#about');
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={onPointerMove}
      onMouseLeave={onPointerLeave}
      className="relative isolate overflow-hidden bg-white text-ink"
      aria-labelledby="hero-title"
    >
      {/* ---------- background video & ambient layers ---------- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-center opacity-70"
        />
        {/* Soft overlay gradients for clean contrast & text legibility */}
        <div className="absolute inset-0 bg-white/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/70" />
      </div>

      <GridPattern size={72} className="pointer-events-none opacity-40 z-[1]" />
      <Blob className="pointer-events-none -left-40 top-10 h-[30rem] w-[30rem] z-[1]" from="#ff5500" to="#ffbe5c" opacity={0.12} />
      <Blob className="pointer-events-none -right-32 top-40 h-[26rem] w-[26rem] z-[1]" from="#ffbe5c" to="#ff5500" opacity={0.1} />
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.45]"
        style={reduced ? undefined : { x: backX, y: backY }}
        aria-hidden="true"
      >
        <NetworkLines />
      </motion.div>

      {/* ---------- content ---------- */}
      <div className="container-page relative pb-16 pt-32 sm:pt-40 lg:pb-24 lg:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          {/* ---- copy ---- */}
          <motion.div style={{ y: copyY, opacity: fade }} className="relative z-10 min-w-0">
            <motion.p
              className="eyebrow mb-7 text-muted"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: reduced ? 0 : 0.15 }}
            >
              <span className="eyebrow-dot" aria-hidden="true" />
              {EYEBROW}
            </motion.p>

            <h1
              id="hero-title"
              className="font-display text-[clamp(2.4rem,6.2vw,5rem)] font-bold uppercase leading-[0.94] tracking-[-0.045em] text-ink"
              aria-label={hero.headlineLines.map((l) => l.text).join(' ')}
            >
              {hero.headlineLines.map((line, i) => (
                <span
                  key={line.text}
                  className="block overflow-hidden pb-[0.06em] -mb-[0.04em]"
                  aria-hidden="true"
                >
                  {/* mask wrapper = animation trigger */}
                  <motion.span
                    className="block"
                    initial="hidden"
                    animate="visible"
                    variants={{ hidden: { y: 0 }, visible: { y: 0 } }}
                    transition={{ duration: 0 }}
                  >
                    <motion.span
                      className={`block ${line.accent ? 'text-gradient-brand' : 'text-ink'}`}
                      variants={{
                        hidden: reduced ? { y: 0 } : { y: '112%' },
                        visible: {
                          y: '0%',
                          transition: reduced
                            ? { duration: 0 }
                            : {
                                duration: 0.95,
                                ease: EASE,
                                delay: 0.25 + i * 0.09,
                              },
                        },
                      }}
                    >
                      {line.text}
                    </motion.span>
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-7 max-w-2xl text-[1.02rem] leading-relaxed text-muted sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: reduced ? 0 : 0.75 }}
            >
              {hero.supporting}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: reduced ? 0 : 0.9 }}
            >
              <Button href={hero.primaryCta.href} withArrow>
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="ghost">
                {hero.secondaryCta.label}
              </Button>
            </motion.div>

            {/* capability ticker inside hero */}
            <motion.div
              className="mt-12 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: reduced ? 0 : 1.15 }}
            >
              <Marquee
                duration={34}
                fadeFrom="#ffffff"
                fadeTo="#ffffff"
                ariaLabel="CyberHaxs capabilities"
                gap="gap-6"
                className="text-muted"
              >
                {['Web Development', 'Mobile Apps', 'ERP Systems', 'CRM Platforms', 'Cloud & DevOps'].map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-muted-dark hover:text-ink transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff5500]" aria-hidden="true" />
                    {t}
                  </span>
                ))}
              </Marquee>
            </motion.div>
          </motion.div>

          {/* ---- visual ---- */}
          <motion.div
            className="relative z-10 mx-auto w-full max-w-[34rem] min-w-0 lg:max-w-none"
            style={{ y: visualY }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: reduced ? 0 : 0.5 }}
          >
            <div className="relative aspect-[4/3.1] w-full min-h-[340px] sm:min-h-[400px]">
              {/* main dashboard / tab */}
              <motion.div
                className="absolute left-0 top-2 w-[88%] sm:w-[86%]"
                style={reduced ? undefined : { x: midX, y: midY }}
              >
                <BrowserMockup variant="dashboard" image={web1Img} imgAlt="Netcradus Web platform preview" />
              </motion.div>

              {/* phone / mobile */}
              <motion.div
                className="absolute -bottom-6 right-0 sm:-bottom-8 sm:-right-2 z-20"
                style={reduced ? undefined : { x: frontX, y: frontY }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: reduced ? 0 : 0.9 }}
              >
                <PhoneMockup className="animate-float shadow-2xl" image={app1Img} imgAlt="Mobile app preview" />
              </motion.div>

              {/* floating chips */}
              <motion.div
                className="absolute -left-2 bottom-2 sm:-left-6 sm:bottom-4 z-20"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: reduced ? 0 : 1.15 }}
              >
                <FloatingChip label="Deploy" value="Production" />
              </motion.div>

              <motion.div
                className="absolute right-[12%] -top-3 sm:-top-5 z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: reduced ? 0 : 1.3 }}
              >
                <FloatingChip label="Uptime" value="99.9%" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ---- scroll cue ---- */}
        <motion.a
          href="#about"
          onClick={scrollToAbout}
          className="group mt-14 hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted transition-colors hover:text-ink lg:inline-flex cursor-pointer relative z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 1.5, duration: 0.6 }}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 transition-colors group-hover:border-ink/40 group-hover:bg-ink/5">
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 text-ink" aria-hidden="true" />
          </span>
          Scroll to explore
        </motion.a>
      </div>

      {/* services index strip with vibrant orange background and solid black text */}
      <div className="relative z-20 border-t border-black/15 bg-gradient-to-r from-[#ff5500] via-[#ff6a00] to-[#ff7b00] text-black shadow-md">
        <div className="container-page grid grid-cols-2 divide-x divide-black/20 md:grid-cols-4">
          {services.map((s) => (
            <a
              key={s.id}
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('services');
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 76;
                  window.scrollTo({
                    top: Math.max(top, 0),
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                  });
                  history.replaceState(null, '', '#services');
                }
              }}
              className="group flex items-center gap-3 px-3 py-4 sm:py-5 transition-all duration-300 hover:bg-black/10 sm:px-6 cursor-pointer"
            >
              <span className="font-mono text-[0.78rem] font-black text-black transition-transform duration-300 group-hover:scale-110">
                {s.index}
              </span>
              <span className="truncate text-[0.82rem] sm:text-[0.88rem] font-extrabold uppercase tracking-[0.14em] text-black transition-transform duration-300 group-hover:translate-x-1">
                {s.shortLabel}
              </span>
              <span
                aria-hidden="true"
                className="ml-auto hidden h-2 w-2 rounded-full bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
