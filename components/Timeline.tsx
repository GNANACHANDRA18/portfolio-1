'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import type { Role } from '@/data/experience';

export default function Timeline({ roles }: { roles: Role[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <ol ref={ref} className="relative ml-1 space-y-14 md:ml-2">
      <div
        aria-hidden
        className="absolute top-2 bottom-2 left-0 w-px bg-line md:left-0"
      />
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute top-2 bottom-2 left-0 w-px origin-top bg-linear-to-b from-accent to-accent/10"
        />
      )}

      {roles.map((role, i) => (
        <motion.li
          key={role.id}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative pl-8 md:pl-12"
        >
          <span
            aria-hidden
            className="absolute top-2 -left-[4.5px] h-2.5 w-2.5 rounded-full border border-accent/60 bg-bg"
          >
            <span className="absolute inset-[3px] rounded-full bg-accent" />
          </span>

          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            {role.org}
          </p>
          <h3 className="mt-3 text-2xl leading-tight tracking-tight text-fg md:text-[32px]">
            {role.title}
          </h3>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted md:text-base">
            {role.summary}
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {role.responsibilities.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line bg-surface/50 px-3.5 py-1.5 text-[13px] text-muted transition-colors duration-300 hover:border-accent/40 hover:text-fg"
              >
                {item}
              </li>
            ))}
          </ul>

          <span className="sr-only">
            Position {i + 1} of {roles.length}
          </span>
        </motion.li>
      ))}
    </ol>
  );
}
