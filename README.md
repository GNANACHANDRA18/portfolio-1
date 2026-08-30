# Chebolu Gnanachandra — Portfolio

Multi-page personal portfolio for **Gnana Chandra** — Software Developer · CMO · AI Practitioner.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the live
domain before deploying — canonical URLs, Open Graph tags, the sitemap and
robots.txt all derive from it.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/ai` | AI & Artificial Intelligence |
| `/development` | Software Development |
| `/marketing` | Marketing & CMO |
| `/social-media` | Social Media |
| `/video-editing` | Video Editing |
| `/work` | Selected Work |
| `/work/living-lines` | Living Lines case study |
| `/work/bandhan-ceramic` | Bandhan Ceramic case study |
| `/work/om-sri-balaji` | Om Sri Balaji Electricals case study |
| `/experience` | Experience |
| `/skills` | Skills & Technologies |
| `/contact` | Contact |

Every page sets its own title, description, canonical URL and Open Graph tags
via `lib/seo.ts`.

## Updating content

Content is kept out of the UI so it can be edited without touching components.

| File | Holds |
| --- | --- |
| `data/site.ts` | Name, roles, positioning, phone, Instagram, portrait, navigation |
| `data/projects.ts` | Projects and full case-study copy |
| `data/ai.ts` | AI areas, toolkit, workflow, capability explorer |
| `data/skills.ts` | Skill matrix and technology stack |
| `data/experience.ts` | Roles and every process flow |
| `data/services.ts` | Practice areas and capability lists |
| `data/videos.ts` | Video gallery entries |

### Portrait

`public/images/gnana.webp` (576×647). Rendered by `components/PortraitCard.tsx`
inside a glass surface — frosted identity panel over the base of the frame,
status chip, pointer-tracked sheen and a subtle 3D tilt. It appears on `/`,
`/about` and `/contact`, and is also the default Open Graph share image.

Swapping the photo: replace the file, then update `portrait.width` /
`portrait.height` in `data/site.ts` to the new dimensions.

### Adding a video

The gallery on `/video-editing` renders published pieces first and shows the
remaining tiles as clearly-labelled reserved slots. Add an entry to
`videos` in `data/videos.ts`:

```ts
{
  id: 'brand-film-01',
  title: 'Brand film',
  category: 'Brand video',
  embedUrl: 'https://player.vimeo.com/video/000000',  // or: src: '/videos/file.mp4'
  poster: '/videos/poster.jpg',
}
```

### Adding a project

Add an entry to `projects` in `data/projects.ts`, then create
`app/work/<slug>/page.tsx` mirroring an existing case-study page — those pages
are thin wrappers around the shared `CaseStudy` component. Add the route to
`ROUTES` in `scripts/generate-seo.mjs` so it appears in the sitemap. Remote
image hosts must be allowed in `next.config.mjs` under `images.remotePatterns`.

## Contact form

`POST /api/contact` validates the submission (plus a honeypot field) and
forwards it to `CONTACT_WEBHOOK_URL` if that variable is set. With no webhook
configured the endpoint accepts the message and logs it server-side, so the
form works immediately but does not yet deliver anywhere — wire a webhook or an
email provider before launch.

## Note on the project path

This folder name contains an apostrophe (`gnanachandra's`). Next.js cannot
compile `app/sitemap.ts` or `app/robots.ts` from such a path — its metadata
route loader embeds the path in a single-quoted string and the build fails.

The workaround: `scripts/generate-seo.mjs` writes `public/sitemap.xml` and
`public/robots.txt` on `prebuild`. Both are served correctly and are in
`.gitignore` as generated files.

If the project is ever moved to a path without an apostrophe, the script can be
deleted, the `prebuild` script removed, and standard `app/sitemap.ts` /
`app/robots.ts` files used instead.

## Surfaces

The site runs bright end to end. `lib/theme.ts` maps a route to its palette and
`components/SurfaceShell.tsx` applies it to the whole page, so no page declares
a theme of its own:

| Route | Class | Feel |
| --- | --- | --- |
| `/ai` | `ai-light` | Cool near-white — bright AI lab |
| `/marketing` | `noir` | #050505 — dark, bold, expensive |
| everything else | `lux-light` | Warm ivory — luxury tech |

