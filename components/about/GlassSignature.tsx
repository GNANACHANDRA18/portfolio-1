'use client';

import { useCallback, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import GlassPanel from '@/components/media/GlassPanel';
import { site } from '@/data/site';

/**
 * The name, signed on glass.
 *
 * The page used to end on the attribution under the quote — eleven grey
 * monospace characters — which is a weak last thing to leave a visitor with.
 * This is the replacement, and it is deliberately over-built, because it is
 * the final frame of the page and nothing follows it but links.
 *
 * Five things move, none of them on the same clock:
 *
 *   1. the letters set themselves, one after another, rising out of blur;
 *   2. a specular band crosses them on a loop (CSS, `sig-letter`);
 *   3. a refracted colour ghost breathes behind the glass (`sig-ghost`);
 *   4. the pane tilts toward the pointer, and each letter answers the tilt at
 *      its own depth, so the word has thickness;
 *   5. the pane's own rim light and specular highlight, inherited from
 *      GlassPanel.
 *
 * Under reduced motion the tilt is not wired up and every loop is disabled in
 * CSS: the name sits still on the glass, which is the same design without the
 * performance.
 */

const NAME = 'GNANA CHANDRA';

export default function GlassSignature() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // -1 → 1 across the pane, both axes.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 110, damping: 18, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 110, damping: 18, mass: 0.7 });

  const rotateY = useTransform(sx, [-1, 1], [7, -7]);
  const rotateX = useTransform(sy, [-1, 1], [-5, 5]);
  const ghostX = useTransform(sx, [-1, 1], ['3%', '-3%']);

  const track = useCallback(
    (event: React.PointerEvent) => {
      if (reduce) return;
      const box = ref.current?.getBoundingClientRect();
      if (!box) return;
      px.set(((event.clientX - box.left) / box.width) * 2 - 1);
      py.set(((event.clientY - box.top) / box.height) * 2 - 1);
    },
    [px, py, reduce],
  );

  const release = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  const letters = NAME.split('');

  return (
    <div
      ref={ref}
      onPointerMove={track}
      onPointerLeave={release}
      className="[perspective:1200px]"
    >
      <motion.div
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <GlassPanel
          density="thick"
          float={!reduce}
          rim="var(--color-accent)"
          className="relative px-6 py-12 text-center md:px-14 md:py-16"
        >
          <p className="mb-8 font-mono text-[10.5px] tracking-[0.26em] text-faint uppercase">
            Signed
          </p>

          {/* The refracted copy, behind the glass. */}
          {!reduce && (
            <motion.span
              aria-hidden
              style={{ x: ghostX }}
              className="sig-ghost pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-[clamp(2rem,9vw,7rem)] leading-[0.9] font-medium tracking-[-0.055em] select-none"
            >
              {NAME}
            </motion.span>
          )}

          <p className="relative">
            <span className="sr-only">{site.name}</span>

            <span
              aria-hidden
              className="flex flex-wrap items-baseline justify-center text-[clamp(2rem,9vw,7rem)] leading-[0.9] font-medium tracking-[-0.055em] [transform-style:preserve-3d]"
            >
              {letters.map((char, i) => {
                if (char === ' ') return <span key={`sp-${i}`} className="w-[0.3em]" />;

                // Each letter sits at its own depth, so the word answers the
                // tilt as an object rather than as a decal. `z` is framer's
                // translateZ — a raw CSS `translateZ` key is not a property
                // and would be dropped without a word.
                const depth = reduce ? 0 : 18 + (i % 4) * 14;

                return (
                  <motion.span
                    key={`${char}-${i}`}
                    initial={
                      reduce
                        ? false
                        : { opacity: 0, y: '55%', filter: 'blur(14px)', z: depth }
                    }
                    whileInView={{ opacity: 1, y: '0%', filter: 'blur(0px)', z: depth }}
                    viewport={{ once: true, margin: '-90px' }}
                    transition={{
                      duration: 1,
                      delay: 0.1 + i * 0.055,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ '--sig-delay': `${i * 0.14}s` } as React.CSSProperties}
                    className="sig-letter inline-block"
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          </p>

          {/* Hairline with a light running along it. */}
          <span
            aria-hidden
            className="sig-underline relative mx-auto mt-10 block h-px w-[62%] max-w-md overflow-hidden bg-line-strong"
          />

          <p className="mt-8 font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase">
            {site.role}
          </p>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
