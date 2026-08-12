/* ==========================================================================
   SimpleGrid — Hank, played as a conversation

   The product page shows what asking Hank is actually like: six questions an
   operator asks across a week, each answered off live records. The exchange
   plays itself once the panel is on screen, and can be paused or replayed.

   Nodes are created through the DOM API — no markup strings. The transcript
   lives here rather than in the page because it is a script, not content the
   page needs before this file loads.
   ========================================================================== */

(function () {
  'use strict';

  var panel = document.querySelector('[data-hank]');
  if (!panel) return;

  var log = panel.querySelector('[data-hank-log]');
  var pauseBtn = panel.querySelector('[data-hank-pause]');
  var replayBtn = panel.querySelector('[data-hank-replay]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* A turn is either something the operator typed, or Hank answering. An
     answer is a run of lines; the parts marked strong are the numbers, which
     is what the reader is actually after. */
  var TALK = [
    { ask: 'Hank, what goes out today?', when: 'Monday 9:14 AM' },
    { say: [
      ['Today: ', '5 dispatches · $52k invoiced.'],
      ['Biggest: ', 'Hampton Co', ' — 2 trucks, $28k.'],
      ['All 5 packed. QC cleared by Ray Alvarez, 8:40 AM.']
    ] },

    { ask: 'Which orders are running late?', when: 'Tuesday 9:24 AM' },
    { say: [
      ['3 orders past promise date:'],
      ['· ', 'SO-4521 · Hampton Co — 2 days late', ' (QC backlog)'],
      ['· SO-4533 — 1 day late, packs today'],
      ['· SO-4540 — at risk, ships tomorrow']
    ] },

    { ask: 'What is my margin on the Hampton order?', when: 'Tuesday 2:33 PM' },
    { say: [
      ['SO-4521: quoted ', '$16,200', ' · landed cost $12,900.'],
      ['Margin: ', '20.4%', ' — 1.8 pts below plan.'],
      ['Cause: rework on batch B-7710, logged by Ray Alvarez, Apr 22.']
    ] },

    { ask: 'Which contractor has the worst rejection rate this quarter?', when: 'Wednesday 3:48 PM' },
    { say: [
      ['Top 3 by reject %:'],
      ['1. ', 'Sunrise Steel — 8.2%', ' (12 of 146 batches), up from 4% in Q1'],
      ['2. Westwood Mfg — 4.1%'],
      ['3. Acme Fab — 2.7%']
    ] },

    { ask: 'What is at risk of running out in the next 7 days?', when: 'Thursday 11:15 AM' },
    { say: [
      ['3 SKUs below safety stock:'],
      ['· ', '3 mm steel sheet — 4 days', ' at current draw'],
      ['· M8 hex bolts — 5 days'],
      ['· Walnut veneer — 6 days'],
      ['All 3 auto-reordered Apr 24. Vendor ETA Apr 29 – May 1.']
    ] },

    { ask: 'What is our cash position by buyer?', when: 'Friday 8:52 PM' },
    { say: [
      ['As of 8:52 PM today:'],
      ['· Hampton Co: ', '$145k', ' receivable, due Apr 18'],
      ['· Apex Mfg: ', '$100k', ' — overdue 3 days, flagged'],
      ['· Elite Motors: ', '$67k', ' current'],
      ['Total AR: ', '$552k · DSO 42 days.']
    ] }
  ];

  var step = 0;          /* how many turns have landed */
  var timer = null;
  var typingRow = null;
  var paused = false;
  var started = false;

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }

  function askRow(turn) {
    var row = el('div', 'hchat__turn hchat__turn--ask');
    row.appendChild(el('p', 'hchat__when', turn.when));
    row.appendChild(el('p', 'hchat__ask', turn.ask));
    return row;
  }

  function sayRow(turn) {
    var row = el('div', 'hchat__turn hchat__turn--say');
    var bubble = el('div', 'hchat__answer');
    turn.say.forEach(function (parts) {
      var line = el('p', 'hchat__line');
      line.appendChild(document.createTextNode(parts[0]));
      if (parts[1]) line.appendChild(el('strong', null, parts[1]));
      if (parts[2]) line.appendChild(document.createTextNode(parts[2]));
      bubble.appendChild(line);
    });
    row.appendChild(bubble);
    return row;
  }

  /* Three dots while Hank works — the beat that makes an answer read as a
     reply rather than as text that was always there. */
  function typing() {
    var row = el('div', 'hchat__turn hchat__turn--say');
    var bubble = el('div', 'hchat__typing');
    bubble.setAttribute('aria-label', 'Hank is typing');
    for (var i = 0; i < 3; i++) bubble.appendChild(el('span', 'hchat__dot'));
    row.appendChild(bubble);
    return row;
  }

  function toBottom() {
    log.scrollTo({ top: log.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  function clearTyping() {
    if (typingRow) { typingRow.remove(); typingRow = null; }
  }

  function finish() {
    clearTyping();
    pauseBtn.disabled = true;
    replayBtn.disabled = false;
  }

  function next() {
    if (paused || step >= TALK.length) { if (step >= TALK.length) finish(); return; }
    var turn = TALK[step];

    if (turn.ask) {
      log.appendChild(askRow(turn));
      step++;
      toBottom();
      timer = window.setTimeout(next, 620);
      return;
    }

    /* An answer arrives in two beats: the dots, then the reply. */
    typingRow = typing();
    log.appendChild(typingRow);
    toBottom();
    timer = window.setTimeout(function () {
      clearTyping();
      log.appendChild(sayRow(turn));
      step++;
      toBottom();
      timer = window.setTimeout(next, 1700);
    }, 1100);
  }

  function play() {
    window.clearTimeout(timer);
    next();
  }

  function reset() {
    window.clearTimeout(timer);
    clearTyping();
    while (log.firstChild) log.removeChild(log.firstChild);
    step = 0;
    paused = false;
    pauseBtn.textContent = 'Pause';
    pauseBtn.disabled = false;
    replayBtn.disabled = true;
  }

  /* Reduced motion gets the transcript outright: the timing is the effect, and
     there is no faster version of it worth watching. */
  function showAll() {
    TALK.forEach(function (turn) {
      log.appendChild(turn.ask ? askRow(turn) : sayRow(turn));
    });
    step = TALK.length;
    finish();
  }

  pauseBtn.addEventListener('click', function () {
    paused = !paused;
    pauseBtn.textContent = paused ? 'Resume' : 'Pause';
    if (paused) { window.clearTimeout(timer); clearTyping(); }
    else play();
  });

  replayBtn.addEventListener('click', function () {
    reset();
    if (reduceMotion) showAll(); else play();
  });

  /* It starts when the panel is actually being looked at, not while it is
     still below the fold. */
  if (reduceMotion) {
    showAll();
  } else if ('IntersectionObserver' in window) {
    var watch = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || started) return;
        started = true;
        watch.disconnect();
        play();
      });
    }, { threshold: 0.25 });
    watch.observe(panel);
  } else {
    play();
  }
})();
