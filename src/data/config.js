/**
 * ---------------------------------------------------------------------------
 * CYBERHAXS — SITE CONFIGURATION  (safe to edit / replace)
 * ---------------------------------------------------------------------------
 * RULE: nothing in this file is a real CyberHaxs fact. Every value below is a
 * clearly marked PLACEHOLDER awaiting real company information.
 *
 * Replace:
 *   - contactEndpoint  → your form API (e.g. "/api/contact" or a form service)
 *   - contactEmail     → your real business email (shown as fallback)
 *   - social URLs      → your real LinkedIn / Instagram / GitHub profiles
 *   - siteUrl          → your real domain (drives Open Graph / canonical links)
 * ---------------------------------------------------------------------------
 */

const rawSiteUrl = (import.meta.env.VITE_SITE_URL || '').trim();
const isLocalhost = rawSiteUrl.startsWith('http://localhost') || rawSiteUrl.startsWith('http://127.0.0.1');

export const siteConfig = {
  name: 'CyberHaxs',
  tagline: 'Engineering digital experiences that move businesses forward.',

  /**
   * Base site URL configured via VITE_SITE_URL.
   * In development: defaults to http://localhost:5173.
   * In production: uses configured deployed URL; never leaks localhost into production.
   */
  siteUrl: import.meta.env.DEV
    ? (rawSiteUrl || 'http://localhost:5173')
    : (isLocalhost ? '' : rawSiteUrl),

  /**
   * Backend endpoint the contact form POSTs to.
   * Configured via VITE_CONTACT_ENDPOINT when available; otherwise null to surface honest error state.
   */
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || null,

  /**
   * Business email for inquiries and fallbacks configured via VITE_CONTACT_EMAIL.
   */
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL?.trim() || 'info@cyberhaxs.com',

  /** PLACEHOLDER — replace with real profiles. null hides the link. */
  socials: [
    { id: 'linkedin', label: 'LinkedIn', url: null },
    { id: 'instagram', label: 'Instagram', url: null },
    { id: 'github', label: 'GitHub', url: null },
  ],

  /** Legal routes — build pages or point at real URLs later. */
  legal: {
    privacy: null,
    terms: null,
  },

  navigation: [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'solutions', label: 'Solutions', href: '#solutions' },
    { id: 'work', label: 'Work', href: '#work' },
    { id: 'process', label: 'Process', href: '#process' },
    { id: 'security-services', label: 'Security Services', href: '#security-services' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ],
};

export default siteConfig;
