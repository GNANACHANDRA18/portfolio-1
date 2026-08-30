'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Wraps a control so it leans toward the pointer. Movement is capped, so the
 * hit area never drifts far from where the element is drawn.
 */
export default function Magnetic({
  children,
  strength = 0.32,
  max = 14,
  className = '',
}: {
  children: React.ReactNode;
  strength?: number;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.5 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.5 });

  const clamp = (n: number) => Math.max(-max, Math.min(max, n));

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(clamp((e.clientX - (rect.left + rect.width / 2)) * strength));
    my.set(clamp((e.clientY - (rect.top + rect.height / 2)) * strength));
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  if (reduce) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
