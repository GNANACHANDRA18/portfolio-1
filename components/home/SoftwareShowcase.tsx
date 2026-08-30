'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import Magnetic from '@/components/ai/Magnetic';
import { softwareSnippets, softwareStages } from '@/data/home';

export default function SoftwareShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(
      softwareStages.length - 1,
      Math.floor(v * softwareStages.length),
    );
    setStage((prev) => (prev === next ? prev : next));
  });

  const current = softwareStages[stage];

  return (
    <div ref={ref} className="relative h-[340vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-x w-full">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
            <div>
              <p className="mb-6 font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
                01 / Software
              </p>
              <h2 className="text-[clamp(2rem,6.2vw,5rem)] leading-[0.94] font-medium tracking-[-0.05em]">
                <span className="sr-only">From idea to product.</span>
                {['FROM IDEA', 'TO PRODUCT.'].map((line, i) => (
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
            </div>

            <Magnetic className="hidden md:inline-block">
              <Link
                href="/development"
                data-cursor="magnet"
                className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-elev/70 px-6 py-3.5 font-mono text-[11px] tracking-[0.16em] text-fg uppercase backdrop-blur-md transition-colors duration-300 hover:border-accent/60"
              >
                Explore development
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </Link>
            </Magnetic>
          </div>

          {/* Browser window */}
          <div className="overflow-hidden rounded-2xl border border-line bg-elev shadow-[0_40px_110px_-52px_rgba(0,0,0,0.85)]">
            <div className="flex items-center gap-3 border-b border-line bg-elev/70 px-4 py-3">
              <span aria-hidden className="flex gap-1.5">
                {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                  <span
                    key={c}
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: c }}
                  />
                ))}
              </span>
              <span className="ml-2 truncate rounded-md border border-line bg-elev px-3 py-1 font-mono text-[11px] text-faint">
                {current.label.toLowerCase()} — in progress
              </span>
              <span className="ml-auto hidden font-mono text-[10px] tracking-[0.16em] text-faint uppercase sm:block">
                {String(stage + 1).padStart(2, '0')} /{' '}
                {String(softwareStages.length).padStart(2, '0')}
              </span>
            </div>

            {/* Stage strip */}
            <ol className="flex items-stretch gap-px overflow-x-auto border-b border-line bg-line">
              {softwareStages.map((s, i) => {
                const isActive = i === stage;
                const done = i < stage;
                return (
                  <li key={s.label} className="min-w-[110px] flex-1">
                    <div
                      className={`flex h-full flex-col items-center justify-center gap-1.5 px-3 py-4 transition-colors duration-500 ${
                        isActive ? 'bg-raised' : 'bg-elev/60'
                      }`}
                    >
                      <span
                        className={`font-mono text-[10.5px] tracking-[0.16em] transition-colors duration-500 ${
                          isActive
                            ? 'text-accent'
                            : done
                              ? 'text-muted'
                              : 'text-faint'
                        }`}
                      >
                        {s.label}
                      </span>
                      <span
                        className={`h-px w-full transition-all duration-500 ${
                          isActive
                            ? 'bg-accent'
                            : done
                              ? 'bg-line-strong'
                              : 'bg-transparent'
                        }`}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="grid gap-0 md:grid-cols-[1fr_1fr]">
              <div className="border-b border-line p-7 md:border-r md:border-b-0 md:p-10">
                <motion.div
                  key={current.label}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-mono text-[10.5px] tracking-[0.2em] text-accent uppercase">
                    Stage {String(stage + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-4 text-[clamp(1.7rem,4vw,3rem)] leading-none font-medium tracking-[-0.04em] text-fg">
                    {current.label}
                  </p>
                  <p className="mt-5 max-w-sm text-[15.5px] leading-relaxed text-muted">
                    {current.note}
                  </p>
                </motion.div>
              </div>

              <div className="relative min-h-[220px] p-7 md:p-10">
                <pre className="overflow-x-auto font-mono text-[12.5px] leading-relaxed text-muted">
                  {softwareSnippets[current.label].map((row, i) => (
                    <motion.span
                      key={row}
                      className="block whitespace-pre"
                      initial={reduce ? false : { opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.08 + i * 0.07 }}
                    >
                      {row}
                    </motion.span>
                  ))}
                </pre>

                {!reduce && (
                  <motion.span
                    aria-hidden
                    className="absolute right-7 bottom-7 h-2 w-2 rounded-full bg-ai-cyan"
                    animate={{ opacity: [1, 0.15, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                )}
              </div>
            </div>
          </div>

          <p className="mt-5 text-center font-mono text-[10px] tracking-[0.16em] text-faint uppercase md:hidden">
            <Link href="/development" className="underline underline-offset-4">
              Explore development ↗
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
