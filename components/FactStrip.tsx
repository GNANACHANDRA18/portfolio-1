'use client';

import { motion, useReducedMotion } from 'framer-motion';
import CountUp from './CountUp';

/**
 * The four-cell information strip used under case studies and capability
 * headers.
 *
 * It carries the driest data on the site — a label and a short value — so it
 * gets the treatment that data needs: the cells deal in one at a time, a slow
 * light crosses each one on its own delay, and a value that is really a number
 * counts up rather than sitting there. Everything stops under reduced motion,
 * where the strip renders as the plain table it always was.
 */

export type Fact = { label: string; value: string };

/** `12`, `40%`, `3+` — anything else is left as written. */
const NUMERIC = /^(\d+)([%+×x]?)$/;

export default function FactStrip({
  facts,
  className = '',
}: {
  facts: readonly Fact[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <dl
      className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4 ${className}`}
    >
      {facts.map((fact, i) => {
        const numeric = NUMERIC.exec(fact.value);

        return (
          <motion.div
            key={fact.label}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ '--sweep-delay': `${i * 1.6}s` } as React.CSSProperties}
            className="cell-sweep group relative overflow-hidden bg-surface/70 px-5 py-6 transition-colors duration-500 hover:bg-elev"
          >
            <dt className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
              {fact.label}
            </dt>
            <dd className="relative mt-2.5 text-[15px] text-fg">
              {numeric ? (
                <CountUp value={Number(numeric[1])} suffix={numeric[2]} />
              ) : (
                fact.value
              )}
            </dd>
          </motion.div>
        );
      })}
    </dl>
  );
}
