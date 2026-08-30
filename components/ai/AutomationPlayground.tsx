'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { automationPresets } from '@/data/ai-page';
import SectionHead from './SectionHead';

const KIND_STYLE: Record<string, { tint: string; label: string }> = {
  input: { tint: 'var(--color-ai-cyan)', label: 'INPUT' },
  ai: { tint: 'var(--color-ai-violet)', label: 'AI' },
  decision: { tint: 'var(--color-ai-yellow)', label: 'DECISION' },
  action: { tint: 'var(--color-ai-blue)', label: 'ACTION' },
  output: { tint: 'var(--color-ai-magenta)', label: 'OUTPUT' },
};

export default function AutomationPlayground() {
  const [preset, setPreset] = useState(automationPresets[0].id);
  const reduce = useReducedMotion();
  const current = automationPresets.find((p) => p.id === preset)!;

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x">
        <SectionHead
          eyebrow="Automation"
          lines={['WHAT CAN BE', 'AUTOMATED?']}
          accentLines={[1]}
          lede="Every workflow has a repetitive middle. Pick one and watch where the machine takes over — and where it hands back."
          className="mb-12"
        />

        {/* Preset selector */}
        <div role="tablist" aria-label="Workflow presets" className="mb-8 flex flex-wrap gap-2">
          {automationPresets.map((p) => {
            const selected = p.id === preset;
            return (
              <button
                key={p.id}
                role="tab"
                type="button"
                data-cursor="magnet"
                aria-selected={selected}
                onClick={() => setPreset(p.id)}
                className={`relative rounded-full px-5 py-2.5 text-[14px] transition-colors duration-300 ${
                  selected ? 'text-bg' : 'text-muted hover:text-fg'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="preset-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-ai-blue to-ai-violet"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                {!selected && (
                  <span className="absolute inset-0 -z-10 rounded-full border border-line bg-elev/70" />
                )}
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Canvas */}
        <div className="relative overflow-hidden rounded-3xl border border-line bg-elev/70 p-6 backdrop-blur-xl md:p-10">
          <div
            aria-hidden
            className="ai-grid pointer-events-none absolute inset-0 opacity-70"
          />

          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-stretch">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="flex w-full flex-col gap-4 lg:flex-row lg:items-stretch"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {current.nodes.map((node, i) => {
                  const style = KIND_STYLE[node.kind];
                  return (
                    <motion.div
                      key={`${current.id}-${node.label}`}
                      className="relative flex flex-1 items-center gap-4 lg:block"
                      initial={reduce ? false : { opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.11,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <div
                        data-cursor="orb"
                        className="w-full rounded-2xl border bg-elev p-5 shadow-[0_10px_36px_-20px_rgba(20,20,80,0.4)] transition-transform duration-400 hover:-translate-y-1"
                        style={{
                          borderColor: `color-mix(in oklab, ${style.tint} 35%, transparent)`,
                        }}
                      >
                        <span
                          className="inline-flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.18em] uppercase"
                          style={{ color: style.tint }}
                        >
                          <span
                            aria-hidden
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: style.tint }}
                          />
                          {style.label}
                        </span>
                        <p className="mt-3 text-[16px] tracking-tight text-fg">
                          {node.label}
                        </p>

                        {/* Port dots, for the visual-programming feel */}
                        <span
                          aria-hidden
                          className="absolute top-1/2 -left-1 hidden h-2 w-2 -translate-y-1/2 rounded-full border border-line bg-elev lg:block"
                        />
                        <span
                          aria-hidden
                          className="absolute top-1/2 -right-1 hidden h-2 w-2 -translate-y-1/2 rounded-full border border-line bg-elev lg:block"
                        />
                      </div>

                      {/* Connector */}
                      {i < current.nodes.length - 1 && (
                        <span
                          aria-hidden
                          className="relative hidden h-px w-6 shrink-0 self-center bg-line-strong lg:block"
                        >
                          {!reduce && (
                            <motion.span
                              className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                              style={{ background: style.tint }}
                              animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                              transition={{
                                duration: 1.4,
                                repeat: Infinity,
                                delay: i * 0.25,
                                ease: 'easeInOut',
                              }}
                            />
                          )}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="relative mt-8 font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
            Diagram · presets are illustrative of how the work is structured
          </p>
        </div>
      </div>
    </section>
  );
}
