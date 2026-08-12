/* ==========================================================================
   SimpleGrid — module detail panels (product page)

   Each module tile opens a dialog holding that module's detail — a sheet inset
   from every edge, over a blurred view of the page it came from.
   The panels are authored as static markup rather than rendered here, so the
   copy is in the page for crawlers and readable with JavaScript switched off;
   this file only moves them between hidden and shown.
   ========================================================================== */

(function () {
  'use strict';

  /* The rail at the foot of a panel also runs on its own on the pricing page,
     where there are no panels at all — so nothing here bails out early. */
  var panels = document.querySelectorAll('.mod-panel');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var open = null;        /* the panel currently shown */
  var lastFocus = null;   /* what to hand focus back to on close */

  function panelFor(slug) { return document.getElementById('mod-' + slug); }

  /* The open module is written into the address bar, so any tile can be linked
     to and a reload comes back to the same panel. replaceState rather than a
     hash assignment: setting location.hash would scroll the page behind the
     panel to the anchor. */
  function stampHash(slug) {
    if (!window.history || !history.replaceState) return;
    history.replaceState(null, '', slug ? '#mod-' + slug : location.pathname + location.search);
  }

  /* Keeping Tab inside the dialog — without this, tabbing walks off into the
     page behind, which is still rendered and still focusable. */
  function focusables(root) {
    return Array.prototype.filter.call(
      root.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetWidth || el.offsetHeight || el.getClientRects().length; }
    );
  }

  function onKeydown(event) {
    if (!open) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== 'Tab') return;
    var items = focusables(open);
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function show(slug, trigger) {
    var panel = panelFor(slug);
    if (!panel || panel === open) return;

    /* Swapping straight from one panel to another — "More to discover" — so
       the scroll lock and key handler stay as they are. */
    var swapping = !!open;
    if (open) hide(open);

    panel.hidden = false;
    /* Next frame, so the browser has a chance to lay the panel out before the
       transition starts. Without it the panel appears already at its end
       state and there is nothing to animate. */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { panel.setAttribute('data-open', 'true'); });
    });

    open = panel;
    if (!swapping) {
      lastFocus = trigger || document.activeElement;
      document.documentElement.classList.add('has-modal');
      document.addEventListener('keydown', onKeydown);
    }

    panel.scrollTop = 0;   /* the panel is the scroll container */
    /* Widths only exist once the panel is out of `hidden`, so the rail's
       arrows can only be judged now, not at load. */
    panel.querySelectorAll('[data-mod-track]').forEach(function (track) {
      track.scrollLeft = 0;
      syncArrows(track);
    });
    stampHash(slug);
    var closeBtn = panel.querySelector('[data-mod-close]');
    if (closeBtn) closeBtn.focus();
  }

  function hide(panel) {
    panel.removeAttribute('data-open');
    if (reduceMotion) {
      panel.hidden = true;
      return;
    }
    /* Let the exit finish before pulling it out of the layout. Must outlast
       the longest closing transition in product.css (360ms on the sheet). */
    window.setTimeout(function () {
      if (!panel.hasAttribute('data-open')) panel.hidden = true;
    }, 400);
  }

  function close() {
    if (!open) return;
    hide(open);
    open = null;
    stampHash(null);
    document.documentElement.classList.remove('has-modal');
    document.removeEventListener('keydown', onKeydown);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }

  document.addEventListener('click', function (event) {
    var opener = event.target.closest('[data-mod-open]');
    if (opener) {
      event.preventDefault();
      show(opener.getAttribute('data-mod-open'), opener);
      return;
    }

    var closer = event.target.closest('[data-mod-close]');
    if (closer && open) {
      /* "Explore More" is a link back to the grid — let it navigate, but shut
         the panel so the anchor lands on a visible page. */
      close();
      return;
    }

    /* The backdrop is the panel element itself — the sheet inside it is what
       stops the click, so anything landing on .mod-panel is outside. */
    if (open && event.target === open) close();
  });

  /* ----------------------------------------------- "More to discover" rail */

  /* The rail scrolls natively — dragging, wheel and keyboard all work with no
     JavaScript. The arrows only page it and reflect where it has got to. */
  function page(track, dir) {
    var card = track.querySelector('.mod-more__card');
    if (!card) return;
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: dir * (card.offsetWidth + gap) * 2,
                     behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  function syncArrows(track) {
    var nav = track.parentElement.querySelector('.mod-more__nav');
    if (!nav) return;
    var max = track.scrollWidth - track.clientWidth;
    var prev = nav.querySelector('[data-mod-slide="prev"]');
    var next = nav.querySelector('[data-mod-slide="next"]');
    if (prev) prev.disabled = track.scrollLeft <= 1;
    if (next) next.disabled = track.scrollLeft >= max - 1;
  }

  document.querySelectorAll('[data-mod-track]').forEach(function (track) {
    track.addEventListener('scroll', function () { syncArrows(track); }, { passive: true });
    syncArrows(track);
  });

  document.addEventListener('click', function (event) {
    var arrow = event.target.closest('[data-mod-slide]');
    if (!arrow) return;
    var track = arrow.closest('.mod-more').querySelector('[data-mod-track]');
    if (track) page(track, arrow.getAttribute('data-mod-slide') === 'next' ? 1 : -1);
  });

  /* Arriving from another page's rail — product.html#mod-costing opens that
     module rather than dropping the reader at an anchor that isn't rendered. */
  if (panels.length && /^#mod-[a-z-]+$/.test(location.hash)) {
    show(location.hash.replace('#mod-', ''), null);
  }
})();
