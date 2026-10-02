import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import {
  X,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Code2,
  ExternalLink,
  Laptop,
  Smartphone,
  Database,
  Users,
} from 'lucide-react';
import { EASE } from '../../lib/animation';
import { BrowserMockup, PhoneMockup } from '../visuals/Visuals';

// Import project images
import erpImg from '../../assets/erp.png';
import web1Img from '../../assets/web1.png';
import app1Img from '../../assets/app1.png';
import crm1Img from '../../assets/crm1 (2).png';
import crm2Img from '../../assets/crm2 (2).png';
import tech2Img from '../../assets/robo.jpg';
import logo1Img from '../../assets/logo1.png';

const SERVICES_DATA = {
  'web-development': {
    id: 'web-development',
    index: '01',
    title: 'Web Development',
    category: 'Engineering & SaaS Platforms',
    tagline: 'High-performance digital products, corporate platforms, and SaaS web systems.',
    icon: Laptop,
    accent: '#ff5500',
    gradient: 'from-[#ff5500] to-[#ff7b00]',
    projectTitle: 'Netcradus Cloud Web Platform',
    projectLogoText: 'NETCRADUS WEB',
    image: web1Img,
    mockupType: 'browser',
    overview:
      'We engineer bespoke web applications and enterprise platforms designed around your operating realities. From architectural planning to cloud deployment, our web systems prioritize sub-second speeds, clean code architecture, intuitive UX, and uncompromising uptime.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'AWS', 'PostgreSQL', 'GraphQL'],
    deliverables: [
      {
        title: 'Custom SaaS Architectures',
        desc: 'Multi-tenant cloud platforms designed for rapid user scaling and secure data partitioning.',
      },
      {
        title: 'High-Performance Web Apps',
        desc: 'Interactive, reactive frontends optimized for sub-second Core Web Vitals and SEO excellence.',
      },
      {
        title: 'Enterprise Admin Portals',
        desc: 'Intuitive operational dashboards with real-time data streaming and robust RBAC permissions.',
      },
      {
        title: 'API & Microservice Integration',
        desc: 'Secure REST and GraphQL endpoints connecting payment gateways, third-party services, and legacy backends.',
      },
    ],
    stats: [
      { label: 'Page Speed Score', value: '98/100' },
      { label: 'Target Availability', value: '99.99%' },
      { label: 'Architecture', value: 'Serverless / Cloud' },
    ],
  },
  'app-development': {
    id: 'app-development',
    index: '02',
    title: 'App Development',
    category: 'iOS, Android & Cross-Platform',
    tagline: 'Modern, fluid mobile experiences built for consumer adoption and enterprise mobility.',
    icon: Smartphone,
    accent: '#ff7b00',
    gradient: 'from-[#ff7b00] to-[#ffaa2b]',
    projectTitle: 'Netcradus Mobile Experience',
    projectLogoText: 'NETCRADUS MOBILE',
    image: app1Img,
    mockupType: 'phone',
    overview:
      'We build native iOS, Android, and Flutter applications that provide frictionless user experiences. Whether developing a consumer marketplace, a workforce tool, or an IoT controller, our apps deliver smooth 60fps performance and reliable offline synchronization.',
    technologies: ['Flutter', 'React Native', 'Swift (iOS)', 'Kotlin (Android)', 'Firebase', 'REST APIs', 'WebSockets', 'SQLite'],
    deliverables: [
      {
        title: 'Cross-Platform App Development',
        desc: 'Single codebase architectures using Flutter and React Native without sacrificing native performance.',
      },
      {
        title: 'Offline-First Synchronization',
        desc: 'Local database caching and background synchronizing ensuring uninterrupted functionality offline.',
      },
      {
        title: 'Biometrics & Push Notifications',
        desc: 'Seamless FaceID/TouchID security, real-time push campaigns, and automated in-app messaging.',
      },
      {
        title: 'App Store & Play Store Deployment',
        desc: 'End-to-end certification, regulatory compliance, and continuous OTA updates.',
      },
    ],
    stats: [
      { label: 'Frame Rate', value: '60 FPS Fluid' },
      { label: 'Compatibility', value: 'iOS 15+ / Android 10+' },
      { label: 'Architecture', value: 'Offline First' },
    ],
  },
  'erp-solutions': {
    id: 'erp-solutions',
    index: '03',
    title: 'ERP Solutions',
    category: 'Centralized Business Operations',
    tagline: 'Unified operational platforms connecting inventory, finance, workforce, and analytics.',
    icon: Database,
    accent: '#ffaa2b',
    gradient: 'from-[#ffaa2b] to-[#ff5500]',
    projectTitle: 'Netcradus Enterprise ERP Platform',
    projectLogoText: 'NETCRADUS ERP (ACIS)',
    image: erpImg,
    mockupType: 'browser',
    overview:
      'Eliminate operational silos with a custom ERP platform that connects your core business functions into a single source of truth. We build automated workflows that reduce manual overhead, eliminate data discrepancies, and provide executive visibility in real time.',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'Redis', 'Kubernetes', 'Microservices'],
    deliverables: [
      {
        title: 'Inventory & Supply Chain',
        desc: 'Multi-location inventory tracking, automated replenishment triggers, and supplier management.',
      },
      {
        title: 'Financial Management & Invoicing',
        desc: 'Automated double-entry bookkeeping, tax computation, payroll distribution, and audit trails.',
      },
      {
        title: 'Workforce & Operations Management',
        desc: 'Shift scheduling, attendance logging, role permissions, and milestone tracking.',
      },
      {
        title: 'Executive Intelligence & BI',
        desc: 'Real-time custom dashboards, trend forecasting, and exportable financial reports.',
      },
    ],
    stats: [
      { label: 'Data Accuracy', value: '99.9%' },
      { label: 'Operations Sync', value: 'Real-time' },
      { label: 'Security', value: 'RBAC & AES-256' },
    ],
  },
  'crm-solutions': {
    id: 'crm-solutions',
    index: '04',
    title: 'CRM Solutions',
    category: 'Sales Automation & Customer Intelligence',
    tagline: 'Intelligent customer pipelines, automated follow-ups, and revenue acceleration.',
    icon: Users,
    accent: '#ff5500',
    gradient: 'from-[#ff5500] to-[#ff7b00]',
    projectTitle: 'Netcradus CRM Workspace',
    projectLogoText: 'NETCRADUS CRM',
    image: crm2Img,
    /**
     * CRM UI screenshot gallery — the first image is the hero shot.
     * To add more screenshots: drop the file in `src/assets/`, import it
     * above, and append it to this array. The gallery + thumbnails update
     * automatically.
     */
    images: [crm2Img, crm1Img],
    mockupType: 'browser',
    overview:
      'Empower your revenue and support teams with a tailored CRM workspace. Track customer lifecycles from the first touchpoint through deal closing, automated ticketing, and long-term retention with complete communication logs and automated pipeline stages.',
    technologies: ['Next.js', 'Express', 'MySQL', 'PostgreSQL', 'Socket.io', 'REST APIs', 'Chart.js', 'OAuth 2.0'],
    deliverables: [
      {
        title: 'Lead Capture & Scoring',
        desc: 'Automatic lead intake from forms, advertising campaigns, and email with behavioral scoring.',
      },
      {
        title: 'Visual Sales Pipelines',
        desc: 'Drag-and-drop Kanban deal stages with automated email triggers and reminder notifications.',
      },
      {
        title: 'Customer 360° Profile',
        desc: 'Consolidated customer history, contract logs, support interactions, and lifetime value tracking.',
      },
      {
        title: 'Support Desk & Ticketing',
        desc: 'SLA-driven customer support queues, canned replies, and agent performance tracking.',
      },
    ],
    stats: [
      { label: 'Pipeline Velocity', value: '3.5x Faster' },
      { label: 'Customer Visibility', value: '360° Unified' },
      { label: 'Integration', value: 'Omnichannel' },
    ],
  },
};

