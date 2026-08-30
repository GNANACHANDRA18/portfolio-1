'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Section masthead for /ai. Lines rise out of a mask; a spectrum-filled
 * fragment can be highlighted by passing `accentLines`.
 */
export default function SectionHead({
  eyebrow,
  lines,
  accentLines = [],
  lede,
  align = 'left',
  className = '',
  as = 'h2',
}: {
  eyebrow?: string;
  lines: string[];
  accentLines?: number[];
  lede?: string;
  align?: 'left' | 'center';
  className?: string;
  /** Page mastheads pass 'h1' so every page has exactly one top-level heading. */
  as?: 'h1' | 'h2';
}) {
  const reduce = useReducedMotion();
  const Heading = as;

  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'} ${className}`}
    >
      {eyebrow && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-mono text-[11px] tracking-[0.22em] text-faint uppercase"
        >
          {eyebrow}
        </motion.p>
      )}

      <Heading className="text-[clamp(2rem,6.4vw,5.2rem)] leading-[0.94] font-medium tracking-[-0.045em]">
        {lines.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.05em]">
            <motion.span
              className={`block ${accentLines.includes(i) ? 'ai-spectrum' : ''}`}
              initial={reduce ? false : { y: '108%' }}
              whileInView={reduce ? undefined : { y: '0%' }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{
                duration: 0.95,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Heading>

      {lede && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-7 text-[17px] leading-relaxed text-muted md:text-xl ${
            align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}
        >
          {lede}
        </motion.p>
      )}
    </div>
  );
}
