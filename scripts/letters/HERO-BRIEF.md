# Brief: build the interactive hero for one company page

## What this is
SimpleGrid is an operations cloud for manufacturers. It sits between a plant's ERP and its shop floor and links them, so everyone works from the same live information. Its founder, Mukund, prints and hand-delivers letters to operations leaders at Chicago-area plants. Each letter points to a one-person landing page (noindex, unlisted). The top of each page is an interactive "hero" drawn from that company's own world, and every hero tells the same story, in the founder's words:

> "ERP & shop floor are separate. When you mix them it is a big mess. Then you add SimpleGrid and it's clean."

So every hero has four moments:
1. **Apart.** Two halves that don't connect. One half stands for the ERP ("what the system says"), the other for the floor ("what's really happening, on Excel, whiteboards and phones"). A dashed "No link" tag points at the gap between them.
2. **Mess.** The first button pushes them together without a link, the way most ERP go-lives do. The result is an obvious, big mess, and **it stays a mess**: it does not settle back or clean itself up. The caption says "That's your operations today: a big mess." An ops panel ("Your operations, today") with sticky-note chips appears beside the object automatically.
3. **SimpleGrid goes in.** The second button adds the thing that fixes it: the emulsifier, the culture, the flux, the link. That thing wears the round SimpleGrid mark.
4. **Clean.** The third button does the first move again, and this time the same mess comes out clean. The result gets a "SimpleGrid" label. The callouts change to "Your ERP: still keeping the books" and "Your spreadsheets: retired, with thanks". The page wipes to its second color theme, and a Start over link appears.

## The repo and the build
- This repo is a plain static site. Each company's page is a template, `scripts/letters/<company>.html`. Shared pieces live in `scripts/letters/parts/` and are pulled in with `<!--#include name-->`. Per-reader values (`{{first}}`, `{{full}}`, `{{co_name}}`, `{{where}}`, `{{ps}}`, …) come from `scripts/letters/readers.json`.
- Build with `node scripts/letters/build.js` from the repo root. It writes `<company>/<slug>/index.html`. Never edit a built page; edit the template and rebuild.
- The test and screenshot scripts below serve the repo themselves, so you don't need a server. To look at a page by hand, use VS Code's Live Server (see CLAUDE.md).
- `scripts/letters/browser.js` drives playwright if it's installed, otherwise puppeteer (run `npm i` once). Set `CHROME_PATH` to use the system Chrome.

## The engine
Read `scripts/letters/parts/story.js`. It is short and it runs everything except your object. The contract:

```js
var story = SG.story({
  hero, obj, btn, reset, caption,  // #hero, your object element, #heroBtn, #heroReset, #heroCaption
  copy: COPY,                      // { apart, messing, mess, dosing, dosed, cleaning, done }: each { btn, caption }
  aria: ARIA,                      // { apart, mess, done }: the object's aria-label in each state
  skip: '.yourobj',                // what the color wipe leaves alone
  ops: { mess: [title, text], dosed: [title, text] },
  mess: fn, dose: fn, clean: fn,   // each returns a promise that resolves when that move is finished
  restore: fn,                     // back to the first picture, at once (Start over)
  final: function(on){ ... }       // swap the callouts for the end state (on) or back (off)
});
```

- While a phase ending in "-ing" runs, the button is disabled. At `done` the button reads "See what changes on your floor" and scrolls to the next section.
- `SG.reduce` is true under prefers-reduced-motion. Then moves become near-instant, but every state is still reached.
- Let a tap on the object call `story.go()` when `!story.busy()`.
- Toggle an `in-view` class with an IntersectionObserver if you run idle animation, so nothing burns CPU off-screen.
- `parts/kit.js` holds the other `SG` helpers.

Reference implementations to read before you start:
- `parts/line.js`, `parts/line.svg` and `parts/line.css`: the factory line. The cleanest small example of the whole contract (COPY, ARIA, ops words, mess/dose/clean/restore/final, tap to go, IntersectionObserver). It uses the Web Animations API with `fill:'both'` and an opacity in every keyframe. Without that, items fall back to a hidden starting style in the middle of a move.
- `scripts/letters/amity-packing.html`: the sausage. A fully self-contained hero inside one template (CSS, SVG markup, script), with every color on CSS variables.
- `scripts/letters/superior-nut.html` (the panning drum) and `scripts/letters/conway-dressings.html` (the jar: a WebGL liquid shader plus shake physics).

