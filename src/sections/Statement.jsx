import { motion, useReducedMotion } from 'framer-motion';
import roboImg from '../assets/robo2.png';
import { EASE } from '../lib/animation';

const STATEMENT_LINES = [
  { text: "WE DON'T JUST", color: 'text-[#0f1117]' },
  { text: 'WRITE CODE.', color: 'text-[#8e95a5]' },
  { text: 'WE BUILD DIGITAL', color: 'text-[#ff5500]' },
  { text: 'SYSTEMS THAT HELP', color: 'text-[#ff5500]' },
  { text: 'BUSINESSES GROW', color: 'text-[#0f1117]' },
];

/**
 * Statement / Our Philosophy section with robo2.png as background.
 */
export default function Statement() {
  const reduced = useReducedMotion();

  return (
    <section
      id="statement"
      className="relative isolate overflow-hidden bg-white py-20 sm:py-28 lg:py-36 min-h-[500px] sm:min-h-[580px] lg:min-h-[660px] flex items-center"
      aria-labelledby="statement-title"
    >
      {/* robo2.png background image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={roboImg}
          alt="AI Robot Coding Background"
          className="h-full w-full object-cover object-right select-none"
        />
        {/* soft white gradient on left to ensure clean contrast for philosophy text */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent sm:via-white/70 lg:w-[60%]" />
      </div>

      <div className="container-page relative w-full">
        <div className="max-w-xl lg:max-w-2xl">
          <motion.p
            className="eyebrow mb-7 inline-flex items-center text-xs font-bold uppercase tracking-[0.22em] text-[#0f1117]/70"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
          >
            <span className="eyebrow-dot mr-2.5" aria-hidden="true" />
            OUR PHILOSOPHY
          </motion.p>

          <h2
            id="statement-title"
            className="font-display text-[clamp(2.4rem,5.6vw,4.8rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em]"
            aria-label="We don't just write code. We build digital systems that help businesses grow."
          >
            {STATEMENT_LINES.map((line, i) => (
              <span
                key={line.text}
                className="block overflow-hidden pb-[0.04em] -mb-[0.04em]"
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
                    className={`block ${line.color}`}
                    variants={{
                      hidden: reduced ? { y: 0, opacity: 1 } : { y: '112%' },
                      visible: {
                        y: '0%',
                        transition: reduced
                          ? { duration: 0 }
                          : {
                              duration: 0.85,
                              ease: EASE,
                              delay: i * 0.08,
                            },
                      },
                    }}
                  >
                    {line.text}
                  </motion.span>
                </motion.span>
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
