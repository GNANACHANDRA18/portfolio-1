'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { agentActions } from '@/data/ai-page';
import SectionHead from './SectionHead';

const C = 300;
const R = 218;

const NODES = agentActions.map((label, i) => {
  const angle = (i / agentActions.length) * Math.PI * 2 - Math.PI / 2;
  return { label, x: C + Math.cos(angle) * R, y: C + Math.sin(angle) * R };
});

export default function AIAgents() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % agentActions.length),
      950,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHead
              eyebrow="Agents"
              lines={["AI AGENTS DON'T", 'JUST ANSWER.', 'THEY ACT.']}
              accentLines={[2]}
              lede="An agent runs a loop: form a plan, reach for a tool, look at what came back, decide the next move. The interesting part is that it keeps going."
            />

            <ol className="mt-10 flex flex-wrap gap-2">
              {agentActions.map((action, i) => (
                <li key={action}>
                  <button
                    type="button"
                    onMouseEnter={() => setStep(i)}
                    onFocus={() => setStep(i)}
                    className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-all duration-300 ${
                      i === step
                        ? 'border-ai-violet/50 bg-ai-violet/10 text-ai-violet'
                        : 'border-line bg-elev/70 text-faint hover:text-muted'
                    }`}
                  >
                    {action}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="aurora aurora-a absolute inset-[18%]"
              style={{
                background:
                  'radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)',
              }}
            />

            <svg
              viewBox="0 0 600 600"
              className="relative mx-auto w-full max-w-[520px]"
              role="img"
              aria-label={`Agent loop: ${agentActions.join(', ')}.`}
            >
              <circle
                cx={C}
                cy={C}
                r={R}
                fill="none"
                stroke="rgba(255,255,255,0.09)"
                className={reduce ? '' : 'dash-flow'}
              />

              {NODES.map((node, i) => {
                const hot = i === step;
                return (
                  <line
                    key={`spoke-${node.label}`}
                    x1={C}
                    y1={C}
                    x2={node.x}
                    y2={node.y}
                    stroke={hot ? 'rgba(124,58,237,0.65)' : 'rgba(255,255,255,0.09)'}
                    strokeWidth={hot ? 1.6 : 1}
                    style={{ transition: 'stroke 400ms, stroke-width 400ms' }}
                  />
                );
              })}

              {/* Sequence arc between consecutive actions */}
              {NODES.map((node, i) => {
                const next = NODES[(i + 1) % NODES.length];
                const hot = i === step;
                return (
                  <line
                    key={`arc-${node.label}`}
                    x1={node.x}
                    y1={node.y}
                    x2={next.x}
                    y2={next.y}
                    stroke={hot ? 'rgba(59,91,255,0.55)' : 'rgba(255,255,255,0.08)'}
                    strokeWidth={hot ? 1.6 : 1}
                    style={{ transition: 'stroke 400ms, stroke-width 400ms' }}
                  />
                );
              })}

              {/* Core */}
              <circle cx={C} cy={C} r="74" fill="var(--color-elev)" stroke="var(--color-line)" />
              {!reduce && (
                <motion.circle
                  cx={C}
                  cy={C}
                  r="74"
                  fill="none"
                  stroke="rgba(124,58,237,0.35)"
                  animate={{ r: [74, 118], opacity: [0.5, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <text
                x={C}
                y={C + 5}
                textAnchor="middle"
                className="fill-[#f5f5f0]"
                style={{
                  fontSize: 15,
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                AGENT
              </text>

              {NODES.map((node, i) => {
                const hot = i === step;
                return (
                  <g key={node.label}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={hot ? 48 : 40}
                      fill="var(--color-elev)"
                      stroke={hot ? 'rgba(124,58,237,0.6)' : 'rgba(255,255,255,0.12)'}
                      style={{ transition: 'r 400ms, stroke 400ms' }}
                    />
                    <text
                      x={node.x}
                      y={node.y + 3.5}
                      textAnchor="middle"
                      className={hot ? 'fill-[#7c3aed]' : 'fill-[#8a8a96]'}
                      style={{
                        fontSize: node.label.length > 7 ? 8.5 : 9.5,
                        letterSpacing: '0.12em',
                        fontFamily: 'var(--font-mono)',
                        transition: 'fill 400ms',
                      }}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
