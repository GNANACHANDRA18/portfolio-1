'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { proposalParts } from '@/data/marketing';

/** Loose documents drifting together into one proposal as the section scrolls. */
export default function ProposalAssembly() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 55%'],
  });
  const gather = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const SCATTER = [
    { x: -46, y: -30, r: -9 },
    { x: 44, y: -34, r: 7 },
    { x: -52, y: 12, r: 5 },
    { x: 50, y: 16, r: -6 },
    { x: -22, y: 40, r: 8 },
    { x: 26, y: 44, r: -4 },
  ];

  // Declared individually so hook order never changes.
  const x0 = useTransform(gather, (g) => `${SCATTER[0].x * g}%`);
  const y0 = useTransform(gather, (g) => `${SCATTER[0].y * g}%`);
  const r0 = useTransform(gather, (g) => SCATTER[0].r * g);
  const x1 = useTransform(gather, (g) => `${SCATTER[1].x * g}%`);
  const y1 = useTransform(gather, (g) => `${SCATTER[1].y * g}%`);
  const r1 = useTransform(gather, (g) => SCATTER[1].r * g);
  const x2 = useTransform(gather, (g) => `${SCATTER[2].x * g}%`);
  const y2 = useTransform(gather, (g) => `${SCATTER[2].y * g}%`);
  const r2 = useTransform(gather, (g) => SCATTER[2].r * g);
  const x3 = useTransform(gather, (g) => `${SCATTER[3].x * g}%`);
  const y3 = useTransform(gather, (g) => `${SCATTER[3].y * g}%`);
  const r3 = useTransform(gather, (g) => SCATTER[3].r * g);
  const x4 = useTransform(gather, (g) => `${SCATTER[4].x * g}%`);
  const y4 = useTransform(gather, (g) => `${SCATTER[4].y * g}%`);
  const r4 = useTransform(gather, (g) => SCATTER[4].r * g);
  const x5 = useTransform(gather, (g) => `${SCATTER[5].x * g}%`);
  const y5 = useTransform(gather, (g) => `${SCATTER[5].y * g}%`);
  const r5 = useTransform(gather, (g) => SCATTER[5].r * g);

  const drift = [
    { x: x0, y: y0, rotate: r0 },
    { x: x1, y: y1, rotate: r1 },
    { x: x2, y: y2, rotate: r2 },
    { x: x3, y: y3, rotate: r3 },
    { x: x4, y: y4, rotate: r4 },
    { x: x5, y: y5, rotate: r5 },
  ];

  return (
    <div ref={ref} className="relative mx-auto aspect-[4/3] w-full max-w-[520px]">
      {proposalParts.map((part, i) => (
        <motion.div
          key={part}
          style={
            reduce
              ? {
                  transform: `translate(${SCATTER[i].x / 2}%, ${SCATTER[i].y / 2}%)`,
                }
              : drift[i]
          }
          className="absolute top-1/2 left-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="glass rounded-2xl p-5">
            <span className="font-mono text-[9.5px] tracking-[0.18em] text-faint uppercase">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="mt-3 font-mono text-[11.5px] tracking-[0.14em] text-fg uppercase">
              {part}
            </p>
            <div className="mt-4 space-y-1.5">
              <span className="block h-1.5 w-full rounded-full bg-line-strong" />
              <span className="block h-1.5 w-3/4 rounded-full bg-line" />
              <span className="block h-1.5 w-1/2 rounded-full bg-line" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
