'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ragSteps } from '@/data/ai-page';
import SectionHead from './SectionHead';

export default function RAGPipeline() {
  const [active, setActive] = useState<string>(ragSteps[3].id);
  const reduce = useReducedMotion();
  const current = ragSteps.find((s) => s.id === active)!;

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x">
        <SectionHead
          eyebrow="Retrieval-augmented generation"
          lines={['GIVE AI THE', 'RIGHT CONTEXT.']}
          accentLines={[1]}
          lede="A model only knows what it was trained on. RAG hands it your material at the moment of the question."
          className="mb-14"
        />

        <div className="relative rounded-3xl border border-line bg-elev/70 p-6 backdrop-blur-xl md:p-10">
          <div
            aria-hidden
            className="ai-grid pointer-events-none absolute inset-0 opacity-60"
          />

          <ol className="relative flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-0">
            {ragSteps.map((step, i) => {
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
                        ? '-translate-y-1 border-ai-blue/45 bg-elev shadow-[0_16px_44px_-24px_rgba(20,20,120,0.5)]'
                        : 'border-line bg-elev/70 hover:border-line-strong'
                    }`}
                  >
                    <span
                      className={`block font-mono text-[9.5px] tracking-[0.18em] uppercase transition-colors duration-400 ${
                        isActive ? 'text-ai-blue' : 'text-faint'
                      }`}
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

                  {i < ragSteps.length - 1 && (
                    <span
                      aria-hidden
                      className="relative mx-1 hidden h-px w-full shrink-0 self-center bg-line-strong lg:block"
                    >
                      {!reduce && (
                        <motion.span
                          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ai-cyan"
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
                <p className="font-mono text-[11px] tracking-[0.2em] text-ai-blue uppercase">
                  {current.label}
                </p>
                <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted md:text-[17px]">
                  {current.note}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
