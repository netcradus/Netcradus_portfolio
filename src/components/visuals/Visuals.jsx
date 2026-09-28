/**
 * Generative visual primitives used by the hero, service rows and project
 * cards. Everything is SVG/CSS so the site ships with zero stock imagery and
 * zero external requests.
 */

const ROYAL = '#FF5500';
const VIOLET = '#FF7B00';
const CYAN = '#FFBE5C';

/** Decorative gradient blob. Purely presentational. */
export function Blob({ className = '', from = ROYAL, to = VIOLET, opacity = 0.55 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-[90px] ${className}`}
      style={{
        background: `radial-gradient(circle at 35% 35%, ${from}, transparent 62%), radial-gradient(circle at 70% 70%, ${to}, transparent 60%)`,
        opacity,
      }}
    />
  );
}

/** Faint engineering grid. */
export function GridPattern({ className = '', dark = false, size = 64 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: dark
          ? 'linear-gradient(to right, rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.055) 1px, transparent 1px)'
          : 'linear-gradient(to right, rgba(10,16,46,.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,16,46,.055) 1px, transparent 1px)',
        backgroundSize: `${size}px ${size}px`,
        maskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, #000 45%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, #000 45%, transparent 100%)',
      }}
    />
  );
}

/** Animated connection lines (SVG paths draw themselves in). */
export function NetworkLines({ className = '' }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 800 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="url(#net-grad)" strokeWidth="1.4" strokeLinecap="round" opacity="0.55">
        <path className="animate-dash" d="M60 520 L240 360 L430 420 L620 250 L760 300" />
        <path className="animate-dash" style={{ animationDelay: '0.5s' }} d="M120 120 L300 220 L470 130 L660 210" />
        <path className="animate-dash" style={{ animationDelay: '1s' }} d="M40 300 L200 300 L360 460 L540 470 L720 420" />
      </g>
      <defs>
        <linearGradient id="net-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={ROYAL} />
          <stop offset="55%" stopColor={VIOLET} />
          <stop offset="100%" stopColor={CYAN} />
        </linearGradient>
      </defs>
      {[
        [60, 520],
        [240, 360],
        [430, 420],
        [620, 250],
        [120, 120],
        [300, 220],
        [470, 130],
        [660, 210],
        [360, 460],
        [540, 470],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="4" fill={i % 2 ? CYAN : VIOLET} />
          <circle cx={cx} cy={cy} r="4" fill="none" stroke={i % 2 ? CYAN : VIOLET} className="animate-pulse-ring" style={{ transformOrigin: `${cx}px ${cy}px`, animationDelay: `${i * 0.25}s` }} />
        </g>
      ))}
    </svg>
  );
}

/**
 * Browser-window UI mockup used in hero / web-development visuals.
 * `variant` changes the internal layout so visuals don't repeat.
 */
export function BrowserMockup({ variant = 'dashboard', className = '', accent = ROYAL, image, imgAlt = 'Dashboard preview', aspectRatio = 'aspect-[1440/711]' }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-navy-800 shadow-[0_40px_90px_-40px_rgba(5,9,28,0.9)] ${className}`}
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-navy-950/70 px-4 py-2.5 sm:py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 h-4 sm:h-5 flex-1 rounded-md bg-white/6" />
      </div>

      {image ? (
        <div className={`relative w-full overflow-hidden bg-navy-900 ${aspectRatio}`}>
          <img
            src={image}
            alt={imgAlt}
            className="w-full h-full object-cover object-top block select-none"
            loading="eager"
          />
        </div>
      ) : (
        <div className="grid grid-cols-[64px_1fr] sm:grid-cols-[92px_1fr]">
          {/* sidebar */}
          <div className="flex flex-col gap-2.5 border-r border-white/6 bg-navy-950/40 p-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-2.5 rounded-full"
                style={{
                  width: i === 1 ? '100%' : '72%',
                  background: i === 1 ? accent : 'rgba(255,255,255,0.14)',
                }}
              />
            ))}
          </div>

          {/* content */}
          <div className="space-y-3 p-3 sm:p-4">
            {variant === 'dashboard' && <DashboardBody accent={accent} />}
            {variant === 'pipeline' && <PipelineBody accent={accent} />}
            {variant === 'analytics' && <AnalyticsBody accent={accent} />}
          </div>
        </div>
      )}
    </div>
  );
}

