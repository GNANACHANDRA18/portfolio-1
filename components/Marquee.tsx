'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * A band of short strings running across the page.
 *
 * The site already used this idea once, hard-wired to the marketing topics;
 * this is the same motion made general, so any flat list — roles, a tech
 * stack, disciplines — can be read as movement instead of as a paragraph of
 * commas. Two bands running against each other read as a system in motion;
 * one band reads as a ticker.
 *
 * Pointer position nudges the speed a little, so the band answers the visitor
 * without ever looking unstable. Reduced motion drops it to a static,
 * wrapped list of the same words.
 */
export default function Marquee({
  items,
  rows = 2,
  speed = 42,
  label,
}: {
  items: readonly string[];
  /** 1 = ticker, 2 = counter-running pair. */
  rows?: 1 | 2;
  /** Seconds for one full traverse. Longer reads calmer. */
  speed?: number;
  /** Screen-reader sentence introducing the list. */
  label: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const host = hostRef.current;
    if (!host) return;

    const onMove = (e: PointerEvent) => {
      // 0.7× at the left edge of the viewport, 1.3× at the right.
      const factor = 0.7 + (e.clientX / window.innerWidth) * 0.6;
      host.style.setProperty('--marquee-duration', `${speed / factor}s`);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, speed]);

  if (reduce) {
    return (
      <ul className="flex flex-wrap gap-x-8 gap-y-3">
        {items.map((item) => (
          <li key={item} className="font-mono text-[15px] text-faint">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  const Band = ({ reverse }: { reverse?: boolean }) => (
    <div className="flex overflow-hidden">
      <div
        className={`marquee-track flex shrink-0 items-center gap-10 pr-10 ${
          reverse ? 'reverse' : ''
        }`}
      >
        {/* Duplicated so the loop is seamless at -50%. */}
        {[...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center gap-10">
            <span className="font-mono text-[clamp(1.1rem,3vw,2.2rem)] tracking-[-0.02em] whitespace-nowrap text-faint transition-colors duration-300 hover:text-fg">
              {item}
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
    <div
      ref={hostRef}
      className="space-y-5 py-2"
      style={{ '--marquee-duration': `${speed}s` } as React.CSSProperties}
    >
      <span className="sr-only">
        {label} {items.join(', ')}.
      </span>
      <div aria-hidden>
        <Band />
      </div>
      {rows === 2 && (
        <div aria-hidden>
          <Band reverse />
        </div>
      )}
    </div>
  );
}
