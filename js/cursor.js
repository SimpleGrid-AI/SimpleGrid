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

    function frame() {
      requestAnimationFrame(frame);
      if (!moved) return;
      moved = false;
      dot.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

      /* The field is viewport-fixed, so the pointer's client coordinates are
         already the mask's coordinates — no scroll offset to add. */
      if (lit) {
        lit.style.setProperty('--mx', x + 'px');
        lit.style.setProperty('--my', y + 'px');
      }

      /* The native cursor is only given up once the replacement has actually
         painted somewhere real. If rAF never ticks — a stalled tab, a
         throttled frame loop — the page keeps a working cursor instead of
         having none at all. */
      if (!painted) {
        painted = true;
        document.documentElement.classList.add('has-custom-cursor');
        dot.setAttribute('data-visible', 'true');
        if (lit) lit.setAttribute('data-active', 'true');
      }
      resolve();
    }
    requestAnimationFrame(frame);

    /* Nothing outside the fullscreen element is painted, so the replacement
       would be invisible while still hiding the native pointer. Park it for
       the duration and let the real cursor through (see css/grid.css). */
    ['fullscreenchange', 'webkitfullscreenchange'].forEach(function (type) {
      document.addEventListener(type, function () {
        var full = document.fullscreenElement || document.webkitFullscreenElement;
        dot.setAttribute('data-visible', full ? 'false' : 'true');
        if (lit) lit.setAttribute('data-active', full ? 'false' : 'true');
      });
    });

    window.addEventListener('mousemove', function (event) {
      x = event.clientX;
      y = event.clientY;
      moved = true;
      seen = true;
    }, { passive: true });

    /* Scrolling changes what is under a stationary pointer. */
    window.addEventListener('scroll', function () {
      if (seen) moved = true;
    }, { passive: true });

    document.documentElement.addEventListener('mouseleave', function () {
      dot.setAttribute('data-visible', 'false');
      if (lit) lit.setAttribute('data-active', 'false');
    });
    document.documentElement.addEventListener('mouseenter', function () {
      if (!seen || !painted) return;
      dot.setAttribute('data-visible', 'true');
      if (lit) lit.setAttribute('data-active', 'true');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
