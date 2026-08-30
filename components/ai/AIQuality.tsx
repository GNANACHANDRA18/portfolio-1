'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { qualityCards } from '@/data/ai-page';
import SectionHead from './SectionHead';

export default function AIQuality() {
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x">
        <SectionHead
          eyebrow="Quality control"
          lines={['SMART OUTPUT STILL', 'NEEDS A HUMAN.']}
          accentLines={[1]}
          lede="Knowing where these systems fail is not scepticism — it is the part of the job that keeps the output usable."
          className="mb-14"
        />

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {qualityCards.map((card, i) => {
            const isOpen = open === card.id;
            return (
              <motion.li
                key={card.id}
                data-cursor="orb"
                onMouseEnter={() => setOpen(card.id)}
                onMouseLeave={() => setOpen(null)}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.55,
                  delay: Math.min(i * 0.05, 0.35),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative overflow-hidden rounded-2xl border p-6 transition-colors duration-400 ${
                  isOpen
                    ? 'border-ai-yellow/50 bg-raised'
                    : 'border-line bg-elev/70'
                } ${i === qualityCards.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : card.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span
                      aria-hidden
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[13px] transition-colors duration-400 ${
                        isOpen
                          ? 'border-ai-yellow/60 text-ai-yellow'
                          : 'border-line text-faint'
                      }`}
                    >
                      !
                    </span>
                    <span className="font-mono text-[9.5px] tracking-[0.16em] text-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </span>

                  <span className="mt-6 block font-mono text-[11.5px] tracking-[0.14em] text-fg uppercase">
                    {card.label}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 14 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden text-[13.5px] leading-relaxed text-muted"
                    >
                      {card.note}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
