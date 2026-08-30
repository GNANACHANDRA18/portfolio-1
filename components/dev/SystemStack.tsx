'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { systemStack } from '@/data/development';

/**
 * The engineering stack as a vertical spine with data moving down it.
 * Deliberately calm — a system diagram, not a fake terminal.
 */
export default function SystemStack() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div
        aria-hidden
        className="aurora aurora-b absolute inset-x-[10%] inset-y-[14%]"
        style={{
          background:
            'radial-gradient(circle, rgba(47,91,255,0.26), transparent 70%)',
        }}
      />

      <ol className="relative" onMouseLeave={() => setActive(null)}>
        {systemStack.map((node, i) => {
          const isActive = active === node.id;
          return (
            <li key={node.id} className="relative">
              <motion.button
                type="button"
                data-cursor="orb"
                onMouseEnter={() => setActive(node.id)}
                onFocus={() => setActive(node.id)}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative z-10 flex w-full items-center justify-between gap-5 rounded-2xl border px-6 py-5 text-left transition-all duration-400 ${
                  isActive
                    ? '-translate-y-0.5 border-accent/45 bg-surface shadow-[0_18px_44px_-26px_rgba(20,20,110,0.5)]'
                    : 'border-line bg-surface/70'
                }`}
              >
                <span>
                  <span
                    className={`block font-mono text-[13px] tracking-[0.18em] transition-colors duration-400 ${
                      isActive ? 'text-accent' : 'text-fg'
                    }`}
                  >
                    {node.label}
                  </span>
                  <span className="mt-1.5 block text-[13px] leading-relaxed text-muted">
                    {node.note}
                  </span>
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.button>

              {i < systemStack.length - 1 && (
                <span
                  aria-hidden
                  className="relative mx-auto block h-8 w-px bg-line-strong"
                >
                  {!reduce && (
                    <motion.span
                      className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ai-cyan"
                      animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1.3,
                        repeat: Infinity,
                        delay: i * 0.22,
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
    </div>
  );
}
