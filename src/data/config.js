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

export const siteConfig = {
  name: 'CyberHaxs',
  tagline: 'Engineering digital experiences that move businesses forward.',

  /** PLACEHOLDER — replace with your real deployed domain. */
  siteUrl: 'https://cyberhaxs.com',

  /**
   * Backend endpoint the contact form POSTs to.
   * null  → no backend configured yet; the form will NOT fake a submission and
   *         will surface an honest error state instead.
   * e.g.  → '/api/contact' or 'https://formspree.io/f/xxxx'
   */
  contactEndpoint: null,

  /**
   * Business email for inquiries and fallbacks.
   */
  contactEmail: 'info@cyberhaxs.com',

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
