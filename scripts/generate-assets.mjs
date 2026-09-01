/**
 * Visual asset pipeline.
 *
 * Everything the site shows as imagery is produced here, deterministically,
 * and committed to /public. Two sources:
 *
 *   1. Brand plates — abstract, generated from SVG + a seeded noise field.
 *      Six visual languages (nebula, lattice, strata, pulse, frames, prism),
 *      one per kind of page, so /ai does not look like /marketing.
 *   2. Client photography — the real Qyverix project images, self-hosted and
 *      cropped into several honest framings. Each slug declares which regions
 *      of the source are free of burnt-in logotype, so a crop never slices a
 *      client's wordmark in half.
 *
 * Every output also gets a 20px LQIP baked into data/media.ts, so no image
 * ever pops in from an empty box.
 *
 *   node scripts/generate-assets.mjs
 */

import sharp from 'sharp';
import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(root, 'public');
const PLATES = path.join(PUBLIC, 'images/plates');
const WORK = path.join(PUBLIC, 'images/work');

/* ---------------------------------------------------------------- */
/*  Deterministic randomness                                        */
/* ---------------------------------------------------------------- */

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Monochrome grain, generated at half scale and upsampled so it reads as
 *  film rather than sensor noise. */
async function grain(w, h, seed, alpha) {
  const gw = Math.ceil(w / 2);
  const gh = Math.ceil(h / 2);
  const rnd = mulberry32(seed);
  const px = Buffer.alloc(gw * gh * 4);
  for (let i = 0; i < gw * gh; i++) {
    const v = 110 + Math.floor(rnd() * 145);
    px[i * 4] = v;
    px[i * 4 + 1] = v;
    px[i * 4 + 2] = v;
    px[i * 4 + 3] = alpha;
  }
  return sharp(px, { raw: { width: gw, height: gh, channels: 4 } })
    .resize(w, h, { kernel: 'cubic' })
    .png()
    .toBuffer();
}

const svg = (w, h, body) =>
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="' +
      w +
      '" height="' +
      h +
      '" viewBox="0 0 ' +
      w +
      ' ' +
      h +
      '">' +
      body +
      '</svg>',
  );

/** Radial colour field, used as the blurred underpainting of most plates. */
function blobs(w, h, list) {
  const defs = list
    .map(
      (b, i) =>
        '<radialGradient id="b' +
        i +
        '" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="' +
        b.color +
        '" stop-opacity="' +
        (b.o ?? 0.9) +
        '"/>' +
        '<stop offset="60%" stop-color="' +
        b.color +
        '" stop-opacity="' +
        (b.o ?? 0.9) * 0.28 +
        '"/>' +
        '<stop offset="100%" stop-color="' +
        b.color +
        '" stop-opacity="0"/>' +
        '</radialGradient>',
    )
    .join('');
  const shapes = list
    .map(
      (b, i) =>
        '<ellipse cx="' +
        b.x * w +
        '" cy="' +
        b.y * h +
        '" rx="' +
        b.rx * w +
        '" ry="' +
        b.ry * h +
        '" fill="url(#b' +
        i +
        ')"/>',
    )
    .join('');
  return svg(w, h, '<defs>' + defs + '</defs>' + shapes);
}

/* ---------------------------------------------------------------- */
/*  Visual languages                                                */
/* ---------------------------------------------------------------- */

const INK = {
  bg: '#050505',
  aiBg: '#050509',
  blue: '#3b6bff',
  violet: '#8b5cf6',
  magenta: '#e5399b',
  cyan: '#22d3ee',
  gold: '#e9b872',
  goldDeep: '#b98a45',
};

