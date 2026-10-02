import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Layers,
  Code2,
  CheckCircle2,
  Laptop,
  ArrowDown,
} from 'lucide-react';
import { EASE } from '../../lib/animation';
import { BrowserMockup } from '../visuals/Visuals';

// Project image assets
import web1Img from '../../assets/web1.png';
import tech2Img from '../../assets/robo.jpg';
import crm2Img from '../../assets/crm2 (2).png';

// Brand Logo Assets
import netLogo from '../../assets/net.png';
import aauraaLogo from '../../assets/aauraa.png';
import ayurvedaLogo from '../../assets/ayurveda.png';

/* -------------------------------------------------------------------------- */
/*  3 FEATURED WEB PROJECTS WITH CUSTOM BRAND LOGOS                           */
/* -------------------------------------------------------------------------- */

const PROJECTS = [
  {
    id: 'netcradus',
    index: '01',
    title: 'NETCRADUS',
    subtitle: 'High-Performance Enterprise SaaS & Engineering Platform',
    category: 'Scalable Web Application',
    logoImg: netLogo,
    liveUrl: 'https://www.netcradus.com/',
    image: web1Img,
    accent: '#ff5500',
    description:
      'A multi-tenant cloud application engineered with Next.js 15, React 19, and distributed Edge microservices. Delivers sub-second response times, live telemetry, and resilient high-throughput workflows.',
    techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'AWS Lambda'],
    metrics: [
      { label: 'Avg TTFB', value: '0.38s' },
      { label: 'Uptime SLA', value: '99.99%' },
      { label: 'Architecture', value: 'Edge Multi-Tenant' },
    ],
    deliverables: [
      'Multi-tenant isolated data partitions with role-based access control',
      'Real-time WebSocket event streaming and collaborative state synchronization',
      'Automated global CI/CD pipelines with zero-downtime deployment',
    ],
  },
  {
    id: 'ooura',
    index: '02',
    title: 'OOURA',
    subtitle: 'Autonomous Cyber Immune System & Threat Intelligence Portal',
    category: 'AI Cyber Security & BI Portal',
    logoImg: aauraaLogo,
    liveUrl: 'https://www.oouraa.com/',
    image: tech2Img,
    accent: '#ff7b00',
    description:
      'Executive-level analytics and threat telemetry portal processing millions of real-time security events with autonomous remediation, predictive forecasting, audit logging, and automated compliance pipelines.',
    techStack: ['React', 'TypeScript', 'D3.js / Chart.js', 'FastAPI', 'Redis Cache', 'Docker', 'PostgreSQL'],
    metrics: [
      { label: 'Query Latency', value: '< 50ms' },
      { label: 'Threat Feeds', value: '10M+ Real-time' },
      { label: 'Security Standard', value: 'SOC2 / Zero-Trust' },
    ],
    deliverables: [
      'Interactive multi-dimensional autonomous threat detection and operational heatmaps',
      'Granular permission matrix with Single Sign-On (SSO) and hardware MFA integration',
      'Instantaneous CSV, PDF, and audit log export pipelines with scheduled delivery',
    ],
  },
  {
    id: 'well-ayurveda',
    index: '03',
    title: 'WELL AYURVEDA',
    subtitle: 'Natural, Pure & Holistic Healthcare Platform & Store',
    category: 'Holistic Wellness Ecosystem',
    logoImg: ayurvedaLogo,
    liveUrl: 'https://wellayurveda.shop/',
    image: crm2Img,
    accent: '#ff5500',
    description:
      'Scalable healthcare and holistic wellness web platform unifying personalized dosage consultations, customer orders, appointment booking, and wellness routine tracking into a unified experience.',
    techStack: ['Next.js', 'Express', 'MySQL', 'Socket.io', 'REST APIs', 'OAuth 2.0', 'Chart.js'],
    metrics: [
      { label: 'Consultation Speed', value: '3.5x Faster' },
      { label: 'Client Retention', value: '92% Active' },
      { label: 'Data Encryption', value: 'AES-256' },
    ],
    deliverables: [
      'Interactive health assessment forms with automated practitioner matching',
      'Consolidated patient wellness records with HIPAA/DPDP privacy vaulting',
      'Automated recurring refill and holistic treatment scheduling workflows',
    ],
  },
];

