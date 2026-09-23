import { useRef } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/**
 * CyberHaxs CTA button.
 *
 * - `primary`  → brand gradient pill with magnetic hover
 * - `ghost`    → outlined pill (light sections)
 * - `dark`     → solid navy pill (light sections)
 * - `outlineDark` → outlined pill for navy sections
 *
 * Renders a real <a> for any href (in-page "#section", mailto:, tel:, https://)
 * so the single-page site needs no router. Falls back to <button> otherwise.
 */
export default function Button({
  href,
  variant = 'primary',
  children,
  withArrow = false,
  className = '',
  wrapperClassName = '',
  onClick,
  type,
  disabled,
  ariaLabel,
  ...rest
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 260, damping: 20, mass: 0.4 });
  const y = useSpring(mvY, { stiffness: 260, damping: 20, mass: 0.4 });

  const onMouseMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mvX.set((e.clientX - rect.left - rect.width / 2) * 0.16);
    mvY.set((e.clientY - rect.top - rect.height / 2) * 0.26);
  };

  const onMouseLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  const base =
    'group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[0.95rem] font-semibold tracking-tight transition-[background-color,border-color,box-shadow,color,transform] duration-300 select-none disabled:opacity-55 disabled:pointer-events-none';

  const skins = {
    primary:
      'bg-brand-gradient text-white shadow-[0_12px_32px_-14px_rgba(255,85,0,0.75)] hover:shadow-[0_20px_44px_-16px_rgba(255,123,0,0.8)]',
    ghost:
      'border border-ink/15 bg-transparent text-ink hover:border-royal-600/50 hover:bg-royal-50',
    dark: 'bg-navy-900 text-white hover:bg-navy-800',
    outlineDark:
      'border border-white/25 bg-white/[0.04] text-white hover:border-white/55 hover:bg-white/10',
  };

  const inner = (
    <span className={`${base} ${skins[variant]} ${className}`}>
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
      {withArrow && (
        <ArrowUpRight
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.4}
          aria-hidden="true"
        />
      )}
    </span>
  );

  const sharedProps = {
    ref,
    onMouseMove,
    onMouseLeave,
    onMouseLeaveCapture: onMouseLeave,
    onClick: disabled ? undefined : onClick,
    'aria-label': ariaLabel,
    ...rest,
  };

  const isLink = typeof href === 'string' && href.length > 0;

  const content = isLink ? (
    <a href={href} aria-disabled={disabled || undefined} {...sharedProps}>
      {inner}
    </a>
  ) : (
    <button type={type ?? 'button'} disabled={disabled} {...sharedProps}>
      {inner}
    </button>
  );

  return (
    <motion.span className={`inline-block ${wrapperClassName}`} style={reduced ? undefined : { x, y }}>
      {content}
    </motion.span>
  );
}

/**
 * Underlined text link with an animated arrow — used for secondary actions.
 */
export function TextLink({ href, children, className = '', dark = false, withArrow = true, ...rest }) {
  const cls = `group inline-flex items-center gap-2 text-sm font-semibold tracking-tight transition-colors duration-300 ${
    dark ? 'text-white/85 hover:text-white' : 'text-ink hover:text-royal-600'
  } ${className}`;

  const inner = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className={`absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100 ${
            dark ? 'bg-current/70' : 'bg-current'
          }`}
        />
      </span>
      {withArrow && (
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.4}
          aria-hidden="true"
        />
      )}
    </>
  );

  return (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  );
}
