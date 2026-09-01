import Image from 'next/image';
import { asset, type MediaKey } from '@/data/media';

/**
 * Every image on the site goes through here.
 *
 * It guarantees the four things that are easy to get wrong one component at a
 * time: a reserved aspect box so nothing shifts on load, the generated LQIP so
 * nothing appears out of an empty rectangle, correct `sizes` so a phone never
 * downloads a 1920px plate, and a treatment that matches the surface the image
 * is sitting on.
 */

export type MediaTreatment =
  /** Plain photographic presentation. */
  | 'clean'
  /** Hairline border and a dark inset — the default for content imagery. */
  | 'framed'
  /** Backdrop use: dimmed and scrimmed so type sits on top at full contrast. */
  | 'backdrop'
  /** Backdrop, plus a radial vignette that pulls the eye to the centre. */
  | 'vignette';

const TREATMENT: Record<MediaTreatment, string> = {
  clean: '',
  framed: 'rounded-3xl border border-line bg-elev shadow-[var(--shadow-lg)]',
  backdrop: 'plate-scrim',
  vignette: 'plate-vignette',
};

const OPACITY: Partial<Record<MediaTreatment, string>> = {
  backdrop: 'opacity-[0.68]',
  vignette: 'opacity-[0.75]',
};

export type MediaProps = {
  /** Key into the generated manifest in data/media.ts. */
  src: MediaKey | (string & {});
  alt: string;
  /** CSS aspect ratio for the reserved box, e.g. '16/9'. Omit to fill the parent. */
  ratio?: string;
  treatment?: MediaTreatment;
  priority?: boolean;
  /** Responsive sizes hint. Defaults to a full-width container. */
  sizes?: string;
  className?: string;
  /** Extra classes on the <img> itself — used for drift and scale effects. */
  imageClassName?: string;
  /** object-position, for crops that need a specific anchor. */
  position?: string;
  /**
   * Absolutely fill the nearest positioned ancestor instead of taking part in
   * the layout. Needed because the wrapper cannot be `relative` and
   * `absolute` at once: Tailwind emits `.relative` after `.absolute`, so a
   * caller passing `absolute inset-0` used to lose and the box collapsed to
   * zero height, which next/image reports as a `fill` with no height.
   */
  inset?: boolean;
};

export default function Media({
  src,
  alt,
  ratio,
  treatment = 'framed',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 1200px',
  className = '',
  imageClassName = '',
  position,
  inset = false,
}: MediaProps) {
  const item = asset(src);
  const decorative = alt.trim() === '';

  return (
    <div
      className={`${inset ? 'absolute inset-0' : 'relative'} overflow-hidden ${TREATMENT[treatment]} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
      aria-hidden={decorative || undefined}
    >
      <Image
        src={item.src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={item.blur}
        style={position ? { objectPosition: position } : undefined}
        className={`object-cover ${OPACITY[treatment] ?? ''} ${imageClassName}`}
      />
    </div>
  );
}
