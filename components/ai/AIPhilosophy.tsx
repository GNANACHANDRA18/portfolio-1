'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * Two statements that trade places as the section is scrolled: the first
 * recedes, the second arrives.
 */
export default function AIPhilosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const firstOpacity = useTransform(scrollYProgress, [0.05, 0.42], [1, 0]);
  const firstY = useTransform(scrollYProgress, [0.05, 0.42], [0, -50]);
  const firstBlur = useTransform(scrollYProgress, [0.05, 0.42], ['blur(0px)', 'blur(12px)']);

  const secondOpacity = useTransform(scrollYProgress, [0.48, 0.78], [0, 1]);
  const secondY = useTransform(scrollYProgress, [0.48, 0.78], [50, 0]);
  const secondBlur = useTransform(scrollYProgress, [0.48, 0.78], ['blur(12px)', 'blur(0px)']);

  const lineWidth = useTransform(scrollYProgress, [0.3, 0.7], ['0%', '100%']);

  if (reduce) {
    return (
      <section className="py-28 md:py-40">
        <div className="container-x space-y-14 text-center">
          <p className="text-[clamp(2rem,7vw,5.5rem)] leading-[0.98] font-medium tracking-[-0.05em] text-fg">
            DON&rsquo;T USE AI
            <br />
            TO THINK LESS.
          </p>
          <p className="ai-spectrum text-[clamp(2rem,7vw,5.5rem)] leading-[0.98] font-medium tracking-[-0.05em]">
            USE AI
            <br />
            TO THINK BIGGER.
          </p>
          <p className="mx-auto max-w-xl text-[17px] leading-relaxed text-muted">
            AI can accelerate execution. Human judgment gives the work direction.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-x relative w-full text-center">
          <motion.p
            style={{ opacity: firstOpacity, y: firstY, filter: firstBlur }}
            className="absolute inset-x-0 text-[clamp(2rem,7.6vw,6rem)] leading-[0.96] font-medium tracking-[-0.05em] text-fg"
          >
            DON&rsquo;T USE AI
            <br />
            TO THINK LESS.
          </motion.p>

          <motion.p
            style={{ opacity: secondOpacity, y: secondY, filter: secondBlur }}
            className="ai-spectrum absolute inset-x-0 text-[clamp(2rem,7.6vw,6rem)] leading-[0.96] font-medium tracking-[-0.05em]"
          >
            USE AI
            <br />
            TO THINK BIGGER.
          </motion.p>

          <motion.span
            aria-hidden
            style={{ width: lineWidth }}
            className="absolute inset-x-0 top-1/2 mx-auto h-px max-w-md bg-linear-to-r from-transparent via-ai-violet to-transparent"
          />

          <motion.p
            style={{ opacity: secondOpacity }}
            className="absolute inset-x-0 top-[62%] mx-auto max-w-xl text-[16px] leading-relaxed text-muted md:text-[17px]"
          >
            AI can accelerate execution. Human judgment gives the work
            direction.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
