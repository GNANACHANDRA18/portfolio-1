'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { workingModel } from '@/data/about';

/** A circular model whose rotation is driven by scroll position. */
export default function WorkingModel() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 40%'],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 / workingModel.length]);
  const counter = useTransform(rotate, (r) => -r);

  const C = 300;
  const R = 224;

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="mb-7 font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
              My working model
            </p>
            <h2 className="text-[clamp(1.8rem,5vw,4rem)] leading-[0.98] font-medium tracking-[-0.05em] text-fg">
              A loop, not
              <br />
              <span className="ai-spectrum">a checklist.</span>
            </h2>
            <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-muted">
              Every project runs the same circuit. The last step feeds the first
              — which is why launch is the beginning of the useful part.
            </p>

            <ol className="mt-10 flex flex-wrap gap-2">
              {workingModel.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-line bg-surface/70 px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">
                    {step}
                  </span>
                  {i < workingModel.length - 1 && (
                    <span aria-hidden className="text-faint">
                      &rarr;
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div
              aria-hidden
              className="aurora aurora-a absolute inset-[20%]"
              style={{
                background:
                  'radial-gradient(circle, rgba(47,91,255,0.3), transparent 70%)',
              }}
            />

            <motion.svg
              viewBox="0 0 600 600"
              className="relative w-full"
              style={reduce ? undefined : { rotate }}
              role="img"
              aria-label={`Working model: ${workingModel.join(', ')}.`}
            >
              <circle
                cx={C}
                cy={C}
                r={R}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.09"
                className={`text-fg ${reduce ? '' : 'dash-flow'}`}
              />

              {workingModel.map((step, i) => {
                const angle = (i / workingModel.length) * Math.PI * 2 - Math.PI / 2;
                const x = C + Math.cos(angle) * R;
                const y = C + Math.sin(angle) * R;
                return (
                  <g key={step}>
                    <line
                      x1={C}
                      y1={C}
                      x2={x}
                      y2={y}
                      stroke="currentColor"
                      strokeOpacity="0.08"
                      className="text-fg"
                    />
                    <motion.g style={reduce ? undefined : { rotate: counter }}>
                      <circle
                        cx={x}
                        cy={y}
                        r="46"
                        className="fill-surface"
                        stroke="currentColor"
                        strokeOpacity="0.12"
                      />
                      <text
                        x={x}
                        y={y + 3.5}
                        textAnchor="middle"
                        className="fill-muted"
                        style={{
                          fontSize: step.length > 8 ? 8.4 : 9.4,
                          letterSpacing: '0.12em',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {step}
                      </text>
                    </motion.g>
                  </g>
                );
              })}

              <motion.g style={reduce ? undefined : { rotate: counter }}>
                <circle
                  cx={C}
                  cy={C}
                  r="74"
                  className="fill-surface"
                  stroke="currentColor"
                  strokeOpacity="0.1"
                />
                <text
                  x={C}
                  y={C + 6}
                  textAnchor="middle"
                  className="fill-fg"
                  style={{ fontSize: 21, letterSpacing: '-0.02em', fontWeight: 500 }}
                >
                  GNANA
                </text>
              </motion.g>
            </motion.svg>
          </div>
        </div>
      </div>
    </section>
  );
}
