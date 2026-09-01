'use client';

import { useCallback, useRef, type CSSProperties, type ReactNode } from 'react';

/**
 * A pane of glass.
 *
 * The look is carried entirely by CSS (see the GLASS block in globals.css):
 * a real backdrop blur, a lit top edge, a conic rim light that turns on its
 * own, and a specular highlight. The only thing this component adds is the
 * pointer tracking for that highlight, which is why it is the one client
 * boundary in the media system.
 *
 * On touch devices no pointer events fire, the highlight stays parked at the
 * top edge, and the panel still reads correctly — nothing here is required for
 * the design to work.
 */

export type GlassDensity = 'thin' | 'default' | 'thick';

const DENSITY: Record<GlassDensity, string> = {
  thin: 'glass-thin',
  default: '',
  thick: 'glass-thick',
};

export type GlassPanelProps = {
  children: ReactNode;
  density?: GlassDensity;
  /** Adds the hover lift and a brighter, faster rim. */
  interactive?: boolean;
  /** Slow vertical drift, for panels floating over a plate. */
  float?: boolean;
  /** Seconds — staggers a group of floating panels. */
  floatDelay?: number;
  /** Overrides the rim colour. Any CSS colour, usually a token. */
  rim?: string;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'article' | 'section' | 'li' | 'figure';
};

export default function GlassPanel({
  children,
  density = 'default',
  interactive = false,
  float = false,
  floatDelay = 0,
  rim,
  className = '',
  style,
  as: Tag = 'div',
}: GlassPanelProps) {
  const ref = useRef<HTMLElement>(null);

  const track = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    node.style.setProperty('--glass-x', `${event.clientX - box.left}px`);
    node.style.setProperty('--glass-y', `${event.clientY - box.top}px`);
  }, []);

  const release = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty('--glass-x', '50%');
    node.style.setProperty('--glass-y', '0%');
  }, []);

  return (
    <Tag
      // One ref type covers every tag this renders.
      ref={ref as React.Ref<never>}
      onPointerMove={track}
      onPointerLeave={release}
      className={[
        'glass-panel',
        DENSITY[density],
        interactive ? 'glass-interactive' : '',
        float ? 'glass-float' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          ...(rim ? { '--glass-rim': rim } : null),
          ...(float ? { '--float-delay': `${floatDelay}s` } : null),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