const SERVICE_KEYS = ['web-development', 'app-development', 'erp-solutions', 'crm-solutions'];

/* -------------------------------------------------------------------------- */
/*  SERVICE IMAGE GALLERY                                                      */
/*  Main UI screenshot with a thumbnail stack beneath it. Services with a     */
/*  single image render that image with no thumbnails.                        */
/* -------------------------------------------------------------------------- */

function ServiceImageGallery({ service }) {
  const images = service.images && service.images.length > 0 ? service.images : [service.image];
  const [active, setActive] = useState(0);
  const current = images[Math.min(active, images.length - 1)];

  return (
    <div className="w-full">
      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {service.mockupType === 'phone' ? (
              <div className="flex justify-center">
                <PhoneMockup
                  image={current}
                  imgAlt={service.projectTitle}
                  className="shadow-2xl scale-105"
                />
              </div>
            ) : (
              <BrowserMockup
                image={current}
                imgAlt={service.projectTitle}
                className="shadow-2xl"
                accent={service.accent}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="mt-5 flex items-center gap-3">
          {images.map((img, i) => {
            const isActive = i === active;
            return (
              <button
                key={img}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View screenshot ${i + 1} of ${images.length}`}
                aria-pressed={isActive}
                className={`overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-[#ff5500] ring-2 ring-[#ff5500]/40'
                    : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                }`}
              >
                <img
                  src={img}
                  alt=""
                  aria-hidden="true"
                  className="h-12 w-20 sm:h-14 sm:w-24 object-cover object-top bg-navy-900"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ServiceDetailModal() {
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleOpen = (e) => {
      const id = e?.detail;
      if (id && SERVICES_DATA[id]) {
        setSelectedServiceId(id);
      } else {
        setSelectedServiceId('web-development');
      }
    };
    window.addEventListener('cyberhaxs:open-service-modal', handleOpen);
    return () => window.removeEventListener('cyberhaxs:open-service-modal', handleOpen);
  }, []);

  // Preload every case-study screenshot so switches never flash an empty frame.
  useEffect(() => {
    Object.values(SERVICES_DATA).forEach((s) => {
      (s.images && s.images.length > 0 ? s.images : [s.image]).forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);

  const close = () => setSelectedServiceId(null);

  const currentService = selectedServiceId ? SERVICES_DATA[selectedServiceId] : null;

  /**
   * Switch the active case study. Selecting the already-active service is a
   * no-op, so CRM → CRM never restarts the transition.
   */
  const selectService = (id) => {
    if (!id || id === selectedServiceId) return;
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0 });
    setSelectedServiceId(id);
  };

  const navigateService = (direction) => {
    if (!selectedServiceId) return;
    const currentIndex = SERVICE_KEYS.indexOf(selectedServiceId);
    const newIndex = (currentIndex + direction + SERVICE_KEYS.length) % SERVICE_KEYS.length;
    selectService(SERVICE_KEYS[newIndex]);
  };

  const handleStartProject = () => {
    if (!selectedServiceId) return;
    const serviceId = selectedServiceId;
    close();
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('cyberhaxs:select-service', { detail: serviceId }));
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {currentService && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 bg-navy-950/85 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ duration: 0.45, ease: EASE }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
              className="relative z-10 flex flex-col w-full max-w-5xl h-[90vh] max-h-[900px] overflow-hidden rounded-[2rem] border border-white/15 bg-navy-900 text-white shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85)]"
            >
              {/* Top Navigation Bar */}
              <div className="shrink-0 flex items-center justify-between border-b border-white/10 bg-navy-950/80 px-4 sm:px-8 py-3.5 sm:py-4">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#ff5500] shrink-0">
                    SERVICE {currentService.index} / 04
                  </span>
                  <span className="hidden sm:block h-3 w-px bg-white/20" />
                  <span className="hidden sm:block text-xs uppercase tracking-wider text-white/60 font-semibold truncate">
                    {currentService.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Previous / Next Switcher */}
                  <div className="flex items-center gap-1 border border-white/15 rounded-full p-0.5 bg-white/5 mr-2">
                    <button
                      type="button"
                      onClick={() => navigateService(-1)}
                      aria-label="Previous service"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateService(1)}
                      aria-label="Next service"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close modal"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Quick Service Switch Tabs */}
              <div className="shrink-0 flex items-center border-b border-white/8 bg-navy-950/40 px-6 sm:px-8 gap-2 overflow-x-auto min-h-[3rem]">
                {SERVICE_KEYS.map((key) => {
                  const s = SERVICES_DATA[key];
                  const isActive = selectedServiceId === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => selectService(key)}
                      className={`flex items-center gap-2 py-2.5 px-3.5 text-xs sm:text-sm font-bold whitespace-nowrap rounded-xl transition-all cursor-pointer select-none ${
                        isActive
                          ? 'bg-gradient-to-r from-[#ff5500] to-[#ff7b00] text-white shadow-md'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="font-mono text-[0.68rem] opacity-75">{s.index}</span>
                      <span>{s.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Content Body - Scrollable */}
              <div ref={scrollRef} className="relative flex-1 min-h-0 overflow-y-auto p-6 sm:p-10">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={selectedServiceId}
                    initial={{ opacity: 0, y: 28, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.99 }}
                    transition={{ duration: 0.65, ease: EASE }}
                    className="space-y-10"
                  >
                    {/* Header Hero Area */}
                    <div className="space-y-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                        <span
                          aria-hidden="true"
                          className="font-display text-5xl sm:text-7xl font-extrabold leading-none tracking-tighter text-gradient-dark"
                        >
                          {currentService.index}
                        </span>
                        <div className="space-y-3">
                          <div className="inline-flex items-center gap-2 rounded-full border border-[#ff5500]/30 bg-[#ff5500]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#ff7b00]">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>{currentService.category}</span>
                          </div>
                          <h2 id="service-modal-title" className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                            {currentService.title}
                          </h2>
                        </div>
                      </div>
                      <p className="text-base sm:text-xl text-white/70 max-w-3xl leading-relaxed">
                        {currentService.tagline}
                      </p>
                    </div>

                    {/* Project Showcase & Logo Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 36, scale: 0.975 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
                      className="rounded-3xl border border-white/12 bg-gradient-to-br from-navy-800/90 to-navy-950 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-35 blur-[100px]"
                        style={{ background: `radial-gradient(circle, ${currentService.accent}, transparent 65%)` }}
                      />

                      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        {/* Left: Project Branding & Info */}
                        <div className="space-y-6">
                          {/* Project Logo Badge */}
                          <div className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-3.5 backdrop-blur-md">
                            <img
                              src={logo1Img}
                              alt="Project Brand"
                              className="h-8 w-auto object-contain"
                            />
                            <div className="h-6 w-px bg-white/20" />
                            <div>
                              <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-white/50">
                                Featured Showcase
                              </span>
                              <span className="block font-display text-sm font-bold text-white tracking-wide">
                                {currentService.projectLogoText}
                              </span>
                            </div>
                          </div>

                          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                            {currentService.projectTitle}
                          </h3>

                          <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                            {currentService.overview}
                          </p>

                          {/* Stats strip */}
                          <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                            {currentService.stats.map((stat, i) => (
                              <div key={i} className="space-y-1">
                                <span className="block font-display text-base sm:text-xl font-bold text-cyan-300">
                                  {stat.value}
                                </span>
                                <span className="block text-[0.68rem] uppercase tracking-wider text-white/50">
                                  {stat.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right: UI Screenshot / Visual Mockup */}
                        <div className="flex justify-center">
                          <div className="w-full max-w-md">
                            <ServiceImageGallery service={currentService} />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Technologies Stack */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-5 w-5 text-[#ff7b00]" />
                        <h4 className="font-display text-lg font-bold text-white uppercase tracking-wide">
                          Technology Stack & Tooling
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {currentService.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs sm:text-sm font-semibold text-white/90 hover:border-[#ff5500]/60 hover:bg-[#ff5500]/10 hover:text-white transition-all cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Core Capabilities & Deliverables */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-[#ff7b00]" />
                        <h4 className="font-display text-lg font-bold text-white uppercase tracking-wide">
                          Core Capabilities & Engineering Standards
                        </h4>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {currentService.deliverables.map((item, idx) => (
                          <div
                            key={idx}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-2 hover:border-[#ff5500]/40 hover:bg-white/[0.06] transition-all"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5500]/20 text-[#ff5500] shrink-0">
                                <CheckCircle2 className="h-4 w-4" />
                              </span>
                              <h5 className="font-display text-base font-bold text-white">
                                {item.title}
                              </h5>
                            </div>
                            <p className="text-xs sm:text-sm text-white/65 leading-relaxed pl-8">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Call to Action banner */}
                    <div className="rounded-2xl border border-white/15 bg-gradient-to-r from-navy-950 via-navy-800 to-navy-950 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                      <div className="space-y-1">
                        <h4 className="font-display text-xl sm:text-2xl font-bold text-white">
                          Ready to build your {currentService.title.toLowerCase()} platform?
                        </h4>
                        <p className="text-xs sm:text-sm text-white/60">
                          Let's discuss architecture, scopes, timelines, and budgets for your project.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleStartProject}
                        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-gradient px-8 py-4 font-display text-sm sm:text-base font-bold text-white shadow-xl hover:scale-[1.03] transition-all shrink-0 cursor-pointer"
                      >
                        Start This Project
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Modal Bottom Footer */}
              <div className="shrink-0 flex items-center justify-between border-t border-white/10 bg-navy-950/80 px-6 py-4 sm:px-8 text-xs text-white/60">
                <span>CyberHaxs · {currentService.title}</span>
                <button
                  type="button"
                  onClick={close}
                  className="font-bold text-[#ff7b00] hover:text-[#ffaa2b] transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
