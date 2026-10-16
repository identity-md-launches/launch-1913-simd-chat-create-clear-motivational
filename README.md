# Swarm Builder Guide for Identity.md

A single-page, static website that helps Identity.md holders conceive, plan, build and launch projects, companies and products with the agent swarm. It has five sections: an introduction, a four-phase step-by-step guide with a saved checklist, a brief builder, three example showcases (a swarm-produced video, the Identity.md company model, and a playable web game), tips, and resources.

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
| `src/content/examples.ts` | The three showcases. The video example streams the published MP4 in `videoExample.videoUrl` (explorer job 5b6a4286, 26 MB, too large to commit) and shows the local poster `public/media/wasteland-poster.jpg`; to feature another film, change the URL, the facts, the links and the poster |
| `src/content/tips.ts` | The six tips |
| `src/content/resources.ts` | The resource links |

Design tokens are in `src/styles.css` and documented in `DESIGN.md`.

## Validation results

### Revision 2: composed brief at 320px

On 16 October 2026, the reported overflow reproduced in Chromium at 320×844, both with and without mobile emulation: composing the reviewer's brief increased the document width to 329px and both panels to 312.5px. The explorer link now reads **Open a job**, matching Resources. Its destination and button styles are unchanged. The rebuilt export keeps the document at 320px and both panels at 288px, between x=16 and x=304.

| Check | Result |
| --- | --- |
| Locked dependency install, typecheck and production build | `npm ci`, `npm run typecheck` and `npm run build` passed in a temporary copy of the same source and lockfile; the generated `dist/` was copied back. This avoids writing the protected repository `node_modules/` path. The initial workspace typecheck could not run the compiler. |
| Brief interaction regression | `PLAYWRIGHT_BROWSERS_PATH=/opt/imd-tools/ms-playwright node test/scratch/brief-overflow.mjs --fixed`: all six Chromium cases passed at 320, 390, 768 and 1440 wide, including both 320px emulation modes and 390px reduced motion. |
| Design probe | `IMD_PLAYWRIGHT=/opt/imd-tools/playwright-mcp/node_modules/playwright/index.mjs PLAYWRIGHT_BROWSERS_PATH=/opt/imd-tools/ms-playwright node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste --offline`: 16/16 passed. |

The regression checked initial, invalid, composed, copied, copy-denied and cleared states; exact clipboard content; focus moving to the result and then by Tab to Copy brief and Open a job; the original explorer URL and new-tab attributes; and zero horizontal overflow in every checked state. The production export was served under `/preview/`, with no script exceptions or missing local resources. Screenshots of the 320px result, 390px first screen and 1440px result were inspected. Scratch scripts and screenshots are temporary validation tools, not shipped assets.

This revision did not repeat WebKit, screen-reader, physical-device, browser-native zoom, live video playback or external-site checks. External requests were blocked during local validation. See `artifacts/validation.md` for the scoped six-domain review and `.imd-responses.json` for this finding's disposition.

### Previous round (revision 1)

Run on 16 October 2026 (revision 1) against the committed `dist/`, built after the last source change.

| Check | Command | Result |
| --- | --- | --- |
| Typecheck | `npm run typecheck` | Passed, no errors |
| Production build | `npm run build` | Passed, 46 modules, `dist/index.html` + CSS + JS + favicon + og.png + `media/wasteland-poster.jpg` |
| Design probe (taste@1) | `IMD_PLAYWRIGHT=$HOME/.imd-taste/node_modules/playwright/index.mjs node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste` | 16 of 16 checks passed at 320, 390 and 1440 wide |
| Interaction suite | `node test/scratch/interactions.mjs` (Playwright) | 74 of 74 checks passed in Chromium 156; WebKit could not launch on this machine (missing host libraries) and was skipped |

The interaction suite serves `dist/` under a `/preview/` subpath inside one foreground command and checks: the share tags and relative asset URLs in `dist/index.html`; no console errors or failed resources; the headline, primary action and phase strip on the first screen at 390 wide; no horizontal overflow at 320, 390 and 1440; the mobile menu opening, navigating to a section, closing on link choice and on Escape; guide tabs by click and arrow keys; checklist progress updating, surviving a reload and resetting; the brief form rejecting an empty submit with inline errors and focus on the first invalid field, composing a brief and bringing the output heading and Copy brief into view at 1440x900, 390x844 and under reduced motion, and reporting copy status; the video example rendering one native player with controls and the published artifact as its source, a poster that resolves at the subpath, the provenance links, metadata of 20 seconds at 1920x1080, playback advancing, a keyboard focus ring and a status line when the artifact host is unreachable; the game scoring accepted tasks and settling after a round; and the skip link being the first Tab stop.

Revision 1 answered three review findings: the storyboard stand-in was replaced by the real swarm-produced film with native controls, its caption-height bug went with it, and composing a brief now scrolls to and focuses the output heading. Rechecking found two 320-wide overflows on this machine's fallback font and fixed them: a long link label in the video example (shortened) and the guide's progress row (now wraps). The first round's probe fixes still hold: a button within 40px above a heading (progress row moved above the tabs), a fourth font weight from default bold `strong` (now 600), the game board reading as a card inside a card (board background removed, cells tinted instead), and a duplicated scroll offset between the root `scroll-padding-top` and section `scroll-margin-top` (removed).

Limitations: no WebKit run this revision, no screen-reader session, no physical device and no browser-native 200% zoom test. The video streams from the swarm artifact store (26 MB, over the submission budget), so it needs that host to be reachable; the poster, the status line and the links work without it. No caption track is shipped: the film has no on-screen words and its soundtrack was not transcribed. Full details, including the Better Interface review coverage and findings, are in `artifacts/validation.md`.

## Layout

```
index.html            HTML shell with title, description, favicon and Open Graph tags
src/main.tsx          React entry
src/App.tsx           Page composition
src/components/       Header, Hero, Intro, Guide, BriefBuilder, Examples (with the video player), SwarmCatch, Tips, Resources, Footer
src/content/          All copy and links
src/hooks/            useLocalStorage, useReducedMotion
src/styles.css        Tokens and all styles
public/               favicon.svg, og.png, media/wasteland-poster.jpg
dist/                 Committed production export
artifacts/            validation.md
DESIGN.md             Implemented design system
```
