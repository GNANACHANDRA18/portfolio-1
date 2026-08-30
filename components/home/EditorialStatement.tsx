'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { statementWords } from '@/data/home';

const OFFSETS = {
  left: { x: -70, y: 0 },
  right: { x: 70, y: 0 },
  bottom: { x: 0, y: 60 },
};

const HEAD = ['TECHNOLOGY', 'MEETS', 'CREATIVITY.'];

export default function EditorialStatement() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-28 md:py-44">
      <div className="container-x">
        <h2 className="text-[clamp(2.4rem,10vw,9rem)] leading-[0.88] font-medium tracking-[-0.055em]">
          <span className="sr-only">Technology meets creativity.</span>
          {HEAD.map((line, i) => (
            <span
              key={line}
              aria-hidden
              className="block overflow-hidden pb-[0.05em]"
            >
              <motion.span
                className={`block ${i === 2 ? 'ai-spectrum' : 'text-fg'}`}
                initial={reduce ? false : { y: '112%' }}
                whileInView={reduce ? undefined : { y: '0%' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 1.05,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* Each discipline arrives from its own direction. */}
        <ul className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-24 md:gap-x-14">
          {statementWords.map((item, i) => (
            <motion.li
              key={item.word}
              initial={
                reduce
                  ? false
                  : { opacity: 0, ...OFFSETS[item.from], filter: 'blur(10px)' }
              }
              whileInView={
                reduce
                  ? undefined
                  : { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }
              }
              viewport={{ once: true, margin: '-70px' }}
              transition={{
                duration: 0.9,
                delay: i * 0.11,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-mono text-[clamp(0.85rem,1.7vw,1.15rem)] tracking-[0.22em] text-muted uppercase"
            >
              {item.word}
            </motion.li>
          ))}
        </ul>

        <div className="mt-16 md:mt-24">
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span
              className="block text-[clamp(1.9rem,7vw,6rem)] leading-[0.92] font-medium tracking-[-0.05em] text-fg"
              initial={reduce ? false : { y: '112%' }}
              whileInView={reduce ? undefined : { y: '0%' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              THAT&rsquo;S WHERE I WORK.
            </motion.span>
          </span>
        </div>
      </div>
    </section>
  );
}
