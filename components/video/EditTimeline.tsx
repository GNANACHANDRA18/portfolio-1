'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';

const STAGES = [
  { label: 'CONCEPT', note: 'The idea, and the reason anyone would watch.' },
  { label: 'CUT', note: 'Structure and rhythm. Most of the work is here.' },
  { label: 'MOTION', note: 'Type, transitions and movement with intent.' },
  { label: 'SOUND', note: 'Music and mix — half the emotion of any edit.' },
  { label: 'FINAL', note: 'Graded, exported, delivered for its platform.' },
];

/** A scrubbing edit timeline; the playhead is driven by scroll. */
export default function EditTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(STAGES.length - 1, Math.floor(v * STAGES.length));
    setStage((prev) => (prev === next ? prev : next));
  });

  if (reduce) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {STAGES.map((s, i) => (
          <div
            key={s.label}
            className="rounded-2xl border border-line bg-surface/70 p-5"
          >
            <span className="font-mono text-[10px] tracking-[0.16em] text-faint">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="mt-3 font-mono text-[12px] tracking-[0.14em] text-fg uppercase">
              {s.label}
            </p>
            <p className="mt-2 text-[13px] text-muted">{s.note}</p>
          </div>
        ))}
      </div>
    );
  }

  const current = STAGES[stage];

  return (
    <div ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-x w-full">
          <p className="mb-8 font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
            Timeline · {String(stage + 1).padStart(2, '0')} /{' '}
            {String(STAGES.length).padStart(2, '0')}
          </p>

          <div className="overflow-hidden rounded-3xl border border-line bg-surface">
            {/* Programme monitor */}
            <div className="relative aspect-[16/7] bg-elev">
              <motion.div
                key={current.label}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 grid place-items-center"
                style={{
                  background: [
                    'linear-gradient(120deg, rgba(47,91,255,0.14), rgba(124,58,237,0.10))',
                    'linear-gradient(120deg, rgba(124,58,237,0.14), rgba(229,57,155,0.10))',
                    'linear-gradient(120deg, rgba(229,57,155,0.14), rgba(255,197,61,0.10))',
                    'linear-gradient(120deg, rgba(255,197,61,0.14), rgba(6,182,212,0.10))',
                    'linear-gradient(120deg, rgba(6,182,212,0.14), rgba(47,91,255,0.10))',
                  ][stage],
                }}
              >
                <span className="ai-spectrum text-[clamp(1.8rem,6vw,5rem)] leading-none font-medium tracking-[-0.05em]">
                  {current.label}
                </span>
              </motion.div>

              <span className="absolute top-4 left-5 font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                Programme
              </span>
            </div>

            {/* Tracks */}
            <div className="relative border-t border-line p-5 md:p-7">
              <div className="space-y-2.5">
                {['V2', 'V1', 'A1'].map((track, ti) => (
                  <div key={track} className="flex items-center gap-3">
                    <span className="w-7 shrink-0 font-mono text-[9.5px] tracking-[0.14em] text-faint">
                      {track}
                    </span>
                    <div className="flex h-7 flex-1 gap-1.5">
                      {STAGES.map((s, i) => (
                        <motion.span
                          key={s.label}
                          animate={{
                            opacity: i <= stage ? 1 : 0.25,
                            scaleY: i === stage ? 1 : 0.82,
                          }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className={`flex-1 rounded-md ${
                            ti === 2
                              ? 'bg-ai-cyan/35'
                              : ti === 1
                                ? 'bg-ai-violet/35'
                                : 'bg-ai-magenta/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Playhead */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-4 w-px bg-fg"
                style={{ left: `calc(2.75rem + ${(stage + 0.5) * (100 / STAGES.length)}%)` }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            </div>

            {/* Labels */}
            <ol className="grid grid-cols-5 gap-px border-t border-line bg-line">
              {STAGES.map((s, i) => (
                <li
                  key={s.label}
                  className={`bg-surface px-3 py-4 text-center transition-colors duration-500 ${
                    i === stage ? 'bg-elev' : ''
                  }`}
                >
                  <span
                    className={`font-mono text-[9.5px] tracking-[0.14em] uppercase transition-colors duration-500 ${
                      i === stage ? 'text-accent' : 'text-faint'
                    }`}
                  >
                    {s.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-muted">
            {current.note}
          </p>
        </div>
      </div>
    </div>
  );
}
