'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

type Variant = 'solid' | 'outline' | 'ghost';

type Props = {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  variant?: Variant;
  arrow?: '↗' | '→' | '↓' | null;
  className?: string;
  cursor?: string;
  cursorLabel?: string;
  ariaLabel?: string;
};

/* Token-based so the same button reads correctly on light and dark surfaces. */
const VARIANTS: Record<Variant, string> = {
  solid: 'bg-fg text-bg hover:shadow-[0_18px_50px_-20px_rgba(20,20,60,0.55)]',
  outline:
    'border border-line-strong bg-surface/60 text-fg backdrop-blur-md hover:border-accent/60',
  ghost: 'text-fg hover:text-accent',
};

/**
 * The site's single button system.
 *
 * The control leans toward the pointer, its label drifts slightly further,
 * the arrow slides on hover, and a click leaves a short ripple. All of it
 * collapses to a plain button under reduced motion.
 */
export default function MagneticButton({
  children,
  href,
  external,
  onClick,
  variant = 'solid',
  arrow = '↗',
  className = '',
  cursor = 'magnet',
  cursorLabel,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>(
    [],
  );

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 250, damping: 17, mass: 0.5 });
  const y = useSpring(my, { stiffness: 250, damping: 17, mass: 0.5 });
  // The label trails the shell slightly, which reads as weight.
  const lx = useSpring(mx, { stiffness: 180, damping: 20, mass: 0.7 });
  const ly = useSpring(my, { stiffness: 180, damping: 20, mass: 0.7 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mx.set(Math.max(-16, Math.min(16, dx * 0.32)));
    my.set(Math.max(-16, Math.min(16, dy * 0.32)));
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const spawnRipple = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const id = e.timeStamp;
    setRipples((r) => [
      ...r,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    window.setTimeout(
      () => setRipples((r) => r.filter((item) => item.id !== id)),
      620,
    );
  };

  const base =
    'group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-4 font-mono text-[11.5px] tracking-[0.16em] uppercase transition-colors duration-300';

  const inner = (
    <>
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-current opacity-20"
          style={{ left: r.x, top: r.y, marginLeft: -4, marginTop: -4 }}
          initial={{ width: 8, height: 8, opacity: 0.24 }}
          animate={{ width: 320, height: 320, marginLeft: -160, marginTop: -160, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      <motion.span
        style={reduce ? undefined : { x: lx, y: ly }}
        className="relative inline-flex items-center gap-2"
      >
        {children}
        {arrow && (
          <span
            aria-hidden
            className={`transition-transform duration-300 ${
              arrow === '↓'
                ? 'group-hover:translate-y-0.5'
                : arrow === '→'
                  ? 'group-hover:translate-x-1'
                  : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            }`}
          >
            {arrow}
          </span>
        )}
      </motion.span>
    </>
  );

  const shellProps = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: reset,
    onMouseDown: spawnRipple,
    style: reduce ? undefined : { x, y, display: 'inline-block' },
    className: 'inline-block',
  } as const;

  const controlClass = `${base} ${VARIANTS[variant]} ${className}`;
  const dataAttrs = {
    'data-cursor': cursor,
    ...(cursorLabel ? { 'data-cursor-label': cursorLabel } : {}),
  };

  return (
    <motion.span {...shellProps}>
      {href ? (
        external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className={controlClass}
            {...dataAttrs}
          >
            {inner}
          </a>
        ) : (
          <Link
            href={href}
            aria-label={ariaLabel}
            className={controlClass}
            {...dataAttrs}
          >
            {inner}
          </Link>
        )
      ) : (
        <button
          type="button"
          onClick={onClick}
          aria-label={ariaLabel}
          className={controlClass}
          {...dataAttrs}
        >
          {inner}
        </button>
      )}
    </motion.span>
  );
}
