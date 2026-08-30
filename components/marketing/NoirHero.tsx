'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import BusinessEcosystem from './BusinessEcosystem';
import { heroMorph } from '@/data/business';
import { site } from '@/data/site';

const LINES = [
  { text: 'I THINK', accent: false },
  { text: 'BEYOND', accent: false },
  { text: 'MARKETING.', accent: true },
];

export default function NoirHero() {
  const reduce = useReducedMotion();
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setWord((i) => (i + 1) % heroMorph.length),
      1800,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section className="noir-grain relative flex min-h-[104svh] items-center overflow-hidden pt-32 pb-20 md:pt-36">
      <div aria-hidden className="noir-grid pointer-events-none absolute inset-0" />

      {/* Ecosystem sits behind the type on small screens, beside it on large. */}
      <div className="pointer-events-none absolute inset-0 opacity-45 lg:pointer-events-auto lg:left-auto lg:h-full lg:w-[52%] lg:opacity-100">
        <BusinessEcosystem className="h-full w-full" />
      </div>

      <div className="container-x relative z-10 w-full">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-9 font-mono text-[10.5px] tracking-[0.26em] text-faint uppercase"
        >
          04 / Marketing + Business
        </motion.p>

        <h1 className="text-[clamp(2.8rem,10vw,9rem)] leading-[0.86] font-medium tracking-[-0.055em]">
          <span className="sr-only">I think beyond marketing.</span>
          {LINES.map((line, i) => (
            <span
              key={line.text}
              aria-hidden
              className="block overflow-hidden pb-[0.06em]"
            >
              <motion.span
                className={`block ${line.accent ? 'ai-spectrum' : 'text-fg'}`}
                initial={reduce ? false : { y: '114%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 1.1,
                  delay: 0.24 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
          className="mt-11 flex items-baseline gap-4"
        >
          <span className="font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase">
            I think about
          </span>
          <span className="relative inline-flex h-[1.15em] min-w-[10ch] items-baseline overflow-hidden text-[clamp(1.4rem,4vw,2.8rem)] leading-none font-medium tracking-[-0.04em]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={heroMorph[word]}
                className="ai-spectrum absolute inset-x-0"
                initial={
                  reduce ? false : { y: '105%', filter: 'blur(8px)', opacity: 0 }
                }
                animate={{ y: '0%', filter: 'blur(0px)', opacity: 1 }}
                exit={
                  reduce
                    ? undefined
                    : { y: '-105%', filter: 'blur(8px)', opacity: 0 }
                }
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {heroMorph[word]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-xl text-[17px] leading-relaxed text-muted md:text-xl"
        >
          I work at the intersection of marketing, business, technology and
          client experience.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.95 }}
          className="mt-11 border-t border-line pt-6"
        >
          <p className="font-mono text-[12px] tracking-[0.18em] text-fg uppercase">
            {site.shortName}
          </p>
          <p className="mt-2 font-mono text-[10.5px] tracking-[0.16em] text-accent uppercase">
            CMO · Marketing · Brand · Client Success
          </p>
        </motion.div>
      </div>
    </section>
  );
}
