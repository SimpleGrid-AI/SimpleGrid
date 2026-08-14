/* ==========================================================================
   SimpleGrid — custom cursor + the grid highlight that tracks it.

   A square dot that opens into a ring over anything clickable, and inverts
   over dark surfaces. It also drags a disc of brighter grid lines along with
   it, by moving the mask on .grid-field__lit.

   Both are written once per animation frame from a cached pointer reading,
   never inside the mousemove handler, so a burst of move events costs one
   paint instead of dozens.

   Bails out entirely on coarse pointers and when reduced motion is
   requested — in both cases the native cursor is left alone.
   ========================================================================== */

(function () {
  'use strict';

  var INTERACTIVE = 'a, button, [role="button"], [role="link"], input[type="submit"], summary, .tool, .case';
  var THEME_ATTR = '[data-cursor]';

  /* Surfaces that are the house blue rather than the page's own ground. A
     region can declare itself with data-cursor="light", but a blue button is
     everywhere and marking each one in the markup would be a rule kept by
     hand. On any of these the cursor inverts to white — a blue ring on a blue
     button is a cursor you cannot see. */
  var LIGHT = [
    '.btn--primary', '.btn-primary', '.nav__link--cta',
    '.board__badge', '.intg-step__n', '.step__num',
    '.res-pill[aria-pressed="true"]', '.sync-chip[aria-pressed="true"]',
    '.res-page[aria-current="true"]',
    /* Blog and resource thumbnails: the cover is the brand gradient, ink or
       flat blue, and the art on it is white — so the cursor is too. The tinted
       variant is the one light ground among them, so it is left out. */
    '.res-card__cover:not(.res-card__cover--tint)'
  ].join(', ');

  function shouldRun() {
    if (!window.matchMedia) return false;
    if (window.matchMedia('(pointer: coarse)').matches) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !(navigator.maxTouchPoints > 0);
  }

  function init() {
    if (!shouldRun()) return;

    var dot = document.createElement('div');
    dot.className = 'sg-cursor';
    dot.setAttribute('aria-hidden', 'true');
    dot.setAttribute('data-theme', 'dark');
    dot.setAttribute('data-hover', 'false');
    dot.setAttribute('data-visible', 'false');
    document.body.appendChild(dot);

    var lit = document.querySelector('[data-grid-lit]');

    var x = -100;
    var y = -100;
    var moved = false;
    var seen = false;
    var painted = false;
    var hovering = false;
    var theme = 'dark';
    var visible = false;
    var parked = false;

    /* The replacement and the native cursor are one switch, never two. Hiding
       the dot on its own leaves `cursor: none` standing over the whole page,
       so the pointer is somewhere with nothing drawn at it — which is what
       happened on the way back from a browser menu: the popup opening sends
       mouseleave, and the pointer coming back onto the page does not always
       send the matching mouseenter, so the dot stayed hidden and the native
       arrow stayed suppressed. Whatever hides the dot hands the real cursor
       back for as long as the dot is down. */
    function setVisible(on) {
      on = !!on && painted && !parked;
      if (on === visible) return;
      visible = on;
      dot.setAttribute('data-visible', String(on));
      if (lit) lit.setAttribute('data-active', String(on));
      document.documentElement.classList.toggle('has-custom-cursor', on);
    }

    /* A band around the inside of the window where the page gives the cursor
       up early.

       The browser only redraws the pointer while it is delivering events to
       the page. Open the ⋮ menu and the page stops receiving them: no move, no
       leave, nothing until the next click. Whatever the cursor was at that
       moment is what it stays — and if that was `none`, the pointer is simply
       missing for as long as the menu is open and after it closes, which is
       the bug that outlived the last fix. Restoring on the way back cannot
       work, because there is no event on the way back to restore from.

       So the page hands the cursor over before it loses the chance to. Every
       exit crosses this band on the way out, and crossing it is an ordinary
       mousemove, delivered while the page is still being talked to. By the
       time the pointer reaches the browser's own furniture the arrow is
       already back, and it is the arrow that stays frozen instead of nothing
       at all. */
    var EDGE = 12;

    /* clientWidth, not innerWidth: innerWidth counts the scrollbar gutter, and
       the document never receives a pointer reading inside it. On a 1534px
       window with a 15px scrollbar the largest x any event carries is 1518,
       while the band this measured out ran from 1526 — so the pointer left
       through the right edge without ever crossing it, and the page kept
       `cursor: none` on the way out. The left, top and bottom edges worked;
       only the side the scrollbar sits on was dead, which is why it looked
       like a bug about one panel. EDGE is wider than any scrollbar for the
       same reason: the band must be reachable, not merely defined. */
    function insideEdge(px, py) {
      var doc = document.documentElement;
      var w = doc.clientWidth || window.innerWidth || 0;
      var h = doc.clientHeight || window.innerHeight || 0;
      return px >= EDGE && py >= EDGE && px <= w - EDGE && py <= h - EDGE;
    }

    /* Resolve state from whatever sits under the pointer. Runs only on frames
       where the pointer actually moved or the page scrolled beneath it. */
    function resolve() {
      var el = document.elementFromPoint(x, y);
      if (!el) return;

      var nextHover = !!el.closest(INTERACTIVE);
      var region = el.closest(THEME_ATTR);
      var nextTheme = el.closest(LIGHT) ? 'light'
                    : region ? region.getAttribute('data-cursor')
                    : 'dark';

      if (nextHover !== hovering) {
        hovering = nextHover;
        dot.setAttribute('data-hover', String(hovering));
      }
      if (nextTheme !== theme) {
        theme = nextTheme;
        dot.setAttribute('data-theme', theme);
      }
    }

    /* Writing the dot where the pointer is. Pulled out of the frame loop so
       that whatever is about to show the dot can put it in the right place
       first: revealing it before the next frame writes the transform fades it
       in at the position it was last left at, and a tab coming back from a
       browser panel has a throttled frame loop, so "the next frame" can be
       long enough to watch. That is the cursor that looked stuck.

       It also carries `painted`, because having written a transform is exactly
       what that flag means, and setVisible() refuses to give up the native
       cursor until it is true. */
    function place() {
      dot.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

      /* The field is viewport-fixed, so the pointer's client coordinates are
         already the mask's coordinates — no scroll offset to add. */
      if (lit) {
        lit.style.setProperty('--mx', x + 'px');
        lit.style.setProperty('--my', y + 'px');
      }
      painted = true;
    }

    function frame() {
      requestAnimationFrame(frame);
      if (!moved) return;
      moved = false;

      /* The native cursor is only given up once the replacement has actually
         painted somewhere real. If rAF never ticks — a stalled tab, a
         throttled frame loop — the page keeps a working cursor instead of
         having none at all. */
      var first = !painted;
      place();
      if (first) setVisible(insideEdge(x, y));
      resolve();
    }
    requestAnimationFrame(frame);

    /* Nothing outside the fullscreen element is painted, so the replacement
       would be invisible while still hiding the native pointer. Park it for
       the duration and let the real cursor through (see css/grid.css). */
    ['fullscreenchange', 'webkitfullscreenchange'].forEach(function (type) {
      document.addEventListener(type, function () {
        parked = !!(document.fullscreenElement || document.webkitFullscreenElement);
        setVisible(!parked);
      });
    });

    /* A move is the one reading that cannot be stale: the pointer is over the
       page, at these coordinates, now. So it is also what brings the dot back,
       whether or not the boundary event that hid it was ever answered. */
    window.addEventListener('mousemove', function (event) {
      x = event.clientX;
      y = event.clientY;
      moved = true;
      seen = true;
      /* Placed before it is shown, never after — see place(). Only on the
         move that brings it back, so an ordinary move still costs one write
         per frame rather than one per event. */
      var show = insideEdge(x, y);
      if (show && !visible) place();
      setVisible(show);
    }, { passive: true });

    /* Scrolling changes what is under a stationary pointer. */
    window.addEventListener('scroll', function () {
      if (seen) moved = true;
    }, { passive: true });

    document.documentElement.addEventListener('mouseleave', function () {
      setVisible(false);
    });
    document.documentElement.addEventListener('mouseenter', function (event) {
      if (!seen) return;
      /* Enter carries a position of its own. Taking it means the dot is drawn
         where the pointer came in rather than flashing at wherever it left. */
      if (typeof event.clientX === 'number') {
        x = event.clientX;
        y = event.clientY;
        moved = true;
      }
      var show = insideEdge(x, y);
      if (show && !visible) place();
      setVisible(show);
    });

    /* An exit through the scrollbar gutter is not a mouseleave on the document
       element — the pointer is still inside the window, just over furniture the
       page does not own. mouseout with no relatedTarget is the one event that
       covers it, and the same reading covers leaving the window entirely. */
    document.addEventListener('mouseout', function (event) {
      if (!event.relatedTarget) setVisible(false);
    });

    /* Opening a browser menu, an extension popup or the downloads shelf moves
       the pointer into the browser's own furniture, where nothing this page
       draws is visible. The page keeps the pointer's last position but loses
       the right to be the thing under it, so the native cursor comes back and
       the first move over the page again takes it away. */
    window.addEventListener('blur', function () {
      setVisible(false);
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) setVisible(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