/** Layered colour cloud — the /ai language. */
function nebula(w, h, seed) {
  const rnd = mulberry32(seed);
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  const field = [
    { color: INK.blue, x: 0.24, y: 0.3, rx: 0.42, ry: 0.5, o: 0.85 },
    { color: INK.violet, x: 0.68, y: 0.22, rx: 0.38, ry: 0.46, o: 0.78 },
    { color: INK.magenta, x: 0.8, y: 0.74, rx: 0.34, ry: 0.4, o: 0.6 },
    { color: INK.cyan, x: 0.14, y: 0.82, rx: 0.3, ry: 0.36, o: 0.5 },
    { color: pick([INK.violet, INK.blue]), x: 0.5, y: 0.52, rx: 0.26, ry: 0.3, o: 0.44 },
  ];
  const rings = Array.from({ length: 5 }, (_, i) => {
    const r = (0.16 + i * 0.11) * Math.min(w, h);
    return (
      '<circle cx="' +
      w * 0.5 +
      '" cy="' +
      h * 0.5 +
      '" r="' +
      r +
      '" fill="none" stroke="rgba(255,255,255,' +
      (0.16 - i * 0.022) +
      ')" stroke-width="1"/>'
    );
  }).join('');
  const specks = Array.from({ length: 90 }, () => {
    const x = rnd() * w;
    const y = rnd() * h;
    const r = rnd() * 1.5 + 0.4;
    return (
      '<circle cx="' +
      x.toFixed(1) +
      '" cy="' +
      y.toFixed(1) +
      '" r="' +
      r.toFixed(2) +
      '" fill="rgba(255,255,255,' +
      (0.1 + rnd() * 0.3).toFixed(2) +
      ')"/>'
    );
  }).join('');
  return { base: INK.aiBg, field, blur: 70, overlay: svg(w, h, rings + specks) };
}

/** Converging wireframe — the /development language. */
function lattice(w, h, seed) {
  const vpX = w * 0.5;
  const vpY = h * 0.46;
  const cols = 26;
  const rays = Array.from({ length: cols + 1 }, (_, i) => {
    const x = (i / cols) * w * 2.2 - w * 0.6;
    return (
      '<line x1="' +
      vpX +
      '" y1="' +
      vpY +
      '" x2="' +
      x.toFixed(1) +
      '" y2="' +
      h * 1.25 +
      '" stroke="rgba(255,255,255,0.22)" stroke-width="1"/>'
    );
  }).join('');
  const bands = Array.from({ length: 16 }, (_, i) => {
    const t = Math.pow(i / 16, 2.1);
    const y = vpY + t * (h * 0.9);
    return (
      '<line x1="0" y1="' +
      y.toFixed(1) +
      '" x2="' +
      w +
      '" y2="' +
      y.toFixed(1) +
      '" stroke="rgba(255,255,255,' +
      (0.1 + t * 0.22).toFixed(3) +
      ')" stroke-width="1"/>'
    );
  }).join('');
  const rnd = mulberry32(seed);
  const nodes = Array.from({ length: 14 }, () => {
    const x = rnd() * w;
    const y = vpY + Math.pow(rnd(), 1.7) * h * 0.7;
    return (
      '<rect x="' +
      (x - 2).toFixed(1) +
      '" y="' +
      (y - 2).toFixed(1) +
      '" width="5" height="5" fill="' +
      INK.blue +
      '" opacity="' +
      (0.35 + rnd() * 0.5).toFixed(2) +
      '"/>'
    );
  }).join('');
  return {
    base: INK.bg,
    field: [
      { color: INK.blue, x: 0.5, y: 0.42, rx: 0.4, ry: 0.34, o: 0.4 },
      { color: INK.cyan, x: 0.16, y: 0.78, rx: 0.28, ry: 0.3, o: 0.22 },
    ],
    blur: 90,
    overlay: svg(w, h, bands + rays + nodes),
  };
}

