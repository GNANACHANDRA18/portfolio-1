'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import GlassPanel from './GlassPanel';
import Media from './Media';
import type { MediaKey } from '@/data/media';

/**
 * The image system, shown as glass.
 *
 * Every backdrop on this site is generated rather than photographed — six
 * visual languages, one per kind of page. This section puts them behind panes
 * of glass and lets a visitor step through them: the large pane crossfades,
 * the rail of chips tracks position, and the whole thing advances on its own
 * until someone touches it, at which point it hands control over and stays
 * handed over.
 *
 * Everything animated here is decorative. With reduced motion the autoplay
 * never starts, the crossfade collapses to an instant swap, and the section
 * still works as a plain gallery.
 */

export type GlassSlide = {
  src: MediaKey | (string & {});
  /** Short name of the visual language, e.g. 'Nebula'. */
  label: string;
  /** Where this language is used. */
  role: string;
  /** One line on what the language is doing. */
  note: string;
  /** Rim colour for this slide's glass. */
  rim: string;
};

const AUTOPLAY_MS = 5200;

export default function GlassGallery({
  slides,
  eyebrow = 'Image system',
  className = '',
}: {
  slides: GlassSlide[];
  eyebrow?: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Autoplay runs until the visitor interacts, then stops for good — a
  // carousel that keeps moving under someone's cursor is a nuisance.
  useEffect(() => {
    if (engaged || reduce || slides.length < 2) return;
    timer.current = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      AUTOPLAY_MS,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [engaged, reduce, slides.length]);

  const select = useCallback((index: number) => {
    setEngaged(true);
    setActive(index);
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        select((active + 1) % slides.length);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        select((active - 1 + slides.length) % slides.length);
      }
    },
    [active, select, slides.length],
  );

  const current = slides[active];

  return (
    <div
      className={`grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-8 ${className}`}
      onKeyDown={onKeyDown}
    >
      {/* The pane */}
      <GlassPanel
        density="thin"
        rim={current.rim}
        className="relative min-h-[300px] overflow-hidden md:min-h-[440px]"
      >
        <div data-glass-bg className="absolute inset-0 z-0">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={current.src}
              className="absolute inset-0"
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
              transition={{ duration: reduce ? 0 : 1.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Media
                src={current.src}
                alt=""
                treatment="clean"
                sizes="(max-width: 1024px) 100vw, 760px"
                inset
                imageClassName="brightness-[1.45] saturate-[1.1]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Reads the plate down so the caption stays legible on every language. */}
        <div
          aria-hidden
          data-glass-bg
          className="absolute inset-0 z-[1] bg-gradient-to-t from-bg/90 via-bg/10 to-bg/30"
        />

        <div className="relative flex h-full min-h-[300px] flex-col justify-between p-6 md:min-h-[440px] md:p-9">
          <span className="eyebrow">{eyebrow}</span>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.label}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-[10.5px] tracking-[0.22em] text-faint uppercase">
                {current.role}
              </p>
              <h3 className="mt-3 text-[clamp(1.7rem,4vw,3rem)] leading-[1.02] font-medium tracking-[-0.045em] text-fg">
                {current.label}
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
                {current.note}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </GlassPanel>

      {/* The rail */}
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 lg:content-start">
        {slides.map((slide, index) => {
          const selected = index === active;
          return (
            <li key={slide.src}>
              <GlassPanel
                as="div"
                density="thin"
                interactive
                rim={slide.rim}
                className={`h-full transition-opacity duration-500 ${
                  selected ? 'opacity-100' : 'opacity-[0.72] hover:opacity-100'
                }`}
              >
                <button
                  type="button"
                  onClick={() => select(index)}
                  onFocus={() => select(index)}
                  aria-pressed={selected}
                  data-cursor="magnet"
                  className="group relative block w-full cursor-pointer text-left"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden">
                    <Media
                      src={slide.src}
                      alt=""
                      treatment="clean"
                      sizes="(max-width: 1024px) 40vw, 220px"
                      inset
                      imageClassName="brightness-[1.5] saturate-[1.1] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    {/* Active marker: a lit hairline along the bottom edge. */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        background: slide.rim,
                        transform: `scaleX(${selected ? 1 : 0})`,
                      }}
                    />
                  </span>
                  <span className="block px-4 py-3.5">
                    <span className="block text-[13.5px] font-medium tracking-[-0.01em] text-fg">
                      {slide.label}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                      {slide.role}
                    </span>
                  </span>
                </button>
              </GlassPanel>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
