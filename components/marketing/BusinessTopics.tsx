'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { businessTopics } from '@/data/business';

const TINTS = [
  'var(--color-ai-blue)',
  'var(--color-ai-violet)',
  'var(--color-ai-cyan)',
  'var(--color-ai-yellow)',
];

/**
 * Subjects as large interactive words. Each opens a conceptual framework —
 * how the subject is structured, not a claim of results in it.
 */
export default function BusinessTopics() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const current = businessTopics.find((t) => t.label === active);
  const tint = current
    ? TINTS[businessTopics.indexOf(current) % TINTS.length]
    : TINTS[0];

  return (
    <div className="relative">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -inset-y-16"
        animate={{
          background: current
            ? `radial-gradient(58% 54% at 50% 45%, color-mix(in oklab, ${tint} 15%, transparent), transparent 72%)`
            : 'transparent',
        }}
        transition={{ duration: 0.6 }}
      />

      <ul
        className="relative flex flex-wrap items-baseline gap-x-6 gap-y-2 md:gap-x-9"
        onMouseLeave={() => setActive(null)}
      >
        {businessTopics.map((topic, i) => {
          const isActive = active === topic.label;
          return (
            <motion.li
              key={topic.label}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.03, 0.4) }}
            >
              <button
                type="button"
                data-cursor="explore"
                onMouseEnter={() => setActive(topic.label)}
                onFocus={() => setActive(topic.label)}
                onClick={() => setActive(isActive ? null : topic.label)}
                aria-pressed={isActive}
                className="block text-left"
              >
                <motion.span
                  animate={
                    reduce
                      ? undefined
                      : { scale: isActive ? 1.04 : 1, y: isActive ? -3 : 0 }
                  }
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="block origin-left text-[clamp(1.1rem,3.4vw,2.6rem)] leading-[1.06] font-medium tracking-[-0.04em] transition-colors duration-400"
                  style={{
                    color: isActive
                      ? TINTS[i % TINTS.length]
                      : 'var(--color-faint)',
                  }}
                >
                  {topic.label}
                </motion.span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      {/* Framework readout */}
      <div className="relative mt-12 min-h-[86px] border-t border-line pt-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={current?.label ?? 'idle'}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {current ? (
              <>
                <p
                  className="font-mono text-[10.5px] tracking-[0.2em] uppercase"
                  style={{ color: tint }}
                >
                  {current.label}
                </p>
                <ul className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3">
                  {current.chain.map((step, i) => (
                    <motion.li
                      key={step}
                      initial={reduce ? false : { opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 + i * 0.06 }}
                      className="flex items-center gap-2"
                    >
                      <span className="rounded-lg border border-line bg-elev px-3.5 py-2 text-[14px] text-fg">
                        {step}
                      </span>
                      {i < current.chain.length - 1 && (
                        <span aria-hidden className="text-faint">
                          &rarr;
                        </span>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-[15px] text-faint">
                Hover a subject to see how it is structured.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-8 font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
        Conceptual frameworks · not claims of results
      </p>
    </div>
  );
}
