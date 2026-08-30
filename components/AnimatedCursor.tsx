'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { accentFor } from '@/lib/theme';

/**
 * The site's single custom pointer.
 *
 * A crisp dot rides the pointer exactly, a ring trails it on a spring, and a
 * soft light lags further behind. Elements opt into a state with
 * `data-cursor="…"`; `data-cursor-label` puts arbitrary text in the ring.
 *
 * Named states carry their own label and tint, so a link only has to say what
 * it is — `data-cursor="view"` — and the pointer explains it.
 *
 * Fine-pointer devices only, never under reduced motion.
 */

type State =
  | 'default'
  | 'magnet'
  | 'text'
  | 'orb'
  | 'view'
  | 'open'
  | 'explore'
  | 'ai'
  | 'code'
  | 'follow'
  | 'drag'
  | 'send';

type Shape = {
  size: number;
  border: number;
  fill: string;
  opacity: number;
  /** Text shown inside the ring. */
  label?: string;
  tint?: string;
  /** Hide the inner dot when the ring carries content of its own. */
  hideDot?: boolean;
};

const BLUE = 'rgba(59,107,255,';
const VIOLET = 'rgba(139,92,246,';
const CYAN = 'rgba(34,211,238,';
const MAGENTA = 'rgba(229,57,155,';
const GOLD = 'rgba(233,184,114,';

const STATES: Record<State, Shape> = {
  default: { size: 30, border: 1.2, fill: 'transparent', opacity: 0.5 },
  text: { size: 16, border: 1.2, fill: 'transparent', opacity: 0.85 },
  magnet: { size: 52, border: 1.2, fill: `${BLUE}0.12)`, opacity: 1 },
  orb: { size: 84, border: 0, fill: `${VIOLET}0.2)`, opacity: 1 },

  view: {
    size: 104,
    border: 0,
    fill: 'rgba(245,245,240,0.95)',
    opacity: 1,
    label: 'View',
    tint: '#050505',
    hideDot: true,
  },
  open: {
    size: 104,
    border: 0,
    fill: 'rgba(245,245,240,0.95)',
    opacity: 1,
    label: 'Open',
    tint: '#050505',
    hideDot: true,
  },
  explore: {
    size: 108,
    border: 0,
    fill: `${VIOLET}0.92)`,
    opacity: 1,
    label: 'Explore',
    tint: '#ffffff',
    hideDot: true,
  },
  ai: {
    size: 108,
    border: 0,
    fill: `${BLUE}0.92)`,
    opacity: 1,
    label: 'AI',
    tint: '#ffffff',
    hideDot: true,
  },
  code: {
    size: 108,
    border: 0,
    fill: `${CYAN}0.92)`,
    opacity: 1,
    label: 'Code',
    tint: '#050505',
    hideDot: true,
  },
  follow: {
    size: 108,
    border: 0,
    fill: `${MAGENTA}0.92)`,
    opacity: 1,
    label: 'Follow',
    tint: '#ffffff',
    hideDot: true,
  },
  send: {
    size: 108,
    border: 0,
    fill: `${GOLD}0.95)`,
    opacity: 1,
    label: 'Send',
    tint: '#050505',
    hideDot: true,
  },
  drag: {
    size: 96,
    border: 1.4,
    fill: 'rgba(245,245,240,0.06)',
    opacity: 1,
    label: '← Drag →',
    hideDot: true,
  },
};

const NAMED = new Set<string>(Object.keys(STATES));

/** Ripples live outside React state so a fast click never re-renders the tree. */
type Ripple = { id: number; x: number; y: number };

export default function AnimatedCursor() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [state, setState] = useState<State>('default');
  const [freeLabel, setFreeLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  const enabled = fine && !reduce;
  const accent = accentFor(pathname);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.55 });
  const trailX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.95 });
  const trailY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.95 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const dropRipple = useCallback((id: number) => {
    setRipples((list) => list.filter((r) => r.id !== id));
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = (e.target as HTMLElement | null)?.closest?.(
        '[data-cursor], [data-cursor-label], a, button, input, select, textarea',
      ) as HTMLElement | null;

      if (!el) {
        setState('default');
        setFreeLabel('');
        return;
      }

      const declared = el.dataset.cursor ?? '';
      const declaredLabel = el.dataset.cursorLabel ?? '';

      // A named state wins; it already carries its own label and tint.
      if (NAMED.has(declared) && declared !== 'label') {
        setFreeLabel('');
        setState(declared as State);
        return;
      }

      if (declaredLabel) {
        setFreeLabel(declaredLabel);
        setState('view');
        return;
      }

      setFreeLabel('');
      if (el.tagName === 'A' || el.tagName === 'BUTTON') setState('magnet');
      else setState('text');
    };

    const onLeave = () => setVisible(false);

    const onDown = (e: PointerEvent) => {
      setPressed(true);
      const id = ++rippleId.current;
      setRipples((list) => [...list.slice(-3), { id, x: e.clientX, y: e.clientY }]);
    };

    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, x, y]);

  // Reset between routes so a stale hover state never sticks.
  useEffect(() => {
    setState('default');
    setFreeLabel('');
  }, [pathname]);

  if (!enabled) return null;

  const shape = STATES[state];
  const label = freeLabel || shape.label || '';
  const showLabel = Boolean(label) && shape.size >= 90;
  const wide = state === 'default' || state === 'text';

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95] hidden md:block"
    >
      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute rounded-full border"
            style={{
              left: r.x,
              top: r.y,
              borderColor: accent,
              marginLeft: -6,
              marginTop: -6,
            }}
            initial={{ width: 12, height: 12, opacity: 0.85 }}
            animate={{
              width: 72,
              height: 72,
              marginLeft: -36,
              marginTop: -36,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => dropRipple(r.id)}
          />
        ))}
      </AnimatePresence>

      {/* Trailing light */}
      <motion.div
        className="absolute top-0 left-0 rounded-full"
        style={{
          x: trailX,
          y: trailY,
          width: 130,
          height: 130,
          marginLeft: -65,
          marginTop: -65,
          background: `radial-gradient(circle, ${accent}26, transparent 66%)`,
          filter: 'blur(8px)',
        }}
        animate={{ opacity: visible ? (wide ? 0.5 : 0.85) : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Ring */}
      <motion.div
        className="absolute top-0 left-0 grid place-items-center rounded-full"
        style={{ x: ringX, y: ringY, borderStyle: 'solid', borderColor: accent }}
        animate={{
          width: shape.size,
          height: shape.size,
          marginLeft: -shape.size / 2,
          marginTop: -shape.size / 2,
          borderWidth: shape.border,
          backgroundColor: shape.fill,
          opacity: visible ? shape.opacity : 0,
          scale: pressed ? 0.88 : 1,
        }}
        transition={{ type: 'spring', stiffness: 340, damping: 26 }}
      >
        <AnimatePresence mode="wait">
          {showLabel && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="px-3 text-center font-mono text-[9.5px] leading-tight tracking-[0.16em] uppercase"
              style={{ color: shape.tint ?? '#f5f5f0' }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Dot */}
      <motion.div
        className="absolute top-0 left-0 rounded-full"
        style={{ x, y, backgroundColor: accent }}
        animate={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          opacity: visible && !shape.hideDot ? 1 : 0,
        }}
        transition={{ duration: 0.18 }}
      />
    </div>
  );
}
