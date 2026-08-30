'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { mindsetAreas } from '@/data/business';

/** Six questions every business has to answer, converging on growth. */
export default function MindsetAreas() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <div>
      <ul
        className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3"
        onMouseLeave={() => setActive(null)}
      >
        {mindsetAreas.map((area, i) => {
          const isActive = active === area.id;
          return (
            <motion.li
              key={area.id}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <button
                type="button"
                data-cursor="orb"
                onMouseEnter={() => setActive(area.id)}
                onFocus={() => setActive(area.id)}
                className={`relative flex h-full w-full flex-col justify-between gap-10 p-7 text-left transition-colors duration-500 md:p-9 ${
                  isActive ? 'bg-elev' : 'bg-surface/60'
                }`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
                  style={{
                    opacity: isActive ? 1 : 0,
                    background:
                      'radial-gradient(90% 80% at 50% 0%, rgba(59,107,255,0.14), transparent 70%)',
                  }}
                />

                <span className="relative flex items-baseline justify-between gap-4">
                  <span
                    className={`text-[clamp(1.2rem,3vw,2rem)] leading-none font-medium tracking-[-0.04em] transition-colors duration-500 ${
                      isActive ? 'text-fg' : 'text-muted'
                    }`}
                  >
                    {area.label}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>

                <span
                  className={`relative text-[14.5px] leading-relaxed transition-colors duration-500 ${
                    isActive ? 'text-muted' : 'text-faint'
                  }`}
                >
                  {area.question}
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex flex-col items-center gap-6"
      >
        <span aria-hidden className="h-10 w-px bg-linear-to-b from-line-strong to-transparent" />
        <p className="ai-spectrum text-center text-[clamp(1.6rem,5vw,3.8rem)] leading-none font-medium tracking-[-0.05em]">
          BUSINESS GROWTH
        </p>
      </motion.div>
    </div>
  );
}
