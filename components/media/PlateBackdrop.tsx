import type { CSSProperties } from 'react';
import Media, { type MediaTreatment } from './Media';
import type { MediaKey } from '@/data/media';

/**
 * A generated plate used as the ground of a section.
 *
 * Absolutely positioned behind the section's own content, scrimmed so the copy
 * on top keeps full contrast, and optionally drifting. Sections that use it
 * need `relative` and `overflow-hidden` on themselves; their content needs to
 * sit above it, which `container-x relative` already does everywhere on this
 * site.
 */
export default function PlateBackdrop({
  src,
  treatment = 'backdrop',
  drift = false,
  duration = 26,
  priority = false,
  className = '',
}: {
  src: MediaKey | (string & {});
  treatment?: Extract<MediaTreatment, 'backdrop' | 'vignette'>;
  drift?: boolean;
  /** Seconds for one drift cycle. Longer reads calmer. */
  duration?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      style={{ '--plate-duration': `${duration}s` } as CSSProperties}
    >
      <Media
        src={src}
        alt=""
        treatment={treatment}
        priority={priority}
        sizes="100vw"
        inset
        imageClassName={drift ? 'plate-drift' : ''}
      />
    </div>
  );
}
