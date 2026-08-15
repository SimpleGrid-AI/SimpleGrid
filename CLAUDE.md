# SimpleGrid site — working notes

A plain static site: HTML, CSS, JS, no build step. `main` is what is live at
https://simplegrid.ai. GitHub Pages serves it, Cloudflare sits in front.

`_config.yml` decides what actually ships — Jekyll runs, and its `exclude:`
list keeps this file, `package.json`, `node_modules/`, `scripts/` and every
`*.test.js` out of the published site. Do not add a `.nojekyll` file: it
bypasses Jekyll and silently serves the whole repo, exclude list and all.

---

## Before pushing anything under `css/` or `js/`

Run the stamp script. Every `<link>` and `<script>` in the repo carries a
`?v=YYYYMMDDHHMM`, and the whole site moves to one stamp at a time:

```
./scripts/stamp-assets.sh        # or: npm run stamp
```

Skipping this ships a change nobody can see. The file is served with a
four-hour `max-age`, and an unchanged URL gives a browser no reason to
refetch — so a returning visitor keeps running the old copy and the change
looks like it never deployed. This has already cost one round of debugging a
fix that was live and correct but never fetched.

Stamp, then commit the stamp with the change it belongs to.

The script versions CSS and JS only, not images. Replacing an image at a path
that already exists therefore keeps serving the old one — Cloudflare holds it
for four hours and browsers longer — so a swapped screenshot looks like it
never deployed. Either give the new file its own name, or put the current
stamp on that one reference by hand:

```
<img src="assets/app/app-home.webp?v=202608150703" …>
```

Images are deliberately left out of the sweep: they are the heavy assets, and
stamping all of them on every push would make every deploy re-download every
picture for returning visitors.

---

## Tests

```
npm test                  # all five suites
node js/cursor.test.js    # or one at a time
```

Three suites need jsdom (`npm i` once). They are real regression tests, not
decoration — the cursor pair pins two separate bugs that shipped twice.

`node --check <file>` catches syntax errors without a runtime, but it proves
nothing about behaviour. Never claim a JS change works on `--check` alone.

Tests assert against the page's own `<script src>` tags, so remember they see
the `?v=` stamp — compare on the path, not the whole src string.

jsdom cannot model what a real browser does at the edges: scrollbar gutters,
iframe hit-testing, or the fact that crossing into an embedded document is
completely silent to the parent page. Puppeteer is a devDependency for those —
drive the system Chrome at `/Applications/Google Chrome.app/Contents/MacOS/
Google Chrome` and move the pointer in `{ steps: N }`, because a teleporting
synthetic mouse produces event sequences a hand never would. Two cursor bugs
were "fixed" against reasoning alone before a real browser showed the actual
one.

---

## How the site is put together

- **Header and footer are JavaScript.** `js/components.js` defines
  `<sg-header>` / `<sg-footer>`, and the nav list lives in that file, not in
  any HTML. Changing a nav link means editing that array.
- **Home is `https://simplegrid.ai/`**, never `index.html`. The `HOME`
  constant in `js/components.js` carries it. Linking the filename points
  every page at a duplicate of the canonical URL.
- **Pages in subdirectories** carry `<base href="/">` (or `../../`), so their
  relative links resolve against the root. Check the `<base>` before reasoning
  about any relative href.
- **GitHub Pages cannot issue a 301.** Moved pages are stubs: canonical to the
  new URL, `<meta http-equiv="refresh">`, and a `location.replace()`. There are
  ~59 of them; they are deliberate, not dead files. A stub must point at the
  page that replaces it — redirecting to something unrelated is a soft 404.
- **`_headers` does nothing today.** It is Cloudflare Pages / Netlify syntax,
  kept as a statement of intent. GitHub Pages ignores it, so no CSP or HSTS is
  actually in force.

---

## Working in this repo

- **Stage files by name.** Other sessions edit this tree at the same time, and
  `git add .` sweeps their half-finished work into your commit. Check
  `git status` and stage only what you touched.
- **`git fetch` before you push.** `main` moves under you.
- **Never `git checkout HEAD -- <file>` on a file with uncommitted work in it**
  without copying it somewhere first. That is how an unrelated session's
  changes disappear.
- **Ask before pushing.** Push is visible to the world.
- Preview locally with the VS Code **Live Server** extension ("Go Live" in the
  status bar), not a terminal server.

---

## Things that are already handled

Worth knowing before "fixing" them:

- Titles, descriptions and canonicals are unique across all 112 pages, and
  every page has exactly one `<h1>`. Verified — do not bulk-rewrite.
- `robots.txt` allows AI crawlers on purpose. That is a decision, not an
  oversight.
- Fonts are self-hosted in `assets/fonts/` deliberately: no third-party
  request, no visitor IPs sent to Google.
- The custom cursor bails out entirely on coarse pointers and when reduced
  motion is requested.
