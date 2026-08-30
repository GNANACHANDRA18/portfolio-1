'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ctaOptions } from '@/data/ai-page';
import Aurora from './Aurora';
import Magnetic from './Magnetic';

export default function AIFinalCTA() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const current = ctaOptions.find((o) => o.id === hovered);

  return (
    <section className="ai-noise relative overflow-hidden py-28 md:py-40">
      <Aurora
        blobs={[
          {
            color:
              'radial-gradient(circle, rgba(59,91,255,0.5), rgba(59,91,255,0) 70%)',
            className: 'left-[-8%] top-[6%] h-[42vw] w-[42vw] min-h-[280px] min-w-[280px]',
            anim: 'aurora-a',
          },
          {
            color:
              'radial-gradient(circle, rgba(229,57,155,0.45), rgba(229,57,155,0) 70%)',
            className: 'right-[-6%] bottom-[4%] h-[40vw] w-[40vw] min-h-[260px] min-w-[260px]',
            anim: 'aurora-b',
          },
          {
            color:
              'radial-gradient(circle, rgba(6,182,212,0.4), rgba(6,182,212,0) 70%)',
            className: 'left-[38%] top-[30%] h-[34vw] w-[34vw] min-h-[240px] min-w-[240px]',
            anim: 'aurora-c',
          },
        ]}
      />

      {/* Tint follows whichever option is hovered. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{
          background: current
            ? `radial-gradient(60% 55% at 50% 45%, color-mix(in oklab, ${current.tint} 16%, transparent), transparent 72%)`
            : 'transparent',
        }}
        transition={{ duration: 0.6 }}
      />

      <div className="container-x relative text-center">
        <h2 className="mx-auto max-w-5xl text-[clamp(2.2rem,7.4vw,6rem)] leading-[0.96] font-medium tracking-[-0.05em]">
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span
              className="block text-fg"
              initial={reduce ? false : { y: '110%' }}
              whileInView={reduce ? undefined : { y: '0%' }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              WHAT SHOULD WE
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span
              className="ai-spectrum block"
              initial={reduce ? false : { y: '110%' }}
              whileInView={reduce ? undefined : { y: '0%' }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              BUILD NEXT?
            </motion.span>
          </span>
        </h2>

        <ul
          className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-3"
          onMouseLeave={() => setHovered(null)}
        >
          {ctaOptions.map((option, i) => (
            <motion.li
              key={option.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
            >
              <Link
                href={`/contact?topic=${option.id}`}
                data-cursor="orb"
                onMouseEnter={() => setHovered(option.id)}
                onFocus={() => setHovered(option.id)}
                className="group relative block overflow-hidden rounded-full border border-line bg-elev/70 px-6 py-3.5 font-mono text-[11.5px] tracking-[0.16em] text-muted uppercase backdrop-blur-md transition-all duration-400 hover:-translate-y-1 hover:text-fg"
                style={
                  hovered === option.id
                    ? {
                        borderColor: `color-mix(in oklab, ${option.tint} 55%, transparent)`,
                      }
                    : undefined
                }
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(120deg, color-mix(in oklab, ${option.tint} 16%, transparent), transparent 70%)`,
                  }}
                />
                {option.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <Link
              href="/contact"
              data-cursor="magnet"
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-7 py-4 text-[15px] font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start a Conversation
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </Magnetic>

          <Magnetic>
            <Link
              href="/work"
              data-cursor="magnet"
              className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-elev/70 px-7 py-4 text-[15px] text-fg backdrop-blur-md transition-colors duration-300 hover:border-ai-violet/50"
            >
              Explore My Work
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </Magnetic>
        </div>

        <p className="mt-12 font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase">
          AI Practitioner · AI-Powered Developer · AI Workflow Builder
        </p>
      </div>
    </section>
  );
}
