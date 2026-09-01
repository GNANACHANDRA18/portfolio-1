'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Compact bordered list used for capability and feature enumerations.
 *
 * The cells arrive in a diagonal cascade rather than all at once, and each
 * one carries a slow light that crosses it on its own delay, so a grid of
 * fifteen plain strings reads as a live surface instead of a table. Both
 * behaviours stop under reduced motion.
 */
export default function BulletGrid({
  items,
  columns = 3,
  numbered = false,
}: {
  items: string[];
  columns?: 2 | 3 | 4;
  numbered?: boolean;
}) {
  const reduce = useReducedMotion();
  const cols =
    columns === 2
      ? 'sm:grid-cols-2'
      : columns === 4
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <ul
      className={`grid gap-px overflow-hidden rounded-xl border border-line bg-line ${cols}`}
    >
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.6,
            delay: Math.min(i * 0.045, 0.4),
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ '--sweep-delay': `${(i % 5) * 1.3}s` } as React.CSSProperties}
          className="cell-sweep group relative flex items-center gap-3 overflow-hidden bg-surface/60 px-5 py-4 transition-colors duration-400 hover:bg-elev"
        >
          {numbered ? (
            <span className="font-mono text-[10.5px] tracking-[0.16em] text-faint transition-colors duration-400 group-hover:text-accent">
              {String(i + 1).padStart(2, '0')}
            </span>
          ) : (
            <motion.span
              aria-hidden
              animate={reduce ? undefined : { scale: [1, 1.65, 1], opacity: [1, 0.55, 1] }}
              transition={
                reduce
                  ? undefined
                  : {
                      duration: 3.4,
                      repeat: Infinity,
                      delay: (i % 5) * 0.55,
                      ease: 'easeInOut',
                    }
              }
              className="h-1 w-1 shrink-0 rounded-full bg-faint transition-colors duration-400 group-hover:bg-accent"
            />
          )}
          <span className="relative text-[14.5px] text-muted transition-colors duration-400 group-hover:text-fg">
            {item}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
