import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  Code2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { EASE } from '../../lib/animation';

// CRM UI Screenshots provided by user
import crm2Img from '../../assets/crm2 (2).png';
import crm6Img from '../../assets/crm 6.png';
import crm8Img from '../../assets/crm8.png';

const CRM_SLIDES = [
  {
    id: 'workspace',
    index: '01',
    category: 'Sales Automation & Portals',
    title: 'Manage Teams & Close Deals Faster',
    headline: 'Unified CRM Workspace',
    tagline: 'Lead capture, automated attendance tracking, and unified pipeline stages.',
    description:
      'A comprehensive CRM platform empowering revenue and customer operations teams. Track complete communication lifecycles from first inquiry to closed contract with biometric security, device validation, and real-time activity tracking.',
    image: crm2Img,
    accent: '#ff5500',
    stats: [
      { label: 'Pipeline Velocity', value: '3.5x Faster' },
      { label: 'Security Protocols', value: '2FA + OTP' },
      { label: 'Sync Latency', value: '< 40ms' },
    ],
    features: [
      'Visual lead scoring and customer 360° communication timeline',
      'Automated follow-up emails, contract alerts, and WhatsApp triggers',
      'Secure enterprise single sign-on with device verification',
    ],
  },
  {
    id: 'dashboard',
    index: '02',
    category: 'Engineering & Operations',
    title: 'IT & Engineering Dashboard',
    headline: 'Real-Time Project Delivery',
    tagline: 'Kanban boards, workflow column metrics, and cross-team delivery oversight.',
    description:
      'High-visibility delivery desk designed for engineering managers and operations executives. Real-time WIP columns, overdue task alerts, live delivery stages, and automated sprint reporting in a crystal-clear unified workspace.',
    image: crm6Img,
    accent: '#ff7b00',
    stats: [
      { label: 'Board Updates', value: 'Instant WS' },
      { label: 'Task Automation', value: '98% Automated' },
      { label: 'Workforce Sync', value: 'Multi-Department' },
    ],
    features: [
      'Interactive drag-and-drop workflow columns with custom WIP limits',
      'Overdue ticket escalations and automated SLA milestone alerts',
      'Unified personal, team, and departmental delivery tracking',
    ],
  },
  {
    id: 'helpdesk',
    index: '03',
    category: 'Helpdesk & Ticket Queues',
    title: 'Customer Support & Resolution Suite',
    headline: 'Smart Support Tickets',
    tagline: 'SLA-driven customer support queues, ticket categorization, and agent tracking.',
    description:
      'Resolve customer inquiries with precision. Features multi-channel ticket ingestion, priority assignment, automated canned replies, and agent resolution metrics with complete audit histories.',
    image: crm8Img,
    accent: '#ffaa2b',
    stats: [
      { label: 'First Response Time', value: '< 15 mins' },
      { label: 'Resolution Rate', value: '99.4%' },
      { label: 'Ticket Ingestion', value: 'Omnichannel' },
    ],
    features: [
      'Automated ticket routing by product, severity, and agent skillset',
      'Comprehensive customer interaction history and contract tier tags',
      'Exportable SLA performance summaries and satisfaction analytics',
    ],
  },
];

