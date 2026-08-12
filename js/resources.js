/* ==========================================================================
   SimpleGrid — resources page filtering and paging

   Every card is in the markup: the filters hide and show, they do not fetch.
   That keeps the whole library crawlable and readable with JavaScript off,
   where the page degrades to "all of it, in order".
   ========================================================================== */

(function () {
  'use strict';

  var page = document.querySelector('[data-resources]');
  if (!page) return;

  /* ------------------------------------------------------- section filter */

  var sectionPills = page.querySelectorAll('[data-res-section]');

  function showSections(key) {
    page.querySelectorAll('[data-res-panel]').forEach(function (panel) {
      panel.hidden = !(key === 'all' || panel.getAttribute('data-res-panel') === key);
    });
    sectionPills.forEach(function (pill) {
      pill.setAttribute('aria-pressed', String(pill.getAttribute('data-res-section') === key));
    });
  }

  sectionPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      showSections(pill.getAttribute('data-res-section'));
    });
  });

  /* ------------------------------------------- per-collection filter + paging */

  /* One collection is a grid of [data-item] cards, optionally with a row of
     category pills above it and a row of page numbers below. */
  function initCollection(root) {
    var items = Array.prototype.slice.call(root.querySelectorAll('[data-item]'));
    var pagesBox = root.querySelector('[data-pages]');
    var empty = root.querySelector('[data-empty]');
    var perPage = parseInt(root.getAttribute('data-per-page'), 10) || items.length;
    var cat = 'all';
    var current = 1;

    function matching() {
      return cat === 'all'
        ? items
        : items.filter(function (el) { return el.getAttribute('data-cat') === cat; });
    }

    function render() {
      var shown = matching();
      var pages = Math.max(1, Math.ceil(shown.length / perPage));
      if (current > pages) current = pages;
      var from = (current - 1) * perPage;

      items.forEach(function (el) { el.hidden = true; });
      shown.slice(from, from + perPage).forEach(function (el) { el.hidden = false; });

      if (empty) empty.hidden = shown.length > 0;
      if (!pagesBox) return;

      /* Rebuilt rather than toggled: the number of pages changes with the
         filter, so the buttons themselves are part of the state. */
      pagesBox.textContent = '';
      pagesBox.hidden = pages < 2;
      for (var n = 1; n <= pages; n++) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'res-page';
        btn.textContent = String(n);
        btn.setAttribute('data-page', String(n));
        if (n === current) btn.setAttribute('aria-current', 'true');
        btn.setAttribute('aria-label', 'Page ' + n);
        pagesBox.appendChild(btn);
      }
    }

    root.querySelectorAll('[data-res-cat]').forEach(function (pill) {
      pill.addEventListener('click', function () {
        cat = pill.getAttribute('data-res-cat');
        current = 1;
        root.querySelectorAll('[data-res-cat]').forEach(function (other) {
          other.setAttribute('aria-pressed', String(other === pill));
        });
        render();
      });
    });

    if (pagesBox) {
      pagesBox.addEventListener('click', function (event) {
        var btn = event.target.closest('[data-page]');
        if (!btn) return;
        current = parseInt(btn.getAttribute('data-page'), 10);
        render();
        /* Back to the top of the collection, not the top of the page — the
           reader's place in the page is the section they were reading. */
        root.scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
    }

    render();
  }

  page.querySelectorAll('[data-collection]').forEach(initCollection);
  showSections('all');
})();
