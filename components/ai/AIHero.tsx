'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import AIOrb from './AIOrb';
import Aurora from './Aurora';
import { heroKeywords } from '@/data/ai-page';

const LINES = [
  { text: 'I THINK WITH AI.', accent: false },
  { text: 'I BUILD WITH AI.', accent: true },
];

export default function AIHero() {
  const reduce = useReducedMotion();
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setWord((i) => (i + 1) % heroKeywords.length),
      1700,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section className="ai-noise relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 md:pt-28">
      <Aurora
        blobs={[
          {
            color:
              'radial-gradient(circle, rgba(59,91,255,0.55), rgba(59,91,255,0) 70%)',
            className: 'left-[-14%] top-[-8%] h-[52vw] w-[52vw] min-h-[320px] min-w-[320px]',
            anim: 'aurora-a',
          },
          {
            color:
              'radial-gradient(circle, rgba(229,57,155,0.42), rgba(229,57,155,0) 70%)',
            className: 'right-[-10%] top-[6%] h-[46vw] w-[46vw] min-h-[300px] min-w-[300px]',
            anim: 'aurora-b',
          },
          {
            color:
              'radial-gradient(circle, rgba(6,182,212,0.45), rgba(6,182,212,0) 70%)',
            className: 'bottom-[-18%] left-[24%] h-[44vw] w-[44vw] min-h-[280px] min-w-[280px]',
            anim: 'aurora-c',
          },
          {
            color:
              'radial-gradient(circle, rgba(255,197,61,0.34), rgba(255,197,61,0) 70%)',
            className: 'bottom-[4%] right-[16%] h-[26vw] w-[26vw] min-h-[200px] min-w-[200px]',
            anim: 'aurora-a',
            delay: '-8s',
          },
        ]}
      />

      <div aria-hidden className="ai-grid pointer-events-none absolute inset-0" />

      {/* Orb — behind the type on small screens, beside it on large. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 md:opacity-100 lg:left-auto lg:h-full lg:w-[52%]"
      >
        <AIOrb />
      </div>

      <div className="container-x relative z-10 w-full">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-elev/70 px-4 py-2 font-mono text-[10.5px] tracking-[0.2em] text-muted uppercase backdrop-blur-md"
        >
          <span aria-hidden className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ai-violet opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ai-violet" />
          </span>
          AI Practitioner · Software Developer · CMO
        </motion.p>

        <h1 className="max-w-[16ch] text-[clamp(2.6rem,9.2vw,8rem)] leading-[0.9] font-medium tracking-[-0.05em]">
          <span className="sr-only">I think with AI. I build with AI.</span>
          {LINES.map((line, li) => (
            <span
              key={line.text}
              aria-hidden
              className="block overflow-hidden pb-[0.06em]"
            >
              <motion.span
                className={`block ${line.accent ? 'ai-spectrum' : 'text-fg'}`}
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 1.1,
                  delay: 0.28 + li * 0.13,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 max-w-xl text-[17px] leading-relaxed text-muted md:text-xl"
        >
          Artificial intelligence isn&rsquo;t just another tool in my stack.
          It&rsquo;s becoming a layer across how I build, research, create and
          solve problems.
        </motion.p>

        {/* Keyword that keeps transforming. */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex items-baseline gap-4"
        >
          <span className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
            I use it to
          </span>
          <span className="relative inline-flex h-[1.15em] min-w-[7ch] items-baseline overflow-hidden text-[clamp(1.6rem,4.6vw,3.2rem)] leading-none font-medium tracking-[-0.04em]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={heroKeywords[word]}
                className="ai-spectrum absolute inset-x-0"
                initial={reduce ? false : { y: '105%', filter: 'blur(8px)', opacity: 0 }}
                animate={{ y: '0%', filter: 'blur(0px)', opacity: 1 }}
                exit={reduce ? undefined : { y: '-105%', filter: 'blur(8px)', opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {heroKeywords[word]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-16 flex items-center gap-3 font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase"
        >
          <motion.span
            aria-hidden
            className="block h-8 w-px bg-linear-to-b from-ai-violet to-transparent"
            animate={reduce ? undefined : { scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}
