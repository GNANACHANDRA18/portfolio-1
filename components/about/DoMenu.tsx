'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { doMenu } from '@/data/about';

/** Full-width menu of disciplines; the background follows the hovered row. */
export default function DoMenu() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const current = doMenu.find((d) => d.label === active);

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        // Off is the same gradient with no tint in it, not the `transparent`
        // keyword: motion cannot interpolate a gradient against the browser's
        // background shorthand, and silently drops the animation when asked.
        initial={{ background: `radial-gradient(64% 56% at 50% 45%, transparent, transparent 72%)` }}
        animate={{
          background: current
            ? `radial-gradient(64% 56% at 50% 45%, color-mix(in oklab, ${current.tint} 13%, transparent), transparent 72%)`
            : `radial-gradient(64% 56% at 50% 45%, transparent, transparent 72%)`,
        }}
        transition={{ duration: 0.6 }}
      />

      <div className="container-x relative">
        <h2 className="mb-14 text-[clamp(1.9rem,5.6vw,4.4rem)] leading-[0.96] font-medium tracking-[-0.05em] text-fg">
          WHAT DO I
          <br />
          <span className="ai-spectrum">ACTUALLY DO?</span>
        </h2>

        <ul className="border-t border-line" onMouseLeave={() => setActive(null)}>
          {doMenu.map((item, i) => {
            const isActive = active === item.label;
            return (
              <motion.li
                key={item.label}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                className="border-b border-line"
              >
                <Link
                  href={item.href}
                  data-cursor="explore"
                  onMouseEnter={() => setActive(item.label)}
                  onFocus={() => setActive(item.label)}
                  className="group grid grid-cols-[auto_1fr] items-center gap-5 py-6 md:grid-cols-[auto_1fr_auto] md:gap-10 md:py-8"
                >
                  <span
                    className={`font-mono text-[10.5px] tracking-[0.16em] transition-colors duration-400 ${
                      isActive ? 'text-fg' : 'text-faint'
                    }`}
                  >
                    {item.n}
                  </span>

                  <motion.span
                    animate={{ x: reduce ? 0 : isActive ? 14 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[clamp(1.4rem,4vw,3rem)] leading-tight font-medium tracking-[-0.04em] transition-colors duration-500"
                    style={{ color: isActive ? item.tint : 'var(--color-muted)' }}
                  >
                    {item.label}
                  </motion.span>

                  <span className="hidden min-h-[24px] max-w-sm items-center justify-end md:flex">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.span
                          key={item.label}
                          initial={
                            reduce ? false : { opacity: 0, y: 8, filter: 'blur(6px)' }
                          }
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={
                            reduce ? undefined : { opacity: 0, y: -6, filter: 'blur(6px)' }
                          }
                          transition={{ duration: 0.35 }}
                          className="text-right text-[14.5px] leading-relaxed text-muted"
                        >
                          {item.body}
                        </motion.span>
                      )}
                    </AnimatePresence>
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
