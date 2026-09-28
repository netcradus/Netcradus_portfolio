import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { siteConfig } from '../../data/config';
import { useScrollLock, useEscapeKey, useMediaQuery } from '../../hooks';

const NAV = siteConfig.navigation;
const SECTIONS = NAV.map((n) => n.id);

/**
 * Floating sticky navbar.
 * - Transparent at the top of the page, blurred surface once scrolled.
 * - Hides on scroll-down / reveals on scroll-up.
 * - Highlights the section currently in view.
 * - Full-screen animated menu on mobile.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useScrollLock(open);
  useEscapeKey(open, () => setOpen(false));

  /* --- scroll state ------------------------------------------------- */
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);

        // Hide only when scrolling down past the hero, on desktop.
        if (y > 320 && y > lastY + 6 && !open) setHidden(true);
        else if (y < lastY - 6 || y < 320) setHidden(false);

        lastY = y;
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  /* --- active section tracking -------------------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  /** False since hero background is now light/white */
  const overDark = false;

  const goTo = (e, href) => {
    closeMenu();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const top = el.getBoundingClientRect().top + window.scrollY - (id === 'home' ? 0 : 76);
    window.scrollTo({
      top: Math.max(top, 0),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
    history.replaceState(null, '', href);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
        initial={false}
        animate={{
          y: hidden && isDesktop && !open ? -120 : 0,
          opacity: hidden && isDesktop && !open ? 0 : 1,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          aria-label="Main"
          className={`container-page mx-auto flex h-16 max-w-[86rem] items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-6 ${
            scrolled && !open
              ? 'border border-ink/8 bg-white/85 shadow-[0_14px_40px_-24px_rgba(10,16,46,0.45)] backdrop-blur-xl'
              : 'border border-transparent bg-transparent'
          }`}
        >
          <a
            href="#home"
            onClick={(e) => goTo(e, '#home')}
            className="flex items-center"
            aria-label="CyberHaxs — home"
          >
            <Logo theme={overDark ? 'dark' : 'light'} />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => goTo(e, item.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative inline-flex items-center rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors duration-300 ${
                      isActive
                        ? overDark
                          ? 'text-cyan-300'
                          : 'text-royal-600'
                        : overDark
                          ? 'text-white/70 hover:text-white'
                          : 'text-ink/70 hover:text-ink'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 rounded-full transition-transform duration-300 ${
                        overDark ? 'bg-white/12' : 'bg-royal-50'
                      } ${
                        isActive
                          ? 'scale-100 opacity-100'
                          : 'scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden lg:inline-flex">
              <Button
                href="#contact"
                withArrow
                variant={overDark ? 'outlineDark' : 'primary'}
                className="!px-6 !py-2.5 text-sm"
              >
                Start a Project
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`relative z-[60] inline-flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur transition-colors lg:hidden ${
                overDark
                  ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                  : 'border-ink/10 bg-white/70 text-ink hover:bg-white'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="flex"
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={open} onClose={closeMenu} goTo={goTo} active={active} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  FULL-SCREEN MOBILE MENU                                                   */
/* -------------------------------------------------------------------------- */

function MobileMenu({ open, onClose, goTo, active }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-[55] flex flex-col bg-navy-900 lg:hidden"
          initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 3rem)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" />
          <div
            className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full opacity-50 blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(255,123,0,0.6), transparent 65%)' }}
          />

          <div className="relative flex h-16 items-center justify-between px-5">
            <Logo theme="dark" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="relative flex flex-1 flex-col justify-center overflow-y-auto px-5 pb-10" aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 + i * 0.055, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => goTo(e, item.href)}
                    className={`group flex items-center justify-between border-b border-white/8 py-4 font-display text-[clamp(1.9rem,9vw,3rem)] font-bold leading-none tracking-[-0.03em] transition-colors ${
                      active === item.id ? 'text-cyan-300' : 'text-white hover:text-violet-400'
                    }`}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-sans text-xs font-medium tabular-nums text-white/35">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </span>
                    <ArrowUpRight
                      className="h-6 w-6 shrink-0 -translate-x-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8"
            >
              <Button
                href="#contact"
                withArrow
                onClick={onClose}
                wrapperClassName="block w-full"
                className="w-full"
              >
                Start a Project
              </Button>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
