'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { thinkingStack, toolShelf } from '@/data/about';

/**
 * "Tools change. Thinking matters." — argued rather than asserted.
 *
 * The claim used to sit above two plain lists, which left the reader to take
 * it on trust. Here the left column visibly expires: every tool carries a
 * shelf-life bar that drains and resets, each on its own clock, so the column
 * never settles. The right column fills once as it arrives and then holds.
 * The difference between the two columns is the argument.
 *
 * With reduced motion the bars are drawn at their resting positions — the
 * left half-spent, the right full — so the same contrast survives without
 * anything looping.
 */

const DRAIN = 5.4;

export default function ToolHalfLife() {
  const reduce = useReducedMotion();

  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
      {/* Tools — always on the way out. */}
      <div className="bg-surface/70 p-8 md:p-10">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <p className="font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase">
            Tools
          </p>
          <p className="font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
            Shelf life
          </p>
        </div>

        <ul className="space-y-6">
          {toolShelf.map((tool, i) => (
            <li key={tool.label}>
              <motion.div
                animate={reduce ? undefined : { opacity: [1, 1, 0.42, 1] }}
                transition={
                  reduce
                    ? undefined
                    : {
                        duration: DRAIN + i * 0.7,
                        times: [0, 0.82, 0.94, 1],
                        repeat: Infinity,
                        ease: 'linear',
                      }
                }
              >
                <p className="text-[16px] text-muted">{tool.label}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-faint">
                  {tool.note}
                </p>
              </motion.div>

              <div
                aria-hidden
                className="mt-3 h-px w-full overflow-hidden bg-line-strong"
              >
                <motion.div
                  className="h-full origin-left bg-muted/60"
                  initial={reduce ? false : { scaleX: 1 }}
                  animate={reduce ? { scaleX: 0.45 } : { scaleX: [1, 0, 1] }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          duration: DRAIN + i * 0.7,
                          times: [0, 0.9, 0.92],
                          repeat: Infinity,
                          ease: 'linear',
                        }
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Thinking — fills once, then stays. */}
      <div className="bg-surface/70 p-8 md:p-10">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <p className="font-mono text-[10.5px] tracking-[0.2em] text-accent uppercase">
            What matters
          </p>
          <p className="font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
            Compounds
          </p>
        </div>

        <ul className="space-y-6">
          {thinkingStack.map((item, i) => (
            <li key={item.label}>
              <p className="text-[16px] text-fg">{item.label}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-faint">
                {item.note}
              </p>

              <div aria-hidden className="mt-3 h-px w-full overflow-hidden bg-line-strong">
                <motion.div
                  className="h-full origin-left bg-accent"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: reduce ? 0 : 1.1,
                    delay: reduce ? 0 : 0.1 + i * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
