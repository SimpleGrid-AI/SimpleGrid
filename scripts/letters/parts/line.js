/* ---------------------------------------------------------------- The line
   For co-packers: the schedule on the screen is the ERP, the line under it is
   the floor, and nothing links them. Run it and the line jams: the wrong
   product lands in the case, the rest ends up on the floor, and the screen
   still says On plan. That mess stays. SimpleGrid joins the cable, and the
   next run sorts the whole mess into the case, in order.
   The page may set window.LINE_COPY before this runs, to word it its own way. */
(function(){
  var $ = function(id){ return document.getElementById(id); };
  var NS = 'http://www.w3.org/2000/svg';
  var hero = $('hero'), line = $('line'), wrap = $('lnItems'), statusEl = $('lnStatus'), fill = $('lnFill');
  var btn = $('heroBtn'), resetBtn = $('heroReset'), caption = $('heroCaption');
  var reduce = SG.reduce;
  var COPY = window.LINE_COPY || {
    apart:    { btn: 'Run the line to see your operations', caption: 'The schedule says what to run. The line runs whatever it’s handed. Nothing links them. Run it, or tap the line.' },
    messing:  { btn: 'Running…', caption: 'Running it the usual way: the plan in one place, the line in another.' },
    mess:     { btn: 'Link them with SimpleGrid', caption: 'That’s your operations today: a big mess. A jam, the wrong product in the case, the rest on the floor, and the schedule still says On plan. It won’t sort itself out, either.' },
    dosing:   { btn: 'Linking…', caption: 'SimpleGrid goes between the schedule and the line.' },
    dosed:    { btn: 'Run it again', caption: 'That’s SimpleGrid: the schedule and the line on one live record. Now run it again.' },
    cleaning: { btn: 'Running…', caption: 'Watch the mess sort itself out.' },
    done:     { btn: 'See what changes on your floor', caption: 'From the mess, a clean run: the right product, in order, in the case, and the schedule knows it.' }
  };
  var ARIA = {
    apart: line.getAttribute('aria-label'),
    mess: 'The line jammed: products stuck at the machine, the wrong ones in the case, the rest fallen on the floor, and the schedule still saying On plan.',
    done: 'The line running clean, every product sorted in rows in the case, the light green, and the schedule saying done on time.'
  };

  // Nine products, three kinds, in the order they come down the line.
  var SKUS = 'abcbacacb'.split('');
  var BELT = 317;                                         // where a product's middle sits on the belt
  var START = [[32, BELT], [62, BELT], [92, BELT]];       // three waiting at the start
  var MESS_PALLET = [[284, 452, 18], [326, 447, -27]];    // the wrong two get through, askew
  var QUEUE = [[92, BELT, 0], [62, BELT, 4], [32, BELT, -3]];
  var PILE = [[56, 458, -38], [98, 464, 26], [140, 455, 84], [182, 462, -62]];
  var ROW = { a: 449, b: 415, c: 381 }, COL = [278, 308, 338];

  var items = SKUS.map(function(sku){
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'itm');
    g.dataset.sku = sku;
    g.innerHTML = '<rect class="body" x="-14" y="-17" width="28" height="34" rx="3"/><rect class="band" x="-14" y="-4" width="28" height="9"/>';
    wrap.appendChild(g);
    return g;
  });
  var tf = function(p){ return 'translate(' + p[0] + 'px,' + p[1] + 'px) rotate(' + (p[2] || 0) + 'deg)'; };
  var at = [];                                            // where each product is now
  function place(i, p, hidden){ at[i] = p; items[i].getAnimations().forEach(function(a){ a.cancel(); }); items[i].style.transform = tf(p); items[i].style.opacity = hidden ? 0 : 1; }
  function move(i, frames, ms, delay, easing){
    // Every frame carries its own opacity, so nothing falls back to the hidden starting style mid-move.
    var anim = items[i].animate(frames.map(function(f){ var k = { transform: tf(f.p), opacity: f.o == null ? 1 : f.o }; if (f.at != null) k.offset = f.at; return k; }),
      { duration: reduce ? 1 : ms, delay: reduce ? 0 : delay, easing: easing || 'linear', fill: 'both' });
    at[i] = frames[frames.length - 1].p;
    return anim.finished.catch(function(){});
  }
  function setup(){
    items.forEach(function(g, i){ place(i, START[i] || [-6, BELT], i >= START.length); });
    line.classList.remove('running', 'jammed', 'linked', 'is-done');
    statusEl.textContent = 'On plan';
    fill.setAttribute('width', 80);
  }

  // Run it unlinked: the wrong two get through, then it jams and the rest go on the floor.
  function mess(){
    line.classList.add('running');
    var runs = items.map(function(g, i){
      var d = i*210, pre = i < 3 ? [{ p: START[i] }] : [{ p: [-6, BELT, 0], o: 0 }, { p: [10, BELT, 0], at: .08 }];
      if (i < 2) return move(i, pre.concat([{ p: [96, BELT, 0], at: .3 }, { p: [234, BELT, 0], at: .68 }, { p: [262, BELT, 0], at: .78 }, { p: MESS_PALLET[i] }]), 1600, d);
      if (i < 5) return move(i, pre.concat([{ p: QUEUE[i - 2] }]), 1000 + (i - 2)*140, d, 'cubic-bezier(.3,.6,.4,1)');
      var p = PILE[i - 5];
      return move(i, pre.concat([{ p: [24 + (i - 5)*6, BELT, 0], at: .4 }, { p: [p[0] - 12, BELT + 30, p[2]*.4], at: .62 }, { p: p }]), 1200, d + 200, 'cubic-bezier(.4,0,.6,1)');
    });
    setTimeout(function(){ line.classList.add('jammed'); }, reduce ? 0 : 1250);
    return Promise.all(runs).then(function(){ line.classList.remove('running'); });
  }
  function dose(){
    line.classList.add('linked');
    statusEl.textContent = 'Linked';
    return new Promise(function(done){ setTimeout(done, reduce ? 0 : 750); });
  }
  // Run it linked: everything, wherever it landed, goes back through in order and into its row.
  function clean(){
    line.classList.remove('jammed');
    line.classList.add('running');
    var seen = { a: 0, b: 0, c: 0 }, order = [];
    ['a', 'b', 'c'].forEach(function(k){ SKUS.forEach(function(s, i){ if (s === k) order.push(i); }); });
    var runs = order.map(function(i, n){
      var sku = SKUS[i], slot = [COL[seen[sku]++], ROW[sku], 0], here = at[i];
      return move(i, [{ p: here }, { p: [28, BELT - 40, 0], at: .2 }, { p: [28, BELT, 0], at: .3 }, { p: [96, BELT, 0], at: .48 }, { p: [234, BELT, 0], at: .7 }, { p: [262, BELT, 0], at: .78 }, { p: slot }], 1900, n*190, 'cubic-bezier(.35,.1,.45,1)');
    });
    setTimeout(function(){ statusEl.textContent = 'Done, on time'; fill.setAttribute('width', 250); }, reduce ? 0 : 1700);
    return Promise.all(runs).then(function(){ line.classList.remove('running'); });
  }
  function setCallouts(final){
    $('gapTag').hidden = final;
    $('topTitle').textContent = final ? 'Your ERP' : 'The schedule: your ERP';
    $('topText').textContent = final ? 'Still keeping the books.' : 'What the system says the line is running.';
    $('bottomTitle').textContent = final ? 'Your spreadsheets' : 'The line: your floor';
    $('bottomText').textContent = final ? 'Retired, with thanks.' : 'What it’s really running, on Excel, whiteboards and phones.';
  }

  var story = SG.story({
    hero: hero, obj: line, btn: btn, reset: resetBtn, caption: caption, copy: COPY, aria: ARIA, skip: '.line',
    ops: {
      mess: ['Your operations, today', 'The line jammed, and the schedule still says On plan. Everyone’s working from a different version.'],
      dosed: ['Your operations, plus SimpleGrid', 'Same line, same pile. Now the schedule and the line are linked.']
    },
    mess: mess, dose: dose, clean: clean,
    restore: setup,
    final: function(on){ setCallouts(on); line.classList.toggle('is-done', on); }
  });
  line.addEventListener('click', function(){ if (!story.busy()) story.go(); });
  if ('IntersectionObserver' in window){
    new IntersectionObserver(function(entries){ line.classList.toggle('in-view', entries[0].isIntersecting); }).observe(line);
  } else line.classList.add('in-view');
  setup();
})();
