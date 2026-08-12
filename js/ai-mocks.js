/* ==========================================================================
   SimpleGrid — the two mocks in the AI section, played rather than posed.

   MATCH runs its queue: the bar fills, the counter climbs, and the rows tick
   over one at a time until the exception stops on amber. BUILD types the
   question, then builds the board the question asked for.

   Both start when the mock scrolls into view and reset when it leaves, so
   scrolling back plays them again — the same behaviour the homepage logo grid
   already has. With reduced motion requested, or with no IntersectionObserver
   to hand, each is left in its finished state and nothing moves.

   The markup carries the finished state, so with JavaScript off the mocks
   read exactly as they do at the end of the sequence.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Every timer a mock has running, so leaving the section can cancel them
     rather than let a half-finished sequence land on a reset panel. */
  function Timers() {
    var ids = [];
    var frames = [];
    return {
      after: function (ms, fn) { ids.push(window.setTimeout(fn, ms)); },
      /* Returns its id: a repeating timer usually has to stop itself without
         taking the rest of the sequence down with it. */
      every: function (ms, fn) {
        var id = window.setInterval(fn, ms);
        ids.push(id);
        return id;
      },
      frame: function (id) { frames.push(id); return id; },
      clear: function () {
        ids.forEach(function (id) { window.clearTimeout(id); window.clearInterval(id); });
        frames.forEach(function (id) { cancelAnimationFrame(id); });
        ids = [];
        frames = [];
      }
    };
  }

  /* Count from zero to the number the markup already holds. */
  function countTo(el, target, ms, timers) {
    var start = null;
    var step = function (now) {
      if (start === null) start = now;
      var t = Math.min(1, (now - start) / ms);
      /* Eased out, so the number slows as it arrives instead of stopping dead. */
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))).toLocaleString();
      if (t < 1) timers.frame(requestAnimationFrame(step));
    };
    timers.frame(requestAnimationFrame(step));
  }

  /* ------------------------------------------------------------ the queue */

  function queue(root) {
    var timers = Timers();
    var rows = Array.prototype.slice.call(root.querySelectorAll('[data-queue-row]'));
    var fill = root.querySelector('[data-queue-fill]');
    var count = root.querySelector('[data-queue-count]');
    var total = parseInt(count && count.textContent, 10) || 0;

    function reset() {
      timers.clear();
      root.setAttribute('data-anim', 'off');
      rows.forEach(function (row) { row.removeAttribute('data-in'); });
      if (fill) fill.style.width = '0%';
      if (count) count.textContent = '0';
    }

    function play() {
      root.setAttribute('data-anim', 'on');
      if (fill) fill.style.width = '90%';
      if (count) countTo(count, total, 900, timers);
      /* One row at a time, and a longer beat before the exception — the pause
         is what marks it as the one Hank would not clear on its own. */
      rows.forEach(function (row, i) {
        var last = i === rows.length - 1;
        timers.after(260 + i * 380 + (last ? 320 : 0), function () {
          row.setAttribute('data-in', 'true');
        });
      });
    }

    return { play: play, reset: reset, done: function () {
      root.removeAttribute('data-anim');
      rows.forEach(function (row) { row.setAttribute('data-in', 'true'); });
    } };
  }

  /* ------------------------------------------------------------ the board */

  function board(root) {
    var timers = Timers();
    var typed = root.querySelector('[data-board-type]');
    var text = typed ? typed.textContent : '';
    var figures = Array.prototype.slice.call(root.querySelectorAll('[data-board-count]'));
    var rows = Array.prototype.slice.call(root.querySelectorAll('[data-board-row]'));
    var badge = root.querySelector('[data-board-badge]');

    function reset() {
      timers.clear();
      root.setAttribute('data-anim', 'off');
      if (typed) typed.textContent = '';
      figures.forEach(function (el) { el.textContent = '0'; });
      rows.forEach(function (row) { row.removeAttribute('data-in'); });
      if (badge) badge.removeAttribute('data-in');
    }

    function play() {
      root.setAttribute('data-anim', 'on');

      /* The question, typed at reading speed. */
      var i = 0;
      var typing = timers.every(28, function () {
        if (!typed) return;
        i += 1;
        typed.textContent = text.slice(0, i);
        /* Only this timer stops — the board it leads into is already queued. */
        if (i >= text.length) window.clearInterval(typing);
      });

      /* Then the board it asked for: the badge, the figures, the rows. */
      var afterTyping = text.length * 28 + 260;
      timers.after(afterTyping, function () {
        if (badge) badge.setAttribute('data-in', 'true');
        figures.forEach(function (el) {
          countTo(el, parseInt(el.getAttribute('data-board-count'), 10) || 0, 700, timers);
        });
        rows.forEach(function (row, n) {
          timers.after(180 + n * 140, function () { row.setAttribute('data-in', 'true'); });
        });
      });
    }

    return { play: play, reset: reset, done: function () {
      root.removeAttribute('data-anim');
      rows.forEach(function (row) { row.setAttribute('data-in', 'true'); });
      if (badge) badge.setAttribute('data-in', 'true');
    } };
  }

  /* ---------------------------------------------------------------------- */

  function init() {
    var mocks = [];
    var q = document.querySelector('[data-queue]');
    var b = document.querySelector('[data-board]');
    if (q) mocks.push([q, queue(q)]);
    if (b) mocks.push([b, board(b)]);
    if (!mocks.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      mocks.forEach(function (pair) { pair[1].done(); });
      return;
    }

    mocks.forEach(function (pair) { pair[1].reset(); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var pair = mocks.filter(function (m) { return m[0] === entry.target; })[0];
        if (!pair) return;
        if (entry.isIntersecting) pair[1].play();
        else pair[1].reset();
      });
    }, { threshold: 0.4 });

    mocks.forEach(function (pair) { observer.observe(pair[0]); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