/** Flat editorial bands — the /marketing language. Almost no glow. */
function strata(w, h, seed) {
  const rnd = mulberry32(seed);
  let y = 0;
  const parts = [];
  while (y < h) {
    const band = h * (0.05 + rnd() * 0.13);
    const tone = 8 + Math.floor(rnd() * 16);
    parts.push(
      '<rect x="0" y="' +
        y.toFixed(1) +
        '" width="' +
        w +
        '" height="' +
        band.toFixed(1) +
        '" fill="rgb(' +
        tone +
        ',' +
        tone +
        ',' +
        (tone + 1) +
        ')"/>',
    );
    y += band;
  }
  const rules = Array.from({ length: 7 }, (_, i) => {
    const ry = h * (0.1 + i * 0.13);
    const width = w * (0.12 + rnd() * 0.62);
    const x = w * rnd() * 0.35;
    return (
      '<rect x="' +
      x.toFixed(1) +
      '" y="' +
      ry.toFixed(1) +
      '" width="' +
      width.toFixed(1) +
      '" height="1" fill="' +
      (i % 3 === 0 ? INK.blue : 'rgba(255,255,255,0.16)') +
      '" opacity="' +
      (i % 3 === 0 ? 0.7 : 1) +
      '"/>'
    );
  }).join('');
  const block =
    '<rect x="' +
    w * 0.62 +
    '" y="' +
    h * 0.18 +
    '" width="' +
    w * 0.3 +
    '" height="' +
    h * 0.5 +
    '" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>';
  return {
    base: INK.bg,
    field: [{ color: INK.blue, x: 0.78, y: 0.3, rx: 0.3, ry: 0.34, o: 0.16 }],
    blur: 100,
    overlay: svg(w, h, parts.join('') + rules + block),
  };
}

/** Concentric signal — the /social-media language. */
function pulse(w, h, seed) {
  const rnd = mulberry32(seed);
  const cx = w * 0.3;
  const cy = h * 0.52;
  const rings = Array.from({ length: 13 }, (_, i) => {
    const r = (i + 1) * (Math.max(w, h) * 0.055);
    const op = Math.max(0.03, 0.34 - i * 0.026);
    return (
      '<circle cx="' +
      cx +
      '" cy="' +
      cy +
      '" r="' +
      r.toFixed(1) +
      '" fill="none" stroke="' +
      (i % 4 === 0 ? INK.magenta : 'rgba(255,255,255,0.5)') +
      '" stroke-opacity="' +
      op.toFixed(3) +
      '" stroke-width="' +
      (i % 4 === 0 ? 1.4 : 1) +
      '"/>'
    );
  }).join('');
  const waves = Array.from({ length: 4 }, (_, k) => {
    const amp = h * (0.04 + k * 0.02);
    const yBase = h * (0.24 + k * 0.18);
    let d = 'M 0 ' + yBase.toFixed(1);
    for (let x = 0; x <= w; x += 24) {
      const yy = yBase + Math.sin((x / w) * Math.PI * (2 + k) + k) * amp;
      d += ' L ' + x + ' ' + yy.toFixed(1);
    }
    return (
      '<path d="' +
      d +
      '" fill="none" stroke="' +
      (k % 2 ? INK.cyan : INK.magenta) +
      '" stroke-opacity="' +
      (0.18 - k * 0.03).toFixed(2) +
      '" stroke-width="1.2"/>'
    );
  }).join('');
  const dots = Array.from({ length: 40 }, () => {
    const a = rnd() * Math.PI * 2;
    const r = Math.pow(rnd(), 0.6) * Math.max(w, h) * 0.5;
    return (
      '<circle cx="' +
      (cx + Math.cos(a) * r).toFixed(1) +
      '" cy="' +
      (cy + Math.sin(a) * r * 0.7).toFixed(1) +
      '" r="' +
      (rnd() * 1.6 + 0.5).toFixed(2) +
      '" fill="rgba(255,255,255,' +
      (0.12 + rnd() * 0.3).toFixed(2) +
      ')"/>'
    );
  }).join('');
  return {
    base: INK.bg,
    field: [
      { color: INK.magenta, x: 0.3, y: 0.52, rx: 0.34, ry: 0.42, o: 0.5 },
      { color: INK.cyan, x: 0.82, y: 0.3, rx: 0.3, ry: 0.34, o: 0.34 },
      { color: INK.violet, x: 0.66, y: 0.86, rx: 0.28, ry: 0.3, o: 0.3 },
    ],
    blur: 78,
    overlay: svg(w, h, waves + rings + dots),
  };
}

