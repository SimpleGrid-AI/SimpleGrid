/* The replacement cursor must never be down while the native one is hidden,
   and the page must give the native one back before the pointer leaves.

   node js/cursor.test.js   (needs jsdom: npm install jsdom)

   Opening the browser's ⋮ menu stops event delivery to the page: no move, no
   leave, nothing until the next click. The pointer keeps whatever cursor it
   had at that moment, so if the page was still hiding it there is no pointer
   at all — and nothing arrives afterwards to put it back. Hence the band
   around the inside of the window: the pointer crosses it on the way out,
   while the page is still being sent events, and the arrow is already back by
   the time the menu opens.
*/

const fs = require('fs'), vm = require('vm');
let JSDOM; try { ({ JSDOM } = require('jsdom')); } catch (e) { console.error('needs jsdom'); process.exit(2); }

const src = fs.readFileSync(__dirname + '/cursor.js', 'utf8');
const dom = new JSDOM('<!doctype html><body><a href="#">link</a></body>',
                      { runScripts: 'outside-only', pretendToBeVisual: true });
const w = dom.window, d = w.document;

/* A mouse, on a machine that has not asked for less motion. */
w.matchMedia = q => ({ matches: false, media: q,
                       addEventListener(){}, removeEventListener(){},
                       addListener(){}, removeListener(){} });
Object.defineProperty(w.navigator, 'maxTouchPoints', { value: 0, configurable: true });
/* The script asks what is under the pointer; jsdom has no layout to answer with. */
d.elementFromPoint = () => d.body;

vm.runInContext(src, dom.getInternalVMContext());

/* The dot is only written on an animation frame, so every assertion waits for
   one — the same reason the page keeps a native cursor until rAF has ticked. */
const painted = () => new Promise(r => setTimeout(r, 40));
const move = async (x, y) => {
  w.dispatchEvent(new w.MouseEvent('mousemove', { clientX: x, clientY: y, bubbles: true }));
  await painted();
};
const boundary = type => d.documentElement.dispatchEvent(
  new w.MouseEvent(type, { clientX: 40, clientY: 40, bubbles: false }));

const state = () => {
  const dot = d.querySelector('.sg-cursor');
  return {
    dot: !!dot && dot.getAttribute('data-visible') === 'true',
    none: d.documentElement.classList.contains('has-custom-cursor')
  };
};

const checks = [];
const check = (name, pass, s) => {
  checks.push(pass);
  console.log((pass ? 'ok   ' : 'FAIL ') + name + '  ' + JSON.stringify(s));
};

(async () => {
  await painted();                       // let the script's init run

  await move(40, 40);
  let s = state();
  check('dot takes over after a move and a frame', s.dot && s.none, s);

  /* The browser menu opens over the page. */
  boundary('mouseleave');
  s = state();
  check('leaving hands the native cursor back', !s.dot && !s.none, s);

  /* Back onto the page with no mouseenter — the case that used to leave the
     page with no cursor at all. */
  await move(120, 200);
  s = state();
  check('a move alone brings the dot back', s.dot && s.none, s);

  /* Focus lost to the browser's own furniture. */
  w.dispatchEvent(new w.Event('blur'));
  s = state();
  check('blur hands the native cursor back', !s.dot && !s.none, s);

  await move(130, 210);
  s = state();
  check('and a move takes it again', s.dot && s.none, s);

  /* Whatever the sequence, the two must never disagree. */
  boundary('mouseleave');
  boundary('mouseenter');
  boundary('mouseleave');
  await painted();
  s = state();
  check('never a hidden dot over a hidden cursor', s.dot === s.none, s);

  /* The ⋮ menu: up through the top of the window, then nothing at all until
     the click that closes it. The last event the page gets is the move
     through the band, and that has to be the one that gives the arrow back —
     whatever comes afterwards, there is nothing to act on. */
  await move(400, 300);
  check('inside the page, the dot has it', state().dot && state().none, state());

  await move(400, 3);                    // crossing out to the browser's chrome
  s = state();
  check('the band hands the arrow back on the way out', !s.dot && !s.none, s);

  /* No events for as long as the menu is open, and none on the way back. */
  await painted();
  s = state();
  check('and it stays the arrow while nothing is delivered', !s.dot && !s.none, s);

  await move(402, 320);                  // the click, or the first move after it
  s = state();
  check('the page takes it again once events resume', s.dot && s.none, s);

  /* Every edge, not just the one the menu is behind. */
  const edges = [[400, 765], [3, 300], [1021, 300]];
  const gaveBack = [];
  for (const [ex, ey] of edges) {
    await move(400, 300);
    await move(ex, ey);
    gaveBack.push(!state().dot && !state().none);
  }
  check('every edge does the same', gaveBack.every(Boolean), gaveBack);

  const passed = checks.filter(Boolean).length;
  console.log('\n' + passed + '/' + checks.length + ' passed');
  process.exit(passed === checks.length ? 0 : 1);
})();
