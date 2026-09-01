'use client';

import Image from 'next/image';
import { img } from '@/lib/media';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { projects } from '@/data/projects';

/** Three case-study links; hovering one previews its imagery. */
export default function BehindTheWork() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const preview = projects.find((p) => p.slug === hovered);

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
      <ul className="border-t border-line" onMouseLeave={() => setHovered(null)}>
        {projects.map((project, i) => {
          const isHot = hovered === project.slug;
          return (
            <motion.li
              key={project.slug}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="border-b border-line"
            >
              <Link
                href={`/work/${project.slug}`}
                data-cursor="view"
                onMouseEnter={() => setHovered(project.slug)}
                onFocus={() => setHovered(project.slug)}
                className="group flex items-center justify-between gap-6 py-7"
              >
                <motion.span
                  animate={{ x: reduce ? 0 : isHot ? 12 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`text-[clamp(1.2rem,3vw,2.2rem)] leading-tight font-medium tracking-[-0.035em] transition-colors duration-400 ${
                    isHot ? 'text-fg' : 'text-muted'
                  }`}
                >
                  {project.name.toUpperCase()}
                </motion.span>
                <span
                  aria-hidden
                  className={`shrink-0 text-[15px] transition-all duration-500 ${
                    isHot ? 'translate-x-0 text-accent' : '-translate-x-2 text-faint'
                  }`}
                >
                  &rarr;
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ul>

      <div className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-elev lg:block">
        <AnimatePresence mode="popLayout">
          {preview ? (
            <motion.div
              key={preview.slug}
              className="absolute inset-0"
              initial={
                reduce ? false : { opacity: 0, scale: 1.08, filter: 'blur(12px)' }
              }
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={
                reduce ? undefined : { opacity: 0, scale: 1.04, filter: 'blur(10px)' }
              }
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                {...img(preview.media.square)}
                alt={`${preview.name} case study preview`}
                fill
                sizes="480px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"
              />
              <p className="absolute inset-x-0 bottom-0 p-6 font-mono text-[10.5px] tracking-[0.18em] text-white/85 uppercase">
                {preview.industry} · {preview.year} · {preview.location}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 grid place-items-center font-mono text-[10.5px] tracking-[0.2em] text-faint uppercase"
            >
              Hover to preview
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
