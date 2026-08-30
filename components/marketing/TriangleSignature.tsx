'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { triangle } from '@/data/business';
import { site } from '@/data/site';

const TINTS: Record<string, string> = {
  ai: 'var(--color-ai-violet)',
  software: 'var(--color-ai-blue)',
  business: 'var(--color-ai-yellow)',
};

const POINTS = [
  { id: 'ai', x: 300, y: 92 },
  { id: 'software', x: 108, y: 424 },
  { id: 'business', x: 492, y: 424 },
];

/** The core positioning: AI × Software × Business, with Gnana at the centre. */
export default function TriangleSignature() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const current = triangle.find((t) => t.id === active);

  const at = (id: string) => POINTS.find((p) => p.id === id)!;
  const path = `M ${at('ai').x} ${at('ai').y} L ${at('software').x} ${at('software').y} L ${at('business').x} ${at('business').y} Z`;

  return (
    <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
      <div className="relative mx-auto w-full max-w-[520px]">
        <div
          aria-hidden
          className="aurora aurora-b absolute inset-[18%]"
          style={{
            background:
              'radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)',
          }}
        />

        <svg
          viewBox="0 0 600 560"
          className="relative w-full"
          role="img"
          aria-label="AI, software and business meeting at one practice."
          onMouseLeave={() => setActive(null)}
        >
          <defs>
            <linearGradient id="tri-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#3b6bff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#e0b056" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          <motion.path
            d={path}
            fill="rgba(139,92,246,0.05)"
            stroke="url(#tri-edge)"
            strokeWidth="1.2"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          />

          {POINTS.map((point, i) => (
            <line
              key={`spoke-${point.id}`}
              x1={300}
              y1={314}
              x2={point.x}
              y2={point.y}
              stroke={active === point.id ? TINTS[point.id] : 'rgba(255,255,255,0.1)'}
              strokeWidth={active === point.id ? 1.6 : 1}
              style={{ transition: 'stroke 400ms, stroke-width 400ms' }}
            />
          ))}

          {!reduce &&
            POINTS.map((point, i) => (
              <motion.circle
                key={`packet-${point.id}`}
                r="3"
                fill={TINTS[point.id]}
                initial={{ opacity: 0 }}
                animate={{
                  cx: [point.x, 300],
                  cy: [point.y, 314],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: 'easeInOut',
                }}
              />
            ))}

          {/* Centre */}
          <circle cx={300} cy={314} r="82" fill="#0a0a0a" stroke="rgba(255,255,255,0.12)" />
          {!reduce && (
            <motion.circle
              cx={300}
              cy={314}
              r="82"
              fill="none"
              stroke="rgba(139,92,246,0.35)"
              animate={{ r: [82, 126], opacity: [0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <text
            x={300}
            y={309}
            textAnchor="middle"
            className="fill-fg"
            style={{ fontSize: 16, letterSpacing: '-0.01em', fontWeight: 500 }}
          >
            GNANA
          </text>
          <text
            x={300}
            y={330}
            textAnchor="middle"
            className="fill-faint"
            style={{
              fontSize: 9,
              letterSpacing: '0.2em',
              fontFamily: 'var(--font-mono)',
            }}
          >
            CHANDRA
          </text>

          {/* Vertices */}
          {triangle.map((node) => {
            const point = at(node.id);
            const hot = active === node.id;
            return (
              <g key={node.id} onMouseEnter={() => setActive(node.id)}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={hot ? 62 : 54}
                  fill="#0a0a0a"
                  stroke={hot ? TINTS[node.id] : 'rgba(255,255,255,0.12)'}
                  style={{ transition: 'r 400ms, stroke 400ms' }}
                />
                <text
                  x={point.x}
                  y={point.y + 4}
                  textAnchor="middle"
                  className={hot ? '' : 'fill-muted'}
                  fill={hot ? TINTS[node.id] : undefined}
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.14em',
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

      <div>
        <p className="mb-7 font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
          Core positioning
        </p>

        <h2 className="text-[clamp(1.6rem,4.6vw,3.6rem)] leading-[1.02] font-medium tracking-[-0.05em] text-fg">
          AI <span className="text-faint">×</span> SOFTWARE{' '}
          <span className="text-faint">×</span>{' '}
          <span className="ai-spectrum">BUSINESS</span>
        </h2>

        <div className="mt-10 min-h-[92px] border-t border-line pt-6">
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
                  <p
                    className="font-mono text-[11px] tracking-[0.2em] uppercase"
                    style={{ color: TINTS[current.id] }}
                  >
                    {current.label}
                  </p>
                  <p className="mt-3 text-[18px] text-fg">{current.note}</p>
                </>
              ) : (
                <p className="text-[15px] text-faint">
                  Hover a vertex. Most people hold one of these — the value is
                  in holding all three at once.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <ul className="mt-10 space-y-2">
          {triangle.map((node) => (
            <li
              key={node.id}
              className="flex items-baseline justify-between gap-6 border-b border-line pb-2.5"
            >
              <span className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                {node.label}
              </span>
              <span className="text-[13.5px] text-faint">{node.note}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
          {site.name} · CMO · Software Developer · AI Practitioner
        </p>
      </div>
    </div>
  );
}
