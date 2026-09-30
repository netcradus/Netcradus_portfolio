/**
 * ---------------------------------------------------------------------------
 * CYBERHAXS — CENTRAL CONTENT DATA
 * ---------------------------------------------------------------------------
 * ⚠️  PLACEHOLDER CONTENT NOTICE
 * Every project, statistic and testimonial below is a PLACEHOLDER and is
 * flagged as such (`isPlaceholder: true`). Replace them with genuine CyberHaxs
 * work, figures and client quotes before publishing.
 *
 * Service copy, capabilities, process steps and technology lists are factual
 * descriptions of the company's service offering.
 * ---------------------------------------------------------------------------
 */

/* -------------------------------------------------------------------------- */
/*  HERO                                                                      */
/* -------------------------------------------------------------------------- */

export const hero = {
  /** Each line is revealed independently for a masked text-reveal effect. */
  headlineLines: [
    { text: 'WE BUILD', accent: false },
    { text: 'DIGITAL PRODUCTS', accent: true },
    { text: 'THAT MOVE', accent: false },
    { text: 'BUSINESSES FORWARD.', accent: false },
  ],
  supporting:
    'CyberHaxs helps businesses transform ideas into powerful digital products through web development, mobile applications, ERP systems and CRM solutions.',
  primaryCta: { label: 'Start Your Project', href: '#contact' },
  secondaryCta: { label: 'Explore Our Work', href: '#work' },
};

/* -------------------------------------------------------------------------- */
/*  LARGE STATEMENT                                                           */
/* -------------------------------------------------------------------------- */

export const statement = {
  lines: [
    { text: "WE DON'T JUST", accent: false },
    { text: 'WRITE CODE.', accent: false },
    { text: 'WE BUILD DIGITAL', accent: true },
    { text: 'SYSTEMS THAT HELP', accent: true },
    { text: 'BUSINESSES GROW.', accent: false },
  ],
};

/* -------------------------------------------------------------------------- */
/*  ABOUT                                                                     */
/* -------------------------------------------------------------------------- */

export const about = {
  eyebrow: 'About CyberHaxs',
  titleLines: ['Your Technology Partner', 'From Idea to Scale.'],
  body: [
    'CyberHaxs works with companies to design, develop and deploy scalable digital solutions — from the first workshop to long-term evolution in production.',
    'We start by understanding the business, then translate it into interface design, software architecture and engineering decisions that hold up as you grow.',
  ],
  pillars: [
    { title: 'Business Understanding', text: 'Requirements are mapped to outcomes before a single line of code is written.' },
    { title: 'UI / UX Design', text: 'Interfaces designed for clarity, speed and adoption across every device.' },
    { title: 'Software Engineering', text: 'Clean, tested, maintainable code built by an experienced engineering team.' },
    { title: 'Scalability', text: 'Architecture planned for growth in users, data and features from day one.' },
    { title: 'Security', text: 'Security-focused engineering practices embedded across the delivery lifecycle.' },
    { title: 'Performance', text: 'Fast load times and responsive systems that keep users engaged.' },
    { title: 'Long-Term Support', text: 'Continuous maintenance, monitoring and improvement after launch.' },
  ],
};

/* -------------------------------------------------------------------------- */
/*  SERVICES                                                                  */
/* -------------------------------------------------------------------------- */

export const services = [
  {
    id: 'web-development',
    index: '01',
    title: 'WEB DEVELOPMENT',
    summary:
      'Build scalable websites and web applications designed around business requirements.',
    capabilities: [
      'Corporate Websites',
      'Web Applications',
      'SaaS Platforms',
      'E-commerce',
      'Admin Dashboards',
      'API Integration',
    ],
    /** Visual treatment identifier — see <ServiceVisual /> */
    visual: 'web',
    gradient: 'royal',
    shortLabel: 'Web Development',
  },
  {
    id: 'app-development',
    index: '02',
    title: 'APP DEVELOPMENT',
    summary:
      'Build modern mobile experiences for Android and iOS.',
    capabilities: [
      'Android',
      'iOS',
      'Flutter',
      'Cross-platform Apps',
      'Business Apps',
      'Customer Apps',
    ],
    visual: 'mobile',
    gradient: 'violet',
    shortLabel: 'App Development',
  },
  {
    id: 'erp-solutions',
    index: '03',
    title: 'ERP SOLUTIONS',
    summary: 'Build centralized business management platforms.',
    capabilities: [
      'Inventory',
      'Employees',
      'Finance',
      'Operations',
      'Workflow Automation',
      'Reporting',
      'Business Analytics',
    ],
    visual: 'erp',
    gradient: 'cyan',
    shortLabel: 'ERP',
  },
  {
    id: 'crm-solutions',
    index: '04',
    title: 'CRM SOLUTIONS',
    summary:
      'Build systems that help businesses manage customers and sales.',
    capabilities: [
      'Lead Management',
      'Sales Pipelines',
      'Customer Management',
      'Support Tickets',
      'Analytics',
      'Automation',
    ],
    visual: 'crm',
    gradient: 'royal',
    shortLabel: 'CRM',
  },
];

