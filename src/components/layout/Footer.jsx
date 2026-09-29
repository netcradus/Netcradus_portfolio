import { ArrowUpRight, Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';
import Logo from '../ui/Logo';
import { siteConfig } from '../../data/config';
import { services } from '../../data/site';
import Reveal from '../ui/Reveal';
import logo1Img from '../../assets/logo1.png';
import lastBgImg from '../../assets/last.png';

const COMPANY_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { id: 'instagram', label: 'Instagram', icon: Instagram, href: 'https://instagram.com/cyberhaxs' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/cyberhaxs' },
  { id: 'facebook', label: 'Facebook', icon: Facebook, href: 'https://facebook.com/cyberhaxs' },
  { id: 'twitter', label: 'Twitter', icon: Twitter, href: 'https://twitter.com/cyberhaxs' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-white text-black">
      {/* ---------------- Background Image (Clean without black shadows) ---------------- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src={lastBgImg}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="container-page relative z-10 pb-10 pt-16 sm:pt-24">
        {/* ---------------- Logo ---------------- */}
        <Reveal>
          <a
            href="#home"
            className="group inline-block"
            aria-label="CyberHaxs — back to top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img
              src={logo1Img}
              alt="CyberHaxs"
              className="h-12 sm:h-16 md:h-20 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        </Reveal>

        <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-black/80">
          {siteConfig.tagline}
        </p>

        {/* ---------------- Link grid ---------------- */}
        <div className="mt-16 grid grid-cols-2 gap-y-12 border-t border-black/15 pt-12 sm:mt-20 md:grid-cols-4">
          <FooterCol title="Services">
            {services.map((s) => (
              <FooterLink
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  if (s.id === 'web-development') {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('cyberhaxs:open-web-showcase', { detail: 'web-development' }));
                  } else if (s.id === 'app-development') {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('cyberhaxs:open-app-showcase', { detail: 'app-development' }));
                  } else if (s.id === 'crm-solutions') {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('cyberhaxs:open-crm-showcase', { detail: 'crm-solutions' }));
                  }
                }}
              >
                {s.shortLabel}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Company">
            {COMPANY_LINKS.map((l) => (
              <FooterLink key={l.label} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Social">
            {SOCIAL_LINKS.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-3 text-sm font-medium text-black/85 transition-all duration-200 hover:text-[#ff5500]"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-black/15 bg-black/[0.04] text-black/75 transition-all duration-200 group-hover:border-[#ff5500]/50 group-hover:bg-[#ff5500]/15 group-hover:text-[#ff5500] group-hover:shadow-[0_0_12px_rgba(255,85,0,0.35)]">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span>{s.label}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-[#ff5500] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </FooterCol>

          <FooterCol title="Get in touch">
            <li>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(255,85,0,0.7)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_16px_36px_-12px_rgba(255,85,0,0.9)]"
              >
                Start a Project
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </li>
            <li className="pt-1">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-black/60">
                Placeholder contact details
              </span>
            </li>
          </FooterCol>
        </div>

        {/* ---------------- Bottom bar ---------------- */}
        <div className="mt-14 flex flex-col gap-6 border-t border-black/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-black/75">
            © {year} CyberHaxs. All rights reserved.
          </p>

          {/* Social icons strip */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-black/[0.04] text-black/75 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:border-[#ff5500] hover:bg-gradient-to-tr hover:from-[#ff5500] hover:to-[#ff7b00] hover:text-white hover:shadow-[0_0_20px_rgba(255,85,0,0.5)]"
                >
                  <Icon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-black/80">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('cyberhaxs:open-dpdp', { detail: { tab: 'guidelines' } }))}
              className="transition-colors hover:text-[#ff5500] cursor-pointer"
            >
              Privacy Policy & DPDP Notice
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('cyberhaxs:open-dpdp', { detail: { tab: 'rights' } }))}
              className="transition-colors hover:text-[#ff5500] cursor-pointer"
            >
              Data Subject Rights
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('cyberhaxs:open-dpdp', { detail: { tab: 'contact' } }))}
              className="transition-colors hover:text-[#ff5500] cursor-pointer"
            >
              Grievance Redressal
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('cyberhaxs:open-dpdp', { detail: { tab: 'cookies' } }))}
              className="transition-colors hover:text-[#ff5500] cursor-pointer"
            >
              Consent Preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-black/70">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, external = false, onClick }) {
  if (!href) return <li className="text-sm font-medium text-black/60">{children}</li>;
  return (
    <li>
      <a
        href={href}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-black/80 transition-colors duration-200 hover:text-[#ff5500] cursor-pointer"
      >
        {children}
        {external && (
          <ArrowUpRight
            className="h-3.5 w-3.5 text-[#ff5500] opacity-0 transition-all duration-200 group-hover:opacity-100"
            aria-hidden="true"
          />
        )}
      </a>
    </li>
  );
}
