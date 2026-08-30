'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ecosystemNodes } from '@/data/business';

const PALETTE = ['59,107,255', '139,92,246', '34,211,238', '224,176,86'];

/**
 * The business ecosystem: eight forces orbiting GROWTH, wired together with
 * thin lines that bend toward the pointer while data moves along them.
 *
 * Canvas 2D — one composited layer, paused off-screen, and reduced to a single
 * static frame when reduced motion is requested.
 */
export default function BusinessEcosystem({
  className = '',
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0, inside: false };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      pointer.inside =
        pointer.tx > -120 &&
        pointer.tx < rect.width + 120 &&
        pointer.ty > -120 &&
        pointer.ty < rect.height + 120;
    };

    window.addEventListener('pointermove', onPointer, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.02 },
    );
    io.observe(canvas);

    let raf = 0;
    let t = 0;

    const draw = () => {
      const cx = width / 2;
      const cy = height / 2;
      const R = Math.min(width, height) * 0.36;

      ctx.clearRect(0, 0, width, height);

      pointer.x += (pointer.tx - pointer.x) * 0.07;
      pointer.y += (pointer.ty - pointer.y) * 0.07;

      // Node positions, drifting slowly and leaning away from the pointer.
      const nodes = ecosystemNodes.map((label, i) => {
        const base = (i / ecosystemNodes.length) * Math.PI * 2 - Math.PI / 2;
        const wobble = Math.sin(t * 0.0004 + i) * 0.05;
        const angle = base + t * 0.00006 + wobble;
        let x = cx + Math.cos(angle) * R;
        let y = cy + Math.sin(angle) * R;

        if (pointer.inside) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 170 && d > 0.01) {
            const push = (1 - d / 170) * 26;
            x += (dx / d) * push;
            y += (dy / d) * push;
          }
        }

        return { label, x, y, hue: i % PALETTE.length };
      });

      // Background light following the pointer.
      if (pointer.inside) {
        const glow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          260,
        );
        glow.addColorStop(0, 'rgba(139,92,246,0.10)');
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      // Connections between every pair, bending around the pointer.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          let mx = (a.x + b.x) / 2;
          let my = (a.y + b.y) / 2;

          let strength = 0.055;
          if (pointer.inside) {
            const dx = mx - pointer.x;
            const dy = my - pointer.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 240 && d > 0.01) {
              const bend = (1 - d / 240) * 34;
              mx += (dx / d) * bend;
              my += (dy / d) * bend;
              strength = 0.055 + (1 - d / 240) * 0.22;
            }
          }

          ctx.strokeStyle = `rgba(150,160,255,${strength})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(mx, my, b.x, b.y);
          ctx.stroke();
        }
      }

      // Spokes into the centre, with a packet running along each.
      nodes.forEach((node, i) => {
        ctx.strokeStyle = 'rgba(150,160,255,0.10)';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();

        const phase = ((t * 0.0004 + i * 0.14) % 1 + 1) % 1;
        const px = node.x + (cx - node.x) * phase;
        const py = node.y + (cy - node.y) * phase;
        const fade = Math.sin(phase * Math.PI);
        ctx.fillStyle = `rgba(${PALETTE[node.hue]},${0.85 * fade})`;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Growth core — pulses, and pulses harder near the pointer.
      const near = pointer.inside
        ? Math.max(
            0,
            1 -
              Math.hypot(pointer.x - cx, pointer.y - cy) /
                (Math.min(width, height) * 0.5),
          )
        : 0;
      const pulse = 0.5 + Math.sin(t * 0.0016) * 0.5;
      const coreR = 52 + pulse * 8 + near * 14;

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2.6);
      core.addColorStop(0, `rgba(59,107,255,${0.3 + near * 0.2})`);
      core.addColorStop(0.5, 'rgba(139,92,246,0.10)');
      core.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 2.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0a0a0a';
      ctx.strokeStyle = `rgba(139,92,246,${0.45 + near * 0.3})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ededf0';
      ctx.font = '500 15px var(--font-mono, monospace)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GROWTH', cx, cy);

      // Node discs and labels.
      for (const node of nodes) {
        ctx.fillStyle = '#0a0a0a';
        ctx.strokeStyle = `rgba(${PALETTE[node.hue]},0.42)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'rgba(237,237,240,0.82)';
        ctx.font = '400 9px var(--font-mono, monospace)';
        ctx.fillText(node.label, node.x, node.y);
      }
    };

    const step = (time: number) => {
      t = time;
      if (visible) draw();
      raf = requestAnimationFrame(step);
    };

    if (reduce) {
      t = 0;
      draw();
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
    };
  }, [reduce]);

  return (
    <div
      data-cursor="explore"
      className={`relative ${className}`}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Business ecosystem: ${ecosystemNodes.join(', ')}, connected around growth.`}
        className="h-full w-full"
      />
    </div>
  );
}
