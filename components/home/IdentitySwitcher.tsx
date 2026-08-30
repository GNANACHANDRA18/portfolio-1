'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { identities } from '@/data/home';

export default function IdentitySwitcher() {
  const [active, setActive] = useState(identities[0].id);
  const reduce = useReducedMotion();
  const current = identities.find((i) => i.id === active)!;

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Tint follows the active word. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{
          background: `radial-gradient(62% 55% at 50% 45%, color-mix(in oklab, ${current.tint} 11%, transparent), transparent 72%)`,
        }}
        transition={{ duration: 0.7 }}
      />

      <div className="container-x relative">
        <p className="mb-14 font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
          What do I do?
        </p>

        <ul
          className="border-t border-line"
          onMouseLeave={() => setActive(identities[0].id)}
        >
          {identities.map((item, i) => {
            const isActive = item.id === active;
            return (
              <motion.li
                key={item.id}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-line"
              >
                <Link
                  href={item.href}
                  data-cursor="orb"
                  onMouseEnter={() => setActive(item.id)}
                  onFocus={() => setActive(item.id)}
                  className="group flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:justify-between md:gap-10 md:py-7"
                >
                  <span className="flex items-baseline gap-5">
                    <span
                      className={`font-mono text-[10.5px] tracking-[0.18em] transition-colors duration-500 ${
                        isActive ? 'text-fg' : 'text-faint'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <motion.span
                      className="text-[clamp(2.2rem,7.5vw,6.5rem)] leading-[0.9] font-medium tracking-[-0.05em] transition-colors duration-500"
                      animate={{
                        color: isActive ? current.tint : 'var(--color-faint)',
                        x: reduce ? 0 : isActive ? 12 : 0,
                      }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {item.word}
                    </motion.span>
                  </span>

                  <span className="relative flex min-h-[26px] items-baseline gap-4 md:max-w-sm md:justify-end">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.span
                          key={item.id}
                          initial={
                            reduce ? false : { opacity: 0, y: 10, filter: 'blur(6px)' }
                          }
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={
                            reduce ? undefined : { opacity: 0, y: -8, filter: 'blur(6px)' }
                          }
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="text-[15px] leading-relaxed text-muted md:text-right md:text-[17px]"
                        >
                          {item.line}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <span
                      aria-hidden
                      className={`shrink-0 text-[13px] transition-all duration-500 ${
                        isActive
                          ? 'translate-x-0 text-fg opacity-100'
                          : '-translate-x-2 opacity-0'
                      }`}
                    >
                      ↗
                    </span>
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
