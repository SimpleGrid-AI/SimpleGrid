/* ==========================================================================
   SimpleGrid — syncs page category filter.

   The chip row shows one category at a time rather than scrolling to it: the
   sections are short, and a jump leaves the reader somewhere down the page
   with no sense of what was passed. "All" is the resting state.

   The chosen category is written to the hash, so a filtered view can be
   linked and survives a reload — and an incoming #commerce link opens on that
   category instead of scrolling to it.
   ========================================================================== */

(function () {
  'use strict';

  function init() {
    var chips = Array.prototype.slice.call(document.querySelectorAll('[data-sync-cat]'));
    var sections = Array.prototype.slice.call(document.querySelectorAll('[data-sync-section]'));
    if (!chips.length || !sections.length) return;

    function show(cat) {
      sections.forEach(function (section) {
        section.hidden = cat !== 'all' && section.getAttribute('data-sync-section') !== cat;
      });
      chips.forEach(function (chip) {
        chip.setAttribute('aria-pressed', String(chip.getAttribute('data-sync-cat') === cat));
      });
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var cat = chip.getAttribute('data-sync-cat');
        show(cat);
        /* replaceState rather than a hash assignment: setting location.hash
           would scroll to the section we just filtered to, which is the
           behaviour this replaces. */
        history.replaceState(null, '', cat === 'all' ? location.pathname : '#' + cat);
      });
    });

    /* A link that arrives with a category on it opens filtered to it. Anything
       else — no hash, or one that names something else on the page — is left
       to the browser. */
    var incoming = location.hash.slice(1);
    if (incoming && chips.some(function (c) { return c.getAttribute('data-sync-cat') === incoming; })) {
      show(incoming);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
