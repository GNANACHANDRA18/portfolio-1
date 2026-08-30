'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { philosophyLines } from '@/data/home';

/** One line at a time, handed over as the section is scrolled. */
function Line({
  text,
  index,
  total,
  progress,
  accent,
}: {
  text: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  accent: boolean;
}) {
  const slot = 1 / total;
  const start = index * slot;

  const opacity = useTransform(
    progress,
    [start, start + slot * 0.28, start + slot * 0.78, start + slot],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [start, start + slot * 0.28, start + slot * 0.78, start + slot],
    [40, 0, 0, -40],
  );
  const blur = useTransform(
    progress,
    [start, start + slot * 0.28, start + slot * 0.78, start + slot],
    ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(12px)'],
  );

  return (
    <motion.p
      style={{ opacity, y, filter: blur }}
      className={`absolute inset-x-0 text-center text-[clamp(2.2rem,9vw,7.5rem)] leading-[0.94] font-medium tracking-[-0.055em] ${
        accent ? 'ai-spectrum' : 'text-fg'
      }`}
    >
      {text}
    </motion.p>
  );
}

export default function PhilosophySequence() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  if (reduce) {
    return (
      <section className="py-28 md:py-40">
        <div className="container-x space-y-10 text-center">
          {philosophyLines.map((line, i) => (
            <p
              key={line}
              className={`text-[clamp(2rem,7vw,5.5rem)] leading-[0.96] font-medium tracking-[-0.05em] ${
                i === philosophyLines.length - 1 ? 'ai-spectrum' : 'text-fg'
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-x relative w-full">
          {philosophyLines.map((line, i) => (
            <Line
              key={line}
              text={line}
              index={i}
              total={philosophyLines.length}
              progress={scrollYProgress}
              accent={i === philosophyLines.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
