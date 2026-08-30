'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { principles } from '@/data/about';

/** Five statements, each taking most of the viewport as it arrives. */
export default function Principles() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <h2 className="mb-16 text-[clamp(2rem,6.4vw,5rem)] leading-[0.94] font-medium tracking-[-0.05em] text-fg md:mb-24">
          HOW I THINK.
        </h2>
      </div>

      {principles.map((p, i) => (
        <div
          key={p.n}
          className="flex min-h-[62svh] items-center border-t border-line md:min-h-[76svh]"
        >
          <div className="container-x">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mb-8 font-mono text-[11px] tracking-[0.24em] text-faint"
            >
              {p.n}
            </motion.p>

            <h3 className="text-[clamp(1.9rem,7.4vw,6rem)] leading-[0.94] font-medium tracking-[-0.05em]">
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span
                  className={`block ${i === principles.length - 1 ? 'ai-spectrum' : 'text-fg'}`}
                  initial={reduce ? false : { y: '112%' }}
                  whileInView={reduce ? undefined : { y: '0%' }}
                  viewport={{ once: true, margin: '-90px' }}
                  transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  {p.title}
                </motion.span>
              </span>
            </h3>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-xl text-[17px] leading-relaxed text-muted md:text-xl"
            >
              {p.body}
            </motion.p>
          </div>
        </div>
      ))}
    </section>
  );
}
