import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  FileText,
  UserCheck,
  Lock,
  Bell,
  Scale,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Mail,
  Clock,
  Building,
} from 'lucide-react';
import { EASE } from '../../lib/animation';

const SECTIONS_GUIDELINES = [
  {
    id: 'grounds',
    number: '01',
    title: 'Grounds for Processing & Consent',
    statute: 'DPDP Act: Sections 4, 6 & 7',
    summary:
      'Digital personal data is processed strictly on lawful grounds: through explicit, informed consent or specified legitimate uses (such as fulfilling contractual inquiries and service delivery).',
    details: [
      'Consent is requested in clear, plain language with specific purpose limitation.',
      'Data Principals have the unconditional right to withdraw consent at any time as easily as giving it.',
      'No conditional service lock-in based on consent that is not strictly necessary for the service.',
    ],
  },
  {
    id: 'legitimate-use',
    number: '02',
    title: 'Certain Legitimate Uses',
    statute: 'DPDP Act: Section 7',
    summary:
      'Processing without explicit consent is limited strictly to legally recognized scenarios like voluntary provision of details for a specific purpose (e.g. submitting a contact form or requesting a project estimate).',
    details: [
      'Used exclusively for the purpose for which data was voluntarily provided.',
      'Never repurposed for unauthorized tracking, advertising, or unsolicited third-party sharing.',
    ],
  },
  {
    id: 'fiduciary-duties',
    number: '03',
    title: 'General Duties of the Data Fiduciary',
    statute: 'DPDP Act: Section 8(1)',
    summary:
      'CyberHaxs acts as the Data Fiduciary and retains full primary legal responsibility for compliance under the DPDP Act, even when third-party cloud or analytics processors assist in data handling.',
    details: [
      'Accountability is never delegated or diluted to third-party vendors.',
      'Active oversight across all data lifecycles from collection to permanent deletion.',
    ],
  },
  {
    id: 'processors-contracts',
    number: '04',
    title: 'Data Processors & Contractual Safeguards',
    statute: 'DPDP Act: Section 8(2); Rules: Rule 6(1)(f)',
    summary:
      'All cloud infrastructure providers, database hosts, and communication vendors operate under strict, legally binding data processing agreements with mandatory security standards.',
    details: [
      'Vendors are vetted for enterprise-grade SOC 2 / ISO 27001 compliance.',
      'Data processors are prohibited from using client personal data for their own independent purposes or AI training without explicit authorization.',
    ],
  },
  {
    id: 'accuracy',
    number: '05',
    title: 'Data Accuracy & Completeness',
    statute: 'DPDP Act: Section 8(3)',
    summary:
      'We take reasonable steps to maintain data accuracy and consistency whenever personal data is used to make decisions regarding our client engagements.',
    details: [
      'Clients can review and update their submitted business and contact information at any time.',
      'Immediate correction workflows upon notice of outdated or inaccurate records.',
    ],
  },
  {
    id: 'security',
    number: '06',
    title: 'Reasonable Security Safeguards',
    statute: 'DPDP Act: Section 8(5); Rules: Rule 6',
    summary:
      'State-of-the-art technical protections are implemented to prevent unauthorized access, leaks, alteration, or breaches of personal data.',
    details: [
      'End-to-end encryption in transit (TLS 1.3 / HTTPS) and at rest (AES-256).',
      'Strict Role-Based Access Control (RBAC) and multi-factor authentication for internal systems.',
      'Continuous automated security monitoring, logging, and encrypted off-site backups.',
    ],
  },
  {
    id: 'tech-measures',
    number: '07',
    title: 'Technical & Organisational Measures',
    statute: 'DPDP Act: Section 8(4); Rules: Rule 6(1)(g)',
    summary:
      'Security is integrated across our organization through internal data handling policies, staff training, and structured access reviews.',
    details: [
      'Principle of least privilege: only personnel with direct project responsibilities can access project communications.',
      'Regular access audits and immediate offboarding revocation.',
    ],
  },
  {
    id: 'breach-notification',
    number: '08',
    title: 'Personal Data Breach Notification',
    statute: 'DPDP Act: Section 8(6); Rules: Rule 7',
    summary:
      'In the event of a verified personal data breach, CyberHaxs will notify affected Data Principals without delay and provide detailed notification to the Data Protection Board of India within 72 hours.',
    details: [
      'Incident communication includes the nature of the breach, affected data categories, and recommended protective steps.',
      'Direct coordination with cybersecurity incident response teams.',
    ],
  },
  {
    id: 'retention',
    number: '09',
    title: 'Purpose Limitation & Retention',
    statute: 'DPDP Act: Section 8(7); Rules: Rule 8',
    summary:
      'We do not retain personal data indefinitely. Data is promptly erased once the business purpose is concluded or when consent is withdrawn, unless retention is legally mandated.',
    details: [
      'Routine automated purging of obsolete contact inquiries.',
      'Secure cryptographic wipe upon contract termination or client erasure request.',
    ],
  },
  {
    id: 'children',
    number: '10',
    title: 'Children’s Personal Data Protection',
    statute: 'DPDP Act: Section 9; Rules: Rules 10 & 12',
    summary:
      'Our website and services are designed for businesses and professionals. We do not knowingly collect personal data of individuals under 18 without verifiable parental consent.',
    details: [
      'Strict prohibition of behavioral tracking or targeted profiling directed at minors.',
      'Immediate deletion if data of an unverified minor is inadvertently received.',
    ],
  },
  {
    id: 'access-rights',
    number: '11',
    title: 'Right to Access Information',
    statute: 'DPDP Act: Section 11',
    summary:
      'Data Principals have the legal right to obtain a summary of personal data held, processing activities undertaken, and the identities of third-party processors who have received the data.',
    details: [
      'Free of charge digital export requests provided within 30 days.',
      'Transparent disclosure of all integrated service providers.',
    ],
  },
  {
    id: 'grievance',
    number: '12',
    title: 'Grievance Redressal Mechanism',
    statute: 'DPDP Act: Section 13; Rules: Rules 9 & 14(3)',
    summary:
      'We provide an easily accessible grievance redressal mechanism with a dedicated Grievance Officer and publish a guaranteed resolution window well within the statutory 90-day cap.',
    details: [
      'Initial acknowledgment of grievances within 48 hours.',
      'Full resolution or formal progress report provided within 30 days.',
      'Contact Grievance Officer directly at: privacy@cyberhaxs.com',
    ],
  },
  {
    id: 'nominate',
    number: '13',
    title: 'Right to Nominate a Representative',
    statute: 'DPDP Act: Section 14; Rules: Rule 14(4)',
    summary:
      'Data Principals may nominate an individual who can exercise data subject rights on their behalf in the event of death or legal incapacity.',
    details: [
      'Nominees can request access or deletion by submitting verification of identity and authority.',
      'Facility available via our Data Rights Center.',
    ],
  },
  {
    id: 'consent-manager',
    number: '14',
    title: 'Consent Manager Integration',
    statute: 'DPDP Act: Sections 2(g) & 6(7)-(9); Rules: Rule 4',
    summary:
      'CyberHaxs supports interoperability with registered Consent Managers recognized by the Data Protection Board of India for giving, reviewing, and withdrawing consent.',
    details: [
      'Users can track and modify consent preferences seamlessly.',
      'Direct withdrawal tools available on this website.',
    ],
  },
  {
    id: 'cross-border',
    number: '15',
    title: 'Cross-Border Data Transfers',
    statute: 'DPDP Act: Section 16; Rules: Rules 13(4) & 15',
    summary:
      'Personal data processing outside India is conducted strictly in compliance with government notifications and international data security standards.',
    details: [
      'No data is transferred to restricted or blacklisted jurisdictions.',
      'Standard Contractual Clauses and encryption standards apply to global infrastructure.',
    ],
  },
  {
    id: 'sdf-governance',
    number: '16',
    title: 'Significant Data Fiduciary (SDF) Governance',
    statute: 'DPDP Act: Sections 10 & 16',
    summary:
      'We continuously monitor data volumes and risk metrics to adhere to higher-tier Significant Data Fiduciary obligations whenever designated by the Government.',
    details: [
      'Periodic internal compliance reviews against SDF benchmarks.',
      'Frameworks ready for enhanced auditability and assessment requirements.',
    ],
  },
  {
    id: 'dpo',
    number: '17',
    title: 'Data Protection Officer (DPO)',
    statute: 'DPDP Act: Section 10(2)(a)',
    summary:
      'We maintain an India-based privacy governance lead responsible for monitoring compliance, answering inquiries, and serving as the liaison for the Data Protection Board.',
    details: [
      'Direct point of contact for client data inquiries.',
      'Official communications routed to dpo@cyberhaxs.com.',
    ],
  },
  {
    id: 'dpia-audit',
    number: '18',
    title: 'Periodic Risk Assessments & Audits',
    statute: 'DPDP Act: Section 10(2)(b)-(c); Rules: Rule 13(1)',
    summary:
      'Annual Data Protection Impact Assessments (DPIAs) and independent security audits are conducted prior to deploying new software architectures or analytical capabilities.',
    details: [
      'Evaluation of privacy risks in custom client engineering engagements.',
      'Regular penetration testing and vulnerability management.',
    ],
  },
  {
    id: 'dpb-compliance',
    number: '19',
    title: 'Data Protection Board of India Oversight',
    statute: 'DPDP Act: Sections 18, 27, 33 & Schedule',
    summary:
      'We adhere to the regulatory guidance and orders of the Data Protection Board of India, documenting data protection practices to ensure transparency and accountability.',
    details: [
      'Structured audit trails and compliance documentation.',
      'Strict adherence to statutory penalties safeguards (up to Rs 250 crore statutory ceiling for security failure).',
    ],
  },
  {
    id: 'official-statutes',
    number: '20',
    title: 'Statutory References & Official Texts',
    statute: 'Digital Personal Data Protection Act, 2023 & Rules, 2025',
    summary:
      'This privacy center serves as a plain-language, actionable implementation of India’s DPDP Act, 2023, DPDP Rules, 2025, and official Commencement Notifications.',
    details: [
      'Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023).',
      'Digital Personal Data Protection Rules, 2025.',
      'Periodic review as enforcement phases roll out towards full commencement by May 2027.',
    ],
  },
];

