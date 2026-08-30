'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export type ConstellationNode = {
  id: string;
  label: string;
  body: string;
  chain?: string[];
};

/**
 * The Gnana System — the site's signature visual.
 *
 * A labelled core with roles orbiting it, fully webbed together. It is reused
 * on About (roles), Development (stack), Marketing (remit) and Skills
 * (capabilities), so the same idea reads as one identity across pages.
 *
 * Desktop gets the diagram; small screens get the same content as a vertical
 * explorer, because a webbed circle is unreadable at that width.
 */
export default function Constellation({
  core,
  coreNote,
  nodes,
  tint = 'var(--color-ai-violet)',
  idleHint = 'Hover a node to see what it means.',
}: {
  core: string;
  coreNote?: string;
  nodes: ConstellationNode[];
  tint?: string;
  idleHint?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const C = 400;
  const R = nodes.length > 6 ? 288 : 262;

  const placed = nodes.map((node, i) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    return { ...node, x: C + Math.cos(angle) * R, y: C + Math.sin(angle) * R };
  });

  const current = placed.find((n) => n.id === active) ?? null;
  const radius = (label: string) => (label.length > 11 ? 62 : 54);

  return (
    <>
      <div className="relative hidden md:block">
        <svg
          viewBox="0 0 800 800"
          className="mx-auto w-full max-w-[720px]"
          role="img"
          aria-label={`${core} connected to ${nodes.map((n) => n.label).join(', ')}.`}
          onMouseLeave={() => setActive(null)}
        >
          <defs>
            <radialGradient id={`core-${core}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={tint} stopOpacity="0.22" />
              <stop offset="100%" stopColor={tint} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={C} cy={C} r={R + 62} fill={`url(#core-${core})`} />
          <circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="color-mix(in oklab, currentColor 8%, transparent)"
            className={`text-fg ${reduce ? '' : 'dash-flow'}`}
          />

          {/* Full web between every pair — the "system" reading. */}
          {placed.map((a, i) =>
            placed.slice(i + 1).map((b) => {
              const hot = active === a.id || active === b.id;
              return (
                <line
                  key={`${a.id}-${b.id}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={hot ? tint : 'currentColor'}
                  strokeOpacity={hot ? 0.28 : 0.05}
                  strokeWidth="1"
                  className="text-fg"
                  style={{ transition: 'stroke-opacity 400ms, stroke 400ms' }}
                />
              );
            }),
          )}

          {/* Spokes */}
          {placed.map((node, i) => {
            const hot = active === node.id;
            return (
              <motion.line
                key={`spoke-${node.id}`}
                x1={C}
                y1={C}
                x2={node.x}
                y2={node.y}
                stroke={hot ? tint : 'currentColor'}
                strokeOpacity={hot ? 0.7 : 0.12}
                strokeWidth={hot ? 1.6 : 1}
                className="text-fg"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.85,
                  delay: 0.12 + i * 0.055,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transition: 'stroke-opacity 400ms, stroke-width 400ms' }}
              />
            );
          })}

          {!reduce && current && (
            <motion.circle
              key={`packet-${current.id}`}
              r="4"
              fill={tint}
              initial={{ cx: C, cy: C, opacity: 0 }}
              animate={{
                cx: [C, current.x],
                cy: [C, current.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Core */}
          <circle
            cx={C}
            cy={C}
            r="90"
            className="fill-surface"
            stroke="currentColor"
            strokeOpacity="0.1"
          />
          {!reduce && (
            <motion.circle
              cx={C}
              cy={C}
              r="90"
              fill="none"
              stroke={tint}
              strokeOpacity="0.3"
              animate={{ r: [90, 140], opacity: [0.5, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <text
            x={C}
            y={coreNote ? C - 4 : C + 6}
            textAnchor="middle"
            className="fill-fg"
            style={{ fontSize: 25, letterSpacing: '-0.02em', fontWeight: 500 }}
          >
            {core}
          </text>
          {coreNote && (
            <text
              x={C}
              y={C + 20}
              textAnchor="middle"
              className="fill-faint"
              style={{
                fontSize: 9.5,
                letterSpacing: '0.2em',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {coreNote}
            </text>
          )}

          {/* Nodes */}
          {placed.map((node, i) => {
            const hot = active === node.id;
            const r = radius(node.label);
            return (
              <motion.g
                key={node.id}
                onMouseEnter={() => setActive(node.id)}
                initial={reduce ? false : { opacity: 0, scale: 0.72 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.28 + i * 0.055,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={hot ? r + 11 : r}
                  className="fill-surface"
                  stroke={hot ? tint : 'currentColor'}
                  strokeOpacity={hot ? 0.6 : 0.1}
                  style={{ transition: 'r 400ms, stroke 400ms, stroke-opacity 400ms' }}
                />
                <text
                  x={node.x}
                  y={node.y + 3.5}
                  textAnchor="middle"
                  className={hot ? '' : 'fill-faint'}
                  fill={hot ? tint : undefined}
                  style={{
                    fontSize: node.label.length > 10 ? 8.2 : 9.6,
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

        <div className="mx-auto mt-2 min-h-[130px] max-w-2xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.id ?? 'idle'}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              {current ? (
                <>
                  <p
                    className="font-mono text-[11px] tracking-[0.2em] uppercase"
                    style={{ color: tint }}
                  >
                    {current.label}
                  </p>
                  <p className="mt-3 text-[17px] leading-relaxed text-fg">
                    {current.body}
                  </p>
                  {current.chain && (
                    <ul className="mt-4 flex flex-wrap justify-center gap-2">
                      {current.chain.map((step, i) => (
                        <li key={step} className="flex items-center gap-2">
                          <span className="rounded-full border border-line bg-surface px-3 py-1 text-[12.5px] text-muted">
                            {step}
                          </span>
                          {i < current.chain!.length - 1 && (
                            <span aria-hidden className="text-faint">
                              &rarr;
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <p className="text-[15px] text-faint">{idleHint}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Vertical explorer for small screens. */}
      <ul className="grid gap-3 md:hidden">
        {nodes.map((node, i) => {
          const open = active === node.id;
          return (
            <motion.li
              key={node.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
              className={`overflow-hidden rounded-2xl border bg-surface/70 transition-colors duration-300 ${
                open ? 'border-accent/45' : 'border-line'
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
                    open ? 'rotate-45 text-accent' : 'text-faint'
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
                        {node.body}
                      </p>
                      {node.chain && (
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
                      )}
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
