/* Shared by every hero: small helpers, the wipe into the end-state colors,
   and the barcode on the back of the label. */
var SG = (function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function(v, a, b){ return v < a ? a : v > b ? b : v; };

  /* The end state spreads out from the hero object and takes the whole hero
     with it. The clone carries the other colorway, so the type stays legible
     as the edge passes. `skip` hides whatever shouldn't be painted twice. */
  function wipeTo(hero, from, theme, skip){
    if (reduce){ hero.dataset.theme = theme; return; }
    var r = from.getBoundingClientRect(), h = hero.getBoundingClientRect();
    var cx = r.left + r.width/2 - h.left, cy = r.top + r.height/2 - h.top;
    var R = Math.hypot(Math.max(cx, h.width - cx), Math.max(cy, h.height - cy));
    var over = document.createElement('div');
    over.className = 'hero-wipe';
    over.dataset.theme = theme;
    over.setAttribute('aria-hidden', 'true');
    over.inert = true;
    var inner = hero.querySelector('.hero-inner').cloneNode(true);
    inner.querySelectorAll('[id]').forEach(function(el){ el.removeAttribute('id'); });
    if (skip) inner.querySelectorAll(skip).forEach(function(el){ el.style.visibility = 'hidden'; });
    over.appendChild(inner);
    over.style.clipPath = 'circle(0px at ' + cx + 'px ' + cy + 'px)';
    hero.appendChild(over);
    over.getBoundingClientRect();
    over.style.transition = 'clip-path .9s cubic-bezier(.3,.6,.2,1)';
    over.style.clipPath = 'circle(' + R + 'px at ' + cx + 'px ' + cy + 'px)';
    var done = false;
    var finish = function(){
      if (done) return;
      done = true;
      hero.dataset.theme = theme;
      over.remove();
    };
    over.addEventListener('transitionend', finish, { once: true });
    setTimeout(finish, 1100);
  }

  /* The barcode is real: Code 128 for 7732804485, in bar and space widths. */
  function barcode(svg){
    var bars = '', x = 0, CODE = '211232413111232121111242132131124211312113' + '2331112';
    for (var i = 0; i < CODE.length; i++){
      var width = +CODE.charAt(i);
      if (i % 2 === 0) bars += '<rect x="' + x + '" y="0" width="' + width + '" height="26" fill="currentColor"/>';
      x += width;
    }
    svg.setAttribute('viewBox', '0 0 ' + x + ' 26');
    svg.innerHTML = bars;
  }

  /* Runs `frame(dt)` only while `el` is on screen and the tab is visible, so
     an idle hero costs nothing once it's scrolled away. */
  function loop(el, frame){
    var raf = 0, last = 0, visible = true;
    function tick(now){
      raf = requestAnimationFrame(tick);
      var dt = Math.min(.05, (now - last)/1000 || .016);
      last = now;
      frame(dt);
    }
    function run(){ if (!raf && visible && !document.hidden){ last = performance.now(); raf = requestAnimationFrame(tick); } }
    function halt(){ if (raf){ cancelAnimationFrame(raf); raf = 0; } }
    document.addEventListener('visibilitychange', function(){ document.hidden ? halt() : run(); });
    if ('IntersectionObserver' in window){
      new IntersectionObserver(function(entries){
        visible = entries[0].isIntersecting;
        visible ? run() : halt();
      }).observe(el);
    }
    run();
  }

  return { reduce: reduce, clamp: clamp, wipeTo: wipeTo, barcode: barcode, loop: loop };
})();
<!--#include story.js-->
