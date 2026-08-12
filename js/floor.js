/* ==========================================================================
   SimpleGrid — the two clients in one frame.

   Elite runs as film, Apex as a panel of numbers. The arrows move between
   them; the film is paused whenever it is not the one on screen, so a hidden
   video is not decoding in the background.

   With no JavaScript the first client is shown and the second stays hidden —
   the arrows simply do nothing, which is better than showing both stacked.
   ========================================================================== */

(function () {
  'use strict';

  function init() {
    var frame = document.querySelector('[data-floor]');
    if (!frame) return;

    var slides = Array.prototype.slice.call(frame.querySelectorAll('[data-floor-slide]'));
    if (slides.length < 2) return;

    var prev = frame.querySelector('[data-floor-prev]');
    var next = frame.querySelector('[data-floor-next]');
    var index = 0;

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (slide, n) {
        var on = n === index;
        slide.hidden = !on;
        slide.toggleAttribute('data-current', on);

        var film = slide.querySelector('video');
        if (!film) return;
        /* Paused rather than left running: a hidden video still decodes. */
        if (on) {
          var playing = film.play();
          if (playing && playing.catch) playing.catch(function () { /* autoplay refused */ });
        } else {
          film.pause();
        }
      });
    }

    if (prev) prev.addEventListener('click', function () { show(index - 1); });
    if (next) next.addEventListener('click', function () { show(index + 1); });

    show(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
