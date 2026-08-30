'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Aurora from '@/components/ai/Aurora';

const LINES = [
  { text: "I DON'T FIT", accent: false },
  { text: 'INTO ONE', accent: false },
  { text: 'JOB TITLE.', accent: true },
];

export default function AboutHero() {
  const reduce = useReducedMotion();

  return (
    <section className="ai-noise relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20 md:pt-36">
      <Aurora
        blobs={[
          {
            color:
              'radial-gradient(circle, rgba(6,182,212,0.28), rgba(6,182,212,0) 70%)',
            className:
              'left-[-12%] top-[2%] h-[48vw] w-[48vw] min-h-[320px] min-w-[320px]',
            anim: 'aurora-a',
          },
          {
            color:
              'radial-gradient(circle, rgba(124,58,237,0.24), rgba(124,58,237,0) 70%)',
            className:
              'right-[-10%] bottom-[2%] h-[44vw] w-[44vw] min-h-[300px] min-w-[300px]',
            anim: 'aurora-b',
          },
        ]}
      />

      <div className="container-x relative w-full">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-9 font-mono text-[10.5px] tracking-[0.26em] text-faint uppercase"
        >
          About / Gnana Chandra
        </motion.p>

        <h1 className="text-[clamp(2.7rem,9.6vw,8.8rem)] leading-[0.88] font-medium tracking-[-0.055em]">
          <span className="sr-only">
            I don&rsquo;t fit into one job title. And that&rsquo;s the point.
          </span>
          {LINES.map((line, i) => (
            <span
              key={line.text}
              aria-hidden
              className="block overflow-hidden pb-[0.06em]"
            >
              <motion.span
                className={`block ${line.accent ? 'ai-spectrum' : 'text-fg'}`}
                initial={reduce ? false : { y: '112%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 1.1,
                  delay: 0.24 + i * 0.11,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Arrives a beat later, as the reply to the headline. */}
        <motion.p
          aria-hidden
          initial={reduce ? false : { opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-[clamp(1.1rem,3.2vw,2.4rem)] leading-tight font-medium tracking-[-0.035em] text-muted"
        >
          AND THAT&rsquo;S THE POINT.
        </motion.p>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 max-w-2xl text-[17px] leading-relaxed text-muted md:text-xl"
        >
          I&rsquo;m Gnana Chandra — a software developer, CMO and AI
          practitioner working where technology, business, marketing and
          creativity meet.
        </motion.p>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.5 }}
          className="mt-8 font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase"
        >
          Based in India · Building for the digital world
        </motion.p>
      </div>
    </section>
  );
}
