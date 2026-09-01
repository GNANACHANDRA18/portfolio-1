import SectionHead from '@/components/ai/SectionHead';
import GlassGallery from './GlassGallery';
import PlateBackdrop from './PlateBackdrop';
import { imageSystem } from '@/data/visuals';

/**
 * The section that explains the site's own imagery.
 *
 * It doubles as the demonstration: the panes are glass, the glass sits on the
 * plates being described, and the rim light on each pane is the accent of the
 * page that language belongs to.
 */
export default function ImageSystem({
  eyebrow = 'Image system',
  lines = ['GENERATED,', 'NOT BORROWED.'],
  lede = 'Every backdrop here is drawn from a seed rather than pulled from a stock library — six visual languages, one for each kind of page. Step through them.',
  accentLines = [1],
  backdrop,
  className = '',
}: {
  eyebrow?: string;
  lines?: string[];
  lede?: string;
  accentLines?: number[];
  /** Optional plate behind the whole section. */
  backdrop?: string;
  className?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden border-t border-line py-24 md:py-36 ${className}`}
    >
      {backdrop && <PlateBackdrop src={backdrop} treatment="vignette" />}

      <div className="container-x relative z-10">
        <SectionHead
          eyebrow={eyebrow}
          lines={lines}
          accentLines={accentLines}
          lede={lede}
          className="mb-14"
        />
        <GlassGallery slides={imageSystem} eyebrow={eyebrow} />
      </div>
    </section>
  );
}
