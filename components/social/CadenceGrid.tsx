'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Four weeks of publishing, as a grid that fills itself.
 *
 * "A repeatable system" is an easy thing to write and a hard thing to show.
 * This shows it: a month of slots, filling in publish order, week after week,
 * looping. The point a visitor should take is the regularity of the pattern —
 * the same shape every week, which is what a content calendar actually is.
 *
 * Reduced motion draws the full month at once, which is the same information
 * without the animation.
 */

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

/** Which weekday each format lands on, and what it is. */
const SLOTS: Record<number, { format: string; tint: string }> = {
  0: { format: 'Long-form post', tint: 'var(--color-ai-blue)' },
  2: { format: 'Short-form video', tint: 'var(--color-ai-magenta)' },
  4: { format: 'Carousel / proof', tint: 'var(--color-ai-cyan)' },
  6: { format: 'Story / behind the work', tint: 'var(--color-accent)' },
};

const CELLS = 28;
const STEP = 190;

export default function CadenceGrid() {
  const reduce = useReducedMotion();
  const [filled, setFilled] = useState(reduce ? CELLS : 0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setFilled((n) => (n >= CELLS ? 0 : n + 1)),
      STEP,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:gap-14">
      <div>
        <div className="mb-3 grid grid-cols-7 gap-2">
          {DAYS.map((day, i) => (
            <span
              key={`${day}-${i}`}
              className="text-center font-mono text-[10px] tracking-[0.16em] text-faint uppercase"
            >
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: CELLS }, (_, i) => {
            const slot = SLOTS[i % 7];
            const on = i < filled;

            return (
              <motion.span
                key={i}
                aria-hidden
                animate={{
                  opacity: on ? 1 : 0.22,
                  scale: on && i === filled - 1 && !reduce ? 1.12 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-square rounded-md border"
                style={{
                  borderColor: slot
                    ? `color-mix(in oklab, ${slot.tint} ${on ? 60 : 22}%, transparent)`
                    : 'var(--color-line)',
                  background: slot
                    ? `color-mix(in oklab, ${slot.tint} ${on ? 26 : 6}%, transparent)`
                    : 'var(--color-surface)',
                  boxShadow:
                    on && slot && i === filled - 1
                      ? `0 0 22px -4px color-mix(in oklab, ${slot.tint} 70%, transparent)`
                      : 'none',
                }}
              />
            );
          })}
        </div>

        <p className="mt-5 font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
          Four weeks · {Object.keys(SLOTS).length} fixed slots a week
        </p>
      </div>

      <div>
        <p className="font-mono text-[10.5px] tracking-[0.22em] text-faint uppercase">
          The week, fixed
        </p>
        <ul className="mt-7 space-y-4">
          {Object.entries(SLOTS).map(([day, slot]) => (
            <li key={slot.format} className="flex items-center gap-4">
              <span
                aria-hidden
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: slot.tint }}
              />
              <span className="text-[15px] text-fg">{slot.format}</span>
              <span className="ml-auto font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][Number(day)]}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-muted">
          Slots come first, ideas fill them. That is the difference between a
          content system and remembering to post.
        </p>
      </div>
    </div>
  );
}
