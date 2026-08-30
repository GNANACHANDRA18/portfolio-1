'use client';

/**
 * THE SIGNAL — the site's recurring motif.
 *
 * A pulse of light travelling along a hairline. It marks the header edge,
 * section boundaries, the footer and the moment a route changes, so unrelated
 * pages still read as one system. Purely decorative: no layout cost beyond a
 * 1px rule, no JavaScript, and it stops under reduced motion.
 *
 *   <Signal />                       a full-width rule
 *   <Signal delay={1.4} speed={9} /> staggered against a neighbour
 *   <Signal.Dot />                   the same idea at a single point
 */

type SignalProps = {
  /** Seconds before the pulse first runs. Stagger stacked rails. */
  delay?: number;
  /** Seconds for one traverse. Longer reads calmer. */
  speed?: number;
  className?: string;
};

export default function Signal({
  delay = 0,
  speed = 7,
  className = '',
}: SignalProps) {
  return (
    <div
      aria-hidden
      className={`signal-rail h-px w-full ${className}`}
      style={
        {
          '--signal-delay': `${delay}s`,
          '--signal-duration': `${speed}s`,
        } as React.CSSProperties
      }
    />
  );
}

/** The signal reduced to a point — used beside eyebrows and live labels. */
function Dot({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`signal-dot inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent ${className}`}
    />
  );
}

Signal.Dot = Dot;
