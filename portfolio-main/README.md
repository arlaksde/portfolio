# Arya Laksmana Dewanata — Portfolio

Plain HTML/CSS/JS — no build step, no npm, no framework. Drop it in a repo,
turn on GitHub Pages, done.

## What changed from the previous version

- **New visual system**: dark "schematic / datasheet" theme — cyan/blue
  signal traces on a near-black background, `Space Grotesk` for display
  type, `JetBrains Mono` for anything that reads like a spec or file path.
- **React Bits-inspired motion**, ported to vanilla JS so no build tool is
  required:
  - `js/background.js` — an animated circuit-trace background, rendered with
    **OGL** (WebGL), loaded from a CDN as an ES module. This is a direct
    port of React Bits' *Threads* component.
  - GSAP's **SplitText** plugin animates the hero name in, character by
    character (loaded from a CDN as classic `<script>` tags).
  - Everything else React Bits-flavored — the mouse-tracked glow on cards
    (*SpotlightCard*), the 3D hover tilt on the profile photo
    (*TiltedCard*), the magnifying bottom nav (*Dock*), the diagonal hover
    sheen on buttons (*GlareHover*), the animated stat counters (*CountUp*),
    and the scroll-in reveals (*AnimatedContent*) — is hand-written in
    `js/effects.js` + CSS. These don't need a runtime library once there's
    no React tree to hook into; a few lines of `mousemove`/`IntersectionObserver`
    do the same job.
- **Single bottom Dock nav** replaces the old sidebar + separate mobile bar.
  It already degrades fine on touch (the magnify effect just never
  triggers), so one component covers every breakpoint.
- **Section eyebrows** (`$ cat data/profile.json`, etc.) literally name the
  JSON file rendering that section — the site really is driven by those five
  files, so this isn't decorative, it's an accurate readout.
- **Fixed a couple of small bugs** in the data: the LinkedIn URL in
  `data/profile.json` had stray Markdown link syntax pasted into it
  (`[text](url)`); and `index.html`'s favicon link used an absolute
  `/images/favicon.ico` path, which 404s once you're hosted at
  `username.github.io/repo-name/` instead of a domain root. Both are fixed
  here — everything now uses relative paths, so it'll work from a domain
  root *or* a GitHub Pages project subpath without any config.

## Structure

```
index.html
css/style.css        all design tokens + component styles
js/script.js         fetches the 5 JSON files, renders every section
js/effects.js        spotlight / tilt / dock / count-up / scroll-reveal
js/background.js     OGL circuit-trace background
data/profile.json
data/education.json
data/experience.json
data/projects.json
data/certificates.json
images/               ← you need to copy your existing images folder here
```

## You still need to add: `images/`

I don't have your actual image files (profile photo, project photos,
school/company logos, `favicon.ico`). The JSON already points at the same
filenames your old site used (`images/AryaLaksmanaDewanata_JasAlmet1.png`,
`images/polines-logo.png`, etc.) — just copy your existing `images/` folder
from the old repo into this project's root and everything will line up.
Anything still missing falls back to an auto-generated initial-avatar, so
nothing will break, just look a little plain.

## Preview locally

No build step, but `fetch()` for the JSON files needs a real server (not
`file://`). Any static server works, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open the printed URL.

## Deploy to GitHub Pages

1. Push this folder's contents to the root of your repo (or a `docs/`
   folder, or a `gh-pages` branch — your choice).
2. Repo → **Settings → Pages** → set **Source** to that
   branch/folder.
3. Done — no Actions workflow, no build step required.

## Editing your content later

Everything you'd want to update — projects, experience, certificates, the
profile blurb, skill list — lives in `data/*.json`. Edit those, refresh the
page, no rebuild needed.
