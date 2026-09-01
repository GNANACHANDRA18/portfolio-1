'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Magnetic from '@/components/ai/Magnetic';
import Media from '@/components/media/Media';
import { creativeAreas } from '@/data/home';

export default function CreativeTrio() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const current = creativeAreas.find((a) => a.id === active);

  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{
          background: current
            ? `radial-gradient(66% 58% at 50% 42%, color-mix(in oklab, ${current.tint} 13%, transparent), transparent 72%)`
            : 'radial-gradient(66% 58% at 50% 42%, rgba(47,91,255,0.04), transparent 72%)',
        }}
        transition={{ duration: 0.7 }}
      />

      <div className="container-x relative">
        <h2 className="max-w-4xl text-[clamp(1.9rem,5.6vw,4.6rem)] leading-[0.98] font-medium tracking-[-0.05em]">
          <span className="sr-only">
            Code isn&rsquo;t the only thing I create.
          </span>
          {["CODE ISN'T THE ONLY", 'THING I CREATE.'].map((line, i) => (
            <span
              key={line}
              aria-hidden
              className="block overflow-hidden pb-[0.05em]"
            >
              <motion.span
                className={`block ${i === 1 ? 'ai-spectrum' : 'text-fg'}`}
                initial={reduce ? false : { y: '112%' }}
                whileInView={reduce ? undefined : { y: '0%' }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{
                  duration: 1,
                  delay: i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <div
          className="mt-16 grid gap-4 md:grid-cols-3"
          onMouseLeave={() => setActive(null)}
        >
          {creativeAreas.map((area, i) => {
            const isActive = active === area.id;
            return (
              <motion.article
                key={area.id}
                initial={reduce ? false : { opacity: 0, y: 26 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={area.href}
                  data-cursor="orb"
                  onMouseEnter={() => setActive(area.id)}
                  onFocus={() => setActive(area.id)}
                  className="glass-panel glass-thin group relative block h-full overflow-hidden transition-transform duration-500 hover:-translate-y-1.5"
                  style={
                    isActive
                      ? {
                          borderColor: `color-mix(in oklab, ${area.tint} 45%, transparent)`,
                        }
                      : undefined
                  }
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(90% 70% at 50% 0%, color-mix(in oklab, ${area.tint} 14%, transparent), transparent 70%)`,
                    }}
                  />

                  {/* The area's own visual language, seen through the glass. */}
                  <span className="relative block aspect-[16/7] overflow-hidden">
                    <Media
                      src={area.plate}
                      alt=""
                      treatment="clean"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      inset
                      imageClassName="brightness-[1.35] opacity-[0.8] transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-bg"
                    />
                  </span>

                  <span className="relative block p-8 md:p-9">
                    <span
                      className="font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-500"
                      style={{ color: isActive ? area.tint : undefined }}
                    >
                      {area.label}
                    </span>

                    <span className="mt-6 block text-[clamp(1.5rem,3vw,2.1rem)] leading-tight font-medium tracking-[-0.035em] text-fg">
                      {area.line}
                    </span>

                    <span className="mt-4 block text-[14.5px] leading-relaxed text-muted">
                      {area.body}
                    </span>

                    <span className="mt-8 inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase transition-colors duration-400 group-hover:text-fg">
                      Explore
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        ↗
                      </span>
                    </span>
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12">
          <Magnetic>
            <Link
              href="/video-editing"
              data-cursor="magnet"
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-7 py-4 font-mono text-[11.5px] tracking-[0.16em] text-bg uppercase transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore creative work
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
