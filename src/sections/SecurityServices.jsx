import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Target,
  KeyRound,
  Network,
  Cloud,
  Cpu,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  Activity,
  Zap,
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { securityServices } from '../data/site';
import securityPlatformImg from '../assets/security-platform.jpg';
import { EASE } from '../lib/animation';

const ICON_MAP = {
  ShieldAlert,
  Target,
  KeyRound,
  Network,
  Cloud,
  Cpu,
  Building2,
  ShieldCheck,
};

export default function SecurityServices() {
  const [activeId, setActiveId] = useState('cybersecurity');
  const activeService = securityServices.find((s) => s.id === activeId) || securityServices[0];

  const leftServices = securityServices.filter((s) => s.side === 'left');
  const rightServices = securityServices.filter((s) => s.side === 'right');

  return (
    <section
      id="security-services"
      className="relative isolate overflow-hidden bg-[#060913] py-20 sm:py-28 lg:py-36 text-white"
      aria-labelledby="security-services-title"
    >
      {/* ---------- Ambient background glows & grid ---------- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -left-48 top-1/4 h-[36rem] w-[36rem] rounded-full opacity-20 blur-[140px]"
          style={{ background: 'radial-gradient(circle, #ff5500 0%, transparent 70%)' }}
        />
        <div
          className="absolute -right-48 top-1/3 h-[40rem] w-[40rem] rounded-full opacity-25 blur-[150px]"
          style={{ background: 'radial-gradient(circle, #00d2ff 0%, #0055ff 60%, transparent 70%)' }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[50rem] w-[50rem] rounded-full opacity-10 blur-[170px]"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
        />

        {/* Digital Matrix Grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Edge Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060913] via-transparent to-[#060913]" />
      </div>

      <div className="container-page relative z-10">
        {/* ---------- Heading ---------- */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="security-services-title"
            eyebrow="Security Architecture & Defense"
            lines={[
              { text: 'ENTERPRISE', accent: false },
              { text: 'SECURITY SERVICES', accent: true },
            ]}
            description="Comprehensive cyber resilience architectures, 24×7 SOC operations, and AI-era security protocols engineered to defend your entire digital ecosystem."
            theme="dark"
            className="max-w-3xl [&_.eyebrow]:text-cyan-400"
          />

          <Reveal delay={0.2} className="flex-none">
            <Button
              href="#contact"
              withArrow
              variant="primary"
              className="!px-7 !py-3.5 shadow-[0_0_30px_rgba(255,85,0,0.35)]"
            >
              Request Security Audit
            </Button>
          </Reveal>
        </div>

        {/* ---------- Futuristic Diagram Layout (Left Nodes | Center 3D Board | Right Nodes) ---------- */}
        <div className="mt-14 sm:mt-20">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1.4fr_1.1fr] xl:gap-10">
            
            {/* Left Column (4 Services) */}
            <div className="flex flex-col gap-5 sm:gap-6">
              {leftServices.map((service, index) => {
                const isSelected = activeId === service.id;
                const isOrange = service.accent === 'orange';
                const IconComponent = ICON_MAP[service.icon] ?? ShieldAlert;

                return (
                  <Reveal key={service.id} delay={0.1 + index * 0.08}>
                    <button
                      type="button"
                      onClick={() => setActiveId(service.id)}
                      onMouseEnter={() => setActiveId(service.id)}
                      className={`group relative flex w-full items-start gap-4 rounded-2xl border p-4 sm:p-5 text-left transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? isOrange
                            ? 'border-[#ff5500]/70 bg-gradient-to-r from-[#ff5500]/15 to-transparent shadow-[0_0_25px_rgba(255,85,0,0.22)]'
                            : 'border-cyan-400/70 bg-gradient-to-r from-cyan-500/15 to-transparent shadow-[0_0_25px_rgba(6,182,212,0.22)]'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                      }`}
                    >
                      {/* Hexagonal Cyber Icon Badge */}
                      <div className="relative flex-none">
                        <div
                          className={`relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                            isOrange
                              ? 'border-2 border-[#ff5500]/50 bg-gradient-to-br from-[#ff5500]/30 via-black/80 to-black text-[#ff8843] shadow-[0_0_18px_rgba(255,85,0,0.35)] group-hover:border-[#ff5500]'
                              : 'border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-500/30 via-black/80 to-black text-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.35)] group-hover:border-cyan-400'
                          }`}
                        >
                          <IconComponent className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                        </div>

                        {/* Connector line dot on desktop */}
                        <span
                          className={`hidden lg:block absolute -right-3.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full transition-all duration-300 ${
                            isSelected
                              ? isOrange
                                ? 'bg-[#ff5500] shadow-[0_0_12px_#ff5500]'
                                : 'bg-cyan-400 shadow-[0_0_12px_#22d3ee]'
                              : 'bg-white/20'
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3
                            className={`font-display text-base sm:text-lg font-bold tracking-tight transition-colors ${
                              isSelected
                                ? isOrange
                                  ? 'text-[#ffaa75]'
                                  : 'text-cyan-300'
                                : 'text-white group-hover:text-cyan-200'
                            }`}
                          >
                            {service.title}
                          </h3>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm leading-relaxed text-white/70">
                          {service.description}
                        </p>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>

            {/* Center Column: 3D Isometric Cyber Platform Core */}
            <Reveal delay={0.2} className="relative flex flex-col items-center justify-center">
              <div className="relative w-full overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0e1628]/95 via-[#090e1c]/95 to-[#060a14] p-4 sm:p-6 shadow-[0_0_60px_rgba(6,182,212,0.18)] backdrop-blur-2xl">
                
                {/* Header Status in HUD */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500" />
                    </span>
                    <span className="font-mono text-xs font-semibold tracking-wider text-cyan-400">
                      DEFENSE MATRIX // ACTIVE
                    </span>
                  </div>
                  <span className="font-mono text-[0.68rem] text-emerald-400 flex items-center gap-1">
                    <Zap className="h-3 w-3" /> ZERO-TRUST
                  </span>
                </div>

                {/* 3D Platform Image with Glowing Overlays */}
                <div className="relative my-4 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-cyan-500/20 bg-black/60">
                  <img
                    src={securityPlatformImg}
                    alt="Cyber Security Architecture Platform"
                    className="h-full w-full object-cover select-none transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Subtle ambient scanline overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060a14] via-transparent to-transparent opacity-80" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#060a14]/60 via-transparent to-[#060a14]/60" />

                  {/* Dynamic Floating Badge on Central Board */}
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/15 bg-[#060a14]/90 p-3 backdrop-blur-md">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-cyan-400 animate-pulse" />
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          {activeService.title}
                        </span>
                      </div>
                      <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[0.65rem] font-bold text-cyan-300 border border-cyan-500/30">
                        {activeService.badge}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {activeService.features.map((feat, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 rounded bg-white/[0.06] px-2 py-0.5 text-[0.68rem] text-white/85 border border-white/5"
                        >
                          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Core Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2 sm:p-2.5">
                    <p className="font-mono text-[0.68rem] text-white/50">SLA Response</p>
                    <p className="font-display text-sm sm:text-base font-bold text-cyan-300">
                      &lt; 15 Mins
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2 sm:p-2.5">
                    <p className="font-mono text-[0.68rem] text-white/50">SOC Coverage</p>
                    <p className="font-display text-sm sm:text-base font-bold text-[#ff8843]">
                      24×7×365
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2 sm:p-2.5">
                    <p className="font-mono text-[0.68rem] text-white/50">Architecture</p>
                    <p className="font-display text-sm sm:text-base font-bold text-emerald-400">
                      Zero Trust
                    </p>
                  </div>
                </div>

              </div>
            </Reveal>

            {/* Right Column (4 Services) */}
            <div className="flex flex-col gap-5 sm:gap-6">
              {rightServices.map((service, index) => {
                const isSelected = activeId === service.id;
                const isOrange = service.accent === 'orange';
                const IconComponent = ICON_MAP[service.icon] ?? Cloud;

                return (
                  <Reveal key={service.id} delay={0.1 + index * 0.08}>
                    <button
                      type="button"
                      onClick={() => setActiveId(service.id)}
                      onMouseEnter={() => setActiveId(service.id)}
                      className={`group relative flex w-full items-start gap-4 rounded-2xl border p-4 sm:p-5 text-left transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? isOrange
                            ? 'border-[#ff5500]/70 bg-gradient-to-l from-[#ff5500]/15 to-transparent shadow-[0_0_25px_rgba(255,85,0,0.22)]'
                            : 'border-cyan-400/70 bg-gradient-to-l from-cyan-500/15 to-transparent shadow-[0_0_25px_rgba(6,182,212,0.22)]'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                      }`}
                    >
                      {/* Hexagonal Cyber Icon Badge */}
                      <div className="relative flex-none">
                        {/* Connector line dot on desktop */}
                        <span
                          className={`hidden lg:block absolute -left-3.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full transition-all duration-300 ${
                            isSelected
                              ? isOrange
                                ? 'bg-[#ff5500] shadow-[0_0_12px_#ff5500]'
                                : 'bg-cyan-400 shadow-[0_0_12px_#22d3ee]'
                              : 'bg-white/20'
                          }`}
                        />

                        <div
                          className={`relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                            isOrange
                              ? 'border-2 border-[#ff5500]/50 bg-gradient-to-br from-[#ff5500]/30 via-black/80 to-black text-[#ff8843] shadow-[0_0_18px_rgba(255,85,0,0.35)] group-hover:border-[#ff5500]'
                              : 'border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-500/30 via-black/80 to-black text-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.35)] group-hover:border-cyan-400'
                          }`}
                        >
                          <IconComponent className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3
                            className={`font-display text-base sm:text-lg font-bold tracking-tight transition-colors ${
                              isSelected
                                ? isOrange
                                  ? 'text-[#ffaa75]'
                                  : 'text-cyan-300'
                                : 'text-white group-hover:text-cyan-200'
                            }`}
                          >
                            {service.title}
                          </h3>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm leading-relaxed text-white/70">
                          {service.description}
                        </p>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>

          </div>
        </div>

        {/* ---------- Bottom Trust Bar ---------- */}
        <Reveal delay={0.3} className="mt-16 sm:mt-20">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-white">
                  Enterprise Cyber Defense & Governance
                </h4>
                <p className="text-xs sm:text-sm text-white/60">
                  Protecting cloud, network endpoints, AI models, and identities with continuous vigilance.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-white/80">
                ISO 27001 Ready
              </span>
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-white/80">
                SOC 2 Compliant
              </span>
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-white/80">
                DPDP & GDPR Aligned
              </span>
              <Button href="#contact" variant="outlineDark" className="!py-2 !px-4 text-xs">
                Schedule Security Consultation
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
