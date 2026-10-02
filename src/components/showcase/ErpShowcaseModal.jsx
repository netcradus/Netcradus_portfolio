import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Database,
  ShieldCheck,
} from 'lucide-react';
import { EASE } from '../../lib/animation';

// Background & ERP UI Screenshots provided by user
import erpbgImg from '../../assets/erpbg.png';
import erp1Img from '../../assets/ERP1.png';
import erp2Img from '../../assets/ERP2.png';
import erp3Img from '../../assets/ERP3.png';
import erp4Img from '../../assets/ERP4.png';
import erp5Img from '../../assets/ERP5.png';

const ERP_SCREENS = [
  {
    id: 'auth',
    index: '01',
    title: 'Multi-Role Workspace Authentication',
    tagline: 'Instant role selection for Super Admin, Doctor, Receptionist, Lab Staff & Patient.',
    image: erp1Img,
    accent: '#ff5500',
  },
  {
    id: 'admin',
    index: '02',
    title: 'Super Admin Command Center',
    tagline: 'Live telemetry across patient admissions, doctor schedules, bed occupancy & revenue.',
    image: erp2Img,
    accent: '#ff7b00',
  },
  {
    id: 'patient',
    index: '03',
    title: 'Patient Care & Medical Records Portal',
    tagline: 'Active prescriptions, consultation appointments, invoices & lab test history.',
    image: erp3Img,
    accent: '#ffaa2b',
  },
  {
    id: 'doctor',
    index: '04',
    title: 'Doctor Clinical Workspace',
    tagline: 'Daily consultation rosters, electronic health records & digital prescription generation.',
    image: erp4Img,
    accent: '#ff5500',
  },
  {
    id: 'staff',
    index: '05',
    title: 'Staff Operations & Receptionist Desk',
    tagline: 'Multi-staff role adaptation for nurses, receptionists, and pharmacy counters.',
    image: erp5Img,
    accent: '#ff7b00',
  },
];

/**
 * ERP Solutions Showcase Modal with erpbg.png background.
 * Uncropped full UI screenshots, auto-moving left-to-right & click interactive.
 */
