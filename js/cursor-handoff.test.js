/* The cursor's handoff band and the order it reveals the dot in.

   node js/cursor.test.js   (no dependencies — the DOM here is a stub)

   Two defects this pins down, both of which left the pointer missing after a
   visit to a browser panel:

   1. The band measured itself with innerWidth, which counts the scrollbar
      gutter. The document never sees a pointer reading inside that gutter, so
      on the scrollbar's side the band sat past the last reachable pixel and
      the page left with `cursor: none` still set. Whichever edge a scrollbar
      is on is the edge that breaks, which is why it read as a bug about one
      panel rather than about the geometry.

   2. The dot was revealed in the mousemove handler but positioned in the next
      animation frame. Returning to a tab whose frame loop is throttled, that
      gap is long enough to see: the dot faded in where it was last left.

   The window here is 1534 wide with a 15px scrollbar (clientWidth 1519, so
   1518 is the largest x any event can carry) and 815 tall with a horizontal
   scrollbar, which is what makes the bottom edge exercise the same fault. */
const fs = require('fs'), vm = require('vm');

const log = [];
let rafQueue = [];

function el(cls) {
  return {
    className: cls || '', style: { transform: '', setProperty(k, v) { this[k] = v; } },
    attrs: {},
    setAttribute(k, v) {
      this.attrs[k] = v;
      if (k === 'data-visible') log.push('visible=' + v);
    },
    getAttribute(k) { return this.attrs[k] || null; },
    closest() { return null; }
  };
}

const dot = el('sg-cursor');
const htmlEl = {
  clientWidth: 1519, clientHeight: 800,
  classList: { toggle(c, on) { log.push('cursor-none=' + on); } },
  listeners: {},
  addEventListener(t, fn) { (this.listeners[t] = this.listeners[t] || []).push(fn); }
};

const doc = {
  documentElement: htmlEl,
  body: { appendChild() {} },
  readyState: 'complete',
  hidden: false,
  fullscreenElement: null,
  listeners: {},
  createElement() { return dot; },
  querySelector() { return null; },
  /* One embedded document, a stand-in for the YouTube player on the furniture
     case study. The script measures frames rather than listening for them,
     because crossing into one is silent. Placed low and left, clear of every
     coordinate the sections above probe — otherwise those moves land in its
     hand-back band and the dot is down for a reason they do not expect. */
  querySelectorAll(sel) {
    if (!/iframe/.test(sel)) return [];
    return [{ getBoundingClientRect: () => ({ left: 150, top: 560, right: 480, bottom: 700 }) }];
  },
  elementFromPoint() { return { closest: () => null }; },
  addEventListener(t, fn) { (this.listeners[t] = this.listeners[t] || []).push(fn); }
};

const win = {
  innerWidth: 1534, innerHeight: 815,
  document: doc, navigator: { maxTouchPoints: 0 },
  matchMedia: () => ({ matches: false }),
  requestAnimationFrame(fn) { rafQueue.push(fn); return rafQueue.length; },
  listeners: {},
  addEventListener(t, fn) { (this.listeners[t] = this.listeners[t] || []).push(fn); }
};
win.window = win;

const ctx = vm.createContext(win);
ctx.document = doc; ctx.navigator = win.navigator;
ctx.requestAnimationFrame = win.requestAnimationFrame.bind(win);
vm.runInContext(fs.readFileSync(__dirname + '/cursor.js', 'utf8'), ctx);

function tick(n) { for (let i = 0; i < (n || 1); i++) { const q = rafQueue; rafQueue = []; q.forEach(fn => fn()); } }
function fire(target, type, ev) { (target.listeners[type] || []).forEach(fn => fn(ev || {})); }
function move(x, y) {
  log.push('--move(' + x + ',' + y + ')');
  fire(win, 'mousemove', { clientX: x, clientY: y });
  log.push('  transform=' + dot.style.transform);
}

