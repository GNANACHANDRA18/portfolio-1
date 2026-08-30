'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { storyBeats } from '@/data/about';

/**
 * Scroll-driven story. The beats stack up one at a time while the opening
 * line holds, then everything resolves into the closing statement.
 */
export default function AboutStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // Reserve the first and last fifths for the opening and closing lines.
    const inner = (v - 0.16) / 0.62;
    const next = Math.max(
      0,
      Math.min(storyBeats.length, Math.ceil(inner * storyBeats.length)),
    );
    setShown((prev) => (prev === next ? prev : next));
  });

  const openOpacity = useTransform(scrollYProgress, [0, 0.1, 0.7, 0.82], [1, 1, 1, 0]);
  const closeOpacity = useTransform(scrollYProgress, [0.8, 0.92], [0, 1]);
  const closeY = useTransform(scrollYProgress, [0.8, 0.92], [40, 0]);

  if (reduce) {
    return (
      <section className="py-24 md:py-36">
        <div className="container-x">
          <h2 className="text-[clamp(2rem,6vw,4.6rem)] leading-[0.96] font-medium tracking-[-0.05em] text-fg">
            I START WITH
            <br />
            CURIOSITY.
          </h2>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {storyBeats.map((beat) => (
              <li
                key={beat.word}
                className="rounded-2xl border border-line bg-surface/60 p-6"
              >
                <p className="font-mono text-[11px] tracking-[0.18em] text-fg uppercase">
                  {beat.word}
                </p>
                <p className="mt-2 text-[14px] text-muted">{beat.note}</p>
              </li>
            ))}
          </ul>
          <p className="ai-spectrum mt-14 text-[clamp(2rem,6vw,4.6rem)] leading-[0.96] font-medium tracking-[-0.05em]">
            BUILDING DIGITAL EXPERIENCES.
          </p>
          <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-muted">
            My interests aren&rsquo;t separated into different boxes.
            Development helps me understand how things work. Marketing helps me
            understand why people care. AI helps me move faster and explore more
            possibilities. Creative work helps turn ideas into experiences
            people actually notice.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-x grid w-full gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <motion.h2
            style={{ opacity: openOpacity }}
            className="text-[clamp(2rem,6.4vw,5rem)] leading-[0.94] font-medium tracking-[-0.05em] text-fg"
          >
            I START WITH
            <br />
            CURIOSITY.
          </motion.h2>

          <div className="relative min-h-[320px]">
            <ul className="space-y-2.5">
              {storyBeats.map((beat, i) => {
                const visible = i < shown;
                return (
                  <motion.li
                    key={beat.word}
                    animate={{
                      opacity: visible ? 1 : 0,
                      x: visible ? 0 : 40,
                      filter: visible ? 'blur(0px)' : 'blur(8px)',
                    }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-baseline gap-5 border-b border-line pb-2.5"
                  >
                    <span className="font-mono text-[10px] tracking-[0.16em] text-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[clamp(1.1rem,2.6vw,1.9rem)] leading-tight font-medium tracking-[-0.03em] text-fg">
                      {beat.word}
                    </span>
                    <span className="ml-auto hidden text-right text-[13px] text-muted sm:block">
                      {beat.note}
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              style={{ opacity: closeOpacity, y: closeY }}
              className="absolute inset-0 flex flex-col justify-center bg-bg"
            >
              <p className="ai-spectrum text-[clamp(1.7rem,4.6vw,3.6rem)] leading-[0.98] font-medium tracking-[-0.05em]">
                BUILDING DIGITAL
                <br />
                EXPERIENCES.
              </p>
              <p className="mt-7 max-w-lg text-[15.5px] leading-relaxed text-muted">
                My interests aren&rsquo;t separated into different boxes.
                Development helps me understand how things work. Marketing helps
                me understand why people care. AI helps me move faster and
                explore more possibilities. Creative work helps turn ideas into
                experiences people actually notice.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
