'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export type PipelineStep = { id: string; label: string; note: string };

/**
 * A left-to-right pipeline on desktop, top-to-bottom on small screens, with
 * data packets travelling the connectors and an explanation rail underneath.
 * Reused for API flows, RAG-style pipelines and process diagrams.
 */
export default function PipelineDiagram({
  steps,
  tint = 'var(--color-ai-blue)',
  initial = 0,
}: {
  steps: PipelineStep[];
  tint?: string;
  initial?: number;
}) {
  const [active, setActive] = useState(steps[initial]?.id ?? steps[0].id);
  const reduce = useReducedMotion();
  const current = steps.find((s) => s.id === active) ?? steps[0];

  return (
    <div className="relative rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur-xl md:p-10">
      <div aria-hidden className="ai-grid pointer-events-none absolute inset-0 opacity-60" />

      <ol className="relative flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-0">
        {steps.map((step, i) => {
          const isActive = active === step.id;
          return (
            <li key={step.id} className="flex flex-1 items-center gap-3 lg:block">
              <button
                type="button"
                data-cursor="orb"
                onMouseEnter={() => setActive(step.id)}
                onFocus={() => setActive(step.id)}
                onClick={() => setActive(step.id)}
                aria-pressed={isActive}
                className={`w-full rounded-2xl border px-4 py-5 text-left transition-all duration-400 lg:text-center ${
                  isActive
                    ? '-translate-y-1 bg-surface shadow-[0_16px_44px_-24px_rgba(20,20,120,0.45)]'
                    : 'border-line bg-surface/70 hover:border-line-strong'
                }`}
                style={
                  isActive
                    ? { borderColor: `color-mix(in oklab, ${tint} 48%, transparent)` }
                    : undefined
                }
              >
                <span
                  className="block font-mono text-[9.5px] tracking-[0.18em] uppercase transition-colors duration-400"
                  style={{ color: isActive ? tint : 'var(--color-faint)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`mt-2.5 block font-mono text-[11px] tracking-[0.12em] uppercase transition-colors duration-400 ${
                    isActive ? 'text-fg' : 'text-muted'
                  }`}
                >
                  {step.label}
                </span>
              </button>

              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="relative mx-1 hidden h-px w-full shrink-0 self-center bg-line-strong lg:block"
                >
                  {!reduce && (
                    <motion.span
                      className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                      style={{ background: tint }}
                      animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.18,
                        ease: 'linear',
                      }}
                    />
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="relative mt-8 min-h-[64px] border-t border-line pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            <p
              className="font-mono text-[11px] tracking-[0.2em] uppercase"
              style={{ color: tint }}
            >
              {current.label}
            </p>
            <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted md:text-[17px]">
              {current.note}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
