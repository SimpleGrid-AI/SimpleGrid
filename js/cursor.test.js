/* The replacement cursor must never be down while the native one is hidden.

   node js/cursor.test.js   (needs jsdom: npm install jsdom)

   Opening a browser menu sends the page a mouseleave. The matching mouseenter
   on the way back is not guaranteed — the pointer never left the window as far
   as the OS is concerned — so the page used to be left with the dot hidden and
   `cursor: none` still standing over everything: no pointer at all until you
   clicked. The two are one switch now, and a mousemove alone brings both back.
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

  const passed = checks.filter(Boolean).length;
  console.log('\n' + passed + '/' + checks.length + ' passed');
  process.exit(passed === checks.length ? 0 : 1);
})();
