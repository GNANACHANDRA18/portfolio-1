'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { architectureNodes } from '@/data/ai-page';
import SectionHead from './SectionHead';

type Box = { id: string; x: number; y: number; w: number };

const H = 52;
const BOXES: Box[] = [
  { id: 'user', x: 400, y: 40, w: 220 },
  { id: 'interface', x: 400, y: 140, w: 220 },
  { id: 'application', x: 400, y: 240, w: 260 },
  { id: 'llm', x: 400, y: 340, w: 200 },
  { id: 'tools', x: 150, y: 460, w: 190 },
  { id: 'data', x: 400, y: 460, w: 190 },
  { id: 'knowledge', x: 650, y: 460, w: 190 },
  { id: 'validation', x: 400, y: 580, w: 240 },
  { id: 'response', x: 400, y: 680, w: 220 },
];

const EDGES: [string, string][] = [
  ['user', 'interface'],
  ['interface', 'application'],
  ['application', 'llm'],
  ['llm', 'tools'],
  ['llm', 'data'],
  ['llm', 'knowledge'],
  ['tools', 'validation'],
  ['data', 'validation'],
  ['knowledge', 'validation'],
  ['validation', 'response'],
];

const at = (id: string) => BOXES.find((b) => b.id === id)!;

export default function AIArchitecture() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const current = architectureNodes.find((n) => n.id === active);

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x">
        <SectionHead
          eyebrow="Architecture"
          lines={['INSIDE AN', 'AI APPLICATION']}
          accentLines={[1]}
          lede="The model is one component in a system, not the system. Most of the engineering sits around it."
          className="mb-14"
        />

        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <div className="relative">
            <svg
              viewBox="0 0 800 750"
              className="w-full"
              role="img"
              aria-label="Architecture of an AI application from user through interface, application, model, tools, data and knowledge, validation and response."
              onMouseLeave={() => setActive(null)}
            >
              <defs>
                <linearGradient id="arch-line" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b5bff" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.45" />
                </linearGradient>
              </defs>

              {EDGES.map(([from, to], i) => {
                const a = at(from);
                const b = at(to);
                const hot = active === from || active === to;
                const d = `M ${a.x} ${a.y + H / 2} C ${a.x} ${a.y + H / 2 + 34}, ${b.x} ${b.y - H / 2 - 34}, ${b.x} ${b.y - H / 2}`;
                return (
                  <g key={`${from}-${to}`}>
                    <motion.path
                      d={d}
                      fill="none"
                      stroke={hot ? '#7c3aed' : 'url(#arch-line)'}
                      strokeWidth={hot ? 1.8 : 1.1}
                      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                      whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: 0.1 + i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{ transition: 'stroke 350ms, stroke-width 350ms' }}
                    />
                    {!reduce && (
                      <motion.circle
                        r="3.2"
                        fill="#3b5bff"
                        initial={{ opacity: 0 }}
                        animate={{
                          cx: [a.x, b.x],
                          cy: [a.y + H / 2, b.y - H / 2],
                          opacity: [0, 0.9, 0],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: i * 0.28,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                  </g>
                );
              })}

              {BOXES.map((box, i) => {
                const node = architectureNodes.find((n) => n.id === box.id)!;
                const hot = active === box.id;
                return (
                  <motion.g
                    key={box.id}
                    onMouseEnter={() => setActive(box.id)}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <rect
                      x={box.x - box.w / 2}
                      y={box.y - H / 2}
                      width={box.w}
                      height={H}
                      rx={14}
                      fill="var(--color-elev)"
                      stroke={hot ? '#7c3aed' : 'rgba(255,255,255,0.14)'}
                      strokeWidth={hot ? 1.6 : 1}
                      style={{ transition: 'stroke 350ms, stroke-width 350ms' }}
                    />
                    <text
                      x={box.x}
                      y={box.y + 4}
                      textAnchor="middle"
                      className={hot ? 'fill-[#a78bfa]' : 'fill-[#f5f5f0]'}
                      style={{
                        fontSize: 12,
                        letterSpacing: '0.16em',
                        fontFamily: 'var(--font-mono)',
                        transition: 'fill 350ms',
                      }}
                    >
                      {node.label}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </div>

          {/* Explanation rail */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass min-h-[180px] rounded-2xl p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current?.id ?? 'idle'}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="font-mono text-[11px] tracking-[0.2em] text-ai-violet uppercase">
                    {current?.label ?? 'Hover a layer'}
                  </p>
                  <p className="mt-4 text-[16px] leading-relaxed text-muted">
                    {current?.note ??
                      'Each block does a specific job. Move over one to see what it is responsible for.'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <ul className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-1">
              {architectureNodes.map((node) => (
                <li key={node.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(node.id)}
                    onFocus={() => setActive(node.id)}
                    onClick={() => setActive(node.id)}
                    className={`w-full rounded-lg border px-3.5 py-2 text-left font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                      active === node.id
                        ? 'border-ai-violet/45 bg-ai-violet/8 text-ai-violet'
                        : 'border-line bg-elev/70 text-faint hover:text-fg'
                    }`}
                  >
                    {node.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
