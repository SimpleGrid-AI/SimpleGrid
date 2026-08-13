/* ==========================================================================
   SimpleGrid — the road through Elite's floor.

   Nineteen stations from sales order to container, with the work travelling
   down them. Ported from the previous site's React component, which is not a
   dependency here: the drawing is the same, the state is three numbers, and
   the stations are read out of the list already in the page rather than
   restated in a second place.

   That list stays in the markup as the fallback. Without JavaScript it is
   the whole section and it reads fine; the road only replaces it once it has
   drawn.

   It plays on its own, stops while it is off screen, and any station can be
   clicked to jump there — which also stops the run, because someone who has
   chosen a station is reading it.
   ========================================================================== */

(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Geometry, in the coordinates the drawing is authored in. */
  var W = 700;
  var GAP = 50;                       /* between stations       */
  var TOP = 60;                       /* first station's centre */
  var ROAD_X = 110;                   /* the road's centre line */
  var ROAD_W = 56;
  var ROW_X = ROAD_X + ROAD_W / 2 + 36;
  var SPEED = 0.55;                   /* stations per second    */

  function svgEl(name, attrs) {
    var node = document.createElementNS(NS, name);
    for (var key in attrs) node.setAttribute(key, attrs[key]);
    return node;
  }

  function htmlEl(tag, className, text) {
    var node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  /* The five kinds the page already colours its rail by. */
  function kindOf(row, key) {
    if (row.className.indexOf('stage--gate') > -1) return 'gate';
    if (/^(PLAN|XFER)$/.test(key)) return 'plan';
    if (/^(STOCK|COMP|RECV)$/.test(key)) return 'stock';
    if (/^(MACH|ASSY|SAND|FIN)$/.test(key)) return 'contract';
    if (/^(SEAS|HW|PACK)$/.test(key)) return 'make';
    return 'flow';
  }

  function read(list) {
    return Array.prototype.map.call(list.querySelectorAll('.stage'), function (row) {
      function text(sel) {
        var node = row.querySelector(sel);
        return node ? node.textContent.trim() : '';
      }
      var key = text('.stage__key');
      return {
        key: key,
        name: text('.stage__name'),
        note: text('.stage__note'),
        price: text('.stage__pricing'),
        kind: kindOf(row, key)
      };
    });
  }

  function build(stops) {
    var last = TOP + (stops.length - 1) * GAP;
    var height = last + 60;

    var svg = svgEl('svg', {
      class: 'road2__svg', viewBox: '0 0 ' + W + ' ' + height, role: 'img',
      'aria-label': 'The ' + stops.length + ' stations an order passes through, ' +
                    'from sales order to dispatch.'
    });

    /* The road, then the part of it already travelled. */
    svg.appendChild(svgEl('rect', {
      class: 'road2__road', x: ROAD_X - ROAD_W / 2, y: TOP - 24,
      width: ROAD_W, height: last + 48 - TOP, rx: 6
    }));
    var done = svgEl('rect', {
      class: 'road2__done', x: ROAD_X - ROAD_W / 2, y: TOP - 24, width: ROAD_W, height: 0
    });
    svg.appendChild(done);

    var rows = stops.map(function (stop, i) {
      var y = TOP + i * GAP;
      var g = svgEl('g', {
        class: 'road2__stn', 'data-kind': stop.kind, 'data-i': i, 'data-state': 'ahead',
        tabindex: '0', role: 'button', 'aria-label': stop.key + ', ' + stop.name
      });

      g.appendChild(svgEl('line', { class: 'road2__tie', x1: ROAD_X + ROAD_W / 2, y1: y, x2: ROW_X, y2: y }));
      g.appendChild(svgEl('rect', { class: 'road2__row', x: ROW_X, y: y - 17,
                                    width: W - ROW_X - 24, height: 34, rx: 6 }));

      var num = svgEl('text', { class: 'road2__num', x: ROW_X + 14, y: y + 1 });
      num.textContent = i < 9 ? '0' + (i + 1) : String(i + 1);
      g.appendChild(num);

      g.appendChild(svgEl('rect', { class: 'road2__chip', x: ROW_X + 34, y: y - 8,
                                    width: 56, height: 16, rx: 3 }));
      var code = svgEl('text', { class: 'road2__code', x: ROW_X + 62, y: y + 4 });
      code.textContent = stop.key;
      g.appendChild(code);

      var name = svgEl('text', { class: 'road2__name', x: ROW_X + 102, y: y + 4 });
      name.textContent = stop.name;
      g.appendChild(name);

      g.appendChild(svgEl('circle', { class: 'road2__dot', cx: ROAD_X, cy: y, r: 5 }));
      svg.appendChild(g);
      return g;
    });

    /* What is moving. */
    var cargo = svgEl('g', { class: 'road2__cargo' });
    cargo.appendChild(svgEl('rect', { class: 'road2__cargo-box', x: -17, y: -11,
                                      width: 34, height: 22, rx: 3 }));
    cargo.appendChild(svgEl('path', { class: 'road2__cargo-line', d: 'M-9 -4h18M-9 2h18' }));
    svg.appendChild(cargo);

    return { svg: svg, rows: rows, cargo: cargo, done: done };
  }

  function init() {
    var host = document.querySelector('[data-road]');
    if (!host) return;
    var list = host.querySelector('.flow');
    if (!list) return;

    var stops = read(list);
    if (stops.length < 2) return;

    var art = build(stops);
    var stage = htmlEl('div', 'road2');
    stage.appendChild(art.svg);

    /* The road carries the names; this carries what the station actually does. */
    var caption = htmlEl('div', 'road2__cap');
    var capName = htmlEl('p', 'road2__cap-name');
    var capNote = htmlEl('p', 'body-copy road2__cap-note');
    var capPrice = htmlEl('p', 'meta road2__cap-price');
    caption.appendChild(capName);
    caption.appendChild(capNote);
    caption.appendChild(capPrice);
    stage.appendChild(caption);

    list.hidden = true;
    host.insertBefore(stage, list);

    var t = 0;
    var shown = -1;
    var playing = false;
    var frame = null;
    var lastTick = 0;

    function paint() {
      var i = Math.max(0, Math.min(stops.length - 1, Math.floor(t)));
      var within = Math.max(0, Math.min(1, t - i));
      var y = TOP + i * GAP + (i === stops.length - 1 ? 0 : within * GAP);

      art.cargo.setAttribute('transform', 'translate(' + ROAD_X + ' ' + y + ')');
      art.done.setAttribute('height', Math.max(0, y - (TOP - 24)));

      if (i === shown) return;
      shown = i;
      art.rows.forEach(function (g, n) {
        g.setAttribute('data-state', n === i ? 'at' : n < i ? 'done' : 'ahead');
      });
      capName.textContent = stops[i].key + ' · ' + stops[i].name;
      capNote.textContent = stops[i].note;
      capPrice.textContent = stops[i].price;
      capPrice.hidden = !stops[i].price;
    }

    function tick(now) {
      var dt = (now - lastTick) / 1000;
      lastTick = now;
      t += dt * SPEED;
      if (t > stops.length + 0.4) t = 0;
      paint();
      frame = requestAnimationFrame(tick);
    }

    function play() {
      if (playing || reduceMotion) return;
      playing = true;
      lastTick = performance.now();
      frame = requestAnimationFrame(tick);
    }

    function pause() {
      playing = false;
      if (frame) cancelAnimationFrame(frame);
      frame = null;
    }

    /* Choosing a station is a decision to read it, so the run stops there. */
    function jump(i) {
      pause();
      t = i;
      shown = -1;
      paint();
    }

    art.svg.addEventListener('click', function (e) {
      var g = e.target.closest('.road2__stn');
      if (g) jump(Number(g.getAttribute('data-i')));
    });
    art.svg.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var g = e.target.closest('.road2__stn');
      if (!g) return;
      e.preventDefault();
      jump(Number(g.getAttribute('data-i')));
    });

    paint();
    if (reduceMotion) return;          /* drawn, at the first station, still */

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) play(); else pause();
      }, { threshold: 0.15 }).observe(stage);
    } else {
      play();
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) pause(); else play();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