export default function ErpShowcaseModal() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const autoPlayTimerRef = useRef(null);

  useEffect(() => {
    const handleOpen = (e) => {
      const detail = e?.detail;
      if (detail === 'erp-solutions' || detail?.serviceId === 'erp-solutions' || detail?.id === 'erp-solutions') {
        setCurrentIndex(0);
        setOpen(true);
      }
    };

    window.addEventListener('cyberhaxs:open-erp-showcase', handleOpen);
    return () => window.removeEventListener('cyberhaxs:open-erp-showcase', handleOpen);
  }, []);

  // Smooth scroll container to a specific index
  const scrollToIndex = useCallback((index) => {
    const total = ERP_SCREENS.length;
    const targetIdx = ((index % total) + total) % total;
    setCurrentIndex(targetIdx);

    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardEl = container.querySelector(`[data-card-index="${targetIdx}"]`);
      if (cardEl) {
        const containerWidth = container.offsetWidth;
        const cardWidth = cardEl.offsetWidth;
        const cardLeft = cardEl.offsetLeft;
        const scrollTarget = cardLeft - (containerWidth / 2) + (cardWidth / 2);

        container.scrollTo({
          left: Math.max(0, scrollTarget),
          behavior: 'smooth',
        });
      }
    }
  }, []);

  const handleNext = useCallback(() => {
    scrollToIndex(currentIndex + 1);
  }, [currentIndex, scrollToIndex]);

  const handlePrev = useCallback(() => {
    scrollToIndex(currentIndex - 1);
  }, [currentIndex, scrollToIndex]);

  // Automatic left-to-right movement cycle
  useEffect(() => {
    if (!open) return;

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 3200);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [open, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, handleNext, handlePrev]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (open) {
      document.body.setAttribute('data-scroll-locked', 'true');
    } else {
      document.body.removeAttribute('data-scroll-locked');
    }
    return () => document.body.removeAttribute('data-scroll-locked');
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-5 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Container with erpbg.png Background and Sleek Responsive Sizing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative z-10 w-full max-w-5xl max-h-[88vh] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-white/15 bg-slate-950 text-white shadow-[0_35px_120px_rgba(0,0,0,0.65)] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="erp-modal-title"
          >
            {/* Background Image: erpbg.png */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
              style={{ backgroundImage: `url(${erpbgImg})` }}
            />
            {/* Soft overlay for crystal-clear readability */}
            <div className="absolute inset-0 z-0 bg-slate-950/40 pointer-events-none" />

            {/* ---------------- Top Header Bar ---------------- */}
            <div className="relative z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-slate-900/80 px-6 py-3.5 backdrop-blur-md sm:px-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/20 text-[#ff5500] border border-orange-500/30 shadow-sm">
                  <Database className="h-5 w-5" />
                </span>
                <div className="flex items-center gap-2">
                  <span id="erp-modal-title" className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white">
                    ERP Systems & Business Automation
                  </span>
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-[0.65rem] font-bold text-emerald-400">
                    LIVE PLATFORM
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close ERP showcase"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* ---------------- Modal Body: Full Uncropped UI Showcase ---------------- */}
            <div className="relative z-10 p-4 sm:p-6 space-y-4 overflow-y-auto no-scrollbar">
              {/* Controls Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#ff5500] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    ERP UI Showcase
                  </span>
                </div>

                {/* Left / Right Interactive Arrow Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-sm transition-all duration-200 hover:bg-[#ff5500] hover:text-white hover:border-transparent hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Previous screen"
                    title="Previous screen"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-sm transition-all duration-200 hover:bg-[#ff5500] hover:text-white hover:border-transparent hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Next screen"
                    title="Next screen"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Moving Horizontal Track Container */}
              <div
                ref={scrollContainerRef}
                className="relative overflow-x-auto no-scrollbar scroll-smooth rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-3 sm:p-4 shadow-inner"
              >
                <div className="flex gap-4 sm:gap-6 w-max py-1">
                  {ERP_SCREENS.map((screen, idx) => {
                    const isSelected = currentIndex === idx;
                    return (
                      <div
                        key={screen.id}
                        data-card-index={idx}
                        onClick={() => scrollToIndex(idx)}
                        className={`group relative w-[280px] sm:w-[380px] md:w-[440px] shrink-0 overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer select-none bg-slate-900/90 shadow-xl ${
                          isSelected
                            ? 'border-[#ff5500] ring-2 ring-[#ff5500]/40 shadow-[0_12px_35px_rgba(255,85,0,0.3)] -translate-y-0.5'
                            : 'border-white/10 hover:border-white/30 hover:shadow-2xl hover:-translate-y-0.5'
                        }`}
                      >
                        {/* Browser Top Bar */}
                        <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-3.5 py-2">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                          </div>
                          <span className="font-mono text-[0.68rem] font-bold text-slate-400">
                            Screen {screen.index} of 05
                          </span>
                        </div>

                        {/* Full Screen Image (Uncropped & Fully Visible) */}
                        <div className="relative w-full overflow-hidden bg-slate-950/60 flex items-center justify-center p-1.5 sm:p-2">
                          <img
                            src={screen.image}
                            alt={screen.title}
                            className="w-full h-auto object-contain rounded-lg shadow-sm select-none max-h-[220px] sm:max-h-[260px]"
                            loading="eager"
                          />
                        </div>

                        {/* Card Bottom Meta */}
                        <div className="border-t border-white/10 bg-slate-950/90 p-3 sm:p-3.5">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className={`font-display text-xs sm:text-sm font-bold transition-colors ${
                              isSelected ? 'text-[#ff5500]' : 'text-white group-hover:text-[#ff5500]'
                            }`}>
                              {screen.title}
                            </h3>
                            <span className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[0.68rem] font-bold transition-colors ${
                              isSelected
                                ? 'bg-[#ff5500] text-white border-[#ff5500]'
                                : 'bg-white/10 text-slate-300 border-white/15'
                            }`}>
                              #{screen.index}
                            </span>
                          </div>
                          <p className="mt-1 text-[0.72rem] sm:text-xs text-slate-400 leading-relaxed line-clamp-2">
                            {screen.tagline}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Clickable Screen Number Navigation Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5">
                {ERP_SCREENS.map((s, idx) => {
                  const isSelected = currentIndex === idx;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => scrollToIndex(idx)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                        isSelected
                          ? 'bg-brand-gradient text-white shadow-md shadow-[#ff5500]/30 scale-105'
                          : 'border border-white/15 bg-white/10 text-slate-300 hover:text-white hover:bg-white/20'
                      }`}
                    >
                      <span className="font-mono">{s.index}</span>
                      <span className="font-sans font-medium">{s.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ---------------- Bottom Modal Footer ---------------- */}
            <div className="relative z-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4 border-t border-white/10 bg-slate-900/80 px-4 sm:px-8 py-3 backdrop-blur-md">
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium text-xs leading-tight">Enterprise Hospital Management System · HIPAA &amp; DPDP Compliant Architecture</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-full bg-brand-gradient px-5 py-2 text-xs font-bold text-white shadow-md shadow-[#ff5500]/25 hover:shadow-lg hover:shadow-[#ff7b00]/40 active:scale-95 transition-all cursor-pointer w-full sm:w-auto text-center"
              >
                Request ERP Deployment
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

