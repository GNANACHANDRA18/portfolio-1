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
  /** Reels and shorts are 9:16; anything else is treated as 16:9. */
  orientation?: 'landscape' | 'portrait';
};

/**
 * Turns an Instagram reel link into its embed URL.
 *
 * Accepts whatever form the link is copied in — a full permalink with or
 * without query junk, a `/p/` post link, or the bare shortcode — because the
 * share sheet gives a different shape depending on where it is copied from,
 * and a data file should not care which.
 *
 *   reel('https://www.instagram.com/reel/Cx1y2z3AbCd/?igsh=abc')
 *   reel('Cx1y2z3AbCd')
 */
export function reel(link: string) {
  const shortcode =
    link.match(/instagram\.com\/(?:reels?|p)\/([A-Za-z0-9_-]+)/)?.[1] ??
    link.replace(/^\/+|\/+$/g, '');

  return `https://www.instagram.com/reel/${shortcode}/embed`;
}

/**
 * Video reel.
 *
 * Add entries here as edits are published — the gallery renders real items
 * first and fills the remaining slots with reserved placeholders. No
 * placeholder work is presented as a finished piece.
 */
export const videos: VideoItem[] = [];

/**
 * Instagram reels, shown as content work on /social-media and alongside the
 * gallery on /video-editing.
 *
 * Each entry needs the permalink and a real title; `reel()` handles the embed
 * URL. Instagram serves its own player inside the frame, so nothing here is
 * re-hosted — the view count and the profile link stay on the original post.
 *
 * Example:
 *   {
 *     id: 'hook-breakdown',
 *     title: 'Hook breakdown',
 *     category: 'Short-form',
 *     orientation: 'portrait',
 *     embedUrl: reel('https://www.instagram.com/reel/Cx1y2z3AbCd/'),
 *   },
 */
export const reels: VideoItem[] = [
  {
    id: 'client-01',
    title: 'Client reel — 01',
    category: 'Client videos',
    orientation: 'portrait',
    embedUrl: reel('https://www.instagram.com/reel/DboL1qBo8F5/'),
  },
  {
    id: 'client-02',
    title: 'Client reel — 02',
    category: 'Client videos',
    orientation: 'portrait',
    embedUrl: reel('https://www.instagram.com/reel/DbPqpeyxZi0/'),
  },
  {
    id: 'company-01',
    title: 'Company reel',
    category: 'Company videos',
    orientation: 'portrait',
    embedUrl: reel('https://www.instagram.com/reel/DZ5Vu42IMTA/'),
  },
  {
    id: 'edit-01',
    title: 'Edit demo — 01',
    category: 'Edited reels',
    orientation: 'portrait',
    embedUrl: reel('https://www.instagram.com/reel/DZkUbyvB_N7/'),
  },
  {
    id: 'edit-02',
    title: 'Edit demo — 02',
    category: 'Edited reels',
    orientation: 'portrait',
    embedUrl: reel('https://www.instagram.com/reel/DcqOtjkxHyG/'),
  },
  {
    id: 'edit-03',
    title: 'Edit demo — 03',
    category: 'Edited reels',
    orientation: 'portrait',
    embedUrl: reel('https://www.instagram.com/reel/Dcl9EfLgNp2/'),
  },
];

/** Filter labels for the reel wall, derived so a new category shows up on its own. */
export const reelCategories = [
  'All',
  ...Array.from(new Set(reels.map((item) => item.category))),
];

/** Slot labels used until real pieces are published. */
export const reservedSlots = [
  'Short-form / Reels',
  'Brand film',
  'Promotional',
  'Social campaign',
  'Product',
  'Marketing cut',
];