The copy pattern (adapt the words to your object):
- apart: btn "Pour it to see your operations", caption "The spec is your ERP, the melt is your floor, and nothing links them. Pour it, or tap the furnace."
- messing: btn "Pouring…", caption "Pouring it the usual way: the plan in one place, the floor in another."
- mess: btn "Add SimpleGrid" (or a phrase from the metaphor, e.g. "Add the flux"), caption "That’s your operations today: a big mess. <what the mess is>. It won’t sort itself out, either."
- dosing: btn "Adding…", caption "<the fix> goes in. That’s SimpleGrid."
- dosed: btn "Pour it again", caption "That’s SimpleGrid: <one line on the link>. Now pour it again."
- cleaning: btn "Pouring…", caption "Watch the mess come clean."
- done: btn "See what changes on your floor", caption "From the mess, a clean <result>: <what's right now>. Your ERP and your floor finally match."

The words are plain and warm: short sentences, no jargon, no exclamation marks. Use curly quotes and apostrophes (’ “ ”) and a real ellipsis (…).

## Where your template stands
Your template already exists and builds, with its palette, h1, bar tag, stage data (`window.STAGE`), proof section, P.S. and facts all written and fact-checked. **Don't change those.** It currently borrows a placeholder hero. Replace it with yours:
1. In the `<style>`, replace the placeholder hero's CSS (e.g. `<!--#include line.css-->` plus the `.line{--sku…}` line) with your hero's CSS, inline. Keep the palette `:root` block and any `@font-face`.
2. In the hero, replace the placeholder object block (e.g. `<div class="line hero-obj" id="line" …> … </div>`) with your object: `<div class="<yours> hero-obj" id="<yours>" role="img" aria-label="…">` holding an inline `<svg viewBox="0 0 360 560">`, the size every hero uses. Rewrite the two callouts' text for your metaphor. Keep the ids `topTitle`, `topText`, `bottomTitle`, `bottomText` and `gapTag`, and keep the `<!--#include ops.html-->` line. Position `.callout-top`, `.callout-gap`, `.callout-bottom` and the `.hero-art .callout-gap::before` width so the "No link" tag's dashed line points at the gap between your two halves. `parts/line.css` and `amity-packing.html` show how.
3. In the scripts, replace the placeholder's script (e.g. `<script>\n<!--#include line.js-->\n</script>`) with your hero's script, using `SG.story(...)` as above.
4. Update the hero button's first label and the caption in the `hero-ctrl` markup to match your `COPY.apart`. You may also update `<title>`, `og:title`, `twitter:title` and `og:image:alt` so they describe your object and verb.
5. SimpleGrid has to show up inside the hero. The fixer wears the mark when it goes in (dose), and the clean result gets the label at done. Use the shared parts: `<g transform="translate(x y) scale(k)"><g class="<name> sg-pop"><!--#include sg-badge.svg--></g></g>` (the round grid mark, radius 20 before scaling) and the same with `sg-tag.svg` (the "SimpleGrid" label, 194x46 before scaling, centered on 0,0). Set `--sg-bg` and `--sg-ink` on them for contrast with whatever they sit on, and reveal them with a rule like `.<obj>.dosed .<name>{opacity:1;transform:none}`. Put a transform attribute on the OUTER g; the CSS pop transform goes on the inner `.sg-pop` g. Look at how `parts/base.css` styles `.sg-pop`.
6. Use the page's palette tokens (`var(--brand)`, `var(--accent)`, …) or colors from the company's own world. The hero should feel like the company's page.

## Rules
- Edit only your own template. No git commands. Don't edit `parts/`, `readers.json`, other templates or built pages.
- Don't add facts about the company anywhere. The hero is a metaphor. Labels like "Heat 4417" or "On spec" are pretend, and so is the stage's plant.
- Design bar: it must read at a glance on a phone (390px wide, where the object is about 170px wide) and on desktop (about 330px wide). Use clear shapes, generous sizes and few tiny details. The mess must be obviously a mess and must stay one until the SimpleGrid step turns it clean. Animate with CSS transitions, the Web Animations API or requestAnimationFrame. Start over must restore the exact first picture. No console errors. No horizontal scroll at 320px.

## Testing
- `node scripts/letters/qa.js <company>` checks layout at 1440, 820, 390 and 320 wide, then walks the story by button alone in reduced motion and full motion, through Start over. It must end with "all N pages clean".
- `node scripts/letters/shoot.js <company>/<slug>/ <outdir> 1440 900` (and again with `390 844`) saves a screenshot of each resting phase. **Look at every screenshot** and iterate until each phase reads clearly at both sizes. Then drive the full-motion story yourself and capture a few frames mid-move, to catch things that flash, vanish or jump.

## Report back
For your template: what the hero looks like in each phase, the COPY you used, the test output, and the absolute paths of the key screenshots (apart, mess and done at desktop; mess and done at phone).
