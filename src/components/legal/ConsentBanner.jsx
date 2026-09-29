import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Settings, Check, X } from 'lucide-react';
import { EASE } from '../../lib/animation';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cyberhaxs_dpdp_consent');
    if (!saved) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cyberhaxs_dpdp_consent', 'all');
    localStorage.setItem('cyberhaxs_analytics_consent', 'true');
    setVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('cyberhaxs_dpdp_consent', 'essential');
    localStorage.setItem('cyberhaxs_analytics_consent', 'false');
    setVisible(false);
  };

  const openSettings = () => {
    window.dispatchEvent(new CustomEvent('cyberhaxs:open-dpdp', { detail: { tab: 'cookies' } }));
  };

  const openDPDPNotice = () => {
    window.dispatchEvent(new CustomEvent('cyberhaxs:open-dpdp', { detail: { tab: 'guidelines' } }));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          role="region"
          aria-label="Privacy & DPDP Consent Notice"
          className="fixed bottom-4 inset-x-3 sm:inset-x-6 z-[65] max-w-4xl mx-auto rounded-2xl border border-white/20 bg-navy-900/95 text-white p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-500/20 text-[#ff5500] shrink-0 mt-0.5">
                <Shield className="h-5 w-5" />
              </span>
              <div className="space-y-1 text-xs sm:text-sm text-white/80 leading-relaxed">
                <p className="font-bold text-white flex items-center gap-2">
                  <span>Digital Personal Data Protection (DPDP) Notice</span>
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[0.62rem] font-semibold text-cyan-300 font-mono">
                    DPDP Act 2023
                  </span>
                </p>
                <p>
                  We process data strictly in accordance with lawful grounds, purpose limitations, and security safeguards.
                  Choose your preferences or review our{' '}
                  <button
                    type="button"
                    onClick={openDPDPNotice}
                    className="underline text-cyan-300 hover:text-white font-medium transition-colors"
                  >
                    DPDP Privacy Center
                  </button>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-end md:self-center">
              <button
                type="button"
                onClick={openSettings}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Settings className="h-3.5 w-3.5" />
                Preferences
              </button>

              <button
                type="button"
                onClick={acceptEssential}
                className="rounded-full border border-white/25 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15 transition-colors"
              >
                Essential Only
              </button>

              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2 text-xs font-bold text-white shadow-md hover:scale-[1.02] transition-transform"
              >
                <Check className="h-3.5 w-3.5" />
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
