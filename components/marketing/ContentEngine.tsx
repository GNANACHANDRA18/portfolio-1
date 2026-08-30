'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { contentFormats } from '@/data/marketing';

/** One core idea branching into every format it has to live in. */
export default function ContentEngine() {
  const [hot, setHot] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const C = 300;
  const R = 210;

  const nodes = contentFormats.map((label, i) => {
    const angle = (i / contentFormats.length) * Math.PI * 2 - Math.PI / 2;
    return { label, x: C + Math.cos(angle) * R, y: C + Math.sin(angle) * R };
  });

  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <div
        aria-hidden
        className="aurora aurora-c absolute inset-[22%]"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,155,0.28), transparent 70%)',
        }}
      />

      <svg
        viewBox="0 0 600 600"
        className="relative w-full"
        role="img"
        aria-label={`One core idea expressed as ${contentFormats.join(', ')}.`}
        onMouseLeave={() => setHot(null)}
      >
        {nodes.map((node, i) => {
          const isHot = hot === node.label;
          return (
            <g key={node.label}>
              <line
                x1={C}
                y1={C}
                x2={node.x}
                y2={node.y}
                stroke="currentColor"
                strokeOpacity={isHot ? 0.5 : 0.1}
                strokeWidth={isHot ? 1.6 : 1}
                className={isHot ? 'text-ai-magenta' : 'text-fg'}
                style={{ transition: 'stroke-opacity 400ms, stroke-width 400ms' }}
              />
              {!reduce && (
                <motion.circle
                  r="3"
                  className="fill-ai-magenta"
                  initial={{ opacity: 0 }}
                  animate={{
                    cx: [C, node.x],
                    cy: [C, node.y],
                    opacity: [0, 0.9, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </g>
          );
        })}

        <circle
          cx={C}
          cy={C}
          r="76"
          className="fill-surface"
          stroke="currentColor"
          strokeOpacity="0.1"
        />
        <text
          x={C}
          y={C - 3}
          textAnchor="middle"
          className="fill-fg"
          style={{ fontSize: 13, letterSpacing: '0.12em', fontFamily: 'var(--font-mono)' }}
        >
          CORE
        </text>
        <text
          x={C}
          y={C + 15}
          textAnchor="middle"
          className="fill-fg"
          style={{ fontSize: 13, letterSpacing: '0.12em', fontFamily: 'var(--font-mono)' }}
        >
          IDEA
        </text>

        {nodes.map((node) => {
          const isHot = hot === node.label;
          return (
            <g
              key={`node-${node.label}`}
              onMouseEnter={() => setHot(node.label)}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={isHot ? 56 : 48}
                className="fill-surface"
                stroke="currentColor"
                strokeOpacity={isHot ? 0.5 : 0.1}
                style={{ transition: 'r 400ms, stroke-opacity 400ms' }}
              />
              <text
                x={node.x}
                y={node.y + 3.5}
                textAnchor="middle"
                className={isHot ? 'fill-ai-magenta' : 'fill-faint'}
                style={{
                  fontSize: node.label.length > 10 ? 8 : 9.2,
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
  );
}
