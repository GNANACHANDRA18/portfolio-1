'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  projectFilters,
  projects,
  type ProjectCategory,
} from '@/data/projects';

/**
 * Agency-style index. Rows expand on hover, the matching image fades in
 * behind, and the filter animates rows in and out rather than swapping them.
 */
export default function ProjectIndex() {
  const [filter, setFilter] = useState<'All' | ProjectCategory>('All');
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const visible = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((p) => p.categories.includes(filter)),
    [filter],
  );

  const preview = projects.find((p) => p.slug === hovered);

  return (
    <div className="relative">
      {/* Filter */}
      <div
        role="tablist"
        aria-label="Filter projects"
        className="mb-10 flex flex-wrap gap-2"
      >
        {projectFilters.map((option) => {
          const selected = filter === option;
          return (
            <button
              key={option}
              role="tab"
              type="button"
              data-cursor="magnet"
              aria-selected={selected}
              onClick={() => setFilter(option)}
              className={`relative rounded-full px-4 py-2.5 font-mono text-[10.5px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                selected ? 'text-bg' : 'text-muted hover:text-fg'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="index-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-fg"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              {!selected && (
                <span className="absolute inset-0 -z-10 rounded-full border border-line" />
              )}
              {option}
            </button>
          );
        })}
      </div>

      <div className="relative" onMouseLeave={() => setHovered(null)}>
        {/* Hover preview */}
        <AnimatePresence>
          {preview && !reduce && (
            <motion.div
              key={preview.slug}
              aria-hidden
              initial={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute top-1/2 right-0 z-0 hidden h-[260px] w-[380px] -translate-y-1/2 overflow-hidden rounded-2xl border border-line lg:block"
            >
              <Image
                src={preview.image}
                alt=""
                fill
                sizes="380px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-bg/25" />
            </motion.div>
          )}
        </AnimatePresence>

        <ul className="relative z-10 border-t border-line">
          <AnimatePresence initial={false}>
            {visible.map((project, i) => {
              const isHot = hovered === project.slug;
              return (
                <motion.li
                  key={project.slug}
                  layout
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-b border-line"
                >
                  <Link
                    href={`/work/${project.slug}`}
                    data-cursor="view"
                    onMouseEnter={() => setHovered(project.slug)}
                    onFocus={() => setHovered(project.slug)}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6 transition-all duration-500 md:gap-8 md:py-8"
                  >
                    <span
                      className={`font-mono text-[11px] tracking-[0.16em] transition-colors duration-400 ${
                        isHot ? 'text-accent' : 'text-faint'
                      }`}
                    >
                      {String(projects.indexOf(project) + 1).padStart(2, '0')}
                    </span>

                    <motion.span
                      animate={{ x: reduce ? 0 : isHot ? 14 : 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="min-w-0"
                    >
                      <span
                        className={`block truncate text-[clamp(1.1rem,2.6vw,1.9rem)] leading-tight font-medium tracking-[-0.03em] transition-colors duration-400 ${
                          isHot ? 'text-fg' : 'text-muted'
                        }`}
                      >
                        {project.name.toUpperCase()}
                      </span>
                    </motion.span>

                    <span className="flex items-center gap-5">
                      <span className="hidden font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase sm:block">
                        {project.industry}
                      </span>
                      <span
                        aria-hidden
                        className={`text-[13px] transition-all duration-500 ${
                          isHot
                            ? 'translate-x-0 text-accent opacity-100'
                            : '-translate-x-2 text-faint opacity-0'
                        }`}
                      >
                        ↗
                      </span>
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

      {visible.length === 0 && (
        <p className="py-14 text-center text-muted">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
