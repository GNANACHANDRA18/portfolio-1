'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { constellationNodes } from '@/data/ai-page';

const R = 285;
const C = 400;

const positions = constellationNodes.map((node) => {
  const rad = (node.angle * Math.PI) / 180;
  return { ...node, x: C + Math.cos(rad) * R, y: C + Math.sin(rad) * R };
});

export default function AIConstellation() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const current = positions.find((n) => n.id === active) ?? null;

  return (
    <>
      {/* Desktop / tablet: the constellation itself. */}
      <div className="relative hidden md:block">
        <svg
          viewBox="0 0 800 800"
          className="mx-auto w-full max-w-[760px]"
          role="img"
          aria-label="AI as a shared layer across software, marketing, research, content, video, automation, business and client success."
          onMouseLeave={() => setActive(null)}
        >
          <defs>
            <radialGradient id="con-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="con-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b5bff" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#e5399b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          <circle cx={C} cy={C} r={R + 60} fill="url(#con-core)" />

          {/* Perimeter ring */}
          <circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="url(#con-ring)"
            strokeWidth="1"
            className={reduce ? '' : 'dash-flow'}
          />

          {/* Node-to-node webbing */}
          {positions.map((a, i) =>
            positions.slice(i + 1).map((b) => {
              const hot = active === a.id || active === b.id;
              return (
                <line
                  key={`${a.id}-${b.id}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={hot ? 'rgba(124,58,237,0.30)' : 'rgba(255,255,255,0.07)'}
                  strokeWidth="1"
                  style={{ transition: 'stroke 400ms' }}
                />
              );
            }),
          )}

          {/* Spokes from the centre */}
          {positions.map((node, i) => {
            const hot = active === node.id;
            return (
              <motion.line
                key={`spoke-${node.id}`}
                x1={C}
                y1={C}
                x2={node.x}
                y2={node.y}
                stroke={hot ? 'rgba(59,91,255,0.75)' : 'rgba(255,255,255,0.16)'}
                strokeWidth={hot ? 1.6 : 1}
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transition: 'stroke 400ms, stroke-width 400ms' }}
              />
            );
          })}

          {/* Travelling packets along the active spoke */}
          {!reduce && current && (
            <motion.circle
              key={`packet-${current.id}`}
              r="4"
              fill="#7c3aed"
              initial={{ cx: C, cy: C, opacity: 0 }}
              animate={{
                cx: [C, current.x],
                cy: [C, current.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Centre */}
          <circle cx={C} cy={C} r="86" fill="var(--color-elev)" stroke="var(--color-line)" />
          {!reduce && (
            <motion.circle
              cx={C}
              cy={C}
              r="86"
              fill="none"
              stroke="rgba(124,58,237,0.35)"
              animate={{ r: [86, 132], opacity: [0.45, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <text
            x={C}
            y={C - 4}
            textAnchor="middle"
            className="fill-[#f5f5f0]"
            style={{ fontSize: 26, letterSpacing: '-0.02em', fontWeight: 500 }}
          >
            GNANA
          </text>
          <text
            x={C}
            y={C + 20}
            textAnchor="middle"
            className="fill-[#8a8a96]"
            style={{ fontSize: 10, letterSpacing: '0.2em', fontFamily: 'var(--font-mono)' }}
          >
            AI LAYER
          </text>

          {/* Nodes */}
          {positions.map((node, i) => {
            const hot = active === node.id;
            return (
              <motion.g
                key={node.id}
                onMouseEnter={() => setActive(node.id)}
                initial={reduce ? false : { opacity: 0, scale: 0.7 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={hot ? 66 : 54}
                  fill="var(--color-elev)"
                  stroke={hot ? 'rgba(124,58,237,0.6)' : 'rgba(255,255,255,0.12)'}
                  style={{ transition: 'r 400ms, stroke 400ms' }}
                />
                <text
                  x={node.x}
                  y={node.y + 3.5}
                  textAnchor="middle"
                  className={hot ? 'fill-[#7c3aed]' : 'fill-[#55555f]'}
                  style={{
                    fontSize: node.label.length > 9 ? 8.5 : 10,
                    letterSpacing: '0.12em',
                    fontFamily: 'var(--font-mono)',
                    transition: 'fill 400ms',
                  }}
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
        </svg>

        {/* Detail readout */}
        <div className="mx-auto mt-4 min-h-[112px] max-w-2xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.id ?? 'idle'}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {current ? (
                <>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-ai-violet uppercase">
                    {current.label}
                  </p>
                  <p className="mt-3 text-[17px] leading-relaxed text-fg">
                    {current.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap justify-center gap-2">
                    {current.chain.map((step, i) => (
                      <li key={step} className="flex items-center gap-2">
                        <span className="rounded-full border border-line bg-elev px-3 py-1 text-[12.5px] text-muted">
                          {step}
                        </span>
                        {i < current.chain.length - 1 && (
                          <span aria-hidden className="text-faint">
                            &rarr;
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-[15px] text-faint">
                  Hover a node to see what AI actually does there.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: the same information as touch-friendly cards. */}
      <ul className="grid gap-3 md:hidden">
        {constellationNodes.map((node, i) => {
          const open = active === node.id;
          return (
            <motion.li
              key={node.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
              className={`overflow-hidden rounded-2xl border bg-elev/70 transition-colors duration-300 ${
                open ? 'border-ai-violet/40' : 'border-line'
              }`}
            >
              <button
                type="button"
                onClick={() => setActive(open ? null : node.id)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-mono text-[12px] tracking-[0.16em] text-fg uppercase">
                  {node.label}
                </span>
                <span
                  aria-hidden
                  className={`text-lg transition-transform duration-300 ${
                    open ? 'rotate-45 text-ai-violet' : 'text-faint'
                  }`}
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-line px-5 py-5">
                      <p className="text-[15px] leading-relaxed text-muted">
                        {node.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {node.chain.map((step) => (
                          <li
                            key={step}
                            className="rounded-full border border-line bg-elev px-3 py-1 text-[12.5px] text-muted"
                          >
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>
    </>
  );
}
