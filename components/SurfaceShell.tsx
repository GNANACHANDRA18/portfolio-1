'use client';

import { usePathname } from 'next/navigation';
import { themeClass } from '@/lib/theme';

/**
 * Applies the route's colour tokens to the whole page body and hands the
 * surface to the custom pointer. Every page inherits its palette from here,
 * so individual pages never re-declare a theme.
 */
export default function SurfaceShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={`${themeClass(pathname)} ai-surface`} data-cursor-host>
      {children}
    </div>
  );
}
