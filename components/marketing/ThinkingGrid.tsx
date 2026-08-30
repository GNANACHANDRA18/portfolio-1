'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { thinkingGrid } from '@/data/business';

/**
 * A grid of business subjects. Hovering one enlarges it and lights the
 * subjects it connects to.
 */
export default function ThinkingGrid() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const current = thinkingGrid.find((t) => t.id === active);

  return (
    <div>
      <ul
        className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-5"
        onMouseLeave={() => setActive(null)}
      >
        {thinkingGrid.map((topic, i) => {
          const isActive = active === topic.id;
          const isRelated = current?.related.includes(topic.id) ?? false;
          const dimmed = current && !isActive && !isRelated;

          return (
            <motion.li
              key={topic.id}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.3) }}
            >
              <button
                type="button"
                data-cursor="orb"
                onMouseEnter={() => setActive(topic.id)}
                onFocus={() => setActive(topic.id)}
                onClick={() => setActive(isActive ? null : topic.id)}
                aria-pressed={isActive}
                className={`relative flex h-full min-h-[120px] w-full items-end p-5 text-left transition-all duration-500 md:min-h-[150px] ${
                  isActive
                    ? 'bg-elev'
                    : isRelated
                      ? 'bg-surface'
                      : 'bg-surface/60'
                }`}
                style={{ opacity: dimmed ? 0.34 : 1 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="grid-glow"
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(80% 70% at 50% 100%, rgba(139,92,246,0.18), transparent 70%)',
                    }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}

                <motion.span
                  animate={
                    reduce
                      ? undefined
                      : { scale: isActive ? 1.12 : 1, y: isActive ? -2 : 0 }
                  }
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative origin-bottom-left font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-400 ${
                    isActive
                      ? 'text-fg'
                      : isRelated
                        ? 'text-muted'
                        : 'text-faint'
                  }`}
                >
                  {topic.label}
                </motion.span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      <div className="mt-6 min-h-[28px]">
        {current ? (
          <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
            <span className="text-fg">{current.label}</span>
            <span className="mx-3 text-faint">connects</span>
            {current.related
              .map((id) => thinkingGrid.find((t) => t.id === id)?.label)
              .filter(Boolean)
              .join(' · ')}
          </p>
        ) : (
          <p className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">
            Hover a subject to see what it pulls on
          </p>
        )}
      </div>
    </div>
  );
}