/** Timeline and frames — the /video-editing language. */
function frames(w, h, seed) {
  const rnd = mulberry32(seed);
  const stripY = h * 0.34;
  const stripH = h * 0.3;
  const count = 7;
  const gap = w * 0.014;
  const fw = (w * 1.12 - gap * (count - 1)) / count;
  const cells = Array.from({ length: count }, (_, i) => {
    const x = -w * 0.06 + i * (fw + gap);
    const lum = 10 + Math.floor(rnd() * 20);
    return (
      '<rect x="' +
      x.toFixed(1) +
      '" y="' +
      stripY.toFixed(1) +
      '" width="' +
      fw.toFixed(1) +
      '" height="' +
      stripH.toFixed(1) +
      '" rx="6" fill="rgb(' +
      lum +
      ',' +
      lum +
      ',' +
      lum +
      ')" stroke="rgba(255,255,255,0.09)"/>'
    );
  }).join('');
  const perfs = Array.from({ length: count * 4 }, (_, i) => {
    const x = -w * 0.06 + (i * (w * 1.12)) / (count * 4) + 6;
    return (
      '<rect x="' +
      x.toFixed(1) +
      '" y="' +
      (stripY - h * 0.055).toFixed(1) +
      '" width="' +
      (w * 0.012).toFixed(1) +
      '" height="' +
      (h * 0.028).toFixed(1) +
      '" rx="2" fill="rgba(255,255,255,0.09)"/>'
    );
  }).join('');
  const tracks = Array.from({ length: 3 }, (_, k) => {
    const y = h * (0.76 + k * 0.06);
    return Array.from({ length: 4 }, () => {
      const x = rnd() * w * 0.8;
      const width = w * (0.06 + rnd() * 0.18);
      return (
        '<rect x="' +
        x.toFixed(1) +
        '" y="' +
        y.toFixed(1) +
        '" width="' +
        width.toFixed(1) +
        '" height="' +
        (h * 0.018).toFixed(1) +
        '" rx="3" fill="' +
        (k === 0 ? INK.gold : 'rgba(255,255,255,0.14)') +
        '" opacity="' +
        (k === 0 ? 0.55 : 1) +
        '"/>'
      );
    }).join('');
  }).join('');
  const playhead =
    '<rect x="' +
    (w * 0.42).toFixed(1) +
    '" y="' +
    (h * 0.28).toFixed(1) +
    '" width="1.5" height="' +
    (h * 0.62).toFixed(1) +
    '" fill="' +
    INK.gold +
    '" opacity="0.75"/>';
  return {
    base: INK.bg,
    field: [
      { color: INK.gold, x: 0.42, y: 0.5, rx: 0.4, ry: 0.44, o: 0.3 },
      { color: INK.goldDeep, x: 0.86, y: 0.8, rx: 0.26, ry: 0.3, o: 0.24 },
    ],
    blur: 88,
    overlay: svg(w, h, perfs + cells + tracks + playhead),
  };
}

