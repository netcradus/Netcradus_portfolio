import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Loader2, Send, Mail, Clock, MapPin } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal, { RevealItem } from '../components/ui/Reveal';
import { Field } from '../components/ui/FormField';
import { inputClass, selectClass, textareaClass } from '../lib/formStyles';
import { serviceOptions } from '../data/site';
import { siteConfig } from '../data/config';
import { EASE } from '../lib/animation';
import robotGlassImg from '../assets/nrobo.png';

const SERVICE_EVENT_MAP = {
  'web-development': 'Web Development',
  'app-development': 'App Development',
  'erp-solutions': 'ERP',
  'crm-solutions': 'CRM',
};

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: '',
  consent: false,
};

/** Client-side validation — returns an object of field → error message. */
function validate(values) {
  const errors = {};
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!values.name.trim()) errors.name = 'Please enter your name.';
  else if (values.name.trim().length < 2) errors.name = 'Name looks too short.';

  if (!values.email.trim()) errors.email = 'Business email is required.';
  else if (!emailRe.test(values.email.trim())) errors.email = 'Enter a valid email address.';

  if (values.phone.trim() && !/^[+\d][\d\s\-()]{6,20}$/.test(values.phone.trim()))
    errors.phone = 'Enter a valid phone number.';

  if (!values.service) errors.service = 'Select the service you need.';

  if (!values.message.trim()) errors.message = 'Tell us a little about the project.';
  else if (values.message.trim().length < 20)
    errors.message = 'Please add a bit more detail (20+ characters).';

  if (!values.consent)
    errors.consent = 'Please acknowledge the DPDP data processing consent to proceed.';

  return errors;
}

/**
 * Project inquiry form.
 *
 * INTEGRATION: set `contactEndpoint` in src/data/config.js to a real API.
 * The form NEVER fakes a submission — without an endpoint it fails honestly
 * and explains what is missing (dev) or shows a graceful error (production).
 */
