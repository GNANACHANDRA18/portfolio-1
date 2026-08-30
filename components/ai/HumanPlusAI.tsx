'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { humanFactors } from '@/data/ai-page';

const TERMS = ['AI', ...humanFactors];

export default function HumanPlusAI() {
  const reduce = useReducedMotion();

  return (
    <section className="ai-dark relative overflow-hidden py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 30%, rgba(124,58,237,0.22), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-70"
      />

      <div className="container-x relative">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center font-mono text-[11px] tracking-[0.24em] text-faint uppercase"
        >
          The equation
        </motion.p>

        <h2 className="mx-auto max-w-5xl text-center text-[clamp(1.8rem,5.6vw,4.4rem)] leading-[1.05] font-medium tracking-[-0.04em]">
          <span className="sr-only">
            AI plus strategy, creativity, context and verification equals better
            execution.
          </span>

          <span aria-hidden className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {TERMS.map((term, i) => (
              <span key={term} className="flex items-center gap-5">
                <motion.span
                  initial={reduce ? false : { opacity: 0, y: 24, filter: 'blur(10px)' }}
                  whileInView={
                    reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }
                  }
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.14,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={i === 0 ? 'ai-spectrum' : 'text-fg'}
                >
                  {term}
                </motion.span>

                {i < TERMS.length - 1 && (
                  <motion.span
                    initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                    whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5, delay: 0.08 + i * 0.14 }}
                    className="text-[0.55em] text-ai-violet"
                  >
                    ✳
                  </motion.span>
                )}
              </span>
            ))}
          </span>
        </h2>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.9,
            delay: TERMS.length * 0.14,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-16 text-center"
        >
          <span className="mb-6 block font-mono text-[26px] leading-none text-faint">
            =
          </span>
          <p className="ai-spectrum text-[clamp(2.2rem,8vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.05em]">
            BETTER EXECUTION
          </p>
        </motion.div>
      </div>
    </section>
  );
}
