'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { SkillGroup } from '@/data/skills';
import ChipCloud from '@/components/ChipCloud';

/**
 * Interactive capability card. Expands to reveal the full skill list —
 * no invented proficiency percentages anywhere.
 */
export default function SkillCard({
  group,
  index = 0,
  defaultOpen = false,
}: {
  group: SkillGroup;
  index?: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`card-sheen rounded-2xl border bg-surface/45 transition-colors duration-500 ${
        open ? 'border-accent/35' : 'border-line hover:border-line-strong'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`skills-${group.id}`}
        className="flex w-full items-start justify-between gap-6 p-7 text-left md:p-8"
      >
        <span>
          <span className="block font-mono text-[11px] tracking-[0.18em] text-faint uppercase">
            {String(index + 1).padStart(2, '0')} — {group.skills.length} areas
          </span>
          <span className="mt-3 block text-xl tracking-tight text-fg md:text-2xl">
            {group.title}
          </span>
          <span className="mt-2 block max-w-md text-[14px] leading-relaxed text-muted">
            {group.blurb}
          </span>
        </span>
        <span
          aria-hidden
          className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm transition-all duration-400 ${
            open
              ? 'rotate-45 border-accent/50 text-accent'
              : 'border-line text-muted'
          }`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`skills-${group.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ChipCloud
              items={group.skills}
              size="sm"
              className="border-t border-line px-7 py-6 md:px-8"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
