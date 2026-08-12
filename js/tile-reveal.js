/* ==========================================================================
   tile-reveal.js — hover/scroll tile assembly reveal.

   Splits an <img> into a grid of tiles that share one background image at
   shifted positions, so they reassemble into the original picture. A paused
   GSAP timeline stages them in with a grid stagger; hover plays it forward,
   mouse-out reverses it.

   Requires gsap.min.js (and ScrollTrigger.min.js for data-trigger="scroll"),
   loaded before this file. If GSAP is missing, or the visitor prefers reduced
   motion, the plain <img> is left visible and nothing else happens.

   Markup — every [data-tile-reveal] is picked up automatically:

     <div class="tile-reveal" data-tile-reveal
          data-cols="6" data-from="end" data-axis="y" data-trigger="hover">
       <img src="image.jpg" alt="">
     </div>

   Options, all data-* on the wrapper:

     cols      6            columns; rows follow from the image aspect
     rows      auto         override the derived row count
     duration  0.5          per-tile tween duration, seconds
     amount    0.6          total time the stagger is spread across
     stagger   —            per-tile delay; overrides `amount` when set
     from      end          random | start | center | edges | end | <index>
     axis      y            x | y — the axis the stagger travels along
     scale     0.7          tile scale at the hidden end of the tween
     ease      power2.out   any GSAP ease
     trigger   hover        hover | scroll | manual
     initial   disassembled disassembled | assembled — state at rest
     fit       stretch      stretch | cover — see layout() below

   `manual` yields no listeners; drive it through the returned API:
   TileReveal.create(el).assemble() / .disassemble().
   ========================================================================== */

