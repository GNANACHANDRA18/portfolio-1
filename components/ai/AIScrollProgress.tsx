'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin spectrum bar showing progress through the /ai experience. */
export default function AIScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[85] h-[2px] origin-left bg-linear-to-r from-ai-blue via-ai-magenta to-ai-cyan"
    />
  );
}
