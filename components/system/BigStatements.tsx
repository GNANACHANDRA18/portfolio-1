'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** A run of large numbered statements, each arriving on its own screen. */
export default function BigStatements({
  items,
  minHeight = '58svh',
}: {
  items: { n: string; title: string; body?: string }[];
  minHeight?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={item.n}
          className="flex items-center border-t border-line"
          style={{ minHeight }}
        >
          <div className="container-x py-14">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.55 }}
              className="mb-7 font-mono text-[11px] tracking-[0.24em] text-faint"
            >
              {item.n}
            </motion.p>

            <h3 className="text-[clamp(1.7rem,6.2vw,5rem)] leading-[0.96] font-medium tracking-[-0.05em]">
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span
                  className={`block ${i === items.length - 1 ? 'ai-spectrum' : 'text-fg'}`}
                  initial={reduce ? false : { y: '112%' }}
                  whileInView={reduce ? undefined : { y: '0%' }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.title}
                </motion.span>
              </span>
            </h3>

            {item.body && (
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.75, delay: 0.2 }}
                className="mt-7 max-w-xl text-[16px] leading-relaxed text-muted md:text-[18px]"
              >
                {item.body}
              </motion.p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
