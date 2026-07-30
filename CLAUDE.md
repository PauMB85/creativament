# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing site for Creativament (psychology / creativity / talent services), built with **Astro 7.1.6**, static output, no framework integrations, no tests. Requires Node >= 22.12. Lives at `github.com/PauMB85/creativament`; every push to `main` auto-deploys the preview to GitHub Pages.

```bash
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run preview   # serve dist/
npm run check     # astro check (TS + template diagnostics)
```

Two companion docs in [docs/](docs/), both written in Catalan for the team: [design-system.md](docs/design-system.md) (palette, type, spacing, component specs, tone, known debt) and [handoff.md](docs/handoff.md) (architecture, data contracts, open decisions). Keep them in sync when changing tokens or component specs.

## Architecture

One page ([src/pages/index.astro](src/pages/index.astro)) that only composes section components. [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) owns `<head>`, the Google Fonts links, `Header`, `Footer`, the skip link, and the global demo-form script.

**Styles are split deliberately.** [src/styles/global.css](src/styles/global.css) holds the full color palette (`:root`), base/reset rules, and cross-section utilities: `.container`, `.narrow`, `.center`, `.section`, `.section h2`, `.section-heading p`, `.eyebrow`, `.btn*`, `.skip-link`, `.sr-only`. Everything else lives in the `<style>` block of the component that owns it, using Astro's scoped styles — including that component's `@media` overrides. Two breakpoints only: `1050px` and `650px`. When adding a section, put its CSS in the component, not in `global.css`; only add to `global.css` if two or more components genuinely share it.

Because styles are scoped, a selector only matches elements in the same component. `.section h2` works from `global.css` (unscoped) but a rule written in a child component cannot style a parent's markup.

**Content lives in `src/data/`, not in markup.** [src/data/site.ts](src/data/site.ts) holds `navLinks`, `values`, `audiences`; [src/data/activities.ts](src/data/activities.ts) holds `activityFilters`, `activities`, `currentMonth`. Edit copy there rather than in the components. The `Activity` type constrains `category` and `blob` to the known unions, so an invalid value fails `npm run check`.

## Conventions that are not obvious

**Content is Catalan.** `lang="ca"`, all copy in Catalan, and section `id`s are Catalan slugs (`#inici`, `#qui-som`, `#acompanyem`, `#metode`, `#calendari`, `#setmanal`, `#contacte`, `#families`). Nav entries in `navLinks` must match a real section `id`. Two known gaps carried over from the prototype: `#que-fem` is in the nav with no section behind it, and `#families` is an `id` on a resource card rather than a section.

**Calendar filter contract.** The script in [src/components/Calendar.astro](src/components/Calendar.astro) matches `.chip[data-filter]` against `.event-card[data-category]` by exact string and toggles `.hidden`; `all` is special-cased. Both sides are generated from `activityFilters` / `activities`, so keeping the union type honest is what keeps them in sync.

**All colors are tokens.** `:root` in `global.css` is the single source of truth; no component may write a color literal (`grep -rnE '#[0-9a-f]{3,8}|rgba?\(' src | grep -v global.css | grep -v 'rgb(var('` must come back empty — the last filter spares the documented channel pattern). Tokens are grouped: brand, text, surfaces, lines, pastels (`--pastel-*` for value icons, `--blob-*` for activity blobs), effects. `--yellow` and `--purple` are declared but unused — brand colors kept pending confirmation, not dead code to delete on sight.

Colors that need transparency are stored as **channel lists** (`--cream-rgb: 255 253 249`) and consumed as `rgb(var(--cream-rgb) / 0.93)`; the solid token is derived from the channels (`--cream: rgb(var(--cream-rgb))`) so there is still one definition. Do not switch these to relative color syntax (`rgb(from var(--x) r g b / a)`) — it renders a measurably different result inside the hero's radial gradient.

