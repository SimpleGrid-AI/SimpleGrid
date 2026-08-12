/* ==========================================================================
   SimpleGrid — blog post chrome

   Two things a post needs that the markup does not carry: somewhere to share
   it from, and a line that says how much of it is left. Both are added here
   rather than authored into eighteen files, and both are additive — if this
   script never loads, the post still reads.

   Nodes are created through the DOM API. No markup strings.
   ========================================================================== */

(function () {
  'use strict';

  var article = document.querySelector('.post');
  if (!article) return;

  var SVG_NS = 'http://www.w3.org/2000/svg';

  /* Each mark as its path data: the two brand glyphs are filled, the link and
     the tick are stroked, so they are drawn slightly differently. */
  var MARKS = {
    linkedin: { fill: ['M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm6 0h3.84v1.64h.05c.53-1 ' +
      '1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.5c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9z'] },
    x: { fill: ['M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.24 ' +
      '2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.01 4.13H5.05z'] },
    link: { stroke: ['M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 1 0-7.07-7.07l-1.72 1.71',
                     'M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'] },
    tick: { stroke: ['M20 6 9 17l-5-5'] }
  };

  function icon(name) {
    var spec = MARKS[name];
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    (spec.fill || spec.stroke).forEach(function (d) {
      var path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', d);
      if (spec.fill) {
        path.setAttribute('fill', 'currentColor');
      } else {
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'currentColor');
        path.setAttribute('stroke-width', name === 'tick' ? '2.5' : '2');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
      }
      svg.appendChild(path);
    });
    return svg;
  }

  function swapIcon(button, name) {
    while (button.firstChild) button.removeChild(button.firstChild);
    button.appendChild(icon(name));
  }

  /* ------------------------------------------------------------ the rail */

  /* The canonical URL if the page states one, otherwise wherever we are —
     never the local file path with a query string hanging off it. */
  var canonical = document.querySelector('link[rel="canonical"]');
  var url = (canonical && canonical.href) || location.href.split('#')[0];
  var title = (document.querySelector('.post-hero__title') || {}).textContent || document.title;

  function shareLink(href, label, mark) {
    var a = document.createElement('a');
    a.className = 'share__btn';
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', label);
    a.appendChild(icon(mark));
    return a;
  }

  /* Two elements: the rail owns the column beside the article and runs its
     full height, and the inner block is what actually sticks inside it. */
  var rail = document.createElement('div');
  rail.className = 'share';
  var stack = document.createElement('div');
  stack.className = 'share__stack';
  rail.appendChild(stack);

  var label = document.createElement('span');
  label.className = 'share__label';
  label.textContent = 'Share';
  stack.appendChild(label);

  stack.appendChild(shareLink(
    'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url),
    'Share on LinkedIn', 'linkedin'));
  stack.appendChild(shareLink(
    'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) +
      '&text=' + encodeURIComponent(title.trim()),
    'Share on X', 'x'));

  var copy = document.createElement('button');
  copy.type = 'button';
  copy.className = 'share__btn';
  copy.setAttribute('aria-label', 'Copy link');
  copy.appendChild(icon('link'));
  stack.appendChild(copy);

  /* Says it worked, then puts itself back — a button that changed for good
     would read as a different control. */
  function copied() {
    copy.classList.add('is-copied');
    copy.setAttribute('aria-label', 'Link copied');
    swapIcon(copy, 'tick');
    window.setTimeout(function () {
      copy.classList.remove('is-copied');
      copy.setAttribute('aria-label', 'Copy link');
      swapIcon(copy, 'link');
    }, 1600);
  }

  copy.addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(copied, copied);
      return;
    }
    /* No clipboard API (or an insecure origin): select and copy the old way. */
    var field = document.createElement('textarea');
    field.value = url;
    field.setAttribute('readonly', '');
    field.style.position = 'absolute';
    field.style.left = '-9999px';
    document.body.appendChild(field);
    field.select();
    try { document.execCommand('copy'); } catch (err) { /* nothing else to try */ }
    field.remove();
    copied();
  });

  /* Hung on the card, not on the article: the rail sits outside the box, in
     the page margin beside it. */
  var box = article.closest('.card') || article;
  box.insertBefore(rail, box.firstChild);

  /* -------------------------------------------------------- the progress */

  var track = document.createElement('div');
  track.className = 'read-bar';
  track.setAttribute('aria-hidden', 'true');
  var bar = document.createElement('span');
  bar.className = 'read-bar__fill';
  track.appendChild(bar);
  document.body.appendChild(track);

  var queued = false;

  function draw() {
    queued = false;
    var doc = document.documentElement;
    var travel = doc.scrollHeight - doc.clientHeight;
    var pct = travel > 0 ? (doc.scrollTop / travel) * 100 : 0;
    bar.style.width = Math.max(0, Math.min(100, pct)) + '%';
  }

  function onScroll() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(draw);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  /* Images finish loading after this runs and make the page taller, so the
     figure has to be taken again once everything is in. */
  window.addEventListener('load', draw);
  draw();
})();
