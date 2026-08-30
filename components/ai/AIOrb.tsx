'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

type Point = {
  /** Position on the unit sphere. */
  x: number;
  y: number;
  z: number;
  /** Per-point phase so the surface breathes unevenly. */
  phase: number;
  hue: number;
};

const PALETTE = ['59,91,255', '124,58,237', '6,182,212', '229,57,155', '255,197,61'];

/**
 * The hero orb: a rotating point cloud with proximity links, a soft core glow
 * and a highlight that follows the pointer.
 *
 * Canvas 2D rather than WebGL — the point count is small, the whole thing is
 * one composited layer, and it pauses the moment it scrolls out of view.
 */
export default function AIOrb({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const COUNT = mobile ? 58 : 112;
    const LINK_DIST = mobile ? 0.46 : 0.42;

    // Fibonacci sphere — even coverage without clustering at the poles.
    const points: Point[] = Array.from({ length: COUNT }, (_, i) => {
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;
      return {
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
        phase: (i / COUNT) * Math.PI * 2,
        hue: i % PALETTE.length,
      };
    });

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
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    // Pointer influence, normalised to the canvas box and eased toward target.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: 0 };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      pointer.active = 1;
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
    // Scroll progress squeezes and rotates the cloud as the hero leaves.
    let scrollMorph = 0;

    const readScroll = () => {
      const rect = canvas.getBoundingClientRect();
      const travelled = -rect.top / Math.max(rect.height, 1);
      scrollMorph = Math.max(0, Math.min(1.2, travelled));
    };

    window.addEventListener('scroll', readScroll, { passive: true });
    readScroll();

    const projected = new Float32Array(COUNT * 4); // x, y, scale, depth

    const draw = () => {
      const cx = width / 2;
      const cy = height / 2;
      const base = Math.min(width, height) * 0.36;

      ctx.clearRect(0, 0, width, height);

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      const rotY = t * 0.00022 + pointer.x * 0.5 + scrollMorph * 1.1;
      const rotX = Math.sin(t * 0.00017) * 0.22 - pointer.y * 0.35;
      const squeeze = 1 - scrollMorph * 0.42;
      const globalFade = Math.max(0, 1 - scrollMorph * 0.85);

      if (globalFade <= 0.01) {
        raf = requestAnimationFrame(step);
        return;
      }

      // Core glow.
      const glowX = cx + pointer.x * base * 0.3;
      const glowY = cy + pointer.y * base * 0.3;
      const glow = ctx.createRadialGradient(
        glowX,
        glowY,
        0,
        glowX,
        glowY,
        base * 1.5,
      );
      glow.addColorStop(0, `rgba(124,58,237,${0.26 * globalFade})`);
      glow.addColorStop(0.45, `rgba(59,91,255,${0.12 * globalFade})`);
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < COUNT; i++) {
        const p = points[i];

        // Breathing radius keeps the surface alive without moving points off it.
        const breathe = 1 + Math.sin(t * 0.0011 + p.phase) * 0.07;

        // Rotate around Y then X.
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Weak perspective.
        const depth = 1 / (2.1 - z2);
        const scale = base * breathe * depth * 1.55;

        projected[i * 4] = cx + x1 * scale * squeeze;
        projected[i * 4 + 1] = cy + y1 * scale;
        projected[i * 4 + 2] = depth;
        projected[i * 4 + 3] = z2;
      }

      // Links between nearby projected points.
      ctx.lineWidth = 1;
      for (let i = 0; i < COUNT; i++) {
        const ax = projected[i * 4];
        const ay = projected[i * 4 + 1];
        const az = projected[i * 4 + 3];
        if (az < -0.35) continue;

        for (let j = i + 1; j < COUNT; j++) {
          const bx = projected[j * 4];
          const by = projected[j * 4 + 1];
          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const limit = base * LINK_DIST;
          if (dist > limit) continue;

          const strength = (1 - dist / limit) * 0.4 * globalFade;
          ctx.strokeStyle = `rgba(150,140,255,${strength})`;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }

      // Points, back to front.
      const order = Array.from({ length: COUNT }, (_, i) => i).sort(
        (a, b) => projected[a * 4 + 3] - projected[b * 4 + 3],
      );

      for (const i of order) {
        const px = projected[i * 4];
        const py = projected[i * 4 + 1];
        const depth = projected[i * 4 + 2];
        const alpha = Math.min(1, Math.max(0.12, (depth - 0.3) * 2)) * globalFade;
        const r = Math.max(0.9, depth * 3.4);

        ctx.fillStyle = `rgba(${PALETTE[points[i].hue]},${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (time: number) => {
      t = time;
      if (visible) draw();
      raf = requestAnimationFrame(step);
    };

    if (reduce) {
      // One static frame — no loop, no motion.
      t = 1200;
      draw();
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', readScroll);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`h-full w-full ${className}`}
    />
  );
}
