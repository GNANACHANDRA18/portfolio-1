'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { attentionMetrics } from '@/data/marketing';

/**
 * What marketing is judged on here.
 *
 * Deliberately unscored. Every one of these is a question rather than a
 * percentage, because a number invented for a portfolio measures nothing —
 * so the meters fill to a fixed, equal mark and carry the question instead.
 * The animation is there to make six abstract nouns land one at a time, not
 * to imply a result.
 */
export default function AttentionMeters() {
  const reduce = useReducedMotion();

  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {attentionMetrics.map((metric, i) => (
        <motion.li
          key={metric.label}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          style={{ '--sweep-delay': `${(i % 3) * 1.7}s` } as React.CSSProperties}
          className="cell-sweep group relative overflow-hidden bg-surface/70 p-7 md:p-8"
        >
          <p className="font-mono text-[10.5px] tracking-[0.18em] text-accent uppercase">
            {metric.label}
          </p>

          <div aria-hidden className="mt-5 h-px w-full overflow-hidden bg-line-strong">
            <motion.div
              className="h-full origin-left bg-accent/70"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: reduce ? 0 : 1,
                delay: reduce ? 0 : 0.15 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>

          <p className="relative mt-5 text-[15px] leading-relaxed text-muted">
            {metric.note}
          </p>
        </motion.li>
      ))}
    </ul>
  );
}
