'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { flywheel } from '@/data/business';

const C = 300;
const R = 218;

export default function Flywheel() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 35%'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(flywheel.length - 1, Math.floor(v * flywheel.length));
    setActive((prev) => (prev === next ? prev : next));
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 / flywheel.length]);
  const counter = useTransform(rotate, (r) => -r);

  const nodes = flywheel.map((label, i) => {
    const angle = (i / flywheel.length) * Math.PI * 2 - Math.PI / 2;
    return { label, x: C + Math.cos(angle) * R, y: C + Math.sin(angle) * R };
  });

  return (
    <div ref={ref} className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
      <div>
        <p className="mb-7 font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
          The flywheel
        </p>
        <h2 className="text-[clamp(1.8rem,5vw,4rem)] leading-[0.98] font-medium tracking-[-0.05em] text-fg">
          Every part feeds
          <br />
          <span className="ai-spectrum">the next one.</span>
        </h2>
        <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-muted">
          A business is not a funnel that ends. Retention feeds referral,
          referral feeds growth, growth pays for the product — and the wheel
          turns faster each time round.
        </p>

        <ol className="mt-10 space-y-1">
          {flywheel.map((step, i) => (
            <li key={step}>
              <span
                className={`flex items-center gap-4 rounded-lg px-3 py-2 transition-colors duration-500 ${
                  i === active ? 'bg-elev' : ''
                }`}
              >
                <span
                  className={`font-mono text-[10px] tracking-[0.16em] transition-colors duration-500 ${
                    i === active ? 'text-accent' : 'text-faint'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`font-mono text-[12px] tracking-[0.14em] uppercase transition-colors duration-500 ${
                    i === active ? 'text-fg' : 'text-muted'
                  }`}
                >
                  {step}
                </span>
              </span>
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
              'radial-gradient(circle, rgba(59,107,255,0.32), transparent 70%)',
          }}
        />

        <motion.svg
          viewBox="0 0 600 600"
          className="relative w-full"
          style={reduce ? undefined : { rotate }}
          role="img"
          aria-label={`Business flywheel: ${flywheel.join(', ')}.`}
        >
          <circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            className={reduce ? '' : 'dash-flow'}
          />

          {nodes.map((node, i) => {
            const next = nodes[(i + 1) % nodes.length];
            const isActive = i === active;
            return (
              <g key={node.label}>
                <line
                  x1={node.x}
                  y1={node.y}
                  x2={next.x}
                  y2={next.y}
                  stroke={isActive ? 'rgba(139,92,246,0.65)' : 'rgba(255,255,255,0.07)'}
                  strokeWidth={isActive ? 1.6 : 1}
                  style={{ transition: 'stroke 500ms, stroke-width 500ms' }}
                />
                <line
                  x1={C}
                  y1={C}
                  x2={node.x}
                  y2={node.y}
                  stroke="rgba(255,255,255,0.05)"
                />
              </g>
            );
          })}

          <motion.g style={reduce ? undefined : { rotate: counter }}>
            <circle cx={C} cy={C} r="76" fill="#0a0a0a" stroke="rgba(255,255,255,0.12)" />
            <text
              x={C}
              y={C + 5}
              textAnchor="middle"
              className="fill-fg"
              style={{
                fontSize: 15,
                letterSpacing: '0.16em',
                fontFamily: 'var(--font-mono)',
              }}
            >
              BUSINESS
            </text>
          </motion.g>

          {nodes.map((node, i) => {
            const isActive = i === active;
            return (
              <motion.g
                key={`node-${node.label}`}
                style={reduce ? undefined : { rotate: counter }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isActive ? 50 : 42}
                  fill="#0a0a0a"
                  stroke={
                    isActive ? 'rgba(139,92,246,0.7)' : 'rgba(255,255,255,0.12)'
                  }
                  style={{ transition: 'r 450ms, stroke 450ms' }}
                />
                <text
                  x={node.x}
                  y={node.y + 3.5}
                  textAnchor="middle"
                  className={isActive ? '' : 'fill-faint'}
                  fill={isActive ? 'var(--color-ai-violet)' : undefined}
                  style={{
                    fontSize: node.label.length > 8 ? 8.2 : 9.4,
                    letterSpacing: '0.12em',
                    fontFamily: 'var(--font-mono)',
                    transition: 'fill 450ms',
                  }}
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
        </motion.svg>
      </div>
    </div>
  );
}
