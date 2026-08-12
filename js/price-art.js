/* ==========================================================================
   SimpleGrid — the two drawn panels on the pricing page, played rather than
   posed.

   The quote panel builds the way the sentence beside it reads: the three
   inputs arrive, the wires draw between them, then the number lands. The
   allowance panel fills its bar to what a normal month uses and drops the
   allowance line in behind it.

   Each starts when its panel scrolls into view and resets when it leaves, so
   scrolling back plays it again — the same behaviour the rest of the site's
   scroll-driven pieces have. Reduced motion, or no IntersectionObserver, and
   both are left in their finished state with nothing moving. The markup holds
   that finished state, so with JavaScript off the panels read correctly.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function Timers() {
    var ids = [];
    return {
      after: function (ms, fn) { ids.push(window.setTimeout(fn, ms)); },
      clear: function () {
        ids.forEach(function (id) { window.clearTimeout(id); });
        ids = [];
      }
    };
  }

  /* ------------------------------------------------------------ the quote */

  function quote(root) {
    var timers = Timers();
    var inputs = Array.prototype.slice.call(
      root.querySelectorAll('[data-quote-inputs] li'));
    var out = root.querySelector('[data-quote-out]');

    function reset() {
      timers.clear();
      root.setAttribute('data-anim', 'off');
      inputs.forEach(function (li) { li.removeAttribute('data-in'); });
      if (out) out.removeAttribute('data-in');
    }

    function play() {
      root.setAttribute('data-anim', 'on');
      /* Inputs first, top to bottom — the order the copy names them in. */
      inputs.forEach(function (li, i) {
        timers.after(120 + i * 200, function () { li.setAttribute('data-in', 'true'); });
      });
      /* The wires draw themselves off the same [data-anim] flag in CSS; the
         number lands once they have arrived. */
      timers.after(120 + inputs.length * 200 + 420, function () {
        if (out) out.setAttribute('data-in', 'true');
      });
    }

    return { play: play, reset: reset, done: function () {
      root.removeAttribute('data-anim');
      inputs.forEach(function (li) { li.setAttribute('data-in', 'true'); });
      if (out) out.setAttribute('data-in', 'true');
    } };
  }

  /* -------------------------------------------------------- the allowance */

  function allow(root) {
    var timers = Timers();
    var fill = root.querySelector('[data-allow-fill]');
    var line = root.querySelector('[data-allow-line]');
    var legend = root.querySelector('[data-allow-legend]');
    /* Read off the stylesheet rather than restated here — the width of a
       normal month lives in one place, and this plays back to it. */
    var pct = fill ? fill.offsetWidth / (fill.parentElement.offsetWidth || 1) * 100 : 0;

    function reset() {
      timers.clear();
      root.setAttribute('data-anim', 'off');
      if (fill) fill.style.width = '0%';
      if (line) line.removeAttribute('data-in');
      if (legend) legend.removeAttribute('data-in');
    }

    function play() {
      root.setAttribute('data-anim', 'on');
      if (fill) fill.style.width = pct.toFixed(2) + '%';
      timers.after(560, function () {
        if (line) line.setAttribute('data-in', 'true');
        if (legend) legend.setAttribute('data-in', 'true');
      });
    }

    return { play: play, reset: reset, done: function () {
      root.removeAttribute('data-anim');
      if (fill) fill.style.width = '';
      if (line) line.setAttribute('data-in', 'true');
      if (legend) legend.setAttribute('data-in', 'true');
    } };
  }

  /* ---------------------------------------------------------------------- */

  function init() {
    var panels = [];
    var q = document.querySelector('[data-quote]');
    var a = document.querySelector('[data-allow]');
    if (q) panels.push([q, quote(q)]);
    if (a) panels.push([a, allow(a)]);
    if (!panels.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      panels.forEach(function (pair) { pair[1].done(); });
      return;
    }

    panels.forEach(function (pair) { pair[1].reset(); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var pair = panels.filter(function (p) { return p[0] === entry.target; })[0];
        if (!pair) return;
        if (entry.isIntersecting) pair[1].play();
        else pair[1].reset();
      });
    }, { threshold: 0.4 });

    panels.forEach(function (pair) { observer.observe(pair[0]); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
