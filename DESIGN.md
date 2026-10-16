# Design system: Swarm Builder Guide

Extracted from the final source (`src/styles.css`, `src/components/*.tsx`, `src/content/*.ts`, `index.html`) after the last correction. Rendered facts below were confirmed in Chromium through the taste probe and the interaction suite recorded in `artifacts/validation.md`; WebKit could not launch on the revision machine, so WebKit facts from the first round are not re-confirmed.

Revision 2 changes only the brief output link's visible label to **Open a job** (`src/components/BriefBuilder.tsx:164`), matching Resources. The existing colors, typography, spacing, components and breakpoints below remain in use. The current scoped checks are recorded in `artifacts/validation.md`; earlier broad observations below are retained from revision 1 and are not claims of a new full audit.

## Overview

The audience is Identity.md holders who want to brief the agent swarm. The character is warm, plain and encouraging: a cream page, near-black text, one burnt-orange accent used for the single primary action and small marks, and hand-drawn-looking SVG illustrations in the same four colours. The one piece of photographic media is the real swarm-produced film in Examples, shown in a plain 16:9 player with its own poster frame. Hierarchy comes from a six-step type scale and three weights, not from boxes. Surfaces are white cards with a 1px border on the cream page; alternating sections use a soft peach background to separate groups without lines.

System-wide rules: one page, hash navigation, every section a `.section` inside a `.container`, every card a `.card` or `.example`, one filled accent button per group of actions. One-page arrangements that are not rules: the hero's two-column split, the three-card intro grid and the alternating media side in the examples list.

## Colors

Defined once in `src/styles.css` `:root`. Primitives are named by hue; components use only the semantic tier.

| Role token | Value (primitive) | Used for |
| --- | --- | --- |
| `--color-bg` | `#fff8f0` (`--cream-50`) | Page background, header background (at 92% over blur) |
| `--color-surface` | `#ffffff` (`--white`) | Cards, inputs, tabs, secondary buttons, phase strip |
| `--color-surface-alt` | `#ffefe3` (`--cream-100`) | Alternate sections, tip box, checked checklist row, brief text panel, game cells, stats |
| `--color-surface-tint` | `#ffd9c7` (`--cream-200`) | Diagram background, illustration fills |
| `--color-border` | `#e8ddd2` (`--cream-300`) | Card, input, tab and section borders, progress track |
| `--color-text` | `#1b1b1f` (`--ink-900`) | Headings, body, selected tab background, brand mark, video player letterbox |
| `--color-text-secondary` | `#57515c` (`--ink-600`) | Ledes, card bodies, hints, captions, footer |
| `--color-accent` | `#c4400c` (`--orange-600`) | Primary button fill, headline highlight word, phase numbers, icons, progress fill, active game cell |
| `--color-accent-hover` | `#b0380a` (`--orange-700`) | Primary button hover, inline error text, link hover |
| `--color-on-accent` | `#ffffff` | Text on the accent fill |
| `--color-success` | `#1e7a46` (`--green-700`) | Copy-status text (always with text, never colour alone) |
| `--color-focus` | `#1d4ed8` (`--blue-700`) | Focus ring, distinct from the accent |

Measured WCAG 2 contrast of the declared pairs (`test/scratch/contrast.mjs`, not shipped): text on bg 16.3:1, secondary on bg 7.28:1, secondary on surface-alt 6.84:1, secondary on tint 5.85:1, white on accent 5.14:1, accent on bg 4.88:1, accent on surface-alt 4.58:1, accent-hover on surface 5.69:1, success on surface 5.35:1, bg on text 16.3:1. The probe measured every rendered text pair at 4.5:1 or better. There is no dark theme and no status ramp beyond `--color-success`.

Illustrations (`Hero.tsx`, `Examples.tsx` diagram, `public/favicon.svg`, `public/og.png`) hard-code the same four values (`#1b1b1f`, `#c4400c`, `#fff8f0`, `#ffd9c7`) because SVG attributes cannot read custom properties reliably; keep them in step with the tokens. The video poster (`public/media/wasteland-poster.jpg`) is a frame of the film itself and is not recoloured.

## Typography

One family, the system stack `--font-sans`: Inter if installed, then Segoe UI, system-ui, -apple-system, Roboto, Helvetica Neue, Arial. No font files are shipped; the loaded face is whatever the system provides. Root has `-webkit-font-smoothing: antialiased`.

Six sizes, all in `:root`:

| Token | Size | Role |
| --- | --- | --- |
| `--text-sm` | 14px | Hints, captions, errors, stats, small buttons, footer, checklist detail, phase strip labels |
| `--text-base` | 16px | Body, inputs, buttons, nav |
| `--text-lg` | 18px | Section ledes, hero lede, `h4` |
| `--text-xl` | 22px | `h3` (card and example titles, phase heading) |
| `--text-2xl` | 28px | `h2` section titles |
| `--text-display` | `clamp(2.25rem, 1.5rem + 3.2vw, 3.5rem)` (36px at 390, 56px at 1440) | `h1` only |

