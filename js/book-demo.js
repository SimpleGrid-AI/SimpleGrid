/* ==========================================================================
   SimpleGrid — Book a demo.

   Every "Book a demo" on the site opens the same short form: name,
   organization, work email. It posts to the same formsubmit.co inbox the
   previous site used, so requests keep landing where the team already reads
   them, and the answer is shown in place rather than on a thank-you page.

   Clicks are caught in the capture phase on the document, so a CTA added to
   any page later is wired up without touching this file. Modified clicks
   (cmd, ctrl, shift, middle) are left alone so "open in new tab" still works
   against the link's own href, which is also the no-JavaScript fallback.

   The dialog is built with DOM calls rather than a markup string: nothing
   here is ever assembled from something a visitor typed.
   ========================================================================== */

(function () {
  'use strict';

  if (window.sgBookDemoInit) return;
  window.sgBookDemoInit = true;

  var INBOX = 'hello@simplegrid.ai';
  var ENDPOINT = 'https://formsubmit.co/ajax/' + INBOX;
  /* Where a sent request goes next, same as the previous site: the request is
     mailed, and the booking page is offered so nobody has to wait 48 hours for
     a reply to get a slot. */
  var BOOKING = 'https://cal.com/simplegrid-ai';
  var SVG_NS = 'http://www.w3.org/2000/svg';

  var overlay = null;
  var form = null;
  var errorBox = null;
  var submitBtn = null;
  var firstField = null;
  var lastFocus = null;
  var state = 'idle';

  /* ------------------------------------------------------------- building */

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    for (var key in attrs) {
      if (attrs[key] !== null) node.setAttribute(key, attrs[key]);
    }
    if (text) node.textContent = text;
    return node;
  }

  function icon(className, d, width) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', className);
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', width);
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);
    return svg;
  }

  function closeButton() {
    var button = el('button', { class: 'bd__close', type: 'button', 'aria-label': 'Close' });
    button.appendChild(icon('bd__close-icon', 'M6 6l12 12M18 6l-12 12', '1.8'));
    button.addEventListener('click', close);
    return button;
  }

  function field(id, name, label, type, placeholder, autocomplete) {
    var wrap = el('div', { class: 'bd__field' });
    var tag = el('label', { class: 'bd__label', for: id }, label);
    tag.appendChild(el('span', { class: 'bd__req', 'aria-hidden': 'true' }, ' *'));
    var input = el('input', {
      class: 'bd__input', id: id, name: name, type: type, placeholder: placeholder,
      autocomplete: autocomplete, required: '', 'aria-required': 'true'
    });
    wrap.appendChild(tag);
    wrap.appendChild(input);
    return wrap;
  }

  function hidden(name, value) {
    return el('input', { type: 'hidden', name: name, value: value });
  }

  function build() {
    if (overlay) return;

    overlay = el('div', { class: 'bd' });
    overlay.hidden = true;

    form = el('form', {
      class: 'bd__panel', role: 'dialog', 'aria-modal': 'true',
      'aria-labelledby': 'bd-title', novalidate: ''
    });

    form.appendChild(closeButton());
    form.appendChild(el('p', { class: 'eyebrow' }, 'Book a demo'));
    form.appendChild(el('h2', { class: 'bd__title', id: 'bd-title' }, 'Tell us about your operation.'));
    form.appendChild(el('p', { class: 'body-copy bd__lede' },
      'We onboard selectively each quarter. If we are a fit, we configure SimpleGrid to your ' +
      'floor at our cost and you run it live for 30 days. You pay only when it works.'));

    /* formsubmit.co's own controls: how the mail is titled and formatted, and
       a honeypot it drops silently when a bot fills it in. */
    form.appendChild(hidden('_subject', 'New demo request - SimpleGrid'));
    form.appendChild(hidden('_template', 'table'));
    form.appendChild(hidden('_captcha', 'false'));
    form.appendChild(el('input', {
      type: 'text', name: '_honey', class: 'bd__honey', tabindex: '-1',
      autocomplete: 'off', 'aria-hidden': 'true'
    }));

    form.appendChild(field('bd-name', 'name', 'Your name', 'text', 'Mike', 'name'));
    form.appendChild(field('bd-org', 'organization', 'Organization', 'text',
      'Ridgeline Manufacturing', 'organization'));
    form.appendChild(field('bd-email', 'email', 'Work email', 'email',
      'mike@ridgeline.com', 'email'));

    errorBox = el('p', { class: 'bd__error', role: 'status', 'aria-live': 'polite' });
    errorBox.hidden = true;
    form.appendChild(errorBox);

    submitBtn = el('button', { class: 'btn btn--primary bd__submit', type: 'submit' }, 'Book a demo');
    form.appendChild(submitBtn);

    /* No privacy page on this site yet, so the note makes the promise itself
       rather than linking to something that would 404. */
    form.appendChild(el('p', { class: 'meta bd__note' },
      'We respond within 48 hours · Your details are used only for your deployment'));

    form.addEventListener('submit', submit);
    /* A field the reader has come back to fix stops showing as wrong. */
    form.addEventListener('input', function (e) {
      if (e.target.classList.contains('bd__input')) e.target.removeAttribute('data-invalid');
    });

    overlay.appendChild(form);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.body.appendChild(overlay);

    firstField = form.querySelector('#bd-name');
  }

  /* -------------------------------------------------------------- sending */

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
  }

  function valid() {
    var bad = null;
    Array.prototype.forEach.call(form.querySelectorAll('.bd__input'), function (input) {
      var value = input.value.trim();
      var ok = input.type === 'email'
        ? /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
        : value.length > 0;
      input.toggleAttribute('data-invalid', !ok);
      if (!ok && !bad) bad = input;
    });
    if (bad) {
      showError(bad.type === 'email' && bad.value.trim()
        ? 'That email does not look right. Check it and try again.'
        : 'Fill in the three fields and we will come back to you.');
      bad.focus();
    }
    return !bad;
  }

  function done() {
    state = 'success';
    var panel = el('div', {
      class: 'bd__panel bd__panel--done', role: 'dialog', 'aria-modal': 'true',
      'aria-labelledby': 'bd-done'
    });
    panel.appendChild(closeButton());
    panel.appendChild(icon('bd__tick', 'M20 6 9 17l-5-5', '2.2'));
    panel.appendChild(el('h2', { class: 'bd__title', id: 'bd-done' }, 'Request received.'));
    panel.appendChild(el('p', { class: 'body-copy bd__lede' },
      'We read every one. Expect a reply within 48 hours, from a person who will be on your ' +
      'deployment.'));

    /* Opens in its own tab so closing the booking page leaves the reader where
       they were on the site. */
    panel.appendChild(el('a', {
      class: 'btn btn--primary bd__submit', href: BOOKING,
      target: '_blank', rel: 'noopener noreferrer'
    }, 'Skip the wait, book a call now'));

    var ok = el('button', { class: 'btn btn--ghost bd__submit bd__later', type: 'button' }, 'Close');
    ok.addEventListener('click', close);
    panel.appendChild(ok);

    form.remove();
    overlay.appendChild(panel);
    panel.querySelector('.bd__close').focus();
  }

  function fail(message) {
    state = 'idle';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Book a demo';
    showError(message || 'That did not send. Try again, or write to ' + INBOX + ' directly.');
  }

  function submit(e) {
    e.preventDefault();
    if (state === 'sending') return;
    errorBox.hidden = true;
    if (!valid()) return;

    state = 'sending';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (json) {
        if (res.ok && (json.success === 'true' || json.success === true)) { done(); return; }
        fail(json.message);
      });
    }).catch(function () { fail(); });
  }

  /* --------------------------------------------------------- open / close */

  /* Everything behind the dialog is hidden from assistive tech while it is
     open, and only what we hid is put back. */
  function background(hide) {
    Array.prototype.forEach.call(document.body.children, function (node) {
      if (node === overlay) return;
      if (hide) {
        if (!node.hasAttribute('aria-hidden')) {
          node.setAttribute('aria-hidden', 'true');
          node.setAttribute('data-bd-hid', '');
        }
      } else if (node.hasAttribute('data-bd-hid')) {
        node.removeAttribute('aria-hidden');
        node.removeAttribute('data-bd-hid');
      }
    });
  }

  function open() {
    build();
    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    background(true);
    document.addEventListener('keydown', onKey);
    requestAnimationFrame(function () { if (firstField) firstField.focus(); });
  }

  function close() {
    if (!overlay) return;
    background(false);
    overlay.hidden = true;
    document.documentElement.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (err) {} }
    /* The success screen replaced the form, so the next open starts fresh. */
    if (state === 'success') {
      overlay.remove();
      overlay = null;
      state = 'idle';
    }
  }

  function onKey(e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab' || !overlay) return;
    var focusable = overlay.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ------------------------------------------------------------ the hooks */

  function isTrigger(node) {
    if (!node) return false;
    if (node.hasAttribute('data-sg-invite')) return true;
    /* Any CTA that says "book a demo", wherever it was written, including the
       few inside FAQ answers that carry a trailing arrow. "Book a call" is a
       different ask and is left to its own link. */
    var label = (node.textContent || '').trim().toLowerCase().replace(/[\s→>·]+$/, '');
    return label === 'book a demo';
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!isTrigger(e.target.closest('a, button, [data-sg-invite]'))) return;
    e.preventDefault();
    open();
  }, true);

  /* So a page can open it directly: onclick="sgBookDemo()", or from a script. */
  window.sgBookDemo = open;
})();
