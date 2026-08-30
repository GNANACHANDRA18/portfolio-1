'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { devFloatingLabels, devStages } from '@/data/ai-page';
import SectionHead from './SectionHead';

/** Decorative snippets — illustration only, not runnable code. */
const SNIPPETS: Record<string, string[]> = {
  idea: ['// what problem is this solving?', 'goal: "catalogue people can browse fast"'],
  architecture: ['routes/', '  catalogue/', '  product/[slug]/', 'lib/search.ts'],
  code: ['export async function search(q: string) {', '  const hits = await index.query(q)', '  return rank(hits)', '}'],
  debug: ['- return hits.slice(0, 10)', '+ return rank(hits).slice(0, 10)', '// empty query returned unranked'],
  test: ['✓ ranks exact matches first', '✓ handles empty query', '✓ paginates beyond 100 results'],
  deploy: ['$ next build', '  ✓ compiled successfully', '$ deploy --prod'],
};

export default function AISoftware() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(devStages.length - 1, Math.floor(v * devStages.length));
    setStage((prev) => (prev === next ? prev : next));
  });

  const current = devStages[stage];

  return (
    <div ref={ref} className="relative h-[380vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-x w-full">
          <SectionHead
            eyebrow="AI × Software"
            lines={['AI MAKES DEVELOPMENT', 'MOVE FASTER.']}
            accentLines={[1]}
            className="mb-10 md:mb-14"
          />

          <div className="relative">
            {/* Floating labels */}
            {devFloatingLabels.map((label, i) => (
              <motion.span
                key={label}
                aria-hidden
                className={`glass absolute z-20 hidden rounded-full px-3.5 py-1.5 font-mono text-[10px] tracking-[0.16em] text-muted uppercase lg:block ${
                  ['-top-4 left-[8%]', '-top-4 right-[10%]', '-bottom-4 left-[38%]'][i]
                }`}
                animate={
                  reduce ? undefined : { y: [0, -7, 0] }
                }
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.6,
                }}
              >
                {label}
              </motion.span>
            ))}

            {/* Window chrome */}
            <div className="overflow-hidden rounded-2xl border border-line bg-elev shadow-[0_30px_90px_-40px_rgba(20,20,80,0.35)]">
              <div className="flex items-center gap-3 border-b border-line bg-elev/70 px-4 py-3">
                <span aria-hidden className="flex gap-1.5">
                  {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                    <span
                      key={c}
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: c }}
                    />
                  ))}
                </span>
                <span className="ml-2 truncate rounded-md border border-line bg-elev px-3 py-1 font-mono text-[11px] text-faint">
                  {current.id}.ts — building
                </span>
                <span className="ml-auto font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                  {String(stage + 1).padStart(2, '0')} / {String(devStages.length).padStart(2, '0')}
                </span>
              </div>

              <div className="grid gap-0 md:grid-cols-[minmax(0,240px)_1fr]">
                {/* Stage rail */}
                <ol className="border-b border-line p-3 md:border-r md:border-b-0">
                  {devStages.map((s, i) => {
                    const isActive = i === stage;
                    const done = i < stage;
                    return (
                      <li key={s.id}>
                        <div
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-400 ${
                            isActive ? 'bg-ai-violet/8' : ''
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border font-mono text-[9px] transition-colors duration-400 ${
                              isActive
                                ? 'border-ai-violet bg-ai-violet text-white'
                                : done
                                  ? 'border-line-strong text-muted'
                                  : 'border-line text-faint'
                            }`}
                          >
                            {done ? '✓' : i + 1}
                          </span>
                          <span
                            className={`font-mono text-[11.5px] tracking-[0.12em] transition-colors duration-400 ${
                              isActive ? 'text-fg' : 'text-faint'
                            }`}
                          >
                            {s.label}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                {/* Code pane */}
                <div className="relative min-h-[240px] p-6 md:p-8">
                  <motion.div
                    key={current.id}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-mono text-[10.5px] tracking-[0.18em] text-ai-violet uppercase">
                      {current.label}
                    </p>
                    <p className="mt-2 text-[17px] tracking-tight text-fg md:text-xl">
                      {current.line}
                    </p>

                    <pre className="mt-6 overflow-x-auto rounded-xl border border-line bg-elev/60 p-4 font-mono text-[12.5px] leading-relaxed text-muted">
                      {SNIPPETS[current.id].map((row, i) => (
                        <motion.span
                          key={row}
                          className="block whitespace-pre"
                          initial={reduce ? false : { opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
                        >
                          {row}
                        </motion.span>
                      ))}
                    </pre>
                  </motion.div>

                  {!reduce && (
                    <motion.span
                      aria-hidden
                      className="absolute right-6 bottom-6 h-2 w-2 rounded-full bg-ai-cyan"
                      animate={{ opacity: [1, 0.15, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
            Snippets are illustrative
          </p>
        </div>
      </div>
    </div>
  );
}