export default function CrmShowcaseModal() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    const handleOpen = (e) => {
      const detail = e?.detail;
      if (detail === 'crm-solutions' || detail?.serviceId === 'crm-solutions') {
        setCurrentIndex(0);
        setOpen(true);
      }
    };
    window.addEventListener('cyberhaxs:open-crm-showcase', handleOpen);
    return () => window.removeEventListener('cyberhaxs:open-crm-showcase', handleOpen);
  }, []);

  const close = () => {
    setOpen(false);
    setDetailOpen(false);
  };

  // Auto-advance slider moving left-to-right every 5 seconds
  useEffect(() => {
    if (!open || isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % CRM_SLIDES.length);
    }, 5200);
    return () => clearInterval(interval);
  }, [open, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const goToSlide = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % CRM_SLIDES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + CRM_SLIDES.length) % CRM_SLIDES.length);
  };

  const currentSlide = CRM_SLIDES[currentIndex];
  const nextSlideData = CRM_SLIDES[(currentIndex + 1) % CRM_SLIDES.length];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-5 overflow-y-auto">
          {/* Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Shell: White Background Theme */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.45, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="crm-showcase-title"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative z-10 flex flex-col w-full max-w-7xl h-[92vh] max-h-[940px] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-black/12 bg-white text-slate-900 shadow-[0_35px_120px_rgba(0,0,0,0.35)]"
          >
            {/* ---------------- Top Editorial Navigation Bar ---------------- */}
            <div className="shrink-0 flex items-center justify-between border-b border-black/10 bg-white/95 px-6 sm:px-10 py-4 sm:py-5 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <span className="font-display font-black tracking-widest text-lg text-slate-900 uppercase">
                  CYBERHAXS <span className="text-[#ff5500]">CRM</span>
                </span>
                <span className="hidden sm:inline-block h-3 w-px bg-slate-300" />
                <span className="hidden sm:inline-block text-xs font-mono text-slate-500 uppercase tracking-widest">
                  Enterprise Platform Showcase
                </span>
              </div>

              {/* Navigation Links & Close */}
              <div className="flex items-center gap-5 sm:gap-8">
                <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-slate-600">
                  <button
                    type="button"
                    onClick={() => goToSlide(0)}
                    className={`transition-colors hover:text-slate-900 cursor-pointer ${
                      currentIndex === 0 ? 'text-[#ff5500] font-bold' : ''
                    }`}
                  >
                    Workspace
                  </button>
                  <button
                    type="button"
                    onClick={() => goToSlide(1)}
                    className={`transition-colors hover:text-slate-900 cursor-pointer ${
                      currentIndex === 1 ? 'text-[#ff5500] font-bold' : ''
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => goToSlide(2)}
                    className={`transition-colors hover:text-slate-900 cursor-pointer ${
                      currentIndex === 2 ? 'text-[#ff5500] font-bold' : ''
                    }`}
                  >
                    Helpdesk
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      setTimeout(() => {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 200);
                    }}
                    className="text-slate-700 hover:text-[#ff5500] transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </nav>

                {/* Arrow Controls */}
                <div className="flex items-center gap-1.5 border border-black/10 rounded-full p-1 bg-slate-100">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="flex h-7 w-7 items-center justify-center rounded-full text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="flex h-7 w-7 items-center justify-center rounded-full text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={close}
                  aria-label="Close modal"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* ---------------- Main Stage Area ---------------- */}
            <div className="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex items-center justify-center px-4 sm:px-12 py-6 select-none bg-gradient-to-b from-slate-50/80 via-white to-slate-100/70">
              {/* Giant Background Watermark Number matching reference image */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 left-4 sm:left-10 font-display font-black text-[clamp(9rem,24vw,19rem)] leading-none text-black/[0.04] tracking-tighter select-none z-0"
              >
                {currentSlide.index}
              </div>

              {/* Ambient Studio Lighting Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/3 left-1/3 h-96 w-96 rounded-full opacity-10 blur-[140px]"
                style={{ background: 'radial-gradient(circle, #ff5500, transparent 65%)' }}
              />

              {/* Slide Content Grid: Text on Left + Moving Images on Right */}
              <div className="relative z-10 w-full h-full max-w-6xl grid lg:grid-cols-[1.1fr_1.6fr] gap-6 sm:gap-12 items-center py-3 sm:py-0">
                {/* ---------------- Left Content Column (Black / Dark Text) ---------------- */}
                <div className="space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide.id}
                      initial={{ opacity: 0, x: -25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#ff5500] uppercase">
                          {currentSlide.index} / 03 · {currentSlide.category}
                        </span>
                      </div>

                      <h2
                        id="crm-showcase-title"
                        className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-slate-900 leading-[1.05]"
                      >
                        {currentSlide.title}
                      </h2>

                      <p className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                        {currentSlide.tagline}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md line-clamp-3 sm:line-clamp-none">
                        {currentSlide.description}
                      </p>

                      {/* Action Links */}
                      <div className="pt-3 flex flex-wrap items-center gap-5">
                        <button
                          type="button"
                          onClick={() => {
                            close();
                            setTimeout(() => {
                              window.dispatchEvent(
                                new CustomEvent('cyberhaxs:select-service', { detail: 'crm-solutions' })
                              );
                              const el = document.getElementById('contact');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }, 200);
                          }}
                          className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:scale-105 transition-transform cursor-pointer"
                        >
                          <span>Deploy CRM Architecture</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ---------------- Right Horizontal Moving Showcase (Left-to-Right Carousel) ---------------- */}
                <div className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[440px] flex items-center justify-center overflow-visible">
                  <div className="relative w-full h-full flex items-center">
                    {/* Active Featured Image Card */}
                    <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                      <motion.div
                        key={currentSlide.id}
                        custom={direction}
                        initial={{
                          opacity: 0,
                          x: direction > 0 ? 120 : -120,
                          scale: 0.94,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          x: direction > 0 ? -120 : 120,
                          scale: 0.94,
                        }}
                        transition={{
                          x: { type: 'spring', stiffness: 220, damping: 26 },
                          opacity: { duration: 0.4 },
                          scale: { duration: 0.4 },
                        }}
                        className="relative z-20 w-full rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-slate-900 border-2 border-slate-800 shadow-[0_30px_90px_rgba(0,0,0,0.28)] overflow-hidden cursor-pointer group"
                        onClick={() => setDetailOpen(true)}
                      >
                        {/* Browser Top Window Controls */}
                        <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800 bg-slate-950 rounded-t-xl mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <div className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                            <div className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                            <div className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />
                          </div>
                          <span className="font-mono text-[0.65rem] text-slate-400 tracking-wider">
                            netcradus.workspace / {currentSlide.id}
                          </span>
                          <div className="w-10" />
                        </div>

                        {/* CRM Image Content */}
                        <div className="relative overflow-hidden rounded-xl bg-[#0c101d] aspect-[16/9] w-full">
                          <img
                            src={currentSlide.image}
                            alt={currentSlide.title}
                            className="w-full h-full object-cover object-top select-none group-hover:scale-102 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span>Click to inspect case study</span>
                              <ArrowUpRight className="h-3.5 w-3.5 text-[#ff5500]" />
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Next Peeking Image on the Right (matching reference composition) */}
                    <div
                      onClick={nextSlide}
                      className="hidden md:block absolute -right-24 sm:-right-36 lg:-right-44 top-1/2 -translate-y-1/2 w-[65%] sm:w-[60%] lg:w-[55%] rounded-2xl p-2 bg-slate-900/80 border border-slate-700 opacity-40 hover:opacity-75 transition-all duration-300 cursor-pointer shadow-xl scale-90 z-10 pointer-events-auto"
                      aria-label="Next slide preview"
                    >
                      <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-[#0c101d]">
                        <img
                          src={nextSlideData.image}
                          alt=""
                          className="w-full h-full object-cover object-top select-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------- Bottom Bar (Progress Dashes & Socials) ---------------- */}
            <div className="shrink-0 flex items-center justify-between border-t border-black/10 bg-white/95 px-6 sm:px-10 py-4 text-xs text-slate-600">
              {/* Segmented Progress Dashes (matching reference image) */}
              <div className="flex items-center gap-2 sm:gap-3">
                {CRM_SLIDES.map((slide, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className="group flex flex-col items-start gap-1 py-1 cursor-pointer"
                    >
                      <div
                        className={`h-1 rounded-full transition-all duration-500 ${
                          isActive
                            ? 'w-10 sm:w-14 bg-gradient-to-r from-[#ff5500] to-[#ff7b00] shadow-[0_0_12px_rgba(255,85,0,0.6)]'
                            : 'w-6 sm:w-8 bg-slate-300 group-hover:bg-slate-400'
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="ml-3 font-mono text-[0.68rem] text-slate-500 tracking-wider">
                  0{currentIndex + 1} / 0{CRM_SLIDES.length}
                </span>
              </div>

              {/* Branding */}
              <div className="flex items-center font-mono text-[0.7rem] uppercase tracking-wider text-[#ff5500] font-bold">
                CyberHaxs CRM
              </div>
            </div>

            {/* ---------------- Case Study Detailed Modal Overlay ---------------- */}
            <AnimatePresence>
              {detailOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute inset-0 z-30 bg-white/98 text-slate-900 p-6 sm:p-12 overflow-y-auto flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold tracking-widest text-[#ff5500]">
                        SPECIFICATION · {currentSlide.index}
                      </span>
                      <span className="h-3 w-px bg-slate-300" />
                      <span className="text-xs uppercase tracking-wider text-slate-600 font-semibold">
                        {currentSlide.headline}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDetailOpen(false)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 my-auto py-6">
                    <div className="space-y-5">
                      <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-slate-900">
                        {currentSlide.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {currentSlide.description}
                      </p>

                      {/* Deliverables checklist */}
                      <div className="space-y-2.5 pt-2">
                        {currentSlide.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-[#ff5500] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="rounded-2xl border border-black/10 overflow-hidden shadow-xl bg-[#0c101d] aspect-[16/9]">
                        <img
                          src={currentSlide.image}
                          alt=""
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3 border-t border-black/10 pt-4">
                        {currentSlide.stats.map((stat, i) => (
                          <div key={i} className="space-y-1">
                            <span className="block font-display text-base sm:text-lg font-bold text-[#ff5500]">
                              {stat.value}
                            </span>
                            <span className="block text-[0.65rem] uppercase tracking-wider text-slate-500 font-semibold">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-black/10 pt-4 text-xs">
                    <button
                      type="button"
                      onClick={() => setDetailOpen(false)}
                      className="font-bold text-slate-800 hover:text-[#ff5500] transition-colors cursor-pointer"
                    >
                      ← Back to Moving Slider
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        close();
                        setTimeout(() => {
                          const el = document.getElementById('contact');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 200);
                      }}
                      className="font-bold text-[#ff5500] hover:text-[#ff7b00] transition-colors cursor-pointer"
                    >
                      Start This Project →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
