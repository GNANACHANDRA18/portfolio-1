'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { debugSteps } from '@/data/development';

/**
 * A small interaction: press DEBUG and watch the failure resolve.
 * It is a portfolio illustration — nothing here touches a real system.
 */
export default function DebugPlayground() {
  const [stage, setStage] = useState(0);
  const reduce = useReducedMotion();
  const fixed = stage >= 4;

  const advance = () => setStage((s) => Math.min(debugSteps.length - 1, s + 1));

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-surface/70">
      <div className="flex items-center gap-3 border-b border-line bg-elev/70 px-5 py-3.5">
        <span
          aria-hidden
          className={`h-2 w-2 rounded-full transition-colors duration-500 ${
            fixed ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
        />
        <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
          {fixed ? 'Resolved' : 'Something broke'}
        </span>
        <span className="ml-auto font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
          {String(stage + 1).padStart(2, '0')} /{' '}
          {String(debugSteps.length).padStart(2, '0')}
        </span>
      </div>

      <div className="p-6 md:p-9">
        <ol className="flex flex-wrap gap-2">
          {debugSteps.map((step, i) => {
            const done = i < stage;
            const isCurrent = i === stage;
            return (
              <li key={step} className="flex items-center gap-2">
                <span
                  className={`rounded-full border px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.14em] uppercase transition-colors duration-400 ${
                    isCurrent
                      ? 'border-accent/50 bg-accent/10 text-accent'
                      : done
                        ? 'border-line bg-elev text-muted'
                        : 'border-line text-faint'
                  }`}
                >
                  {step}
                </span>
                {i < debugSteps.length - 1 && (
                  <span aria-hidden className="text-faint">
                    &rarr;
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-8 rounded-2xl border border-line bg-elev/50 p-5">
          <AnimatePresence mode="wait">
            <motion.pre
              key={fixed ? 'fixed' : 'broken'}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="overflow-x-auto font-mono text-[12.5px] leading-relaxed"
            >
              {fixed ? (
                <>
                  <span className="block whitespace-pre text-emerald-600">
                    + if (!results.length) return empty()
                  </span>
                  <span className="block whitespace-pre text-muted">
                    {'  '}return rank(results).slice(0, 10)
                  </span>
                  <span className="block whitespace-pre text-faint">
                    ✓ 3 tests passing
                  </span>
                </>
              ) : (
                <>
                  <span className="block whitespace-pre text-rose-600">
                    TypeError: Cannot read properties of undefined
                  </span>
                  <span className="block whitespace-pre text-muted">
                    {'  '}at rank (lib/search.ts:24:18)
                  </span>
                  <span className="block whitespace-pre text-faint">
                    // empty result set was never handled
                  </span>
                </>
              )}
            </motion.pre>
          </AnimatePresence>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <button
            type="button"
            data-cursor="magnet"
            onClick={stage >= debugSteps.length - 1 ? () => setStage(0) : advance}
            className="rounded-full bg-fg px-6 py-3 font-mono text-[11px] tracking-[0.16em] text-bg uppercase transition-transform duration-300 hover:-translate-y-0.5"
          >
            {stage >= debugSteps.length - 1
              ? 'Run again'
              : `Next: ${debugSteps[stage + 1]}`}
          </button>
          <p className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
            Illustration · not a live system
          </p>
        </div>
      </div>
    </div>
  );
}
