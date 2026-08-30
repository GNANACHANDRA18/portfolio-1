'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { marqueeTopics } from '@/data/business';

/**
 * Two counter-running bands of subjects. Pointer position nudges the speed
 * slightly — enough to feel responsive, never enough to look unstable.
 */
export default function TopicsMarquee() {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const host = hostRef.current;
    if (!host) return;

    const onMove = (e: PointerEvent) => {
      const bias = e.clientX / window.innerWidth; // 0 → 1
      // 0.7× at the left edge, 1.3× at the right.
      const factor = 0.7 + bias * 0.6;
      host.style.setProperty('--marquee-duration', `${42 / factor}s`);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce]);

  const Band = ({ reverse }: { reverse?: boolean }) => (
    <div className="flex overflow-hidden">
      <div
        className={`marquee-track flex shrink-0 items-center gap-10 pr-10 ${
          reverse ? 'reverse' : ''
        }`}
      >
        {/* Duplicated so the loop is seamless at -50%. */}
        {[...marqueeTopics, ...marqueeTopics].map((topic, i) => (
          <span key={`${topic}-${i}`} className="flex shrink-0 items-center gap-10">
            <span className="font-mono text-[clamp(1.1rem,3vw,2.2rem)] tracking-[-0.02em] whitespace-nowrap text-faint transition-colors duration-300 hover:text-fg">
              {topic}
            </span>
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong"
            />
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={hostRef} className="space-y-5 py-2">
      <span className="sr-only">
        Subjects I explore: {marqueeTopics.join(', ')}.
      </span>
      <div aria-hidden>
        <Band />
      </div>
      <div aria-hidden>
        <Band reverse />
      </div>
    </div>
  );
}