export default function Contact() {
  const reduced = useReducedMotion();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverError, setServerError] = useState('');
  const formRef = useRef(null);

  /* Service rows in <Services/> can pre-select a service. */
  useEffect(() => {
    const handler = (e) => {
      const mapped = SERVICE_EVENT_MAP[e.detail];
      if (!mapped) return;
      setValues((v) => ({ ...v, service: mapped }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next.service;
        return next;
      });
      requestAnimationFrame(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => formRef.current?.querySelector('#name')?.focus({ preventScroll: true }), 700);
      });
    };
    window.addEventListener('cyberhaxs:select-service', handler);
    return () => window.removeEventListener('cyberhaxs:select-service', handler);
  }, []);

  const isSubmitting = status === 'loading';

  const setField = (key) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (touched[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        const msg = validate({ ...values, [key]: value })[key];
        if (msg) next[key] = msg;
        else delete next[key];
        return next;
      });
    }
    if (status === 'error') setStatus('idle');
  };

  const blurField = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => {
      const next = { ...prev };
      const msg = validate(values)[key];
      if (msg) next[key] = msg;
      else delete next[key];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const found = validate(values);
    setErrors(found);
    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
      message: true,
      company: true,
      consent: true,
    });

    if (Object.keys(found).length > 0) {
      setStatus('error');
      setServerError('Please fix the highlighted fields.');
      const firstKey = Object.keys(found)[0];
      formRef.current?.querySelector(`#${firstKey}`)?.focus();
      return;
    }

    setStatus('loading');
    setServerError('');

    /* ---- no backend configured: fail honestly, never fake success ---- */
    if (!siteConfig.contactEndpoint) {
      setStatus('error');
      setServerError(
        import.meta.env.DEV
          ? 'No form endpoint configured. Set `contactEndpoint` in src/data/config.js to your API URL.'
          : 'The form is not connected yet. Please try again shortly.'
      );
      return;
    }

    try {
      const res = await fetch(siteConfig.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, source: 'cyberhaxs-website' }),
      });

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      setStatus('success');
      setValues(INITIAL);
      setTouched({});
      setErrors({});
    } catch (err) {
      setStatus('error');
      setServerError(
        import.meta.env.DEV
          ? `Submission failed: ${err.message}. Check your endpoint and CORS settings.`
          : 'We could not send your message right now. Please try again.'
      );
    }
  };

  const successVisible = status === 'success';

  const asideItems = useMemo(
    () => [
      {
        icon: Mail,
        label: 'Email',
        value: siteConfig.contactEmail || 'info@cyberhaxs.com',
        href: `mailto:${siteConfig.contactEmail || 'info@cyberhaxs.com'}`,
        placeholder: false,
      },
      { icon: Clock, label: 'Response time', value: 'Within 24 hours', placeholder: false },
      { icon: MapPin, label: 'Locations', value: 'Office address placeholder', placeholder: true },
    ],
    []
  );

  return (
    <section id="contact" className="relative overflow-hidden bg-white pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12" aria-labelledby="contact-title">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[26rem] w-[26rem] rounded-full opacity-40 blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(255,85,0,0.2), transparent 65%)' }}
      />

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* ---------------- intro ---------------- */}
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="contact-title"
              eyebrow="Start a project"
              lines={[{ text: "LET'S BUILD", accent: false }, { text: 'TOGETHER.', accent: true }]}
              description="Share a few details about your project. We review every inquiry personally and come back with next steps."
            />

            <Reveal delay={0.2} className="mt-10 flex flex-col gap-5">
              {asideItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4 border-t border-ink/10 pt-5">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-royal-50 text-royal-600">
                    <item.icon className="h-4.5 w-4.5" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-semibold text-ink hover:text-[#ff5500] transition-colors break-all sm:break-normal"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span
                        className={`text-sm font-medium ${item.placeholder ? 'text-muted/70 italic' : 'text-ink'}`}
                      >
                        {item.value}
                        {item.placeholder && (
                          <span className="ml-2 rounded bg-violet-500/10 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase not-italic tracking-wider text-violet-600">
                            placeholder
                          </span>
                        )}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </Reveal>

            {/* Bottom-left illustration */}
            <Reveal delay={0.3} className="mt-8 pt-4 flex items-center justify-center lg:justify-start">
              <img
                src={robotGlassImg}
                alt="CyberHaxs AI & Analytics Robot"
                className="h-64 sm:h-80 md:h-96 lg:h-[26rem] xl:h-[30rem] w-auto max-w-full object-contain select-none transition-transform duration-500 hover:scale-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
              />
            </Reveal>
          </div>

          {/* ---------------- form ---------------- */}
          <Reveal delay={0.1} className="min-w-0">
            <div className="relative rounded-[1.75rem] border border-ink/10 bg-surface p-4 sm:p-8 lg:p-11 shadow-[0_40px_90px_-60px_rgba(10,16,46,0.55)] sm:rounded-[2.25rem]">
              <AnimatePresence mode="wait">
                {successVisible ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
                    className="flex min-h-[26rem] flex-col items-start justify-center gap-5"
                    role="status"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-[0_20px_40px_-20px_rgba(255,85,0,0.8)]">
                      <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-3xl font-bold tracking-tight text-ink">
                      Message received.
                    </h3>
                    <p className="max-w-md text-base leading-relaxed text-muted">
                      {siteConfig.contactEndpoint
                        ? 'Thanks for reaching out — the CyberHaxs team will get back to you within 24 hours.'
                        : 'Your inquiry passed validation and is ready to send once a form endpoint is connected.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-royal-600 hover:text-royal-600"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: reduced ? 0 : 0.35 }}
                    className="flex flex-col gap-6"
                    aria-describedby="contact-form-status"
                  >
                    <Reveal stagger className="grid gap-5 sm:grid-cols-2" amount={0.05}>
                      <RevealItem>
                        <Field id="name" label="Name" required error={touched.name && errors.name}>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Your full name"
                            value={values.name}
                            onChange={setField('name')}
                            onBlur={blurField('name')}
                            disabled={isSubmitting}
                            aria-invalid={Boolean(touched.name && errors.name)}
                            aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                            className={inputClass(touched.name && errors.name)}
                          />
                        </Field>
                      </RevealItem>

                      <RevealItem>
                        <Field id="email" label="Business Email" required error={touched.email && errors.email}>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@company.com"
                            value={values.email}
                            onChange={setField('email')}
                            onBlur={blurField('email')}
                            disabled={isSubmitting}
                            aria-invalid={Boolean(touched.email && errors.email)}
                            aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                            className={inputClass(touched.email && errors.email)}
                          />
                        </Field>
                      </RevealItem>

                      <RevealItem>
                        <Field id="phone" label="Phone" error={touched.phone && errors.phone}>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="+1 555 000 0000"
                            value={values.phone}
                            onChange={setField('phone')}
                            onBlur={blurField('phone')}
                            disabled={isSubmitting}
                            aria-invalid={Boolean(touched.phone && errors.phone)}
                            aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
                            className={inputClass(touched.phone && errors.phone)}
                          />
                        </Field>
                      </RevealItem>

                      <RevealItem>
                        <Field id="company" label="Company">
                          <input
                            id="company"
                            name="company"
                            type="text"
                            autoComplete="organization"
                            placeholder="Company name"
                            value={values.company}
                            onChange={setField('company')}
                            disabled={isSubmitting}
                            className={inputClass(false)}
                          />
                        </Field>
                      </RevealItem>

                      <RevealItem className="sm:col-span-2">
                        <Field id="service" label="Service Required" required error={touched.service && errors.service}>
                          <select
                            id="service"
                            name="service"
                            value={values.service}
                            onChange={setField('service')}
                            onBlur={blurField('service')}
                            disabled={isSubmitting}
                            aria-invalid={Boolean(touched.service && errors.service)}
                            className={selectClass(touched.service && errors.service)}
                          >
                            <option value="">Select a service</option>
                            {serviceOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </RevealItem>

                      <RevealItem className="sm:col-span-2">
                        <Field
                          id="message"
                          label="Project Description"
                          required
                          error={touched.message && errors.message}
                          hint="Goals, users, timeline, must-have features."
                        >
                          <textarea
                            id="message"
                            name="message"
                            rows={5}
                            placeholder="Tell us what you want to build…"
                            value={values.message}
                            onChange={setField('message')}
                            onBlur={blurField('message')}
                            disabled={isSubmitting}
                            aria-invalid={Boolean(touched.message && errors.message)}
                            className={textareaClass(touched.message && errors.message)}
                          />
                        </Field>
                      </RevealItem>
                      <RevealItem className="sm:col-span-2">
                        <div className={`rounded-xl border p-3.5 sm:p-4 transition-colors ${touched.consent && errors.consent ? 'border-red-300 bg-red-50/50' : 'border-ink/10 bg-white'
                          }`}>
                          <div className="flex items-start gap-3">
                            <input
                              id="consent"
                              name="consent"
                              type="checkbox"
                              checked={values.consent}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setValues((v) => ({ ...v, consent: checked }));
                                if (touched.consent) {
                                  setErrors((prev) => {
                                    const next = { ...prev };
                                    if (checked) delete next.consent;
                                    else next.consent = 'Please acknowledge the DPDP data processing consent to proceed.';
                                    return next;
                                  });
                                }
                              }}
                              onBlur={blurField('consent')}
                              className="mt-1 h-4 w-4 rounded border-ink/20 text-royal-600 focus:ring-royal-500/30 cursor-pointer"
                            />
                            <label htmlFor="consent" className="text-xs sm:text-[0.82rem] text-muted leading-relaxed cursor-pointer select-none">
                              I consent to CyberHaxs processing my details for evaluating this project inquiry under the{' '}
                              <button
                                type="button"
                                onClick={() => window.dispatchEvent(new CustomEvent('cyberhaxs:open-dpdp', { detail: { tab: 'guidelines' } }))}
                                className="font-semibold text-royal-600 underline hover:text-royal-700"
                              >
                                DPDP Act, 2023
                              </button>{' '}
                              and Privacy Policy with end-to-end encryption.
                            </label>
                          </div>
                          {touched.consent && errors.consent && (
                            <p className="mt-2 text-xs font-semibold text-red-600">{errors.consent}</p>
                          )}
                        </div>
                      </RevealItem>
                    </Reveal>

                    {/* status message */}
                    <div id="contact-form-status" aria-live="polite">
                      <AnimatePresence>
                        {status === 'error' && serverError && (
                          <motion.p
                            key={serverError}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            role="alert"
                            className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                          >
                            <AlertTriangle className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
                            {serverError}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-brand-gradient px-8 py-4 font-display text-base font-bold tracking-tight text-white shadow-[0_16px_38px_-18px_rgba(255,85,0,0.85)] transition-all duration-300 hover:shadow-[0_24px_48px_-18px_rgba(255,123,0,0.9)] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Let's Build It
                            <Send
                              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </button>

                      <p className="text-xs leading-relaxed text-muted">
                        Compliant with Sections 4 & 7 (DPDP Act, 2023) · Purpose-bound data processing.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