`noir` also re-declares the accent spectrum (cooler blue/violet/cyan plus warm
gold), so the shared `ai-spectrum` fill and every accent utility retune to the
dark surface without a second set of classes.

`.ai-surface` paints the background from inside `@layer base`, so utilities can
still override it. `.ai-dark` flips a band back to dark inside a bright page
(used once, for Human + AI on `/ai`).

## The global system

Shared machinery mounted once in the root layout:

| Component | What it does |
| --- | --- |
| `Loader` | Opening sequence — GNANA → full name → positioning, with a 000–100 counter. Runs once per browser session |
| `RouteIntro` | Plays a word (**AI**, **WORK**, **GNANA**) when those routes open, once per route per session |
| `AICursor` | The single custom pointer. Modes via `data-cursor="orb \| magnet \| text \| label"`, plus `data-cursor-label` to put a word in the ring |
| `AmbientBackground` | Two light fields and a fine grid that lag behind the pointer, driven by CSS variables rather than re-renders |
| `SurfaceShell` | Applies the route palette and hands the surface to the cursor |
| `MagneticButton` | The one button system — leans toward the pointer, label trails it, arrow slides, click ripples |
| `Constellation` | The Gnana System: a labelled core webbed to orbiting nodes. Reused on About (roles), Development (stack), Marketing (remit) and Skills (capabilities) |
| `ScrollSequence` | Statements handing over one at a time across a sticky section |
| `BigStatements` | Numbered full-height statements |
| `PipelineDiagram` | Horizontal pipeline with travelling packets and an explanation rail |

Every one of them honours `prefers-reduced-motion` by rendering a static state
rather than a faster animation.

## Page experiences

Each page keeps its own personality on the shared system:

| Page | Character | Signature moments |
| --- | --- | --- |
| `/` | Bright luxury-tech | Intelligence field, identity switcher, work panels with fluid image morph |
| `/ai` | Futuristic AI lab | Canvas orb, constellation, 560vh scroll transformation, agent loop |
| `/development` | Engineering studio | System stack, code→interface split, API pipeline, debug playground, device showcase |
| `/marketing` | Dark business brain | Canvas business ecosystem, 16 interactive subjects, flywheel, AI × Software × Business triangle, marquee |
| `/about` | Editorial personal story | Role constellation, scroll story, four-circle intersection, holographic profile card |
| `/work` | Agency case-study gallery | Sticky project nav, parallax panels, hover-preview index with filter |
| `/contact` | Minimal cinematic ending | Reactive options that pre-fill the form, closing statement |

## The home experience

`app/page.tsx` composes twelve sections from `components/home/`, with copy in
`data/home.ts`.

| Component | What it does |
| --- | --- |
| `HomeHero` + `IntelligenceField` | 104svh hero over a canvas particle field that repels and bends around the pointer |
| `EditorialStatement` | Technology / meets / creativity, with disciplines arriving from different directions |
| `IdentitySwitcher` | BUILD · THINK · CREATE · GROW · AUTOMATE — one active at a time |
| `AIFeature` | Teases `/ai`; the orb itself is the link |
| `SoftwareShowcase` | 340vh sticky browser window, stages activate on scroll |
| `QyverixSection` | CMO role and the pitch-to-handoff journey |
| `WorkPanels` | Names on the left, one image stage that expands, rotates and blurs between projects |
| `CreativeTrio` | Video / Social / Brand, background responds to hover |
| `WorkflowTimeline` | Scroll-drawn rail, horizontal on desktop and vertical on mobile |
| `SocialPresence` | Portrait in an Instagram-style gradient frame |
| `PhilosophySequence` | Four lines handing over one at a time across 420vh |
| `HomeFinalCTA` | Gradient field with particles behind the closing type |

The **custom cursor** is mounted once in the root layout and activates only on
the bright surfaces. Project links use `data-cursor-label="View project"` to
put a word inside the ring.

`RouteIntro` plays a word — **AI**, **WORK**, **GNANA** — when those routes are
opened, once per route per session so back-navigation stays instant.

