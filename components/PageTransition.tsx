'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * Route-level enter transition. Keyed on the pathname so every navigation
 * replays a short, intentional fade-and-rise instead of a hard swap.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <div key={pathname}>{children}</div>;

  return (
    <>
      <motion.div
        key={`sweep-${pathname}`}
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-px origin-left bg-linear-to-r from-transparent via-accent to-transparent"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
