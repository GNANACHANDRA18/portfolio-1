'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

type Particle = {
  /** Home position — everything springs back to this. */
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  drift: number;
};

const PALETTE = ['47,91,255', '124,58,237', '6,182,212', '229,57,155'];

/**
 * The hero's digital intelligence field.
 *
 * A drifting lattice of particles with proximity links. The pointer pushes
 * nearby particles away and bends the lines around it; everything springs
 * back to its home position. Canvas 2D, one composited layer, paused when
 * off-screen and reduced to a single static frame under reduced motion.
 */
export default function IntelligenceField({
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

    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const DENSITY = mobile ? 15000 : 9000;
    const LINK = mobile ? 96 : 124;
    const PUSH = mobile ? 0 : 120;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];

    const seed = (i: number, salt: number) => {
      const v = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
      return v - Math.floor(v);
    };

    const build = () => {
      const count = Math.min(
        mobile ? 70 : 150,
        Math.max(36, Math.round((width * height) / DENSITY)),
      );

      particles = Array.from({ length: count }, (_, i) => {
        const hx = seed(i, 1) * width;
        const hy = seed(i, 2) * height;
        return {
          hx,
          hy,
          x: hx,
          y: hy,
          vx: 0,
          vy: 0,
          r: 0.9 + seed(i, 3) * 1.5,
          hue: i % PALETTE.length,
          drift: seed(i, 4) * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const pointer = { x: -9999, y: -9999, inside: false };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.inside =
        pointer.x > -PUSH &&
        pointer.x < rect.width + PUSH &&
        pointer.y > -PUSH &&
        pointer.y < rect.height + PUSH;
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
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Gentle ambient drift around the home position.
        const dx = Math.cos(t * 0.0004 + p.drift) * 9;
        const dy = Math.sin(t * 0.00052 + p.drift) * 9;
        const targetX = p.hx + dx;
        const targetY = p.hy + dy;

        // Spring home.
        p.vx += (targetX - p.x) * 0.014;
        p.vy += (targetY - p.y) * 0.014;

        // Pointer repulsion.
        if (pointer.inside && PUSH > 0) {
          const px = p.x - pointer.x;
          const py = p.y - pointer.y;
          const d2 = px * px + py * py;
          if (d2 < PUSH * PUSH && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const force = (1 - d / PUSH) * 2.4;
            p.vx += (px / d) * force;
            p.vy += (py / d) * force;
          }
        }

        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
      }

      // Links, bent slightly toward the pointer for a field-like feel.
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > LINK) continue;

          const strength = (1 - dist / LINK) * 0.3;
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;

          let bx = mx;
          let by = my;
          if (pointer.inside && PUSH > 0) {
            const px = mx - pointer.x;
            const py = my - pointer.y;
            const d = Math.sqrt(px * px + py * py);
            if (d < PUSH * 1.6 && d > 0.01) {
              const bend = (1 - d / (PUSH * 1.6)) * 16;
              bx += (px / d) * bend;
              by += (py / d) * bend;
            }
          }

          ctx.strokeStyle = `rgba(150,160,255,${strength})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(bx, by, b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `rgba(${PALETTE[p.hue]},0.55)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
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
    <canvas ref={canvasRef} aria-hidden className={`h-full w-full ${className}`} />
  );
}
