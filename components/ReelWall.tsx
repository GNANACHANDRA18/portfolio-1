'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Media from '@/components/media/Media';
import { reelCategories, reels } from '@/data/videos';
import { site } from '@/data/site';

/**
 * The reels, in their own shape.
 *
 * A reel is 9:16 and the rest of this site is not, so these get their own
 * wall rather than being letterboxed into the landscape gallery. Instagram's
 * own player is embedded, which means each post keeps its caption, its view
 * count and its link back to the account — the work is shown where it lives
 * instead of being re-hosted as a silent file.
 *
 * Nothing loads until it is asked for. Every tile starts as a facade on the
 * video plates, and the Instagram frame is mounted on the first click: six
 * embeds booting at once is most of a megabyte of somebody else's JavaScript,
 * and on a phone it is the slowest thing on the page. One tap is a fair price
 * for that, and the tile is a real button, so a keyboard pays the same price.
 */

const PLATES = ['video-square', 'social-square', 'video-frames'] as const;

export default function ReelWall({ limit }: { limit?: number }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState('All');
  const [playing, setPlaying] = useState<string[]>([]);

  const visible = useMemo(() => {
    const list = filter === 'All' ? reels : reels.filter((r) => r.category === filter);
    return typeof limit === 'number' ? list.slice(0, limit) : list;
  }, [filter, limit]);

  if (reels.length === 0) {
    return (
      <p className="font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
        Reels are published on {site.instagram.handle}
      </p>
    );
  }

  return (
    <div>
      {reelCategories.length > 2 && (
        <div role="tablist" aria-label="Filter reels" className="mb-9 flex flex-wrap gap-2">
          {reelCategories.map((option) => {
            const selected = filter === option;
            return (
              <button
                key={option}
                role="tab"
                type="button"
                data-cursor="magnet"
                aria-selected={selected}
                onClick={() => setFilter(option)}
                className="relative rounded-full border px-4 py-2 text-[13px] transition-colors duration-400"
                style={{
                  borderColor: selected
                    ? 'color-mix(in oklab, var(--color-accent) 55%, transparent)'
                    : 'var(--color-line)',
                  color: selected ? 'var(--color-fg)' : 'var(--color-muted)',
                  background: selected
                    ? 'color-mix(in oklab, var(--color-accent) 10%, transparent)'
                    : 'color-mix(in oklab, var(--color-surface) 70%, transparent)',
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => {
            const live = playing.includes(item.id);

            return (
              <motion.figure
                key={item.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 22, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{
                  duration: 0.55,
                  delay: reduce ? 0 : Math.min(i * 0.06, 0.3),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden rounded-2xl border border-line bg-surface/50"
              >
                <div className="relative aspect-[9/16] bg-elev">
                  {live && item.embedUrl ? (
                    <iframe
                      src={item.embedUrl}
                      title={item.title}
                      loading="lazy"
                      scrolling="no"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  ) : (
                    <button
                      type="button"
                      data-cursor="explore"
                      onClick={() => setPlaying((ids) => [...ids, item.id])}
                      aria-label={`Load and play ${item.title} from Instagram`}
                      className="group absolute inset-0 block"
                    >
                      <Media
                        src={PLATES[i % PLATES.length]}
                        alt=""
                        treatment="clean"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        inset
                        imageClassName="opacity-[0.72] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-t from-bg via-bg/45 to-bg/10"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 grid place-items-center"
                      >
                        <span className="grid h-14 w-14 place-items-center rounded-full border border-line/80 bg-bg/45 text-fg backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-accent/60 group-hover:text-accent">
                          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                            <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                          </svg>
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 p-4 font-mono text-[10px] tracking-[0.16em] text-faint uppercase"
                      >
                        Tap to load from Instagram
                      </span>
                    </button>
                  )}
                </div>

                <figcaption className="p-5">
                  <p className="eyebrow mb-2">{item.category}</p>
                  <p className="text-[15px] tracking-tight text-fg">{item.title}</p>
                  {item.description && (
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                      {item.description}
                    </p>
                  )}
                </figcaption>
              </motion.figure>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