> **Note:** don't run `npm run build` while `npm run dev` is running. Both write
> to `.next`, and the build will clobber the dev server's chunks (`Cannot find
> module './611.js'`). Stop dev first, or the fix is `rm -rf .next` and restart.

## The `/ai` experience

`/ai` is a bright island inside an otherwise dark site — its own palette,
custom pointer, entry transition and eighteen scroll-driven sections.

**Theming.** `.ai-light` in `app/globals.css` re-declares the colour tokens
(`--color-bg`, `--color-fg`, `--color-line`, …) inside a scope, so every shared
utility keeps working while the surface flips to near-white. `.ai-surface`
paints the background and lives in `@layer base` so utilities can override it —
that is how the fixed header borrows the light tokens without gaining a
background. `.ai-dark` does the reverse for the "Human + AI" band nested inside
the page. `Navbar` and `Footer` check the pathname and add `ai-light`
themselves.

**Layout.** `app/ai/layout.tsx` mounts the intro transition, the scroll
progress bar and the custom cursor around the page.

**Sections** (in `components/ai/`, content in `data/ai-page.ts`):

| Component | What it does |
| --- | --- |
| `AIHero` + `AIOrb` | 100svh hero, aurora fields, morphing keyword, canvas point-cloud orb |
| `AskTheAI` | Interactive panel of pre-written answers |
| `AIConstellation` | Eight-node layer map; vertical cards on mobile |
| `AITransformation` | Scroll-driven six-stage morph over a sticky viewport |
| `AISoftware` | Scroll-activated code window |
| `AIMarketing` | Editorial scatter that wires itself together |
| `AICreativity` | Three worlds, each with its own hover visual |
| `AutomationPlayground` | Preset workflow builder |
| `AIArchitecture` | Application diagram with travelling packets |
| `RAGPipeline` | Retrieval pipeline with per-step explanations |
| `AIAgents` | Continuously cycling agent loop |
| `AIToolOrbit` | Rotating toolkit orbit (CSS animation, pauses on hover) |
| `HumanPlusAI` | Dark band; the equation assembles on scroll |
| `AIQuality` | Failure modes with hover explanations |
| `AIProjectLab` | Empty slots — reads `data/ai-projects.ts` |
| `AIPhilosophy` | Two statements trading places on scroll |
| `AIFinalCTA` | Gradient field with reactive options |

**The orb** (`AIOrb.tsx`) is canvas 2D, not WebGL: a Fibonacci sphere of ~112
points (58 on mobile) with proximity links, rotated in software. It pauses via
`IntersectionObserver` when off-screen, squeezes and fades as the hero scrolls
away, and draws a single static frame under reduced motion.

**The cursor** (`AICursor.tsx`) mounts only on `(hover: hover) and (pointer:
fine)` devices. Elements opt into a shape with `data-cursor="orb | magnet |
text"`; links and buttons get the magnet shape automatically.

**Reduced motion** is honoured in every component — animations become static
states rather than being merely shortened, and the native cursor comes back.

### Adding an AI project

The lab is empty by design. Add an entry to `aiProjects` in
`data/ai-projects.ts` (name, problem, architecture, technologies, and optional
image/demo/GitHub/case-study links) and it renders in place of an empty slot.

## Conventions

A few rules the codebase relies on — worth knowing before editing:

- **Never hardcode `text-white` / `text-black` on a `bg-fg` surface.** Use
  `bg-fg text-bg` so the control inverts correctly on both the bright pages and
  the dark `/marketing` one.
- **Every page needs exactly one `<h1>`.** Page mastheads pass `as="h1"` to
  `SectionHead`; every other use stays an `<h2>`.
- **Colour comes from tokens only** (`bg-surface`, `text-muted`, `border-line`,
  `text-accent`, `text-ai-violet`…). A literal hex in a component will not
  follow the surface it lands on.
- **Content lives in `data/`**, never inline in a component.

## Design

Dark, near-black surface with off-white type, hairline borders, a single warm
accent (`--color-accent`), film grain and sparing glass. Tokens live at the top
of `app/globals.css`; changing `--color-accent` re-tints the whole site.

Motion is Framer Motion throughout, with route transitions in
`components/PageTransition.tsx`. Every animated component honours
`prefers-reduced-motion`.

## Accuracy

Positioning is deliberately limited to AI practitioner / AI-powered developer.
No certifications, partnerships, academic qualifications, business metrics,
employment dates or social accounts beyond those supplied are stated anywhere.
Case studies separate the Qyverix team's project from Gnana's own contribution.
