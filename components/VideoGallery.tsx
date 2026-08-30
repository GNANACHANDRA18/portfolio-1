'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { reservedSlots, videos } from '@/data/videos';

/**
 * Video gallery. Renders published pieces from `data/videos.ts`; any
 * remaining tiles are shown as clearly-labelled reserved slots rather than
 * invented client work.
 */
export default function VideoGallery() {
  const reduce = useReducedMotion();
  const emptyCount = Math.max(0, reservedSlots.length - videos.length);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video, i) => (
        <motion.figure
          key={video.id}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="card-sheen group overflow-hidden rounded-2xl border border-line bg-surface/50"
        >
          <div className="relative aspect-video bg-elev">
            {video.embedUrl ? (
              <iframe
                src={video.embedUrl}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : video.src ? (
              <video
                src={video.src}
                poster={video.poster}
                controls
                preload="none"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : video.poster ? (
              <Image
                src={video.poster}
                alt={video.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            ) : null}
          </div>
          <figcaption className="p-5">
            <p className="eyebrow mb-2">{video.category}</p>
            <p className="text-[15px] tracking-tight text-fg">{video.title}</p>
            {video.description && (
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                {video.description}
              </p>
            )}
          </figcaption>
        </motion.figure>
      ))}

      {Array.from({ length: emptyCount }).map((_, i) => {
        const label = reservedSlots[videos.length + i];
        return (
          <motion.div
            key={label}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.6,
              delay: (videos.length + i) * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group overflow-hidden rounded-2xl border border-dashed border-line bg-surface/25"
          >
            <div className="relative grid aspect-video place-items-center">
              <span
                aria-hidden
                className="grid h-12 w-12 place-items-center rounded-full border border-line text-muted transition-colors duration-500 group-hover:border-accent/40 group-hover:text-accent"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                </svg>
              </span>
            </div>
            <div className="border-t border-line p-5">
              <p className="eyebrow mb-2">{label}</p>
              <p className="text-[14px] text-muted">Reserved for published work</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
