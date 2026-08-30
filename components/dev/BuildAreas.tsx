'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { buildAreas } from '@/data/development';

/** Five build areas; the hovered one expands into a preview. */
export default function BuildAreas() {
  const [active, setActive] = useState<string | null>(buildAreas[0].id);
  const reduce = useReducedMotion();

  return (
    <ul className="border-t border-line">
      {buildAreas.map((area, i) => {
        const isActive = active === area.id;
        return (
          <motion.li
            key={area.id}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
            onMouseEnter={() => setActive(area.id)}
            onFocus={() => setActive(area.id)}
            className="border-b border-line"
          >
            <button
              type="button"
              data-cursor="orb"
              onClick={() => setActive(isActive ? null : area.id)}
              aria-expanded={isActive}
              className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-6 text-left md:gap-8 md:py-7"
            >
              <span
                className={`font-mono text-[10.5px] tracking-[0.16em] transition-colors duration-400 ${
                  isActive ? 'text-fg' : 'text-faint'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <motion.span
                animate={{ x: reduce ? 0 : isActive ? 12 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(1.2rem,3.4vw,2.4rem)] leading-tight font-medium tracking-[-0.035em] transition-colors duration-500"
                style={{ color: isActive ? area.tint : 'var(--color-muted)' }}
              >
                {area.label}
              </motion.span>

              <span
                aria-hidden
                className={`grid h-7 w-7 place-items-center rounded-full border text-[13px] transition-all duration-400 ${
                  isActive
                    ? 'rotate-45 border-accent/50 text-accent'
                    : 'border-line text-faint'
                }`}
              >
                +
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className="mb-6 grid gap-6 rounded-2xl border p-6 md:grid-cols-[1fr_auto] md:p-8"
                    style={{
                      borderColor: `color-mix(in oklab, ${area.tint} 32%, transparent)`,
                      background: `color-mix(in oklab, ${area.tint} 5%, transparent)`,
                    }}
                  >
                    <p className="max-w-lg text-[16px] leading-relaxed text-muted md:text-[17px]">
                      {area.body}
                    </p>
                    <ul className="flex flex-wrap gap-2 md:justify-end">
                      {area.detail.map((d) => (
                        <li
                          key={d}
                          className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[12.5px] text-muted"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