function DashboardBody({ accent }) {
  return (
    <>
      <div className="grid grid-cols-3 gap-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-white/8 bg-white/[0.04] p-2.5">
            <div className="h-1.5 w-8 rounded-full bg-white/20" />
            <div className="mt-2 h-3.5 w-12 rounded bg-white/70" style={{ opacity: 0.85 - i * 0.15 }} />
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
        <div className="flex h-20 items-end gap-1.5 sm:h-24">
          {[38, 62, 45, 78, 55, 88, 70, 95, 66, 82].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm transition-all duration-500"
              style={{
                height: `${h}%`,
                background: i % 3 === 0 ? `linear-gradient(180deg, ${CYAN}, ${ROYAL})` : 'rgba(255,255,255,0.16)',
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2.5">
        <div className="h-6 flex-1 rounded-full" style={{ background: `linear-gradient(90deg, ${accent}, ${VIOLET})` }} />
        <div className="h-6 w-16 rounded-full bg-white/10" />
      </div>
    </>
  );
}

function PipelineBody({ accent }) {
  const cols = [3, 4, 2, 5];
  return (
    <div className="grid grid-cols-4 gap-2">
      {cols.map((cards, c) => (
        <div key={c} className="flex flex-col gap-2">
          <div className="h-1.5 w-10 rounded-full" style={{ background: c === 1 ? accent : 'rgba(255,255,255,0.2)' }} />
          {Array.from({ length: cards }).map((_, i) => (
            <div
              key={i}
              className="rounded-md border border-white/8 bg-white/[0.05] p-2"
              style={{ opacity: 1 - i * 0.12 }}
            >
              <div className="h-1.5 w-3/4 rounded-full bg-white/45" />
              <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/20" />
              <div className="mt-2 h-1 w-6 rounded-full" style={{ background: accent }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function AnalyticsBody({ accent }) {
  return (
    <>
      <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
        <svg viewBox="0 0 300 110" className="h-24 w-full sm:h-28" aria-hidden="true">
          <defs>
            <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="0" y1={i * 27 + 6} x2="300" y2={i * 27 + 6} stroke="rgba(255,255,255,0.07)" />
          ))}
          <path
            d="M0 92 C40 78 55 40 90 52 C125 64 140 24 175 34 C210 44 235 16 300 26 L300 110 L0 110 Z"
            fill="url(#area)"
          />
          <path
            className="animate-dash"
            d="M0 92 C40 78 55 40 90 52 C125 64 140 24 175 34 C210 44 235 16 300 26"
            stroke={CYAN}
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-white/8 bg-white/[0.04] p-2.5">
            <div className="h-1.5 w-10 rounded-full bg-white/20" />
            <div className="mt-2 h-3 w-9 rounded" style={{ background: i === 0 ? CYAN : 'rgba(255,255,255,0.6)' }} />
          </div>
        ))}
      </div>
    </>
  );
}

/** Phone frame with a simple app UI. */
export function PhoneMockup({ className = '', accent = VIOLET, image, imgAlt = 'Mobile app preview', aspectRatio = 'aspect-[373/667]' }) {
  return (
    <div
      className={`relative w-[170px] sm:w-[200px] md:w-[214px] rounded-[2.2rem] border border-white/15 bg-navy-950 p-2 sm:p-2.5 shadow-[0_40px_80px_-40px_rgba(5,9,28,0.95)] ring-1 ring-white/10 ${className}`}
    >
      {/* speaker / dynamic island notch */}
      <div className="absolute left-1/2 top-2.5 sm:top-3 h-1.5 w-12 sm:w-14 -translate-x-1/2 rounded-full bg-white/25 z-20" />
      <div className="mt-3.5 sm:mt-4 overflow-hidden rounded-[1.4rem] bg-navy-800">
        {image ? (
          <div className={`relative w-full ${aspectRatio} overflow-hidden bg-navy-900`}>
            <img
              src={image}
              alt={imgAlt}
              className="w-full h-full object-cover object-top block select-none"
              loading="eager"
            />
          </div>
        ) : (
          <>
            <div className="border-b border-white/8 px-3 py-3">
              <div className="h-1.5 w-12 rounded-full bg-white/30" />
              <div className="mt-2 h-3 w-24 rounded bg-white/70" />
            </div>
            <div className="space-y-2 p-3">
              <div className="rounded-lg p-2.5" style={{ background: `linear-gradient(120deg, ${accent}, ${ROYAL})` }}>
                <div className="h-1.5 w-10 rounded-full bg-white/70" />
                <div className="mt-1.5 h-3 w-16 rounded bg-white/90" />
              </div>
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.04] p-2">
                  <div className="h-6 w-6 rounded-md" style={{ background: i === 1 ? CYAN : 'rgba(255,255,255,0.16)' }} />
                  <div className="flex-1">
                    <div className="h-1.5 w-3/4 rounded-full bg-white/45" />
                    <div className="mt-1 h-1.5 w-1/2 rounded-full bg-white/18" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-around border-t border-white/8 px-3 py-2.5">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: i === 0 ? accent : 'rgba(255,255,255,0.25)' }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/** Floating glass-ish data chip — used as a hero accent. */
export function FloatingChip({ label, value, className = '', style }) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border border-white/12 bg-navy-800/85 px-3.5 py-2.5 shadow-[0_20px_45px_-25px_rgba(5,9,28,0.9)] backdrop-blur-md ${className}`}
      style={style}
    >
      <span className="h-2 w-2 flex-none rounded-full bg-cyan-400" />
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-white/50">{label}</span>
      <span className="font-display text-sm font-bold text-white">{value}</span>
    </div>
  );
}
