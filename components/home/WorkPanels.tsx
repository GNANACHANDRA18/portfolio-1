'use client';

import Image from 'next/image';
import { img } from '@/lib/media';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { projects } from '@/data/projects';

export default function WorkPanels() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = projects[active];

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x">
        <div className="mb-12 md:mb-16">
          <p className="mb-7 font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
            03 / Selected work
          </p>
          <h2 className="text-[clamp(2rem,6.4vw,5.2rem)] leading-[0.94] font-medium tracking-[-0.05em]">
            <span className="sr-only">Built with Qyverix.</span>
            {['BUILT WITH', 'QYVERIX.'].map((line, i) => (
              <span
                key={line}
                aria-hidden
                className="block overflow-hidden pb-[0.05em]"
              >
                <motion.span
                  className={`block ${i === 1 ? 'ai-spectrum' : 'text-fg'}`}
                  initial={reduce ? false : { y: '112%' }}
                  whileInView={reduce ? undefined : { y: '0%' }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{
                    duration: 1,
                    delay: i * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        {/* Desktop: names on the left, one fluid image stage on the right. */}
        <div className="hidden gap-12 lg:grid lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <ul className="border-t border-line">
            {projects.map((project, i) => {
              const isActive = i === active;
              return (
                <li key={project.slug} className="border-b border-line">
                  <Link
                    href={`/work/${project.slug}`}
                    data-cursor="label"
                    data-cursor-label="View project"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group block py-8"
                  >
                    <motion.div
                      animate={{ x: reduce ? 0 : isActive ? 14 : 0 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span
                        className={`font-mono text-[10.5px] tracking-[0.18em] uppercase transition-colors duration-500 ${
                          isActive ? 'text-accent' : 'text-faint'
                        }`}
                      >
                        {project.industry} · {project.year} · {project.location}
                      </span>

                      <p
                        className={`mt-3 text-[clamp(1.8rem,4.4vw,3.6rem)] leading-[0.98] font-medium tracking-[-0.045em] transition-colors duration-500 ${
                          isActive ? 'text-fg' : 'text-faint'
                        }`}
                      >
                        {project.name.toUpperCase()}
                      </p>

                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={reduce ? false : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={reduce ? undefined : { opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden text-[15px] leading-relaxed text-muted"
                          >
                            <span className="block pt-3">{project.summary}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Image stage — expands, rotates and blurs between projects. */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-line bg-elev">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={current.slug}
                className="absolute inset-0"
                initial={
                  reduce
                    ? false
                    : { opacity: 0, scale: 1.12, rotate: 1.6, filter: 'blur(14px)' }
                }
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                exit={
                  reduce
                    ? undefined
                    : { opacity: 0, scale: 1.06, rotate: -1.2, filter: 'blur(12px)' }
                }
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  {...img(current.media.card)}
                  alt={`${current.name} — ${current.tagline}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent"
                />
              </motion.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <span className="font-mono text-[10.5px] tracking-[0.18em] text-white/85 uppercase">
                {String(active + 1).padStart(2, '0')} /{' '}
                {String(projects.length).padStart(2, '0')}
              </span>
              <span className="glass rounded-full px-3.5 py-1.5 font-mono text-[10px] tracking-[0.16em] text-white uppercase">
                {current.categories[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Tablet and mobile: full-width stacked panels. */}
        <div className="grid gap-5 lg:hidden">
          {projects.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.07 }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group block overflow-hidden rounded-3xl border border-line bg-elev"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-elev">
                  <Image
                    {...img(project.media.square)}
                    alt={`${project.name} — ${project.tagline}`}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-black/55 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-mono text-[10px] tracking-[0.16em] text-white/85 uppercase">
                      {project.industry} · {project.year} · {project.location}
                    </p>
                    <p className="mt-1.5 text-[26px] leading-tight font-medium tracking-[-0.03em] text-white">
                      {project.name.toUpperCase()}
                    </p>
                  </div>
                </div>
                <p className="p-6 text-[14.5px] leading-relaxed text-muted">
                  {project.summary}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/work"
            data-cursor="magnet"
            className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-elev/70 px-6 py-3.5 font-mono text-[11px] tracking-[0.16em] text-fg uppercase backdrop-blur-md transition-colors duration-300 hover:border-accent/60"
          >
            View all work
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
