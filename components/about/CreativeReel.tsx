'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Media from '@/components/media/Media';
import { creativeReel } from '@/data/about';

/**
 * The creative disciplines, played as a reel.
 *
 * A claim about creative work is worth what the presentation of it is worth,
 * so this section behaves like the thing it describes: one frame holds the
 * stage, the plate behind it belongs to that discipline, and the reel advances
 * on its own until a visitor takes over. Hover, focus or a click stops the
 * timer for good — nothing should move under someone who is reading.
 *
 * Built as a real tablist, so a keyboard reaches every frame with the arrow
 * keys; reduced-motion visitors get the same content with the timer and the
 * crossfade switched off.
 */

const DWELL = 5200;

export default function CreativeReel() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const reduce = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const paused = held || !!reduce;
  const current = creativeReel[active];

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % creativeReel.length),
      DWELL,
    );
    return () => window.clearTimeout(id);
  }, [active, paused]);

  // Arrow keys move between frames the way a tablist is expected to.
  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    const last = creativeReel.length - 1;
    const step =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? 1
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? -1
          : 0;
    const jump = event.key === 'Home' ? 0 : event.key === 'End' ? last : null;
    if (!step && jump === null) return;

    event.preventDefault();
    setHeld(true);
    setActive((i) => {
      const to = jump ?? (i + step + last + 1) % (last + 1);
      tabs.current[to]?.focus();
      return to;
    });
  }, []);

  return (
    <div
      className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12"
      onPointerEnter={() => setHeld(true)}
      onFocusCapture={() => setHeld(true)}
    >
      {/* Stage */}
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-elev md:aspect-[16/10]"
        style={{
          boxShadow: `0 0 0 1px color-mix(in oklab, ${current.tint} 22%, transparent)`,
        }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Media
              src={current.plate}
              alt=""
              treatment="vignette"
              inset
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </motion.div>
        </AnimatePresence>

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, color-mix(in oklab, ${current.tint} 10%, transparent) 0%, rgba(5,5,5,0.72) 62%, rgba(5,5,5,0.92) 100%)`,
          }}
        />

        <div className="relative flex h-full flex-col justify-end p-7 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reduce ? undefined : { opacity: 0, y: -12, filter: 'blur(6px)' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              role="tabpanel"
              id={`reel-panel-${current.id}`}
              aria-labelledby={`reel-tab-${current.id}`}
            >
              <p
                className="font-mono text-[10.5px] tracking-[0.22em] uppercase"
                style={{ color: current.tint }}
              >
                {current.meta}
              </p>
              <p className="mt-5 max-w-lg text-[clamp(1.35rem,3.2vw,2.4rem)] leading-[1.06] font-medium tracking-[-0.04em] text-fg">
                {current.line}
              </p>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
                {current.body}
              </p>

              <Link
                href={current.href}
                data-cursor="explore"
                className="group mt-7 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-fg uppercase"
              >
                Explore {current.label.toLowerCase()}
                <span
                  aria-hidden
                  className="transition-transform duration-400 group-hover:translate-x-1"
                  style={{ color: current.tint }}
                >
                  &rarr;
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Frames */}
      <div
        role="tablist"
        aria-label="Creative disciplines"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="flex flex-col justify-center gap-px overflow-hidden rounded-3xl border border-line bg-line"
      >
        {creativeReel.map((frame, i) => {
          const isActive = i === active;
          return (
            <button
              key={frame.id}
              ref={(node) => {
                tabs.current[i] = node;
              }}
              role="tab"
              id={`reel-tab-${frame.id}`}
              aria-selected={isActive}
              aria-controls={`reel-panel-${frame.id}`}
              tabIndex={isActive ? 0 : -1}
              data-cursor="explore"
              onClick={() => {
                setHeld(true);
                setActive(i);
              }}
              onPointerEnter={() => setActive(i)}
              className="group relative overflow-hidden bg-surface/70 px-7 py-7 text-left transition-colors duration-500 hover:bg-raised/60 md:px-9 md:py-9"
            >
              {/* The dwell bar is the only thing moving while the reel plays. */}
              {isActive && !paused && (
                <motion.span
                  aria-hidden
                  key={`bar-${active}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: DWELL / 1000, ease: 'linear' }}
                  className="absolute inset-x-0 top-0 h-px origin-left"
                  style={{ background: frame.tint }}
                />
              )}

              <span className="flex items-baseline gap-4">
                <span
                  className="font-mono text-[10.5px] tracking-[0.18em] transition-colors duration-400"
                  style={{ color: isActive ? frame.tint : 'var(--color-faint)' }}
                >
                  0{i + 1}
                </span>
                <motion.span
                  animate={{ x: reduce ? 0 : isActive ? 8 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(1.2rem,3vw,2rem)] leading-tight font-medium tracking-[-0.04em] transition-colors duration-500"
                  style={{ color: isActive ? 'var(--color-fg)' : 'var(--color-muted)' }}
                >
                  {frame.label}
                </motion.span>
              </span>

              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 pl-[2.1rem]">
                {frame.items.map((item) => (
                  <li
                    key={item}
                    className="text-[13.5px] transition-colors duration-500"
                    style={{
                      color: isActive ? 'var(--color-muted)' : 'var(--color-faint)',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}
