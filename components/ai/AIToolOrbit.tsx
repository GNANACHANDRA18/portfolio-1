'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { orbitCategories } from '@/data/ai-page';
import SectionHead from './SectionHead';

export default function AIToolOrbit() {
  const [active, setActive] = useState(orbitCategories[0].id);
  const reduce = useReducedMotion();
  const current = orbitCategories.find((c) => c.id === active)!;

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x">
        <SectionHead
          eyebrow="Toolkit"
          lines={['MY AI', 'TOOLKIT.']}
          accentLines={[1]}
          lede="Grouped by the job each tool does. These are tools and workflows I use or understand — no certification, partnership or endorsement is claimed."
          className="mb-14"
        />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          {/* Orbit — desktop and tablet */}
          <div className="orbit-stage relative hidden aspect-square w-full max-w-[540px] justify-self-center md:block">
            <div
              aria-hidden
              className="aurora aurora-b absolute inset-[16%]"
              style={{
                background:
                  'radial-gradient(circle, rgba(59,91,255,0.35), transparent 70%)',
              }}
            />

            {/* Static rings */}
            {[0.98, 0.72, 0.46].map((s) => (
              <span
                key={s}
                aria-hidden
                className="absolute rounded-full border border-line"
                style={{
                  inset: `${((1 - s) / 2) * 100}%`,
                }}
              />
            ))}

            {/* Rotating ring carrying the categories */}
            <div className="orbit-ring absolute inset-0">
              {orbitCategories.map((cat, i) => {
                const angle = (i / orbitCategories.length) * 360;
                const isActive = cat.id === active;
                return (
                  <div
                    key={cat.id}
                    className="absolute top-1/2 left-1/2 h-0 w-0"
                    style={{
                      transform: `rotate(${angle}deg) translateX(43%) rotate(-${angle}deg)`,
                    }}
                  >
                    <button
                      type="button"
                      data-cursor="orb"
                      onMouseEnter={() => setActive(cat.id)}
                      onFocus={() => setActive(cat.id)}
                      onClick={() => setActive(cat.id)}
                      className={`orbit-chip -translate-x-1/2 -translate-y-1/2 rounded-full border bg-elev px-4 py-2.5 font-mono text-[10px] tracking-[0.16em] whitespace-nowrap uppercase transition-all duration-400 ${
                        isActive
                          ? 'scale-110 shadow-[0_14px_40px_-20px_rgba(20,20,120,0.6)]'
                          : 'border-line text-faint hover:text-fg'
                      }`}
                      style={
                        isActive
                          ? {
                              borderColor: `color-mix(in oklab, ${cat.tint} 55%, transparent)`,
                              color: cat.tint,
                            }
                          : undefined
                      }
                    >
                      {cat.label}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Core */}
            <div className="absolute top-1/2 left-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-raised/85 p-8 text-center backdrop-blur-xl">
              <p className="font-mono text-[9.5px] tracking-[0.2em] text-faint uppercase">
                Gnana&rsquo;s
              </p>
              <p className="ai-spectrum mt-1 text-[22px] leading-tight font-medium tracking-[-0.03em]">
                AI STACK
              </p>
              <p className="mt-3 font-mono text-[9.5px] tracking-[0.16em] text-faint uppercase">
                {orbitCategories.length} areas
              </p>
            </div>
          </div>

          {/* Detail panel / mobile list */}
          <div>
            <div className="mb-4 flex flex-wrap gap-2 md:hidden">
              {orbitCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActive(cat.id)}
                  className={`rounded-full border px-3.5 py-2 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                    cat.id === active
                      ? 'border-ai-violet/50 bg-ai-violet/10 text-ai-violet'
                      : 'border-line bg-elev/70 text-faint'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="glass min-h-[240px] rounded-3xl p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p
                    className="font-mono text-[11px] tracking-[0.2em] uppercase"
                    style={{ color: current.tint }}
                  >
                    {current.label}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {current.tools.map((tool, i) => (
                      <motion.li
                        key={tool}
                        initial={reduce ? false : { opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 + i * 0.06 }}
                        className="flex items-center gap-3 border-b border-line pb-2.5 text-[15.5px] text-fg last:border-0"
                      >
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: current.tint }}
                        />
                        {tool}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-5 font-mono text-[10.5px] leading-relaxed tracking-[0.14em] text-faint uppercase">
              Tools I use or understand · not endorsements · no proficiency scores
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
