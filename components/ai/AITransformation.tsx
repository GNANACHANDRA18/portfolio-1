'use client';

import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { transformStages } from '@/data/ai-page';

const N = 28;

/** Deterministic jitter so server and client render the same layout. */
const rand = (i: number, salt: number) => {
  const v = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

/** Six arrangements of the same 28 points, one per stage. */
const LAYOUTS: Record<string, (i: number) => { x: number; y: number }> = {
  // Scattered — an unformed question.
  question: (i) => ({ x: 8 + rand(i, 1) * 84, y: 8 + rand(i, 2) * 84 }),
  // Ordered grid — context assembled.
  context: (i) => ({ x: 14 + (i % 7) * 12, y: 22 + Math.floor(i / 7) * 18 }),
  // Ring — the model turning it over.
  ai: (i) => ({
    x: 50 + Math.cos((i / N) * Math.PI * 2) * 32,
    y: 50 + Math.sin((i / N) * Math.PI * 2) * 32,
  }),
  // Four clusters — reaching out to tools.
  tools: (i) => {
    const c = i % 4;
    const cx = [24, 76, 24, 76][c];
    const cy = [26, 26, 74, 74][c];
    return { x: cx + (rand(i, 3) - 0.5) * 22, y: cy + (rand(i, 4) - 0.5) * 22 };
  },
  // Funnel — everything narrowing through one gate.
  judgment: (i) => {
    const t = i / (N - 1);
    return { x: 50 + (rand(i, 5) - 0.5) * (74 - t * 68), y: 12 + t * 76 };
  },
  // Tight core — a single decided result.
  result: (i) => ({
    x: 50 + Math.cos((i / N) * Math.PI * 2) * (7 + rand(i, 6) * 5),
    y: 50 + Math.sin((i / N) * Math.PI * 2) * (7 + rand(i, 6) * 5),
  }),
};

const TINTS = [
  'var(--color-ai-cyan)',
  'var(--color-ai-blue)',
  'var(--color-ai-violet)',
  'var(--color-ai-magenta)',
  'var(--color-ai-yellow)',
  'var(--color-ai-blue)',
];

export default function AITransformation() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(
      transformStages.length - 1,
      Math.floor(v * transformStages.length),
    );
    setStage((prev) => (prev === next ? prev : next));
  });

  const current = transformStages[stage];
  const layout = LAYOUTS[current.id];

  return (
    <div ref={ref} className="relative h-[560vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-x grid w-full gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          {/* Stage list + copy */}
          <div>
            <p className="mb-8 font-mono text-[11px] tracking-[0.22em] text-faint uppercase">
              Scroll-driven · Stage {String(stage + 1).padStart(2, '0')} /{' '}
              {String(transformStages.length).padStart(2, '0')}
            </p>

            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={reduce ? false : { opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={reduce ? undefined : { opacity: 0, y: -16, filter: 'blur(8px)' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="ai-spectrum text-[clamp(2.2rem,6.4vw,5rem)] leading-[0.95] font-medium tracking-[-0.045em]">
                    {current.label}
                  </h3>
                  <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted md:text-xl">
                    {current.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <ol className="mt-10 flex flex-wrap gap-1.5">
              {transformStages.map((s, i) => (
                <li key={s.id}>
                  <span
                    className={`block h-1 rounded-full transition-all duration-500 ${
                      i === stage
                        ? 'w-14 bg-ai-violet'
                        : i < stage
                          ? 'w-7 bg-line-strong'
                          : 'w-7 bg-line'
                    }`}
                  />
                </li>
              ))}
            </ol>

            <p className="mt-5 font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
              {transformStages.map((s) => s.label).join(' · ')}
            </p>
          </div>

          {/* Morphing point cloud */}
          <div className="relative aspect-square w-full max-w-[520px] justify-self-center">
            <div
              aria-hidden
              className="aurora aurora-b absolute inset-[12%]"
              style={{
                background: `radial-gradient(circle, color-mix(in oklab, ${TINTS[stage]} 45%, transparent), transparent 70%)`,
              }}
            />
            <svg viewBox="0 0 100 100" className="relative h-full w-full">
              {Array.from({ length: N }, (_, i) => {
                const pos = layout(i);
                return (
                  <motion.circle
                    key={i}
                    r={1.5}
                    fill={TINTS[stage]}
                    initial={false}
                    animate={{ cx: pos.x, cy: pos.y, opacity: 0.85 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            type: 'spring',
                            stiffness: 90,
                            damping: 18,
                            delay: (i % 7) * 0.014,
                          }
                    }
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
