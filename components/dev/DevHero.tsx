'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Aurora from '@/components/ai/Aurora';
import IntelligenceField from '@/components/home/IntelligenceField';
import { heroWords } from '@/data/development';

const WORDS = ['FROM', 'IDEA', 'TO', 'PRODUCT.'];

export default function DevHero() {
  const reduce = useReducedMotion();
  const [hot, setHot] = useState<string | null>(null);

  return (
    <section className="ai-noise relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20 md:pt-36">
      <Aurora
        blobs={[
          {
            color:
              'radial-gradient(circle, rgba(47,91,255,0.32), rgba(47,91,255,0) 70%)',
            className:
              'left-[-12%] top-[0%] h-[48vw] w-[48vw] min-h-[320px] min-w-[320px]',
            anim: 'aurora-a',
          },
          {
            color:
              'radial-gradient(circle, rgba(6,182,212,0.26), rgba(6,182,212,0) 70%)',
            className:
              'right-[-10%] bottom-[0%] h-[44vw] w-[44vw] min-h-[300px] min-w-[300px]',
            anim: 'aurora-b',
          },
        ]}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
        <IntelligenceField />
      </div>

      <div className="container-x relative w-full">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-9 font-mono text-[10.5px] tracking-[0.26em] text-faint uppercase"
        >
          Software / Engineering
        </motion.p>

        {/* One word per line, each arriving separately. */}
        <h1 className="text-[clamp(2.8rem,11vw,9.5rem)] leading-[0.84] font-medium tracking-[-0.055em]">
          <span className="sr-only">From idea to product.</span>
          {WORDS.map((word, i) => (
            <span
              key={word}
              aria-hidden
              className="block overflow-hidden pb-[0.05em]"
            >
              <motion.span
                className={`block ${i === WORDS.length - 1 ? 'ai-spectrum' : 'text-fg'}`}
                initial={reduce ? false : { y: '114%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 1.05,
                  delay: 0.22 + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-2xl text-[17px] leading-relaxed text-muted md:text-xl"
        >
          I build modern websites, digital experiences and software systems
          using technology, AI-assisted development and practical engineering.
        </motion.p>

        {/* Each word lifts as the pointer passes over it. */}
        <ul
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3"
          onMouseLeave={() => setHot(null)}
        >
          {heroWords.map((word, i) => (
            <motion.li
              key={word}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 + i * 0.07 }}
              onMouseEnter={() => setHot(word)}
              onFocus={() => setHot(word)}
              tabIndex={0}
              data-cursor="orb"
              className="cursor-default"
            >
              <motion.span
                animate={
                  reduce
                    ? undefined
                    : {
                        y: hot === word ? -6 : 0,
                        letterSpacing: hot === word ? '0.28em' : '0.2em',
                      }
                }
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`block font-mono text-[11px] uppercase transition-colors duration-300 ${
                  hot === word ? 'text-accent' : 'text-muted'
                }`}
              >
                {word}
              </motion.span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