export default function WebDevShowcaseModal() {
  const [open, setOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const handleOpen = (e) => {
      const detail = e?.detail;
      if (detail === 'web-development' || detail?.serviceId === 'web-development') {
        setSelectedProjectId(null); // start on 4-card overview
        setOpen(true);
      }
    };
    window.addEventListener('cyberhaxs:open-web-showcase', handleOpen);
    return () => window.removeEventListener('cyberhaxs:open-web-showcase', handleOpen);
  }, []);

  const close = () => {
    setOpen(false);
    setSelectedProjectId(null);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedProjectId) setSelectedProjectId(null);
        else close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, selectedProjectId]);

  const selectedProject = selectedProjectId
    ? PROJECTS.find((p) => p.id === selectedProjectId)
    : null;

  const handleStartProject = (projectTitle) => {
    close();
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('cyberhaxs:select-service', { detail: 'web-development' }));
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Modal Card Shell - Pure White Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="web-showcase-title"
            className="relative z-10 flex flex-col w-full max-w-6xl h-[92vh] max-h-[920px] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 bg-white text-slate-900 shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
          >
            {/* Top Navigation Header */}
            <div className="shrink-0 flex items-center justify-between border-b border-slate-200/90 bg-white/95 px-4 sm:px-10 py-4 sm:py-5 backdrop-blur-md">
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff5500]/10 text-[#ff5500] shrink-0">
                  <Laptop className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h2 id="web-showcase-title" className="font-display text-sm sm:text-lg font-bold text-slate-950 tracking-wide">
                    WEB DEVELOPMENT SHOWCASE
                  </h2>
                  <p className="text-xs text-slate-500 font-mono hidden sm:block">
                    Featured Web Applications, SaaS Architectures & Case Studies
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {selectedProject && (
                  <button
                    type="button"
                    onClick={() => setSelectedProjectId(null)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 hover:text-slate-950 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back to Overview</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={close}
                  aria-label="Close modal"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-950 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Main Interactive Body */}
            <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-8 lg:p-10 flex flex-col justify-center bg-white">
              <AnimatePresence mode="wait">
                {!selectedProject ? (
                  /* ---------------- 3-CARD SHOWCASE GRID ---------------- */
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="relative w-full"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto w-full">
                      {PROJECTS.map((project) => (
                        <motion.a
                          key={project.id}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -8, scale: 1.02 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          onClick={(e) => {
                            if (project.liveUrl && project.liveUrl !== '#') {
                              window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          title={`Open ${project.title} (${project.liveUrl})`}
                          className="group relative flex flex-col items-center justify-between rounded-2xl sm:rounded-3xl border border-zinc-800/90 bg-black p-7 sm:p-8 min-h-[380px] sm:min-h-[440px] shadow-[0_20px_45px_rgba(0,0,0,0.45)] hover:border-[#ff5500]/80 hover:shadow-[0_25px_60px_-10px_rgba(255,85,0,0.45)] transition-all cursor-pointer select-none overflow-hidden block text-inherit no-underline"
                        >
                          {/* Ambient Top Glow on Hover */}
                          <div className="pointer-events-none absolute -top-16 inset-x-0 h-32 bg-gradient-to-b from-[#ff5500]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                          {/* Top Arrow Indicator */}
                          <div className="flex justify-center text-white/40 group-hover:text-[#ff7b00] group-hover:translate-y-0.5 transition-all">
                            <span className="text-[0.65rem]">▼</span>
                          </div>

                          {/* Center Brand Logo */}
                          <div className="flex items-center justify-center my-auto py-4 h-32 w-full px-2 transform transition-transform duration-400 group-hover:scale-110 z-20">
                            <img
                              src={project.logoImg}
                              alt={`${project.title} logo`}
                              className="max-h-20 sm:max-h-24 max-w-[90%] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
                            />
                          </div>

                          {/* Bottom Content Info (Text) */}
                          <div className="flex flex-col items-center gap-2 text-center w-full z-10">
                            {/* Center separator dot */}
                            <span className="h-1 w-1 rounded-full bg-white/30 group-hover:bg-[#ff7b00] transition-colors" />

                            {/* Title / Text */}
                            <div className="flex items-center gap-1.5 mt-1">
                              <h3 className="font-display text-sm sm:text-[0.95rem] font-black uppercase tracking-[0.2em] text-white group-hover:text-[#ffaa2b] transition-colors">
                                {project.title}
                              </h3>
                              <ExternalLink className="h-3.5 w-3.5 text-white/40 group-hover:text-[#ff7b00] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>

                            {/* Number */}
                            <span className="font-mono text-sm sm:text-base font-bold text-[#ff7b00] group-hover:scale-110 transition-transform">
                              {project.index}
                            </span>
                          </div>

                          {/* Bottom Center Indicator Line */}
                          <div className="w-10 h-1 rounded-full bg-white/10 group-hover:bg-[#ff5500] group-hover:w-16 transition-all duration-300 mt-4" />
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  /* ---------------- EXPANDED CASE STUDY DETAIL VIEW ---------------- */
                  <motion.div
                    key={selectedProject.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="space-y-8"
                  >
                    {/* Detail Hero Section */}
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                      {/* Left Column: Case Information */}
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold tracking-widest text-[#ff5500]">
                              PROJECT {selectedProject.index} / 03
                            </span>
                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                              {selectedProject.category}
                            </span>
                          </div>

                          <div className="flex items-center gap-4">
                            <a
                              href={selectedProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`Visit ${selectedProject.title}`}
                              className="flex h-14 w-28 shrink-0 items-center justify-center rounded-xl bg-black border border-zinc-800 p-2.5 shadow-md hover:border-[#ff5500] transition-colors cursor-pointer"
                            >
                              <img
                                src={selectedProject.logoImg}
                                alt={`${selectedProject.title} logo`}
                                className="max-h-full max-w-full object-contain"
                              />
                            </a>
                            <div>
                              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-slate-950">
                                {selectedProject.title}
                              </h2>
                              {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                                <a
                                  href={selectedProject.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#ff5500] hover:underline mt-1"
                                >
                                  <span>{selectedProject.liveUrl.replace(/^https?:\/\//, '')}</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                            </div>
                          </div>

                          <p className="text-base sm:text-lg font-medium text-[#ff5500]">
                            {selectedProject.subtitle}
                          </p>

                          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                            {selectedProject.description}
                          </p>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-3 gap-3 border-y border-slate-200 py-4">
                          {selectedProject.metrics.map((m, idx) => (
                            <div key={idx} className="space-y-1">
                              <span className="block font-display text-lg sm:text-xl font-bold text-slate-950">
                                {m.value}
                              </span>
                              <span className="block text-[0.68rem] uppercase tracking-wider text-slate-500 font-semibold">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Chips */}
                        <div className="space-y-2">
                          <span className="block text-xs uppercase font-bold tracking-widest text-slate-400">
                            Technologies & Tooling
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-800"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                          {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                            <a
                              href={selectedProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 font-display text-sm font-bold text-white shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
                            >
                              <span>Visit Live Website</span>
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => handleStartProject(selectedProject.title)}
                            className="inline-flex items-center gap-2 rounded-full border border-[#ff5500]/40 bg-[#ff5500]/10 px-6 py-3.5 font-display text-sm font-bold text-[#ff5500] hover:bg-[#ff5500] hover:text-white transition-colors cursor-pointer"
                          >
                            <span>Start Similar Project</span>
                            <ArrowUpRight className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedProjectId(null)}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                          >
                            <span>Back to All Projects</span>
                          </button>
                        </div>
                      </div>

                      {/* Right Column: Live UI Mockup */}
                      <div className="flex justify-center">
                        <div className="w-full max-w-md drop-shadow-xl">
                          <BrowserMockup
                            image={selectedProject.image}
                            imgAlt={selectedProject.title}
                            accent={selectedProject.accent}
                            className="shadow-xl border border-slate-200 bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Architecture & Capabilities Cards */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-4">
                      <div className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-[#ff5500]" />
                        <h4 className="font-display text-base sm:text-lg font-bold uppercase tracking-wider text-slate-900">
                          Engineering Deliverables & Architecture
                        </h4>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        {selectedProject.deliverables.map((item, idx) => (
                          <div
                            key={idx}
                            className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 shadow-xs"
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#ff5500] shrink-0" />
                              <h5 className="font-display text-sm font-bold text-slate-900">
                                Feature 0{idx + 1}
                              </h5>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed pl-6">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Footer */}
            <div className="shrink-0 flex items-center justify-between border-t border-slate-200/90 bg-white px-6 sm:px-10 py-4 text-xs text-slate-500">
              <span>CyberHaxs · Web Development Practice</span>
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
