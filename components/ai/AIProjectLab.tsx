'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { aiProjects, LAB_SLOTS } from '@/data/ai-projects';
import SectionHead from './SectionHead';

export default function AIProjectLab() {
  const reduce = useReducedMotion();
  const emptySlots = Math.max(0, LAB_SLOTS - aiProjects.length);

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            eyebrow="Lab"
            lines={['AI PROJECT', 'LAB']}
            accentLines={[1]}
            className="mb-0"
          />

          <div className="glass inline-flex items-center gap-3 self-start rounded-full px-5 py-3 lg:self-auto">
            <span aria-hidden className="relative flex h-2 w-2">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ai-cyan opacity-70" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ai-cyan" />
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.2em] text-muted uppercase">
              Building
            </span>
            <span aria-hidden className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1 w-1 rounded-full bg-faint"
                  animate={reduce ? undefined : { opacity: [0.2, 1, 0.2] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </span>
          </div>
        </div>

        <p className="mb-10 max-w-2xl text-[17px] leading-relaxed text-muted md:text-xl">
          More AI-powered projects coming soon. Nothing is listed here until it
          exists and can be shown.
        </p>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {aiProjects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="glass overflow-hidden rounded-3xl"
            >
              {project.image && (
                <div className="relative aspect-[16/10] bg-elev">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl tracking-tight text-fg">{project.name}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  {project.problem}
                </p>

                <p className="mt-5 font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                  Architecture
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {project.architecture.map((step) => (
                    <li
                      key={step}
                      className="rounded-full border border-line px-2.5 py-1 text-[12px] text-muted"
                    >
                      {step}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                  Technologies
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line px-2.5 py-1 text-[12px] text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-fg px-4 py-2 text-[13px] text-bg"
                    >
                      Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-line px-4 py-2 text-[13px] text-muted"
                    >
                      GitHub
                    </a>
                  )}
                  {project.caseStudyUrl && (
                    <a
                      href={project.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-line px-4 py-2 text-[13px] text-muted"
                    >
                      Case study
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}

          {Array.from({ length: emptySlots }).map((_, i) => (
            <motion.div
              key={`slot-${i}`}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: (aiProjects.length + i) * 0.07,
              }}
              className="group relative overflow-hidden rounded-3xl border border-dashed border-line-strong bg-elev/40 p-7"
            >
              <div
                aria-hidden
                className="ai-grid pointer-events-none absolute inset-0 opacity-70"
              />
              <div className="relative flex h-full min-h-[260px] flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                    Slot {String(aiProjects.length + i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-6 text-[19px] leading-snug tracking-tight text-muted">
                    Reserved for a shipped AI project.
                  </p>
                </div>

                <ul className="mt-8 space-y-1.5">
                  {[
                    'Problem',
                    'AI architecture',
                    'Technologies',
                    'Demo · GitHub · Case study',
                  ].map((field) => (
                    <li
                      key={field}
                      className="flex items-center gap-2.5 font-mono text-[10.5px] tracking-[0.12em] text-faint uppercase"
                    >
                      <span
                        aria-hidden
                        className="h-1 w-1 rounded-full bg-line-strong"
                      />
                      {field}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
