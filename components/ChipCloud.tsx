'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * A list of short strings, alive.
 *
 * Half the data on this site is a bare `string[]` — responsibilities, tools,
 * capabilities — and every one of them used to render as the same dead row of
 * pills. This is the replacement: the chips arrive one after another, breathe
 * on their own staggered clocks, and a single light walks the row so the block
 * is never completely still. Pointing at the list stops the walk and hands
 * control to the pointer.
 *
 * The float is CSS (see CHIP CLOUD in globals.css) because a dozen framer
 * loops per list is a dozen animation frames the browser does not need to
 * spend; only the walk is stateful, and it is one timer for the whole cloud.
 */

/** A chip is a word, or a word that goes somewhere. */
export type Chip = string | { label: string; href: string };

export type ChipCloudProps = {
  items: readonly Chip[];
  /** Colour of the walking light and the hover edge. */
  tint?: string;
  size?: 'sm' | 'md';
  /** Ordinal in front of each chip — for lists that are really a sequence. */
  numbered?: boolean;
  /** Milliseconds each chip holds the light. */
  dwell?: number;
  className?: string;
  as?: 'ul' | 'ol';
};

const SIZE = {
  sm: 'px-3.5 py-1.5 text-[13px]',
  md: 'px-4 py-2 text-[13.5px]',
};

export default function ChipCloud({
  items,
  tint = 'var(--color-accent)',
  size = 'md',
  numbered = false,
  dwell = 1400,
  className = '',
  as: Tag = 'ul',
}: ChipCloudProps) {
  const reduce = useReducedMotion();
  const [lit, setLit] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (reduce || held || items.length < 2) return;
    const id = window.setInterval(
      () => setLit((i) => (i + 1) % items.length),
      dwell,
    );
    return () => window.clearInterval(id);
  }, [reduce, held, items.length, dwell]);

  return (
    <Tag
      className={`flex flex-wrap gap-2 ${className}`}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
    >
      {items.map((item, i) => {
        const isLit = !reduce && !held && i === lit;
        const label = typeof item === 'string' ? item : item.label;
        const href = typeof item === 'string' ? null : item.href;

        return (
          <motion.li
            key={label}
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.5,
              delay: Math.min(i * 0.045, 0.5),
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`chip group relative flex items-center gap-2 rounded-full border bg-surface/70 text-muted ${SIZE[size]}`}
            style={{
              '--chip-delay': `${(i % 7) * 0.55}s`,
              '--chip-tint': tint,
              borderColor: isLit
                ? `color-mix(in oklab, ${tint} 55%, transparent)`
                : 'var(--color-line)',
              color: isLit ? 'var(--color-fg)' : undefined,
              boxShadow: isLit
                ? `0 0 22px -6px color-mix(in oklab, ${tint} 60%, transparent)`
                : 'none',
              transition: 'border-color 600ms, color 600ms, box-shadow 600ms',
            } as React.CSSProperties}
          >
            {numbered && (
              <span className="font-mono text-[10px] tracking-[0.14em] text-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
            )}
            {href ? (
              // The whole chip is the target, so the hit area matches the shape.
              <Link href={href} data-cursor="explore" className="after:absolute after:inset-0">
                {label}
              </Link>
            ) : (
              label
            )}
          </motion.li>
        );
      })}
    </Tag>
  );
}