**The pink is split by contrast, not by taste.** `--pink` (#ef3d86) is only 3.70:1 on white, so it is reserved for decoration, underlines, icons and text at 18px or larger. Small text — and any fill carrying small text: primary button, active chip, selected day, eyebrow, CTA links — uses `--pink-dark`; `--pink-darker` is their hover. Swapping one for the other silently breaks WCAG AA.

The class names on the decorative shapes stay fixed: event blobs are `blue` / `sky` / `yellow` / `blush` / `coral` / `pink` / `mint` / `cream` (`Calendar.astro`), value icons are `green` / `peach` / `pink` / `lilac` (`Values.astro`). Both `pink` classes resolve to `--pastel-pink`.

**Everything is still demo data.** The month grid is generated from `currentMonth` (label, leading blanks, selected day) with no date logic; the prev/next month buttons do nothing. Forms carry `data-demo-form`, and the script in `BaseLayout.astro` intercepts their submit with an alert saying the demo does not send data — remove that attribute (and the listener) when wiring real submissions.

**Icons are Phosphor SVGs in [src/icons/](src/icons/), imported as components** (`import Envelope from '../icons/envelope.svg'`) using Astro 7's native SVG support — inlined at build, no dependency, no extra request. Files carry no `width`/`height`/`fill`; the consuming component sets size and `fill: currentColor` so they inherit the palette. UI icons use Phosphor *regular*; activity and resource icons use *duotone*. Do not mix icon sets or introduce an icon library.

Activity icons live inside the organic blob and take their color from it: each blob class sets both `background` and `color`, and the SVG uses `fill: currentColor`, so `--blob-*-deep` tokens exist purely as icon colors — never as backgrounds or text. Adding an activity icon touches three places: the SVG in `src/icons/`, the `ActivityIcon` union in `activities.ts`, and the `icons` map in `Calendar.astro` (the `Record<ActivityIcon, …>` type makes a missing entry a compile error).

The abstract glyphs in `Values.astro` (`⌁ ◎ ♡ ⌒`) and the `♡` in the header button are deliberately still Unicode — a pending design decision, not leftover emoji to "upgrade".

**Legal pages.** `/avis-legal/`, `/politica-de-privacitat/`, `/politica-de-cookies/` share [LegalLayout.astro](src/layouts/LegalLayout.astro). Every identifying detail comes from [src/data/legal.ts](src/data/legal.ts) — never hard-code a name, NIF or address into the prose. Unfilled fields render as a pink `[PENDENT: …]` via [LegalValue.astro](src/components/LegalValue.astro), deliberately visible so nothing ships blank. The privacy page branches on `dataProcessing.formsActive`: flip it when the forms actually submit, and fill `processors` / `retention` at the same time.

**Internal links must go through `route()`**, exactly like `asset()` — the same base-path problem applies to hrefs. Header nav entries are home-page anchors, so they are prefixed with `route('')` to keep working from the legal pages.

**Images from `public/` must go through `asset()`** ([src/lib/asset.ts](src/lib/asset.ts)), never a hand-written `src="/assets/..."`. The GitHub Pages preview is served from `/creativament/`, and Astro does not rewrite absolute paths in markup — a literal path works locally and 404s on Pages. `base` is switched by the `GITHUB_PAGES=true` env var in [astro.config.mjs](astro.config.mjs), set only by the deploy workflow, so the production-domain build is unaffected. Reproduce the Pages build with `GITHUB_PAGES=true npm run build`.

**Images are plain `<img>` tags from `public/`.** Astro's `<Image>` / asset pipeline is not in use; introducing it means moving files into `src/assets/`.

## Directories that are not part of the build

- `design/` — `reference-home.png` is the approved visual mockup to compare against; not deployed.
- `prototype/` — the original hand-written HTML/CSS/JS, kept for reference. Its `assets/images` is a symlink into `public/`, so it still opens in a browser. It is excluded from `tsconfig.json` and is not built. Do not apply changes there; it is a frozen snapshot.

The migration was verified pixel-identical against the prototype at 1440 / 1000 / 600 / 375 px, so `prototype/index.html` is a usable visual baseline for regressions. Two deliberate deviations since then: (1) the prototype's three near-identical creams (`#fbf7f2` / `#fbf8f3` / `#fbf7f3`) were merged into a single `--wash: #fbf7f3`, shifting the values band, the audience section and the resources gradient by 1/255 per channel; (2) the footer social glyphs, the month prev/next arrows, and every activity/resource emoji became Phosphor SVGs.

## Accessibility baseline already in place

Skip link, `aria-expanded` synced on the mobile menu toggle, `aria-label` on nav/social/month controls, `.sr-only` labels on inputs, decorative visuals marked `aria-hidden`. Also: a global `:focus-visible` ring, a `prefers-reduced-motion` block, `aria-pressed` on the filter chips kept in sync by the script, an `aria-live` status region announcing the filtered count, and 44px touch targets on the month arrows and social icons (widened with `::before`, so the 22px gap between social icons is load-bearing — shrink it and the hit areas overlap).

Contrast is verified against WCAG AA across the text palette; check any new color before adding it. Preserve all of this when editing markup.