let fails = 0;
function check(name, cond, detail) {
  console.log((cond ? '  PASS  ' : '  FAIL  ') + name + (detail && !cond ? '  [' + detail + ']' : ''));
  if (!cond) fails++;
}

console.log('\n1. First move inside the page reveals the dot, already positioned');
move(700, 400);
check('transform written on the revealing move', dot.style.transform === 'translate(700px, 400px)', dot.style.transform);
/* The transform is written inside the mousemove handler and logged after it
   returns, so a reveal that happened during that same handler must appear
   before the log line — and the placement must be the current coordinates,
   which the previous check already pins. What this rules out is the reveal
   arriving with no transform written at all. */
check('reveal is preceded by a placement, not a bare visible=true',
  log.indexOf('visible=true') > log.indexOf('--move(700,400)')
  && dot.style.transform === 'translate(700px, 400px)',
  JSON.stringify(log));
check('dot is visible', dot.getAttribute('data-visible') === 'true');
tick();

console.log('\n2. The right-hand edge band is reachable (the defect)');
move(1518, 400);   // largest x the document can ever report
check('cursor handed back at the far right', dot.getAttribute('data-visible') === 'false',
  'still ' + dot.getAttribute('data-visible'));
move(1500, 400);   // back inside
check('dot returns when back inside', dot.getAttribute('data-visible') === 'true');
check('and it is placed at the new spot, not the old one',
  dot.style.transform === 'translate(1500px, 400px)', dot.style.transform);

console.log('\n3. Exit through the scrollbar gutter (mouseout, no relatedTarget)');
fire(doc, 'mouseout', { relatedTarget: null });
check('cursor handed back on gutter exit', dot.getAttribute('data-visible') === 'false');
/* Tested from visible, or the assertion proves nothing: element-to-element
   mouseout fires constantly during ordinary movement over the page. */
move(700, 400);
fire(doc, 'mouseout', { relatedTarget: {} });
check('ordinary element-to-element mouseout leaves it alone',
  dot.getAttribute('data-visible') === 'true', 'hid on a normal mouseout');

console.log('\n4. Return with a throttled frame loop (no rAF ticks at all)');
/* The real path: the pointer left through the edge, the tab lost focus to a
   browser panel, and it comes back to a different part of the page while rAF
   is still throttled. Batching is correct while the dot is up; what must not
   batch is the frame that brings it back. */
move(1518, 400);
fire(win, 'blur');
rafQueue = [];
move(300, 300);
check('placed before reveal without any frame running',
  dot.style.transform === 'translate(300px, 300px)', dot.style.transform);
check('visible again', dot.getAttribute('data-visible') === 'true');

console.log('\n5. Other three edges still hand off');
[[6, 400], [700, 6], [700, 794]].forEach(([x, y]) => {
  move(x, y);
  check('edge (' + x + ',' + y + ') hides', dot.getAttribute('data-visible') === 'false');
  move(700, 400);
});

console.log('\n6. Embedded documents (the frozen dot)');
/* The frame sits at (150,560)-(480,700) with a 44px band around it. Inside
   that band the page hands the cursor back, because once the pointer is over
   the frame nothing is delivered here at all — no move, no mouseout, and no
   mouseover naming it. The dot would otherwise stop at the crossing and stay
   drawn there with the native cursor still suppressed. */
move(300, 620);   // inside the frame itself
check('over the frame, the dot is down', dot.getAttribute('data-visible') === 'false');
move(300, 530);   // 30px above the top edge — inside the band
check('handed back before the edge is reached', dot.getAttribute('data-visible') === 'false');
move(300, 500);   // 60px above — clear of it
check('and taken again once clear', dot.getAttribute('data-visible') === 'true');
move(800, 620);   // level with it, far to the right
check('unaffected beside the frame', dot.getAttribute('data-visible') === 'true');

console.log('\n' + (fails ? fails + ' FAILING' : 'all checks passed'));
process.exit(fails ? 1 : 0);
