import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { PreloaderGate } from './components/layout/Preloader';
import Home from './pages/Home';

/**
 * CyberHaxs — root application shell.
 * Kept intentionally thin: preloader → nav → page → footer.
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
    </PreloaderGate>
  );
}
