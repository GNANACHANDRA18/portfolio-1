'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { workflowSteps } from '@/data/home';

export default function WorkflowTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 78%', 'end 55%'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="container-x">
        <h2 className="max-w-4xl text-[clamp(1.9rem,5.6vw,4.6rem)] leading-[0.98] font-medium tracking-[-0.05em]">
          <span className="sr-only">How I turn ideas into outcomes.</span>
          {['HOW I TURN IDEAS', 'INTO OUTCOMES.'].map((line, i) => (
            <span
              key={line}
              aria-hidden
              className="block overflow-hidden pb-[0.05em]"
            >
              <motion.span
                className={`block ${i === 1 ? 'ai-spectrum' : 'text-fg'}`}
                initial={reduce ? false : { y: '112%' }}
                whileInView={reduce ? undefined : { y: '0%' }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{
                  duration: 1,
                  delay: i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <div ref={ref} className="relative mt-20">
          {/* Rail */}
          <span
            aria-hidden
            className="absolute top-[9px] left-0 hidden h-px w-full bg-line lg:block"
          />
          {!reduce && (
            <motion.span
              aria-hidden
              style={{ scaleX: progress }}
              className="absolute top-[9px] left-0 hidden h-px w-full origin-left bg-linear-to-r from-ai-blue via-ai-violet to-ai-cyan lg:block"
            />
          )}
          {/* Vertical rail on small screens */}
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-[9px] w-px bg-line lg:hidden"
          />
          {!reduce && (
            <motion.span
              aria-hidden
              style={{ scaleY: progress }}
              className="absolute top-0 bottom-0 left-[9px] w-px origin-top bg-linear-to-b from-ai-blue via-ai-violet to-ai-cyan lg:hidden"
            />
          )}

          <ol className="grid gap-10 lg:grid-cols-7 lg:gap-4">
            {workflowSteps.map((step, i) => (
              <motion.li
                key={step.label}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pl-9 lg:pl-0"
              >
                <span
                  aria-hidden
                  className="absolute top-[3px] left-[3px] grid h-3 w-3 place-items-center rounded-full border border-accent/60 bg-bg lg:top-[3px] lg:left-[3px]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>

                <span className="block pt-0 lg:pt-9">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-2 font-mono text-[12.5px] tracking-[0.16em] text-fg uppercase">
                    {step.label}
                  </p>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                    {step.note}
                  </p>
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
