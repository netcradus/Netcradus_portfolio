/**
 * Seamless horizontal marquee. Content is duplicated so the -50% translation
 * loops without a visible jump. Pauses on hover.
 *
 * @param {'left'|'right'} direction
 * @param {string} fadeFrom / fadeTo — edge colours matching the section bg
 */
export default function Marquee({
  children,
  direction = 'left',
  duration = 42,
  className = '',
  gap = 'gap-3',
  fadeFrom = '#070c22',
  fadeTo = '#070c22',
  ariaLabel,
}) {
  const group = (
    <div className={`flex shrink-0 items-center ${gap} pr-3`} aria-hidden={ariaLabel ? 'true' : undefined}>
      {children}
    </div>
  );

  return (
    <div
      className={`marquee-group relative flex w-full overflow-hidden ${className}`}
      style={{ ['--marquee-duration']: `${duration}s` }}
      role={ariaLabel ? 'marquee' : undefined}
      aria-label={ariaLabel}
    >
      <div className={`flex w-max ${direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {group}
        {group}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 md:w-28"
        style={{ background: `linear-gradient(to right, ${fadeFrom}, transparent)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 md:w-28"
        style={{ background: `linear-gradient(to left, ${fadeTo}, transparent)` }}
      />
    </div>
  );
}
