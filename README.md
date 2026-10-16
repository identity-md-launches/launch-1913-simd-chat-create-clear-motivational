# Swarm Builder Guide for Identity.md

A single-page, static website that helps Identity.md holders conceive, plan, build and launch projects, companies and products with the agent swarm. It has five sections: an introduction, a four-phase step-by-step guide with a saved checklist, a brief builder, three example showcases (a video storyboard, the Identity.md company model, and a playable web game), tips, and resources.

The committed export lives in `dist/`. It uses relative asset URLs (`base: './'`) so it works from an IPFS gateway subpath or an ENS name without any server configuration. There is no backend: guide progress and the game's best score are stored in the visitor's browser only.

## Install

Requires Node 20 or newer.

```sh
npm install
```

## Preview

Development server with hot reload:

```sh
npm run dev
```

Preview the production export exactly as it will be served:

```sh
npm run build
npm run preview
```

## Rebuild

```sh
npm run typecheck   # tsc --noEmit
npm run build       # writes dist/
```

Commit `dist/` after rebuilding. The publisher serves the committed export and does not rebuild.

## Edit the content

All copy lives in `src/content/`:

| File | Controls |
| --- | --- |
| `src/content/guide.ts` | The four phases, their summaries, tips and checklist items |
| `src/content/examples.ts` | The three showcases. Set `videoExample.videoEmbedUrl` to an embed URL (for example a YouTube `/embed/` link) to replace the storyboard with a real swarm-produced video |
| `src/content/tips.ts` | The six tips |
| `src/content/resources.ts` | The resource links |

Design tokens are in `src/styles.css` and documented in `DESIGN.md`.

## Validation results

Run on 16 October 2026 against the committed `dist/`.

| Check | Command | Result |
| --- | --- | --- |
| Typecheck | `npm run typecheck` | Passed, no errors |
| Production build | `npm run build` | Passed, 46 modules, `dist/index.html` + CSS + JS + favicon + og.png |
| Design probe (taste@1) | `IMD_PLAYWRIGHT=... node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste` | 16 of 16 checks passed at 320, 390 and 1440 wide |
| Interaction suite | `node test/scratch/interactions.mjs` (Playwright, Chromium and WebKit) | 48 of 48 checks passed |

The interaction suite serves `dist/` under a `/preview/` subpath inside one foreground command and checks, in both Chromium and WebKit: no console errors or failed resources; the headline, primary action and phase strip on the first screen at 390 wide; no horizontal overflow at 320, 390 and 1440; the mobile menu opening, navigating to a section, closing on link choice and on Escape; guide tabs by click and arrow keys; checklist progress updating, surviving a reload and resetting; the brief form rejecting an empty submit with inline errors and focus on the first invalid field, composing a brief, and reporting copy status; the storyboard stepping and playing; the game scoring accepted tasks and settling after a round; and the skip link being the first Tab stop.

The probe's earlier run found three failures, all fixed before the final build: a button within 40px above a heading (progress row moved above the tabs), a fourth font weight from default bold `strong` (now 600), and the game board reading as a card inside a card (board background removed, cells tinted instead). A duplicated scroll offset between the root `scroll-padding-top` and section `scroll-margin-top` was found by the interaction suite and removed.

Limitations: no screen-reader session, no physical device and no browser-native 200% zoom test were run. The video showcase is an illustrated storyboard, not a real swarm-produced video, until the owner supplies an embed URL. Full details, including the Better Interface review coverage and findings, are in `artifacts/validation.md`.

## Layout

```
index.html            HTML shell with title, description, favicon and Open Graph tags
src/main.tsx          React entry
src/App.tsx           Page composition
src/components/       Header, Hero, Intro, Guide, BriefBuilder, Examples, StoryboardPlayer, SwarmCatch, Tips, Resources, Footer
src/content/          All copy and links
src/hooks/            useLocalStorage, useReducedMotion
src/styles.css        Tokens and all styles
public/               favicon.svg, og.png
dist/                 Committed production export
artifacts/            validation.md
DESIGN.md             Implemented design system
```
