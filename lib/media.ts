import { media, asset, type MediaKey } from '@/data/media';

/**
 * Spreads a manifest entry into the props next/image needs.
 *
 *   <Image {...img(project.media.card)} alt="…" fill sizes="…" />
 *
 * Use this anywhere a raw <Image> is already laid out with `fill` and does
 * not want the wrapper the <Media> component brings. It exists so no call
 * site has to remember the blur placeholder — a plain `src` on a dark page
 * flashes an empty box on slow connections, and that is the one thing the
 * asset pipeline was built to stop.
 *
 * A value that is not a manifest key but is a path (a hand-added poster, say)
 * is passed straight through without a placeholder, rather than silently
 * resolving to the fallback asset and rendering the wrong picture.
 */
export function img(key: MediaKey | (string & {})) {
  if (!(key in media)) {
    if (key.startsWith('/') || key.startsWith('http')) return { src: key };
    return { src: asset(key).src };
  }

  const item = asset(key);
  return {
    src: item.src,
    placeholder: 'blur' as const,
    blurDataURL: item.blur,
  };
}
