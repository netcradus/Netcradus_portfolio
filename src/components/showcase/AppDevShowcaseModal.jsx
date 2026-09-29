import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  X,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  Code2,
  CheckCircle2,
  Maximize2,
  RotateCcw,
} from 'lucide-react';
import { EASE } from '../../lib/animation';

// App UI Screenshots
import ap1Img from '../../assets/ap1.png';
import ap2Img from '../../assets/ap2.png';
import ap3Img from '../../assets/ap3.png';
import ap4Img from '../../assets/ap4.png';
import ap5Img from '../../assets/ap5.png';

const APP_SCREENS = [
  {
    id: 'home',
    title: 'Home & Categories',
    tagline: 'Farm-fresh dairy essentials delivery catalog',
    image: ap1Img,
    badge: 'Screen 01',
    accent: '#ff5500',
    // 3D placement parameters with non-overlapping arc
    initialPos: { x: -310, y: 20, z: 20, rotate: -6, scale: 0.95 },
    floatAnim: { y: [0, -18, 0], rotate: [-6, -4, -6], duration: 5.4, delay: 0 },
  },
  {
    id: 'shop',
    title: 'Shop & Promotional Hub',
    tagline: 'Interactive promotional banners and product collections',
    image: ap2Img,
    badge: 'Screen 02',
    accent: '#ff7b00',
    initialPos: { x: -155, y: -90, z: -20, rotate: 3, scale: 0.90 },
    floatAnim: { y: [0, 16, 0], rotate: [3, 5, 3], duration: 6.2, delay: 0.6 },
  },
  {
    id: 'products',
    title: 'Product Catalog & Quick Add',
    tagline: 'Instant cart management with fresh dairy stock updates',
    image: ap5Img,
    badge: 'Screen 05',
    accent: '#ff5500',
    initialPos: { x: 0, y: 60, z: 60, rotate: 0, scale: 1.05 },
    floatAnim: { y: [0, -16, 0], rotate: [0, 2, 0], duration: 5.0, delay: 2.2 },
  },
  {
    id: 'orders',
    title: 'Live Orders & Tracking',
    tagline: 'Real-time order statuses, delivery tracking & subscription history',
    image: ap3Img,
    badge: 'Screen 03',
    accent: '#ffaa2b',
    initialPos: { x: 155, y: -90, z: 30, rotate: -4, scale: 0.96 },
    floatAnim: { y: [0, -22, 0], rotate: [-4, -2, -4], duration: 5.8, delay: 1.1 },
  },
  {
    id: 'profile',
    title: 'Profile & Subscriptions',
    tagline: 'Account management, daily recurring deliveries & notification hubs',
    image: ap4Img,
    badge: 'Screen 04',
    accent: '#ff7b00',
    initialPos: { x: 310, y: 20, z: -10, rotate: 6, scale: 0.90 },
    floatAnim: { y: [0, 20, 0], rotate: [6, 8, 6], duration: 6.6, delay: 1.7 },
  },
];

