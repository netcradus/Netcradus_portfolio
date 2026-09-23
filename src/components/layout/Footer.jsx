import { ArrowUpRight } from 'lucide-react';
import Logo from '../ui/Logo';
import { siteConfig } from '../../data/config';
import { services } from '../../data/site';
import Reveal from '../ui/Reveal';

const COMPANY_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = siteConfig.socials.filter((s) => s.url);

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-30" />
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(255,85,0,0.65), transparent 62%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-0 h-[30rem] w-[30rem] rounded-full opacity-35 blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(255,123,0,0.6), transparent 62%)' }}
      />

      <div className="container-page relative pb-10 pt-20 sm:pt-28">
        {/* ---------------- Wordmark ---------------- */}
        <Reveal>
          <a
            href="#home"
            className="group block"
            aria-label="CyberHaxs — back to top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span
              className="block font-display text-[clamp(4rem,17vw,15rem)] font-bold leading-[0.82] tracking-[-0.05em] text-white"
              aria-hidden="true"
            >
              <span className="block transition-colors duration-500 group-hover:text-white/85">
                CYBER
              </span>
              <span className="text-gradient-dark block">HAXS</span>
            </span>
            <span className="sr-only">CyberHaxs</span>
          </a>
        </Reveal>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
          {siteConfig.tagline}
        </p>

        {/* ---------------- Link grid ---------------- */}
        <div className="mt-16 grid grid-cols-2 gap-y-12 border-t border-white/10 pt-12 sm:mt-20 md:grid-cols-4">
          <FooterCol title="Services">
            {services.map((s) => (
              <FooterLink key={s.id} href="#services">
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
            {socials.length > 0 ? (
              socials.map((s) => (
                <FooterLink key={s.id} href={s.url} external>
                  {s.label}
                </FooterLink>
              ))
            ) : (
              <li>
                <span className="text-sm text-white/40">
                  Placeholder — add real profile URLs in{' '}
                  <code className="rounded bg-white/10 px-1.5 py-0.5 text-[0.8em]">src/data/config.js</code>
                </span>
              </li>
            )}
          </FooterCol>

          <FooterCol title="Get in touch">
            <li>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_16px_36px_-16px_rgba(255,85,0,0.85)]"
              >
                Start a Project
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </li>
            <li className="pt-1">
              <span className="text-xs uppercase tracking-[0.18em] text-white/35">
                Placeholder contact details
              </span>
            </li>
          </FooterCol>
        </div>

        {/* ---------------- Bottom bar ---------------- */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/45">
            © {year} CyberHaxs. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/45">
            <a
              href={siteConfig.legal.privacy ?? '#'}
              className="transition-colors hover:text-white"
              aria-disabled={siteConfig.legal.privacy ? undefined : true}
            >
              Privacy Policy{siteConfig.legal.privacy ? '' : ' *'}
            </a>
            <a
              href={siteConfig.legal.terms ?? '#'}
              className="transition-colors hover:text-white"
              aria-disabled={siteConfig.legal.terms ? undefined : true}
            >
              Terms{siteConfig.legal.terms ? '' : ' *'}
            </a>
            <span className="text-white/25">* placeholder links</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/40">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, external = false }) {
  if (!href) return <li className="text-sm text-white/40">{children}</li>;
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        className="group inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors duration-200 hover:text-white"
      >
        {children}
        {external && (
          <ArrowUpRight
            className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:opacity-100"
            aria-hidden="true"
          />
        )}
      </a>
    </li>
  );
}
