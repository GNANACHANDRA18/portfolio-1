'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * The first three seconds, three ways.
 *
 * The reel on this page fills as work is published; until then the page can
 * still show the craft, because the craft is a decision, not a file. Each
 * option below is a different opening for the same video, drawn as its three
 * frames plus the retention curve it tends to produce — the curve is the
 * argument, and it redraws itself every time the opening changes.
 *
 * The curves are illustrative shapes for how openings behave, not measured
 * data from a specific account, and the caption says so.
 */

type Hook = {
  id: string;
  label: string;
  tint: string;
  frames: [string, string, string];
  note: string;
  /** SVG path across a 300×110 box. Lower y = higher retention. */
  curve: string;
  verdict: string;
};

const HOOKS: Hook[] = [
  {
    id: 'logo',
    label: 'Logo first',
    tint: 'var(--color-faint)',
    frames: ['Brand mark', 'Tagline', 'Actual content'],
    note: 'Two seconds spent on something the viewer did not ask for. The edit starts after the audience has already gone.',
    curve: 'M0,14 C60,20 90,66 140,86 C190,100 240,102 300,104',
    verdict: 'Loses the room before it starts',
  },
  {
    id: 'question',
    label: 'Question',
    tint: 'var(--color-ai-cyan)',
    frames: ['Question on screen', 'Beat of silence', 'Answer begins'],
    note: 'A question buys attention on credit — it works, but only if the answer arrives before the patience does.',
    curve: 'M0,12 C60,18 100,30 150,48 C210,66 250,74 300,80',
    verdict: 'Holds, if the payoff is quick',
  },
  {
    id: 'result',
    label: 'Result first',
    tint: 'var(--color-accent)',
    frames: ['Finished result', 'Rewind', 'How it was made'],
    note: 'Open on the outcome, then earn the process. The viewer already knows what they are staying for, so staying is easy.',
    curve: 'M0,10 C70,12 110,20 160,26 C220,34 250,38 300,44',
    verdict: 'Strongest retention of the three',
  },
];

export default function HookLab() {
  const [active, setActive] = useState(2);
  const reduce = useReducedMotion();
  const current = HOOKS[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14">
      {/* Choose the opening */}
      <div
        role="tablist"
        aria-label="Opening styles"
        className="flex flex-col gap-px self-start overflow-hidden rounded-2xl border border-line bg-line"
      >
        {HOOKS.map((hook, i) => {
          const isActive = i === active;
          return (
            <button
              key={hook.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              data-cursor="explore"
              onClick={() => setActive(i)}
              onPointerEnter={() => setActive(i)}
              className="bg-surface/70 px-6 py-6 text-left transition-colors duration-500 hover:bg-elev md:px-7"
            >
              <span className="flex items-center justify-between gap-4">
                <span
                  className="text-[clamp(1.05rem,2.4vw,1.5rem)] font-medium tracking-[-0.035em] transition-colors duration-500"
                  style={{ color: isActive ? 'var(--color-fg)' : 'var(--color-muted)' }}
                >
                  {hook.label}
                </span>
                <motion.span
                  aria-hidden
                  animate={{ opacity: isActive ? 1 : 0.25, scale: isActive ? 1 : 0.6 }}
                  transition={{ duration: 0.4 }}
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: hook.tint }}
                />
              </span>
              <span
                className="mt-2 block font-mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-500"
                style={{ color: isActive ? hook.tint : 'var(--color-faint)' }}
              >
                {hook.verdict}
              </span>
            </button>
          );
        })}
      </div>

      {/* Frames and the curve they produce */}
      <div>
        <div className="grid grid-cols-3 gap-3">
          {current.frames.map((frame, i) => (
            <motion.div
              key={`${current.id}-${frame}`}
              initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex aspect-video items-end overflow-hidden rounded-xl border border-line p-3"
              style={{
                background: `linear-gradient(150deg, color-mix(in oklab, ${current.tint} 14%, transparent), transparent 70%)`,
              }}
            >
              <span
                aria-hidden
                className="absolute top-2.5 left-3 font-mono text-[9.5px] tracking-[0.16em] uppercase"
                style={{ color: current.tint }}
              >
                {String(i + 1).padStart(2, '0')}s
              </span>
              <span className="text-[12.5px] leading-tight text-muted">{frame}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-surface/60 p-6 md:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
              Retention, illustrative
            </p>
            <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
              0s → 30s
            </p>
          </div>

          <svg
            viewBox="0 0 300 110"
            className="mt-5 h-[110px] w-full"
            role="img"
            aria-label={`Illustrative retention curve for the ${current.label.toLowerCase()} opening: ${current.verdict.toLowerCase()}.`}
          >
            <line x1="0" y1="109" x2="300" y2="109" stroke="var(--color-line)" />
            <line x1="0" y1="55" x2="300" y2="55" stroke="var(--color-line)" strokeDasharray="3 6" />
            <AnimatePresence mode="wait">
              <motion.path
                key={current.id}
                d={current.curve}
                fill="none"
                stroke={current.tint}
                strokeWidth="2"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
          </svg>

          <AnimatePresence mode="wait">
            <motion.p
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted"
            >
              {current.note}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
