import { motion, useReducedMotion } from 'framer-motion';
import {
  fadeUp,
  staggerContainer,
  motionVariants,
} from '../../lib/animation';

/**
 * Scroll-triggered fade-up reveal.
 *
 * <Reveal>                → single block
 * <Reveal stagger>        → children animate one after another
 * Respects prefers-reduced-motion automatically.
 */
export default function Reveal({
  children,
  as = 'div',
  stagger = false,
  delay = 0,
  y = 34,
  duration = 0.6,
  className,
  once = true,
  amount = 0.25,
  ...rest
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  const variants = stagger
    ? motionVariants(reduced, staggerContainer)
    : {
        hidden: reduced ? { opacity: 1 } : { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: reduced
            ? { duration: 0 }
            : { duration, ease: [0.16, 1, 0.3, 1], delay },
        },
      };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Convenience: reveal a single child item inside a <Reveal stagger> parent. */
export function RevealItem({ children, className, as = 'div', ...rest }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      variants={motionVariants(reduced, fadeUp)}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Image / media scale reveal — slight zoom-out as it enters.
 */
export function MediaReveal({ children, className, amount = 0.2 }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 1.06 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