Weights: 400 body, 600 for buttons, labels, tabs, `strong` and checklist titles, 800 for headings and the brand. `strong` and `b` are set to 600 so default bold never introduces a fourth weight. Line heights: `--leading-tight` 1.1 on headings, `--leading-body` 1.55 on everything else. Letter-spacing: -0.02em on `h1`, -0.01em on `h2`, natural elsewhere. Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`. Prose measure is capped by `--measure: 62ch` via `.section-head`, `.prose` and `.hero-copy` (36rem). Changing numbers (progress count, game stats, frame count) use `font-variant-numeric: tabular-nums`. Inputs are 16px so iOS does not zoom.

## Layout

Spacing scale on a 4px base: `--space-1` 4px through `--space-8` 64px (4, 8, 12, 16, 24, 32, 48, 64). Intra-group gaps use 8 to 12px, inter-group 16px and up, sections 48px of block padding.

`.container` caps content at `--content-max` 72rem with `--gutter` 16px, growing to 32px at 48rem. The sticky header is `--header-height` 3.5rem; `html { scroll-padding-top }` offsets anchored sections by the header plus 16px (there is no per-section scroll margin).

Grids: `.grid-2` becomes two columns at 40rem, `.grid-3` three columns at 56rem; `.resource-list` two columns at 40rem; `.phase-strip` is always four columns. The guide's `.progress` row is a wrapping flex row: the bar keeps at least 6rem and the Reset button drops to a second line when the count, bar and button no longer fit (at 320 in wide fallback fonts). Two-pane layouts (`.hero-inner`, `.tab-panel`, `.brief-layout`, `.example`) stack on one column and split at 56rem; `.example-reverse` swaps the media side. The hero illustration is hidden below 56rem so the first screen at 390 holds the headline, lede, both actions and the phase strip. The mobile nav is an absolutely positioned panel under the header below 48rem, toggled by `.nav-toggle`; above that width it is an inline row and the toggle is hidden. Breakpoints are in rem and were chosen where the content stops fitting, not from device presets.

Verified in the browser: no horizontal scroll at 320, 390 and 1440; no text overlap; first screen content at 390; the video player fills the media column at 390 (308px wide, 16:9) and sits beside the copy at 1440. Not checked: widths between 600 and 1400 other than at the breakpoints, native 200% zoom, RTL.

Revision 2 additionally checked the brief builder's initial, invalid, composed, copy-status and cleared states at 320, 390, 768 and 1440 wide. At 320, the form and result remain 288px wide with 16px margins; the shorter link retains `.button.button-secondary`, its 44px target height, `white-space: nowrap` and the existing explorer destination. The fix does not clip or hide overflow. At 390 the result actions fit side by side; at 320 they wrap onto separate rows. The 390px first screen still shows the product, both actions and the four-phase strip.

## Elevation and depth

Flat. There are no box shadows. Depth is tonal: cream page, white cards, peach alternate sections, peach-tint illustration panels. Structure borders are 1px `--color-border`. Illustration and media panels (`.diagram`, `.video-player`) carry a 1px `rgb(0 0 0 / 0.1)` inset outline as an image edge; the player's outline is replaced by the 3px focus ring under `:focus-visible`. The header floats over content with a 92% background and an 8px backdrop blur. Nothing stacks above the header except the skip link (z-index 100) and the open mobile nav, which is part of the header.

## Shapes

| Token | Value | Where |
| --- | --- | --- |
| `--radius-sm` | 8px | Inputs, nav links, toggle, game cells, skip link |
| `--radius-md` | 14px | Checklist rows, tip box, phase strip, brief text panel, video player, diagram, resource rows |
| `--radius-lg` | 20px | Cards, examples, brief output |
| `--radius-pill` | 999px | Buttons, tabs, stats, progress bar |

Outer radius equals inner radius plus padding where elements nest (card 20px around a 14px panel with 24px padding is the closest existing pair; keep new nesting concentric).

## Components

All in `src/components/`. None is a library export; each is a page-level pattern using the classes in `src/styles.css`.

- **Button** (`.button` with `.button-primary`, `.button-secondary`, `.button-small`): pill, 44px minimum height, 600 weight, named transitions on background, colour, border and `scale`, `scale(0.96)` on press, `opacity: 0.55` when disabled. Primary is the only filled accent in its action group; peers are secondary (white, bordered). Used as `<a>` for navigation and `<button>` for actions.
- **Header** (`Header.tsx`): brand mark plus name at the leading edge, nav at the trailing edge. Mobile toggle has `aria-expanded` and `aria-controls`, closes on link choice and Escape and returns focus to the toggle.
- **Section head** (`.section-head`): `h2` plus one lede paragraph, measure-capped. Every section starts with one.
- **Card** (`.card`): white, bordered, 20px radius, 24px padding, optional `.card-icon` (40px, accent, 2px stroke). Used by Intro and Tips.
- **Phase strip** (`.phase-strip` in `Hero.tsx`): four bordered links with an accent number, deep-linking to `#phase-<id>`.
- **Tabs** (`Guide.tsx`, `.tabs`/`.tab`): `role="tablist"` with roving tabindex, ArrowLeft/Right/Home/End, selected tab inverted (ink background). Hash `#phase-build` selects a tab on load and on `hashchange`.
- **Progress** (`.progress`): polite count, `role="progressbar"`, accent fill, Reset button disabled at zero.
- **Checklist** (`.checklist`): native checkboxes inside full-row labels; checked rows tint and strike the title. State persists through `useLocalStorage` under `imd-guide-progress-v1`.
- **Form field** (`.field`): visible label, optional hint, 44px input, `aria-invalid` and `aria-describedby` to the inline error, validation on submit with focus to the first error. Submit stays enabled.
- **Brief output** (`.brief-output`): empty state with a bold first line and a next step; filled state shows the brief in `.brief-text` (pre-wrap, body font), Copy and an explorer link, and a `role="status"` line. Its `h3` has `tabIndex={-1}`: a successful Compose commits the brief with `flushSync`, scrolls the heading to the top of the viewport (the root `scroll-padding-top` keeps it clear of the sticky header) and focuses it, so the result and Copy brief are in view from the bottom of the form at every width. A failed submit focuses the first invalid field instead.
- **Example** (`.example`): bordered two-pane article with `.example-media` and `.example-copy`; `.kind` is a plain secondary line under the title, not a kicker.
- **Video player** (`SwarmVideo` in `Examples.tsx`; `.video-figure`, `.video-player`, `.video-caption`): a native `<video controls preload="metadata" playsinline>` whose `src` is the published artifact URL in `src/content/examples.ts` and whose poster is the local `public/media/wasteland-poster.jpg`. The box is held at 16:9 by `aspect-ratio` before anything loads, fills its column, and uses `--color-text` as letterbox. `aria-describedby` points at the description paragraph, which is the text alternative for a film with no words. The figcaption carries the format line and a `role="status"` span that fills in if the stream fails (`onError`). Never autoplays, never loops. Provenance links reuse `.button-small` (one primary, one secondary).
- **Swarm Catch** (`SwarmCatch.tsx`): nine `button.cell` in a `role="group"`, active cell marked by `data-active`, accent border and a cross-faded icon (opacity, scale 0.25 to 1, blur 4px to 0). Stats in `.stat` pills; one primary Start/Play again or a secondary End round; `role="status"` result. Best score persists under `imd-swarm-catch-best-v1`.
- **Resource list** (`.resource-list`): bordered rows with a 600-weight link and a secondary description.

