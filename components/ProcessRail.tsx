'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';

/**
 * A process, walked rather than listed.
 *
 * A six-step method printed as six bullets asks the reader to imagine the
 * sequence. This walks it for them: scrolling the section advances a rail,
 * the active step lights and its detail crossfades in, and the steps already
 * passed stay marked so the shape of the whole process is visible at any
 * point. Clicking or focusing a step jumps to it.
 *
 * Reduced motion renders every step and its detail at once — the same
 * information as a plain, complete list.
 */

export type ProcessStep = { step: string; detail: string };

export default function ProcessRail({
  steps,
  tint = 'var(--color-accent)',
}: {
  steps: readonly ProcessStep[];
  tint?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 72%', 'end 55%'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (pinned) return;
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive((prev) => (prev === next ? prev : next));
  });

  if (reduce) {
    return (
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.step} className="bg-surface/70 p-7">
            <span className="font-mono text-[10.5px] tracking-[0.18em] text-faint">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="mt-3 text-[17px] text-fg">{s.step}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.detail}</p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div ref={ref}>
      {/* Rail */}
      <ol className="relative flex flex-wrap gap-y-6 border-t border-line pt-8">
        {steps.map((s, i) => {
          const state = i === active ? 'now' : i < active ? 'past' : 'ahead';

          return (
            <li key={s.step} className="relative flex-1 basis-[136px] pr-4">
              <button
                type="button"
                data-cursor="explore"
                onClick={() => {
                  setPinned(true);
                  setActive(i);
                }}
                onFocus={() => {
                  setPinned(true);
                  setActive(i);
                }}
                className="block w-full text-left"
                aria-current={state === 'now' ? 'step' : undefined}
              >
                <span
                  aria-hidden
                  className="absolute -top-8 left-0 h-px w-full"
                  style={{
                    background:
                      state === 'ahead'
                        ? 'var(--color-line)'
                        : `color-mix(in oklab, ${tint} ${state === 'now' ? 100 : 45}%, transparent)`,
                    transition: 'background 600ms',
                  }}
                />

                <motion.span
                  aria-hidden
                  animate={{
                    scale: state === 'now' ? 1 : 0.55,
                    opacity: state === 'ahead' ? 0.35 : 1,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -top-[13px] left-0 block h-2.5 w-2.5 rounded-full"
                  style={{ background: tint }}
                />

                <span className="block font-mono text-[10px] tracking-[0.18em] text-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <motion.span
                  animate={{
                    color:
                      state === 'now'
                        ? 'var(--color-fg)'
                        : state === 'past'
                          ? 'var(--color-muted)'
                          : 'var(--color-faint)',
                    y: state === 'now' ? -2 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className="mt-2 block text-[clamp(1rem,2.2vw,1.4rem)] font-medium tracking-[-0.03em]"
                >
                  {s.step}
                </motion.span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Detail for the step the rail is on. */}
      <div className="relative mt-10 min-h-[92px]">
        {steps.map((s, i) => (
          <motion.p
            key={s.step}
            aria-hidden={i !== active}
            animate={{
              opacity: i === active ? 1 : 0,
              y: i === active ? 0 : 10,
              filter: i === active ? 'blur(0px)' : 'blur(6px)',
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-0 max-w-2xl text-[clamp(1.1rem,2.6vw,1.7rem)] leading-snug font-medium tracking-[-0.03em] text-muted"
          >
            {s.detail}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
