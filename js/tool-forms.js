/* ==========================================================================
   SimpleGrid — form state for the tool pages.

   The tools already validate at the moment you press "Download PDF": they
   flash a field and raise a toast. A flash is gone in 700ms and a toast is
   gone in a few seconds, which leaves the reader looking at a form with no
   sign of which box was wrong. This layer adds the state that stays:

     • a required field left empty is marked when it is left, and on submit
     • an email or a phone number that cannot be right is marked as typed
     • every mark is a red field, a red label and a line saying what is wrong
     • the mark clears the moment the field is corrected

   It is additive — the tools' own handlers and tools.js are untouched, so the
   numbers, the PDFs and the existing toasts behave exactly as before.
   ========================================================================== */

(function () {
  'use strict';

  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  /* Digits only, after punctuation is stripped. 7 is the shortest real
     subscriber number, 15 the E.164 maximum including country code. */
  var PHONE_MIN = 7;
  var PHONE_MAX = 15;

  function field(el) { return el.closest('.tool-field') || el.parentElement; }

  function labelText(el) {
    var lab = el.labels && el.labels[0];
    var text = lab ? lab.textContent : (el.placeholder || el.name || 'This field');
    /* Drop the "(optional — for $ impact)" style hint that sits inside the
       label, so the message reads as a sentence. */
    return text.split('(')[0].replace(/\s+/g, ' ').trim();
  }

  /* What kind of value a control holds. The tools are hand-authored, so the
     type attribute is not always set — the id and the label are checked too. */
  function kindOf(el) {
    var type = (el.getAttribute('type') || '').toLowerCase();
    if (type === 'email') return 'email';
    if (type === 'tel') return 'phone';
    var hay = ((el.id || '') + ' ' + (el.name || '') + ' ' + labelText(el)).toLowerCase();
    if (/e-?mail/.test(hay)) return 'email';
    if (/phone|mobile|telephone|contact no|contact number/.test(hay)) return 'phone';
    return 'text';
  }

  /* The first thing wrong with this control, or null. `submitting` is what
     turns "you have not filled this in yet" into an error — while typing, an
     empty required field is simply not finished. */
  function problem(el, submitting) {
    var value = (el.value || '').trim();

    if (!value) {
      if (submitting && el.hasAttribute('data-required')) {
        return labelText(el) + ' is required.';
      }
      return null;   /* empty and optional — nothing to say */
    }

    var kind = kindOf(el);
    if (kind === 'email' && !EMAIL.test(value)) {
      return 'That does not look like an email address. Example: name@company.com';
    }
    if (kind === 'phone') {
      var digits = value.replace(/[^0-9]/g, '');
      if (digits.length < PHONE_MIN || digits.length > PHONE_MAX) {
        return 'That does not look like a phone number. Use ' + PHONE_MIN + '–' +
               PHONE_MAX + ' digits, with or without a country code.';
      }
    }
    return null;
  }

  function clear(el) {
    var box = field(el);
    if (box) box.classList.remove('is-invalid');
    el.classList.remove('is-invalid');
    el.removeAttribute('aria-invalid');
    var note = box && box.querySelector('.tool-field__error');
    if (note) note.remove();
  }

  function mark(el, message) {
    var box = field(el);
    el.setAttribute('aria-invalid', 'true');
    el.classList.add('is-invalid');
    if (!box) return;
    box.classList.add('is-invalid');

    var note = box.querySelector('.tool-field__error');
    if (!note) {
      note = document.createElement('p');
      note.className = 'tool-field__error';
      /* Announced by screen readers when it appears, without stealing focus
         from whatever the reader is typing in. */
      note.setAttribute('role', 'alert');
      box.appendChild(note);
    }
    note.textContent = message;
  }

  /* Check one control and reflect the answer. Returns true when it is fine. */
  function check(el, submitting) {
    var message = problem(el, submitting);
    if (message) { mark(el, message); return false; }
    clear(el);
    return true;
  }

  function controls(scope) {
    return Array.prototype.slice.call(
      scope.querySelectorAll('input, select, textarea')
    ).filter(function (el) {
      var type = (el.getAttribute('type') || '').toLowerCase();
      return type !== 'hidden' && type !== 'file' && type !== 'button' && !el.disabled;
    });
  }

  function init() {
    var scope = document.querySelector('main');
    if (!scope) return;

    /* Typing is not the moment to complain — leaving the field is. Once a
       field is already marked, though, every keystroke is a chance to clear
       it, so the red goes away as soon as the value becomes valid. */
    scope.addEventListener('blur', function (event) {
      var el = event.target;
      if (!el.matches || !el.matches('input, select, textarea')) return;
      check(el, false);
    }, true);

    scope.addEventListener('input', function (event) {
      var el = event.target;
      if (!el.matches || !el.matches('input, select, textarea')) return;
      var box = field(el);
      if (box && box.classList.contains('is-invalid')) check(el, false);
      else if (el.classList.contains('is-invalid')) check(el, false);
    });

    /* Anything that produces output — the PDF and CSV buttons all sit in
       .tool-actions — is a submit. Capture phase, so the fields are already
       marked by the time the tool's own handler runs its check and stops. */
    document.addEventListener('click', function (event) {
      var button = event.target.closest('.tool-actions button, .tool-actions a.btn, [id^="generate-"], [id$="-pdf"]');
      if (!button || !scope.contains(button)) return;

      var bad = controls(scope).filter(function (el) { return !check(el, true); });
      if (bad.length) bad[0].focus({ preventScroll: false });
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
