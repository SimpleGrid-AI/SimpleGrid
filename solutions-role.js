/* Designation pages:
   1. Count-up animation for the single role-specific KPI in the "Built for your
      role" hub.
   2. In-place navigation BETWEEN designation pages. Clicking a role card, a
      prev/next arrow, or a role link in the nav fetches the target page and
      swaps only <main> - no full reload. To make the swap read as a real page
      change (and not just the top-right metric ticking over) we play three
      cues: a top progress bar sweeps while the next page loads, the view
      scrolls up to the new hero, and the new content rises + fades in.
      Progressive enhancement: any error / unsupported browser falls back to a
      normal navigation. Other links behave exactly as before. */
(function () {
  var ROLE_PAGE = /(^|\/)solutions-(owner|sales-head|coo|cfo|plant-manager)\.html$/;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function render(el, val) {
    var pre = el.getAttribute('data-prefix') || '';
    var suf = el.getAttribute('data-suffix') || '';
    el.textContent = pre + val + suf;
  }
  function countUp(scope) {
    var vals = scope.querySelectorAll('.role-hub-kpi-v');
    for (var i = 0; i < vals.length; i++) {
      (function (el) {
        var target = parseInt(el.getAttribute('data-count'), 10) || 0;
        if (reduce || target === 0) { render(el, target); return; }
        var start = null, dur = 950;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          render(el, Math.round(eased * target));
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      })(vals[i]);
    }
  }
  function observeAndCount() {
    var section = document.querySelector('.role-hub');
    if (!section) return;
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        for (var k = 0; k < entries.length; k++) {
          if (entries[k].isIntersecting) { countUp(section); io.disconnect(); break; }
        }
      }, { threshold: 0.3 });
      io.observe(section);
    } else {
      countUp(section);
    }
  }
  observeAndCount();

  // ---- in-place navigation between designation pages -----------------------
  function samePath(href) {
    var a = document.createElement('a');
    a.href = href;
    return a.pathname === location.pathname;
  }

  // The three "new page arrived" cues.
  function progressBar() {
    var b = document.getElementById('role-progress');
    if (!b) {
      b = document.createElement('div');
      b.id = 'role-progress';
      b.setAttribute('aria-hidden', 'true');
      document.body.appendChild(b);
    }
    return b;
  }
  function barStart() {
    if (reduce) return;
    var b = progressBar();
    b.style.transition = 'none';
    b.style.opacity = '1';
    b.style.transform = 'scaleX(0)';
    void b.offsetWidth;                       // reflow so the next change animates
    b.style.transition = 'transform 1.1s cubic-bezier(0.2, 0.8, 0.2, 1)';
    b.style.transform = 'scaleX(0.8)';        // creep toward the end while loading
  }
  function barDone() {
    if (reduce) return;
    var b = progressBar();
    b.style.transition = 'transform 0.22s ease, opacity 0.35s ease 0.15s';
    b.style.transform = 'scaleX(1)';
    b.style.opacity = '0';
  }
  // A pill that names the role you just switched to, so the change is explicit
  // even if two role pages look alike. Reads the clean role name off the new
  // page's "you're here" card (falls back to the hero eyebrow, then the title).
  function announce(doc) {
    var src = doc.querySelector('.role-hub-card.is-current .role-hub-name')
           || doc.querySelector('.role-eyebrow');
    var label = src ? src.textContent.trim()
              : ((doc.title || '').split('|')[0].replace(/^For\s+the\s+/i, '').trim());
    if (!label) return;
    var chip = document.getElementById('role-announce');
    if (!chip) {
      chip = document.createElement('div');
      chip.id = 'role-announce';
      chip.setAttribute('aria-live', 'polite');
      document.body.appendChild(chip);
    }
    chip.textContent = 'Now viewing · ' + label;
    chip.classList.remove('show');
    void chip.offsetWidth;
    chip.classList.add('show');
    if (chip._t) clearTimeout(chip._t);
    chip._t = setTimeout(function () { chip.classList.remove('show'); }, 1900);
  }

  function swap(url, push) {
    barStart();
    var leaving = document.querySelector('#main');
    if (leaving && !reduce) leaving.classList.add('role-leaving');   // begin fade-out at once
    fetch(url, { credentials: 'same-origin' }).then(function (r) {
      if (!r.ok) throw 0;
      return r.text();
    }).then(function (html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var next = doc.querySelector('#main');
      var cur = document.querySelector('#main');
      if (!next || !cur) { window.location.href = url; return; }
      var title = doc.title;
      function doSwap() {
        cur.innerHTML = next.innerHTML;
        if (title) document.title = title;
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });  // instant, hidden under the fade
        announce(doc);
        observeAndCount();
        barDone();
        if (!reduce) {
          cur.classList.remove('role-leaving');
          cur.classList.remove('role-swap-in');
          void cur.offsetWidth;                  // restart the enter animation
          cur.classList.add('role-swap-in');     // new content rises + fades in
        }
      }
      if (push) { try { history.pushState({ sgRole: 1 }, '', url); } catch (e) {} }
      // Let the fade-out be seen, then swap while invisible (no scroll jump on screen).
      if (reduce) doSwap(); else setTimeout(doSwap, 170);
    }).catch(function () { window.location.href = url; });
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    var href = a.getAttribute('href');
    if (!href) return;
    var bare = href.split('#')[0].split('?')[0];
    if (!ROLE_PAGE.test(bare)) return;          // only the five designation pages
    e.preventDefault();
    if (samePath(href)) return;                 // already on this page - do nothing
    swap(href, true);
  });

  window.addEventListener('popstate', function () {
    if (ROLE_PAGE.test(location.pathname)) { swap(location.href, false); }
    else { window.location.reload(); }
  });
})();