/** Refracted beam — the home and about language. */
function prism(w, h, seed) {
  const rnd = mulberry32(seed);
  const spectrum = [INK.blue, INK.violet, INK.magenta, INK.gold, INK.cyan];
  const beams = spectrum
    .map((c, i) => {
      const angle = -22 + i * 5.5;
      const y = h * (0.34 + i * 0.055);
      return (
        '<g transform="rotate(' +
        angle +
        ' ' +
        w * 0.5 +
        ' ' +
        y +
        ')">' +
        '<rect x="' +
        -w * 0.1 +
        '" y="' +
        y.toFixed(1) +
        '" width="' +
        w * 1.2 +
        '" height="' +
        (h * 0.035).toFixed(1) +
        '" fill="' +
        c +
        '" opacity="0.5"/></g>'
      );
    })
    .join('');
  const edge =
    '<g transform="rotate(-30 ' +
    w * 0.34 +
    ' ' +
    h * 0.5 +
    ')"><rect x="' +
    w * 0.33 +
    '" y="' +
    -h * 0.2 +
    '" width="1.6" height="' +
    h * 1.4 +
    '" fill="rgba(255,255,255,0.5)"/></g>';
  const dust = Array.from({ length: 60 }, () => {
    return (
      '<circle cx="' +
      (rnd() * w).toFixed(1) +
      '" cy="' +
      (rnd() * h).toFixed(1) +
      '" r="' +
      (rnd() * 1.3 + 0.3).toFixed(2) +
      '" fill="rgba(255,255,255,' +
      (0.08 + rnd() * 0.26).toFixed(2) +
      ')"/>'
    );
  }).join('');
  return {
    base: INK.bg,
    field: [
      { color: INK.gold, x: 0.2, y: 0.32, rx: 0.34, ry: 0.4, o: 0.42 },
      { color: INK.violet, x: 0.78, y: 0.66, rx: 0.34, ry: 0.4, o: 0.34 },
    ],
    blur: 84,
    overlay: svg(w, h, beams + edge + dust),
    beamBlur: 26,
  };
}

const LANGUAGES = { nebula, lattice, strata, pulse, frames, prism };

/* ---------------------------------------------------------------- */
/*  Plate renderer                                                  */
/* ---------------------------------------------------------------- */

async function renderPlate({ id, style, w, h, seed }) {
  const spec = LANGUAGES[style](w, h, seed);

  // Underpainting: colour field, blurred until it has no edges left.
  const field = await sharp(blobs(w, h, spec.field)).blur(spec.blur).png().toBuffer();

  // Geometry. The prism language wants its beams soft; the rest stay crisp.
  let overlay = sharp(spec.overlay);
  if (spec.beamBlur) overlay = overlay.blur(spec.beamBlur);
  const overlayBuf = await overlay.png().toBuffer();

  const vignette = svg(
    w,
    h,
    '<defs><radialGradient id="v" cx="50%" cy="46%" r="72%">' +
      '<stop offset="45%" stop-color="#000" stop-opacity="0"/>' +
      '<stop offset="100%" stop-color="#000" stop-opacity="0.72"/>' +
      '</radialGradient></defs><rect width="' +
      w +
      '" height="' +
      h +
      '" fill="url(#v)"/>',
  );

  const buf = await sharp({
    create: { width: w, height: h, channels: 4, background: spec.base },
  })
    .composite([
      { input: field, blend: 'screen' },
      { input: overlayBuf, blend: 'screen' },
      { input: await grain(w, h, seed + 7, 22), blend: 'overlay' },
      { input: vignette, blend: 'over' },
    ])
    .webp({ quality: 84, effort: 6 })
    .toBuffer();

  await writeFile(path.join(PLATES, id + '.webp'), buf);
  return { file: '/images/plates/' + id + '.webp', width: w, height: h, buf };
}

/* ---------------------------------------------------------------- */
/*  Plate manifest                                                  */
/* ---------------------------------------------------------------- */

const W = 1920;
const H = 1080;

const PLATE_SPECS = [
  { id: 'home-prism', style: 'prism', w: W, h: H, seed: 1101 },
  { id: 'home-lattice', style: 'lattice', w: W, h: H, seed: 1102 },
  { id: 'ai-nebula', style: 'nebula', w: W, h: H, seed: 2201 },
  { id: 'ai-pulse', style: 'pulse', w: W, h: H, seed: 2202 },
  { id: 'ai-prism', style: 'prism', w: W, h: H, seed: 2203 },
  { id: 'ai-core', style: 'nebula', w: 1440, h: 1440, seed: 2204 },
  { id: 'dev-lattice', style: 'lattice', w: W, h: H, seed: 3301 },
  { id: 'dev-strata', style: 'strata', w: W, h: H, seed: 3302 },
  { id: 'dev-square', style: 'lattice', w: 1440, h: 1440, seed: 3303 },
  { id: 'marketing-strata', style: 'strata', w: W, h: H, seed: 4401 },
  { id: 'marketing-pulse', style: 'pulse', w: W, h: H, seed: 4402 },
  { id: 'social-pulse', style: 'pulse', w: W, h: H, seed: 5501 },
  { id: 'social-square', style: 'pulse', w: 1440, h: 1440, seed: 5502 },
  { id: 'video-frames', style: 'frames', w: W, h: H, seed: 6601 },
  { id: 'video-square', style: 'frames', w: 1440, h: 1440, seed: 6602 },
  { id: 'about-prism', style: 'prism', w: W, h: H, seed: 7701 },
  { id: 'work-strata', style: 'strata', w: W, h: H, seed: 8801 },
  { id: 'contact-nebula', style: 'nebula', w: W, h: H, seed: 9901 },
];

