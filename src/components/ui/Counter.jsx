import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCountUp } from '../../hooks';

/**
 * Animated statistic value.
 *
 * - value = number  → counts up in view
 * - value = null    → renders the "XX" placeholder (never invents figures)
 */
export default function Counter({ value, suffix = '', placeholder = false, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const isPlaceholder = placeholder || value == null;
  const count = useCountUp(isPlaceholder ? null : value, { duration: 1900, start: inView });

  return (
    <span ref={ref} className={className} aria-label={isPlaceholder ? 'Placeholder value' : undefined}>
      {isPlaceholder ? (
        <span className="tabular-nums opacity-90">XX</span>
      ) : (
        <span className="tabular-nums">{count}</span>
      )}
      {suffix && <span className="text-gradient-dark">{suffix}</span>}
    </span>
  );
}