/* -------------------------------------------------------------------------- */
/*  FEATURED WORK  —  ⚠️ ALL PROJECTS ARE PLACEHOLDERS                        */
/* -------------------------------------------------------------------------- */

export const projects = [
  {
    id: 'enterprise-erp-platform',
    isPlaceholder: true,
    index: '01',
    title: 'Enterprise ERP Platform',
    category: 'ERP / Business Automation',
    description:
      'PLACEHOLDER — A centralized operations platform unifying inventory, finance, workforce and reporting into a single source of truth.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    visual: 'erp',
    layout: 'left',
    /** PLACEHOLDER — set a real URL to enable the "View Project" link. */
    url: null,
  },
  {
    id: 'sales-crm-platform',
    isPlaceholder: true,
    index: '02',
    title: 'Sales CRM Platform',
    category: 'CRM / Sales Automation',
    description:
      'PLACEHOLDER — Lead capture, pipeline automation and customer intelligence designed for revenue teams.',
    tags: ['Next.js', 'Express', 'MySQL', 'REST APIs'],
    visual: 'crm',
    layout: 'right',
    /** PLACEHOLDER — set a real URL to enable the "View Project" link. */
    url: null,
  },
  {
    id: 'mobile-business-application',
    isPlaceholder: true,
    index: '03',
    title: 'Mobile Business Application',
    category: 'Mobile Development',
    description:
      'PLACEHOLDER — A cross-platform mobile application that puts core business workflows in the hands of teams and customers.',
    tags: ['Flutter', 'Firebase', 'REST APIs'],
    visual: 'mobile',
    layout: 'left',
    /** PLACEHOLDER — set a real URL to enable the "View Project" link. */
    url: null,
  },
  {
    id: 'digital-business-platform',
    isPlaceholder: true,
    index: '04',
    title: 'Digital Business Platform',
    category: 'Web Development',
    description:
      'PLACEHOLDER — A scalable web platform with customer portals, dashboards and integrated business services.',
    tags: ['React', 'Next.js', 'AWS', 'MongoDB'],
    visual: 'web',
    layout: 'right',
    /** PLACEHOLDER — set a real URL to enable the "View Project" link. */
    url: null,
  },
];

/* -------------------------------------------------------------------------- */
/*  WHY CYBERHAXS                                                             */
/* -------------------------------------------------------------------------- */

export const whyUs = [
  { id: 'custom', title: 'Custom Development', text: 'Software shaped around your processes — never an off-the-shelf compromise.' },
  { id: 'scalable', title: 'Scalable Architecture', text: 'Systems designed to grow with your users, data and operations.' },
  { id: 'modern', title: 'Modern Technologies', text: 'Current, proven frameworks and tooling with long-term viability.' },
  { id: 'security', title: 'Security-Focused Engineering', text: 'Best practices applied across code, data and infrastructure.' },
  { id: 'responsive', title: 'Responsive Design', text: 'Pixel-consistent experiences from 375px mobile to wide desktop.' },
  { id: 'cloud', title: 'Cloud Ready', text: 'Deployment-ready for AWS and containerised environments.' },
  { id: 'performance', title: 'Performance Optimization', text: 'Fast, measurable experiences that keep users engaged.' },
  { id: 'support', title: 'Long-Term Support', text: 'A partner that maintains, monitors and improves after launch.' },
];

/* -------------------------------------------------------------------------- */
/*  TECHNOLOGY                                                                */
/* -------------------------------------------------------------------------- */

export const techGroups = [
  {
    id: 'frontend',
    label: 'Frontend',
    direction: 'left',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'backend',
    label: 'Backend',
    direction: 'right',
    items: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'Socket.io'],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    direction: 'left',
    items: ['Flutter', 'React Native', 'Android', 'iOS', 'Firebase'],
  },
  {
    id: 'data',
    label: 'Data',
    direction: 'right',
    items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Prisma'],
  },
  {
    id: 'devops',
    label: 'DevOps',
    direction: 'left',
    items: ['AWS', 'Docker', 'Git', 'CI/CD', 'Nginx'],
  },
];

