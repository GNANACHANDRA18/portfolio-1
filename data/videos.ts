export type VideoItem = {
  id: string;
  title: string;
  category: string;
  /** Poster frame — local path under /public or a remote URL. */
  poster?: string;
  /** Direct video file, or an embed URL for a hosted platform. */
  src?: string;
  embedUrl?: string;
  description?: string;
};

/**
 * Video reel.
 *
 * Add entries here as edits are published — the gallery renders real items
 * first and fills the remaining slots with reserved placeholders. No
 * placeholder work is presented as a finished piece.
 */
export const videos: VideoItem[] = [];

/** Slot labels used until real pieces are published. */
export const reservedSlots = [
  'Short-form / Reels',
  'Brand film',
  'Promotional',
  'Social campaign',
  'Product',
  'Marketing cut',
];
