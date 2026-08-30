'use client';

import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Site-wide atmosphere: a fine grid, a grain wash and two light fields that
 * drift toward the pointer. It sits behind everything at very low opacity —
 * present enough to give flat white areas depth, never enough to compete with
 * content.
 *
 * Pointer tracking writes CSS variables rather than re-rendering React.
 */
export default function AmbientBackground() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    let raf = 0;
    let tx = 0.5;
    let ty = 0.35;
    let cx = 0.5;
    let cy = 0.35;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight;
    };

    const loop = () => {
      // Heavy easing keeps the light lagging well behind the pointer.
      cx += (tx - cx) * 0.028;
      cy += (ty - cy) * 0.028;
      document.documentElement.style.setProperty('--amb-x', `${cx * 100}%`);
      document.documentElement.style.setProperty('--amb-y', `${cy * 100}%`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduce]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="ambient-light absolute inset-0" />
      <div className="ambient-grid absolute inset-0" />
    </div>
  );
}
