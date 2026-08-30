'use client';

import { useRef } from 'react';
import {
  MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

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
  progress: MotionValue<number>;
  accent: boolean;
}) {
  const slot = 1 / total;
  const start = index * slot;
  const stops = [start, start + slot * 0.28, start + slot * 0.78, start + slot];

  const opacity = useTransform(progress, stops, [0, 1, 1, 0]);
  const y = useTransform(progress, stops, [42, 0, 0, -42]);
  const blur = useTransform(progress, stops, [
    'blur(12px)',
    'blur(0px)',
    'blur(0px)',
    'blur(12px)',
  ]);

  return (
    <motion.p
      style={{ opacity, y, filter: blur }}
      className={`absolute inset-x-0 text-center text-[clamp(2rem,8.4vw,7rem)] leading-[0.94] font-medium tracking-[-0.055em] ${
        accent ? 'ai-spectrum' : 'text-fg'
      }`}
    >
      {text}
    </motion.p>
  );
}

/**
 * A run of statements that hand over to each other as the section scrolls.
 * Reused wherever a page needs a quiet, typography-only moment.
 */
export default function ScrollSequence({
  lines,
  accentLast = true,
  heightVh,
}: {
  lines: string[];
  accentLast?: boolean;
  heightVh?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  if (reduce) {
    return (
      <section className="py-24 md:py-32">
        <div className="container-x space-y-8 text-center">
          {lines.map((line, i) => (
            <p
              key={line}
              className={`text-[clamp(1.8rem,6.4vw,5rem)] leading-[0.96] font-medium tracking-[-0.05em] ${
                accentLast && i === lines.length - 1 ? 'ai-spectrum' : 'text-fg'
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
    <div
      ref={ref}
      className="relative"
      style={{ height: `${heightVh ?? lines.length * 105}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-x relative w-full">
          {lines.map((line, i) => (
            <Line
              key={line}
              text={line}
              index={i}
              total={lines.length}
              progress={scrollYProgress}
              accent={accentLast && i === lines.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