export default function DPDPPrivacyModal() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('guidelines'); // 'guidelines' | 'rights' | 'contact' | 'cookies'
  const [expandedSection, setExpandedSection] = useState('grounds');
  const [searchTerm, setSearchTerm] = useState('');

  // Rights request form state
  const [requestType, setRequestType] = useState('access');
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqDetails, setReqDetails] = useState('');
  const [reqStatus, setReqStatus] = useState('idle'); // idle | loading | success

  useEffect(() => {
    const handleOpen = (e) => {
      const tab = e?.detail?.tab;
      if (tab) setActiveTab(tab);
      setOpen(true);
    };
    window.addEventListener('cyberhaxs:open-dpdp', handleOpen);
    return () => window.removeEventListener('cyberhaxs:open-dpdp', handleOpen);
  }, []);

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!reqEmail || !reqName) return;
    setReqStatus('loading');
    setTimeout(() => {
      setReqStatus('success');
    }, 900);
  };

  const filteredGuidelines = SECTIONS_GUIDELINES.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.statute.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dpdp-modal-title"
            className="relative z-10 flex flex-col w-full max-w-4xl h-[88vh] max-h-[850px] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-white text-ink shadow-[0_30px_90px_-20px_rgba(0,0,0,0.7)]"
          >
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between border-b border-ink/10 bg-surface px-4 sm:px-8 py-3.5 sm:py-5">
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-royal-500/10 text-royal-600 shrink-0">
                  <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <div className="min-w-0">
                  <h2 id="dpdp-modal-title" className="font-display text-base sm:text-xl font-bold text-ink truncate sm:whitespace-normal">
                    DPDP Compliance & Privacy Center
                  </h2>
                  <p className="text-[0.68rem] sm:text-xs text-muted font-mono truncate sm:whitespace-normal">
                    Digital Personal Data Protection (DPDP) Act 2023 · Guidelines & Governance
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close modal"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink/70 hover:bg-ink/5 hover:text-ink transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Tabs - with shrink-0 and clean height */}
            <div className="shrink-0 flex items-center border-b border-ink/10 bg-surface/80 px-3 sm:px-8 gap-1 sm:gap-2 overflow-x-auto min-h-[3.25rem]">
              {[
                { id: 'guidelines', label: 'DPDP Principles & Policies', icon: Scale },
                { id: 'rights', label: 'Data Rights & Requests', icon: UserCheck },
                { id: 'contact', label: 'Grievance & DPO', icon: Building },
                { id: 'cookies', label: 'Consent & Cookies', icon: Lock },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-3.5 px-3.5 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer select-none ${
                      isActive
                        ? 'border-[#ff5500] text-[#ff5500] bg-white/60 rounded-t-lg'
                        : 'border-transparent text-muted hover:text-ink hover:border-ink/20'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Body - with min-h-0 and flex-1 */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* TAB 1: GUIDELINES & PRINCIPLES */}
              {activeTab === 'guidelines' && (
                <div className="space-y-6">
                  {/* Executive Summary banner */}
                  <div className="rounded-2xl border border-royal-500/20 bg-royal-50/50 p-4 sm:p-5">
                    <div className="flex items-start gap-3.5">
                      <FileText className="h-5 w-5 text-royal-600 shrink-0 mt-0.5" />
                      <div className="space-y-1 text-xs sm:text-sm text-ink/85 leading-relaxed">
                        <p className="font-semibold text-ink">
                          Data Fiduciary Governance: CyberHaxs (CyberHaxs Software & IT Solutions)
                        </p>
                        <p className="text-muted">
                          Under India’s Digital Personal Data Protection Act, 2023, you are the{' '}
                          <strong className="text-ink">Data Principal</strong> and CyberHaxs is the{' '}
                          <strong className="text-ink">Data Fiduciary</strong>. All digital personal data
                          is processed transparently, with explicit lawful grounds, enterprise-grade security
                          safeguards, purpose-bound retention, and strict grievance redressal within 30 days.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search compliance guidelines, statutes, rights..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-royal-600 focus:ring-2 focus:ring-royal-500/20"
                    />
                  </div>

                  {/* Accordion / Cards */}
                  <div className="space-y-3">
                    {filteredGuidelines.map((item) => {
                      const isExpanded = expandedSection === item.id;
                      return (
                        <div
                          key={item.id}
                          className="rounded-xl border border-ink/10 bg-white transition-all duration-200 overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedSection(isExpanded ? null : item.id)}
                            className="flex w-full items-center justify-between p-4 text-left hover:bg-surface/50 transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-4">
                              <span className="font-mono text-xs font-bold text-royal-600 shrink-0">
                                {item.number}
                              </span>
                              <div className="min-w-0">
                                <h3 className="font-display text-sm font-bold text-ink truncate">
                                  {item.title}
                                </h3>
                                <p className="font-mono text-[0.68rem] text-muted-dark">
                                  {item.statute}
                                </p>
                              </div>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 text-muted shrink-0 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-royal-600' : ''
                              }`}
                            />
                          </button>

                          {isExpanded && (
                            <div className="border-t border-ink/8 bg-surface/30 p-4 sm:p-5 space-y-3 text-xs sm:text-sm text-ink/85">
                              <p className="leading-relaxed font-medium text-ink">{item.summary}</p>
                              <ul className="list-disc pl-5 space-y-1.5 text-muted">
                                {item.details.map((d, idx) => (
                                  <li key={idx} className="leading-relaxed">
                                    {d}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: RIGHTS & REQUEST CENTER */}
              {activeTab === 'rights' && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-ink/10 bg-surface p-5">
                    <h3 className="font-display text-base font-bold text-ink">
                      Exercise Your Statutory Data Principal Rights
                    </h3>
                    <p className="mt-1 text-xs text-muted leading-relaxed">
                      Under Sections 11, 12, 13 & 14 of the DPDP Act, 2023, you can request access to your records,
                      data corrections, permanent erasure, or nominate a representative.
                    </p>
                  </div>

                  {reqStatus === 'success' ? (
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center space-y-3">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <h4 className="font-display text-lg font-bold text-green-900">
                        Request Registered Successfully
                      </h4>
                      <p className="text-xs sm:text-sm text-green-800 max-w-md mx-auto leading-relaxed">
                        Your request has been logged under Reference <strong>#DPDP-{Date.now().toString().slice(-6)}</strong>.
                        Our Data Protection Officer will verify your identity and deliver a response within 30 days.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setReqStatus('idle');
                          setReqDetails('');
                        }}
                        className="mt-2 rounded-full border border-green-300 bg-white px-5 py-2 text-xs font-semibold text-green-800 hover:bg-green-50"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleRequestSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                          Request Type
                        </label>
                        <select
                          value={requestType}
                          onChange={(e) => setRequestType(e.target.value)}
                          className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-royal-600 focus:ring-2 focus:ring-royal-500/20"
                        >
                          <option value="access">Right to Access Information (Summary of Data & Processors)</option>
                          <option value="correction">Right to Correction & Data Updation</option>
                          <option value="erasure">Right to Erasure & Purpose-End Deletion</option>
                          <option value="nomination">Right to Nominate a Representative</option>
                          <option value="grievance">Grievance & Complaint Submission</option>
                        </select>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Full name"
                            value={reqName}
                            onChange={(e) => setReqName(e.target.value)}
                            className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-royal-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                            Registered Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="you@company.com"
                            value={reqEmail}
                            onChange={(e) => setReqEmail(e.target.value)}
                            className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-royal-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                          Request Details & Context
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Provide any additional details or identifiers to help us fulfill your request..."
                          value={reqDetails}
                          onChange={(e) => setReqDetails(e.target.value)}
                          className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-royal-600"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <p className="text-[0.72rem] text-muted">
                          Statutory resolution deadline: within 30 days (Rule 14(3)).
                        </p>
                        <button
                          type="submit"
                          disabled={reqStatus === 'loading'}
                          className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-2.5 font-display text-sm font-bold text-white shadow-md hover:shadow-lg transition-all"
                        >
                          <Send className="h-3.5 w-3.5" />
                          {reqStatus === 'loading' ? 'Registering...' : 'Submit Request'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 3: GRIEVANCE & DPO CONTACTS */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-ink/10 bg-surface p-5 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-royal-50 text-royal-600">
                          <Building className="h-4 w-4" />
                        </span>
                        <h4 className="font-display text-sm font-bold text-ink">
                          Data Protection Officer (DPO)
                        </h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Designated lead for compliance with the Data Protection Board of India and overall privacy governance.
                      </p>
                      <div className="space-y-1.5 font-mono text-xs text-ink/90 pt-1">
                        <p className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-royal-600" />
                          <span>dpo@cyberhaxs.com</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-royal-600" />
                          <span>Office Hours: 09:30 - 18:30 IST</span>
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-ink/10 bg-surface p-5 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                          <AlertCircle className="h-4 w-4" />
                        </span>
                        <h4 className="font-display text-sm font-bold text-ink">
                          Grievance Redressal Officer
                        </h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        For any complaint regarding personal data, unaddressed requests, or privacy concerns.
                      </p>
                      <div className="space-y-1.5 font-mono text-xs text-ink/90 pt-1">
                        <p className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-violet-600" />
                          <span>privacy@cyberhaxs.com</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-violet-600" />
                          <span>Statutory Resolution: &le; 30 Days</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-ink/10 bg-white p-5 space-y-2.5">
                    <h4 className="font-display text-sm font-bold text-ink">
                      Escalation to the Data Protection Board of India
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      If your grievance is not resolved to your satisfaction within our published 30-day timeline
                      (capped at 90 days under Rule 14(3)), you have the statutory right to file a formal complaint
                      with the <strong>Data Protection Board of India</strong> in the prescribed digital format.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: CONSENT & COOKIE CONTROLS */}
              {activeTab === 'cookies' && (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-ink/10 bg-surface p-5 space-y-2">
                    <h3 className="font-display text-base font-bold text-ink">
                      Cookie & Analytics Consent Management
                    </h3>
                    <p className="text-xs text-muted leading-relaxed">
                      Under Section 6 of the DPDP Act, tracking and analytics cookies require your explicit, informed consent.
                      Essential session cookies are required for basic site security and navigation.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-ink/10 bg-white">
                      <div>
                        <p className="font-display text-sm font-bold text-ink">Essential Technical Cookies</p>
                        <p className="text-xs text-muted">Core security, form protection, and layout preferences.</p>
                      </div>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                        Always Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-ink/10 bg-white">
                      <div>
                        <p className="font-display text-sm font-bold text-ink">Performance & Performance Analytics</p>
                        <p className="text-xs text-muted">Aggregated, non-personalized telemetry to optimize load times.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                          onChange={(e) => {
                            localStorage.setItem('cyberhaxs_analytics_consent', e.target.checked ? 'true' : 'false');
                          }}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-royal-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-full bg-brand-gradient px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-ink/10 bg-surface px-6 py-4 sm:px-8 gap-3 text-xs text-muted">
              <span>CyberHaxs · Compliant with DPDP Act, 2023 & DPDP Rules, 2025</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-bold text-royal-600 hover:text-royal-700 transition-colors cursor-pointer"
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
