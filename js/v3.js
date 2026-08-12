/* ==========================================================================
   SimpleGrid v3 — homepage behaviour.
   Three small, independent modules. No dependencies, no build step.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------- scroll reveal */

  function initReveal() {
    var targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    function show(el) {
      el.classList.add('is-visible');
      observer.unobserve(el);
    }

    /* threshold 0, not 0.05: a section card can be several times the height of
       the window, and asking for 5% of the element to be inside a root that is
       also shortened by the margin below meant the tallest sections could sit
       in view without ever crossing their own threshold — which read as the
       section failing to load. Any pixel entering is enough. */
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) show(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

    targets.forEach(function (el) { observer.observe(el); });

    /* Belt and braces for the case the observer cannot cover: a page opened in
       a background tab, or restored from the back/forward cache, can be laid
       out before it is ever painted. On the first paint after that, anything
       already on screen is revealed directly. */
    function sweep() {
      targets.forEach(function (el) {
        if (el.classList.contains('is-visible')) return;
        var box = el.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) show(el);
      });
    }
    window.addEventListener('pageshow', sweep);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) sweep();
    });
  }

  /* ------------------------------------------------------------ FAQ list */

  function initFaq() {
    var list = document.querySelector('[data-faq]');
    if (!list) return;

    list.addEventListener('click', function (event) {
      var button = event.target.closest('.faq__q');
      if (!button || !list.contains(button)) return;
      var open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
    });
  }

  /* ------------------------------------------------- case study carousel */

  /* ---------------------------------------------------------------- clients */

  /* One client on screen at a time, stepped by the two arrows. Slides are
     authored in the page and hidden here, so with no script every client is
     still on the page and readable. */
  function initClients() {
    var stage = document.querySelector('[data-clients]');
    if (!stage) return;

    var slides = Array.prototype.slice.call(stage.querySelectorAll('[data-client]'));
    if (slides.length < 2) return;

    var prev = stage.querySelector('[data-clients-prev]');
    var next = stage.querySelector('[data-clients-next]');
    var index = 0;

    function render() {
      slides.forEach(function (slide, i) {
        slide.hidden = i !== index;
        slide.setAttribute('aria-current', String(i === index));
      });
    }

    function step(delta) {
      index = (index + delta + slides.length) % slides.length;
      render();
    }

    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });

    render();
  }

  /* ------------------------------------------------------- staggered rows */

  /* The .reveal observer above fires once and lets go. The logo grid is meant
     to replay: it reveals on the way in and clears on the way out, every time,
     so scrolling back up shows it arrive again. */
  function initStagger() {
    var groups = document.querySelectorAll('[data-stagger]');
    if (!groups.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      groups.forEach(function (el) { el.setAttribute('data-in', 'true'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.setAttribute('data-in', 'true');
        else entry.target.removeAttribute('data-in');
      });
    }, { threshold: 0.35 });

    groups.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------------- */

  function boot() {
    initReveal();
    initFaq();
    initClients();
    initStagger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
