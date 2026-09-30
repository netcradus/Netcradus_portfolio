import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { PreloaderGate } from './components/layout/Preloader';
import Home from './pages/Home';
import DPDPPrivacyModal from './components/legal/DPDPPrivacyModal';
import ConsentBanner from './components/legal/ConsentBanner';
import WebDevShowcaseModal from './components/showcase/WebDevShowcaseModal';
import AppDevShowcaseModal from './components/showcase/AppDevShowcaseModal';
import CrmShowcaseModal from './components/showcase/CrmShowcaseModal';
import ErpShowcaseModal from './components/showcase/ErpShowcaseModal';

/**
 * CyberHaxs — root application shell.
 * Kept intentionally thin: preloader → nav → page → footer → modals/banners.
 */
export default function App() {
  return (
    <PreloaderGate>
      <a
        href="#main-content"
        className="sr-only rounded-full bg-navy-900 px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70]"
      >
        Skip to main content
      </a>

      <Navbar />

      <Home />

      <Footer />

      <WebDevShowcaseModal />
      <AppDevShowcaseModal />
      <CrmShowcaseModal />
      <ErpShowcaseModal />
      <DPDPPrivacyModal />
      <ConsentBanner />
    </PreloaderGate>
  );
}

