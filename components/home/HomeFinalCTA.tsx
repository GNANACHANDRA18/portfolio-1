'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Aurora from '@/components/ai/Aurora';
import Magnetic from '@/components/ai/Magnetic';
import IntelligenceField from './IntelligenceField';
import { site } from '@/data/site';

export default function HomeFinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="ai-noise relative flex min-h-[92svh] items-center overflow-hidden py-28 md:py-36">
      <Aurora
        blobs={[
          {
            color:
              'radial-gradient(circle, rgba(47,91,255,0.38), rgba(47,91,255,0) 70%)',
            className:
              'left-[-10%] top-[4%] h-[46vw] w-[46vw] min-h-[300px] min-w-[300px]',
            anim: 'aurora-a',
          },
          {
            color:
              'radial-gradient(circle, rgba(229,57,155,0.3), rgba(229,57,155,0) 70%)',
            className:
              'right-[-8%] bottom-[2%] h-[44vw] w-[44vw] min-h-[280px] min-w-[280px]',
            anim: 'aurora-b',
          },
          {
            color:
              'radial-gradient(circle, rgba(6,182,212,0.28), rgba(6,182,212,0) 70%)',
            className:
              'left-[34%] top-[26%] h-[36vw] w-[36vw] min-h-[240px] min-w-[240px]',
            anim: 'aurora-c',
          },
        ]}
      />

      {/* Subtle particle movement behind the type. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
        <IntelligenceField />
      </div>

      <div className="container-x relative text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 font-mono text-[11px] tracking-[0.26em] text-faint uppercase"
        >
          Let&rsquo;s work together
        </motion.p>

        <h2 className="mx-auto max-w-5xl text-[clamp(2.4rem,9vw,8rem)] leading-[0.9] font-medium tracking-[-0.055em]">
          <span className="sr-only">Have an idea? Let&rsquo;s build it.</span>
          {[
            { text: 'HAVE AN IDEA?', accent: false },
            { text: "LET'S BUILD IT.", accent: true },
          ].map((line, i) => (
            <span
              key={line.text}
              aria-hidden
              className="block overflow-hidden pb-[0.06em]"
            >
              <motion.span
                className={`block ${line.accent ? 'ai-spectrum' : 'text-fg'}`}
                initial={reduce ? false : { y: '112%' }}
                whileInView={reduce ? undefined : { y: '0%' }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{
                  duration: 1.05,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 flex flex-wrap justify-center gap-3"
        >
          <Magnetic>
            <Link
              href="/contact"
              data-cursor="magnet"
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-8 py-4 font-mono text-[11.5px] tracking-[0.16em] text-bg uppercase transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start a conversation
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
              href="/work"
              data-cursor="magnet"
              className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-elev/70 px-8 py-4 font-mono text-[11.5px] tracking-[0.16em] text-fg uppercase backdrop-blur-md transition-colors duration-300 hover:border-accent/60"
            >
              View all work
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </Link>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.16em] text-muted"
        >
          <a
            href={`tel:${site.phone.tel}`}
            className="transition-colors hover:text-accent"
          >
            {site.phone.display}
          </a>
          <span aria-hidden className="h-1 w-1 rounded-full bg-line-strong" />
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            {site.instagram.handle}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
