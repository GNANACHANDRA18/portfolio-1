'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { codeToInterface } from '@/data/development';

const SNIPPETS = [
  ['function ProductCard({ product }) {', '  return <article>…</article>', '}'],
  ['const inStock = product.stock > 0', 'const price = format(product.price)'],
  ['const product = await db.product', '  .findUnique({ where: { slug } })'],
  ['<button onClick={addToEnquiry}>', '  Add to enquiry', '</button>'],
  ['// a person finds what they came for', '// and knows what to do next'],
];

/** Code on one side, the interface it becomes on the other. */
export default function CodeToInterface() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(
      codeToInterface.length - 1,
      Math.floor(v * codeToInterface.length),
    );
    setStage((prev) => (prev === next ? prev : next));
  });

  const current = codeToInterface[stage];
  const progress = (stage + 1) / codeToInterface.length;

  return (
    <div ref={ref} className="relative h-[340vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-x w-full">
          <p className="mb-8 font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
            Code → Interface · {String(stage + 1).padStart(2, '0')} /{' '}
            {String(codeToInterface.length).padStart(2, '0')}
          </p>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
            {/* Code side */}
            <div className="bg-surface p-7 md:p-10">
              <p className="mb-6 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                Code
              </p>
              <motion.pre
                key={current.label}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-x-auto font-mono text-[12.5px] leading-relaxed text-muted"
              >
                {SNIPPETS[stage].map((row) => (
                  <span key={row} className="block whitespace-pre">
                    {row}
                  </span>
                ))}
              </motion.pre>
            </div>

            {/* Interface side */}
            <div className="relative bg-elev/60 p-7 md:p-10">
              <p className="mb-6 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                Interface
              </p>

              {/* A mock card assembling itself, one layer per stage. */}
              <div className="rounded-2xl border border-line bg-surface p-5">
                <motion.div
                  animate={{ opacity: stage >= 0 ? 1 : 0.2 }}
                  className="h-24 rounded-xl bg-linear-to-br from-ai-blue/20 to-ai-violet/15"
                />
                <motion.div
                  animate={{ opacity: stage >= 1 ? 1 : 0.15 }}
                  transition={{ duration: 0.45 }}
                  className="mt-4 h-3 w-1/2 rounded-full bg-line-strong"
                />
                <motion.div
                  animate={{ opacity: stage >= 2 ? 1 : 0.15 }}
                  transition={{ duration: 0.45 }}
                  className="mt-2.5 h-3 w-1/3 rounded-full bg-line-strong"
                />
                <motion.div
                  animate={{
                    opacity: stage >= 3 ? 1 : 0.15,
                    y: stage >= 3 ? 0 : 6,
                  }}
                  transition={{ duration: 0.45 }}
                  className="mt-5 inline-flex rounded-full bg-fg px-4 py-2 font-mono text-[10px] tracking-[0.14em] text-bg uppercase"
                >
                  Add to enquiry
                </motion.div>
              </div>

              <motion.p
                animate={{ opacity: stage >= 4 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 text-[14px] leading-relaxed text-muted"
              >
                Engineering becomes experience.
              </motion.p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <span className="font-mono text-[11px] tracking-[0.18em] text-fg uppercase">
              {current.label}
            </span>
            <span className="text-[14px] text-muted">{current.note}</span>
            <span className="ml-auto hidden h-px flex-1 max-w-xs bg-line md:block">
              <motion.span
                className="block h-px origin-left bg-accent"
                animate={{ scaleX: progress }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
