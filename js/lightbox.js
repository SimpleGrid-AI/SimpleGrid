/* ==========================================================================
   SimpleGrid — product screenshots at full size

   The module panels show screenshots inside a 16:9 slot, which is fine for
   recognising a screen but too small to read a table in. Clicking one opens it
   at the size the file actually is, over everything else.

   The overlay is built here rather than authored into every page: it is one
   element shared by every image, and it only exists once something is opened.
   Nodes are created through the DOM API — no markup strings.
   ========================================================================== */

(function () {
  'use strict';

  var TARGETS = '.mod-media img, .mod-shot img';
  if (!document.querySelector(TARGETS)) return;

  var SVG_NS = 'http://www.w3.org/2000/svg';

  var box = null;      /* the overlay, built on first use */
  var picture = null;
  var caption = null;
  var closeBtn = null;
  var lastFocus = null;

  function crossIcon() {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', 'M4 4l8 8M12 4l-8 8');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '1.7');
    path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path);
    return svg;
  }

  function build() {
    box = document.createElement('div');
    box.className = 'zoom';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.hidden = true;

    picture = document.createElement('img');
    picture.className = 'zoom__img';

    caption = document.createElement('p');
    caption.className = 'zoom__caption';

    closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'zoom__close';
    closeBtn.setAttribute('aria-label', 'Close image');
    closeBtn.appendChild(crossIcon());

    var frame = document.createElement('figure');
    frame.className = 'zoom__frame';
    frame.appendChild(picture);
    frame.appendChild(caption);

    box.appendChild(closeBtn);
    box.appendChild(frame);
    document.body.appendChild(box);

    /* Anywhere outside the picture closes — the frame is what stops the click. */
    box.addEventListener('click', function (event) {
      if (event.target === box || event.target.closest('.zoom__close')) hide();
    });
  }

  function show(img) {
    if (!box) build();
    lastFocus = document.activeElement;

    picture.src = img.currentSrc || img.src;
    picture.alt = img.alt || '';

    /* The figure's own caption if it has one, otherwise the alt text — the
       point is to say what is being looked at. */
    var fig = img.closest('figure');
    var cap = fig && fig.querySelector('figcaption');
    caption.textContent = cap ? cap.textContent : (img.alt || '');
    caption.hidden = !caption.textContent;

    box.hidden = false;
    document.documentElement.classList.add('has-zoom');
    /* Flush the layout so the fade has a start value to run from. */
    void box.offsetHeight;
    box.setAttribute('data-open', 'true');
    closeBtn.focus();

    document.addEventListener('keydown', onKeydown);
  }

  function hide() {
    if (!box || box.hidden) return;
    box.removeAttribute('data-open');
    document.documentElement.classList.remove('has-zoom');
    document.removeEventListener('keydown', onKeydown);
    window.setTimeout(function () {
      if (!box.hasAttribute('data-open')) box.hidden = true;
    }, 240);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }

  function onKeydown(event) {
    if (event.key === 'Escape') { event.preventDefault(); hide(); return; }
    /* Nothing behind the overlay should be reachable while it is open. */
    if (event.key === 'Tab') {
      event.preventDefault();
      closeBtn.focus();
    }
  }

  /* Delegated, so screenshots added later still open. */
  document.addEventListener('click', function (event) {
    var img = event.target.closest(TARGETS);
    if (!img) return;
    event.preventDefault();
    show(img);
  });

  /* A picture that opens has to be reachable without a mouse. */
  document.querySelectorAll(TARGETS).forEach(function (img) {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'View full size: ' + (img.alt || 'screenshot'));
    img.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); show(img); }
    });
  });
})();
