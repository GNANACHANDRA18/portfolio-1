'use client';

import Image from 'next/image';
import { img } from '@/lib/media';
import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { site } from '@/data/site';

/**
 * Portrait presented inside a glass surface: the photograph is the subject,
 * with a frosted panel carrying identity and contact routes over the base of
 * the frame. Tilts subtly toward the pointer unless reduced motion is set.
 */
export default function PortraitCard({
  priority = false,
  className = '',
}: {
  priority?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [5.5, -5.5]), {
    stiffness: 130,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6.5, 6.5]), {
    stiffness: 130,
    damping: 18,
  });
  const shineX = useTransform(mx, [0, 1], ['12%', '88%']);
  const shineY = useTransform(my, [0, 1], ['8%', '82%']);
  const shine = useMotionTemplate`radial-gradient(420px circle at ${shineX} ${shineY}, rgba(255,255,255,0.10), transparent 60%)`;

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`relative ${className}`}
      style={{ perspective: 1400 }}
    >
      <div
        aria-hidden
        className="glow-accent pointer-events-none absolute -inset-8 opacity-60"
      />

      <motion.figure
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative overflow-hidden rounded-[28px] border border-line bg-elev shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
      >
        <div className="relative aspect-[576/647] w-full">
          <Image
            {...img('portrait')}
            alt={site.portrait.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 92vw, (max-width: 1280px) 44vw, 520px"
            className="object-cover object-top transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
          />

          {/* Base scrim so the glass panel keeps contrast over any frame. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-bg via-bg/25 to-transparent"
          />
          {/* Warm accent wash, kept very low so skin tones stay true. */}
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-soft-light opacity-40 bg-linear-to-tr from-transparent via-transparent to-accent/45"
          />

          {/* Pointer-tracked sheen across the glass. */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: shine }}
            />
          )}
        </div>

        {/* Status chip */}
        <div className="glass absolute top-5 left-5 flex items-center gap-2 rounded-full px-3.5 py-1.5">
          <span aria-hidden className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.16em] text-fg/85 uppercase">
            Open to work
          </span>
        </div>

        {/* Frosted identity panel */}
        <figcaption className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
          <div className="glass rounded-2xl p-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 md:p-6">
            <p className="text-[19px] leading-tight tracking-tight text-fg md:text-[22px]">
              {site.name}
            </p>
            <p className="mt-1.5 text-[12.5px] tracking-tight text-accent md:text-[13.5px]">
              {site.role}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
              <a
                href={site.email.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 font-mono text-[11.5px] text-fg/90 transition-colors duration-300 hover:border-accent/50 hover:text-accent"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
                  <path d="m3.6 6.8 8.4 6 8.4-6" />
                </svg>
                {site.email.display}
              </a>

              <a
                href={`tel:${site.phone.tel}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 font-mono text-[11.5px] text-fg/90 transition-colors duration-300 hover:border-accent/50 hover:text-accent"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M4.5 5.5c0 8 6 14 14 14l1.6-3.2-4-2-1.6 1.8a12.4 12.4 0 0 1-6.6-6.6L9.7 7.9l-2-4L4.5 5.5Z" />
                </svg>
                {site.phone.display}
              </a>

              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 font-mono text-[11.5px] text-fg/90 transition-colors duration-300 hover:border-accent/50 hover:text-accent"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="3.8" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
                {site.instagram.handle}
              </a>
            </div>
          </div>
        </figcaption>
      </motion.figure>
    </div>
  );
}
