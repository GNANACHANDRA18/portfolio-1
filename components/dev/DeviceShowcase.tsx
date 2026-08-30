'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const DEVICES = [
  { id: 'desktop', label: 'DESKTOP', width: 100, ratio: '16 / 10', cols: 3 },
  { id: 'tablet', label: 'TABLET', width: 62, ratio: '4 / 3', cols: 2 },
  { id: 'mobile', label: 'MOBILE', width: 30, ratio: '9 / 16', cols: 1 },
];

/** One layout, resized. The mock reflows rather than being swapped out. */
export default function DeviceShowcase() {
  const [device, setDevice] = useState(DEVICES[0]);
  const reduce = useReducedMotion();

  return (
    <div>
      <div role="tablist" aria-label="Screen size" className="mb-8 flex flex-wrap gap-2">
        {DEVICES.map((d) => {
          const selected = device.id === d.id;
          return (
            <button
              key={d.id}
              role="tab"
              type="button"
              data-cursor="magnet"
              aria-selected={selected}
              onClick={() => setDevice(d)}
              className={`relative rounded-full px-5 py-2.5 font-mono text-[10.5px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                selected ? 'text-bg' : 'text-muted hover:text-fg'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="device-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-fg"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              {!selected && (
                <span className="absolute inset-0 -z-10 rounded-full border border-line" />
              )}
              {d.label}
            </button>
          );
        })}
      </div>

      <div className="flex min-h-[380px] items-center justify-center rounded-3xl border border-line bg-elev/50 p-6 md:p-10">
        <motion.div
          layout
          animate={{ width: `${device.width}%` }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: 'spring', stiffness: 120, damping: 20 }
          }
          className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(20,20,70,0.4)]"
          style={{ maxWidth: '100%' }}
        >
          <div className="flex items-center gap-1.5 border-b border-line bg-elev/70 px-4 py-2.5">
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
              <span
                key={c}
                aria-hidden
                className="h-2 w-2 rounded-full"
                style={{ background: c }}
              />
            ))}
          </div>

          <div className="p-4" style={{ aspectRatio: device.ratio }}>
            <div className="h-6 w-1/2 rounded-full bg-line-strong" />
            <div className="mt-2 h-3 w-1/3 rounded-full bg-line" />
            <motion.div
              layout
              className="mt-5 grid gap-2.5"
              style={{
                gridTemplateColumns: `repeat(${device.cols}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: device.cols * 2 }, (_, i) => (
                <motion.div
                  layout
                  key={i}
                  className="rounded-lg bg-linear-to-br from-ai-blue/15 to-ai-violet/10"
                  style={{ aspectRatio: '4 / 3' }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <p className="mt-7 text-[17px] text-fg md:text-xl">
        One experience. Every screen.
      </p>
    </div>
  );
}
