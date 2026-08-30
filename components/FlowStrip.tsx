'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

type Step = string | { step: string; detail: string };

/**
 * Horizontal process strip. Steps are hoverable/focusable when detail copy
 * is supplied, otherwise they render as a simple labelled sequence.
 */
export default function FlowStrip({
  steps,
  label,
}: {
  steps: Step[];
  label?: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const normalised = steps.map((s) =>
    typeof s === 'string' ? { step: s, detail: '' } : s,
  );
  const hasDetail = normalised.some((s) => s.detail);

  return (
    <div>
      {label && <p className="eyebrow mb-6">{label}</p>}

      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {normalised.map((item, i) => {
          const isActive = hasDetail && active === i;
          return (
            <motion.li
              key={item.step}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.55,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => hasDetail && setActive(i)}
              onFocus={() => hasDetail && setActive(i)}
              tabIndex={hasDetail ? 0 : -1}
              className={`card-sheen group relative rounded-xl border p-5 transition-colors duration-400 ${
                isActive
                  ? 'border-accent/45 bg-elev'
                  : 'border-line bg-surface/50 hover:border-line-strong'
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-300 ${
                    isActive ? 'text-accent' : 'text-faint'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  aria-hidden
                  className={`h-px flex-1 transition-colors duration-400 ${
                    isActive ? 'bg-accent/40' : 'bg-line'
                  }`}
                />
              </div>
              <p className="mt-3 text-[15px] font-medium tracking-tight text-fg">
                {item.step}
              </p>
              {item.detail && (
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  {item.detail}
                </p>
              )}
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
