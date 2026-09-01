'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import GlassPanel from '@/components/media/GlassPanel';

/**
 * One post, taken apart.
 *
 * The social page claims content is built as a system rather than written on
 * instinct. This is that claim made inspectable: a post rendered as it would
 * appear, with every part selectable, and the reason each part exists stated
 * beside it. Hovering a part lights it in the mock and swaps the note;
 * clicking pins it so a keyboard or a phone can read the same thing.
 */

const PARTS = [
  {
    id: 'hook',
    label: 'Hook',
    tint: 'var(--color-ai-magenta)',
    text: 'Most content plateaus for one boring reason.',
    note: 'The first line is the whole post. It has one job: earn the second line. Anything that reads like a warm-up gets cut.',
  },
  {
    id: 'proof',
    label: 'Proof',
    tint: 'var(--color-ai-cyan)',
    text: 'We publish weekly for a client. Same effort, three formats, one calendar.',
    note: 'A claim without evidence is an opinion. One specific, checkable detail beats three adjectives.',
  },
  {
    id: 'body',
    label: 'Body',
    tint: 'var(--color-ai-blue)',
    text: 'Research → strategy → content → edit → publish → analyse → improve. The last two steps are the ones people skip.',
    note: 'The argument, in the fewest lines that still make sense on a phone. Structure carries it; nobody reads a wall.',
  },
  {
    id: 'cta',
    label: 'Close',
    tint: 'var(--color-accent)',
    text: 'If your content stops at "publish", that is the gap.',
    note: 'The close names the next thought, not the next click. Asking for a comment is how you get comments and nothing else.',
  },
  {
    id: 'tags',
    label: 'Tags',
    tint: 'var(--color-ai-violet)',
    text: '#contentstrategy #socialmedia #marketing',
    note: 'Distribution metadata, not decoration. A handful that describe the post, placed where they do not interrupt the read.',
  },
];

export default function PostAnatomy() {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const reduce = useReducedMotion();
  const current = PARTS[active];

  const select = (i: number, pin = false) => {
    setActive(i);
    if (pin) setPinned(true);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
      {/* The post */}
      <GlassPanel density="thin" className="p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3 border-b border-line pb-5">
          <span
            aria-hidden
            className="h-9 w-9 rounded-full border border-line bg-elev"
          />
          <span>
            <span className="block text-[14px] text-fg">Gnana Chandra</span>
            <span className="block font-mono text-[10.5px] tracking-[0.14em] text-faint uppercase">
              Posted · LinkedIn
            </span>
          </span>
        </div>

        <ol className="space-y-4">
          {PARTS.map((part, i) => {
            const isActive = i === active;
            return (
              <li key={part.id}>
                <button
                  type="button"
                  data-cursor="explore"
                  onPointerEnter={() => !pinned && select(i)}
                  onFocus={() => select(i)}
                  onClick={() => select(i, true)}
                  aria-pressed={isActive}
                  className="block w-full rounded-xl px-3 py-2.5 text-left transition-colors duration-500"
                  style={{
                    background: isActive
                      ? `color-mix(in oklab, ${part.tint} 11%, transparent)`
                      : 'transparent',
                    boxShadow: isActive
                      ? `inset 0 0 0 1px color-mix(in oklab, ${part.tint} 40%, transparent)`
                      : 'inset 0 0 0 1px transparent',
                  }}
                >
                  <span
                    className="mb-1.5 block font-mono text-[9.5px] tracking-[0.18em] uppercase transition-colors duration-500"
                    style={{ color: isActive ? part.tint : 'var(--color-faint)' }}
                  >
                    {part.label}
                  </span>
                  <span
                    className="block text-[14.5px] leading-relaxed transition-colors duration-500"
                    style={{
                      color: isActive ? 'var(--color-fg)' : 'var(--color-muted)',
                    }}
                  >
                    {part.text}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </GlassPanel>

      {/* Why that part exists */}
      <div className="flex flex-col justify-center">
        <p className="font-mono text-[10.5px] tracking-[0.22em] text-faint uppercase">
          Anatomy — {String(active + 1).padStart(2, '0')} / {PARTS.length}
        </p>

        <div className="relative mt-7 min-h-[210px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reduce ? undefined : { opacity: 0, y: -12, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3
                className="text-[clamp(1.6rem,4vw,2.8rem)] leading-[1.04] font-medium tracking-[-0.04em]"
                style={{ color: current.tint }}
              >
                {current.label}
              </h3>
              <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-muted md:text-[17px]">
                {current.note}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-8 font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
          {pinned ? 'Pinned — click another part to move on' : 'Hover a part of the post'}
        </p>
      </div>
    </div>
  );
}