export default function AppDevShowcaseModal() {
  const [open, setOpen] = useState(false);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [viewMode, setViewMode] = useState('3d-floating'); // '3d-floating' | 'focused'

  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const rotateX = useTransform(springY, [-300, 300], [8, -8]);
  const rotateY = useTransform(springX, [-400, 400], [-10, 10]);

  useEffect(() => {
    const handleOpen = (e) => {
      const detail = e?.detail;
      if (detail === 'app-development' || detail?.serviceId === 'app-development') {
        setActiveScreenIndex(0);
        setViewMode('3d-floating');
        setOpen(true);
      }
    };
    window.addEventListener('cyberhaxs:open-app-showcase', handleOpen);
    return () => window.removeEventListener('cyberhaxs:open-app-showcase', handleOpen);
  }, []);

  const close = () => {
    setOpen(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setActiveScreenIndex((prev) => (prev + 1) % APP_SCREENS.length);
      if (e.key === 'ArrowLeft') setActiveScreenIndex((prev) => (prev - 1 + APP_SCREENS.length) % APP_SCREENS.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const currentScreen = APP_SCREENS[activeScreenIndex];

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

          {/* Modal Container: White Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.4, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="app-showcase-title"
            className="relative z-10 flex flex-col w-full max-w-7xl h-[92vh] max-h-[940px] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-black/12 bg-white text-slate-900 shadow-[0_35px_120px_rgba(0,0,0,0.35)]"
          >
            {/* Top Navigation Header */}
            <div className="shrink-0 flex items-center justify-between border-b border-black/10 bg-white/95 px-6 sm:px-10 py-4 sm:py-5 backdrop-blur-md">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#ff5500] border border-orange-200">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h2 id="app-showcase-title" className="font-display text-base sm:text-lg font-bold text-slate-900 tracking-wide">
                    APP DEVELOPMENT SHOWCASE
                  </h2>
                  <p className="text-xs text-slate-500 font-mono">
                    Consumer Mobility, Subscription E-Commerce & Fluid 60FPS UI
                  </p>
                </div>
              </div>

              {/* Header Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* View Mode Switcher */}
                <div className="hidden sm:flex items-center rounded-full border border-black/10 bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode('3d-floating')}
                    className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === '3d-floating'
                        ? 'bg-brand-gradient text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    3D Floating View
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('focused')}
                    className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === 'focused'
                        ? 'bg-brand-gradient text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Interactive Focus
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

            {/* Main Interactive Stage */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative flex-1 min-h-0 overflow-hidden flex items-center justify-center p-4 sm:p-8 select-none bg-gradient-to-b from-slate-50/80 via-white to-slate-100/70"
            >
              {/* Subtle Ambient Radial Glows */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full opacity-10 blur-[130px]"
                style={{ background: 'radial-gradient(circle, #ff5500, transparent 65%)' }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full opacity-10 blur-[130px]"
                style={{ background: 'radial-gradient(circle, #ffaa2b, transparent 65%)' }}
              />

              {viewMode === '3d-floating' ? (
                /* ---------------- 3D FLOATING PERSPECTIVE STAGE ---------------- */
                <motion.div
                  style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                  className="relative w-full h-full max-w-5xl max-h-[640px] flex items-center justify-center"
                >
                  {APP_SCREENS.map((screen, idx) => {
                    const isSelected = idx === activeScreenIndex;
                    return (
                      <motion.div
                        key={screen.id}
                        initial={screen.initialPos}
                        animate={{
                          x: screen.initialPos.x,
                          y: [
                            screen.initialPos.y,
                            screen.initialPos.y + screen.floatAnim.y[1],
                            screen.initialPos.y,
                          ],
                          rotate: screen.floatAnim.rotate,
                          scale: isSelected ? screen.initialPos.scale * 1.06 : screen.initialPos.scale,
                        }}
                        transition={{
                          y: {
                            duration: screen.floatAnim.duration,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: screen.floatAnim.delay,
                          },
                          rotate: {
                            duration: screen.floatAnim.duration * 1.2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: screen.floatAnim.delay,
                          },
                          scale: { duration: 0.35, ease: EASE },
                        }}
                        whileHover={{ scale: screen.initialPos.scale * 1.10, zIndex: 50 }}
                        onClick={() => {
                          setActiveScreenIndex(idx);
                          setViewMode('focused');
                        }}
                        className="absolute cursor-pointer group"
                        style={{
                          transformStyle: 'preserve-3d',
                          zIndex: isSelected ? 40 : 20 + idx,
                        }}
                      >
                        {/* Sleek Mobile Phone Mockup Frame - Perfectly Form-Fitting */}
                        <div className="relative w-[185px] sm:w-[215px] md:w-[230px] rounded-[2.4rem] p-2 bg-[#0c101d] border-[3px] border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.28)] group-hover:border-[#ff5500] group-hover:shadow-[0_30px_80px_-10px_rgba(255,85,0,0.35)] transition-all duration-300">
                          {/* Inner Screen with matching 375/665 aspect ratio so no content is cut */}
                          <div className="relative overflow-hidden rounded-[2rem] bg-white aspect-[375/665] w-full">
                            <img
                              src={screen.image}
                              alt={screen.title}
                              className="w-full h-full object-fill select-none group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Hover Overlay Badge */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                              <span className="text-[0.65rem] font-mono font-bold uppercase tracking-wider text-orange-400">
                                {screen.badge}
                              </span>
                              <p className="text-xs font-bold text-white leading-tight">
                                {screen.title}
                              </p>
                              <span className="mt-1 text-[0.68rem] text-white/80 flex items-center gap-1 font-semibold">
                                <span>Inspect Screen</span>
                                <ArrowUpRight className="h-3 w-3 text-orange-400" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                /* ---------------- FOCUSED SCREEN INSPECTION MODE ---------------- */
                <motion.div
                  key="focused-mode"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="w-full max-w-5xl grid lg:grid-cols-[1fr_1.1fr] gap-8 items-center"
                >
                  {/* Left: Interactive Phone Viewer */}
                  <div className="flex flex-col items-center justify-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative w-[250px] sm:w-[280px] rounded-[2.6rem] p-2.5 bg-[#0c101d] border-[3px] border-[#ff5500]/60 shadow-[0_30px_90px_rgba(255,85,0,0.25)]"
                    >
                      <div className="relative overflow-hidden rounded-[2.2rem] bg-white aspect-[375/665] w-full">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentScreen.id}
                            src={currentScreen.image}
                            alt={currentScreen.title}
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="w-full h-full object-fill select-none"
                          />
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* Thumbnail Switcher */}
                    <div className="flex items-center gap-2.5 mt-6">
                      {APP_SCREENS.map((s, idx) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setActiveScreenIndex(idx)}
                          aria-label={`View ${s.title}`}
                          className={`h-12 w-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            idx === activeScreenIndex
                              ? 'border-[#ff5500] scale-110 shadow-md ring-2 ring-[#ff5500]/40'
                              : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400'
                          }`}
                        >
                          <img src={s.image} alt="" className="w-full h-full object-cover object-top" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right: Screen Specs & Architecture */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold tracking-widest text-[#ff5500]">
                          {currentScreen.badge} / 05
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                          Flutter & React Native Architecture
                        </span>
                      </div>

                      <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-slate-900">
                        {currentScreen.title}
                      </h3>

                      <p className="text-base sm:text-lg font-bold text-[#ff5500]">
                        {currentScreen.tagline}
                      </p>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        Engineered with fluid micro-animations, offline-first data caching, and sub-50ms query speeds.
                        Features comprehensive customer profile sync, push notifications, and payment gateways.
                      </p>
                    </div>

                    {/* Architecture Metrics */}
                    <div className="grid grid-cols-3 gap-3 border-y border-black/10 py-4">
                      <div className="space-y-1">
                        <span className="block font-display text-lg sm:text-xl font-bold text-slate-900">60 FPS</span>
                        <span className="block text-[0.68rem] uppercase tracking-wider text-slate-500 font-medium">Fluid UI</span>
                      </div>
                      <div className="space-y-1">
                        <span className="block font-display text-lg sm:text-xl font-bold text-slate-900">Offline</span>
                        <span className="block text-[0.68rem] uppercase tracking-wider text-slate-500 font-medium">Local Cache</span>
                      </div>
                      <div className="space-y-1">
                        <span className="block font-display text-lg sm:text-xl font-bold text-slate-900">iOS & Android</span>
                        <span className="block text-[0.68rem] uppercase tracking-wider text-slate-500 font-medium">Unified Code</span>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setViewMode('3d-floating')}
                        className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>Return to 3D Floating Stage</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          close();
                          setTimeout(() => {
                            window.dispatchEvent(new CustomEvent('cyberhaxs:select-service', { detail: 'app-development' }));
                            const el = document.getElementById('contact');
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }, 200);
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3 text-sm font-bold text-white shadow-lg hover:scale-105 transition-transform cursor-pointer"
                      >
                        <span>Build Similar Mobile App</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom Footer Navigation Bar */}
            <div className="shrink-0 flex items-center justify-between border-t border-black/10 bg-white/95 px-6 sm:px-10 py-4 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[#ff5500] font-bold">5 Interactive App Screens</span>
                <span className="hidden sm:inline text-slate-300">·</span>
                <span className="hidden sm:inline">Move cursor for 3D parallax & continuous motion</span>
              </div>
              <button
                type="button"
                onClick={close}
                className="font-bold text-[#ff5500] hover:text-[#ff7b00] transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