/* ---------------------------------------------------------------- */
/*  Client photography                                              */
/* ---------------------------------------------------------------- */

/**
 * Source images carry burnt-in logotype. `safe` marks the region of the frame
 * that is free of it, so derived crops never cut through a wordmark.
 *   x:    horizontal anchor for the crop centre (0 = left edge, 1 = right)
 *   yTop: fraction of the frame height that is clean, measured from the top
 */
const PHOTO_SOURCES = [
  { slug: 'livinglines', safe: { x: 0.74, yTop: 0.74 } },
  { slug: 'bandhan', safe: { x: 0.5, yTop: 1 } },
  { slug: 'omsribalaji', safe: { x: 0.86, yTop: 1 } },
];

const PHOTO_VARIANTS = [
  { name: 'plate', ratio: 21 / 9 },
  { name: 'card', ratio: 16 / 9 },
  { name: 'portrait', ratio: 4 / 5 },
  { name: 'square', ratio: 1 },
];

function cropRect(sw, sh, ratio, safe) {
  const cleanH = Math.round(sh * safe.yTop);
  let cw = sw;
  let ch = Math.round(cw / ratio);
  if (ch > cleanH) {
    ch = cleanH;
    cw = Math.round(ch * ratio);
  }
  const left = Math.max(0, Math.min(sw - cw, Math.round(safe.x * sw - cw / 2)));
  const top = Math.max(0, Math.min(cleanH - ch, Math.round((cleanH - ch) * 0.35)));
  return { left, top, width: cw, height: ch };
}

/** The three surfaces grade photography differently, so the same source reads
 *  as gold on /work, spectrum-cool on /ai and flat monochrome on /marketing. */
const GRADES = {
  // A wash, not a tint: sharp's .tint() desaturates first and turns a
  // photograph into a duotone. A soft-light colour layer keeps the original
  // colour and only bends the temperature.
  lux: { wash: '#ffb86b', washAlpha: 0.16, sat: 1.06, brightness: 1.02 },
  ai: { wash: '#6b8cff', washAlpha: 0.2, sat: 1.08, brightness: 0.97 },
  noir: { wash: null, washAlpha: 0, sat: 0, brightness: 1.06 },
};

async function renderPhoto(slug, variant, grade) {
  const src = path.join(WORK, slug + '.webp');
  const meta = await sharp(src).metadata();
  const source = PHOTO_SOURCES.find((s) => s.slug === slug);
  const rect = cropRect(meta.width, meta.height, variant.ratio, source.safe);
  const g = GRADES[grade];

  const width = Math.min(1600, rect.width * 2);
  let pipe = sharp(src)
    .extract(rect)
    .resize(width, null)
    .modulate({ saturation: g.sat, brightness: g.brightness });

  if (g.wash) {
    const graded = await pipe.png().toBuffer();
    const size = await sharp(graded).metadata();
    pipe = sharp(graded).composite([
      {
        input: svg(
          size.width,
          size.height,
          '<rect width="' +
            size.width +
            '" height="' +
            size.height +
            '" fill="' +
            g.wash +
            '" fill-opacity="' +
            g.washAlpha +
            '"/>',
        ),
        blend: 'soft-light',
      },
    ]);
  }

  const id = grade === 'lux' ? slug + '-' + variant.name : slug + '-' + variant.name + '-' + grade;
  const buf = await pipe.webp({ quality: 82, effort: 6 }).toBuffer();
  await writeFile(path.join(WORK, id + '.webp'), buf);
  const out = await sharp(buf).metadata();
  return { id, file: '/images/work/' + id + '.webp', width: out.width, height: out.height, buf };
}

