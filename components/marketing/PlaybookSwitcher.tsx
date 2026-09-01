'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { marketingLab } from '@/data/marketing';

/**
 * Six playbooks, one at a time.
 *
 * Each of these is a sequence somebody has to run in a real week — a campaign,
 * a proposal, a brand rollout — and the point of showing them together is that
 * none of them is improvised. Selecting one deals its steps out left to right,
 * so the shape of the process is read as movement rather than as a list of
 * nouns.
 */
export default function PlaybookSwitcher() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = marketingLab[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Playbooks"
        className="flex flex-wrap gap-2"
      >
        {marketingLab.map((book, i) => {
          const selected = i === active;
          return (
            <button
              key={book.id}
              role="tab"
              type="button"
              aria-selected={selected}
              data-cursor="magnet"
              onClick={() => setActive(i)}
              className="rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-400"
              style={{
                borderColor: selected
                  ? 'color-mix(in oklab, var(--color-accent) 55%, transparent)'
                  : 'var(--color-line)',
                color: selected ? 'var(--color-fg)' : 'var(--color-muted)',
                background: selected
                  ? 'color-mix(in oklab, var(--color-accent) 10%, transparent)'
                  : 'transparent',
              }}
            >
              {book.label}
            </button>
          );
        })}
      </div>

      <div className="mt-12 min-h-[168px]">
        <AnimatePresence mode="wait">
          <motion.ol
            key={current.id}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap items-stretch gap-3"
          >
            {current.flow.map((step, i) => (
              <motion.li
                key={`${current.id}-${step}`}
                initial={reduce ? false : { opacity: 0, x: -14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: reduce ? 0 : i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-1 basis-[150px] flex-col justify-between rounded-2xl border border-line bg-surface/70 p-5"
              >
                <span className="font-mono text-[10px] tracking-[0.18em] text-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mt-6 text-[15.5px] leading-tight text-fg">{step}</span>
              </motion.li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </div>
  );
}