/* -------------------------------------------------------------------------- */
/*  DEVELOPMENT PROCESS                                                       */
/* -------------------------------------------------------------------------- */

export const processSteps = [
  { id: 'discovery', index: '01', title: 'Discovery', text: 'Understand business requirements.' },
  { id: 'strategy', index: '02', title: 'Strategy', text: 'Define technology and architecture.' },
  { id: 'ui-ux', index: '03', title: 'UI/UX', text: 'Design intuitive user experiences.' },
  { id: 'development', index: '04', title: 'Development', text: 'Build scalable software.' },
  { id: 'testing', index: '05', title: 'Testing', text: 'Test functionality, security and performance.' },
  { id: 'deployment', index: '06', title: 'Deployment', text: 'Deploy production-ready applications.' },
  { id: 'support', index: '07', title: 'Support', text: 'Maintain and continuously improve products.' },
];

/* -------------------------------------------------------------------------- */
/*  INDUSTRIES / SOLUTIONS                                                    */
/* -------------------------------------------------------------------------- */

export const industries = [
  { id: 'startups', label: 'Startups', highlight: true },
  { id: 'smes', label: 'SMEs', highlight: false },
  { id: 'enterprises', label: 'Enterprises', highlight: false },
  { id: 'healthcare', label: 'Healthcare', highlight: false },
  { id: 'education', label: 'Education', highlight: false },
  { id: 'retail', label: 'Retail', highlight: false },
  { id: 'ecommerce', label: 'E-commerce', highlight: true },
  { id: 'professional-services', label: 'Professional Services', highlight: false },
];

/**
 * ⚠️ PLACEHOLDER STATISTICS — DO NOT PUBLISH AS REAL FIGURES.
 * `value: null` renders an animated "XX" placeholder.
 * Replace `value` with a real number (e.g. 120) to enable the count-up.
 */
export const stats = [
  { id: 'projects', label: 'Projects Delivered', value: null, suffix: '+', isPlaceholder: true },
  { id: 'technologies', label: 'Technologies', value: null, suffix: '+', isPlaceholder: true },
  { id: 'satisfaction', label: 'Client Satisfaction', value: null, suffix: '%', isPlaceholder: true },
  { id: 'support', label: 'Support', value: null, suffix: '/7', isPlaceholder: true },
];

/**
 * ⚠️ PLACEHOLDER TESTIMONIALS — clearly labelled in the UI.
 * Replace with genuine client quotes and approved names only.
 */
export const testimonials = [
  {
    id: 't-1',
    isPlaceholder: false,
    quote:
      'Building a digital platform for a cybersecurity and IT solutions brand like Netcradus requires a partner who understands both design and functionality. Cyberhaxs went above and beyond our expectations. From a clean user interface to optimal performance, their team handled everything with absolute professionalism. Thank you, Cyberhaxs, for helping bring our online identity to life!',
    name: 'Netcradus',
    role: 'Cybersecurity & IT Solutions',
    company: 'Netcradus',
  },
  {
    id: 't-2',
    isPlaceholder: false,
    quote:
      'Bringing an organic and holistic brand like Well Ayurveda to life online required a web development partner who could balance aesthetics with seamless e-commerce functionality. Cyberhaxs exceeded our expectations in every way. From a clean UI layout to a smooth checkout experience, they handled it all with absolute expertise. Thank you, Cyberhaxs, for giving our brand such a wonderful digital home!',
    name: 'Well Ayurveda',
    role: 'Organic & Holistic Wellness',
    company: 'Well Ayurveda',
  },
  {
    id: 't-3',
    isPlaceholder: false,
    quote:
      'Huge thanks to the Cyberhaxs team for crafting the website for Oouraa (oouraa.com)! Their ability to translate complex security concepts into a clean, professional, and responsive web interface was impressive. If you want quality development and a seamless collaboration process, Cyberhaxs is the team to call.',
    name: 'Ooura',
    role: 'Autonomous Cyber Security',
    company: 'Oouraa',
  },
];

/* -------------------------------------------------------------------------- */
/*  CONTACT FORM                                                              */
/* -------------------------------------------------------------------------- */

export const serviceOptions = [
  'Web Development',
  'App Development',
  'ERP',
  'CRM',
  'Other',
];

export const budgetOptions = [
  'Select a budget range',
  'Not sure yet',
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
];