/* ---------------------------------------------------------------- */
/*  LQIP                                                            */
/* ---------------------------------------------------------------- */

async function lqip(buf) {
  const small = await sharp(buf)
    .resize(20, 20, { fit: 'inside' })
    .webp({ quality: 24, alphaQuality: 40 })
    .toBuffer();
  return 'data:image/webp;base64,' + small.toString('base64');
}

/* ---------------------------------------------------------------- */
/*  Run                                                             */
/* ---------------------------------------------------------------- */

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(PLATES, { recursive: true });
  await mkdir(WORK, { recursive: true });

  const entries = {};
  const t0 = Date.now();

  for (const spec of PLATE_SPECS) {
    const r = await renderPlate(spec);
    entries[spec.id] = { src: r.file, width: r.width, height: r.height, blur: await lqip(r.buf) };
    process.stdout.write('  plate  ' + spec.id + '\n');
  }

  for (const source of PHOTO_SOURCES) {
    const src = path.join(WORK, source.slug + '.webp');
    if (!(await exists(src))) {
      process.stdout.write('  skip   ' + source.slug + ' (source missing)\n');
      continue;
    }
    // The untouched source is kept as its own entry so a page can still show
    // the client's own framing, logotype and all.
    const raw = await readFile(src);
    const rawMeta = await sharp(raw).metadata();
    entries[source.slug] = {
      src: '/images/work/' + source.slug + '.webp',
      width: rawMeta.width,
      height: rawMeta.height,
      blur: await lqip(raw),
    };
    for (const variant of PHOTO_VARIANTS) {
      for (const grade of Object.keys(GRADES)) {
        const r = await renderPhoto(source.slug, variant, grade);
        entries[r.id] = { src: r.file, width: r.width, height: r.height, blur: await lqip(r.buf) };
      }
    }
    process.stdout.write(
      '  photo  ' + source.slug + ' (' + PHOTO_VARIANTS.length * 3 + ' derivatives)\n',
    );
  }

  // The portrait is authored, not generated — it still needs an LQIP.
  const portrait = path.join(PUBLIC, 'images/gnana.webp');
  if (await exists(portrait)) {
    const buf = await readFile(portrait);
    const meta = await sharp(buf).metadata();
    entries.portrait = {
      src: '/images/gnana.webp',
      width: meta.width,
      height: meta.height,
      blur: await lqip(buf),
    };
  }

  const body = [
    '/**',
    ' * GENERATED FILE — do not edit by hand.',
    ' * Produced by scripts/generate-assets.mjs. Run `npm run assets` after',
    ' * changing a plate definition or dropping a new source photo into',
    ' * public/images/work.',
    ' */',
    '',
    'export type MediaAsset = {',
    '  src: string;',
    '  width: number;',
    '  height: number;',
    '  /** 20px WebP data URI, used as the blur placeholder. */',
    '  blur: string;',
    '};',
    '',
    'export const media = ' +
      JSON.stringify(entries, null, 2) +
      ' as const satisfies Record<string, MediaAsset>;',
    '',
    'export type MediaKey = keyof typeof media;',
    '',
    '/** Looks an asset up by key, falling back to the portrait so a bad key can',
    ' *  never render an empty box in production. */',
    'export function asset(key: MediaKey | (string & {})): MediaAsset {',
    '  return (media as Record<string, MediaAsset>)[key] ?? media.portrait;',
    '}',
    '',
  ].join('\n');

  await writeFile(path.join(root, 'data/media.ts'), body);
  process.stdout.write(
    '\n  ' +
      Object.keys(entries).length +
      ' assets in ' +
      ((Date.now() - t0) / 1000).toFixed(1) +
      's\n',
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
