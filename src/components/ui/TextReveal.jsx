import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/animation';

/**
 * Masked text reveals.
 *
 * The overflow-hidden wrapper is always the scroll trigger — animating a
 * clipped child with `whileInView` never fires, because IntersectionObserver
 * treats clipped descendants as invisible.
 *
 * Accepts plain strings or objects: { text, accent }.
 */
export default function TextReveal({
  as: Tag = 'h2',
  lines = [],
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.07,
  duration = 0.85,
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[Tag] ?? motion.div;

  const normalized = lines.map((line) =>
    typeof line === 'string' ? { text: line, accent: false } : line
  );

  return (
    <MotionTag className={className} aria-label={normalized.map((l) => l.text).join(' ')}>
      {normalized.map((line, i) => (
        <span
          key={`${line.text}-${i}`}
          className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
          aria-hidden="true"
        >
          <motion.span
            className="block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={{ hidden: { y: 0 }, visible: { y: 0 } }}
            transition={{ duration: 0 }}
          >
            <motion.span
              className={`block ${line.accent ? 'text-gradient-brand' : ''} ${lineClassName}`}
              variants={{
                hidden: reduced ? { y: 0 } : { y: '110%' },
                visible: {
                  y: '0%',
                  transition: reduced
                    ? { duration: 0 }
                    : { duration, ease: EASE, delay: delay + i * stagger },
                },
              }}
            >
              {line.text}
            </motion.span>
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/**
 * Word-by-word reveal for supporting copy.
 */
export function WordReveal({
  as: Tag = 'p',
  text = '',
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.035,
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[Tag] ?? motion.p;
  const words = text.split(' ');

  return (
    <MotionTag className={className} aria-label={text}>
      <motion.span
        className="contents"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        aria-hidden="true"
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
          >
            <motion.span
              className={`inline-block ${wordClassName}`}
              variants={{
                hidden: reduced ? { y: 0, opacity: 1 } : { y: '105%', opacity: 0 },
                visible: {
                  y: '0%',
                  opacity: 1,
                  transition: reduced ? { duration: 0 } : { duration: 0.6, ease: EASE },
                },
              }}
            >
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </MotionTag>
  );
}
