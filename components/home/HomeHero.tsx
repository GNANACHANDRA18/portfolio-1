'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import IntelligenceField from './IntelligenceField';
import Aurora from '@/components/ai/Aurora';
import Magnetic from '@/components/ai/Magnetic';
import { site } from '@/data/site';

const LINES = [
  { text: 'I BUILD', accent: false },
  { text: "WHAT'S NEXT.", accent: true },
];

const DISCIPLINES = ['AI', 'SOFTWARE', 'MARKETING', 'CREATIVITY'];

export default function HomeHero() {
  const reduce = useReducedMotion();

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="ai-noise relative flex min-h-[104svh] items-center overflow-hidden pt-32 pb-20 md:pt-36">
      <Aurora
        blobs={[
          {
            color:
              'radial-gradient(circle, rgba(47,91,255,0.34), rgba(47,91,255,0) 70%)',
            className:
              'left-[-16%] top-[-6%] h-[54vw] w-[54vw] min-h-[340px] min-w-[340px]',
            anim: 'aurora-a',
          },
          {
            color:
              'radial-gradient(circle, rgba(124,58,237,0.26), rgba(124,58,237,0) 70%)',
            className:
              'right-[-12%] top-[14%] h-[46vw] w-[46vw] min-h-[300px] min-w-[300px]',
            anim: 'aurora-b',
          },
          {
            color:
              'radial-gradient(circle, rgba(6,182,212,0.26), rgba(6,182,212,0) 70%)',
            className:
              'bottom-[-16%] left-[32%] h-[42vw] w-[42vw] min-h-[280px] min-w-[280px]',
            anim: 'aurora-c',
          },
        ]}
      />

      {/* Digital intelligence field */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-90">
        <IntelligenceField />
      </div>

      <div aria-hidden className="ai-grid pointer-events-none absolute inset-0" />

      <div className="container-x relative z-10 w-full">
        <motion.p
          {...fade(0.12)}
          className="mb-9 font-mono text-[10.5px] tracking-[0.28em] text-faint uppercase"
        >
          {site.name}
        </motion.p>

        <h1 className="max-w-[14ch] text-[clamp(2.9rem,10.5vw,9.5rem)] leading-[0.86] font-medium tracking-[-0.055em]">
          <span className="sr-only">
            Chebolu Gnanachandra (Gnana Chandra) — software developer, AI
            practitioner and CMO. I build what&rsquo;s next.
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
                  duration: 1.15,
                  delay: 0.26 + i * 0.13,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Disciplines */}
        <motion.ul
          {...fade(0.66)}
          className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          {DISCIPLINES.map((word, i) => (
            <li key={word} className="flex items-center gap-4">
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.09 }}
                className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase"
              >
                {word}
              </motion.span>
              {i < DISCIPLINES.length - 1 && (
                <span aria-hidden className="h-1 w-1 rounded-full bg-line-strong" />
              )}
            </li>
          ))}
        </motion.ul>

        <motion.p
          {...fade(0.76)}
          className="mt-9 max-w-xl text-[17px] leading-relaxed text-muted md:text-xl"
        >
          Software developer and CMO building digital experiences, AI-powered
          workflows and brands that move businesses forward.
        </motion.p>

        <motion.div {...fade(0.86)} className="mt-12 flex flex-wrap gap-3">
          <Magnetic>
            <Link
              href="/work"
              data-cursor="view"
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-7 py-4 font-mono text-[11.5px] tracking-[0.16em] text-bg uppercase transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore my work
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </Link>
          </Magnetic>

          <Magnetic>
            <Link
              href="/ai"
              data-cursor="ai"
              className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-elev/70 px-7 py-4 font-mono text-[11.5px] tracking-[0.16em] text-fg uppercase backdrop-blur-md transition-colors duration-300 hover:border-accent/60"
            >
              Enter AI lab
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
