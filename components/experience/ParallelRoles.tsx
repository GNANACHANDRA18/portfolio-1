'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import ChipCloud from '@/components/ChipCloud';
import type { Role } from '@/data/experience';

/**
 * Three roles, drawn as three lanes running at the same time.
 *
 * The page's claim is that these are not a career sequence but three
 * responsibilities held simultaneously, and a stacked vertical timeline
 * quietly argues the opposite — it reads as one thing after another. So the
 * roles get lanes instead, and a single playhead crosses all three at once as
 * the section is scrolled: whatever moment you stop on, all three are running.
 *
 * Pointing at a lane brings it forward and pushes the other two back, which is
 * also true of the job.
 */

const TINTS = [
  'var(--color-ai-cyan)',
  'var(--color-ai-blue)',
  'var(--color-accent)',
];

export default function ParallelRoles({ roles }: { roles: Role[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [focus, setFocus] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 78%', 'end 40%'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });
  const playhead = useTransform(progress, [0, 1], ['0%', '100%']);

  return (
    <div ref={ref} className="relative">
      {/* The playhead crosses every lane at the same instant. */}
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ left: playhead }}
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-linear-to-b from-transparent via-accent to-transparent"
        >
          <span className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_18px_2px_rgba(233,184,114,0.55)]" />
        </motion.div>
      )}

      <ol className="space-y-px overflow-hidden rounded-3xl border border-line bg-line">
        {roles.map((role, i) => {
          const dimmed = focus !== null && focus !== role.id;
          const tint = TINTS[i % TINTS.length];

          return (
            <motion.li
              key={role.id}
              initial={reduce ? false : { opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onPointerEnter={() => setFocus(role.id)}
              onPointerLeave={() => setFocus(null)}
              onFocusCapture={() => setFocus(role.id)}
              onBlurCapture={() => setFocus(null)}
              animate={{
                opacity: dimmed && !reduce ? 0.45 : 1,
                filter: dimmed && !reduce ? 'blur(1.4px)' : 'blur(0px)',
              }}
              className="relative bg-surface/70 p-8 transition-colors duration-500 md:p-11"
              style={{
                borderLeft: `2px solid ${
                  focus === role.id
                    ? tint
                    : `color-mix(in oklab, ${tint} 26%, transparent)`
                }`,
              }}
            >
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <span
                  className="font-mono text-[10.5px] tracking-[0.2em] uppercase"
                  style={{ color: tint }}
                >
                  Lane {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.18em] text-faint uppercase">
                  {role.org}
                </span>
              </div>

              <h3 className="mt-4 text-[clamp(1.35rem,3.4vw,2.3rem)] leading-tight font-medium tracking-[-0.04em] text-fg">
                {role.title}
              </h3>

              <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-muted md:text-base">
                {role.summary}
              </p>

              <ChipCloud
                items={role.responsibilities}
                size="sm"
                tint={tint}
                className="mt-7"
              />
            </motion.li>
          );
        })}
      </ol>

      <p className="mt-6 font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
        All three lanes run at once — the playhead is the same moment in each.
      </p>
    </div>
  );
}
