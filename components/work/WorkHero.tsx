'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Aurora from '@/components/ai/Aurora';
import { projects } from '@/data/projects';
import PlateBackdrop from '@/components/media/PlateBackdrop';
import { routePlate } from '@/data/visuals';

const LINES = [
  { text: 'THINGS', accent: false },
  { text: "I'VE HELPED", accent: false },
  { text: 'BRING TO LIFE.', accent: true },
];

export default function WorkHero() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? projects.length : 0);

  // Short count-up to the real project number. Never a fabricated figure.
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * projects.length));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    const delay = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 700);
    return () => {
      window.clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <section className="ai-noise relative flex min-h-[92svh] items-center overflow-hidden pt-32 pb-16 md:pt-36">
      <PlateBackdrop src={routePlate.work} treatment="backdrop" priority />
      <Aurora
        blobs={[
          {
            color:
              'radial-gradient(circle, rgba(47,91,255,0.3), rgba(47,91,255,0) 70%)',
            className:
              'left-[-14%] top-[-4%] h-[50vw] w-[50vw] min-h-[320px] min-w-[320px]',
            anim: 'aurora-a',
          },
          {
            color:
              'radial-gradient(circle, rgba(124,58,237,0.24), rgba(124,58,237,0) 70%)',
            className:
              'right-[-10%] bottom-[-6%] h-[44vw] w-[44vw] min-h-[300px] min-w-[300px]',
            anim: 'aurora-b',
          },
        ]}
      />

      <div className="container-x relative z-10 w-full">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-9 font-mono text-[10.5px] tracking-[0.26em] text-faint uppercase"
        >
          Selected work · 2026
        </motion.p>

        <h1 className="text-[clamp(2.6rem,9.4vw,8.5rem)] leading-[0.88] font-medium tracking-[-0.055em]">
          <span className="sr-only">Things I&rsquo;ve helped bring to life.</span>
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

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-xl text-[17px] leading-relaxed text-muted md:text-xl">
            Digital experiences, websites and business platforms built through
            Qyverix.
          </p>

          <p className="flex items-baseline gap-3">
            <span className="text-[clamp(3rem,9vw,6.5rem)] leading-none font-medium tracking-[-0.05em] text-fg tabular-nums">
              {String(count).padStart(2, '0')}
            </span>
            <span className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
              Projects
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
