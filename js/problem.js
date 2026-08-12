/* ==========================================================================
   SimpleGrid — the four symptoms, opened by the reader.

   Each pointer opens to its own copy and the piece of product that answers
   it. One is open at a time: they are four versions of the same complaint,
   and reading them side by side turns the section into a wall.

   Nothing moves on its own, and nothing is open until the reader opens it.
   With no JavaScript the copy is still in the page for anything that reads
   it, and with reduced motion requested the whole list is opened flat so
   nothing has to be operated.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    var list = document.querySelector('[data-pains]');
    if (!list) return;

    var pains = Array.prototype.slice.call(list.querySelectorAll('[data-pain]'));
    if (pains.length < 2) return;

    if (reduceMotion) {
      pains.forEach(function (p) {
        p.setAttribute('data-open', '');
        p.querySelector('.pain__q').setAttribute('aria-expanded', 'true');
      });
      return;
    }

    function show(i) {
      pains.forEach(function (p, n) {
        var open = n === i;
        p.toggleAttribute('data-open', open);
        p.querySelector('.pain__q').setAttribute('aria-expanded', String(open));
      });
    }

    list.addEventListener('click', function (event) {
      var button = event.target.closest('.pain__q');
      if (!button) return;
      var item = button.closest('[data-pain]');
      /* Pressing the open one closes it — the reader gets the list back. */
      if (item.hasAttribute('data-open')) {
        item.removeAttribute('data-open');
        button.setAttribute('aria-expanded', 'false');
        return;
      }
      show(pains.indexOf(item));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
