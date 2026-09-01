'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { intersectionCircles, intersectionOutputs } from '@/data/about';
import ChipCloud from '@/components/ChipCloud';

/** Four fields drifting together as the section is scrolled. */
export default function Intersection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  });

  // 1 = fully apart, 0 = fully overlapped.
  const spread = useTransform(scrollYProgress, [0, 1], [1, 0.34]);
  const coreOpacity = useTransform(scrollYProgress, [0.45, 0.85], [0, 1]);
  const coreScale = useTransform(scrollYProgress, [0.45, 0.85], [0.8, 1]);

  const OFFSETS = [
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: 1 },
  ];

  // Declared up front rather than inside the map, so hook order stays fixed.
  const x0 = useTransform(spread, (s) => `${OFFSETS[0].x * s * 42}%`);
  const y0 = useTransform(spread, (s) => `${OFFSETS[0].y * s * 42}%`);
  const x1 = useTransform(spread, (s) => `${OFFSETS[1].x * s * 42}%`);
  const y1 = useTransform(spread, (s) => `${OFFSETS[1].y * s * 42}%`);
  const x2 = useTransform(spread, (s) => `${OFFSETS[2].x * s * 42}%`);
  const y2 = useTransform(spread, (s) => `${OFFSETS[2].y * s * 42}%`);
  const x3 = useTransform(spread, (s) => `${OFFSETS[3].x * s * 42}%`);
  const y3 = useTransform(spread, (s) => `${OFFSETS[3].y * s * 42}%`);
  const drift = [
    { x: x0, y: y0 },
    { x: x1, y: y1 },
    { x: x2, y: y2 },
    { x: x3, y: y3 },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x">
        <p className="mb-12 font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
          The intersection
        </p>

        <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            {intersectionCircles.map((circle, i) => (
              <motion.div
                key={circle.id}
                className="absolute top-1/2 left-1/2 h-[54%] w-[54%] rounded-full border"
                style={
                  reduce
                    ? {
                        marginLeft: '-27%',
                        marginTop: '-27%',
                        transform: `translate(${OFFSETS[i].x * 16}%, ${OFFSETS[i].y * 16}%)`,
                        borderColor: `color-mix(in oklab, ${circle.tint} 45%, transparent)`,
                        background: `color-mix(in oklab, ${circle.tint} 9%, transparent)`,
                      }
                    : {
                        marginLeft: '-27%',
                        marginTop: '-27%',
                        x: drift[i].x,
                        y: drift[i].y,
                        borderColor: `color-mix(in oklab, ${circle.tint} 45%, transparent)`,
                        background: `color-mix(in oklab, ${circle.tint} 9%, transparent)`,
                        backdropFilter: 'blur(2px)',
                      }
                }
              >
                <span
                  className="absolute inset-x-0 top-6 text-center font-mono text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: circle.tint }}
                >
                  {circle.label}
                </span>
              </motion.div>
            ))}

            <motion.div
              style={reduce ? undefined : { opacity: coreOpacity, scale: coreScale }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="text-[clamp(1.6rem,4.4vw,3rem)] leading-none font-medium tracking-[-0.04em] text-fg">
                GNANA
              </span>
            </motion.div>
          </div>

          <div>
            <h2 className="text-[clamp(1.7rem,4.6vw,3.6rem)] leading-[1] font-medium tracking-[-0.045em] text-fg">
              Four fields, one
              <br />
              <span className="ai-spectrum">way of working.</span>
            </h2>
            <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-muted">
              Nothing here is a side interest. The overlap is the job — and it
              is what makes the output different from a specialist working
              alone.
            </p>

            <ChipCloud items={intersectionOutputs} className="mt-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