(function (global) {
  'use strict';

  var INSTANCES = new Map();

  var DEFAULTS = {
    cols: 6,
    rows: 0,               /* 0 = derive from the image's aspect ratio */
    duration: 0.5,
    amount: 0.6,
    stagger: 0,            /* > 0 overrides `amount` */
    from: 'end',
    axis: 'y',
    scale: 0.7,
    ease: 'power2.out',
    trigger: 'hover',
    initial: 'disassembled',
    fit: 'stretch'
  };

  function num(value, fallback) {
    var parsed = parseFloat(value);
    return isFinite(parsed) ? parsed : fallback;
  }

  function readConfig(el) {
    var d = el.dataset;
    var cfg = {};
    Object.keys(DEFAULTS).forEach(function (key) { cfg[key] = DEFAULTS[key]; });

    cfg.cols     = Math.max(1, Math.round(num(d.cols, cfg.cols)));
    cfg.rows     = Math.max(0, Math.round(num(d.rows, cfg.rows)));
    cfg.duration = Math.max(0, num(d.duration, cfg.duration));
    cfg.amount   = Math.max(0, num(d.amount, cfg.amount));
    cfg.stagger  = Math.max(0, num(d.stagger, cfg.stagger));
    cfg.scale    = num(d.scale, cfg.scale);

    /* `from` takes a keyword or a tile index — keep numbers numeric so GSAP
       reads them as an origin index rather than an unknown keyword. */
    if (d.from) cfg.from = isFinite(parseFloat(d.from)) ? parseFloat(d.from) : d.from;
    if (d.axis)    cfg.axis    = d.axis;
    if (d.ease)    cfg.ease    = d.ease;
    if (d.trigger) cfg.trigger = d.trigger;
    if (d.initial) cfg.initial = d.initial;
    if (d.fit)     cfg.fit     = d.fit;
    return cfg;
  }

  /* Natural dimensions are needed for the aspect, and a cached image reports
     complete === true before any event fires. */
  function whenReady(img, done) {
    if (img.complete && img.naturalWidth) { done(); return; }
    var settle = function () {
      img.removeEventListener('load', settle);
      img.removeEventListener('error', settle);
      done();
    };
    img.addEventListener('load', settle);
    img.addEventListener('error', settle);
  }

  /* Fraction of the way across the assembled image, as a background-position
     percentage. A single column or row has nowhere to travel. */
  function offsetPct(index, count) {
    return count > 1 ? (index / (count - 1)) * 100 : 0;
  }

  function noop() {}

  function stub(el) {
    return {
      el: el, tl: null, tiles: [], cols: 0, rows: 0, ready: false, disabled: true,
      play: noop, reverse: noop, assemble: noop, disassemble: noop,
      refresh: noop, destroy: function () { INSTANCES.delete(el); }
    };
  }

  /* ---------------------------------------------------------------- instance */

  function create(el) {
    if (!el) return null;
    if (INSTANCES.has(el)) return INSTANCES.get(el);

    var img = el.querySelector('img');
    if (!img) return null;

    var gsapLib = global.gsap;
    var reduced = global.matchMedia &&
      global.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* No GSAP or no motion wanted: leave the real image on screen. */
    if (!gsapLib || reduced) {
      var passthrough = stub(el);
      INSTANCES.set(el, passthrough);
      return passthrough;
    }

    var cfg = readConfig(el);

    var api = {
      el: el,
      img: img,
      config: cfg,
      tl: null,
      tiles: [],
      cols: cfg.cols,
      rows: 0,
      ready: false,
      disabled: false,
      /* Queued while the image is still loading, replayed once it is. */
      pending: cfg.initial === 'assembled' ? 'assemble' : 'disassemble',
      play: function () { api.assemble(); },
      reverse: function () { api.disassemble(); },
      assemble: function () {
        if (!api.ready) { api.pending = 'assemble'; return; }
        api.tl.play();
      },
      disassemble: function () {
        if (!api.ready) { api.pending = 'disassemble'; return; }
        api.tl.reverse();
      },
      refresh: function () { if (api.ready) api.layout(); },
      layout: noop,
      destroy: noop
    };

    INSTANCES.set(el, api);
    whenReady(img, function () { build(api); });
    return api;
  }

  function build(api) {
    var el = api.el, img = api.img, cfg = api.config;
    var gsapLib = global.gsap;

    /* A broken or missing source leaves nothing to slice. */
    if (!img.naturalWidth || !img.naturalHeight) {
      api.disabled = true;
      return;
    }

    var cols = cfg.cols;
    var rows = cfg.rows;

    if (!rows) {
      /* Square tiles. In `cover` the image is cropped to the box, so the box
         aspect governs; in `stretch` the image fills the box as-is. */
      var boxW = el.clientWidth, boxH = el.clientHeight;
      var aspect = (cfg.fit === 'cover' && boxW && boxH)
        ? boxH / boxW
        : img.naturalHeight / img.naturalWidth;
      rows = Math.max(1, Math.round(cols * aspect));
    }
    api.rows = rows;

    /* The <img> keeps its box — it is what gives the wrapper its size and
       aspect — but stops painting. */
    var priorVisibility = img.style.visibility;
    img.style.visibility = 'hidden';

    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    if (cfg.trigger === 'hover') el.style.cursor = 'pointer';

    var grid = document.createElement('div');
    grid.className = 'tile-reveal__grid';
    grid.setAttribute('aria-hidden', 'true');
    grid.style.cssText =
      'position:absolute;inset:0;pointer-events:none;display:grid;' +
      'grid-template-columns:repeat(' + cols + ',1fr);' +
      'grid-template-rows:repeat(' + rows + ',1fr);';

    var src = img.currentSrc || img.src;
    var url = 'url("' + src.replace(/"/g, '\\"') + '")';
    var tiles = [];

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var tile = document.createElement('div');
        tile.className = 'tile-reveal__tile';
        tile.style.backgroundImage = url;
        tile.style.backgroundRepeat = 'no-repeat';
        tile.style.willChange = 'transform, opacity';
        if (cfg.fit !== 'cover') {
          /* Blow the image up by the tile count, then slide each tile's copy
             to its own share of it. Percentages, so it stays responsive with
             no JS on resize. */
          tile.style.backgroundSize = (cols * 100) + '% ' + (rows * 100) + '%';
          tile.style.backgroundPosition =
            offsetPct(c, cols) + '% ' + offsetPct(r, rows) + '%';
        }
        grid.appendChild(tile);
        tiles.push(tile);
      }
    }

    el.appendChild(grid);
    el.classList.add('tile-reveal--ready');
    api.tiles = tiles;
    api.grid = grid;

    /* `cover` cannot be expressed in background percentages — the crop depends
       on how the box and image aspects differ — so the offsets are computed in
       pixels and recomputed whenever the box changes. */
    var observer = null;
    if (cfg.fit === 'cover') {
      api.layout = function () {
        var w = el.clientWidth, h = el.clientHeight;
        if (!w || !h) return;
        var imgRatio = img.naturalWidth / img.naturalHeight;
        var boxRatio = w / h;
        var sw, sh;
        if (imgRatio > boxRatio) { sh = h; sw = h * imgRatio; }
        else                     { sw = w; sh = w / imgRatio; }
        var originX = (w - sw) / 2, originY = (h - sh) / 2;
        var tileW = w / cols, tileH = h / rows;
        tiles.forEach(function (tile, i) {
          var col = i % cols, row = Math.floor(i / cols);
          tile.style.backgroundSize = sw.toFixed(2) + 'px ' + sh.toFixed(2) + 'px';
          tile.style.backgroundPosition =
            (originX - col * tileW).toFixed(2) + 'px ' +
            (originY - row * tileH).toFixed(2) + 'px';
        });
      };
      api.layout();
      if (global.ResizeObserver) {
        observer = new ResizeObserver(api.layout);
        observer.observe(el);
      }
    }

    /* Grid tracks land on fractional pixels, so touching tiles can still leave
       a hairline of whatever is behind them showing through. Resting the tiles
       over 1 buys 2px of overlap — one per edge, enough to cover the gap and
       the antialiasing either side of it. On a 60px tile that is 3%, well
       under what reads as magnified. This becomes the tween's end value, so
       .from() lands on it. */
    var SEAM_COVER = 2;
    var probe = tiles[0].getBoundingClientRect();
    var seamGuard = (probe.width && probe.height)
      ? Math.max((probe.width + SEAM_COVER) / probe.width,
                 (probe.height + SEAM_COVER) / probe.height)
      : 1;
    gsapLib.set(tiles, { scale: seamGuard, transformOrigin: '50% 50%' });

    var stagger = { from: cfg.from, axis: cfg.axis, grid: [rows, cols] };
    if (cfg.stagger > 0) stagger.each = cfg.stagger;
    else stagger.amount = cfg.amount;

    var tl = gsapLib.timeline({ paused: true });
    /* .from() renders immediately even while paused, so the tiles start out
       hidden rather than flashing the assembled image first. */
    tl.from(tiles, {
      opacity: 0,
      scale: cfg.scale,
      duration: cfg.duration,
      ease: cfg.ease,
      stagger: stagger
    });
    api.tl = tl;

    var listeners = [];
    function on(target, type, handler) {
      target.addEventListener(type, handler);
      listeners.push([target, type, handler]);
    }

    var scrollTrigger = null;

    if (cfg.trigger === 'hover') {
      on(el, 'mouseenter', function () { tl.play(); });
      on(el, 'mouseleave', function () { tl.reverse(); });
      /* Keyboard parity when the wrapper is reachable. */
      on(el, 'focusin', function () { tl.play(); });
      on(el, 'focusout', function () { tl.reverse(); });
    } else if (cfg.trigger === 'scroll' && global.ScrollTrigger) {
      gsapLib.registerPlugin(global.ScrollTrigger);
      scrollTrigger = global.ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        end: 'bottom 15%',
        animation: tl,
        toggleActions: 'play none none reverse'
      });
    }

    api.ready = true;

    /* Apply whatever state was asked for while the image was still loading —
       which starts out as `initial`, and may have been overridden since. */
    if (api.pending === 'assemble') tl.progress(1).pause();

    api.destroy = function () {
      listeners.forEach(function (entry) {
        entry[0].removeEventListener(entry[1], entry[2]);
      });
      listeners.length = 0;
      if (scrollTrigger) scrollTrigger.kill();
      if (observer) observer.disconnect();
      tl.kill();
      if (grid.parentNode) grid.parentNode.removeChild(grid);
      el.classList.remove('tile-reveal--ready');
      img.style.visibility = priorVisibility;
      el.style.cursor = '';
      api.ready = false;
      INSTANCES.delete(el);
    };
  }

  /* -------------------------------------------------------------- public API */

  function init(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-tile-reveal]').forEach(create);
  }

  global.TileReveal = {
    DEFAULTS: DEFAULTS,
    create: create,
    init: init,
    get: function (el) { return INSTANCES.get(el) || null; },
    refreshAll: function () { INSTANCES.forEach(function (i) { i.refresh(); }); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); });
  } else {
    init();
  }
})(window);
