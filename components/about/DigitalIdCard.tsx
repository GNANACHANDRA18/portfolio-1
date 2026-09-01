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
 * Digital profile card. Tilts toward the pointer with a holographic sheen
 * sweeping across the surface — deliberately a futuristic profile object,
 * not a facsimile of any real document.
 */
export default function DigitalIdCard() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), {
    stiffness: 140,
    damping: 18,
  });

  const sheenX = useTransform(mx, [0, 1], ['0%', '100%']);
  const sheenY = useTransform(my, [0, 1], ['0%', '100%']);
  const sheen = useMotionTemplate`radial-gradient(420px circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.16), transparent 58%)`;
  const holo = useMotionTemplate`linear-gradient(${useTransform(mx, [0, 1], [70, 250])}deg, rgba(47,91,255,0.28), rgba(124,58,237,0.24) 32%, rgba(6,182,212,0.22) 58%, rgba(229,57,155,0.24))`;

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
      data-cursor="orb"
      className="relative mx-auto w-full max-w-[520px]"
      style={{ perspective: 1300 }}
    >
      <motion.div
        style={
          reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }
        }
        className="relative overflow-hidden rounded-[26px] border border-line bg-surface shadow-[0_40px_110px_-50px_rgba(0,0,0,0.85)]"
      >
        {/* Holographic wash + pointer sheen */}
        {!reduce && (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-color opacity-70"
              style={{ background: holo }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-60"
              style={{ background: sheen }}
            />
          </>
        )}

        <div className="relative p-7 md:p-9">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-mono text-[9.5px] tracking-[0.22em] text-faint uppercase">
                Digital profile
              </p>
              <p className="mt-4 text-[clamp(1.2rem,3vw,1.9rem)] leading-none font-medium tracking-[-0.04em] text-fg">
                CHEBOLU
                <br />
                GNANACHANDRA
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                {site.shortName}
              </p>
            </div>

            <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-line bg-elev">
              <Image
                {...img('portrait')}
                alt={site.portrait.alt}
                fill
                sizes="80px"
                className="object-cover object-top"
              />
            </span>
          </div>

          <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-7">
            {[
              'Software Developer',
              'CMO',
              'AI Practitioner',
              'Creative Technologist',
            ].map((role) => (
              <li
                key={role}
                className="font-mono text-[10.5px] tracking-[0.12em] text-muted uppercase"
              >
                {role}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-end justify-between gap-4 border-t border-line pt-6">
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-fg transition-colors hover:text-accent"
            >
              {site.instagram.handle}
            </a>
            <span className="font-mono text-[9.5px] tracking-[0.2em] text-faint uppercase">
              Software × AI × Marketing
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