Focus: every control uses the global `:focus-visible` 3px `--color-focus` ring with 2px offset; checklist rows show the ring on the label via `:has(input:focus-visible)`.

## Motion

Only named properties transition (`background-color`, `color`, `border-color`, `scale`, `width`, `opacity`, `filter`), 150ms for state changes and 220ms for the progress fill and cell icon, easing `cubic-bezier(0.2, 0, 0, 1)`. Smooth scrolling is opt-in under `prefers-reduced-motion: no-preference`; the brief builder's scroll to its output follows the same preference through `useReducedMotion` (`smooth` or `auto`). Under `reduce`, all transitions collapse to 0.01ms. Nothing loops, and the video plays only when the visitor presses play.

## Do's and don'ts

- Start a new section with `.section` (add `.section-alt` to alternate) containing a `.container` and a `.section-head`.
- Use one `.button-primary` per action group; every other action is `.button-secondary`.
- Put copy in `src/content/` and keep it in sentence case with no em dashes, emoji or labels above headings.
- Use a semantic colour token, never a primitive, in components; add a role token if one is missing.
- Keep to the six type sizes and three weights; use `--text-sm` for secondary lines, not a new size.
- Do not put a bordered or filled panel inside a `.card` or `.example`; tint the children (as the game cells do) instead.
- Do not add shadows; the system is flat.
- Do not add a dark theme, a second accent or a font file without updating this document.
- Keep large media out of the export: point `src/content/` at a published artifact URL and ship only a poster frame under `public/media/`, as the video example does.

Recipe for one more page section: copy `Tips.tsx`, swap the content file, keep `.grid .grid-2 .grid-3`, add the section to `App.tsx` and a link to `links` in `Header.tsx`.
