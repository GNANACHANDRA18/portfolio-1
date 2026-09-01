'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * A number that arrives instead of appearing.
 *
 * Only for figures a visitor is meant to register — a count of areas, years,
 * projects. It counts once, the first time it is scrolled into view, and it
 * renders the final value immediately under reduced motion and before
 * hydration, so the number in the markup is always the true one.
 */
export default function CountUp({
  value,
  duration = 1.3,
  prefix = '',
  suffix = '',
  className = '',
}: {
  value: number;
  /** Seconds for the whole run. */
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (reduce || !inView) return;

    let frame = 0;
    const start = performance.now();
    const run = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      // Ease-out, so the last digits settle rather than snap.
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(run);
    };

    setShown(0);
    frame = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
